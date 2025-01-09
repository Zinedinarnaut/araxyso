'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Cpu, HardHat, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'

const companies = [
  {
    name: "Nanite",
    description: "Pioneering Website and Engineering solutions",
    details: "Nanite is leading the charge in web development, redefining the boundaries of innovation and excellence in creating cutting-edge websites.",
    icon: Cpu,
    founded: "Coming 2025 - Present",
    location: "Sydney, Australia",
    tags: ["R&D", "Website Development"],
  },
]

const workExperience = [
  {
    name: "Proclad Construction",
    role: "Website Developer",
    description: "Developing innovative software solutions for the construction industry",
    details: "At Proclad Construction, I manage the development of the company's main website while also contributing as a regular construction worker.",
    icon: HardHat,
    period: "2023/24 - Present",
    location: "Sydney, Australia",
    tags: ["Construction Tech", "Project Management", "Website Development"],
  }
]

export default function CompaniesPage() {
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null)

  return (
      <div className="py-12">
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

        <motion.h1
            className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
          Companies & Work Experience
        </motion.h1>

        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-purple-200">My Companies</h2>
          <div className="space-y-6">
            {companies.map((company, index) => (
                <motion.div
                    key={company.name}
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
                      <p className="text-purple-200/50 mb-4">
                        {company.details}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {company.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                              {tag}
                            </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-purple-200/50">
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
                            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
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
            className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-4 text-purple-200">Work Experience</h2>
          <div className="space-y-6">
            {workExperience.map((job, index) => (
                <motion.div
                    key={job.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    onHoverStart={() => setHoveredCompany(job.name)}
                    onHoverEnd={() => setHoveredCompany(null)}
                >
                  <Card className="bg-black/50 border border-purple-900/20 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="relative">
                      <div className="absolute top-0 right-0 p-4">
                        <job.icon className="h-8 w-8 text-purple-400" />
                      </div>
                      <CardTitle className="text-purple-200">{job.name}</CardTitle>
                      <CardDescription className="text-purple-200/70">{job.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-purple-200/50 mb-4">
                        {job.details}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                              {tag}
                            </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-purple-200/50">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{job.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </CardContent>
                    {hoveredCompany === job.name && (
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
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
      </div>
  )
}

