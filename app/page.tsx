"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import {
  Terminal,
  Code2,
  Cpu,
  Wifi,
  Linkedin,
  Mail,
  Github,
  ExternalLink,
  Music,
  Shield,
  Brain,
  Database,
  Layout,
  PenToolIcon as Tool,
  Server,
  ArrowRight,
  Star,
} from "lucide-react"
import { SpotifyNowPlaying } from "@/components/SpotifyNowPlaying"

const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com/zinedinarnaut" },
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/zinedinarnaut" },
  { name: "Email", icon: Mail, url: "mailto:inquiries@nanite.tech" },
]

const skills = [
  { name: "Reverse Engineering", progress: 90 },
  { name: "Software Development", progress: 85 },
  { name: "Web Development", progress: 80 },
  { name: "System Architecture", progress: 75 },
]

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const featuredVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }
  }, [])

  return (
      <div className="relative min-h-screen">
        {/* Video Background */}
        <div className="fixed inset-0 z-[-2] overflow-hidden">
          <video ref={videoRef} className="absolute min-w-full min-h-full object-cover" autoPlay loop muted playsInline>
            <source
                src="https://cdn.discordapp.com/attachments/1366374297202982963/1372703610236043408/60fps_1.mp4?ex=682fa65c&is=682e54dc&hm=95e54abc99a6f59a494a6cdb78996868fce62cbcde2f6b3254a460570b3b8b4d&"
                type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        {/* Glowing Overlay */}
        <div className="fixed inset-0 z-[-1]">
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-[#0a0a0b] to-transparent"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 pt-12 pb-20 max-w-5xl mx-auto px-4">
          {/* Profile Section */}
          <div className="mb-16 border border-purple-900/30 rounded-lg overflow-hidden backdrop-blur-sm bg-black/40">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              {/* Left Column - Image */}
              <div className="md:col-span-4 relative bg-gradient-to-br from-purple-900/30 to-black/60">
                <div className="aspect-square relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        src="https://cdn.discordapp.com/attachments/1366374297202982963/1374899380540407909/a_24d07f7eb342ef7c072b48c9f4208eca.gif?ex=682fba54&is=682e68d4&hm=a25776cf70f91293d90c3b9393fd6dae595bd5f3fa8501120c7782249c833b54&"
                        alt="Profile"
                        width={500}
                        height={500}
                        className="w-full h-full object-contain"
                        unoptimized={true} // This ensures the GIF animation works
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <h1 className="text-3xl font-bold text-white mb-1">ARAXYSO</h1>
                    <p className="text-purple-200/90 text-sm">Age 17 | code breaker</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Info */}
              <div className="md:col-span-8 p-6 md:p-8">
                <div className="flex flex-col h-full justify-between">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-purple-300 mb-2">software.engineer/reverse.engineer</h2>
                      <p className="text-purple-200/80">
                        Young prodigy specializing in software engineering and reverse engineering, pushing the boundaries
                        of future technology with a focus on cybersecurity and system architecture.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-purple-300 uppercase tracking-wider">Core Competencies</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { icon: Terminal, text: "Reverse Engineering" },
                          { icon: Code2, text: "Software Development" },
                          { icon: Cpu, text: "System Architecture" },
                          { icon: Wifi, text: "Network Security" },
                          { icon: Shield, text: "Cybersecurity" },
                          { icon: Tool, text: "Mechanical Engineering" },
                          { icon: Brain, text: "AI/ML Engineering" },
                          { icon: Layout, text: "Frontend Development" },
                          { icon: Database, text: "Backend Development" },
                        ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-2 text-sm text-purple-200/80">
                              <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center">
                                <Icon className="h-4 w-4 text-purple-400" />
                              </div>
                              {text}
                            </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-purple-300 uppercase tracking-wider">Skills</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {skills.map((skill) => (
                            <div key={skill.name} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-purple-200/80">{skill.name}</span>
                                <span className="text-purple-200/60">{skill.progress}%</span>
                              </div>
                              <div className="h-1.5 bg-purple-900/30 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                    style={{ width: `${skill.progress}%` }}
                                ></div>
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {socialLinks.map((social) => (
                        <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
                          <Button
                              variant="outline"
                              size="sm"
                              className="border-purple-900/40 bg-black/30 text-purple-200 hover:bg-purple-900/30 hover:border-purple-500/50"
                          >
                            <social.icon className="h-4 w-4 mr-2" />
                            {social.name}
                          </Button>
                        </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Project Section */}
          <div className="mb-16 relative overflow-hidden rounded-lg border bg-black/40 border-purple-900/30">
            {/* Image Background */}
            <div className="absolute inset-0 z-0 top-[0px] h-[1200px]">
              <Image
                  src="/vivian.png"
                  alt="Vivian character"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="right"
                  className="scale-70"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <Badge className="mb-4 bg-purple-500/20 text-purple-200 border-purple-500/30 px-3 py-1">
                  <Star className="h-3 w-3 mr-2 fill-purple-400" />
                  Featured Project
                </Badge>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                  Vivian-rs
                </h2>
                <p className="text-purple-200/80 mb-6">
                  Experimental server emulator for the game Zenless Zone Zero. Built with Rust for high performance and
                  memory safety.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className="bg-black/40 text-purple-200/80 border-purple-900/30">Rust</Badge>
                  <Badge className="bg-black/40 text-purple-200/80 border-purple-900/30">Game Development</Badge>
                  <Badge className="bg-black/40 text-purple-200/80 border-purple-900/30">Reverse Engineering</Badge>
                  <Badge className="bg-black/40 text-purple-200/80 border-purple-900/30">Server Emulation</Badge>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Server className="h-4 w-4 mr-2" />
                    View Project
                  </Button>
                  <Link
                      href="/projects"
                      className="text-purple-400 hover:text-purple-300 transition-colors flex items-center"
                  >
                    All Projects
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
                <div className="text-sm text-purple-200/60">
                  <p className="mb-1">Credits:</p>
                  <div className="flex flex-col gap-2">
                    <div>
                      <Badge variant="outline" className="bg-purple-900/20 text-purple-200/80 border-purple-900/30 mr-2">
                        XeonDev
                      </Badge>
                      <span className="text-purple-200/70">Original Creator & Programmer</span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs">
                    <span className="text-yellow-400">Note:</span> Project will be open-sourced soon at{" "}
                    <a
                        href="https://github.com/Zinedinarnaut/vivian-rs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors underline"
                    >
                      github.com/Zinedinarnaut/vivian-rs
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Now Playing Section */}
          <div className="mb-12">
            <h2 className="text-lg font-medium text-purple-300 mb-3 border-b border-purple-900/30 pb-2 flex items-center">
              <Music className="h-4 w-4 mr-2 text-purple-400" />
              Spotify Status
            </h2>
            <SpotifyNowPlaying />
          </div>

          {/* Quick Links */}
          <div className="mb-12">
            <h2 className="text-lg font-medium text-purple-300 mb-3 border-b border-purple-900/30 pb-2">
              Explore My Work
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/projects" className="group">
                <Card className="bg-black/40 border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <div className="p-5 flex flex-col h-full">
                    <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center mb-3">
                      <Code2 className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="font-medium text-purple-200 mb-2">Projects</h3>
                    <p className="text-purple-200/60 text-sm mb-3 flex-grow">
                      Explore my software projects and technical work.
                    </p>
                    <span className="text-purple-400 text-sm group-hover:text-purple-300 flex items-center">
                    View Projects
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </span>
                  </div>
                </Card>
              </Link>

              <Link href="/companies" className="group">
                <Card className="bg-black/40 border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <div className="p-5 flex flex-col h-full">
                    <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center mb-3">
                      <Cpu className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="font-medium text-purple-200 mb-2">Companies</h3>
                    <p className="text-purple-200/60 text-sm mb-3 flex-grow">
                      Discover the companies I've founded and my work experience.
                    </p>
                    <span className="text-purple-400 text-sm group-hover:text-purple-300 flex items-center">
                    View Companies
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </span>
                  </div>
                </Card>
              </Link>

              <Link href="/cheats" className="group">
                <Card className="bg-black/40 border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <div className="p-5 flex flex-col h-full">
                    <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center mb-3">
                      <Terminal className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="font-medium text-purple-200 mb-2">Hack.Matrix</h3>
                    <p className="text-purple-200/60 text-sm mb-3 flex-grow">
                      Browse my collection of custom game modifications and tools.
                    </p>
                    <span className="text-purple-400 text-sm group-hover:text-purple-300 flex items-center">
                    View Cheats
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </span>
                  </div>
                </Card>
              </Link>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h2 className="text-lg font-medium text-purple-300 mb-3 border-b border-purple-900/30 pb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-black/40 text-purple-200/80 border-purple-900/30 hover:border-purple-500/50">
                Nanite
              </Badge>
              <Badge className="bg-black/40 text-purple-200/80 border-purple-900/30 hover:border-purple-500/50">
                Retard
              </Badge>
              <Badge className="bg-black/40 text-purple-200/80 border-purple-900/30 hover:border-purple-500/50">
                Reverse Engineering
              </Badge>
              <Badge className="bg-black/40 text-purple-200/80 border-purple-900/30 hover:border-purple-500/50">
                Software Engineering
              </Badge>
              <Badge className="bg-black/40 text-purple-200/80 border-purple-900/30 hover:border-purple-500/50">
                Software Development
              </Badge>
              <Badge className="bg-black/40 text-purple-200/80 border-purple-900/30 hover:border-purple-500/50">
                Website Development
              </Badge>
            </div>
          </div>
        </div>
      </div>
  )
}
