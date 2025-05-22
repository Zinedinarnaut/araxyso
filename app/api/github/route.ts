import { NextResponse } from "next/server"
import type { GitHubRepo } from "@/types/github"

export async function GET() {
    try {
        const response = await fetch("https://api.github.com/users/zinedinarnaut/repos", {
            headers: {
                Authorization: process.env.GITHUB_TOKEN ? `Bearer ${process.env.GITHUB_TOKEN}` : "",
                "Content-Type": "application/json",
            },
            next: { revalidate: 3600 }, // Cache for 1 hour
        })

        if (!response.ok) {
            throw new Error(`GitHub API responded with status: ${response.status}`)
        }

        const repos = await response.json()

        // Filter and sort repositories
        const filteredRepos = repos
            .filter((repo: GitHubRepo) => !repo.fork) // Filter out forked repositories
            .sort((a: GitHubRepo, b: GitHubRepo) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())

        return NextResponse.json(filteredRepos)
    } catch (error) {
        console.error("Error fetching GitHub repos:", error)
        return NextResponse.json({ error: "Failed to fetch GitHub repositories" }, { status: 500 })
    }
}
