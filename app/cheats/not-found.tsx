import { Card } from "@/components/ui/card"
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="py-12">
            <div className="mb-8 flex items-center gap-2">
                <Link href="/cheats" className="text-purple-400 hover:text-purple-300 transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                </Link>
                <span className="text-purple-200/50">back to cheats</span>
            </div>

            <Card className="p-8 bg-black/50 border border-purple-900/20 text-center">
                <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    404 - Cheat Not Found
                </h1>
                <p className="text-purple-200/70 mb-6">
                    The cheat you&#39;re looking for doesn&#39;t exist in our database... yet.
                </p>
                <Link
                    href="/cheats"
                    className="text-purple-400 hover:text-purple-300 transition-colors underline"
                >
                    Return to Hack.Matrix
                </Link>
            </Card>
        </div>
    )
}

