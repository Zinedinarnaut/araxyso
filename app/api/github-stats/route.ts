import { NextResponse } from "next/server"

interface GitHubRepository {
    stargazerCount: number
    forkCount: number
    primaryLanguage: {
        name: string
        color: string
    } | null
    createdAt: string
    updatedAt: string
    isPrivate: boolean
}

interface ContributionsCollection {
    totalCommitContributions: number
    totalIssueContributions: number
    totalPullRequestContributions: number
    totalPullRequestReviewContributions: number
    contributionCalendar: {
        totalContributions: number
        weeks: Array<{
            contributionDays: Array<{
                contributionCount: number
                date: string
                color: string
            }>
        }>
    }
}

interface GitHubUser {
    contributionsCollection: ContributionsCollection
    repositories: {
        totalCount: number
        nodes: GitHubRepository[]
    }
    pullRequests: { totalCount: number }
    issues: { totalCount: number }
    followers: { totalCount: number }
    following: { totalCount: number }
}

interface GraphQLResponse {
    data: {
        user: GitHubUser
    }
    errors?: Array<{ message: string }>
}

export async function GET() {
    try {
        const username = "zinedinarnaut"
        const token = process.env.GITHUB_TOKEN

        console.log("🔄 Fetching REAL GitHub stats for:", username)
        console.log("🔑 Token status:", token ? "Present" : "Missing")

        if (!token) {
            return NextResponse.json(
                {
                    error: "GitHub Token Required",
                    message: "GITHUB_TOKEN environment variable is required for real data",
                    instructions: [
                        "1. Go to GitHub.com → Settings → Developer settings → Personal access tokens",
                        "2. Generate new token (classic)",
                        "3. Select scopes: 'public_repo', 'read:user', 'read:org'",
                        "4. Copy the token and set GITHUB_TOKEN environment variable",
                    ],
                },
                { status: 401 },
            )
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
            "User-Agent": "Portfolio-App",
            "X-GitHub-Api-Version": "2022-11-28",
        }

        // GraphQL query to get REAL contribution data and stats
        const graphqlQuery = {
            query: `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              totalCommitContributions
              totalIssueContributions  
              totalPullRequestContributions
              totalPullRequestReviewContributions
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    color
                  }
                }
              }
            }
            repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
              totalCount
              nodes {
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                  color
                }
                createdAt
                updatedAt
                isPrivate
              }
            }
            pullRequests(first: 1) {
              totalCount
            }
            issues(first: 1) {
              totalCount
            }
            followers {
              totalCount
            }
            following {
              totalCount
            }
          }
        }
      `,
            variables: {
                username: username,
            },
        }

        console.log("🌐 Fetching real data from GitHub GraphQL API...")
        const graphqlResponse = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(graphqlQuery),
        })

        if (!graphqlResponse.ok) {
            const errorData = await graphqlResponse.json().catch(() => ({ message: "Unknown error" }))
            console.error("❌ GitHub GraphQL API failed:", graphqlResponse.status, errorData)

            if (graphqlResponse.status === 401) {
                return NextResponse.json(
                    {
                        error: "GitHub Authentication Failed",
                        message: "Your GitHub token is invalid or expired. Please generate a new one.",
                        instructions: [
                            "1. Go to GitHub.com → Settings → Developer settings → Personal access tokens",
                            "2. Generate new token (classic)",
                            "3. Select scopes: 'public_repo', 'read:user', 'read:org'",
                            "4. Copy the token and set GITHUB_TOKEN environment variable",
                        ],
                    },
                    { status: 401 },
                )
            }

            return NextResponse.json(
                {
                    error: "GitHub GraphQL Error",
                    message: errorData.message || "Failed to fetch real GitHub data",
                    status: graphqlResponse.status,
                },
                { status: graphqlResponse.status },
            )
        }

        const graphqlData: GraphQLResponse = await graphqlResponse.json()

        if (graphqlData.errors) {
            console.error("❌ GraphQL errors:", graphqlData.errors)
            return NextResponse.json(
                {
                    error: "GitHub GraphQL Errors",
                    message: "GraphQL query returned errors",
                    details: graphqlData.errors,
                },
                { status: 400 },
            )
        }

        const userData = graphqlData.data.user
        console.log("✅ Real GitHub data fetched successfully!")

        // Extract REAL statistics
        const contributions = userData.contributionsCollection
        const repos = userData.repositories.nodes

        // Calculate real repository stats
        const totalStars = repos.reduce((sum: number, repo: GitHubRepository) => sum + repo.stargazerCount, 0)
        const totalForks = repos.reduce((sum: number, repo: GitHubRepository) => sum + repo.forkCount, 0)

        // Get language distribution
        const languageStats = repos
            .filter((repo: GitHubRepository) => repo.primaryLanguage)
            .reduce((acc: Record<string, number>, repo: GitHubRepository) => {
                const lang = repo.primaryLanguage?.name
                acc[lang] = (acc[lang] || 0) + 1
                return acc
            }, {})

        const topLanguages = Object.entries(languageStats)
            .sort(([, a]: [string, number], [, b]: [string, number]) => b - a)
            .slice(0, 5)
            .map(([name, count]) => ({ name, count, percentage: Math.round(((count as number) / repos.length) * 100) }))

        // Real contribution statistics
        const realStats = {
            // REAL commit data from GitHub
            totalCommits: contributions.totalCommitContributions,

            // REAL PR data from GitHub
            totalPRs: contributions.totalPullRequestContributions,

            // REAL issues data from GitHub
            totalIssues: contributions.totalIssueContributions,

            // REAL stars and forks from repositories
            totalStars,
            totalForks,

            // REAL contribution calendar from GitHub
            contributionCalendar: contributions.contributionCalendar,

            // Additional real stats
            totalRepos: userData.repositories.totalCount,
            totalFollowers: userData.followers.totalCount,
            totalFollowing: userData.following.totalCount,
            totalPRReviews: contributions.totalPullRequestReviewContributions,

            // Language breakdown
            topLanguages,

            // Repository insights
            publicRepos: repos.filter((repo: GitHubRepository) => !repo.isPrivate).length,
            privateRepos: repos.filter((repo: GitHubRepository) => repo.isPrivate).length,
        }

        console.log("📊 REAL GitHub stats compiled:", {
            commits: realStats.totalCommits,
            prs: realStats.totalPRs,
            issues: realStats.totalIssues,
            stars: realStats.totalStars,
            contributions: realStats.contributionCalendar.totalContributions,
        })

        return NextResponse.json(realStats)
    } catch (error) {
        console.error("❌ Unexpected error fetching real GitHub data:", error)

        return NextResponse.json(
            {
                error: "Server Error",
                message: "An unexpected error occurred while fetching real GitHub data",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        )
    }
}
