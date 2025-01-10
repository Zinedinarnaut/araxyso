'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function LoadingScreen() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(timer)
                    return 100
                }
                return prevProgress + 10
            })
        }, 100)

        return () => clearInterval(timer)
    }, [])

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: progress === 100 ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => {
                if (progress === 100) {
                    document.body.style.overflow = 'auto'
                }
            }}
        >
            <div className="relative w-full max-w-md px-4">
                <div className="absolute top-0 left-0 w-full h-full bg-purple-500/10 rounded-lg filter blur-xl"></div>
                <motion.div
                    className="relative bg-black/80 border border-purple-500/30 rounded-lg p-8 overflow-hidden"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <motion.div
                        className="w-full h-2 bg-purple-900/20 rounded-full overflow-hidden mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                        />
                    </motion.div>
                    <motion.h2
                        className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Initializing Cyberpunk Interface
                    </motion.h2>
                    <motion.p
                        className="text-purple-200/70 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Booting neural systems...
                    </motion.p>
                    <div className="grid grid-cols-3 gap-2">
                        {['Firewall', 'Encryption', 'Synapses'].map((item, index) => (
                            <motion.div
                                key={item}
                                className="bg-purple-900/20 rounded px-2 py-1 text-xs text-purple-200/50"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                            >
                                {item}: {Math.min(100, progress + index * 10)}%
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

