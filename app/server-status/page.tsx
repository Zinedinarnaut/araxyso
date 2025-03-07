import { Suspense } from "react"
import { ServerStatusList } from '@/components/server-status-list'
import { ServerStatusRefresh } from '@/components/server-status-refresh'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChevronLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"

async function getServerStatus() {
    try {
        const res = await fetch("https://araxyso.nanod.cloud/api/server-status", { cache: "no-store" })
        if (!res.ok) {
            throw new Error("Failed to fetch server status")
        }
        return res.json()
    } catch (error) {
        console.error("Error fetching server status:", error)
        return null
    }
}

export default async function ServerStatusPage() {
    const initialStatus = await getServerStatus()

    return (
        <div className="py-12">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                    <span className="text-purple-200/50">back to home</span>
                </div>
                <ServerStatusRefresh />
            </div>

            <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Server Status
            </h1>

            <Card className="bg-black/50 border border-purple-900/20">
                <CardHeader>
                    <CardTitle className="text-purple-200">System Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<div className="text-purple-200/50">Loading server status...</div>}>
                        {initialStatus ? (
                            <ServerStatusList initialStatus={initialStatus} />
                        ) : (
                            <div className="flex items-center justify-center p-4 bg-red-900/10 rounded-lg border border-red-500/20 text-red-400">
                                <AlertTriangle className="h-5 w-5 mr-2" />
                                Failed to load initial server status. Please try refreshing the page.
                            </div>
                        )}
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    )
}

