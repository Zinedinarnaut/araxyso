"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Gamepad2, Award, Package, Heart, Clock, Cpu, MemoryStick, HardDrive, Monitor } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface SteamProfileProps {
    profileUrl?: string
}

interface SteamProfileData {
    username: string
    level: number
    avatarUrl: string
    yearsOfService: number
    xp: number
    gamesOwned: number
    dlcOwned: number
    reviews: number
    wishlisted: number
    badges: number
    status: string
    specs: {
        os: string
        cpu: string
        ram: string
        storage: string
        gpu: string
        motherboard: string
    }
    itemsOwned: number
    groups: {
        count: number
        featured: {
            name: string
            members: number
        }
    }
}

export function SteamProfile({ profileUrl = "https://steamcommunity.com/id/zinedinarnaut" }: SteamProfileProps) {
    const [loading, setLoading] = useState(true)
    const [expanded, setExpanded] = useState(false)

    // In a real implementation, you would fetch this data from an API
    // For now, we'll use the data from the screenshot
    const profileData: SteamProfileData = {
        username: "zinny ✗",
        level: 11,
        avatarUrl:
            "https://sjc.microlink.io/HKMrmFtP7MZmbpGjGWfsWAHlb2zSCAwdxFLP-QLaDoK-ZVH0HA8xdqijHNIMqRPHboxQcPvCveO5vRbMc6MhEw.jpeg",
        yearsOfService: 7,
        xp: 350,
        gamesOwned: 58,
        dlcOwned: 71,
        reviews: 15,
        wishlisted: 13,
        badges: 10,
        status: "Currently Offline",
        specs: {
            os: "Windows 11 Home",
            cpu: "AMD Ryzen 7 7800X3D",
            ram: "Corsair Vengeance RGB 64GB (2×32GB) DDR5-6000 CL30",
            storage: "Samsung 990 PRO 2TB NVMe Gen4 SSD",
            gpu: "Gigabyte AORUS RTX 5080 Xtreme Waterforce 16GB GDDR7",
            motherboard: "ASUS TUF Gaming X670E-Plus WiFi (AM5)",
        },
        itemsOwned: 290,
        groups: {
            count: 1,
            featured: {
                name: "Terraria Online",
                members: 62310,
            },
        },
    }

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-black/40 border border-purple-900/30 overflow-hidden backdrop-blur-sm">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-purple-200 flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-5 w-5 text-purple-400 fill-current"
                            >
                                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM7.8 13.4l-1.7.7c-.1.3-.1.6-.1 1 0 1.1.9 2 2 2 .3 0 .6-.1.8-.2l1.5-1.1c.5 0 1-.1 1.6-.1.2 0 .3 0 .5.1l1.5 1.1c.3.1.5.2.8.2 1.1 0 2-.9 2-2 0-.3 0-.6-.1-1l-1.7-.7c-.7-.2-1.1-1-1.1-1.8V10c0-.7.4-1.5 1.1-1.8l1.7-.7c.1-.3.1-.6.1-1 0-1.1-.9-2-2-2-.3 0-.6.1-.8.2L12 5.8l-1.5-1.1c-.3-.1-.5-.2-.8-.2-1.1 0-2 .9-2 2 0 .3 0 .6.1 1l1.7.7c.7.2 1.1 1 1.1 1.8v1.7c0 .7-.4 1.5-1.1 1.8z" />
                            </svg>
                            Steam Profile
                        </CardTitle>
                        <a
                            href={profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            View on Steam →
                        </a>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <Skeleton className="h-20 w-20 rounded-md" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-1/3" />
                                    <Skeleton className="h-4 w-1/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-12 w-full" />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="relative h-20 w-20 rounded-md overflow-hidden border border-purple-900/30">
                                    <Image
                                        src="https://avatars.fastly.steamstatic.com/9f5147d8fc45fbb883e66e370c1bc1a4a67f2579_full.jpg"
                                        alt={profileData.username}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-md"
                                        unoptimized={true}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-purple-200">{profileData.username}</h3>
                                        <Badge className="bg-purple-900/30 text-purple-200 border-purple-500/30">
                                            Level {profileData.level}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-purple-200/70">{profileData.status}</p>
                                    <div className="mt-2 flex items-center gap-2 text-xs text-purple-200/50">
                                        <Clock className="h-3 w-3" />
                                        <span>
                      {profileData.yearsOfService} Years of Service • {profileData.xp} XP
                    </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div className="bg-purple-900/20 rounded-md p-2 flex flex-col items-center">
                                    <Gamepad2 className="h-5 w-5 text-purple-400 mb-1" />
                                    <span className="text-lg font-bold text-purple-200">{profileData.gamesOwned}</span>
                                    <span className="text-xs text-purple-200/70">Games Owned</span>
                                </div>
                                <div className="bg-purple-900/20 rounded-md p-2 flex flex-col items-center">
                                    <Package className="h-5 w-5 text-purple-400 mb-1" />
                                    <span className="text-lg font-bold text-purple-200">{profileData.dlcOwned}</span>
                                    <span className="text-xs text-purple-200/70">DLC Owned</span>
                                </div>
                                <div className="bg-purple-900/20 rounded-md p-2 flex flex-col items-center">
                                    <Award className="h-5 w-5 text-purple-400 mb-1" />
                                    <span className="text-lg font-bold text-purple-200">{profileData.badges}</span>
                                    <span className="text-xs text-purple-200/70">Badges</span>
                                </div>
                                <div className="bg-purple-900/20 rounded-md p-2 flex flex-col items-center">
                                    <Heart className="h-5 w-5 text-purple-400 mb-1" />
                                    <span className="text-lg font-bold text-purple-200">{profileData.wishlisted}</span>
                                    <span className="text-xs text-purple-200/70">Wishlisted</span>
                                </div>
                            </div>

                            {expanded && (
                                <motion.div
                                    className="space-y-4 mt-2"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="border-t border-purple-900/30 pt-4">
                                        <h4 className="text-sm font-medium text-purple-300 mb-2">PC Specifications</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                            <div className="flex items-center gap-2 text-purple-200/70">
                                                <Monitor className="h-4 w-4 text-purple-400" />
                                                <span>{profileData.specs.os}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-purple-200/70">
                                                <Cpu className="h-4 w-4 text-purple-400" />
                                                <span>{profileData.specs.cpu}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-purple-200/70">
                                                <MemoryStick className="h-4 w-4 text-purple-400" />
                                                <span>{profileData.specs.ram}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-purple-200/70">
                                                <HardDrive className="h-4 w-4 text-purple-400" />
                                                <span>{profileData.specs.storage}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-purple-200/70 md:col-span-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="h-4 w-4 text-purple-400"
                                                >
                                                    <rect x="2" y="6" width="20" height="12" rx="2" />
                                                    <path d="M6 12h12" />
                                                    <path d="M8 18v2" />
                                                    <path d="M16 18v2" />
                                                    <path d="M10 12v6" />
                                                    <path d="M14 12v6" />
                                                    <path d="M12 12v6" />
                                                </svg>
                                                <span>{profileData.specs.gpu}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div className="flex justify-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setExpanded(!expanded)}
                                    className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                                >
                                    {expanded ? "Show Less" : "Show More"}
                                </Button>
                            </div>

                            <div className="text-center">
                                <Link href="/games" className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
                                    View my complete game library →
                                </Link>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}
