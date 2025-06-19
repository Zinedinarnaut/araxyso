"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    ChevronLeft,
    Star,
    GitBranch,
    Calendar,
    Code2,
    ExternalLink,
    Eye,
    ArrowUpRight,
    Filter,
    Search,
    Grid3X3,
    List,
    Activity,
    Zap,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { GitHubRepo } from "@/types/github"
import type { GitHubStats } from "@/types/contributions"
import { ContributionHeatmap } from "@/components/ContributionHeatmap"
import { GitHubStatsDashboard } from "@/components/GitHubStatsDashboard"

export default function ProjectsPage() {
    const [repos, setRepos] = useState<GitHubRepo[]>([])
    const [stats, setStats] = useState<GitHubStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [reposError, setReposError] = useState<string | null>(null)
    const [statsError, setStatsError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [languageFilter, setLanguageFilter] = useState("all")
    const [sortBy, setSortBy] = useState("updated")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    useEffect(() => {
        async function fetchData() {
            // Fetch repositories (essential)
            try {
                console.log("Fetching repositories...")
                const reposResponse = await fetch("/api/github")

                if (reposResponse.ok) {
                    const reposData = await reposResponse.json()
                    console.log("✅ Repositories loaded:", reposData.length)
                    setRepos(reposData)
                } else {
                    const errorText = await reposResponse.text()
                    console.error("❌ Repos API failed:", reposResponse.status, errorText)
                    setReposError(`Failed to load repositories (${reposResponse.status})`)
                }
            } catch (error) {
                console.error("❌ Repos fetch error:", error)
                setReposError("Network error loading repositories")
            }

            // Fetch stats (optional - don't break if this fails)
            try {
                console.log("Fetching GitHub stats...")
                const statsResponse = await fetch("/api/github-stats")

                if (statsResponse.ok) {
                    const statsData = await statsResponse.json()
                    console.log("✅ Stats loaded:", statsData)
                    setStats(statsData)
                } else {
                    const errorText = await statsResponse.text()
                    console.warn("⚠️ Stats API failed:", statsResponse.status, errorText)
                    setStatsError(`Stats unavailable (${statsResponse.status})`)
                }
            } catch (error) {
                console.warn("⚠️ Stats fetch error:", error)
                setStatsError("Stats temporarily unavailable")
            }

            setLoading(false)
        }

        fetchData()
    }, [])

    // Filter and sort repos
    const filteredRepos = repos
        .filter((repo) => {
            const matchesSearch =
                repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (repo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
            const matchesLanguage = languageFilter === "all" || repo.language === languageFilter
            return matchesSearch && matchesLanguage
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "stars":
                    return b.stargazers_count - a.stargazers_count
                case "name":
                    return a.name.localeCompare(b.name)
                case "created":
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                default: // updated
                    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
            }
        })

    // Get unique languages
    const languages = Array.from(new Set(repos.map((repo) => repo.language).filter(Boolean)))

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <div className="relative mb-8">
                        <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto" />
                        <Zap className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-purple-200 mb-2">Initializing Developer Cockpit</h2>
                    <p className="text-purple-200/60">Loading repositories and contribution data...</p>
                </motion.div>
            </div>
        )
    }

    // If repos failed to load, show error
    if (reposError && repos.length === 0) {
        return (
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8 flex items-center gap-2">
                        <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                        <span className="text-purple-200/50">back to home</span>
                    </div>

                    <Card className="p-6 bg-red-900/20 border border-red-500/30 text-center">
                        <div className="py-12">
                            <div className="w-12 h-12 rounded-full bg-red-900/20 flex items-center justify-center mx-auto mb-4">
                                <ExternalLink className="h-6 w-6 text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-red-400 mb-2">Failed to Load Repositories</h3>
                            <p className="text-red-200/70 max-w-md mx-auto mb-6">{reposError}</p>
                            <Button
                                onClick={() => window.location.reload()}
                                className="bg-red-900/20 text-red-400 border border-red-500/30 hover:bg-red-900/30"
                            >
                                Retry
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center gap-2">
                    <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                    <span className="text-purple-200/50">back to home</span>
                </div>

                {/* Title Section */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
                    <div className="relative inline-block">
                        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
                            Developer Cockpit
                        </h1>
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 animate-pulse" />
                    </div>
                    <p className="text-purple-200/70 max-w-3xl mx-auto text-lg">
                        Mission control for my open-source projects, contributions, and development activity.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {/* Stats Dashboard - Only show if stats loaded successfully */}
                    {stats && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <GitHubStatsDashboard stats={stats} />
                        </motion.div>
                    )}

                    {/* Stats Error - Show warning if stats failed but repos worked */}
                    {statsError && !stats && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <Card className="p-4 bg-yellow-900/20 border border-yellow-500/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-yellow-900/20 flex items-center justify-center">
                                        <Activity className="h-4 w-4 text-yellow-400" />
                                    </div>
                                    <div>
                                        <p className="text-yellow-200 font-medium">Stats Dashboard Unavailable</p>
                                        <p className="text-yellow-200/70 text-sm">{statsError}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {/* Contribution Heatmap - Only show if stats loaded */}
                    {stats && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                            <ContributionHeatmap data={stats.contributionCalendar} />
                        </motion.div>
                    )}

                    {/* Filters and Controls */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-black/40 border border-purple-900/30 rounded-lg p-6 backdrop-blur-sm"
                    >
                        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                            <div className="flex flex-col sm:flex-row gap-4 flex-1">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
                                    <Input
                                        placeholder="Search repositories..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-black/50 border-purple-500/30 text-purple-200 placeholder:text-purple-200/50"
                                    />
                                </div>

                                <Select value={languageFilter} onValueChange={setLanguageFilter}>
                                    <SelectTrigger className="w-40 bg-black/50 border-purple-500/30 text-purple-200">
                                        <Filter className="h-4 w-4 mr-2" />
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-purple-500/30">
                                        <SelectItem value="all">All Languages</SelectItem>
                                        {languages.map((lang) => (
                                            <SelectItem key={lang} value={lang!}>
                                                {lang}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-40 bg-black/50 border-purple-500/30 text-purple-200">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-purple-500/30">
                                        <SelectItem value="updated">Last Updated</SelectItem>
                                        <SelectItem value="created">Date Created</SelectItem>
                                        <SelectItem value="stars">Most Stars</SelectItem>
                                        <SelectItem value="name">Name</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                    className="bg-purple-500/20 border-purple-500/30 text-purple-200"
                                >
                                    <Grid3X3 className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setViewMode("list")}
                                    className="bg-purple-500/20 border-purple-500/30 text-purple-200"
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-4 text-sm text-purple-200/60">
              <span>
                Showing {filteredRepos.length} of {repos.length} repositories
              </span>
                            <div className="flex items-center gap-2">
                                <Activity className="h-4 w-4" />
                                <span>Live data from GitHub API</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Repository Grid/List */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={viewMode}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
                        >
                            {filteredRepos.map((repo, index) => (
                                <motion.div
                                    key={repo.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ y: -5 }}
                                    className="h-full"
                                >
                                    <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" className="h-full block">
                                        <Card className="h-full p-6 bg-black/40 border border-purple-900/20 hover:border-purple-500/50 transition-all duration-300 group relative overflow-hidden backdrop-blur-sm">
                                            {/* Animated background */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-purple-500/0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

                                            {/* Glow effect */}
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                                            <div className="relative">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h2 className="text-xl font-bold text-purple-200 group-hover:text-purple-100 transition-colors flex items-center gap-2">
                                                        <Code2 className="h-5 w-5" />
                                                        {repo.name}
                                                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </h2>
                                                    <div className="flex items-center gap-2 text-sm text-purple-200/50">
                                                        <Star className="h-4 w-4 text-yellow-400" />
                                                        <span>{repo.stargazers_count}</span>
                                                    </div>
                                                </div>

                                                {repo.description && <p className="text-purple-200/70 mb-6 line-clamp-3">{repo.description}</p>}

                                                <div className="mt-auto space-y-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        {repo.language && (
                                                            <Badge
                                                                variant="outline"
                                                                className="border-purple-900/20 bg-purple-900/20 text-purple-200"
                                                            >
                                                                <div className="w-2 h-2 rounded-full bg-purple-400 mr-2" />
                                                                {repo.language}
                                                            </Badge>
                                                        )}
                                                        <Badge variant="outline" className="border-purple-900/20 bg-purple-900/20 text-purple-200">
                                                            <Calendar className="h-3 w-3 mr-1" />
                                                            {new Date(repo.updated_at).toLocaleDateString()}
                                                        </Badge>
                                                        <Badge variant="outline" className="border-purple-900/20 bg-purple-900/20 text-purple-200">
                                                            <GitBranch className="h-3 w-3 mr-1" />
                                                            {repo.fork ? "Fork" : "Source"}
                                                        </Badge>
                                                    </div>

                                                    <div className="flex justify-between items-center pt-2 text-sm">
                            <span className="text-purple-200/50">
                              Created: {new Date(repo.created_at).toLocaleDateString()}
                            </span>
                                                        <div className="flex items-center gap-1 text-purple-400 group-hover:text-purple-300 transition-colors">
                                                            <Eye className="h-4 w-4" />
                                                            <span>View Repository</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filteredRepos.length === 0 && repos.length > 0 && (
                        <Card className="p-6 bg-black/40 border border-purple-900/20 text-center">
                            <div className="py-12">
                                <Search className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-purple-200 mb-2">No repositories found</h3>
                                <p className="text-purple-200/50 max-w-md mx-auto">
                                    Try adjusting your search terms or filters to find what you're looking for.
                                </p>
                            </div>
                        </Card>
                    )}

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-center pt-8"
                    >
                        <Link
                            href="https://github.com/araxyso"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
                        >
                            <span>View complete profile on GitHub</span>
                            <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
