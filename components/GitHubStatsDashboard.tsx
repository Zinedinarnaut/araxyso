"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { GitCommit, GitPullRequest, AlertCircle, Star, GitFork, TrendingUp } from 'lucide-react'
import type { GitHubStats } from "@/types/contributions"

interface GitHubStatsDashboardProps {
    stats: GitHubStats
}

export function GitHubStatsDashboard({ stats }: GitHubStatsDashboardProps) {
    const statCards = [
        {
            title: "Total Commits",
            value: stats.totalCommits.toLocaleString(),
            icon: GitCommit,
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-500/10",
            borderColor: "border-purple-500/30",
        },
        {
            title: "Pull Requests",
            value: stats.totalPRs.toLocaleString(),
            icon: GitPullRequest,
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/30",
        },
        {
            title: "Issues Created",
            value: stats.totalIssues.toLocaleString(),
            icon: AlertCircle,
            color: "from-orange-500 to-orange-600",
            bgColor: "bg-orange-500/10",
            borderColor: "border-orange-500/30",
        },
        {
            title: "Total Stars",
            value: stats.totalStars.toLocaleString(),
            icon: Star,
            color: "from-yellow-500 to-yellow-600",
            bgColor: "bg-yellow-500/10",
            borderColor: "border-yellow-500/30",
        },
        {
            title: "Total Forks",
            value: stats.totalForks.toLocaleString(),
            icon: GitFork,
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-500/10",
            borderColor: "border-green-500/30",
        },
        {
            title: "Contributions",
            value: stats.contributionCalendar.totalContributions.toLocaleString(),
            icon: TrendingUp,
            color: "from-pink-500 to-pink-600",
            bgColor: "bg-pink-500/10",
            borderColor: "border-pink-500/30",
        },
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {statCards.map((stat, index) => (
                <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Card className={`p-4 ${stat.bgColor} ${stat.borderColor} border backdrop-blur-sm hover:scale-105 transition-all duration-300 group`}>
                        <div className="flex items-center justify-between mb-2">
                            <stat.icon className="h-5 w-5 text-purple-200/70 group-hover:text-purple-200 transition-colors" />
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stat.color} animate-pulse`} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-2xl font-bold text-purple-100 group-hover:text-white transition-colors">
                                {stat.value}
                            </p>
                            <p className="text-xs text-purple-200/60 group-hover:text-purple-200/80 transition-colors">
                                {stat.title}
                            </p>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}
