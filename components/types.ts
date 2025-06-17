export interface UserData {
    id: number
    name: string
    avatar: {
        medium: string
        large: string
    }
    bannerImage?: string
    statistics: {
        anime: {
            count: number
            minutesWatched: number
        }
        manga: {
            count: number
            chaptersRead: number
        }
    }
    createdAt: number
}

export interface ActivityEntry {
    id: number
    createdAt: number
    status: string
    progress: string
    media: {
        id: number
        title: {
            userPreferred: string
        }
        type: "ANIME" | "MANGA"
        bannerImage?: string
        coverImage: {
            medium: string
            large: string
        }
        averageScore?: number
        genres: string[]
    }
}

export interface FavoriteEntry {
    id: number
    title: {
        userPreferred: string
    }
    coverImage: {
        medium: string
        large: string
    }
    bannerImage?: string
    averageScore?: number
    genres: string[]
}

export interface Stats {
    anime: MediaStats
    manga: MediaStats
}

export interface MediaStats {
    count: number
    episodesWatched?: number
    chaptersRead?: number
    volumesRead?: number
    minutesWatched?: number
    meanScore: number
    standardDeviation: number
}
