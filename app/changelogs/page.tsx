import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Updated and expanded changelogs
const changelogs = [
    {
        version: "1.3.0",
        date: "2025-04-01",
        changes: [
            { type: "feature", description: "Created Server Status page with real-time monitoring" },
            { type: "feature", description: "Implemented status checks for websites, VPS, and services" },
            { type: "improvement", description: "Added visual indicators for server health and performance" },
        ],
    },
    {
        version: "1.2.0",
        date: "2025-03-15",
        changes: [
            { type: "feature", description: "Added HomeServer stats to the Lab page" },
            { type: "feature", description: "Introduced Games page with library and playtime statistics" },
            { type: "feature", description: "Implemented changelogs system" },
            { type: "improvement", description: "Enhanced cyberpunk styling across the site" },
            { type: "fix", description: "Resolved issue with project cards not displaying correctly on mobile" },
        ],
    },
    {
        version: "1.1.0",
        date: "2025-02-01",
        changes: [
            { type: "feature", description: "Introduced dynamic blog post layout" },
            { type: "feature", description: "Added Companies page showcasing founded startups" },
            { type: "feature", description: "Created Progress page with skill development timeline" },
            { type: "improvement", description: "Implemented Spotify Now Playing widget" },
            { type: "improvement", description: "Optimized image loading for faster page loads" },
            { type: "fix", description: "Fixed broken links in the navigation menu" },
        ],
    },
    {
        version: "1.0.0",
        date: "2025-01-01",
        changes: [
            { type: "feature", description: "Initial release of the cyberpunk portfolio" },
            { type: "feature", description: "Implemented responsive design for all screen sizes" },
            { type: "feature", description: "Created project showcase section" },
            { type: "feature", description: "Developed custom cyberpunk-themed UI components" },
            { type: "feature", description: "Integrated shadcn/ui library for consistent design" },
        ],
    },
]

export default function ChangelogsPage() {
    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 flex items-center gap-2">
                    <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                    <span className="text-purple-200/50">back to home</span>
                </div>

                <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Changelogs
                </h1>

                <div className="space-y-8">
                    {changelogs.map((log) => (
                        <Card key={log.version} className="bg-black/50 border border-purple-900/20">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-purple-200">Version {log.version}</span>
                                    <span className="text-sm text-purple-200/70">{log.date}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {log.changes.map((change, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <Badge
                                                variant="outline"
                                                className={`mt-1 ${
                                                    change.type === "feature"
                                                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                                                        : change.type === "improvement"
                                                            ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                                            : "bg-red-500/20 text-red-400 border-red-500/30"
                                                }`}
                                            >
                                                {change.type}
                                            </Badge>
                                            <span className="text-purple-200/80">{change.description}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

