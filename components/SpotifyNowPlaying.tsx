'use client'

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Music, Play } from 'lucide-react'

interface SpotifyData {
    album: string
    albumImageUrl: string
    artist: string
    isPlaying: boolean
    songUrl: string
    title: string
}

export function SpotifyNowPlaying() {
    const [data, setData] = useState<SpotifyData | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/spotify')
            const data = await res.json()
            setData(data)
        }

        fetchData()
        const interval = setInterval(fetchData, 60000) // Refresh every minute

        return () => clearInterval(interval)
    }, [])

    if (!data?.isPlaying) {
        return (
            <Card className="bg-black/50 border border-purple-900/20 p-4 backdrop-blur-sm flex items-center space-x-4">
                <Music className="h-8 w-8 text-purple-400" />
                <div className="text-purple-200/70">Not currently listening to Spotify</div>
            </Card>
        )
    }

    return (
        <Card className="bg-black/50 border border-purple-900/20 p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16">
                    <Image
                        src={data.albumImageUrl}
                        alt={data.album}
                        layout="fill"
                        className="rounded-md"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-purple-200">{data.title}</h3>
                    <p className="text-sm text-purple-200/70">{data.artist}</p>
                    <p className="text-xs text-purple-200/50">{data.album}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Play className="h-3 w-3 mr-1" />
                        Playing
                    </Badge>
                    <a
                        href={data.songUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        Open in Spotify
                    </a>
                </div>
            </div>
        </Card>
    )
}

