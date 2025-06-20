"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Music, ExternalLink, Volume2, Clock, Video, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface SpotifyData {
    album: string
    albumImageUrl: string
    artist: string
    isPlaying: boolean
    songUrl: string
    title: string
    trackId: string
}

interface CanvasData {
    canvas_url?: string
    canvas_type?: string
    artist?: any
    trackUri?: string
    canvasUri?: string
    id?: string
    error?: string
}

export function SpotifyNowPlaying() {
    const [data, setData] = useState<SpotifyData | null>(null)
    const [loading, setLoading] = useState(true)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [dominantColor, setDominantColor] = useState<string>("rgba(139, 92, 246, 0.3)")
    const [pulseSize, setPulseSize] = useState(1)
    const [beatInterval, setBeatInterval] = useState<NodeJS.Timeout | null>(null)
    const [secondaryColor, setSecondaryColor] = useState<string>("rgba(236, 72, 153, 0.2)")
    const [canvasData, setCanvasData] = useState<CanvasData | null>(null)
    const [canvasLoading, setCanvasLoading] = useState(false)
    const [tempo, setTempo] = useState(120)
    const [energy, setEnergy] = useState(0.5)
    const [videoQuality, setVideoQuality] = useState<"loading" | "low" | "medium" | "high">("loading")

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch("/api/spotify")
                const spotifyData = await res.json()
                setData(spotifyData)

                // Only show toast for new tracks, not every refresh
                if (spotifyData.isPlaying && spotifyData.trackId) {
                    fetchCanvas(spotifyData.trackId)
                }
            } catch (error) {
                toast.error("Failed to fetch Spotify data", {
                    description: "Check your Spotify connection",
                })
            } finally {
                setLoading(false)
            }
        }

        fetchData()
        const interval = setInterval(fetchData, 30000)
        return () => clearInterval(interval)
    }, [])

    const fetchCanvas = async (trackId: string) => {
        setCanvasLoading(true)
        setVideoQuality("loading")

        // Show loading toast for Canvas
        const loadingToast = toast.loading("Loading Canvas video...", {
            description: "Fetching high-quality visuals",
        })

        try {
            const res = await fetch(`/api/spotify-canvas?trackId=${trackId}`)
            const canvas = await res.json()
            setCanvasData(canvas)

            if (canvas.canvas_url && videoRef.current) {
                const video = videoRef.current

                // Set video attributes for better quality
                video.src = canvas.canvas_url
                video.preload = "metadata"
                video.crossOrigin = "anonymous"

                // Quality detection and enhancement
                video.addEventListener("loadedmetadata", () => {
                    const width = video.videoWidth
                    const height = video.videoHeight

                    // Determine quality based on resolution
                    let quality: "low" | "medium" | "high"
                    if (width >= 1080) {
                        quality = "high"
                        toast.success("Canvas loaded in HD!", {
                            description: `${width}x${height} • Crystal clear quality`,
                        })
                    } else if (width >= 720) {
                        quality = "medium"
                        toast.success("Canvas loaded", {
                            description: `${width}x${height} • Good quality`,
                        })
                    } else {
                        quality = "low"
                        toast.warning("Canvas loaded (Low quality)", {
                            description: `${width}x${height} • Enhanced with filters`,
                        })
                    }

                    setVideoQuality(quality)
                    toast.dismiss(loadingToast)
                })

                video.addEventListener("error", () => {
                    toast.error("Canvas failed to load", {
                        description: "Video format not supported",
                    })
                    setVideoQuality("loading")
                    toast.dismiss(loadingToast)
                })

                video.addEventListener("canplay", () => {
                    toast.dismiss(loadingToast)
                })

                video.load()
            } else {
                toast.info("No Canvas available", {
                    description: "This track doesn't have a Canvas video",
                })
                setVideoQuality("loading")
                toast.dismiss(loadingToast)
            }
        } catch (error) {
            toast.error("Canvas API error", {
                description: "Failed to fetch Canvas data",
            })
            setCanvasData({ error: "Failed to load Canvas" })
            setVideoQuality("loading")
            toast.dismiss(loadingToast)
        } finally {
            setCanvasLoading(false)
        }
    }

    // Simplified color extraction for better performance
    useEffect(() => {
        if (!data?.albumImageUrl) return

        const img = new window.Image()
        img.crossOrigin = "anonymous"
        img.src = data.albumImageUrl

        img.onload = () => {
            const canvas = canvasRef.current
            if (!canvas) return

            const ctx = canvas.getContext("2d")
            if (!ctx) return

            // Smaller canvas for better performance
            canvas.width = 100
            canvas.height = 100
            ctx.drawImage(img, 0, 0, 100, 100)

            try {
                const imageData = ctx.getImageData(0, 0, 100, 100).data
                let r = 0,
                    g = 0,
                    b = 0,
                    count = 0

                // Simplified color extraction - just get average
                for (let i = 0; i < imageData.length; i += 16) {
                    r += imageData[i]
                    g += imageData[i + 1]
                    b += imageData[i + 2]
                    count++
                }

                r = Math.floor(r / count)
                g = Math.floor(g / count)
                b = Math.floor(b / count)

                setDominantColor(`rgba(${r}, ${g}, ${b}, 0.3)`)
                setSecondaryColor(`rgba(${255 - r}, ${255 - g}, ${255 - b}, 0.2)`)

                // Simplified BPM estimation
                let estimatedBPM = 120
                const titleLower = data.title.toLowerCase()

                if (titleLower.includes("slow") || titleLower.includes("ballad")) {
                    estimatedBPM = 80
                } else if (titleLower.includes("dance") || titleLower.includes("electronic")) {
                    estimatedBPM = 128
                } else if (titleLower.includes("rock") || titleLower.includes("metal")) {
                    estimatedBPM = 140
                }

                if (beatInterval) clearInterval(beatInterval)

                // Less frequent pulse for better performance
                const interval = setInterval(
                    () => {
                        setPulseSize((prev) => (prev === 1 ? 1.05 : 1))
                    },
                    (60 / estimatedBPM) * 1000,
                )

                setBeatInterval(interval)
            } catch (error) {
                // Only show toast for critical color extraction errors
                if (error instanceof Error && error.message.includes("CORS")) {
                    toast.error("Image loading blocked", {
                        description: "CORS policy prevented color extraction",
                    })
                }
            }
        }

        img.onerror = () => {
            toast.error("Album art failed to load", {
                description: "Using fallback colors",
            })
        }

        return () => {
            if (beatInterval) clearInterval(beatInterval)
        }
    }, [data?.albumImageUrl])

    if (loading) {
        return (
            <div className="relative overflow-hidden rounded-2xl">
                <Card className="bg-black/60 border-purple-500/20 backdrop-blur-sm relative">
                    <div className="p-8">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl animate-pulse" />
                            <div className="flex-1 space-y-3">
                                <div className="h-6 bg-gradient-to-r from-purple-500/30 to-transparent rounded-full animate-pulse" />
                                <div className="h-4 bg-gradient-to-r from-pink-500/30 to-transparent rounded-full animate-pulse" />
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
                <Card className="bg-black/60 border-purple-500/20 backdrop-blur-sm relative">
                    <div className="p-8">
                        <div className="flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                <Music className="h-8 w-8 text-purple-400" />
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

    const getQualityBadgeColor = () => {
        switch (videoQuality) {
            case "high":
                return "bg-green-500/20 text-green-400 border-green-500/40"
            case "medium":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
            case "low":
                return "bg-red-500/20 text-red-400 border-red-500/40"
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/40"
        }
    }

    const getQualityIcon = () => {
        switch (videoQuality) {
            case "high":
                return <Zap className="h-3 w-3 mr-1" />
            case "medium":
                return <Video className="h-3 w-3 mr-1" />
            case "low":
                return <Video className="h-3 w-3 mr-1" />
            default:
                return <Video className="h-3 w-3 mr-1" />
        }
    }

    return (
        <>
            <canvas ref={canvasRef} className="hidden" />
            <div
                ref={containerRef}
                className="relative overflow-hidden rounded-2xl mb-8"
                style={{
                    boxShadow: `0 0 80px 5px ${dominantColor}`,
                    transition: "box-shadow 0.8s ease-in-out",
                }}
            >
                {/* Enhanced Canvas + Minimal Ambient Background */}
                <div className="absolute inset-0 -z-10">
                    {/* ENHANCED Canvas Video Layer */}
                    {canvasData?.canvas_url && (
                        <div className="absolute inset-0">
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover"
                                style={{
                                    // CSS filters to enhance video quality
                                    filter:
                                        videoQuality === "low"
                                            ? "contrast(1.1) saturate(1.2) brightness(1.05) sharpen(1px)"
                                            : "contrast(1.05) saturate(1.1)",
                                    // Better scaling algorithm
                                    imageRendering: "crisp-edges",
                                    // Prevent blurry scaling
                                    transform: "translateZ(0)",
                                    backfaceVisibility: "hidden",
                                    perspective: "1000px",
                                    // Enhanced opacity based on quality
                                    opacity: videoQuality === "high" ? 0.98 : videoQuality === "medium" ? 0.95 : 0.9,
                                }}
                                autoPlay
                                loop
                                muted
                                playsInline
                                // Enhanced video attributes for better quality
                                preload="metadata"
                                crossOrigin="anonymous"
                                onLoadedData={() => {
                                    if (videoRef.current && data.isPlaying) {
                                        // Force high quality playback
                                        videoRef.current.playbackRate = 1.0
                                        videoRef.current.play()
                                    }
                                }}
                            />
                            {/* Minimal overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

                            {/* Quality enhancement overlay for low quality videos */}
                            {videoQuality === "low" && (
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: "radial-gradient(circle, transparent 0%, rgba(0,0,0,0.1) 100%)",
                                        mixBlendMode: "overlay",
                                    }}
                                />
                            )}
                        </div>
                    )}

                    {/* Minimal Ambient Effects (only when no Canvas) */}
                    {!canvasData?.canvas_url && (
                        <>
                            <motion.div
                                animate={{
                                    scale: [1, pulseSize, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    ease: "easeInOut",
                                    repeat: Number.POSITIVE_INFINITY,
                                }}
                                className="absolute inset-0"
                                style={{
                                    background: `radial-gradient(circle at 30% 70%, ${dominantColor} 0%, transparent 60%)`,
                                    filter: "blur(20px)",
                                }}
                            />
                            <motion.div
                                animate={{
                                    scale: [1.1, 1, 1.1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 3,
                                    ease: "easeInOut",
                                    repeat: Number.POSITIVE_INFINITY,
                                }}
                                className="absolute inset-0"
                                style={{
                                    background: `radial-gradient(circle at 70% 30%, ${secondaryColor} 0%, transparent 50%)`,
                                    filter: "blur(30px)",
                                }}
                            />
                        </>
                    )}

                    {/* Minimal particles */}
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full opacity-40"
                            style={{
                                background: i % 2 === 0 ? dominantColor : secondaryColor,
                                left: `${25 + i * 20}%`,
                                top: `${40 + (i % 2) * 20}%`,
                            }}
                            animate={{
                                y: [-5, 5, -5],
                                opacity: [0.2, 0.6, 0.2],
                            }}
                            transition={{
                                duration: 4 + i,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.5,
                            }}
                        />
                    ))}
                </div>

                {/* Main player card */}
                <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm relative overflow-hidden">
                    {/* Simplified equalizer */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 flex justify-center items-end space-x-1 px-6 opacity-40">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 rounded-t-full"
                                style={{
                                    background: `linear-gradient(to top, ${dominantColor}, ${secondaryColor})`,
                                }}
                                initial={{ height: 1 }}
                                animate={{
                                    height: [1, Math.random() * 12 + 2, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                    delay: i * 0.05,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>

                    <div className="p-8 relative z-10">
                        {/* Header with enhanced status */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/40 px-4 py-2 text-sm font-medium">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                                    Now Playing
                                </Badge>
                                {canvasData?.canvas_url && (
                                    <Badge className={`px-3 py-1 text-xs ${getQualityBadgeColor()}`}>
                                        {getQualityIcon()}
                                        {videoQuality.toUpperCase()} CANVAS
                                    </Badge>
                                )}
                                {canvasLoading && (
                                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/40 px-3 py-1 text-xs">
                                        Loading Canvas...
                                    </Badge>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
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
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div
                                    className="absolute -inset-1 rounded-3xl opacity-50 transition-opacity duration-300 group-hover:opacity-70"
                                    style={{
                                        background: `linear-gradient(45deg, ${dominantColor}, ${secondaryColor})`,
                                    }}
                                />
                                <div className="relative w-40 h-40 lg:w-48 lg:h-48 rounded-3xl overflow-hidden bg-black/20">
                                    <Image
                                        src={data.albumImageUrl || "/placeholder.svg"}
                                        alt={data.album}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        style={{
                                            // Enhanced image rendering
                                            imageRendering: "crisp-edges",
                                        }}
                                    />
                                </div>
                            </motion.div>

                            {/* Song details */}
                            <div className="flex-1 text-center lg:text-left space-y-4">
                                <div>
                                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
                                        {data.title}
                                    </h2>
                                    <p className="text-xl text-purple-200/90 mb-1 drop-shadow-md">{data.artist}</p>
                                    <p className="text-sm text-purple-200/60 drop-shadow-sm">{data.album}</p>
                                </div>

                                {/* Enhanced metadata */}
                                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
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
                                        <span>Enhanced Quality</span>
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
