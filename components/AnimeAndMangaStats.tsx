"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Star, Calendar, TrendingUp, Book, AlertTriangle, Zap, Target } from "lucide-react"
import type { Stats, MediaStats } from "./types"

const ANILIST_API = "https://graphql.anilist.co"

const query = `
query ($username: String) {
  User(name: $username) {
    statistics {
      anime {
        count
        episodesWatched
        minutesWatched
        meanScore
        standardDeviation
      }
      manga {
        count
        chaptersRead
        volumesRead
        meanScore
        standardDeviation
      }
    }
  }
}
`

export function AnimeAndMangaStats() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(ANILIST_API, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        query,
                        variables: { username: "araxyso" },
                    }),
                })

                if (!response.ok) {
                    throw new Error("Failed to fetch stats")
                }

                const data = await response.json()
                if (data.errors) {
                    throw new Error(data.errors[0].message)
                }

                setStats(data.data.User.statistics)
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred")
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    if (loading) {
        return <StatsLoading />
    }

    if (error) {
        return (
            <Card className="bg-red-900/10 border-red-500/20 p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-900/5" />
                <CardContent className="relative">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <AlertTriangle className="h-12 w-12 text-red-400" />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-red-400">Error Loading Stats</h3>
                            <p className="text-red-200/70">{error}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (!stats) {
        return null
    }

    return (
        <div className="space-y-8">
            <Tabs defaultValue="anime" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 bg-black/30 backdrop-blur-sm border border-purple-900/30 p-1 rounded-xl">
                    <TabsTrigger
                        value="anime"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-purple-200 data-[state=active]:border data-[state=active]:border-purple-500/30 rounded-lg transition-all duration-300"
                    >
                        <Zap className="h-4 w-4 mr-2" />
                        Anime
                    </TabsTrigger>
                    <TabsTrigger
                        value="manga"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-purple-200 data-[state=active]:border data-[state=active]:border-purple-500/30 rounded-lg transition-all duration-300"
                    >
                        <Book className="h-4 w-4 mr-2" />
                        Manga
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="anime" className="space-y-6">
                    <MediaStatsComponent stats={stats.anime} type="anime" />
                </TabsContent>

                <TabsContent value="manga" className="space-y-6">
                    <MediaStatsComponent stats={stats.manga} type="manga" />
                </TabsContent>
            </Tabs>
        </div>
    )
}

function MediaStatsComponent({ stats, type }: { stats: MediaStats; type: "anime" | "manga" }) {
    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard
                    title={type === "anime" ? "Total Anime" : "Total Manga"}
                    value={stats.count}
                    icon={TrendingUp}
                    color="purple"
                    subtitle="Entries in list"
                />
                <StatCard
                    title={type === "anime" ? "Episodes Watched" : "Chapters Read"}
                    value={type === "anime" ? (stats.episodesWatched ?? 0) : (stats.chaptersRead ?? 0)}
                    icon={Calendar}
                    color="pink"
                    subtitle={type === "anime" ? "Total episodes" : "Total chapters"}
                />
                <StatCard
                    title={type === "anime" ? "Hours Watched" : "Volumes Read"}
                    value={type === "anime" ? Math.round((stats.minutesWatched ?? 0) / 60) : (stats.volumesRead ?? 0)}
                    icon={type === "anime" ? Clock : Book}
                    color="blue"
                    subtitle={type === "anime" ? "Time invested" : "Volumes completed"}
                />
                <StatCard
                    title="Mean Score"
                    value={stats.meanScore}
                    icon={Star}
                    decimals={1}
                    color="yellow"
                    subtitle="Average rating"
                />
            </div>

            {/* Enhanced Score Distribution */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-900/10 via-black/20 to-pink-900/10 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />

                <CardContent className="pt-8 relative">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                            <Target className="h-5 w-5 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
                            Score Distribution
                        </h3>
                        <div className="ml-auto flex gap-1">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-purple-200/70 w-16">Low</span>
                            <div className="flex-1 relative">
                                <Progress
                                    value={((stats.meanScore - stats.standardDeviation) / 10) * 100}
                                    className="h-3 bg-purple-900/30"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-full" />
                            </div>
                            <span className="text-purple-200/70 text-sm font-mono w-12">
                {(stats.meanScore - stats.standardDeviation).toFixed(1)}
              </span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-purple-200/70 w-16">Mean</span>
                            <div className="flex-1 relative">
                                <Progress value={(stats.meanScore / 10) * 100} className="h-3 bg-purple-900/30" />
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full" />
                            </div>
                            <span className="text-purple-200 text-sm font-mono font-bold w-12">{stats.meanScore.toFixed(1)}</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-purple-200/70 w-16">High</span>
                            <div className="flex-1 relative">
                                <Progress
                                    value={((stats.meanScore + stats.standardDeviation) / 10) * 100}
                                    className="h-3 bg-purple-900/30"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full" />
                            </div>
                            <span className="text-purple-200/70 text-sm font-mono w-12">
                {(stats.meanScore + stats.standardDeviation).toFixed(1)}
              </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function StatCard({
                      title,
                      value,
                      icon: Icon,
                      decimals = 0,
                      color = "purple",
                      subtitle,
                  }: {
    title: string
    value: number
    icon: React.ElementType
    decimals?: number
    color?: string
    subtitle?: string
}) {
    const colorClasses = {
        purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400",
        pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30 text-pink-400",
        blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400",
        yellow: "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-400",
    }

    return (
        <Card className="group relative overflow-hidden bg-black/20 backdrop-blur-sm border border-purple-900/20 hover:border-purple-500/40 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardContent className="pt-6 relative">
                <div className="flex items-start justify-between mb-4">
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-purple-200 group-hover:text-purple-100 transition-colors">
                            {title}
                        </h3>
                        {subtitle && <p className="text-xs text-purple-200/50">{subtitle}</p>}
                    </div>
                    <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} border group-hover:scale-110 transition-transform duration-300`}
                    >
                        <Icon className="h-5 w-5" />
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 group-hover:from-purple-100 group-hover:to-pink-100 transition-all duration-300">
                        {value !== undefined ? value.toFixed(decimals) : "N/A"}
                    </p>
                    <div className="w-full h-1 bg-purple-900/30 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"
                            style={{ width: "60%" }}
                        />
                    </div>
                </div>

                {/* Floating decorative elements */}
                <div className="absolute top-2 right-2 w-1 h-1 bg-purple-400/50 rounded-full animate-ping" />
                <div className="absolute bottom-2 left-2 w-1 h-1 bg-pink-400/30 rounded-full animate-pulse" />
            </CardContent>
        </Card>
    )
}

function StatsLoading() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="bg-purple-900/10 border-purple-500/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 animate-pulse" />
                        <CardContent className="pt-6 relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <Skeleton className="h-12 w-12 rounded-xl" />
                            </div>
                            <Skeleton className="h-10 w-20 mb-2" />
                            <Skeleton className="h-1 w-full rounded-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-purple-900/10 border-purple-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 animate-pulse" />
                <CardContent className="pt-6 relative">
                    <Skeleton className="h-6 w-48 mb-6" />
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center space-x-4">
                                <Skeleton className="h-4 w-12" />
                                <Skeleton className="h-3 flex-1 rounded-full" />
                                <Skeleton className="h-4 w-8" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
