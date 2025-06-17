"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertTriangle, Hash, ExternalLink, Calendar } from "lucide-react"
import type { UserData } from "./types"

const ANILIST_API = "https://graphql.anilist.co"

const query = `
query ($username: String) {
  User(name: $username) {
    id
    name
    avatar {
      medium
      large
    }
    bannerImage
    siteUrl
    createdAt
    about
    statistics {
      anime {
        count
        episodesWatched
        minutesWatched
      }
      manga {
        count
        chaptersRead
      }
    }
  }
}
`

export function UserProfile() {
    const [userData, setUserData] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUserData = async () => {
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
                    throw new Error("Failed to fetch user data")
                }

                const data = await response.json()
                if (data.errors) {
                    throw new Error(data.errors[0].message)
                }

                setUserData(data.data.User)
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred")
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()
    }, [])

    if (loading) {
        return (
            <div className="relative h-48 overflow-hidden rounded-xl">
                <Skeleton className="absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-end space-x-6">
                        <div className="relative">
                            <Skeleton className="w-20 h-20 rounded-full border-4 border-white/20" />
                        </div>
                        <div className="flex-1 space-y-3">
                            <Skeleton className="h-7 w-40" />
                            <Skeleton className="h-5 w-32" />
                            <div className="flex gap-4">
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-24 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <Card className="bg-red-900/10 border-red-500/20 p-6">
                <CardContent>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <AlertTriangle className="h-12 w-12 text-red-400" />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-red-400">Error Loading User Data</h3>
                            <p className="text-red-200/70">{error}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (!userData) {
        return null
    }

    const joinDate = new Date(userData.createdAt * 1000)

    return (
        <div className="relative h-48 overflow-hidden rounded-xl group">
            {/* Banner Background */}
            {userData.bannerImage ? (
                <div className="absolute inset-0">
                    <img
                        src={userData.bannerImage || "/placeholder.svg"}
                        alt={`${userData.name}'s banner`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-pink-900/30" />
                </div>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black/60 to-pink-900/40" />
            )}

            {/* Animated particles */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400/60 rounded-full animate-ping" />
            <div className="absolute top-8 right-12 w-1 h-1 bg-pink-400/40 rounded-full animate-pulse" />
            <div className="absolute top-12 right-6 w-1 h-1 bg-blue-400/50 rounded-full animate-ping" />

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-end space-x-6">
                    {/* Enhanced Avatar */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-full animate-pulse" />
                        <img
                            src={userData.avatar.large || userData.avatar.medium || "/placeholder.svg"}
                            alt={userData.name}
                            className="relative w-20 h-20 rounded-full border-4 border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 shadow-2xl"
                        />
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-2 border-white/20 flex items-center justify-center shadow-lg">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                            <h3 className="text-2xl font-bold text-white drop-shadow-lg">{userData.name}</h3>
                            <div className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                                <span className="text-xs text-white font-medium">OTAKU</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-white/80">
                            <Hash className="h-4 w-4" />
                            <span className="font-mono text-sm">ID: {userData.id}</span>
                        </div>

                        <div className="flex items-center gap-2 text-white/70">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">
                Joined {joinDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex gap-4 mt-4">
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                                <span className="text-xs text-white">{userData.statistics.anime.count} Anime</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
                                <span className="text-xs text-white">{userData.statistics.manga.count} Manga</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                                <span className="text-xs text-white">
                  {Math.round(userData.statistics.anime.minutesWatched / 60)}h Watched
                </span>
                            </div>
                        </div>
                    </div>

                    {/* External Link */}
                    <div className="flex items-center gap-2 text-white/60 hover:text-white/80 transition-colors cursor-pointer">
                        <ExternalLink className="h-4 w-4" />
                    </div>
                </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
    )
}
