"use client"

import { useEffect, useRef, useState } from "react"
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
  Gamepad2,
  Blocks,
  MapPin,
  Calendar,
  Award,
  Zap,
} from "lucide-react"
import { SpotifyNowPlaying } from "@/components/SpotifyNowPlaying"

const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com/zinedinarnaut", color: "from-gray-600 to-gray-800" },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/zinedinarnaut",
    color: "from-blue-600 to-blue-800",
  },
  { name: "Email", icon: Mail, url: "mailto:inquiries@nanite.tech", color: "from-red-600 to-red-800" },
]

const skills = [
  { name: "Reverse Engineering", progress: 90, color: "from-red-500 to-pink-500" },
  { name: "Software Development", progress: 85, color: "from-blue-500 to-cyan-500" },
  { name: "Web Development", progress: 80, color: "from-green-500 to-emerald-500" },
  { name: "Roblox Development", progress: 95, color: "from-orange-500 to-yellow-500" },
]

const achievements = [
  { icon: Award, text: "18 Years Old", color: "text-yellow-400" },
  { icon: Zap, text: "Life is Roblox", color: "text-red-400" },
  { icon: MapPin, text: "Australia", color: "text-green-400" },
  { icon: Calendar, text: "Since 2020", color: "text-blue-400" },
]

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }

    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  return (
      <div className="relative min-h-screen">
        {/* Glowing Overlay */}
        <div className="fixed inset-0 z-[-1]">
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-[#0a0a0b] to-transparent"></div>
        </div>

        {/* Floating Particles */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          {[...Array(20)].map((_, i) => (
              <div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
              />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 pt-12 pb-20 max-w-6xl mx-auto px-4">
          {/* Enhanced Profile Section */}
          <div
              className={`mb-16 relative overflow-hidden rounded-2xl transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                  src="/img.png"
                  alt="Profile Background"
                  fill
                  className="object-cover opacity-20 scale-110"
                  unoptimized={true}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-purple-900/80"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            </div>

            {/* Animated Grid Background */}
            <div className="absolute inset-0 z-1 opacity-10">
              <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
              `,
                    backgroundSize: "50px 50px",
                    animation: "grid-move 20s linear infinite",
                  }}
              ></div>
            </div>

            {/* Main Profile Content */}
            <div className="relative z-10 p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Side - Avatar and Quick Info */}
                <div className="lg:col-span-4 text-center lg:text-left">
                  <div className="relative inline-block mb-6">
                    {/* Glowing Ring */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full blur-lg opacity-60 animate-pulse"></div>

                    {/* Avatar Container */}
                    <div className="relative w-48 h-48 mx-auto lg:mx-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1 animate-spin-slow">
                        <div className="w-full h-full bg-black rounded-full p-2">
                          <Image
                              src="/img.png"
                              alt="ARAXYSO"
                              fill
                              className="object-cover rounded-full"
                              unoptimized={true}
                          />
                        </div>
                      </div>

                      {/* Status Indicator */}
                      <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-black animate-pulse">
                        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
                      </div>
                    </div>
                  </div>

                  {/* Name and Title */}
                  <div className="mb-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-2">
                      ARAXYSO
                    </h1>
                    <div className="text-lg text-purple-300 mb-4 font-mono">
                      <span className="text-purple-400">$</span> whoami
                      <span className="animate-pulse">_</span>
                    </div>
                    <p className="text-purple-200/80 text-lg mb-4">software.engineer/reverse.engineer</p>
                  </div>

                  {/* Achievement Badges */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {achievements.map(({ icon: Icon, text, color }, index) => (
                        <div
                            key={text}
                            className={`flex items-center gap-2 p-3 bg-black/40 rounded-lg border border-purple-900/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-500/50 ${
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                          <Icon className={`h-4 w-4 ${color}`} />
                          <span className="text-sm text-purple-200/80">{text}</span>
                        </div>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    {socialLinks.map((social, index) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative overflow-hidden transition-all duration-300 hover:scale-110 ${
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                          <div
                              className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}
                          ></div>
                          <Button
                              variant="outline"
                              size="sm"
                              className="relative border-purple-900/40 bg-black/30 text-purple-200 hover:bg-transparent hover:border-transparent backdrop-blur-sm"
                          >
                            <social.icon className="h-4 w-4 mr-2" />
                            {social.name}
                          </Button>
                        </a>
                    ))}
                  </div>
                </div>

                {/* Right Side - Skills and Description */}
                <div className="lg:col-span-8 space-y-8">
                  {/* Description Card */}
                  <Card className="bg-black/40 border-purple-900/30 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-purple-300 mb-4 flex items-center">
                        <Terminal className="h-5 w-5 mr-2" />
                        About Me
                      </h2>
                      <p className="text-purple-200/80 leading-relaxed">
                        Hi, I&#39;m Zinedin, aka Zinny! I&#39;m 18 and passionate about development, especially reverse
                        engineering. I love coding and building projects, aiming to gain real industry experience and make
                        my mark in tech.
                      </p>
                    </div>
                  </Card>

                  {/* Core Competencies */}
                  <Card className="bg-black/40 border-purple-900/30 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-purple-300 mb-6 flex items-center">
                        <Cpu className="h-5 w-5 mr-2" />
                        Core Competencies
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { icon: Terminal, text: "Reverse Engineering", color: "text-red-400" },
                          { icon: Code2, text: "Software Development", color: "text-blue-400" },
                          { icon: Cpu, text: "System Architecture", color: "text-green-400" },
                          { icon: Wifi, text: "Network Security", color: "text-yellow-400" },
                          { icon: Shield, text: "Cybersecurity", color: "text-purple-400" },
                          { icon: Tool, text: "Mechanical Engineering", color: "text-pink-400" },
                          { icon: Brain, text: "AI/ML Engineering", color: "text-cyan-400" },
                          { icon: Layout, text: "Frontend Development", color: "text-orange-400" },
                          { icon: Database, text: "Backend Development", color: "text-emerald-400" },
                          { icon: Blocks, text: "Roblox Development", color: "text-red-500" },
                        ].map(({ icon: Icon, text, color }, index) => (
                            <div
                                key={text}
                                className={`group flex items-center gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-900/30 hover:border-purple-500/50 hover:bg-purple-900/30 transition-all duration-300 cursor-pointer ${
                                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                }`}
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                              <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                <Icon className={`h-4 w-4 ${color}`} />
                              </div>
                              <span className="text-sm text-purple-200/80 group-hover:text-purple-200 transition-colors">
                            {text}
                          </span>
                            </div>
                        ))}
                      </div>
                    </div>
                  </Card>
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

              <Link href="/games" className="group">
                <Card className="bg-black/40 border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 h-full">
                  <div className="p-5 flex flex-col h-full">
                    <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center mb-3">
                      <Gamepad2 className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="font-medium text-purple-200 mb-2">Game Library</h3>
                    <p className="text-purple-200/60 text-sm mb-3 flex-grow">
                      Browse my collection of games and gaming statistics.
                    </p>
                    <span className="text-purple-400 text-sm group-hover:text-purple-300 flex items-center">
                    View Games
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

        <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
      </div>
  )
}
