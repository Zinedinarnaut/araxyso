"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Star, GitBranch, Calendar, Code2, ExternalLink, Eye, ArrowUpRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import type { GitHubRepo } from "@/types/github"

export default function ProjectsPage() {
    const [repos, setRepos] = useState<GitHubRepo[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchRepos() {
            try {
                const response = await fetch("/api/github")

                if (!response.ok) {
                    throw new Error(`Failed to fetch repositories: ${response.status}`)
                }

                const data = await response.json()
                setRepos(data)
            } catch (err) {
                console.error("Error fetching GitHub repos:", err)
                setError(err instanceof Error ? err.message : "Failed to load repositories")
            } finally {
                setLoading(false)
            }
        }

        fetchRepos()
    }, [])

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex items-center gap-2">
                    <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                    <span className="text-purple-200/50">back to home</span>
                </div>

                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        Projects.exe
                    </h1>
                    <p className="text-purple-200/70 max-w-3xl">
                        A collection of my open-source projects and experiments. These repositories showcase my skills in software
                        development, reverse engineering, and system architecture.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="h-12 w-12 text-purple-400 animate-spin mb-4" />
                        <p className="text-purple-200/70">Loading repositories...</p>
                    </div>
                ) : error ? (
                    <Card className="p-6 bg-black/50 border border-red-900/20 text-center">
                        <div className="py-12">
                            <div className="w-12 h-12 rounded-full bg-red-900/20 flex items-center justify-center mx-auto mb-4">
                                <ExternalLink className="h-6 w-6 text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-red-400 mb-2">Failed to load repositories</h3>
                            <p className="text-red-200/70 max-w-md mx-auto mb-6">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-red-900/20 text-red-400 border border-red-500/30 rounded-md hover:bg-red-900/30 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repos.map((repo) => (
                            <motion.div
                                key={repo.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ y: -5 }}
                                className="h-full"
                            >
                                <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" className="h-full block">
                                    <Card className="h-full p-6 bg-black/50 border border-purple-900/20 hover:border-purple-500/50 transition-all duration-300 group relative overflow-hidden">
                                        {/* Glow effect on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                                        <div className="flex justify-between items-start mb-4">
                                            <h2 className="text-xl font-bold text-purple-200 group-hover:text-purple-100 transition-colors flex items-center gap-2">
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
                                                    <Badge variant="outline" className="border-purple-900/20 bg-purple-900/20 text-purple-200">
                                                        <Code2 className="h-3 w-3 mr-1" />
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
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

                {!loading && !error && repos.length === 0 && (
                    <Card className="p-6 bg-black/50 border border-purple-900/20 text-center">
                        <div className="py-12">
                            <Code2 className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-purple-200 mb-2">No repositories found</h3>
                            <p className="text-purple-200/50 max-w-md mx-auto">
                                Repositories will appear here once they&#39;re fetched from GitHub. Make sure your GitHub token is
                                configured correctly.
                            </p>
                        </div>
                    </Card>
                )}

                {!loading && !error && repos.length > 0 && (
                    <div className="mt-12 text-center">
                        <Link
                            href="https://github.com/zinedinarnaut"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            <span>View all repositories on GitHub</span>
                            <ExternalLink className="h-4 w-4" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
