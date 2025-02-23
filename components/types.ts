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
    id: number
    createdAt: number
    status: string
    progress: number
    media: {
        id: number
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

export type FavoriteEntry = {
    id: number
    title: {
        userPreferred: string
    }
    coverImage: {
        medium: string
    }
}
