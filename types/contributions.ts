export interface ContributionDay {
    date: string
    contributionCount: number
    color: string
}

export interface ContributionWeek {
    contributionDays: ContributionDay[]
}

export interface ContributionCalendar {
    totalContributions: number
    weeks: ContributionWeek[]
}

export interface GitHubStats {
    totalCommits: number
    totalPRs: number
    totalIssues: number
    totalStars: number
    totalForks: number
    contributionCalendar: ContributionCalendar
}
