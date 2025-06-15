"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ChevronLeft,
    Award,
    Calendar,
    Building2,
    Code2,
    Palette,
    Download,
    ExternalLink,
    Star,
    Shield,
    Eye,
    Sparkles,
    Trophy,
    Crown,
    Gem,
    Rocket,
    Target,
    Cpu,
    Layers,
    Briefcase,
    GraduationCap,
    CheckCircle,
    Clock,
    MapPin,
    FileText,
    Verified,
} from "lucide-react"
import Link from "next/link"

// Add proper type definition at the top
interface Certificate {
    id: number
    title: string
    issuer: string
    date: string
    level: string
    description: string
    skills: string[]
    credentialId: string
    image: string | null
    verified: boolean
    rarity: "legendary" | "epic" | "rare"
    category: string
    duration: string
    location: string
    instructor: string
    achievements: string[]
    recipient?: string
    authority?: string
    comingSoon?: boolean
}

// Certificate data
const certificates = {
    construction: [
        {
            id: 1,
            title: "Project Remediate: Safety standards at occupied sites",
            issuer: "Construct NSW",
            date: "2024-10-09",
            level: "Professional",
            description:
                "CPD Certificate focusing on safety standards and protocols for occupied construction sites under the Project Remediate program.",
            skills: ["Site Safety", "Occupied Site Management", "Safety Standards", "Risk Assessment", "CPD Compliance"],
            credentialId: "QWjSo8ChQ",
            image: "/certificates/construct-nsw-safety.jpeg",
            verified: true,
            rarity: "legendary",
            category: "Safety & Compliance",
            duration: "2 hours CPD",
            location: "Online",
            instructor: "NSW Building Commissioner",
            achievements: ["CPD Certified", "Safety Expert", "Compliance Specialist"],
            recipient: "Zinedin Arnaut",
            authority: "David Chandler OAM, NSW Building Commissioner",
        },
    ],
    coding: [
        {
            id: 2,
            title: "Coming Soon",
            issuer: "Various Providers",
            date: "2025-01-01",
            level: "Multiple Levels",
            description:
                "Exciting coding certifications are on the way! Stay tuned for updates on AWS, React, Node.js, and other cutting-edge technologies.",
            skills: ["JavaScript", "Python", "React", "Node.js", "Cloud Computing"],
            credentialId: "COMING-SOON",
            image: null,
            verified: false,
            rarity: "epic",
            category: "Web Development",
            duration: "TBD",
            location: "Online",
            instructor: "To Be Announced",
            achievements: ["In Progress"],
            comingSoon: true,
        },
    ],
    design: [
        {
            id: 3,
            title: "Coming Soon",
            issuer: "Various Providers",
            date: "2025-01-01",
            level: "Multiple Levels",
            description:
                "Amazing design certifications are in development! Expect certifications in UI/UX Design, Adobe Creative Suite, and modern design principles.",
            skills: ["UI/UX Design", "Adobe Photoshop", "Figma", "Design Systems", "Typography"],
            credentialId: "COMING-SOON",
            image: null,
            verified: false,
            rarity: "rare",
            category: "Digital Design",
            duration: "TBD",
            location: "Online",
            instructor: "To Be Announced",
            achievements: ["In Progress"],
            comingSoon: true,
        },
    ],
}

// Rarity configurations
const rarityConfig = {
    legendary: {
        color: "from-yellow-400 via-orange-500 to-red-500",
        glow: "shadow-yellow-500/50",
        border: "border-yellow-500/50",
        bg: "bg-gradient-to-br from-yellow-900/20 to-orange-900/20",
        icon: Crown,
        label: "Legendary",
    },
    epic: {
        color: "from-purple-400 via-pink-500 to-purple-600",
        glow: "shadow-purple-500/50",
        border: "border-purple-500/50",
        bg: "bg-gradient-to-br from-purple-900/20 to-pink-900/20",
        icon: Gem,
        label: "Epic",
    },
    rare: {
        color: "from-blue-400 via-cyan-500 to-blue-600",
        glow: "shadow-blue-500/50",
        border: "border-blue-500/50",
        bg: "bg-gradient-to-br from-blue-900/20 to-cyan-900/20",
        icon: Star,
        label: "Rare",
    },
}

// Category icons
const categoryIcons = {
    "Safety & Compliance": Shield,
    Management: Briefcase,
    "Equipment & Operations": Cpu,
    "Cloud Computing": Rocket,
    "Web Development": Code2,
    Cybersecurity: Shield,
    "Frontend Development": Layers,
    "Digital Design": Palette,
    "UX/UI Design": Target,
    "3D Design": Sparkles,
    "Graphic Design": Palette,
}

export default function CertificatesPage() {
    // Update state declarations
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
    const [activeTab, setActiveTab] = useState("construction")
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)
    const [showDetails, setShowDetails] = useState(false)
    const canvasRef = useRef(null)

    // Particle animation for background
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const particles = []
        const particleCount = 50

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
            })
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach((particle) => {
                particle.x += particle.vx
                particle.y += particle.vy

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`
                ctx.fill()
            })

            requestAnimationFrame(animate)
        }

        animate()

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const allCertificates = [...certificates.construction, ...certificates.coding, ...certificates.design]
    const totalCertificates = 1 // Only counting real certificates
    const legendaryCount = allCertificates.filter((cert) => cert.rarity === "legendary" && !cert.comingSoon).length
    const epicCount = allCertificates.filter((cert) => cert.rarity === "epic" && !cert.comingSoon).length
    const rareCount = allCertificates.filter((cert) => cert.rarity === "rare" && !cert.comingSoon).length

    const getCertificatesByTab = (tab) => {
        return certificates[tab] || []
    }

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-purple-200 relative overflow-hidden">
            {/* Animated Background */}
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-30" />

            {/* Background Effects */}
            <div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-black to-pink-900/10 pointer-events-none" />
            <div className="fixed inset-0 bg-[url('/grid.png')] bg-center opacity-10 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex items-center gap-2"
                >
                    <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                    <span className="text-purple-200/50">back to home</span>
                </motion.div>

                {/* Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
                        Certificate Vault
                    </h1>
                    <p className="text-xl text-purple-200/70 mb-8">
                        A collection of professional certifications across construction, coding, and design
                    </p>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-black/40 border border-purple-900/30 rounded-lg p-4 backdrop-blur-sm"
                        >
                            <div className="text-2xl font-bold text-purple-400">{totalCertificates}</div>
                            <div className="text-sm text-purple-200/70">Total Certificates</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-black/40 border border-yellow-500/30 rounded-lg p-4 backdrop-blur-sm"
                        >
                            <div className="text-2xl font-bold text-yellow-400">{legendaryCount}</div>
                            <div className="text-sm text-purple-200/70">Legendary</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="bg-black/40 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm"
                        >
                            <div className="text-2xl font-bold text-purple-400">{epicCount}</div>
                            <div className="text-sm text-purple-200/70">Epic</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="bg-black/40 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm"
                        >
                            <div className="text-2xl font-bold text-blue-400">{rareCount}</div>
                            <div className="text-sm text-purple-200/70">Rare</div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                    <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-purple-900/20 backdrop-blur-sm">
                        <TabsTrigger value="construction" className="data-[state=active]:bg-purple-900/30 flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Construction
                        </TabsTrigger>
                        <TabsTrigger value="coding" className="data-[state=active]:bg-purple-900/30 flex items-center gap-2">
                            <Code2 className="h-4 w-4" />
                            Coding
                        </TabsTrigger>
                        <TabsTrigger value="design" className="data-[state=active]:bg-purple-900/30 flex items-center gap-2">
                            <Palette className="h-4 w-4" />
                            Design
                        </TabsTrigger>
                    </TabsList>

                    {/* Certificate Grid */}
                    {["construction", "coding", "design"].map((tab) => (
                        <TabsContent key={tab} value={tab}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {getCertificatesByTab(tab).map((certificate, index) => {
                                    const rarity = rarityConfig[certificate.rarity]
                                    const CategoryIcon = categoryIcons[certificate.category] || Award

                                    return (
                                        <motion.div
                                            key={certificate.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            onHoverStart={() => setHoveredCard(certificate.id)}
                                            onHoverEnd={() => setHoveredCard(null)}
                                            onClick={() => {
                                                setSelectedCertificate(certificate)
                                                setShowDetails(true)
                                            }}
                                            className="cursor-pointer group"
                                        >
                                            <Card
                                                className={`
                          relative overflow-hidden bg-black/40 backdrop-blur-sm border transition-all duration-500
                          ${hoveredCard === certificate.id ? `${rarity.border} ${rarity.glow} shadow-2xl scale-105` : "border-purple-900/20"}
                          hover:shadow-2xl
                        `}
                                            >
                                                {/* Rarity Glow Effect */}
                                                <div
                                                    className={`absolute inset-0 bg-gradient-to-br ${rarity.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                                                />

                                                {/* Rarity Badge */}
                                                <div className="absolute top-3 right-3 z-10">
                                                    <Badge
                                                        className={`${rarity.bg} ${rarity.border} text-white border backdrop-blur-sm flex items-center gap-1`}
                                                    >
                                                        <rarity.icon className="h-3 w-3" />
                                                        {rarity.label}
                                                    </Badge>
                                                </div>

                                                {/* Verified Badge */}
                                                {certificate.verified && (
                                                    <div className="absolute top-3 left-3 z-10">
                                                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-1">
                                                            <Verified className="h-3 w-3" />
                                                            Verified
                                                        </Badge>
                                                    </div>
                                                )}

                                                <CardContent className="p-6">
                                                    {/* Certificate Image/Icon */}
                                                    <div className="relative mb-4 h-32 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg flex items-center justify-center overflow-hidden">
                                                        <div
                                                            className={`absolute inset-0 bg-gradient-to-br ${rarity.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                                                        />
                                                        {selectedCertificate?.image &&
                                                        selectedCertificate.image.includes("construct-nsw-safety") ? (
                                                            <img
                                                                src={selectedCertificate.image || "/placeholder.svg"}
                                                                alt={selectedCertificate.title}
                                                                className="w-full h-full object-cover rounded-lg relative z-10"
                                                            />
                                                        ) : selectedCertificate?.comingSoon ? (
                                                            <div className="relative z-10 flex flex-col items-center justify-center">
                                                                <Clock className="h-12 w-12 text-purple-400 mb-2" />
                                                                <span className="text-sm text-purple-300">Coming Soon</span>
                                                            </div>
                                                        ) : (
                                                            <CategoryIcon className="h-16 w-16 text-purple-400 relative z-10" />
                                                        )}
                                                        {/* Floating particles effect */}
                                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                            {[...Array(6)].map((_, i) => (
                                                                <motion.div
                                                                    key={i}
                                                                    className="absolute w-1 h-1 bg-purple-400 rounded-full"
                                                                    style={{
                                                                        left: `${20 + i * 15}%`,
                                                                        top: `${30 + (i % 2) * 40}%`,
                                                                    }}
                                                                    animate={{
                                                                        y: [-10, -20, -10],
                                                                        opacity: [0, 1, 0],
                                                                    }}
                                                                    transition={{
                                                                        duration: 2,
                                                                        repeat: Number.POSITIVE_INFINITY,
                                                                        delay: i * 0.2,
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Certificate Info */}
                                                    <div className="space-y-3">
                                                        <div>
                                                            <h3 className="font-bold text-lg text-purple-200 group-hover:text-white transition-colors line-clamp-2">
                                                                {certificate.title}
                                                            </h3>
                                                            <p className="text-sm text-purple-200/70">{certificate.issuer}</p>
                                                        </div>

                                                        <p className="text-sm text-purple-200/60 line-clamp-2">{certificate.description}</p>

                                                        {/* Skills */}
                                                        <div className="flex flex-wrap gap-1">
                                                            {certificate.skills.slice(0, 3).map((skill, i) => (
                                                                <Badge
                                                                    key={i}
                                                                    variant="outline"
                                                                    className="text-xs bg-purple-500/10 text-purple-300 border-purple-500/30"
                                                                >
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                            {certificate.skills.length > 3 && (
                                                                <Badge
                                                                    variant="outline"
                                                                    className="text-xs bg-purple-500/10 text-purple-300 border-purple-500/30"
                                                                >
                                                                    +{certificate.skills.length - 3}
                                                                </Badge>
                                                            )}
                                                        </div>

                                                        {/* Date and Level */}
                                                        <div className="flex justify-between items-center text-xs text-purple-200/50">
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="h-3 w-3" />
                                                                {new Date(certificate.date).toLocaleDateString()}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Trophy className="h-3 w-3" />
                                                                {certificate.level}
                                                            </div>
                                                        </div>

                                                        {/* Achievements */}
                                                        {certificate.achievements && certificate.achievements.length > 0 && (
                                                            <div className="flex items-center gap-1 text-xs">
                                                                <Sparkles className="h-3 w-3 text-yellow-400" />
                                                                <span className="text-yellow-400">{certificate.achievements[0]}</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Hover Effect */}
                                                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <div className="flex items-center gap-1 text-purple-400">
                                                            <Eye className="h-4 w-4" />
                                                            <span className="text-sm">View Details</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        </TabsContent>
                    ))}
                </Tabs>

                {/* Certificate Details Modal */}
                <AnimatePresence>
                    {showDetails && selectedCertificate && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setShowDetails(false)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-black/90 border border-purple-500/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-sm"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-8">
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                                {(() => {
                                                    const CategoryIcon = categoryIcons[selectedCertificate.category] || Award
                                                    return <CategoryIcon className="h-8 w-8 text-purple-400" />
                                                })()}
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold text-purple-200">{selectedCertificate.title}</h2>
                                                <p className="text-purple-200/70">{selectedCertificate.issuer}</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setShowDetails(false)}
                                            className="text-purple-400 hover:text-purple-300"
                                        >
                                            ✕
                                        </Button>
                                    </div>

                                    {/* Certificate Image Display */}
                                    {selectedCertificate?.image && selectedCertificate.image.includes("construct-nsw-safety") && (
                                        <div className="lg:col-span-3 mb-6">
                                            <div className="bg-purple-900/20 rounded-lg p-4">
                                                <h3 className="text-lg font-semibold text-purple-300 mb-3">Certificate</h3>
                                                <div className="relative rounded-lg overflow-hidden border border-purple-500/30">
                                                    <img
                                                        src={selectedCertificate.image || "/placeholder.svg"}
                                                        alt={selectedCertificate.title}
                                                        className="w-full h-auto object-contain bg-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Content Grid */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        {/* Main Info */}
                                        <div className="lg:col-span-2 space-y-6">
                                            <div>
                                                <h3 className="text-lg font-semibold text-purple-300 mb-3">Description</h3>
                                                <p className="text-purple-200/80">{selectedCertificate.description}</p>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-semibold text-purple-300 mb-3">Skills & Competencies</h3>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {selectedCertificate.skills.map((skill, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-purple-200/80">
                                                            <CheckCircle className="h-4 w-4 text-green-400" />
                                                            {skill}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {selectedCertificate?.achievements && selectedCertificate.achievements.length > 0 && (
                                                <div>
                                                    <h3 className="text-lg font-semibold text-purple-300 mb-3">Achievements</h3>
                                                    <div className="space-y-2">
                                                        {selectedCertificate.achievements.map((achievement, i) => (
                                                            <div key={i} className="flex items-center gap-2 text-purple-200/80">
                                                                <Star className="h-4 w-4 text-yellow-400" />
                                                                {achievement}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Sidebar Info */}
                                        <div className="space-y-6">
                                            <div className="bg-purple-900/20 rounded-lg p-4 space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-purple-400" />
                                                    <div>
                                                        <div className="text-sm text-purple-200/70">Date Earned</div>
                                                        <div className="text-purple-200">
                                                            {new Date(selectedCertificate.date).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Trophy className="h-4 w-4 text-purple-400" />
                                                    <div>
                                                        <div className="text-sm text-purple-200/70">Level</div>
                                                        <div className="text-purple-200">{selectedCertificate.level}</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-purple-400" />
                                                    <div>
                                                        <div className="text-sm text-purple-200/70">Duration</div>
                                                        <div className="text-purple-200">{selectedCertificate.duration}</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-purple-400" />
                                                    <div>
                                                        <div className="text-sm text-purple-200/70">Location</div>
                                                        <div className="text-purple-200">{selectedCertificate.location}</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <GraduationCap className="h-4 w-4 text-purple-400" />
                                                    <div>
                                                        <div className="text-sm text-purple-200/70">Instructor</div>
                                                        <div className="text-purple-200">{selectedCertificate.instructor}</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-purple-400" />
                                                    <div>
                                                        <div className="text-sm text-purple-200/70">Credential ID</div>
                                                        <div className="text-purple-200 font-mono text-xs">{selectedCertificate.credentialId}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Rarity Info */}
                                            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    {(() => {
                                                        const rarity = rarityConfig[selectedCertificate.rarity]
                                                        return <rarity.icon className="h-5 w-5 text-purple-400" />
                                                    })()}
                                                    <span className="font-semibold text-purple-200">
                            {rarityConfig[selectedCertificate.rarity].label} Certificate
                          </span>
                                                </div>
                                                <p className="text-sm text-purple-200/70">
                                                    This certificate represents exceptional achievement and expertise in the field.
                                                </p>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="space-y-3">
                                                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Download Certificate
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="w-full bg-purple-500/20 border-purple-500/30 text-purple-200"
                                                >
                                                    <ExternalLink className="h-4 w-4 mr-2" />
                                                    Verify Credential
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
