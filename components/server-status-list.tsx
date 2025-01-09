'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Server, Activity } from 'lucide-react'

type ServerStatus = {
    name: string
    url: string
    status: 'online' | 'offline'
    statusCode: number
    latency: string
}

export function ServerStatusList({ initialStatus }: { initialStatus: ServerStatus[] }) {
    const [serverData, setServerData] = useState(initialStatus)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const updateStatus = async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/server-status')
                const data = await res.json()
                setServerData(data)
            } catch (error) {
                console.error('Failed to fetch server status:', error)
            } finally {
                setLoading(false)
            }
        }

        const interval = setInterval(updateStatus, 60000) // Update every minute
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="space-y-4">
            {serverData.map((server, index) => (
                <motion.div
                    key={server.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-purple-900/10 rounded-lg border border-purple-500/20"
                >
                    <div className="flex items-center space-x-4">
                        <Server className="h-6 w-6 text-purple-400" />
                        <div>
                            <h3 className="text-lg font-semibold text-purple-200">{server.name}</h3>
                            {/*<p className="text-sm text-purple-200/50">{server.url}</p>*/}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {loading ? (
                            <Skeleton className="h-6 w-20" />
                        ) : (
                            <Badge
                                variant="outline"
                                className={`
                  ${server.status === 'online' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                    'bg-red-500/20 text-red-400 border-red-500/30'}
                `}
                            >
                                {server.status}
                            </Badge>
                        )}
                        <div className="flex items-center text-purple-200/70">
                            <Activity className="h-4 w-4 mr-2" />
                            {loading ? (
                                <Skeleton className="h-4 w-12" />
                            ) : (
                                <span>{server.latency}</span>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

