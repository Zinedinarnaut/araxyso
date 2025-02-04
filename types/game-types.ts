import type React from "react"

export interface Game {
    id: number
    title: string
    image: string
    video?: string
    playtime: number
    achievements: number
    totalAchievements: number
    lastPlayed: string
    tags: string[]
    description: string
    platform: string
}

export interface ValorantStats {
    puuid: string
    region: string
    account_level: number
    name: string
    tag: string
    card: string
    title: string
    platforms: string[]
    updated_at: string
    mmr_history?: MMRHistoryEntry[]
}

export interface MMRHistoryEntry {
    currenttier: number
    currenttier_patched: string
    images: {
        small: string
        large: string
        triangle_down: string
        triangle_up: string
    }
    match_id: string
    map: {
        name: string
        id: string
    }
    season_id: string
    ranking_in_tier: number
    mmr_change_to_last_game: number
    elo: number
    date: string
    date_raw: number
}

export interface StatCardProps {
    title: string
    value: string | number | undefined
    icon: React.ElementType
}

