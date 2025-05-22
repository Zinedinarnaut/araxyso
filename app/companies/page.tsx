"use client"

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState} from "react"
import {motion} from "framer-motion"
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {
    ChevronLeft,
    Cpu,
    HeadsetIcon as VrHeadset,
    HardHat,
    Calendar,
    MapPin,
    Globe,
    Users,
    Briefcase,
    Building2,
    Rocket,
    ArrowUpRight,
    ChevronRight,
    Star,
    Award,
    Zap,
} from "lucide-react"
import Link from "next/link"

const companies = [
    {
        id: 1,
        name: "Nanite",
        logo: "/placeholder.svg?height=80&width=80",
        description: "Pioneering nano-technology solutions",
        details:
            "Nanite is at the forefront of nano-scale engineering, developing cutting-edge technologies that push the boundaries of what's possible at the molecular level.",
        icon: Cpu,
        founded: "2024 - 2025",
        location: "Sydney, AU",
        website: "https://nanite.tech",
        employees: "5+",
        tags: ["Construction", "R&D", "Technology"],
        featured: true,
        color: "from-purple-500 to-blue-600",
    },
    {
        id: 2,
        name: "HydroGlass",
        logo: "/placeholder.svg?height=80&width=80",
        description: "Revolutionizing digital experiences",
        details:
            "HydroGlass focuses on creating immersive drink bottles.",
        icon: VrHeadset,
        founded: "2025",
        location: "Sydney, AU",
        website: "https://hydroglass.com",
        employees: "5-20",
        tags: ["Bottle", "Hydro", "Hydro Technology"],
        projects: [
            {
                name: "Bottles",
                description: "Tackling down on plastic bottles and revoluting the bottle industry",
            },
        ],
        featured: true,
        color: "from-pink-500 to-orange-600",
    },
]

const workExperience = [
    {
        id: 1,
        name: "Proclad Construction",
        role: "Software Engineer",
        description: "Developing innovative software solutions for the construction industry",
        details:
            "At Proclad Construction, I'm responsible for creating cutting-edge software tools that streamline construction processes, improve project management, and enhance overall efficiency in the field.",
        icon: HardHat,
        period: "2021 - Present",
        location: "Sydney, AU",
        tags: ["Construction Tech", "Project Management", "IoT Integration"],
        achievements: [
            "Developed real-time project tracking system that reduced reporting time by 65%",
            "Implemented IoT solution for equipment monitoring, saving $120K in maintenance costs",
        ],
        technologies: ["React", "Node.js", "MongoDB", "AWS", "IoT", "React Native"],
        featured: true,
    },
]

export default function CompaniesPage() {
    const [hoveredCompany, setHoveredCompany] = useState<string | null>(null)
    const [selectedCompany, setSelectedCompany] = useState<number | null>(null)
    const [selectedJob, setSelectedJob] = useState<number | null>(null)

    const featuredCompanies = companies.filter((company) => company.featured)
    companies.filter((company) => !company.featured);
    return (
        <div className="py-12">
            <motion.div
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className="mb-8 flex items-center gap-2"
            >
                <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                    <ChevronLeft className="h-4 w-4"/>
                </Link>
                <span className="text-purple-200/50">back to home</span>
            </motion.div>

            <motion.h1
                className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: 0.2}}
            >
                Companies & Work Experience
            </motion.h1>

            <Tabs defaultValue="companies" className="space-y-8">
                <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-purple-900/20">
                    <TabsTrigger value="companies" className="data-[state=active]:bg-purple-900/30">
                        <Building2 className="h-4 w-4 mr-2"/>
                        My Companies
                    </TabsTrigger>
                    <TabsTrigger value="experience" className="data-[state=active]:bg-purple-900/30">
                        <Briefcase className="h-4 w-4 mr-2"/>
                        Work Experience
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="companies" className="space-y-8">
                    {featuredCompanies.length > 0 && (
                        <motion.section
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: 0.4}}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400"/>
                                <h2 className="text-2xl font-semibold text-purple-200">Featured Companies</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {featuredCompanies.map((company, index) => (
                                    <motion.div
                                        key={company.id}
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.5, delay: 0.1 * index}}
                                        onHoverStart={() => setHoveredCompany(company.name)}
                                        onHoverEnd={() => setHoveredCompany(null)}
                                        onClick={() => setSelectedCompany(selectedCompany === company.id ? null : company.id)}
                                        className="cursor-pointer"
                                    >
                                        <Card
                                            className="bg-black/50 border border-purple-900/20 backdrop-blur-sm overflow-hidden h-full">
                                            <div
                                                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${company.color}"></div>
                                            <CardHeader className="relative">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className="w-16 h-16 rounded-md bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                                            <company.icon className="h-8 w-8 text-purple-400"/>
                                                        </div>
                                                        <div>
                                                            <CardTitle
                                                                className="text-purple-200">{company.name}</CardTitle>
                                                            <CardDescription
                                                                className="text-purple-200/70">{company.description}</CardDescription>
                                                        </div>
                                                    </div>
                                                    <Badge variant="outline"
                                                           className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                                                        Founded {company.founded}
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-purple-200/50 mb-4">{company.details}</p>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {company.tags.map((tag) => (
                                                        <Badge
                                                            key={tag}
                                                            variant="outline"
                                                            className="bg-purple-500/20 text-purple-200 border-purple-500/30"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-sm text-purple-200/50 mb-4">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-4 w-4"/>
                                                        <span>{company.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="h-4 w-4"/>
                                                        <span>{company.employees} employees</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Globe className="h-4 w-4"/>
                                                        <span>{company.website}</span>
                                                    </div>
                                                </div>

                                                {selectedCompany === company.id && (
                                                    <motion.div
                                                        initial={{opacity: 0, height: 0}}
                                                        animate={{opacity: 1, height: "auto"}}
                                                        transition={{duration: 0.3}}
                                                        className="mt-4 space-y-4"
                                                    >
                                                        <div>
                                                            <h4 className="text-sm font-medium text-purple-300 mb-2">Key
                                                                Achievements</h4>
                                                            <ul className="space-y-2">
                                                                {company.achievements.map((achievement: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, i: Key | null | undefined) => (
                                                                    <li key={i} className="flex items-start gap-2 text-sm text-purple-200/70">
                                                                        <Award className="h-4 w-4 text-purple-400 mt-0.5 shrink-0" />
                                                                        <span>{achievement}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div>
                                                            <h4 className="text-sm font-medium text-purple-300 mb-2">Notable Projects</h4>
                                                            <div className="space-y-2">
                                                                {company.projects.map((project, i) => (
                                                                    <div key={i} className="bg-purple-900/10 rounded-md p-3">
                                                                        <h5 className="font-medium text-purple-200 text-sm">{project.name}</h5>
                                                                        <p className="text-xs text-purple-200/70 mt-1">{project.description}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </CardContent>
                                            <CardFooter>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="ml-auto text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                                                >
                                                    {selectedCompany === company.id ? "Show Less" : "Show More"}
                                                    <ChevronRight className="h-4 w-4 ml-1" />
                                                </Button>
                                            </CardFooter>
                                            {hoveredCompany === company.name && (
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 pointer-events-none"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            )}
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    )}

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4 text-purple-200">All Companies</h2>
                        <div className="space-y-6">
                            {companies.map((company, index) => (
                                <motion.div
                                    key={company.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    onHoverStart={() => setHoveredCompany(company.name)}
                                    onHoverEnd={() => setHoveredCompany(null)}
                                >
                                    <Card className="bg-black/50 border border-purple-900/20 backdrop-blur-sm overflow-hidden">
                                        <CardHeader className="relative">
                                            <div className="absolute top-0 right-0 p-4">
                                                <company.icon className="h-8 w-8 text-purple-400" />
                                            </div>
                                            <CardTitle className="text-purple-200">{company.name}</CardTitle>
                                            <CardDescription className="text-purple-200/70">{company.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-purple-200/50 mb-4">{company.details}</p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {company.tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="outline"
                                                        className="bg-purple-500/20 text-purple-200 border-purple-500/30"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-sm text-purple-200/50">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>Founded: {company.founded}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{company.location}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                        {hoveredCompany === company.name && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="bg-black/40 border border-purple-900/20 rounded-lg p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                                <Rocket className="h-5 w-5 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-purple-200">Start a New Venture</h3>
                        </div>
                        <p className="text-purple-200/70 mb-4">
                            Have an idea for a new company or project? Let&#39;s bring it to life with cutting-edge technology and
                            innovative solutions.
                        </p>
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                            <Zap className="h-4 w-4 mr-2" />
                            Start New Company
                        </Button>
                    </motion.section>
                </TabsContent>

                <TabsContent value="experience" className="space-y-8">
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4 text-purple-200">Work Experience</h2>
                        <div className="space-y-6">
                            {workExperience.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    onHoverStart={() => setHoveredCompany(job.name)}
                                    onHoverEnd={() => setHoveredCompany(null)}
                                    onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                                    className="cursor-pointer"
                                >
                                    <Card className="bg-black/50 border border-purple-900/20 backdrop-blur-sm overflow-hidden">
                                        <CardHeader className="relative">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                                        <job.icon className="h-6 w-6 text-purple-400" />
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-purple-200">{job.name}</CardTitle>
                                                        <CardDescription className="text-purple-200/70">{job.role}</CardDescription>
                                                    </div>
                                                </div>
                                                <Badge variant="outline" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                                                    {job.period}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-purple-200/50 mb-4">{job.details}</p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {job.tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="outline"
                                                        className="bg-purple-500/20 text-purple-200 border-purple-500/30"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-purple-200/50">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{job.location}</span>
                                                </div>
                                            </div>

                                            {selectedJob === job.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    transition={{ duration: 0.3 }}
                                                    className="mt-4 space-y-4"
                                                >
                                                    <div>
                                                        <h4 className="text-sm font-medium text-purple-300 mb-2">Key Achievements</h4>
                                                        <ul className="space-y-2">
                                                            {job.achievements.map((achievement, i) => (
                                                                <li key={i} className="flex items-start gap-2 text-sm text-purple-200/70">
                                                                    <Award className="h-4 w-4 text-purple-400 mt-0.5 shrink-0" />
                                                                    <span>{achievement}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm font-medium text-purple-300 mb-2">Technologies Used</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {job.technologies.map((tech, i) => (
                                                                <Badge key={i} className="bg-purple-900/30 text-purple-200 border-purple-900/50">
                                                                    {tech}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </CardContent>
                                        <CardFooter>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="ml-auto text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                                            >
                                                {selectedJob === job.id ? "Show Less" : "Show More"}
                                                <ChevronRight className="h-4 w-4 ml-1" />
                                            </Button>
                                        </CardFooter>
                                        {hoveredCompany === job.name && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 pointer-events-none"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="bg-black/40 border border-purple-900/20 rounded-lg p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                                <ArrowUpRight className="h-5 w-5 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-purple-200">Looking for New Opportunities</h3>
                        </div>
                        <p className="text-purple-200/70 mb-4">
                            I&#39;m always open to discussing new projects, opportunities, and collaborations in the tech space.
                        </p>
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                            Contact Me
                        </Button>
                    </motion.section>
                </TabsContent>
            </Tabs>
        </div>
    )
}
