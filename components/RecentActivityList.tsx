"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Activity, AlertTriangle, RefreshCw, Star } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
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
          }
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
          }
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

    const fetchData = useCallback(async () => {
        setLoading(true)
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
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "text-green-400"
            case "dropped":
                return "text-red-400"
            case "paused":
                return "text-yellow-400"
            default:
                return "text-blue-400"
        }
    }

    if (loading) {
        return (
            <Card className="bg-purple-900/10 border-purple-500/20">
                <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold text-purple-200 mb-4 flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-purple-400" />
                        Loading...
                    </h3>
                    <div className="space-y-4">
                        {[...Array(5)].map((_, index) => (
                            <Skeleton key={index} className="h-16 w-full" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card className="bg-red-900/10 border-red-500/20 p-6">
                <CardContent>
                    <div className="flex items-center space-x-4">
                        <AlertTriangle className="h-12 w-12 text-red-400" />
                        <div>
                            <h3 className="text-xl font-bold text-red-400">Error Loading Data</h3>
                            <p className="text-red-200/70">{error}</p>
                            <Button
                                onClick={fetchData}
                                variant="outline"
                                className="mt-4 bg-red-500/20 text-red-200 hover:bg-red-500/30 hover:text-red-100"
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
        <Card className="bg-purple-900/10 border-purple-500/20">
            <CardContent className="pt-6">
                <Tabs defaultValue="activity" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                        <TabsTrigger value="anime">Favorite Anime</TabsTrigger>
                        <TabsTrigger value="manga">Favorite Manga</TabsTrigger>
                    </TabsList>
                    <TabsContent value="activity">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-purple-200 flex items-center">
                                <Activity className="h-5 w-5 mr-2 text-purple-400" />
                                Recent Activity
                            </h3>
                            <Button
                                onClick={fetchData}
                                variant="outline"
                                size="sm"
                                className="bg-purple-500/20 border-purple-500/30 hover:bg-purple-500/30 hover:border-purple-500/50 text-purple-200"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Refresh
                            </Button>
                        </div>
                        {activities.length > 0 ? (
                            <div className="space-y-4">
                                {activities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex items-center justify-between p-4 bg-purple-900/20 rounded-lg border border-purple-500/30 hover:bg-purple-900/30 transition-colors"
                                    >
                                        <div>
                                            <p className="text-purple-200 font-medium">{activity.media.title.userPreferred}</p>
                                            <p className="text-purple-200/70 text-sm flex items-center">
                        <span className={`font-semibold ${getStatusColor(activity.status)}`}>
                          {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                        </span>
                                                <span className="mx-2">-</span>
                                                {activity.progress} {activity.media.type === "ANIME" ? "episode(s)" : "chapter(s)"}
                                            </p>
                                        </div>
                                        <p className="text-purple-200/50 text-sm">
                                            {format(new Date(activity.createdAt * 1000), "MMM d, yyyy")}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-purple-200/70 text-center">No recent activities found.</p>
                        )}
                    </TabsContent>
                    <TabsContent value="anime">
                        <h3 className="text-lg font-semibold text-purple-200 flex items-center mb-4">
                            <Star className="h-5 w-5 mr-2 text-purple-400" />
                            Favorite Anime
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {favoriteAnime.map((anime) => (
                                <div key={anime.id} className="bg-purple-900/20 rounded-lg overflow-hidden">
                                    <Image
                                        src={anime.coverImage.medium || "/placeholder.svg"}
                                        alt={anime.title.userPreferred}
                                        width={150}
                                        height={200}
                                        className="w-full object-cover"
                                    />
                                    <p className="p-2 text-sm text-purple-200 text-center truncate">{anime.title.userPreferred}</p>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="manga">
                        <h3 className="text-lg font-semibold text-purple-200 flex items-center mb-4">
                            <Star className="h-5 w-5 mr-2 text-purple-400" />
                            Favorite Manga
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {favoriteManga.map((manga) => (
                                <div key={manga.id} className="bg-purple-900/20 rounded-lg overflow-hidden">
                                    <Image
                                        src={manga.coverImage.medium || "/placeholder.svg"}
                                        alt={manga.title.userPreferred}
                                        width={150}
                                        height={200}
                                        className="w-full object-cover"
                                    />
                                    <p className="p-2 text-sm text-purple-200 text-center truncate">{manga.title.userPreferred}</p>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

