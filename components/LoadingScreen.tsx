"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cpu, Shield, Wifi, Terminal, Zap, Eye, Brain, Database, Lock } from "lucide-react"

interface LoadingScreenProps {
    onLoadingComplete?: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0)
    const [phase, setPhase] = useState(1)
    const [glitchText, setGlitchText] = useState(false)
    const [scanLines, setScanLines] = useState(false)
    const [systemMessages, setSystemMessages] = useState<string[]>([])
    const [currentMessage, setCurrentMessage] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const scanLinesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Matrix-like rain effect with enhanced visuals
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // System messages for different phases
    const messages = [
        "Initializing quantum processors...",
        "Establishing neural link...",
        "Decrypting security protocols...",
        "Loading cybernetic interface...",
        "Synchronizing data streams...",
        "Activating holographic display...",
        "Calibrating biometric sensors...",
        "Connecting to the mainframe...",
        "Uploading consciousness...",
        "System ready. Welcome to the future.",
    ]

    // Typewriter effect for messages
    const typeMessage = (message: string) => {
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

                // Add to system messages after typing is complete
                setTimeout(() => {
                    setSystemMessages((prev) => [...prev, message].slice(-5)) // Keep only last 5 messages
                    setCurrentMessage("")
                }, 500)
            }
        }, 50)
    }

    // Force the loading to complete in a reasonable time
    useEffect(() => {
        const forceCompleteTimeout = setTimeout(() => {
            if (progress < 100) {
                console.log("Force completing loading...")
                setProgress(100)
            }
        }, 10000) // Force complete after 10 seconds max

        return () => clearTimeout(forceCompleteTimeout)
    }, [])

    useEffect(() => {
        // Enhanced Matrix rain effect
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const fontSize = 16
        const columns = Math.floor(canvas.width / fontSize)
        const drops: number[] = []
        const speeds: number[] = []
        const colors: string[] = []

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -100)
            speeds[i] = Math.random() * 0.5 + 0.5
            colors[i] = Math.random() > 0.7 ? "#8b5cf6" : "#06b6d4"
        }

        const matrix =
            "01010101アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ"

        const drawMatrix = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.08)"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.font = `${fontSize}px 'Courier New', monospace`

            for (let i = 0; i < drops.length; i++) {
                const text = matrix[Math.floor(Math.random() * matrix.length)]
                const alpha = Math.random() * 0.8 + 0.2

                if (colors[i] === "#8b5cf6") {
                    ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`
                } else {
                    ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`
                }

                ctx.fillText(text, i * fontSize, drops[i] * fontSize)

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0
                    colors[i] = Math.random() > 0.7 ? "#8b5cf6" : "#06b6d4"
                }

                drops[i] += speeds[i]
            }
        }

        const matrixInterval = setInterval(drawMatrix, 50)

        // Progress bar animation with guaranteed completion
        // Much faster progress increments to ensure completion
        intervalRef.current = setInterval(() => {
            setProgress((prevProgress) => {
                // Log progress for debugging
                console.log("Current progress:", prevProgress)

                if (prevProgress >= 100) {
                    if (intervalRef.current) clearInterval(intervalRef.current)

                    if (!isComplete) {
                        setIsComplete(true)
                        console.log("Loading complete!")

                        // Add final completion message
                        setSystemMessages((prev) => [
                            ...prev,
                            "System initialization complete. Welcome to the cyberpunk interface.",
                        ])

                        // Delay before hiding
                        setTimeout(() => {
                            console.log("Triggering onLoadingComplete callback")
                            if (onLoadingComplete) onLoadingComplete()

                            // Fade out animation
                            setTimeout(() => {
                                setIsVisible(false)
                            }, 1000)
                        }, 2000)
                    }

                    return 100
                }

                // Much faster increments to ensure we reach 100%
                const increment = 2.5

                // Phase transitions
                if (prevProgress >= 25 && phase === 1) setPhase(2)
                else if (prevProgress >= 50 && phase === 2) setPhase(3)
                else if (prevProgress >= 75 && phase === 3) setPhase(4)

                // Ensure we don't overshoot 100%
                return Math.min(100, prevProgress + increment)
            })
        }, 40) // Much faster interval (40ms)

        // Enhanced glitch effect
        glitchIntervalRef.current = setInterval(
            () => {
                setGlitchText(true)
                setTimeout(() => setGlitchText(false), Math.random() * 300 + 100)
            },
            Math.random() * 2000 + 1000,
        )

        // Scan lines effect
        scanLinesTimeoutRef.current = setTimeout(() => {
            setScanLines(true)
        }, 800)

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
            if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current)
            if (scanLinesTimeoutRef.current) clearTimeout(scanLinesTimeoutRef.current)
            if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current)
            clearInterval(matrixInterval)
        }
    }, [phase, isComplete, onLoadingComplete])

    // Message system
    useEffect(() => {
        const messageIndex = Math.floor((progress / 100) * messages.length)
        if (messageIndex < messages.length && messageIndex !== systemMessages.length) {
            messageTimeoutRef.current = setTimeout(
                () => {
                    typeMessage(messages[messageIndex])
                },
                Math.random() * 500 + 300, // Faster message typing
            )
        }
    }, [progress, systemMessages.length, messages])

    // Get loading message based on phase
    const getLoadingMessage = () => {
        if (progress >= 100) return "System initialization complete!"

        switch (phase) {
            case 1:
                return "Initializing neural interface..."
            case 2:
                return "Establishing quantum connection..."
            case 3:
                return "Loading cyberpunk environment..."
            case 4:
                return "Finalizing system protocols..."
            default:
                return "System ready"
        }
    }

    // Get icon based on phase
    const getPhaseIcon = () => {
        switch (phase) {
            case 1:
                return <Brain className="h-8 w-8 text-purple-400" />
            case 2:
                return <Wifi className="h-8 w-8 text-cyan-400" />
            case 3:
                return <Eye className="h-8 w-8 text-pink-400" />
            case 4:
                return <Lock className="h-8 w-8 text-green-400" />
            default:
                return <Zap className="h-8 w-8 text-yellow-400" />
        }
    }

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
            {/* Enhanced Matrix background */}
            <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />

            {/* Animated background particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-500 rounded-full"
                        animate={{
                            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                        style={{
                            left: Math.random() * 100 + "%",
                            top: Math.random() * 100 + "%",
                        }}
                    />
                ))}
            </div>

            {/* Enhanced scan lines */}
            {scanLines && (
                <div className="absolute inset-0 pointer-events-none z-10">
                    <motion.div
                        className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                        animate={{
                            y: [0, window.innerHeight],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                    <div
                        className="w-full h-full opacity-20"
                        style={{
                            background:
                                "repeating-linear-gradient(0deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.1) 1px, transparent 1px, transparent 3px)",
                        }}
                    />
                </div>
            )}

            <div className="relative w-full max-w-4xl px-6 z-20">
                {/* Holographic glow effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20 rounded-2xl filter blur-3xl animate-pulse"></div>

                {/* Main container */}
                <motion.div
                    className="relative bg-black/90 border border-purple-500/50 rounded-2xl p-8 overflow-hidden backdrop-blur-sm"
                    animate={{
                        opacity: isComplete ? [1, 0.8, 1] : 1,
                        scale: isComplete ? [1, 0.98, 1] : 1,
                    }}
                    transition={{
                        duration: isComplete ? 1.5 : 0.8,
                        ease: "easeOut",
                        repeat: isComplete ? 0 : undefined,
                    }}
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                >
                    {/* Animated border glow */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                            background: "linear-gradient(45deg, #8b5cf6, #06b6d4, #ec4899, #8b5cf6)",
                            backgroundSize: "400% 400%",
                        }}
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    >
                        <div className="absolute inset-[2px] bg-black/90 rounded-2xl" />
                    </motion.div>

                    <div className="relative z-10">
                        {/* Header with enhanced styling */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                >
                                    {getPhaseIcon()}
                                </motion.div>
                                <motion.h1
                                    className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 ${
                                        glitchText ? "animate-pulse" : ""
                                    }`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    CYBERPUNK INTERFACE v2.0
                                </motion.h1>
                            </div>

                            <div className="text-right">
                                <div className="text-sm text-purple-300/70">PHASE {phase}/4</div>
                                <div className="text-lg font-mono text-cyan-400">{progress.toFixed(0)}%</div>
                            </div>
                        </div>

                        {/* Enhanced progress section */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-purple-200/80 font-medium">{getLoadingMessage()}</span>
                                <span className="text-cyan-400 font-mono text-sm">{progress.toFixed(1)}%</span>
                            </div>

                            {/* Multi-layered progress bar */}
                            <div className="relative w-full h-4 bg-purple-900/30 rounded-full overflow-hidden border border-purple-500/30">
                                {/* Background glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full" />

                                {/* Main progress */}
                                <motion.div
                                    className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 rounded-full relative overflow-hidden"
                                    style={{ width: `${progress}%` }}
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                    {/* Animated highlight */}
                                    <motion.div
                                        className="absolute top-0 left-0 w-full h-full bg-white/30"
                                        animate={{
                                            x: ["-100%", "200%"],
                                            opacity: [0, 0.8, 0],
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
                                        <div key={segment} className="border-r border-purple-400/50" style={{ width: `${segment}%` }} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Enhanced system stats grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            {[
                                { icon: Brain, label: "Neural Core", value: Math.min(100, progress + 15), color: "purple" },
                                { icon: Shield, label: "Firewall", value: Math.min(100, progress + 8), color: "cyan" },
                                { icon: Database, label: "Memory", value: Math.min(100, progress + 3), color: "pink" },
                                { icon: Cpu, label: "Quantum CPU", value: Math.min(100, progress), color: "green" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className={`bg-gradient-to-br from-${stat.color}-900/30 to-${stat.color}-800/20 border border-${stat.color}-500/30 rounded-lg p-4 backdrop-blur-sm`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <stat.icon className={`h-5 w-5 text-${stat.color}-400`} />
                                        <span className={`text-${stat.color}-400 font-mono text-sm`}>{stat.value.toFixed(0)}%</span>
                                    </div>
                                    <div className={`text-xs text-${stat.color}-200/70 font-medium`}>{stat.label}</div>
                                    <div className={`w-full h-1 bg-${stat.color}-900/40 rounded-full mt-2 overflow-hidden`}>
                                        <motion.div
                                            className={`h-full bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-400 rounded-full`}
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${stat.value}%` }}
                                            transition={{ duration: 0.8, delay: index * 0.1 }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Enhanced terminal with typing effect */}
                        <div className="bg-black/70 border border-cyan-500/30 rounded-lg p-4 font-mono text-sm h-32 overflow-hidden relative">
                            <div className="text-cyan-400 mb-2 flex items-center gap-2">
                                <Terminal className="h-4 w-4" />
                                <span>SYSTEM CONSOLE</span>
                                <div className="flex gap-1 ml-auto">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                </div>
                            </div>

                            <div className="space-y-1 text-xs">
                                <AnimatePresence>
                                    {systemMessages.map((message, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="text-green-400"
                                        >
                                            <span className="text-cyan-400">[SUCCESS]</span> {message}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {currentMessage && (
                                    <div className="text-yellow-400 flex items-center">
                                        <span className="text-cyan-400">[LOADING]</span> {currentMessage}
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

                        {/* Completion indicator - only shows at 100% */}
                        {isComplete && (
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-20"
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
                                    <Zap className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 mb-2">
                                        SYSTEM READY
                                    </h2>
                                    <p className="text-cyan-400">Initialization complete. Welcome to the future.</p>
                                </motion.div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
