"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Star, Calendar, TrendingUp, Book, AlertTriangle } from "lucide-react"
import type { Stats, MediaStats } from "./types" // Import types as type-only

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
            <Card className="bg-red-900/10 border-red-500/20 p-6">
                <CardContent>
                    <div className="flex items-center space-x-4">
                        <AlertTriangle className="h-12 w-12 text-red-400" />
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
        <Tabs defaultValue="anime" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-purple-900/20">
                <TabsTrigger value="anime">Anime</TabsTrigger>
                <TabsTrigger value="manga">Manga</TabsTrigger>
            </TabsList>

            <TabsContent value="anime">
                <MediaStatsComponent stats={stats.anime} type="anime" />
            </TabsContent>

            <TabsContent value="manga">
                <MediaStatsComponent stats={stats.manga} type="manga" />
            </TabsContent>
        </Tabs>
    )
}

// Renamed component to avoid conflict with the type 'MediaStats'
function MediaStatsComponent({ stats, type }: { stats: MediaStats; type: "anime" | "manga" }) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard title={type === "anime" ? "Total Anime" : "Total Manga"} value={stats.count} icon={TrendingUp} />
                <StatCard
                    title={type === "anime" ? "Episodes Watched" : "Chapters Read"}
                    value={type === "anime" ? (stats.episodesWatched ?? 0) : (stats.chaptersRead ?? 0)}
                    icon={Calendar}
                />
                <StatCard
                    title={type === "anime" ? "Hours Watched" : "Volumes Read"}
                    value={
                        type === "anime"
                            ? Math.round((stats.minutesWatched ?? 0) / 60)
                            : (stats.volumesRead ?? 0)
                    }
                    icon={type === "anime" ? Clock : Book}
                />
                <StatCard title="Mean Score" value={stats.meanScore} icon={Star} decimals={1} />
            </div>

            <Card className="bg-purple-900/10 border-purple-500/20">
                <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold text-purple-200 mb-2">Score Distribution</h3>
                    <div className="flex items-center space-x-2">
                        <Progress value={((stats.meanScore - stats.standardDeviation) / 10) * 100} className="flex-grow" />
                        <span className="text-purple-200/70 text-sm">{(stats.meanScore - stats.standardDeviation).toFixed(1)}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                        <Progress value={(stats.meanScore / 10) * 100} className="flex-grow" />
                        <span className="text-purple-200/70 text-sm">{stats.meanScore.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                        <Progress value={((stats.meanScore + stats.standardDeviation) / 10) * 100} className="flex-grow" />
                        <span className="text-purple-200/70 text-sm">{(stats.meanScore + stats.standardDeviation).toFixed(1)}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function StatCard({ title, value, icon: Icon, decimals = 0 }: { title: string; value: number; icon: React.ElementType; decimals?: number }) {
    return (
        <Card className="bg-purple-900/10 border-purple-500/20">
            <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-purple-200">{title}</h3>
                    <Icon className="h-5 w-5 text-purple-400" />
                </div>
                <p className="text-3xl font-bold text-purple-400 mt-2">
                    {value !== undefined ? value.toFixed(decimals) : "N/A"}
                </p>
            </CardContent>
        </Card>
    )
}

function StatsLoading() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="bg-purple-900/10 border-purple-500/20">
                        <CardContent className="pt-6">
                            <Skeleton className="h-6 w-24 mb-2" />
                            <Skeleton className="h-8 w-16" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card className="bg-purple-900/10 border-purple-500/20">
                <CardContent className="pt-6">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full" />
                </CardContent>
            </Card>
        </div>
    )
}
