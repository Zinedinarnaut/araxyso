import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChevronLeft, Sparkles, Zap } from "lucide-react"
import Link from "next/link"
import { UserProfile } from "@/components/UserProfile"
import { AnimeAndMangaStats } from "@/components/AnimeAndMangaStats"
import { RecentActivityList } from "@/components/RecentActivityList"

export const metadata = {
    title: "Anime & Manga Stats | Araxyso",
    description: "View my anime and manga statistics and recent activity powered by AniList",
}

export default function AnimeAndMangaStatsPage() {
    return (
        <div className="min-h-screen relative">
            {/* Animated background grid */}
            <div className="fixed inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
          `,
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>

            <div className="relative z-10 py-12 px-4 max-w-7xl mx-auto">
                {/* Enhanced navigation */}
                <div className="mb-12 flex items-center gap-3 group">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-all duration-300 hover:scale-105 hover:gap-3"
                    >
                        <div className="p-2 rounded-full bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/20 transition-all duration-300">
                            <ChevronLeft className="h-4 w-4" />
                        </div>
                        <span className="text-purple-200/70 group-hover:text-purple-200 transition-colors">back to home</span>
                    </Link>
                </div>

                {/* Enhanced title with animated elements */}
                <div className="mb-12 text-center relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Sparkles className="h-6 w-6 text-purple-400/50 animate-pulse" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 animate-gradient-x">
                        Anime & Manga Stats
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-purple-200/60">
                        <Zap className="h-4 w-4" />
                        <span className="text-sm font-medium">Powered by AniList API</span>
                        <Zap className="h-4 w-4" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full" />
                </div>

                {/* Enhanced cards layout */}
                <div className="space-y-8">
                    {/* User Profile Card */}
                    <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border border-purple-900/30 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        <CardHeader className="relative">
                            <CardTitle className="text-purple-200 flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                                User Information
                                <div className="ml-auto w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping" />
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative">
                            <UserProfile />
                        </CardContent>
                    </Card>

                    {/* Stats Card */}
                    <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border border-purple-900/30 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        <CardHeader className="relative">
                            <CardTitle className="text-purple-200 flex items-center gap-2">
                                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
                                My Anime & Manga Journey
                                <div className="ml-auto flex gap-1">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                                    <div
                                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                                        style={{ animationDelay: "0.2s" }}
                                    />
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative">
                            <AnimeAndMangaStats />
                        </CardContent>
                    </Card>

                    {/* Activity Card */}
                    <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border border-purple-900/30 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        <CardHeader className="relative">
                            <CardTitle className="text-purple-200 flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                Recent Activity & Favorites
                                <div className="ml-auto">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500/20 to-purple-500/20 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    </div>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="relative">
                            <RecentActivityList />
                        </CardContent>
                    </Card>
                </div>

                {/* Floating elements */}
                <div className="fixed top-20 right-10 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-60" />
                <div className="fixed bottom-20 left-10 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-40" />
                <div className="fixed top-1/2 right-5 w-1 h-8 bg-gradient-to-b from-purple-500/50 to-transparent rounded-full" />
            </div>
        </div>
    )
}
