'use client'

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { gamesCheats } from "@/data/cheats"
import { ChevronLeft, Clock, Code2, ChevronRight, Download } from 'lucide-react'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { downloadCheat } from "../actions/download-cheat"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function CheatsPage() {
    const [downloading, setDownloading] = useState<string | null>(null)
    const { toast } = useToast()

    const handleDownload = async (id: string) => {
        setDownloading(id)
        try {
            const result = await downloadCheat(id)
            window.location.href = result.url
            toast({
                title: "Download started",
                description: `${result.name} is now downloading.`,
            })
        } catch (error) {
            console.error(error)
            toast({
                title: "Download failed",
                description: "An error occurred while trying to download the cheat.",
                variant: "destructive",
            })
        } finally {
            setDownloading(null)
        }
    }

    return (
        <div className="py-12">
            <div className="mb-8 flex items-center gap-2">
                <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                </Link>
                <span className="text-purple-200/50">back to home</span>
            </div>

            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Hack.Matrix
                </h1>
                <p className="text-purple-200/50">Collection of custom game modifications and tools</p>
            </div>

            <div className="space-y-6">
                {gamesCheats.map((cheat) => (
                    <Card
                        key={cheat.id}
                        className="p-6 bg-black/50 border border-purple-900/20 hover:border-purple-500/50 transition-colors group"
                    >
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <Link href={`/cheats/${cheat.id}`} className="group">
                                        <h2 className="text-lg font-semibold text-purple-200 mb-1 group-hover:text-purple-100 transition-colors">
                                            {cheat.name}
                                        </h2>
                                        <div className="text-sm text-purple-200/70 flex items-center">
                                            {cheat.game}
                                            <ChevronRight className="h-4 w-4 ml-2 text-purple-200/50 group-hover:text-purple-200 transition-colors" />
                                        </div>
                                    </Link>
                                </div>
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        "border-purple-900/20 bg-black/50",
                                        {
                                            'text-green-400': cheat.status === 'Undetected',
                                            'text-white': cheat.status === 'Updating',
                                            'text-yellow-400': cheat.status === 'Updating',
                                            'text-red-400': cheat.status === 'Detected',
                                            'text-gray-400': cheat.status === 'Discontinued'
                                        }
                                    )}
                                >
                                    {cheat.status}
                                </Badge>
                            </div>

                            <p className="text-sm text-purple-200/70">
                                {cheat.description}
                            </p>

                            <div className="grid grid-cols-2 gap-2">
                                {cheat.features.slice(0, 4).map((feature, index) => (
                                    <div
                                        key={index}
                                        className="text-sm text-purple-200/50 flex items-center gap-2"
                                    >
                                        <span className="h-1 w-1 bg-purple-500/50 rounded-full" />
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2 text-sm text-purple-200/50">
                                        <Code2 className="h-4 w-4" />
                                        {cheat.language}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-purple-200/50">
                                        <Clock className="h-4 w-4" />
                                        Last updated: {new Date(cheat.lastUpdated).toLocaleDateString()}
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-purple-500/20 border-purple-500/30 hover:bg-purple-500/30 hover:border-purple-500/50 text-purple-200"
                                    onClick={() => handleDownload(cheat.id)}
                                    disabled={downloading === cheat.id}
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    {downloading === cheat.id ? 'Downloading...' : 'Download'}
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}

                {gamesCheats.length === 0 && (
                    <Card className="p-6 bg-black/50 border border-purple-900/20">
                        <p className="text-purple-200/50 text-center">No cheats found</p>
                    </Card>
                )}
            </div>
        </div>
    )
}

