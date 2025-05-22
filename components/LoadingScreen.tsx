"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cpu, Shield, Wifi, Code2, Terminal, Zap } from "lucide-react"

export function LoadingScreen() {
    const [progress, setProgress] = useState(0)
    const [phase, setPhase] = useState(1)
    const [glitchText, setGlitchText] = useState(false)
    const [scanLines, setScanLines] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const scanLinesTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Matrix-like rain effect
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        // Matrix rain effect
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const fontSize = 14
        const columns = Math.floor(canvas.width / fontSize)
        const drops: number[] = []

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -100)
        }

        const matrix =
            "01010101アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

        const drawMatrix = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.fillStyle = "#0f0"
            ctx.font = `${fontSize}px monospace`

            for (let i = 0; i < drops.length; i++) {
                const text = matrix[Math.floor(Math.random() * matrix.length)]
                ctx.fillStyle = `rgba(130, 87, 229, ${Math.random() * 0.8 + 0.2})`
                ctx.fillText(text, i * fontSize, drops[i] * fontSize)

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0
                }

                drops[i]++
            }
        }

        const matrixInterval = setInterval(drawMatrix, 50)

        // Progress bar animation
        intervalRef.current = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    if (intervalRef.current) clearInterval(intervalRef.current)
                    return 100
                }

                // Simulate different loading phases
                if (prevProgress === 33 && phase === 1) {
                    setPhase(2)
                    return prevProgress + 1
                } else if (prevProgress === 66 && phase === 2) {
                    setPhase(3)
                    return prevProgress + 1
                }

                return prevProgress + 1
            })
        }, 50)

        // Random glitch effect
        glitchIntervalRef.current = setInterval(() => {
            setGlitchText(true)
            setTimeout(() => setGlitchText(false), 200)
        }, 2000)

        // Scan lines effect after a delay
        scanLinesTimeoutRef.current = setTimeout(() => {
            setScanLines(true)
        }, 1000)

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
            if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current)
            if (scanLinesTimeoutRef.current) clearTimeout(scanLinesTimeoutRef.current)
            clearInterval(matrixInterval)
        }
    }, [phase])

    // Get loading message based on phase
    const getLoadingMessage = () => {
        switch (phase) {
            case 1:
                return "Initializing neural interface..."
            case 2:
                return "Establishing secure connection..."
            case 3:
                return "Loading cyberpunk environment..."
            default:
                return "System ready"
        }
    }

    // Get icon based on phase
    const getPhaseIcon = () => {
        switch (phase) {
            case 1:
                return <Cpu className="h-6 w-6 text-purple-400" />
            case 2:
                return <Shield className="h-6 w-6 text-purple-400" />
            case 3:
                return <Terminal className="h-6 w-6 text-purple-400" />
            default:
                return <Zap className="h-6 w-6 text-purple-400" />
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
            {/* Matrix-like background */}
            <canvas ref={canvasRef} className="absolute inset-0 opacity-20" />

            {/* Scan lines effect */}
            {scanLines && (
                <div className="absolute inset-0 pointer-events-none z-10">
                    <div
                        className="w-full h-full"
                        style={{
                            background:
                                "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)",
                            backgroundSize: "100% 2px",
                        }}
                    />
                </div>
            )}

            <div className="relative w-full max-w-md px-4 z-20">
                {/* Ambient glow */}
                <div className="absolute top-0 left-0 w-full h-full bg-purple-500/10 rounded-lg filter blur-xl"></div>

                {/* Main container */}
                <motion.div
                    className="relative bg-black/80 border border-purple-500/30 rounded-lg p-8 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Top border glow */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />

                    {/* Left border glow */}
                    <motion.div
                        className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500/0 via-purple-500 to-purple-500/0"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                    />

                    {/* Right border glow */}
                    <motion.div
                        className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-purple-500/0 via-purple-500 to-purple-500/0"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                    />

                    {/* Bottom border glow */}
                    <motion.div
                        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
                    />

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        {getPhaseIcon()}
                        <motion.h2
                            className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 ${glitchText ? "glitch-text" : ""}`}
                            data-text="Initializing Cyberpunk Interface"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Initializing Cyberpunk Interface
                        </motion.h2>
                    </div>

                    {/* Progress bar */}
                    <div className="relative w-full h-2 bg-purple-900/20 rounded-full overflow-hidden mb-6">
                        <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                            style={{ width: `${progress}%` }}
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Animated highlight */}
                        <motion.div
                            className="absolute top-0 left-0 w-20 h-full bg-white/30"
                            animate={{
                                x: ["-100%", "100%"],
                                opacity: [0, 0.5, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                                ease: "easeInOut",
                                times: [0, 0.5, 1],
                            }}
                        />
                    </div>

                    {/* Loading message */}
                    <motion.p
                        className="text-purple-200/70 mb-6"
                        key={phase} // Force re-animation when phase changes
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {getLoadingMessage()}
                    </motion.p>

                    {/* System stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-purple-900/20 rounded px-3 py-2 text-xs text-purple-200/70 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Cpu className="h-3 w-3" /> Neural Systems
              </span>
                            <span>{Math.min(100, progress + 10)}%</span>
                        </div>
                        <div className="bg-purple-900/20 rounded px-3 py-2 text-xs text-purple-200/70 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3" /> Firewall
              </span>
                            <span>{Math.min(100, progress + 5)}%</span>
                        </div>
                        <div className="bg-purple-900/20 rounded px-3 py-2 text-xs text-purple-200/70 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Wifi className="h-3 w-3" /> Network
              </span>
                            <span>{Math.min(100, progress)}%</span>
                        </div>
                        <div className="bg-purple-900/20 rounded px-3 py-2 text-xs text-purple-200/70 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Code2 className="h-3 w-3" /> Encryption
              </span>
                            <span>{Math.min(100, progress - 5 > 0 ? progress - 5 : 0)}%</span>
                        </div>
                    </div>

                    {/* Terminal output */}
                    <div className="bg-black/50 border border-purple-900/30 rounded p-3 font-mono text-xs text-purple-200/70 h-24 overflow-hidden">
                        <AnimatePresence>
                            {progress > 10 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p className="text-green-400">[SUCCESS]</p>
                                    <p>Initializing core systems...</p>
                                </motion.div>
                            )}
                            {progress > 30 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    <p className="text-green-400">[SUCCESS]</p>
                                    <p>Neural interface connected.</p>
                                </motion.div>
                            )}
                            {progress > 50 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                    <p className="text-yellow-400">[WARNING]</p>
                                    <p>Detected unauthorized access attempt. Countermeasures engaged.</p>
                                </motion.div>
                            )}
                            {progress > 70 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.3 }}
                                >
                                    <p className="text-green-400">[SUCCESS]</p>
                                    <p>Security protocols activated. Establishing secure connection.</p>
                                </motion.div>
                            )}
                            {progress > 90 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.4 }}
                                >
                                    <p className="text-green-400">[SUCCESS]</p>
                                    <p>Cyberpunk interface ready. Welcome, user.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
