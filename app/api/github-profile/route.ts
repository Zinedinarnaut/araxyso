import { NextResponse } from "next/server"

interface GitHubAchievement {
    id: string
    name: string
    description: string
    tier: string
    icon: string
    color: string
    unlockedAt: string
}

interface GitHubUserData {
    achievements?: { nodes: GitHubAchievement[] }
    repositoriesContributedTo: { totalCount: number }
    pullRequests: { totalCount: number }
    issues: { totalCount: number }
    gists: { totalCount: number }
    starredRepositories: { totalCount: number }
}

interface GitHubProfile {
    public_repos: number
    followers: number
    created_at: string
}

// Mock achievements for fallback
const getMockAchievements = (profile: GitHubProfile, userData?: GitHubUserData) => {
    const achievements = []

    // Pull Shark - based on real merged PRs or estimated
    const prCount = userData?.pullRequests.totalCount || Math.floor(profile.public_repos * 0.8)
    if (prCount >= 2) {
        achievements.push({
            id: "pull-shark",
            name: "Pull Shark",
            description: `Opened ${prCount} pull requests that have been merged`,
            tier: prCount >= 50 ? "gold" : prCount >= 20 ? "silver" : "bronze",
            icon: "🦈",
            color: "from-blue-400 to-cyan-400",
            unlockedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        })
    }

    // Starstruck - based on real repos
    if (profile.public_repos >= 5) {
        achievements.push({
            id: "starstruck",
            name: "Starstruck",
            description: "Created repositories that have been starred",
            tier: profile.public_repos >= 25 ? "gold" : profile.public_repos >= 15 ? "silver" : "bronze",
            icon: "⭐",
            color: "from-purple-400 to-pink-400",
            unlockedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        })
    }

    // Pair Extraordinaire - based on contributions or estimated
    const contribCount = userData?.repositoriesContributedTo.totalCount || Math.floor(profile.public_repos * 1.5)
    if (contribCount >= 5) {
        achievements.push({
            id: "pair-extraordinaire",
            name: "Pair Extraordinaire",
            description: `Contributed to ${contribCount} repositories`,
            tier: contribCount >= 50 ? "gold" : contribCount >= 20 ? "silver" : "bronze",
            icon: "👥",
            color: "from-green-400 to-lime-400",
            unlockedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        })
    }

    // Galaxy Brain - based on issues or estimated
    const issueCount = userData?.issues.totalCount || Math.floor(profile.public_repos * 0.6)
    if (issueCount >= 1) {
        achievements.push({
            id: "galaxy-brain",
            name: "Galaxy Brain",
            description: `Closed ${issueCount} issues`,
            tier: issueCount >= 20 ? "gold" : issueCount >= 10 ? "silver" : "bronze",
            icon: "🧠",
            color: "from-indigo-400 to-purple-400",
            unlockedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        })
    }

    // Arctic Code Vault - based on real join date
    const joinYear = new Date(profile.created_at).getFullYear()
    if (joinYear <= 2020) {
        achievements.push({
            id: "arctic-code-vault-contributor",
            name: "Arctic Code Vault Contributor",
            description: "Contributed code to repositories in the 2020 GitHub Archive Program",
            tier: "special",
            icon: "🏔️",
            color: "from-cyan-400 to-blue-400",
            unlockedAt: "2020-07-16T00:00:00Z",
        })
    }

    // YOLO - for active developers
    if (profile.public_repos >= 3) {
        achievements.push({
            id: "yolo",
            name: "YOLO",
            description: "Merged code to the default branch without code review",
            tier: "bronze",
            icon: "🎯",
            color: "from-orange-400 to-red-400",
            unlockedAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
        })
    }

    // Quickdraw - for fast developers
    if (profile.public_repos >= 2) {
        achievements.push({
            id: "quickdraw",
            name: "Quickdraw",
            description: "Closed an issue or merged a PR within 5 minutes of opening",
            tier: "silver",
            icon: "⚡",
            color: "from-yellow-400 to-orange-400",
            unlockedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
        })
    }

    // Heart On Your Sleeve - for community engagement
    if (profile.followers >= 5) {
        achievements.push({
            id: "heart-on-your-sleeve",
            name: "Heart On Your Sleeve",
            description: "Reacted to something on GitHub with a ❤️ emoji",
            tier: "bronze",
            icon: "❤️",
            color: "from-pink-400 to-red-400",
            unlockedAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
        })
    }

    return achievements
}

export async function GET() {
    try {
        const username = "zinedinarnaut"
        const token = process.env.GITHUB_TOKEN

        console.log("🔄 Fetching REAL GitHub profile for:", username)
        console.log("🔑 Token available:", token ? "Yes" : "No")

        if (!token) {
            return NextResponse.json(
                {
                    error: "GitHub Token Required",
                    message: "GITHUB_TOKEN environment variable is required for real profile data",
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

        // Fetch real user profile
        const profileResponse = await fetch(`https://api.github.com/users/${username}`, {
            headers,
        })

        if (!profileResponse.ok) {
            throw new Error(`Failed to fetch profile: ${profileResponse.status}`)
        }

        const profile = await profileResponse.json()
        console.log("✅ Real profile fetched successfully")

        // Try to fetch REAL GitHub achievements using GraphQL
        let realAchievements: GitHubAchievement[] = []
        let userData: GitHubUserData | undefined

        try {
            const achievementsQuery = {
                query: `
          query($username: String!) {
            user(login: $username) {
              achievements(first: 100) {
                nodes {
                  id
                  name
                  description
                  tier
                  unlockedAt
                  achievement {
                    name
                    description
                    badgeUrl
                  }
                }
              }
              repositoriesContributedTo(first: 100, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
                totalCount
              }
              pullRequests(states: MERGED, first: 1) {
                totalCount
              }
              issues(states: CLOSED, first: 1) {
                totalCount
              }
              gists {
                totalCount
              }
              starredRepositories {
                totalCount
              }
            }
          }
        `,
                variables: { username },
            }

            const achievementsResponse = await fetch("https://api.github.com/graphql", {
                method: "POST",
                headers: {
                    ...headers,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(achievementsQuery),
            })

            if (achievementsResponse.ok) {
                const achievementsData = await achievementsResponse.json()

                if (achievementsData.data?.user) {
                    userData = achievementsData.data.user

                    // Try to get real achievements
                    if (userData && userData.achievements?.nodes && userData.achievements.nodes.length > 0) {
                        realAchievements = userData.achievements.nodes
                        console.log("✅ Real achievements fetched:", realAchievements.length)
                    } else {
                        console.log("⚠️ No real achievements found, using mock achievements")
                        realAchievements = getMockAchievements(profile, userData)
                    }
                }
            } else {
                console.log("⚠️ GraphQL achievements not accessible, using mock achievements")
                realAchievements = getMockAchievements(profile)
            }
        } catch (error) {
            console.log("⚠️ GraphQL achievements error, using mock achievements:", error)
            realAchievements = getMockAchievements(profile)
        }

        // If still no achievements, use mock ones
        if (realAchievements.length === 0) {
            console.log("🎭 Using mock achievements as fallback")
            realAchievements = getMockAchievements(profile, userData)
        }

        // Generate profile badges based on REAL profile data
        const generateRealProfileBadges = (profileData: GitHubProfile) => {
            const badges = []
            const joinYear = new Date(profileData.created_at).getFullYear()
            const yearsOnGitHub = new Date().getFullYear() - joinYear

            // Years on GitHub badge (REAL)
            if (yearsOnGitHub >= 1) {
                badges.push({
                    id: "years-on-github",
                    name: `${yearsOnGitHub} Year${yearsOnGitHub > 1 ? "s" : ""} on GitHub`,
                    description: `Member since ${joinYear}`,
                    tier: yearsOnGitHub >= 5 ? "gold" : yearsOnGitHub >= 3 ? "silver" : "bronze",
                    icon: "🎂",
                    color: "from-yellow-400 to-orange-400",
                })
            }

            // Prolific contributor badge (REAL repo count)
            if (profileData.public_repos >= 10) {
                badges.push({
                    id: "prolific-contributor",
                    name: "Prolific Contributor",
                    description: `${profileData.public_repos} public repositories`,
                    tier: profileData.public_repos >= 50 ? "gold" : profileData.public_repos >= 25 ? "silver" : "bronze",
                    icon: "🚀",
                    color: "from-purple-400 to-pink-400",
                })
            }

            // Popular developer badge (REAL follower count)
            if (profileData.followers >= 10) {
                badges.push({
                    id: "popular-developer",
                    name: "Popular Developer",
                    description: `${profileData.followers} followers`,
                    tier: profileData.followers >= 100 ? "gold" : profileData.followers >= 50 ? "silver" : "bronze",
                    icon: "👥",
                    color: "from-pink-400 to-red-400",
                })
            }

            return badges
        }

        const profileBadges = generateRealProfileBadges(profile)

        const result = {
            profile,
            achievements: realAchievements,
            profileBadges,
            stats: {
                totalAchievements: realAchievements.length,
                totalBadges: profileBadges.length,
                joinYear: new Date(profile.created_at).getFullYear(),
                yearsActive: new Date().getFullYear() - new Date(profile.created_at).getFullYear(),
                realDataFetched: true, // Flag to indicate this is real data
                mockAchievements: !userData?.achievements?.nodes?.length, // Flag for mock achievements
            },
        }

        console.log("✅ REAL profile data compiled successfully")
        console.log(`🎭 Using ${result.stats.mockAchievements ? "MOCK" : "REAL"} achievements`)
        return NextResponse.json(result)
    } catch (error) {
        console.error("❌ GitHub profile API error:", error)

        return NextResponse.json(
            {
                error: "Failed to fetch real GitHub profile",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        )
    }
}
