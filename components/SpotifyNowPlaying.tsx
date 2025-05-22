"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Music, Play, ExternalLink, Volume2, Clock, Eye } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface SpotifyData {
    album: string
    albumImageUrl: string
    artist: string
    isPlaying: boolean
    songUrl: string
    title: string
}

export function SpotifyNowPlaying() {
    const [data, setData] = useState<SpotifyData | null>(null)
    const [loading, setLoading] = useState(true)
    const [ambientMode, setAmbientMode] = useState(true)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [dominantColor, setDominantColor] = useState<string>("rgba(139, 92, 246, 0.3)") // Default purple
    const [pulseSize, setPulseSize] = useState(1)
    const [beatInterval, setBeatInterval] = useState<NodeJS.Timeout | null>(null)
    const [secondaryColor, setSecondaryColor] = useState<string>("rgba(236, 72, 153, 0.3)") // Default pink

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch("/api/spotify")
                const data = await res.json()
                setData(data)
            } catch (error) {
                console.error("Failed to fetch Spotify data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
        const interval = setInterval(fetchData, 30000) // Refresh every 30 seconds

        return () => clearInterval(interval)
    }, [])

    // Extract dominant color from album art
    useEffect(() => {
        if (!data?.albumImageUrl || !ambientMode) return

        const img = new window.Image()
        img.crossOrigin = "anonymous"
        img.src = data.albumImageUrl

        img.onload = () => {
            const canvas = canvasRef.current
            if (!canvas) return

            const ctx = canvas.getContext("2d")
            if (!ctx) return

            // Draw image to canvas
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)

            // Get image data
            try {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data

                // Arrays to collect vibrant colors
                const colors: Array<{ r: number; g: number; b: number; count: number }> = []

                // Sample pixels (skip some for performance)
                for (let i = 0; i < imageData.length; i += 20) {
                    const red = imageData[i]
                    const green = imageData[i + 1]
                    const blue = imageData[i + 2]
                    const alpha = imageData[i + 3]

                    // Skip transparent pixels and very dark pixels
                    if (alpha < 128 || red + green + blue < 100) continue

                    // Calculate color saturation and brightness
                    const max = Math.max(red, green, blue)
                    const min = Math.min(red, green, blue)
                    const saturation = max === 0 ? 0 : (max - min) / max

                    // Only count pixels with decent saturation
                    if (saturation > 0.2) {
                        // Check if we've seen a similar color before
                        let found = false
                        for (const color of colors) {
                            if (Math.abs(color.r - red) < 30 && Math.abs(color.g - green) < 30 && Math.abs(color.b - blue) < 30) {
                                color.r = (color.r * color.count + red) / (color.count + 1)
                                color.g = (color.g * color.count + green) / (color.count + 1)
                                color.b = (color.b * color.count + blue) / (color.count + 1)
                                color.count++
                                found = true
                                break
                            }
                        }

                        if (!found) {
                            colors.push({ r: red, g: green, b: blue, count: 1 })
                        }
                    }
                }

                // Sort colors by count
                colors.sort((a, b) => b.count - a.count)

                // Use the most common color as dominant
                if (colors.length > 0) {
                    const mainColor = colors[0]
                    setDominantColor(`rgba(${mainColor.r}, ${mainColor.g}, ${mainColor.b}, 0.3)`)

                    // Use the second most common color as secondary, or a complementary color
                    if (colors.length > 1) {
                        const secondColor = colors[1]
                        setSecondaryColor(`rgba(${secondColor.r}, ${secondColor.g}, ${secondColor.b}, 0.3)`)
                    } else {
                        // Create a complementary color
                        setSecondaryColor(`rgba(${255 - mainColor.r}, ${255 - mainColor.g}, ${255 - mainColor.b}, 0.3)`)
                    }
                }

                // Estimate BPM based on song title and artist (very rough approximation)
                // In a real app, you'd use the Spotify API to get actual BPM
                let estimatedBPM = 120 // Default BPM

                // Adjust based on keywords in title or artist
                const titleLower = data.title.toLowerCase()
                const artistLower = data.artist.toLowerCase()

                if (
                    titleLower.includes("slow") ||
                    titleLower.includes("ballad") ||
                    artistLower.includes("adele") ||
                    artistLower.includes("billie eilish")
                ) {
                    estimatedBPM = 80
                } else if (
                    titleLower.includes("dance") ||
                    titleLower.includes("beat") ||
                    titleLower.includes("party") ||
                    artistLower.includes("daft punk") ||
                    artistLower.includes("calvin harris")
                ) {
                    estimatedBPM = 128
                } else if (titleLower.includes("rock") || artistLower.includes("metallica") || artistLower.includes("acdc")) {
                    estimatedBPM = 140
                }

                // Clear any existing interval
                if (beatInterval) {
                    clearInterval(beatInterval)
                }

                // Set up pulsing effect based on estimated BPM
                const interval = setInterval(
                    () => {
                        setPulseSize((prev) => (prev === 1 ? 1.05 : 1))
                    },
                    (60 / estimatedBPM) * 1000,
                )

                setBeatInterval(interval)
            } catch (error) {
                console.error("Error extracting color:", error)
            }
        }

        return () => {
            if (beatInterval) {
                clearInterval(beatInterval)
            }
        }
    }, [data?.albumImageUrl, ambientMode])

    if (loading) {
        return (
            <Card className="bg-black/40 border-purple-900/30 p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-purple-900/30 rounded-md animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-purple-900/30 rounded w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-purple-900/30 rounded w-1/2 animate-pulse"></div>
                        <div className="h-3 bg-purple-900/30 rounded w-1/3 animate-pulse"></div>
                    </div>
                </div>
            </Card>
        )
    }

    if (!data?.isPlaying) {
        return (
            <Card className="bg-black/40 border-purple-900/30 p-6 backdrop-blur-sm">
                <div className="flex flex-col items-center justify-center space-y-3 py-4">
                    <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center">
                        <Music className="h-6 w-6 text-purple-400" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-purple-200">Not currently playing</h3>
                        <p className="text-sm text-purple-200/50">Spotify is silent right now</p>
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <>
            <canvas ref={canvasRef} className="hidden" /> {/* Hidden canvas for color extraction */}
            <div
                ref={containerRef}
                className="relative mb-8 rounded-lg overflow-hidden"
                style={{
                    boxShadow: ambientMode ? `0 0 100px 5px ${dominantColor}` : "none",
                    transition: "box-shadow 0.5s ease-in-out",
                }}
            >
                {/* YouTube-style ambient background */}
                {ambientMode && (
                    <div className="absolute inset-0 -z-10">
                        <motion.div
                            animate={{ scale: pulseSize }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0 opacity-80"
                            style={{
                                background: `radial-gradient(circle at center, ${dominantColor} 0%, transparent 70%)`,
                                filter: "blur(30px)",
                            }}
                        />
                        <motion.div
                            animate={{
                                scale: pulseSize === 1 ? 1.05 : 1,
                                opacity: [0.6, 0.8, 0.6],
                            }}
                            transition={{
                                duration: 2,
                                ease: "easeInOut",
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                            }}
                            className="absolute inset-0 opacity-60"
                            style={{
                                background: `radial-gradient(circle at 70% 30%, ${secondaryColor} 0%, transparent 50%)`,
                                filter: "blur(40px)",
                            }}
                        />
                    </div>
                )}

                {/* The card itself - always consistent */}
                <Card className="bg-black/40 border-purple-900/30 overflow-hidden backdrop-blur-sm relative">
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/0 via-purple-900/20 to-purple-900/0 opacity-50"></div>

                    {/* Animated equalizer bars */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 flex justify-center space-x-1 px-4 opacity-70">
                        {[...Array(24)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 bg-purple-500"
                                initial={{ height: 0 }}
                                animate={{
                                    height: [2, Math.random() * 12 + 2, 4, Math.random() * 8 + 2, 2],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                    delay: i * 0.05,
                                }}
                            />
                        ))}
                    </div>

                    <div className="p-5 relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1">
                                <Play className="h-3 w-3 mr-2" />
                                Now Playing
                            </Badge>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 rounded-full"
                                    onClick={() => setAmbientMode(!ambientMode)}
                                    title={ambientMode ? "Disable ambient mode" : "Enable ambient mode"}
                                >
                                    <Eye className={`h-4 w-4 ${ambientMode ? "text-purple-300" : "text-purple-500/50"}`} />
                                </Button>
                                <a
                                    href={data.songUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center"
                                >
                                    Open in Spotify
                                    <ExternalLink className="h-3 w-3 ml-1" />
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            {/* Album art with glow effect */}
                            <div className="relative group">
                                <motion.div
                                    animate={{ scale: ambientMode ? pulseSize : 1 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000"
                                ></motion.div>
                                <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-lg overflow-hidden">
                                    <Image
                                        src={data.albumImageUrl || "/placeholder.svg"}
                                        alt={data.album}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            </div>

                            {/* Song details */}
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-1">
                                    {data.title}
                                </h3>
                                <p className="text-lg text-purple-200 mb-2">{data.artist}</p>
                                <p className="text-sm text-purple-200/50 mb-4">{data.album}</p>

                                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                    <div className="flex items-center text-xs text-purple-200/70 bg-purple-900/20 px-3 py-1 rounded-full">
                                        <Volume2 className="h-3 w-3 mr-1" />
                                        <span>Spotify</span>
                                    </div>
                                    <div className="flex items-center text-xs text-purple-200/70 bg-purple-900/20 px-3 py-1 rounded-full">
                                        <Clock className="h-3 w-3 mr-1" />
                                        <span>Live</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}
