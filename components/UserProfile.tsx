"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertTriangle } from "lucide-react"
import type { UserData } from "./types"

const ANILIST_API = "https://graphql.anilist.co"

const query = `
query ($username: String) {
  User(name: $username) {
    id
    name
    avatar {
      medium
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
            <Card className="bg-purple-900/10 border-purple-500/20 p-6">
                <CardContent>
                    <div className="flex items-center space-x-4">
                        <Skeleton className="w-16 h-16 rounded-full" />
                        <div>
                            <Skeleton className="h-6 w-32 mb-2" />
                            <Skeleton className="h-4 w-24" />
                        </div>
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

    return (
        <Card className="bg-purple-900/10 border-purple-500/20 p-6">
            <CardContent>
                <div className="flex items-center space-x-4">
                    <img
                        src={userData.avatar.medium || "/placeholder.svg"}
                        alt={userData.name}
                        className="w-16 h-16 rounded-full"
                    />
                    <div>
                        <h3 className="text-xl font-bold text-purple-200">{userData.name}</h3>
                        <p className="text-purple-200/70">User ID: {userData.id}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

