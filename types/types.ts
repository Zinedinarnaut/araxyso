export type MediaStats = {
    count: number
    episodesWatched?: number
    chaptersRead?: number
    minutesWatched?: number
    volumesRead?: number
    meanScore: number
    standardDeviation: number
}

export type Stats = {
    anime: MediaStats
    manga: MediaStats
}

export type ActivityEntry = {
    createdAt: number
    status: string
    progress: number
    media: {
        title: {
            userPreferred: string
        }
        type: "ANIME" | "MANGA"
    }
}

export type UserData = {
    id: number
    name: string
    avatar: {
        medium: string
    }
}

export interface BlogPost {
    id: string
    title: string
    excerpt: string
    content: string
    author: string
    date: string
    tags: string[]
    headerImage: string
    contentImages: string[]
}

export interface PageProps {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

