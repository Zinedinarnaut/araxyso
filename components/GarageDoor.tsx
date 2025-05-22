"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

interface GarageDoorProps {
    children: React.ReactNode
    title: string
    icon?: React.ElementType
    defaultOpen?: boolean
}

export function GarageDoor({ children, title, icon: Icon, defaultOpen = false }: GarageDoorProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <div className="bg-black/50 border border-purple-900/20 rounded-lg overflow-hidden">
            <motion.button
                className="w-full p-4 flex justify-between items-center text-purple-200 hover:bg-purple-500/20 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
        <span className="text-lg font-semibold flex items-center">
          {Icon && <Icon className="h-5 w-5 mr-2 text-purple-400" />}
            {title}
        </span>
                {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </motion.button>
            <motion.div
                initial={false}
                animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.33, 1, 0.68, 1],
                }}
                className="relative overflow-hidden"
            >
                <motion.div
                    className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-purple-500/0 via-purple-500/70 to-purple-500/0"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
                />
                <motion.div
                    className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-purple-500/0 via-purple-500/70 to-purple-500/0"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
                />
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: isOpen ? 0 : -20, opacity: isOpen ? 1 : 0 }}
                        transition={{
                            duration: 0.3,
                            ease: [0.33, 1, 0.68, 1],
                        }}
                        className="p-4"
                    >
                        {children}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

