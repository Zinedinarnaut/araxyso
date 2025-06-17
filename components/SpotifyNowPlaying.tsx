"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Music, ExternalLink, Volume2, Clock, Eye, Heart } from "lucide-react"
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
    const [dominantColor, setDominantColor] = useState<string>("rgba(139, 92, 246, 0.4)")
    const [pulseSize, setPulseSize] = useState(1)
    const [beatInterval, setBeatInterval] = useState<NodeJS.Timeout | null>(null)
    const [secondaryColor, setSecondaryColor] = useState<string>("rgba(236, 72, 153, 0.4)")
    const [isLiked, setIsLiked] = useState(false)

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
        const interval = setInterval(fetchData, 30000)
        return () => clearInterval(interval)
    }, [])

    // Enhanced color extraction with better algorithm
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

            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)

            try {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data
                const colors: Array<{ r: number; g: number; b: number; count: number; vibrance: number }> = []

                for (let i = 0; i < imageData.length; i += 16) {
                    const red = imageData[i]
                    const green = imageData[i + 1]
                    const blue = imageData[i + 2]
                    const alpha = imageData[i + 3]

                    if (alpha < 128 || red + green + blue < 120) continue

                    const max = Math.max(red, green, blue)
                    const min = Math.min(red, green, blue)
                    const saturation = max === 0 ? 0 : (max - min) / max
                    const brightness = (red + green + blue) / 3
                    const vibrance = saturation * brightness

                    if (saturation > 0.3 && brightness > 50) {
                        let found = false
                        for (const color of colors) {
                            if (Math.abs(color.r - red) < 40 && Math.abs(color.g - green) < 40 && Math.abs(color.b - blue) < 40) {
                                color.r = (color.r * color.count + red) / (color.count + 1)
                                color.g = (color.g * color.count + green) / (color.count + 1)
                                color.b = (color.b * color.count + blue) / (color.count + 1)
                                color.count++
                                color.vibrance = Math.max(color.vibrance, vibrance)
                                found = true
                                break
                            }
                        }

                        if (!found) {
                            colors.push({ r: red, g: green, b: blue, count: 1, vibrance })
                        }
                    }
                }

                colors.sort((a, b) => b.vibrance * b.count - a.vibrance * a.count)

                if (colors.length > 0) {
                    const mainColor = colors[0]
                    setDominantColor(
                        `rgba(${Math.round(mainColor.r)}, ${Math.round(mainColor.g)}, ${Math.round(mainColor.b)}, 0.4)`,
                    )

                    if (colors.length > 1) {
                        const secondColor = colors[1]
                        setSecondaryColor(
                            `rgba(${Math.round(secondColor.r)}, ${Math.round(secondColor.g)}, ${Math.round(secondColor.b)}, 0.3)`,
                        )
                    } else {
                        setSecondaryColor(
                            `rgba(${255 - Math.round(mainColor.r)}, ${255 - Math.round(mainColor.g)}, ${255 - Math.round(mainColor.b)}, 0.3)`,
                        )
                    }
                }

                // Enhanced BPM estimation
                let estimatedBPM = 120
                const titleLower = data.title.toLowerCase()
                data.artist.toLowerCase();
                if (titleLower.includes("slow") || titleLower.includes("ballad") || titleLower.includes("chill")) {
                    estimatedBPM = 70
                } else if (titleLower.includes("dance") || titleLower.includes("electronic") || titleLower.includes("house")) {
                    estimatedBPM = 128
                } else if (titleLower.includes("rock") || titleLower.includes("metal") || titleLower.includes("punk")) {
                    estimatedBPM = 140
                } else if (titleLower.includes("hip hop") || titleLower.includes("rap") || titleLower.includes("trap")) {
                    estimatedBPM = 85
                }

                if (beatInterval) clearInterval(beatInterval)

                const interval = setInterval(
                    () => {
                        setPulseSize((prev) => (prev === 1 ? 1.08 : 1))
                    },
                    (60 / estimatedBPM) * 1000,
                )

                setBeatInterval(interval)
            } catch (error) {
                console.error("Error extracting color:", error)
            }
        }

        return () => {
            if (beatInterval) clearInterval(beatInterval)
        }
    }, [data?.albumImageUrl, ambientMode])

    if (loading) {
        return (
            <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/40 to-pink-900/20 backdrop-blur-sm" />
                <Card className="bg-black/60 border-purple-500/20 backdrop-blur-md relative">
                    <div className="p-8">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="w-24 h-24 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl animate-pulse" />
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl animate-pulse delay-75" />
                            </div>
                            <div className="flex-1 space-y-3">
                                <div className="h-6 bg-gradient-to-r from-purple-500/30 to-transparent rounded-full animate-pulse" />
                                <div className="h-4 bg-gradient-to-r from-pink-500/30 to-transparent rounded-full animate-pulse delay-75" />
                                <div className="h-3 bg-gradient-to-r from-purple-500/20 to-transparent rounded-full animate-pulse delay-150" />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }

    if (!data?.isPlaying) {
        return (
            <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black/40 to-pink-900/10" />
                <Card className="bg-black/60 border-purple-500/20 backdrop-blur-md relative">
                    <div className="p-8">
                        <div className="flex flex-col items-center justify-center text-center space-y-4">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                    <Music className="h-8 w-8 text-purple-400" />
                                </div>
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 animate-ping" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                    Nothing playing
                                </h3>
                                <p className="text-purple-200/60 mt-1">Your Spotify is taking a break</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <>
            <canvas ref={canvasRef} className="hidden" />
            <div
                ref={containerRef}
                className="relative overflow-hidden rounded-2xl mb-8"
                style={{
                    boxShadow: ambientMode
                        ? `0 0 120px 10px ${dominantColor}, 0 0 60px 5px ${secondaryColor}`
                        : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    transition: "box-shadow 0.8s ease-in-out",
                }}
            >
                {/* Enhanced ambient background */}
                {ambientMode && (
                    <div className="absolute inset-0 -z-10">
                        <motion.div
                            animate={{
                                scale: [1, pulseSize, 1],
                                rotate: [0, 2, 0, -2, 0],
                            }}
                            transition={{
                                duration: 3,
                                ease: "easeInOut",
                                repeat: Number.POSITIVE_INFINITY,
                            }}
                            className="absolute inset-0"
                            style={{
                                background: `radial-gradient(circle at 30% 70%, ${dominantColor} 0%, transparent 60%)`,
                                filter: "blur(40px)",
                            }}
                        />
                        <motion.div
                            animate={{
                                scale: [1.1, 1, 1.1],
                                opacity: [0.4, 0.7, 0.4],
                            }}
                            transition={{
                                duration: 4,
                                ease: "easeInOut",
                                repeat: Number.POSITIVE_INFINITY,
                            }}
                            className="absolute inset-0"
                            style={{
                                background: `radial-gradient(circle at 70% 30%, ${secondaryColor} 0%, transparent 50%)`,
                                filter: "blur(60px)",
                            }}
                        />
                        {/* Floating particles */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full"
                                style={{
                                    background: i % 2 === 0 ? dominantColor : secondaryColor,
                                    left: `${20 + i * 15}%`,
                                    top: `${30 + (i % 3) * 20}%`,
                                }}
                                animate={{
                                    y: [-10, 10, -10],
                                    opacity: [0.3, 0.8, 0.3],
                                }}
                                transition={{
                                    duration: 3 + i * 0.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: i * 0.3,
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Main player card */}
                <Card className="bg-black/70 border-purple-500/30 backdrop-blur-xl relative overflow-hidden">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                                backgroundSize: "20px 20px",
                            }}
                        />
                    </div>

                    {/* Enhanced equalizer */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 flex justify-center items-end space-x-1 px-6 opacity-60">
                        {[...Array(32)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 rounded-t-full"
                                style={{
                                    background: `linear-gradient(to top, ${dominantColor}, ${secondaryColor})`,
                                }}
                                initial={{ height: 2 }}
                                animate={{
                                    height: [2, Math.random() * 16 + 4, 3, Math.random() * 12 + 2, 2],
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                    delay: i * 0.03,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>

                    <div className="p-8 relative z-10">
                        {/* Header with controls */}
                        <div className="flex items-center justify-between mb-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/40 px-4 py-2 text-sm font-medium">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                                    Now Playing
                                </Badge>
                            </motion.div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
                                    onClick={() => setAmbientMode(!ambientMode)}
                                    title={ambientMode ? "Disable ambient mode" : "Enable ambient mode"}
                                >
                                    <Eye className={`h-4 w-4 ${ambientMode ? "text-purple-300" : "text-purple-500/50"}`} />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
                                    onClick={() => setIsLiked(!isLiked)}
                                >
                                    <Heart className={`h-4 w-4 ${isLiked ? "text-red-400 fill-red-400" : "text-white/60"}`} />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs"
                                    asChild
                                >
                                    <a href={data.songUrl} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-3 w-3 mr-2" />
                                        Spotify
                                    </a>
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                            {/* Enhanced album art */}
                            <motion.div
                                className="relative group"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <motion.div
                                    animate={{
                                        scale: ambientMode ? [1, pulseSize, 1] : 1,
                                        rotate: data.isPlaying ? [0, 360] : 0,
                                    }}
                                    transition={{
                                        scale: { duration: 0.6, ease: "easeInOut" },
                                        rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                                    }}
                                    className="absolute -inset-1 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `conic-gradient(from 0deg, ${dominantColor}, ${secondaryColor}, ${dominantColor})`,
                                        filter: "blur(8px)",
                                    }}
                                />
                                <div className="relative w-40 h-40 lg:w-48 lg:h-48 rounded-3xl overflow-hidden bg-black/20">
                                    <Image
                                        src={data.albumImageUrl || "/placeholder.svg"}
                                        alt={data.album}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                </div>

                                {/* Vinyl record effect */}
                                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                                    <div className="absolute inset-4 rounded-full border border-white/10" />
                                    <div className="absolute inset-8 rounded-full border border-white/5" />
                                    <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/40" />
                                </div>
                            </motion.div>

                            {/* Enhanced song details */}
                            <div className="flex-1 text-center lg:text-left space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <h2 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-2 leading-tight">
                                        {data.title}
                                    </h2>
                                    <p className="text-xl text-purple-200/90 mb-1">{data.artist}</p>
                                    <p className="text-sm text-purple-200/60">{data.album}</p>
                                </motion.div>

                                {/* Enhanced metadata */}
                                <motion.div
                                    className="flex flex-wrap gap-3 justify-center lg:justify-start"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <div className="flex items-center text-xs text-white/70 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                        <Volume2 className="h-3 w-3 mr-2" />
                                        <span>Spotify Connect</span>
                                    </div>
                                    <div className="flex items-center text-xs text-white/70 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                        <Clock className="h-3 w-3 mr-2" />
                                        <span>Live</span>
                                    </div>
                                    <div className="flex items-center text-xs text-white/70 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                                        <span>High Quality</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}
