"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Trophy, Star, Users, Calendar, Gamepad2, Search, Zap, Heart, Brain, Target } from "lucide-react"
import Image from "next/image"

interface GitHubProfile {
    public_repos: number
    followers: number
    created_at: string
}

interface GitHubAchievement {
    id: string
    name: string
    description: string
    tier: string
    badgeUrl?: string
    icon: string
    color: string
    unlockedAt?: string
}

interface ProfileBadge {
    id: string
    name: string
    description: string
    tier: string
    icon: string
    color: string
}

interface BadgeData {
    profile: GitHubProfile
    achievements: GitHubAchievement[]
    profileBadges: ProfileBadge[]
    stats: {
        totalAchievements: number
        totalBadges: number
        joinYear: number
        yearsActive: number
    }
}

export function GitHubBadges() {
    const [badgeData, setBadgeData] = useState<BadgeData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBadges = async () => {
            try {
                const response = await fetch("/api/github-profile")
                if (!response.ok) {
                    throw new Error("Failed to fetch badges")
                }
                const data = await response.json()
                setBadgeData(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error")
            } finally {
                setLoading(false)
            }
        }

        fetchBadges()
    }, [])

    const getIconComponent = (iconName: string) => {
        const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
            "🦈": Target,
            "⚡": Zap,
            "👥": Users,
            "⭐": Star,
            "🧠": Brain,
            "❤️": Heart,
            "🔮": Star,
            "🏔️": Star,
            "🎯": Target,
            "🎂": Calendar,
            "🚀": Zap,
            "🔍": Search,
            "🎮": Gamepad2,
            "🏆": Trophy,
        }
        return iconMap[iconName] || Star
    }

    const getTierColor = (tier: string) => {
        switch (tier) {
            case "special":
                return "from-cyan-400 via-blue-400 to-cyan-400"
            case "gold":
                return "from-yellow-400 via-orange-400 to-yellow-400"
            case "silver":
                return "from-gray-300 via-white to-gray-300"
            case "bronze":
                return "from-orange-600 via-yellow-600 to-orange-600"
            default:
                return "from-lime-400 via-cyan-400 to-lime-400"
        }
    }

    if (loading) {
        return (
            <Card className="bg-gradient-to-br from-black/80 to-gray-900/80 border-2 border-lime-400/30 rounded-2xl p-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-lime-400/20 rounded mb-4"></div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-24 bg-gray-700/50 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </Card>
        )
    }

    if (error || !badgeData) {
        return (
            <Card className="bg-gradient-to-br from-black/80 to-gray-900/80 border-2 border-red-400/30 rounded-2xl p-6">
                <div className="text-center">
                    <div className="text-red-400 font-bold mb-2">⚠️ ACHIEVEMENTS.UNAVAILABLE</div>
                    <div className="text-gray-400 text-sm">Failed to load GitHub achievements</div>
                </div>
            </Card>
        )
    }

    if (!badgeData || !badgeData.achievements || !badgeData.stats) {
        return (
            <Card className="bg-gradient-to-br from-black/80 to-gray-900/80 border-2 border-yellow-400/30 rounded-2xl p-6">
                <div className="text-center">
                    <div className="text-yellow-400 font-bold mb-2">⚠️ DATA.INCOMPLETE</div>
                    <div className="text-gray-400 text-sm">Achievement data is incomplete</div>
                </div>
            </Card>
        )
    }

    // Add default values
    const achievements = badgeData.achievements || []
    const profileBadges = badgeData.profileBadges || []

    return (
        <div className="space-y-6">
            {/* Achievements Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-cyan-400 flex items-center">
                    <Trophy className="h-6 w-6 mr-3 text-lime-400" />
                    GITHUB.ACHIEVEMENTS
                </h3>
                <div className="text-sm text-gray-400 font-mono">{achievements.length} UNLOCKED</div>
            </div>

            {/* Real GitHub Achievements Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {achievements.map((achievement) => {
                    const IconComponent = getIconComponent(achievement.icon)
                    const tierColor = getTierColor(achievement.tier)

                    return (
                        <div
                            key={achievement.id}
                            className="group relative overflow-hidden p-4 bg-gradient-to-br from-black/80 to-gray-900/80 border-2 border-lime-400/30 rounded-xl backdrop-blur-sm hover:border-lime-400/60 transition-all duration-300 hover:scale-105 cursor-pointer"
                            style={{
                                animationDelay: `${achievements.indexOf(achievement) * 100}ms`,
                            }}
                        >
                            {/* Tier Glow Background */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-r ${tierColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                            />

                            {/* Achievement Badge */}
                            <div className="flex flex-col items-center">
                                {/* Badge Image or Icon */}
                                <div className={`w-16 h-16 mb-3 rounded-full bg-gradient-to-r ${tierColor} p-0.5`}>
                                    {achievement.badgeUrl ? (
                                        <div className="w-full h-full bg-black rounded-full flex items-center justify-center overflow-hidden">
                                            <Image
                                                src={achievement.badgeUrl || "/placeholder.svg"}
                                                alt={achievement.name}
                                                width={48}
                                                height={48}
                                                className="rounded-full"
                                                unoptimized
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                                            <IconComponent className="h-8 w-8 text-lime-400 group-hover:text-cyan-400 transition-colors duration-300" />
                                        </div>
                                    )}
                                </div>

                                {/* Achievement Info */}
                                <div className="text-center">
                                    <div className="text-xs font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-lime-400 group-hover:to-cyan-400 transition-all duration-300 mb-1 leading-tight">
                                        {achievement.name.toUpperCase()}
                                    </div>
                                    <div className="text-xs text-gray-400 leading-tight mb-2 line-clamp-2">{achievement.description}</div>

                                    {/* Tier Badge */}
                                    <Badge className={`bg-gradient-to-r ${tierColor} text-black font-bold text-xs px-2 py-1`}>
                                        {achievement.tier.toUpperCase()}
                                    </Badge>
                                </div>
                            </div>

                            {/* Hover Effect Lines */}
                            <div
                                className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${tierColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                            />
                            <div
                                className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${tierColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                            />
                        </div>
                    )
                })}
            </div>

            {/* Profile Badges Section */}
            {profileBadges.length > 0 && (
                <>
                    <div className="flex items-center justify-between mt-8">
                        <h4 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 flex items-center">
                            <Star className="h-5 w-5 mr-2 text-cyan-400" />
                            PROFILE.BADGES
                        </h4>
                        <div className="text-sm text-gray-400 font-mono">{profileBadges.length} EARNED</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {profileBadges.map((badge) => {
                            const IconComponent = getIconComponent(badge.icon)
                            const tierColor = getTierColor(badge.tier)

                            return (
                                <div
                                    key={badge.id}
                                    className="group relative overflow-hidden p-4 bg-gradient-to-br from-black/80 to-gray-900/80 border-2 border-cyan-400/30 rounded-xl backdrop-blur-sm hover:border-cyan-400/60 transition-all duration-300 hover:scale-105 cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${tierColor} p-0.5`}>
                                            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                                                <IconComponent className="h-6 w-6 text-cyan-400 group-hover:text-pink-400 transition-colors duration-300" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-400 transition-all duration-300">
                                                {badge.name.toUpperCase()}
                                            </div>
                                            <div className="text-xs text-gray-400">{badge.description}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            )}

            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gradient-to-br from-black/60 to-gray-900/60 border border-lime-400/30 rounded-xl">
                    <div className="text-lg font-black text-lime-400">{badgeData.stats?.totalAchievements || 0}</div>
                    <div className="text-xs text-gray-400 font-bold">ACHIEVEMENTS</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-black/60 to-gray-900/60 border border-cyan-400/30 rounded-xl">
                    <div className="text-lg font-black text-cyan-400">{badgeData.stats.yearsActive}</div>
                    <div className="text-xs text-gray-400 font-bold">YEARS</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-black/60 to-gray-900/60 border border-pink-400/30 rounded-xl">
                    <div className="text-lg font-black text-pink-400">{badgeData.profile.public_repos}</div>
                    <div className="text-xs text-gray-400 font-bold">REPOS</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-black/60 to-gray-900/60 border border-purple-400/30 rounded-xl">
                    <div className="text-lg font-black text-purple-400">{badgeData.profile.followers}</div>
                    <div className="text-xs text-gray-400 font-bold">FOLLOWERS</div>
                </div>
            </div>
        </div>
    )
}
