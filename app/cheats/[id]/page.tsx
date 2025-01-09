'use client'

import * as React from 'react'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { gamesCheats } from "@/data/cheats"
import { cheatDownloads } from "@/data/downloads"
import { ChevronLeft, Clock, Code2, Download, AlertTriangle, FileDown, Info, BookOpen, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cn } from "@/lib/utils"
import { downloadCheat } from "../../actions/download-cheat"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function CheatPage({ params }: { params: Promise<{ id: string }> }) {
    const [downloading, setDownloading] = useState(false)
    const { toast } = useToast()
    const resolvedParams = React.use(params)
    const cheat = gamesCheats.find((c) => c.id === resolvedParams.id)
    const download = cheatDownloads.find((d) => d.cheatId === resolvedParams.id)

    if (!cheat || !download) {
        notFound()
    }

    const handleDownload = async () => {
        setDownloading(true)
        try {
            const result = await downloadCheat(cheat.id)
            window.location.href = result.url
            toast({
                title: "Download started",
                description: `${result.fileName} (${result.fileSize}) is now downloading.`,
            })
        } catch (error) {
            console.error(error)
            toast({
                title: "Download failed",
                description: "An error occurred while trying to download the cheat.",
                variant: "destructive",
            })
        } finally {
            setDownloading(false)
        }
    }

    return (
        <div className="py-12">
            <div className="mb-8 flex items-center gap-2">
                <Link href="/cheats" className="text-purple-400 hover:text-purple-300 transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                </Link>
                <span className="text-purple-200/50">back to cheats</span>
            </div>

            <Card className="p-8 bg-black/50 border border-purple-900/20">
                <div className="space-y-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                                {cheat.name}
                            </h1>
                            <div className="text-lg text-purple-200/70">
                                {cheat.game}
                            </div>
                        </div>
                        <Badge
                            variant="outline"
                            className={cn(
                                "text-lg py-1 px-3 border-purple-900/20 bg-black/50",
                                {
                                    'text-green-400': cheat.status === 'Undetected',
                                    'text-yellow-400': cheat.status === 'Updating',
                                    'text-red-400': cheat.status === 'Detected',
                                    'text-gray-400': cheat.status === 'Discontinued'
                                }
                            )}
                        >
                            {cheat.status}
                        </Badge>
                    </div>

                    <p className="text-purple-200/70 text-lg">
                        {cheat.description}
                    </p>

                    <div>
                        <h2 className="text-xl font-semibold text-purple-200 mb-4">Features</h2>
                        <ul className="grid grid-cols-2 gap-4">
                            {cheat.features.map((feature, index) => (
                                <li
                                    key={index}
                                    className="text-purple-200/70 flex items-center gap-2"
                                >
                                    <CheckCircle className="h-4 w-4 text-purple-400"/>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-t border-purple-900/20 pt-6 mt-6">
                        <h2 className="text-xl font-semibold text-purple-200 mb-4">Download Information</h2>
                        <div className="grid gap-4 text-purple-200/70">
                            <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FileDown className="h-5 w-5 text-purple-400"/>
                                    <div>
                                        <p className="font-medium">{download.fileName}</p>
                                        <p className="text-sm text-purple-200/50">Version {download.version}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">{download.fileSize}</p>
                                    <p className="text-sm text-purple-200/50">
                                        Released: {new Date(download.releaseDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="text-sm text-purple-200/50">
                                <p>Checksum (SHA-256):</p>
                                <code className="font-mono text-xs bg-black/30 px-2 py-1 rounded">
                                    {download.checksum}
                                </code>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <div className="flex gap-6 text-purple-200/50">
                            <div className="flex items-center gap-2">
                                <Code2 className="h-5 w-5"/>
                                {cheat.language}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5"/>
                                Last updated: {new Date(cheat.lastUpdated).toLocaleDateString()}
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="lg"
                            className="bg-purple-500/20 border-purple-500/30 hover:bg-purple-500/30 hover:border-purple-500/50 text-purple-200"
                            onClick={handleDownload}
                            disabled={downloading}
                        >
                            <Download className="h-5 w-5 mr-2"/>
                            {downloading ? 'Downloading...' : 'Download Cheat'}
                        </Button>
                    </div>

                    <div className="border-t border-purple-900/20 pt-6 mt-6">
                        <div
                            className="flex items-start gap-4 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-md">
                            <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1"/>
                            <div>
                                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Warning</h3>
                                <p className="text-yellow-200/70">
                                    This cheat is provided for educational purposes only. Use of cheats in online games
                                    may violate terms of service and result in bans. Always use responsibly and at your
                                    own risk.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-purple-900/20 pt-6 mt-6">
                        <h2 className="text-xl font-semibold text-purple-200 mb-4 flex items-center">
                            <Info className="h-5 w-5 mr-2 text-purple-400"/>
                            Technical Details
                        </h2>
                        <div className="text-purple-200/70 space-y-4">
                            {cheat.technicalDetails.split('\n\n').map((section, index) => {
                                const [title, ...content] = section.split('\n')
                                return (
                                    <div key={index} className="space-y-2">
                                        <h3 className="text-lg font-semibold text-purple-300">{title}</h3>
                                        {content.map((item, itemIndex) => {
                                            if (item.startsWith('- ')) {
                                                return (
                                                    <ul key={itemIndex}
                                                        className="list-disc list-inside pl-4 space-y-1">
                                                        <li>{item.slice(2)}</li>
                                                    </ul>
                                                )
                                            }
                                            return <p key={itemIndex}>{item}</p>
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="border-t border-purple-900/20 pt-6 mt-6">
                        <h2 className="text-xl font-semibold text-purple-200 mb-4 flex items-center">
                            <BookOpen className="h-5 w-5 mr-2 text-purple-400"/>
                            Usage Guide
                        </h2>
                        <div className="text-purple-200/70 space-y-4">
                            {cheat.usageGuide.split('\n\n').map((section, index) => {
                                const [title, ...content] = section.split('\n')
                                return (
                                    <div key={index} className="space-y-2">
                                        <h3 className="text-lg font-semibold text-purple-300">{title}</h3>
                                        {content.map((item, itemIndex) => {
                                            if (item.match(/^\d+\./)) {
                                                return (
                                                    <ol key={itemIndex}
                                                        className="list-decimal list-inside pl-4 space-y-1">
                                                        <li>{item.replace(/^\d+\.\s*/, '')}</li>
                                                    </ol>
                                                )
                                            }
                                            return <p key={itemIndex}>{item}</p>
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="border-t border-purple-900/20 pt-6 mt-6">
                        <h2 className="text-xl font-semibold text-purple-200 mb-4 flex items-center">
                            <BookOpen className="h-5 w-5 mr-2 text-purple-400"/>
                            Credits
                        </h2>
                        <div className="text-purple-200/70 space-y-4">
                            {cheat.credits.split('\n\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
