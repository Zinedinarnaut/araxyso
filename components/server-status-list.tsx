"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Server, Activity, AlertTriangle } from "lucide-react"

type ServerStatus = {
    name: string
    url: string
    status: "online" | "offline"
    statusCode: number
    latency: string
}

type CategoryStatus = {
    category: string
    services: ServerStatus[]
}

export function ServerStatusList({ initialStatus }: { initialStatus: CategoryStatus[] }) {
    const [serverData, setServerData] = useState<CategoryStatus[]>(initialStatus)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const updateStatus = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch("/api/server-status")
                if (!res.ok) {
                    throw new Error("Failed to fetch server status")
                }
                const data = await res.json()
                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format received")
                }
                setServerData(data)
            } catch (error) {
                console.error("Failed to fetch server status:", error)
                setError("Failed to update server status. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        const interval = setInterval(updateStatus, 60000) // Update every minute
        return () => clearInterval(interval)
    }, [])

    if (error) {
        return (
            <div className="flex items-center justify-center p-4 bg-red-900/10 rounded-lg border border-red-500/20 text-red-400">
                <AlertTriangle className="h-5 w-5 mr-2" />
                {error}
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {serverData.map((category, categoryIndex) => (
                <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
                >
                    <h2 className="text-2xl font-bold text-purple-200 mb-4">{category.category}</h2>
                    <div className="space-y-4">
                        {category.services.map((server, index) => (
                            <motion.div
                                key={server.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex items-center justify-between p-4 bg-purple-900/10 rounded-lg border border-purple-500/20"
                            >
                                <div className="flex items-center space-x-4">
                                    <Server className="h-6 w-6 text-purple-400" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-purple-200">{server.name}</h3>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    {loading ? (
                                        <Skeleton className="h-6 w-20" />
                                    ) : (
                                        <Badge
                                            variant="outline"
                                            className={`
                        ${
                                                server.status === "online"
                                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                                    : "bg-red-500/20 text-red-400 border-red-500/30"
                                            }
                      `}
                                        >
                                            {server.status}
                                        </Badge>
                                    )}
                                    <div className="flex items-center text-purple-200/70">
                                        <Activity className="h-4 w-4 mr-2" />
                                        {loading ? <Skeleton className="h-4 w-12" /> : <span>{server.latency}</span>}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

