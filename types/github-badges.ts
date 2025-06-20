export interface GitHubBadge {
    id: string
    name: string
    description: string
    tier: string
    badge_url: string
    created_at: string
}

export interface GitHubAchievement {
    achievement: {
        id: string
        node_id: string
        name: string
        description: string
        body: string
        created_at: string
        updated_at: string
        badge_url: string
    }
    tier: string
}

export interface GitHubProfile {
    login: string
    name: string
    bio: string
    public_repos: number
    followers: number
    following: number
    created_at: string
    updated_at: string
    achievements?: GitHubAchievement[]
    badges?: GitHubBadge[]
}
