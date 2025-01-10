'use client'

import { useState, useEffect, SetStateAction} from 'react'
import {Card} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Progress} from "@/components/ui/progress"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ChevronLeft, Trophy, Clock, Star, GamepadIcon, Calendar, BarChart2, Search, Filter} from 'lucide-react'
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import Image from 'next/image'
import {motion, AnimatePresence} from 'framer-motion'

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
        description: "Tom Clancy's Rainbow Six® Siege is an elite, tactical team-based shooter where superior planning and execution triumph.",
        platform: "PC"
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
        description: "The only aim in Rust is to survive. Everything wants you to die - the island’s wildlife, other inhabitants, the environment, and other survivors. Do whatever it takes to last another night.",
        platform: "PC"
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
        description: "Explore the Lands Between and uncover the mysteries of the Elden Ring in this challenging action RPG.",
        platform: "PC"
    },
    {
        id: 4,
        title: "Fornite",
        image: "/fortnite.jpg",
        playtime: 3253,
        achievements: 0,
        totalAchievements: 0,
        lastPlayed: "2025-01-08",
        tags: ["Action", "Shooter", "Competitive", "Multiplayer"],
        description: "Create, play, and battle with friends for free in Fortnite. Be the last player standing in Battle Royale and Zero Build, experience a concert or live event, or discover over a million creator made games, including racing, parkour, zombie survival, and more.",
        platform: "PC"
    },
    {
        id: 5,
        title: "Ghostwire: Tokyo",
        image: "/tokyo.avif",
        playtime: 443,
        achievements: 66,
        totalAchievements: 66,
        lastPlayed: "2025-01-08",
        tags: ["Action", "Action-Adventure", "Adventure"],
        description: "Tokyo's population has vanished and deadly supernatural forces prowl the streets. Hone your otherwordly abilities to unravel the truth behind the disappearance and save the city.",
        platform: "PC"
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
        description: "Phasmophobia is a 4 player online co-op psychological horror. Paranormal activity is on the rise and it’s up to you and your team to use all the ghost-hunting equipment at your disposal in order to gather as much evidence as you can.",
        platform: "PC"
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
        description: "The Galaxy’s Last Line of Offence. Enlist in the Helldivers and join the fight for freedom across a hostile galaxy in a fast, frantic, and ferocious third-person shooter.",
        platform: "PC"
    }
]

export default function GamesPage() {
    const [selectedGame, setSelectedGame] = useState(games[0])
    const [animateStats, setAnimateStats] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterPlatform, setFilterPlatform] = useState('All')
    const [sortBy, setSortBy] = useState('lastPlayed')

    useEffect(() => {
        setAnimateStats(true)
    }, [])

    const filteredGames = games
        .filter(game => game.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(game => filterPlatform === 'All' || game.platform === filterPlatform)
        .sort((a, b) => {
            if (sortBy === 'lastPlayed') return new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime()
            if (sortBy === 'playtime') return b.playtime - a.playtime
            if (sortBy === 'achievements') return (b.achievements / b.totalAchievements) - (a.achievements / a.totalAchievements)
            return 0
        })

    return (
        <div className="py-12">
            <div className="mb-8 flex items-center gap-2">
                <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                    <ChevronLeft className="h-4 w-4"/>
                </Link>
                <span className="text-purple-200/50">back to home</span>
            </div>

            <motion.h1
                className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                Game Library
            </motion.h1>

            <Tabs defaultValue="library" className="space-y-8">
                <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-purple-900/20">
                    <TabsTrigger value="library">Library</TabsTrigger>
                    <TabsTrigger value="stats">Stats</TabsTrigger>
                </TabsList>

                <TabsContent value="library" className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-grow">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-purple-200/50"/>
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
                                <DropdownMenuItem onClick={() => setFilterPlatform('All')}>All</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterPlatform('PC')}>PC</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterPlatform('PlayStation 5')}>PlayStation 5</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setFilterPlatform('Nintendo Switch')}>Nintendo Switch</DropdownMenuItem>
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
                                <DropdownMenuItem onClick={() => setSortBy('lastPlayed')}>Last Played</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy('playtime')}>Playtime</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortBy('achievements')}>Achievements</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <motion.div
                        className="grid gap-6 md:grid-cols-2"
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
                                <Card
                                    className="overflow-hidden bg-black/50 border border-purple-900/20 cursor-pointer transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
                                    onClick={() => setSelectedGame(game)}
                                >
                                    <div className="relative h-40">
                                        <Image
                                            src={game.image}
                                            alt={game.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="transition-transform duration-300 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                                            <h2 className="text-xl font-semibold text-white">{game.title}</h2>
                                            <Badge variant="outline" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                                                {game.platform}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-4">
                                        <div className="flex items-center justify-between text-sm text-purple-200/70">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                <span>{game.playtime} hours</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Trophy className="h-4 w-4" />
                                                <span>{game.achievements}/{game.totalAchievements}</span>
                                            </div>
                                        </div>
                                        <Progress
                                            value={(game.achievements / game.totalAchievements) * 100}
                                            className="h-2 bg-purple-900/20"
                                        />
                                        <div className="flex flex-wrap gap-2">
                                            {game.tags.map((tag, index) => (
                                                <Badge key={index} variant="outline" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="text-purple-200/50">
                                                Last played: {new Date(game.lastPlayed).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-1 text-yellow-400">
                                                <Star className="h-4 w-4 fill-current" />
                                                <span>{((game.achievements / game.totalAchievements) * 5).toFixed(1)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

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
                                    <h2 className="text-2xl font-bold text-purple-200 mb-4">{selectedGame.title}</h2>
                                    <p className="text-purple-200/70 mb-4">{selectedGame.description}</p>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-purple-200/70">
                                        <div className="flex items-center gap-2">
                                            <GamepadIcon className="h-4 w-4 text-purple-400" />
                                            <span>Platform: {selectedGame.platform}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-purple-400" />
                                            <span>Last Played: {new Date(selectedGame.lastPlayed).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </TabsContent>

                <TabsContent value="stats" className="space-y-8">
                    <Card className="p-6 bg-black/50 border border-purple-900/20">
                        <h2 className="text-2xl font-bold text-purple-200 mb-4">Gaming Stats</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <motion.div
                                className="space-y-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <h3 className="text-lg font-semibold text-purple-200">Total Playtime</h3>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-6 w-6 text-purple-400" />
                                    <p className="text-3xl font-bold text-purple-400">
                                        {games.reduce((total, game) => total + game.playtime, 0)} hours
                                    </p>
                                </div>
                            </motion.div>
                            <motion.div
                                className="space-y-2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <h3 className="text-lg font-semibold text-purple-200">Total Achievements</h3>
                                <div className="flex items-center gap-2">
                                    <Trophy className="h-6 w-6 text-purple-400" />
                                    <p className="text-3xl font-bold text-purple-400">
                                        {games.reduce((total, game) => total + game.achievements, 0)} /
                                        {games.reduce((total, game) => total + game.totalAchievements, 0)}
                                    </p>
                                </div>
                            </motion.div>
                            <motion.div
                                className="space-y-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <h3 className="text-lg font-semibold text-purple-200">Favorite Genre</h3>
                                <div className="flex items-center gap-2">
                                    <GamepadIcon className="h-6 w-6 text-purple-400" />
                                    <p className="text-3xl font-bold text-purple-400">
                                        {(() => {
                                            const allTags = games.flatMap(game => game.tags)
                                            const tagCounts = allTags.reduce((acc: Record<string, number>, tag) => {
                                                acc[tag] = (acc[tag] || 0) + 1
                                                return acc
                                            }, {})
                                            return Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0][0]
                                        })()}
                                    </p>
                                </div>
                            </motion.div>
                            <motion.div
                                className="space-y-2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <h3 className="text-lg font-semibold text-purple-200">Most Played Game</h3>
                                <div className="flex items-center gap-2">
                                    <Star className="h-6 w-6 text-purple-400" />
                                    <p className="text-3xl font-bold text-purple-400">
                                        {games.reduce((max, game) => game.playtime > max.playtime ? game : max).title}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </Card>
                    <Card className="p-6 bg-black/50 border border-purple-900/20">
                        <h2 className="text-2xl font-bold text-purple-200 mb-4">Playtime Distribution</h2>
                        <div className="h-64 flex items-end justify-between gap-2">
                            {games.map((game, index) => (
                                <motion.div
                                    key={game.id}
                                    className="relative flex-1 bg-purple-500/20 rounded-t"
                                    initial={{ height: 0 }}
                                    animate={{ height: animateStats ? `${(game.playtime / Math.max(...games.map(g => g.playtime))) * 100}%` : 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="absolute bottom-0 left-0 right-0 p-2 text-center text-xs text-purple-200 truncate">
                                        {game.title}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

