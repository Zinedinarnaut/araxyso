export interface GameCheat {
    id: string
    name: string
    game: string
    description: string
    status: 'Undetected' | 'Detected' | 'Updating' | 'Discontinued' | "Coming Soon"
    features: string[]
    lastUpdated: string
    language: string
    technicalDetails: string
    usageGuide: string
    credits: string
}

