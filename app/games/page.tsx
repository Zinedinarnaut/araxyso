"use client"

import { useState, useEffect, type SetStateAction } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ChevronLeft,
    Trophy,
    Clock,
    Star,
    GamepadIcon,
    Calendar,
    BarChart2,
    Search,
    Filter,
    Info,
    Layers,
    Award,
    Heart,
    Zap,
    Cpu,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

// Mock data for games
const games = [
    {
        id: 1,
        title: "Rainbow Six Siege",
        image: "/r6.jpg",
        playtime: 668.3,
        achievements: 0,
        totalAchievements: 0,
        lastPlayed: "2025-01-08",
        tags: ["FPS", "PvP", "eSports", "Multiplayer", "Shooter", "3D"],
        description:
            "Tom Clancy's Rainbow Six® Siege is an elite, tactical team-based shooter where superior planning and execution triumph.",
        platform: "PC",
        releaseDate: "2015-12-01",
        developer: "Ubisoft Montreal",
        publisher: "Ubisoft",
        playerCount: "Online Multiplayer",
        rating: 4.2,
    },
    {
        id: 2,
        title: "Rust",
        image: "/rust.jpg",
        playtime: 745,
        achievements: 92,
        totalAchievements: 92,
        lastPlayed: "2025-01-08",
        tags: ["Survival", "Crafting", "Multiplayer", "Open World"],
        description:
            "The only aim in Rust is to survive. Everything wants you to die - the island's wildlife, other inhabitants, the environment, and other survivors. Do whatever it takes to last another night.",
        platform: "PC",
        releaseDate: "2018-02-08",
        developer: "Facepunch Studios",
        publisher: "Facepunch Studios",
        playerCount: "Online Multiplayer",
        rating: 4.5,
    },
    {
        id: 3,
        title: "Call of Duty Black Ops III",
        image: "/blackops.jpg",
        playtime: 821,
        achievements: 20,
        totalAchievements: 98,
        lastPlayed: "2025-01-08",
        tags: ["Multiplayer", "Zombies", "FPS", "Shooter", "Action"],
        description:
            "Call of Duty: Black Ops III combines three unique game modes: Campaign, Multiplayer, and Zombies, providing fans with the deepest and most ambitious Call of Duty ever.",
        platform: "PC",
        releaseDate: "2015-11-06",
        developer: "Treyarch",
        publisher: "Activision",
        playerCount: "Online Multiplayer, Single-player",
        rating: 4.0,
    },
    {
        id: 4,
        title: "Fortnite",
        image: "/fortnite.jpg",
        playtime: 3253,
        achievements: 0,
        totalAchievements: 0,
        lastPlayed: "2025-01-08",
        tags: ["Action", "Shooter", "Competitive", "Multiplayer"],
        description:
            "Create, play, and battle with friends for free in Fortnite. Be the last player standing in Battle Royale and Zero Build, experience a concert or live event, or discover over a million creator made games, including racing, parkour, zombie survival, and more.",
        platform: "PC",
        releaseDate: "2017-07-25",
        developer: "Epic Games",
        publisher: "Epic Games",
        playerCount: "Online Multiplayer",
        rating: 4.3,
    },
    {
        id: 5,
        title: "Ghostwire: Tokyo",
        image: "/tokyo.avif",
        playtime: 540,
        achievements: 66,
        totalAchievements: 66,
        lastPlayed: "2025-02-04",
        tags: ["Action", "Action-Adventure", "Adventure"],
        description:
            "Tokyo's population has vanished and deadly supernatural forces prowl the streets. Hone your otherwordly abilities to unravel the truth behind the disappearance and save the city.",
        platform: "PC",
        releaseDate: "2022-03-25",
        developer: "Tango Gameworks",
        publisher: "Bethesda Softworks",
        playerCount: "Single-player",
        rating: 4.1,
    },
    {
        id: 6,
        title: "Phasmophobia",
        image: "/phas.jpg",
        playtime: 1542,
        achievements: 54,
        totalAchievements: 54,
        lastPlayed: "2025-01-08",
        tags: ["Horror", "Online Co-Op", "VR", "Multiplayer", "Co-Op"],
        description:
            "Phasmophobia is a 4 player online co-op psychological horror. Paranormal activity is on the rise and it's up to you and your team to use all the ghost-hunting equipment at your disposal in order to gather as much evidence as you can.",
        platform: "PC",
        releaseDate: "2020-09-18",
        developer: "Kinetic Games",
        publisher: "Kinetic Games",
        playerCount: "Online Co-op, 1-4 players",
        rating: 4.7,
    },
    {
        id: 7,
        title: "Helldivers 2",
        image: "/helldivers.jpg",
        video: "/movie480_vp9.webm",
        playtime: 2532,
        achievements: 31,
        totalAchievements: 38,
        lastPlayed: "2025-01-08",
        tags: ["Action", "Online Co-Op", "PvE", "Multiplayer", "Co-Op"],
        description:
            "The Galaxy's Last Line of Offence. Enlist in the Helldivers and join the fight for freedom across a hostile galaxy in a fast, frantic, and ferocious third-person shooter.",
        platform: "PC",
        releaseDate: "2024-02-08",
        developer: "Arrowhead Game Studios",
        publisher: "Sony Interactive Entertainment",
        playerCount: "Online Co-op, 1-4 players",
        rating: 4.8,
    },
    {
        id: 8,
        title: "Ready Or Not",
        image: "/ready.jpg",
        video: "/movie480_vp9.webm",
        playtime: 565,
        achievements: 3,
        totalAchievements: 33,
        lastPlayed: "2025-01-19",
        tags: ["Action", "Online Co-Op", "PvE", "Multiplayer", "Co-Op"],
        description:
            "Ready or Not is an intense, tactical, first-person shooter that depicts a modern-day world in which SWAT police units are called to defuse hostile and confronting situations.",
        platform: "PC",
        releaseDate: "2021-12-17",
        developer: "VOID Interactive",
        publisher: "VOID Interactive",
        playerCount: "Online Co-op, 1-5 players",
        rating: 4.6,
    },
    {
        id: 9,
        title: "Sons of the Forest",
        image: "/sons.jpg",
        video: "/movie480_vp9.webm",
        playtime: 1341,
        achievements: 32,
        totalAchievements: 32,
        lastPlayed: "2025-01-19",
        tags: ["Survival", "Online Co-Op", "PvE", "Multiplayer", "Co-Op", "Open World"],
        description:
            "Sent to find a missing billionaire on a remote island, you find yourself in a cannibal-infested hellscape. Craft, build, and struggle to survive, alone or with friends, in this terrifying new open-world survival horror simulator.",
        platform: "PC",
        releaseDate: "2023-02-23",
        developer: "Endnight Games Ltd",
        publisher: "Newnight",
        playerCount: "Online Co-op, 1-8 players",
        rating: 4.4,
    },
    {
        id: 10,
        title: "Valorant",
        image: "/V_Logotype_Red.png",
        video: "/movie480_vp9.webm",
        playtime: 1531,
        achievements: 0,
        totalAchievements: 0,
        lastPlayed: "2025-02-04",
        tags: ["Multiplayer", "First Person Shooter"],
        description:
            "Blend your style and experience on a global, competitive stage. You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities. And, with one life per-round, you'll need to think faster than your opponent if you want to survive. Take on foes across Competitive and Unranked modes as well as Deathmatch and Spike Rush.",
        platform: "PC",
        releaseDate: "2020-06-02",
        developer: "Riot Games",
        publisher: "Riot Games",
        playerCount: "Online Multiplayer, 5v5",
        rating: 4.5,
    },
]

// Calculate total stats
const totalPlaytime = games.reduce((total, game) => total + game.playtime, 0)
const totalAchievements = games.reduce((total, game) => total + game.achievements, 0)
const maxTotalAchievements = games.reduce((total, game) => total + game.totalAchievements, 0)
const achievementPercentage = maxTotalAchievements > 0 ? (totalAchievements / maxTotalAchievements) * 100 : 0

// Get all unique tags and count them
const allTags = games.flatMap((game) => game.tags)
const tagCounts = allTags.reduce((acc: Record<string, number>, tag) => {
    acc[tag] = (acc[tag] || 0) + 1
    return acc
}, {})

// Sort tags by count
const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])

// Get most played game
const mostPlayedGame = games.reduce((max, game) => (game.playtime > max.playtime ? game : max))

export default function GamesPage() {
    const [selectedGame, setSelectedGame] = useState(games[0])
    const [animateStats, setAnimateStats] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterPlatform, setFilterPlatform] = useState("All")
    const [sortBy, setSortBy] = useState("lastPlayed")
    const [showGameDetails, setShowGameDetails] = useState(false)
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

    useEffect(() => {
        setAnimateStats(true)
    }, [])

    const filteredGames = games
        .filter((game) => game.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((game) => filterPlatform === "All" || game.platform === filterPlatform)
        .filter((game) => !selectedTag || game.tags.includes(selectedTag))
        .sort((a, b) => {
            if (sortBy === "lastPlayed") return new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime()
            if (sortBy === "playtime") return b.playtime - a.playtime
            if (sortBy === "achievements")
                return b.achievements / (b.totalAchievements || 1) - a.achievements / (a.totalAchievements || 1)
            if (sortBy === "rating") return b.rating - a.rating
            return 0
        })

    // Calculate playtime distribution by genre
    const genrePlaytime: Record<string, number> = {}
    games.forEach((game) => {
        game.tags.forEach((tag) => {
            genrePlaytime[tag] = (genrePlaytime[tag] || 0) + game.playtime
        })
    })

    const sortedGenres = Object.entries(genrePlaytime)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-8 flex items-center gap-2">
                <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                </Link>
                <span className="text-purple-200/50">back to home</span>
            </div>

            <motion.div
                className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Game Library
                </h1>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-purple-900/20 px-4 py-2 rounded-md">
                        <Trophy className="h-5 w-5 text-yellow-400" />
                        <div>
                            <div className="text-sm text-purple-200/70">Achievement Progress</div>
                            <div className="text-lg font-bold text-purple-200">
                                {totalAchievements}/{maxTotalAchievements}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-purple-900/20 px-4 py-2 rounded-md">
                        <Clock className="h-5 w-5 text-purple-400" />
                        <div>
                            <div className="text-sm text-purple-200/70">Total Playtime</div>
                            <div className="text-lg font-bold text-purple-200">{totalPlaytime.toLocaleString()} hrs</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <Tabs defaultValue="library" className="space-y-8">
                <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-purple-900/20">
                    <TabsTrigger value="library">Library</TabsTrigger>
                    <TabsTrigger value="stats">Stats</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                <TabsContent value="library" className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-grow">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-purple-200/50" />
                            <Input
                                type="text"
                                placeholder="Search games..."
                                className="pl-8 bg-black/50 border-purple-900/20 text-purple-200"
                                value={searchTerm}
                                onChange={(e: { target: { value: SetStateAction<string> } }) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="bg-black/50 border-purple-900/20 text-purple-200">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filter: {filterPlatform}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-black/90 border-purple-900/20">
                                <DropdownMenuItem onClick={() => setFilterPlatform("All")}>All</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterPlatform("PC")}>PC</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterPlatform("PlayStation 5")}>PlayStation 5</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterPlatform("Nintendo Switch")}>
                                    Nintendo Switch
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="bg-black/50 border-purple-900/20 text-purple-200">
                                    <BarChart2 className="mr-2 h-4 w-4" />
                                    Sort By
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-black/90 border-purple-900/20">
                                <DropdownMenuItem onClick={() => setSortBy("lastPlayed")}>Last Played</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy("playtime")}>Playtime</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy("achievements")}>Achievements</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy("rating")}>Rating</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Popular Tags */}
                    <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-sm text-purple-200/70 mr-2">Popular Tags:</span>
                        {sortedTags.slice(0, 8).map(([tag, count]) => (
                            <Badge
                                key={tag}
                                variant="outline"
                                className={`bg-purple-500/20 text-purple-200 border-purple-500/30 cursor-pointer ${
                                    selectedTag === tag ? "bg-purple-500/50" : ""
                                }`}
                                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                            >
                                {tag} ({count})
                            </Badge>
                        ))}
                        {selectedTag && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-purple-300 hover:text-purple-200 h-6 px-2"
                                onClick={() => setSelectedTag(null)}
                            >
                                Clear filter
                            </Button>
                        )}
                    </div>

                    <motion.div
                        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, staggerChildren: 0.1 }}
                    >
                        {filteredGames.map((game) => (
                            <motion.div
                                key={game.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card className="overflow-hidden bg-black/50 border border-purple-900/20 transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 h-full flex flex-col">
                                    <div className="relative h-48">
                                        <Image
                                            src={game.image || "/placeholder.svg"}
                                            alt={game.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="transition-transform duration-300 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <div className="flex justify-between items-end">
                                                <h2 className="text-xl font-semibold text-white line-clamp-1">{game.title}</h2>
                                                <Badge variant="outline" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                                                    {game.platform}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-4 flex-grow flex flex-col">
                                        <div className="flex items-center justify-between text-sm text-purple-200/70">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                <span>{game.playtime} hrs</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Trophy className="h-4 w-4" />
                                                <span>
                          {game.achievements}/{game.totalAchievements}
                        </span>
                                            </div>
                                        </div>
                                        <Progress
                                            value={game.totalAchievements > 0 ? (game.achievements / game.totalAchievements) * 100 : 0}
                                            className="h-2 bg-purple-900/20"
                                        />
                                        <div className="flex flex-wrap gap-2 flex-grow">
                                            {game.tags.slice(0, 3).map((tag, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="outline"
                                                    className="bg-purple-500/20 text-purple-200 border-purple-500/30"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {game.tags.length > 3 && (
                                                <Badge variant="outline" className="bg-purple-500/10 text-purple-200/70 border-purple-500/20">
                                                    +{game.tags.length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-sm mt-auto">
                                            <div className="text-purple-200/50">
                                                Last played: {new Date(game.lastPlayed).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-1 text-yellow-400">
                                                <Star className="h-4 w-4 fill-current" />
                                                <span>{game.rating.toFixed(1)}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between gap-2 pt-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="bg-purple-500/20 border-purple-500/30 hover:bg-purple-500/30 text-purple-200 flex-1"
                                                onClick={() => {
                                                    setSelectedGame(game)
                                                    setShowGameDetails(true)
                                                }}
                                            >
                                                <Info className="h-4 w-4 mr-2" />
                                                Details
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {filteredGames.length === 0 && (
                        <Card className="p-8 bg-black/50 border border-purple-900/20 text-center">
                            <GamepadIcon className="h-12 w-12 text-purple-400/50 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-purple-200 mb-2">No games found</h3>
                            <p className="text-purple-200/70">
                                Try adjusting your search or filters to find what you&#39;re looking for.
                            </p>
                        </Card>
                    )}

                    <AnimatePresence mode="wait">
                        {selectedGame && (
                            <motion.div
                                key={selectedGame.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="p-6 bg-black/50 border border-purple-900/20">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="md:w-1/3 relative h-48 md:h-auto rounded-md overflow-hidden">
                                            <Image
                                                src={selectedGame.image || "/placeholder.svg"}
                                                alt={selectedGame.title}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-md"
                                            />
                                        </div>
                                        <div className="md:w-2/3">
                                            <h2 className="text-2xl font-bold text-purple-200 mb-2">{selectedGame.title}</h2>
                                            <p className="text-purple-200/70 mb-4">{selectedGame.description}</p>
                                            <div className="grid grid-cols-2 gap-4 text-sm text-purple-200/70 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <GamepadIcon className="h-4 w-4 text-purple-400" />
                                                    <span>Platform: {selectedGame.platform}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-purple-400" />
                                                    <span>Last Played: {new Date(selectedGame.lastPlayed).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-purple-400" />
                                                    <span>Playtime: {selectedGame.playtime} hours</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Trophy className="h-4 w-4 text-purple-400" />
                                                    <span>
                            Achievements: {selectedGame.achievements}/{selectedGame.totalAchievements}
                          </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {selectedGame.tags.map((tag, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="outline"
                                                        className="bg-purple-500/20 text-purple-200 border-purple-500/30"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="flex gap-3">
                                                <Button
                                                    variant="outline"
                                                    className="bg-purple-500/20 border-purple-500/30 hover:bg-purple-500/30 text-purple-200"
                                                    onClick={() => setShowGameDetails(true)}
                                                >
                                                    <Info className="h-4 w-4 mr-2" />
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </TabsContent>

                <TabsContent value="stats" className="space-y-8">
                    {/* Summary Stats Card */}
                    <Card className="p-6 bg-black/50 border border-purple-900/20">
                        <h2 className="text-2xl font-bold text-purple-200 mb-6">Gaming Overview</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <motion.div
                                className="space-y-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <h3 className="text-lg font-semibold text-purple-200">Total Playtime</h3>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-6 w-6 text-purple-400" />
                                    <p className="text-3xl font-bold text-purple-400">{totalPlaytime.toLocaleString()} hrs</p>
                                </div>
                            </motion.div>
                            <motion.div
                                className="space-y-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h3 className="text-lg font-semibold text-purple-200">Total Achievements</h3>
                                <div className="flex items-center gap-2">
                                    <Trophy className="h-6 w-6 text-purple-400" />
                                    <p className="text-3xl font-bold text-purple-400">
                                        {totalAchievements}/{maxTotalAchievements}
                                    </p>
                                </div>
                            </motion.div>
                            <motion.div
                                className="space-y-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <h3 className="text-lg font-semibold text-purple-200">Favorite Genre</h3>
                                <div className="flex items-center gap-2">
                                    <GamepadIcon className="h-6 w-6 text-purple-400" />
                                    <p className="text-3xl font-bold text-purple-400">{sortedTags[0][0]}</p>
                                </div>
                            </motion.div>
                            <motion.div
                                className="space-y-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <h3 className="text-lg font-semibold text-purple-200">Most Played</h3>
                                <div className="flex items-center gap-2">
                                    <Star className="h-6 w-6 text-purple-400" />
                                    <p className="text-3xl font-bold text-purple-400 truncate">{mostPlayedGame.title}</p>
                                </div>
                            </motion.div>
                        </div>
                    </Card>

                    {/* Playtime Distribution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6 bg-black/50 border border-purple-900/20">
                            <h2 className="text-xl font-bold text-purple-200 mb-4">Playtime Distribution</h2>
                            <div className="h-64 flex items-end justify-between gap-1">
                                {games
                                    .sort((a, b) => b.playtime - a.playtime)
                                    .slice(0, 10)
                                    .map((game, index) => (
                                        <motion.div
                                            key={game.id}
                                            className="relative flex-1 bg-gradient-to-t from-purple-500/50 to-pink-500/50 rounded-t group cursor-pointer"
                                            initial={{ height: 0 }}
                                            animate={{
                                                height: animateStats
                                                    ? `${(game.playtime / Math.max(...games.map((g) => g.playtime))) * 100}%`
                                                    : 0,
                                            }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            onClick={() => {
                                                setSelectedGame(game)
                                                setShowGameDetails(true)
                                            }}
                                        >
                                            <div className="absolute bottom-0 left-0 right-0 p-1 text-center text-xs text-purple-200 truncate rotate-90 origin-bottom-left translate-y-full translate-x-2 opacity-70 group-hover:opacity-100">
                                                {game.title}
                                            </div>
                                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs text-purple-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                                {game.playtime} hrs
                                            </div>
                                        </motion.div>
                                    ))}
                            </div>
                            <div className="mt-10 text-xs text-purple-200/50 text-center">Games by playtime (hours)</div>
                        </Card>

                        <Card className="p-6 bg-black/50 border border-purple-900/20">
                            <h2 className="text-xl font-bold text-purple-200 mb-4">Genre Distribution</h2>
                            <div className="space-y-4">
                                {sortedGenres.map(([genre, hours], index) => (
                                    <motion.div
                                        key={genre}
                                        className="space-y-1"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <div className="flex justify-between text-sm">
                                            <span className="text-purple-200">{genre}</span>
                                            <span className="text-purple-200/70">{hours} hrs</span>
                                        </div>
                                        <div className="h-2 bg-purple-900/20 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{
                                                    width: animateStats
                                                        ? `${(hours / Object.values(genrePlaytime).reduce((a, b) => a + b, 0)) * 100}%`
                                                        : 0,
                                                }}
                                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                            ></motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Gaming Activity */}
                    <Card className="p-6 bg-black/50 border border-purple-900/20">
                        <h2 className="text-xl font-bold text-purple-200 mb-4">Gaming Activity</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold text-purple-200 mb-3">Recently Played</h3>
                                <div className="space-y-3">
                                    {games
                                        .sort((a, b) => new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime())
                                        .slice(0, 5)
                                        .map((game, index) => (
                                            <motion.div
                                                key={game.id}
                                                className="flex items-center gap-3 p-2 bg-purple-900/10 rounded-md hover:bg-purple-900/20 transition-colors cursor-pointer"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                                onClick={() => {
                                                    setSelectedGame(game)
                                                    setShowGameDetails(true)
                                                }}
                                            >
                                                <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={game.image || "/placeholder.svg"}
                                                        alt={game.title}
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="text-purple-200 font-medium">{game.title}</p>
                                                    <p className="text-xs text-purple-200/50">
                                                        Last played: {new Date(game.lastPlayed).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="text-purple-200/70 text-sm">{game.playtime} hrs</div>
                                            </motion.div>
                                        ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-purple-200 mb-3">Achievement Progress</h3>
                                <div className="space-y-3">
                                    {games
                                        .filter((game) => game.totalAchievements > 0)
                                        .sort((a, b) => b.achievements / b.totalAchievements - a.achievements / a.totalAchievements)
                                        .slice(0, 5)
                                        .map((game, index) => (
                                            <motion.div
                                                key={game.id}
                                                className="p-2 bg-purple-900/10 rounded-md hover:bg-purple-900/20 transition-colors cursor-pointer"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                                onClick={() => {
                                                    setSelectedGame(game)
                                                    setShowGameDetails(true)
                                                }}
                                            >
                                                <div className="flex justify-between items-center mb-1">
                                                    <p className="text-purple-200 font-medium">{game.title}</p>
                                                    <p className="text-xs text-purple-200/70">
                                                        {game.achievements}/{game.totalAchievements}
                                                    </p>
                                                </div>
                                                <Progress
                                                    value={(game.achievements / game.totalAchievements) * 100}
                                                    className="h-2 bg-purple-900/20"
                                                />
                                            </motion.div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-8">
                    <Card className="p-6 bg-black/50 border border-purple-900/20">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-purple-200">Achievement Showcase</h2>
                            <div className="flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-yellow-400" />
                                <div className="text-lg font-bold text-purple-200">
                                    {totalAchievements}/{maxTotalAchievements}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-purple-200">Overall Completion</span>
                                <span className="text-purple-200/70">{achievementPercentage.toFixed(1)}%</span>
                            </div>
                            <Progress value={achievementPercentage} className="h-3 bg-purple-900/20" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold text-purple-200 mb-3 flex items-center gap-2">
                                    <Award className="h-5 w-5 text-purple-400" />
                                    Top Achievements
                                </h3>
                                <div className="space-y-4">
                                    {games
                                        .filter((game) => game.achievements > 0)
                                        .sort((a, b) => b.achievements - a.achievements)
                                        .slice(0, 5)
                                        .map((game, index) => (
                                            <motion.div
                                                key={game.id}
                                                className="flex items-center gap-3 p-3 bg-purple-900/10 rounded-md hover:bg-purple-900/20 transition-colors cursor-pointer"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                                onClick={() => {
                                                    setSelectedGame(game)
                                                    setShowGameDetails(true)
                                                }}
                                            >
                                                <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={game.image || "/placeholder.svg"}
                                                        alt={game.title}
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="text-purple-200 font-medium">{game.title}</p>
                                                    <div className="flex items-center gap-2 text-xs text-purple-200/50">
                                                        <Trophy className="h-3 w-3 text-yellow-400" />
                                                        <span>
                              {game.achievements}/{game.totalAchievements} achievements
                            </span>
                                                    </div>
                                                </div>
                                                <div className="text-purple-200/70 text-sm">
                                                    {((game.achievements / game.totalAchievements) * 100).toFixed(0)}%
                                                </div>
                                            </motion.div>
                                        ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-purple-200 mb-3 flex items-center gap-2">
                                    <Heart className="h-5 w-5 text-purple-400" />
                                    Completionist Status
                                </h3>
                                <div className="space-y-4">
                                    {games
                                        .filter((game) => game.totalAchievements > 0)
                                        .sort((a, b) => b.achievements / b.totalAchievements - a.achievements / a.totalAchievements)
                                        .slice(0, 5)
                                        .map((game, index) => {
                                            const percentage = (game.achievements / game.totalAchievements) * 100
                                            let status = "Just Started"
                                            let statusColor = "text-blue-400"

                                            if (percentage === 100) {
                                                status = "Completed"
                                                statusColor = "text-green-400"
                                            } else if (percentage >= 75) {
                                                status = "Almost There"
                                                statusColor = "text-yellow-400"
                                            } else if (percentage >= 50) {
                                                status = "Halfway"
                                                statusColor = "text-orange-400"
                                            } else if (percentage >= 25) {
                                                status = "In Progress"
                                                statusColor = "text-purple-400"
                                            }

                                            return (
                                                <motion.div
                                                    key={game.id}
                                                    className="p-3 bg-purple-900/10 rounded-md hover:bg-purple-900/20 transition-colors cursor-pointer"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                                    onClick={() => {
                                                        setSelectedGame(game)
                                                        setShowGameDetails(true)
                                                    }}
                                                >
                                                    <div className="flex justify-between items-center mb-1">
                                                        <p className="text-purple-200 font-medium">{game.title}</p>
                                                        <Badge
                                                            variant="outline"
                                                            className={`${statusColor} border-${statusColor.replace("text-", "border-")}/30`}
                                                        >
                                                            {status}
                                                        </Badge>
                                                    </div>
                                                    <Progress value={percentage} className="h-2 bg-purple-900/20 mb-2" />
                                                    <div className="flex justify-between text-xs text-purple-200/50">
                                                        <span>{game.achievements} unlocked</span>
                                                        <span>{game.totalAchievements - game.achievements} remaining</span>
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-black/50 border border-purple-900/20">
                        <h2 className="text-xl font-bold text-purple-200 mb-4">Achievement Milestones</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <motion.div
                                className="p-4 bg-purple-900/10 rounded-md text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center mx-auto mb-2">
                                    <Trophy className="h-6 w-6 text-yellow-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-purple-200">{totalAchievements}</h3>
                                <p className="text-sm text-purple-200/50">Total Achievements</p>
                            </motion.div>

                            <motion.div
                                className="p-4 bg-purple-900/10 rounded-md text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center mx-auto mb-2">
                                    <Zap className="h-6 w-6 text-purple-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-purple-200">
                                    {games.filter((g) => g.achievements === g.totalAchievements && g.totalAchievements > 0).length}
                                </h3>
                                <p className="text-sm text-purple-200/50">100% Completed</p>
                            </motion.div>

                            <motion.div
                                className="p-4 bg-purple-900/10 rounded-md text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center mx-auto mb-2">
                                    <Award className="h-6 w-6 text-purple-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-purple-200">
                                    {games.filter((g) => g.achievements > 0).length}
                                </h3>
                                <p className="text-sm text-purple-200/50">Games with Achievements</p>
                            </motion.div>

                            <motion.div
                                className="p-4 bg-purple-900/10 rounded-md text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.3 }}
                            >
                                <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center mx-auto mb-2">
                                    <Cpu className="h-6 w-6 text-purple-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-purple-200">{achievementPercentage.toFixed(1)}%</h3>
                                <p className="text-sm text-purple-200/50">Overall Completion</p>
                            </motion.div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Game Details Dialog */}
            <Dialog open={showGameDetails} onOpenChange={setShowGameDetails}>
                <DialogContent className="bg-black/90 border border-purple-900/30 text-purple-200 max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                            {selectedGame?.title}
                        </DialogTitle>
                        <DialogDescription className="text-purple-200/70">{selectedGame?.description}</DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <div className="relative h-48 md:h-64 rounded-md overflow-hidden mb-4">
                                <Image
                                    src={selectedGame?.image || "/placeholder.svg"}
                                    alt={selectedGame?.title || "Game"}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-md"
                                />
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-purple-200/70">Platform</span>
                                    <span className="text-purple-200">{selectedGame?.platform}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-purple-200/70">Release Date</span>
                                    <span className="text-purple-200">
                    {selectedGame?.releaseDate ? new Date(selectedGame.releaseDate).toLocaleDateString() : "Unknown"}
                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-purple-200/70">Developer</span>
                                    <span className="text-purple-200">{selectedGame?.developer || "Unknown"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-purple-200/70">Publisher</span>
                                    <span className="text-purple-200">{selectedGame?.publisher || "Unknown"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-purple-200/70">Player Mode</span>
                                    <span className="text-purple-200">{selectedGame?.playerCount || "Unknown"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-purple-200/70">Rating</span>
                                    <div className="flex items-center">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                        <span className="text-purple-200">{selectedGame?.rating.toFixed(1) || "N/A"}/5.0</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-purple-200 mb-2 flex items-center gap-2">
                                    <GamepadIcon className="h-5 w-5 text-purple-400" />
                                    Your Stats
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-purple-900/20 p-4 rounded-md">
                                        <div className="text-sm text-purple-200/70 mb-1">Playtime</div>
                                        <div className="text-2xl font-bold text-purple-200">{selectedGame?.playtime} hours</div>
                                    </div>
                                    <div className="bg-purple-900/20 p-4 rounded-md">
                                        <div className="text-sm text-purple-200/70 mb-1">Last Played</div>
                                        <div className="text-2xl font-bold text-purple-200">
                                            {selectedGame?.lastPlayed ? new Date(selectedGame.lastPlayed).toLocaleDateString() : "Never"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-purple-200 mb-2 flex items-center gap-2">
                                    <Trophy className="h-5 w-5 text-purple-400" />
                                    Achievements
                                </h3>
                                {selectedGame?.totalAchievements ? (
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-purple-200">Progress</span>
                                            <span className="text-purple-200/70">
                        {selectedGame.achievements}/{selectedGame.totalAchievements} (
                                                {((selectedGame.achievements / selectedGame.totalAchievements) * 100).toFixed(1)}%)
                      </span>
                                        </div>
                                        <Progress
                                            value={(selectedGame.achievements / selectedGame.totalAchievements) * 100}
                                            className="h-2 bg-purple-900/20"
                                        />
                                    </div>
                                ) : (
                                    <p className="text-purple-200/70">No achievements available for this game.</p>
                                )}
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-purple-200 mb-2 flex items-center gap-2">
                                    <Layers className="h-5 w-5 text-purple-400" />
                                    Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedGame?.tags.map((tag, index) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className="bg-purple-500/20 text-purple-200 border-purple-500/30"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
