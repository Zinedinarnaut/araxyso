'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, Calendar, Briefcase, Mail, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const experiences = [
    {
        id: 1,
        date: "2022-01",
        title: "First Website",
        description: "Created my first static HTML/CSS website",
        skills: ["HTML", "CSS"]
    },
    {
        id: 2,
        date: "2022-06",
        title: "JavaScript Journey",
        description: "Learned JavaScript and built interactive web applications",
        skills: ["JavaScript", "DOM Manipulation"]
    },
    {
        id: 3,
        date: "2022-09",
        title: "React Deep Dive",
        description: "Mastered React and developed single-page applications",
        skills: ["React", "State Management"]
    },
    {
        id: 4,
        date: "2023-03",
        title: "Full Stack Development",
        description: "Expanded skills to include backend development with Node.js",
        skills: ["Node.js", "Express", "MongoDB"]
    },
    {
        id: 5,
        date: "2023-08",
        title: "Advanced Frontend",
        description: "Explored advanced frontend technologies and frameworks",
        skills: ["Next.js", "TypeScript", "Tailwind CSS"]
    },
    {
        id: 6,
        date: "2024-01",
        title: "Cybersecurity Integration",
        description: "Incorporated cybersecurity best practices into web development",
        skills: ["Web Security", "OWASP", "Encryption"]
    }
]

const skills = [
    { name: "HTML/CSS", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "TypeScript", level: 75 },
    { name: "Next.js", level: 95 },
    { name: "Tailwind CSS", level: 85 },
    { name: "Postgres", level: 65 },
    { name: "C++", level: 45 },
    { name: "Web Security", level: 60 }
]

export default function ProgressPage() {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

    return (
        <div className="py-12">
            <div className="mb-8 flex items-center gap-2">
                <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                </Link>
                <span className="text-purple-200/50">back to home</span>
            </div>

            <motion.h1
                className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Development Progress
            </motion.h1>

            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-semibold text-purple-200 mb-4">Experience Timeline</h2>
                    <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500/20 rounded-full"></div>
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                className="mb-8 ml-6"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="absolute left-0 w-3 h-3 bg-purple-500 rounded-full mt-1.5 -ml-1.5 border border-purple-900/50"></div>
                                <Card className="p-4 bg-black/50 border border-purple-900/20">
                                    <div className="flex items-center mb-2">
                                        <Calendar className="h-4 w-4 text-purple-400 mr-2" />
                                        <span className="text-sm text-purple-200/70">{exp.date}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-purple-200">{exp.title}</h3>
                                    <p className="text-purple-200/70 mb-2">{exp.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills.map((skill, skillIndex) => (
                                            <Badge key={skillIndex} variant="outline" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-purple-200 mb-4">Current Skills</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                className="relative"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                onHoverStart={() => setHoveredSkill(skill.name)}
                                onHoverEnd={() => setHoveredSkill(null)}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-purple-200">{skill.name}</span>
                                    <span className="text-purple-200/70">{skill.level}%</span>
                                </div>
                                <Progress value={skill.level} className="h-2 bg-purple-900/20" />
                                {hoveredSkill === skill.name && (
                                    <motion.div
                                        className="absolute top-full left-0 right-0 mt-2 p-2 bg-black/80 border border-purple-500/30 rounded text-purple-200/70 text-sm"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {skill.level < 50 ? "Beginner" : skill.level < 70 ? "Intermediate" : skill.level < 90 ? "Advanced" : "Expert"}
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-purple-200 mb-4">Looking for Work</h2>
                    <Card className="p-6 bg-black/50 border border-purple-900/20">
                        <div className="flex items-center mb-4">
                            <Briefcase className="h-6 w-6 text-purple-400 mr-2" />
                            <span className="text-lg font-semibold text-purple-200">Open for Opportunities</span>
                        </div>
                        <p className="text-purple-200/70 mb-4">
                            I&#39;m currently seeking new challenges and opportunities in web development.
                            If you have an exciting project or a position that aligns with my skills,
                            I&#39;d love to hear from you!
                        </p>
                        <div className="flex items-center">
                            <Mail className="h-5 w-5 text-purple-400 mr-2" />
                            <a href="mailto:inquiries@nanite.tech" className="text-purple-400 hover:text-purple-300 transition-colors">
                                inquiries@nanite.tech
                            </a>
                        </div>
                    </Card>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-purple-200 mb-4">Business Inquiries</h2>
                    <Card className="p-6 bg-black/50 border border-purple-900/20">
                        <p className="text-purple-200/70 mb-4">
                            For business inquiries, collaborations, or project discussions,
                            please don&#39;t hesitate to get in touch. I&#39;m always excited to explore
                            new opportunities and bring innovative ideas to life.
                        </p>
                        <div className="flex items-center">
                            <Mail className="h-5 w-5 text-purple-400 mr-2" />
                            <a href="mailto:inquiries@nanite.tech" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center">
                                inquiries@nanite.tech
                                <ExternalLink className="h-4 w-4 ml-1" />
                            </a>
                        </div>
                    </Card>
                </section>
            </div>
        </div>
    )
}

