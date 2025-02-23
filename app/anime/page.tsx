import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
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
        <div className="py-12">
            <div className="mb-8 flex items-center gap-2">
                <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                </Link>
                <span className="text-purple-200/50">back to home</span>
            </div>

            <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Anime & Manga Stats
            </h1>

            <Card className="bg-black/50 border border-purple-900/20 mb-6">
                <CardHeader>
                    <CardTitle className="text-purple-200">User Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <UserProfile />
                </CardContent>
            </Card>

            <Card className="bg-black/50 border border-purple-900/20 mb-6">
                <CardHeader>
                    <CardTitle className="text-purple-200">My Anime & Manga Journey</CardTitle>
                </CardHeader>
                <CardContent>
                    <AnimeAndMangaStats />
                </CardContent>
            </Card>

            <Card className="bg-black/50 border border-purple-900/20">
                <CardHeader>
                    <CardTitle className="text-purple-200">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <RecentActivityList />
                </CardContent>
            </Card>
        </div>
    )
}

