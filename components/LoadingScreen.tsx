"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Wifi, Terminal, Zap, Eye, Brain, Database, Lock, Activity } from "lucide-react"

interface LoadingScreenProps {
    onLoadingComplete?: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0)
    const [phase, setPhase] = useState(1)
    const [systemMessages, setSystemMessages] = useState<string[]>([])
    const [currentMessage, setCurrentMessage] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const [shouldHide, setShouldHide] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    // Refs to prevent memory leaks
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const completionHandledRef = useRef(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationFrameRef = useRef<number>()

    // Pre-defined particle positions to avoid hydration issues
    const particlePositions = [
        { x: 10, y: 20, speed: 0.5, color: "#8b5cf6" },
        { x: 80, y: 15, speed: 0.7, color: "#06b6d4" },
        { x: 30, y: 70, speed: 0.6, color: "#ec4899" },
        { x: 90, y: 60, speed: 0.4, color: "#10b981" },
        { x: 50, y: 30, speed: 0.8, color: "#f59e0b" },
        { x: 20, y: 80, speed: 0.3, color: "#ef4444" },
    ]

    // System messages for different phases
    const messages = [
        "🔧 Initializing quantum processors...",
        "🧠 Establishing neural link...",
        "🔒 Decrypting security protocols...",
        "💻 Loading cybernetic interface...",
        "📡 Synchronizing data streams...",
        "🎯 Activating holographic display...",
        "👁️ Calibrating biometric sensors...",
        "🌐 Connecting to the mainframe...",
        "⚡ Uploading consciousness...",
        "✅ System ready. Welcome to the future.",
    ]

    // Handle completion
    const handleCompletion = useCallback(() => {
        if (completionHandledRef.current) return
        completionHandledRef.current = true

        setIsComplete(true)
        setSystemMessages((prev) => [...prev, "✅ System initialization complete!"])

        // Wait 2 seconds at 100% before starting fade out
        setTimeout(() => {
            setShouldHide(true)
            if (onLoadingComplete) {
                onLoadingComplete()
            }
        }, 2000)
    }, [onLoadingComplete])

    // Typewriter effect for messages
    const typeMessage = useCallback((message: string) => {
        setIsTyping(true)
        setCurrentMessage("")

        let charIndex = 0
        const typeInterval = setInterval(() => {
            if (charIndex < message.length) {
                setCurrentMessage((prev) => prev + message[charIndex])
                charIndex++
            } else {
                clearInterval(typeInterval)
                setIsTyping(false)

                setTimeout(() => {
                    setSystemMessages((prev) => [...prev, message].slice(-4)) // Keep only last 4 messages
                    setCurrentMessage("")
                }, 300)
            }
        }, 30)
    }, [])

    // Matrix rain effect
    useEffect(() => {
        if (!isMounted) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        const fontSize = 14
        const columns = Math.floor(canvas.width / fontSize)
        const drops: number[] = []
        const speeds: number[] = []

        // Initialize drops with fixed positions
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor((i * 7) % 50) - 50 // Deterministic initial positions
            speeds[i] = 0.5 + (i % 3) * 0.2 // Deterministic speeds
        }

        const matrix =
            "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ"

        const drawMatrix = () => {
            ctx.fillStyle = "rgba(10, 10, 11, 0.1)"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.font = `${fontSize}px 'JetBrains Mono', 'Courier New', monospace`

            for (let i = 0; i < drops.length; i++) {
                const text = matrix[Math.floor((i + drops[i]) * 7) % matrix.length] // Deterministic character selection
                const alpha = 0.3 + (i % 5) * 0.1

                // Alternate colors based on column
                if (i % 3 === 0) {
                    ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`
                } else if (i % 3 === 1) {
                    ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`
                } else {
                    ctx.fillStyle = `rgba(236, 72, 153, ${alpha})`
                }

                ctx.fillText(text, i * fontSize, drops[i] * fontSize)

                if (drops[i] * fontSize > canvas.height && (i + Math.floor(Date.now() / 1000)) % 40 === 0) {
                    drops[i] = 0
                }

                drops[i] += speeds[i]
            }

            animationFrameRef.current = requestAnimationFrame(drawMatrix)
        }

        drawMatrix()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [isMounted])

    // Main progress logic - GUARANTEED to reach 100%
    useEffect(() => {
        setIsMounted(true)

        let currentProgress = 0
        const targetDuration = 5000 // 5 seconds total
        const updateInterval = 50 // Update every 50ms
        const totalUpdates = targetDuration / updateInterval
        const incrementPerUpdate = 100 / totalUpdates

        progressIntervalRef.current = setInterval(() => {
            currentProgress += incrementPerUpdate

            if (currentProgress >= 100) {
                currentProgress = 100
                setProgress(100)

                if (progressIntervalRef.current) {
                    clearInterval(progressIntervalRef.current)
                    progressIntervalRef.current = null
                }

                handleCompletion()
                return
            }

            setProgress(currentProgress)

            // Phase transitions
            if (currentProgress >= 25 && phase === 1) setPhase(2)
            else if (currentProgress >= 50 && phase === 2) setPhase(3)
            else if (currentProgress >= 75 && phase === 3) setPhase(4)
        }, updateInterval)

        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current)
            }
            if (messageTimeoutRef.current) {
                clearTimeout(messageTimeoutRef.current)
            }
        }
    }, [handleCompletion, phase])

    // Message system
    useEffect(() => {
        if (isComplete) return

        const messageIndex = Math.floor((progress / 100) * messages.length)
        if (messageIndex < messages.length && messageIndex !== systemMessages.length) {
            messageTimeoutRef.current = setTimeout(
                () => {
                    typeMessage(messages[messageIndex])
                },
                Math.floor(messageIndex * 100) + 200,
            )
        }
    }, [progress, systemMessages.length, messages, isComplete, typeMessage])

    // Get loading message based on phase
    const getLoadingMessage = () => {
        if (progress >= 100) return "🎉 System initialization complete!"

        switch (phase) {
            case 1:
                return "🔧 Initializing neural interface..."
            case 2:
                return "🌐 Establishing quantum connection..."
            case 3:
                return "💻 Loading cyberpunk environment..."
            case 4:
                return "⚡ Finalizing system protocols..."
            default:
                return "🚀 System ready"
        }
    }

    // Get icon based on phase
    const getPhaseIcon = () => {
        switch (phase) {
            case 1:
                return <Brain className="h-6 w-6 text-purple-400" />
            case 2:
                return <Wifi className="h-6 w-6 text-cyan-400" />
            case 3:
                return <Eye className="h-6 w-6 text-pink-400" />
            case 4:
                return <Lock className="h-6 w-6 text-green-400" />
            default:
                return <Zap className="h-6 w-6 text-yellow-400" />
        }
    }

    if (!isMounted) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0b]">
                <div className="text-purple-400 text-xl font-mono">Loading...</div>
            </div>
        )
    }

    return (
        <AnimatePresence>
            {!shouldHide && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0b] overflow-hidden"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Matrix background */}
                    <canvas ref={canvasRef} className="absolute inset-0 opacity-20" />

                    {/* Floating particles - client-side only */}
                    <div className="absolute inset-0 pointer-events-none">
                        {particlePositions.map((particle, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full"
                                style={{
                                    backgroundColor: particle.color,
                                    left: `${particle.x}%`,
                                    top: `${particle.y}%`,
                                }}
                                animate={{
                                    y: [0, -20, 0],
                                    opacity: [0.3, 0.8, 0.3],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 3 + particle.speed,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>

                    {/* Scan lines */}
                    <div className="absolute inset-0 pointer-events-none opacity-30">
                        <motion.div
                            className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                            animate={{ y: [0, window.innerHeight || 800] }}
                            transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}
                        />
                    </div>

                    <div className="relative w-full max-w-4xl px-6 z-20">
                        {/* Main container */}
                        <motion.div
                            className="relative bg-black/80 border border-purple-500/30 rounded-2xl p-8 overflow-hidden backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                ...(isComplete && {
                                    borderColor: ["rgba(139, 92, 246, 0.3)", "rgba(6, 182, 212, 0.6)", "rgba(139, 92, 246, 0.3)"],
                                }),
                            }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                                borderColor: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                            }}
                        >
                            {/* Animated border glow */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 blur-xl" />

                            <div className="relative z-10">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <motion.div
                                            animate={{ rotate: isComplete ? 0 : 360 }}
                                            transition={{ duration: 2, repeat: isComplete ? 0 : Number.POSITIVE_INFINITY, ease: "linear" }}
                                        >
                                            {getPhaseIcon()}
                                        </motion.div>
                                        <div>
                                            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400">
                                                ARAXYSO.DEV
                                            </h1>
                                            <p className="text-sm text-purple-300/60 font-mono">Cyberpunk Interface v3.0</p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-xs text-purple-300/50 font-mono">PHASE {phase}/4</div>
                                        <div className="text-xl font-mono text-cyan-400">{progress.toFixed(0)}%</div>
                                    </div>
                                </div>

                                {/* Progress section */}
                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-purple-200/80 font-medium text-sm">{getLoadingMessage()}</span>
                                        <span className="text-cyan-400 font-mono text-xs">{progress.toFixed(1)}%</span>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="relative w-full h-3 bg-purple-900/20 rounded-full overflow-hidden border border-purple-500/20">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 rounded-full relative overflow-hidden"
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        >
                                            {/* Animated highlight */}
                                            <motion.div
                                                className="absolute top-0 left-0 w-full h-full bg-white/20"
                                                animate={{
                                                    x: ["-100%", "200%"],
                                                    opacity: [0, 0.6, 0],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    ease: "easeInOut",
                                                }}
                                            />
                                        </motion.div>

                                        {/* Progress segments */}
                                        <div className="absolute inset-0 flex">
                                            {[25, 50, 75].map((segment) => (
                                                <div key={segment} className="border-r border-purple-400/30" style={{ width: `${segment}%` }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* System stats */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                                    {[
                                        { icon: Brain, label: "Neural", value: Math.min(100, progress + 5), color: "purple" },
                                        { icon: Shield, label: "Security", value: Math.min(100, progress + 2), color: "cyan" },
                                        { icon: Database, label: "Memory", value: Math.min(100, progress), color: "pink" },
                                        { icon: Activity, label: "System", value: Math.min(100, progress - 3), color: "green" },
                                    ].map((stat, index) => (
                                        <motion.div
                                            key={stat.label}
                                            className="bg-black/40 border border-purple-500/20 rounded-lg p-3 backdrop-blur-sm"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <stat.icon className="h-4 w-4 text-purple-400" />
                                                <span className="text-cyan-400 font-mono text-xs">{Math.max(0, stat.value).toFixed(0)}%</span>
                                            </div>
                                            <div className="text-xs text-purple-200/60 font-medium">{stat.label}</div>
                                            <div className="w-full h-1 bg-purple-900/30 rounded-full mt-2 overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: `${Math.max(0, stat.value)}%` }}
                                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Terminal */}
                                <div className="bg-black/60 border border-cyan-500/20 rounded-lg p-4 font-mono text-xs h-28 overflow-hidden">
                                    <div className="text-cyan-400 mb-2 flex items-center gap-2">
                                        <Terminal className="h-3 w-3" />
                                        <span>SYSTEM CONSOLE</span>
                                        <div className="flex gap-1 ml-auto">
                                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <AnimatePresence>
                                            {systemMessages.map((message, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    className="text-green-400"
                                                >
                                                    {message}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>

                                        {currentMessage && (
                                            <div className="text-yellow-400 flex items-center">
                                                {currentMessage}
                                                {isTyping && (
                                                    <motion.span
                                                        className="ml-1 text-cyan-400"
                                                        animate={{ opacity: [1, 0] }}
                                                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                                                    >
                                                        ▋
                                                    </motion.span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Completion overlay */}
                                {isComplete && (
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-20 rounded-2xl"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <motion.div
                                            className="text-center"
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: 2, ease: "linear" }}>
                                                <Zap className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                                            </motion.div>
                                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 mb-2">
                                                SYSTEM READY
                                            </h2>
                                            <p className="text-cyan-400">Welcome to the cyberpunk interface</p>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
