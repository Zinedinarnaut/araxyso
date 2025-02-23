"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCcw } from "lucide-react"
import Image from "next/image"

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

// Define a type for the user data
interface UserData {
    id: number
    name: string
    avatar: {
        medium: string
    }
}

export function SimpleUserQuery() {
    const [userData, setUserData] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchUserData = useCallback(async () => {
        setLoading(true)
        setError(null)
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

            const responseData = await response.json()

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(responseData)}`)
            }

            if (responseData.errors) {
                throw new Error(responseData.errors.map((e: { message: string }) => e.message).join(", "))
            }

            setUserData(responseData.data.User)
        } catch (err) {
            console.error("Error fetching user data:", err)
            setError(err instanceof Error ? err.message : "An unknown error occurred")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchUserData()
    }, [fetchUserData])

    if (loading) {
        return <div className="text-purple-200/50">Loading user data...</div>
    }

    if (error) {
        return (
            <Card className="bg-red-900/10 border-red-500/20 p-6">
                <CardContent>
                    <div className="flex flex-col items-center text-center">
                        <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
                        <h3 className="text-xl font-bold text-red-400 mb-2">Error Loading User Data</h3>
                        <p className="text-red-200/70 mb-4">{error}</p>
                        <Button
                            onClick={fetchUserData}
                            variant="outline"
                            className="bg-red-500/20 border-red-500/30 hover:bg-red-500/30 hover:border-red-500/50 text-red-200"
                        >
                            <RefreshCcw className="h-4 w-4 mr-2" />
                            Retry
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="bg-purple-900/10 border-purple-500/20 p-6">
            <CardContent>
                <div className="flex items-center space-x-4">
                    <Image
                        src={userData?.avatar.medium || "/placeholder.svg"}
                        alt={userData?.name || "User Avatar"}
                        width={64}
                        height={64}
                        className="rounded-full"
                    />
                    <div>
                        <h3 className="text-xl font-bold text-purple-200">{userData?.name}</h3>
                        <p className="text-purple-200/70">User ID: {userData?.id}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
