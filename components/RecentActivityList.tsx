"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Activity, AlertTriangle, RefreshCw, Play, BookOpen, Heart, Clock, Star } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ActivityEntry, FavoriteEntry } from "./types"

const ANILIST_API = "https://graphql.anilist.co"

const activityQuery = `
query ($userId: Int, $page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    activities(userId: $userId, type: ANIME_LIST, sort: ID_DESC) {
      ... on ListActivity {
        id
        createdAt
        status
        progress
        media {
          id
          title {
            userPreferred
          }
          type
          coverImage {
            medium
            large
          }
          bannerImage
          averageScore
          genres
        }
      }
    }
  }
}
`

const favoritesQuery = `
query ($userId: Int) {
  User(id: $userId) {
    favourites {
      anime {
        nodes {
          id
          title {
            userPreferred
          }
          coverImage {
            medium
            large
          }
          bannerImage
          averageScore
          genres
        }
      }
      manga {
        nodes {
          id
          title {
            userPreferred
          }
          coverImage {
            medium
            large
          }
          bannerImage
          averageScore
          genres
        }
      }
    }
  }
}
`

export function RecentActivityList() {
    const [activities, setActivities] = useState<ActivityEntry[]>([])
    const [favoriteAnime, setFavoriteAnime] = useState<FavoriteEntry[]>([])
    const [favoriteManga, setFavoriteManga] = useState<FavoriteEntry[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [refreshing, setRefreshing] = useState(false)

    const fetchData = useCallback(async () => {
        setRefreshing(true)
        setError(null)
        try {
            const [activityResponse, favoritesResponse] = await Promise.all([
                fetch(ANILIST_API, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        query: activityQuery,
                        variables: {
                            userId: 6334182,
                            page: 1,
                            perPage: 10,
                        },
                    }),
                }),
                fetch(ANILIST_API, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        query: favoritesQuery,
                        variables: {
                            userId: 6334182,
                        },
                    }),
                }),
            ])

            const activityData = await activityResponse.json()
            const favoritesData = await favoritesResponse.json()

            if (!activityResponse.ok || !favoritesResponse.ok) {
                throw new Error(`HTTP error! status: ${activityResponse.status} ${favoritesResponse.status}`)
            }

            if (activityData.errors || favoritesData.errors) {
                throw new Error(
                    (activityData.errors || [])
                        .concat(favoritesData.errors || [])
                        .map((e: { message: string }) => e.message)
                        .join(", "),
                )
            }

            setActivities(activityData.data.Page.activities)
            setFavoriteAnime(favoritesData.data.User.favourites.anime.nodes)
            setFavoriteManga(favoritesData.data.User.favourites.manga.nodes)
        } catch (err) {
            console.error("Error fetching data:", err)
            setError(err instanceof Error ? err.message : "An unknown error occurred")
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "text-green-400 bg-green-500/20 border-green-500/30"
            case "dropped":
                return "text-red-400 bg-red-500/20 border-red-500/30"
            case "paused":
                return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
            default:
                return "text-blue-400 bg-blue-500/20 border-blue-500/30"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return "✓"
            case "dropped":
                return "✗"
            case "paused":
                return "⏸"
            default:
                return "▶"
        }
    }

    if (loading) {
        return <ActivityLoading />
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
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-red-400">Error Loading Data</h3>
                            <p className="text-red-200/70 mb-4">{error}</p>
                            <Button
                                onClick={fetchData}
                                variant="outline"
                                className="bg-red-500/20 text-red-200 hover:bg-red-500/30 hover:text-red-100 border-red-500/30"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Retry
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            <Tabs defaultValue="activity" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-black/30 backdrop-blur-sm border border-purple-900/30 p-1 rounded-xl">
                    <TabsTrigger
                        value="activity"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-purple-200 data-[state=active]:border data-[state=active]:border-purple-500/30 rounded-lg transition-all duration-300"
                    >
                        <Activity className="h-4 w-4 mr-2" />
                        Activity
                    </TabsTrigger>
                    <TabsTrigger
                        value="anime"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-purple-200 data-[state=active]:border data-[state=active]:border-purple-500/30 rounded-lg transition-all duration-300"
                    >
                        <Play className="h-4 w-4 mr-2" />
                        Anime
                    </TabsTrigger>
                    <TabsTrigger
                        value="manga"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-purple-200 data-[state=active]:border data-[state=active]:border-purple-500/30 rounded-lg transition-all duration-300"
                    >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Manga
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="activity" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                                <Activity className="h-5 w-5 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
                                Recent Activity
                            </h3>
                        </div>
                        <Button
                            onClick={fetchData}
                            variant="outline"
                            size="sm"
                            disabled={refreshing}
                            className="bg-purple-500/20 border-purple-500/30 hover:bg-purple-500/30 hover:border-purple-500/50 text-purple-200"
                        >
                            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                            Refresh
                        </Button>
                    </div>

                    {activities.length > 0 ? (
                        <div className="space-y-3">
                            {activities.map((activity, index) => (
                                <div
                                    key={activity.id}
                                    className="group relative overflow-hidden rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-[1.02]"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Background Image */}
                                    {activity.media.bannerImage && (
                                        <div className="absolute inset-0">
                                            <img
                                                src={activity.media.bannerImage || "/placeholder.svg"}
                                                alt=""
                                                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90" />
                                        </div>
                                    )}

                                    <div className="relative flex items-center gap-4 p-4">
                                        {/* Cover Image */}
                                        <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded-lg border border-purple-500/30">
                                            <img
                                                src={activity.media.coverImage.medium || "/placeholder.svg"}
                                                alt={activity.media.title.userPreferred}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-white font-medium group-hover:text-purple-100 transition-colors truncate">
                                                        {activity.media.title.userPreferred}
                                                    </h4>

                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div
                                                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}
                                                        >
                                                            <span className="mr-1">{getStatusIcon(activity.status)}</span>
                                                            {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                                                        </div>
                                                        {activity.media.averageScore && (
                                                            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
                                                                <Star className="h-3 w-3 text-yellow-400" />
                                                                <span className="text-xs text-yellow-200">{activity.media.averageScore / 10}</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-4 mt-2 text-sm text-white/70">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            <span>
                                {activity.progress} {activity.media.type === "ANIME" ? "episode(s)" : "chapter(s)"}
                              </span>
                                                        </div>
                                                        <span>•</span>
                                                        <span>{format(new Date(activity.createdAt * 1000), "MMM d")}</span>
                                                    </div>

                                                    {/* Genres */}
                                                    {activity.media.genres && activity.media.genres.length > 0 && (
                                                        <div className="flex gap-1 mt-2">
                                                            {activity.media.genres.slice(0, 3).map((genre: string) => (
                                                                <span key={genre} className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-full">
                                  {genre}
                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Activity className="h-12 w-12 text-purple-400/50 mx-auto mb-4" />
                            <p className="text-purple-200/70">No recent activities found.</p>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="anime" className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-pink-500/20 rounded-lg border border-pink-500/30">
                            <Heart className="h-5 w-5 text-pink-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-purple-200">
                            Favorite Anime
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {favoriteAnime.map((anime, index) => (
                            <div
                                key={anime.id}
                                className="group relative overflow-hidden bg-black/20 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="aspect-[3/4] relative overflow-hidden">
                                    <img
                                        src={anime.coverImage.large || anime.coverImage.medium || "/placeholder.svg"}
                                        alt={anime.title.userPreferred}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Score overlay */}
                                    {anime.averageScore && (
                                        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                                            <Star className="h-3 w-3 text-yellow-400" />
                                            <span className="text-xs text-white font-medium">{anime.averageScore / 10}</span>
                                        </div>
                                    )}

                                    {/* Genres overlay */}
                                    {anime.genres && anime.genres.length > 0 && (
                                        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="flex flex-wrap gap-1">
                                                {anime.genres.slice(0, 2).map((genre: string) => (
                                                    <span
                                                        key={genre}
                                                        className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white/80 text-xs rounded-full"
                                                    >
                            {genre}
                          </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-3">
                                    <p className="text-sm text-purple-200 text-center truncate group-hover:text-purple-100 transition-colors">
                                        {anime.title.userPreferred}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="manga" className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                            <Heart className="h-5 w-5 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                            Favorite Manga
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {favoriteManga.map((manga, index) => (
                            <div
                                key={manga.id}
                                className="group relative overflow-hidden bg-black/20 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="aspect-[3/4] relative overflow-hidden">
                                    <img
                                        src={manga.coverImage.large || manga.coverImage.medium || "/placeholder.svg"}
                                        alt={manga.title.userPreferred}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Score overlay */}
                                    {manga.averageScore && (
                                        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                                            <Star className="h-3 w-3 text-yellow-400" />
                                            <span className="text-xs text-white font-medium">{manga.averageScore / 10}</span>
                                        </div>
                                    )}

                                    {/* Genres overlay */}
                                    {manga.genres && manga.genres.length > 0 && (
                                        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="flex flex-wrap gap-1">
                                                {manga.genres.slice(0, 2).map((genre: string) => (
                                                    <span
                                                        key={genre}
                                                        className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white/80 text-xs rounded-full"
                                                    >
                            {genre}
                          </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-3">
                                    <p className="text-sm text-purple-200 text-center truncate group-hover:text-purple-100 transition-colors">
                                        {manga.title.userPreferred}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

function ActivityLoading() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-lg" />
                    <Skeleton className="h-6 w-32" />
                </div>
                <Skeleton className="h-9 w-20 rounded-lg" />
            </div>

            <div className="space-y-3">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-purple-900/10 rounded-xl border border-purple-500/20"
                    >
                        <Skeleton className="w-16 h-20 rounded-lg" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-48" />
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                            </div>
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                            <div className="flex gap-1">
                                <Skeleton className="h-6 w-16 rounded-full" />
                                <Skeleton className="h-6 w-20 rounded-full" />
                            </div>
                        </div>
                        <Skeleton className="w-2 h-2 rounded-full" />
                    </div>
                ))}
            </div>
        </div>
    )
}
