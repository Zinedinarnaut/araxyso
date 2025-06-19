"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import {
  Terminal,
  Code2,
  Cpu,
  Linkedin,
  Mail,
  Github,
  ExternalLink,
  Music,
  Gamepad2,
  MapPin,
  Calendar,
  Award,
  Wifi,
  Star,
  Activity,
  Users,
  Coffee,
  Headphones,
  Code,
  Shield,
  Brain,
  Database,
  Layout,
  Blocks,
  PenToolIcon as Tool,
} from "lucide-react"
import { SpotifyNowPlaying } from "@/components/SpotifyNowPlaying"

const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com/zinedinarnaut" },
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/zinedinarnaut" },
  { name: "Email", icon: Mail, url: "mailto:inquiries@nanite.tech" },
]

const stats = [
  { label: "Projects", value: "42", icon: Code },
  { label: "Commits", value: "1.2k", icon: Activity },
  { label: "Stars", value: "89", icon: Star },
  { label: "Followers", value: "156", icon: Users },
]

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }

    setTimeout(() => setIsVisible(true), 100)

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 8000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Y2K Background Effects */}
        <div className="fixed inset-0 z-[-1]">
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-20">
            <div
                className="absolute inset-0 bg-gradient-to-r from-lime-400/20 via-cyan-400/20 to-pink-400/20"
                style={{
                  backgroundImage: `
                linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
              `,
                  backgroundSize: "50px 50px",
                  animation: "matrix-rain 15s linear infinite",
                }}
            />
          </div>

          {/* Neon Glow Orbs */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl animate-pulse" />
          <div
              className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
          />
          <div
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "4s" }}
          />
        </div>

        {/* Floating Y2K Elements */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
              <div
                  key={i}
                  className="absolute animate-float-y2k"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 10}s`,
                    animationDuration: `${5 + Math.random() * 10}s`,
                  }}
              >
                <div
                    className={`w-2 h-2 rounded-full ${
                        i % 3 === 0 ? "bg-lime-400" : i % 3 === 1 ? "bg-cyan-400" : "bg-pink-400"
                    } shadow-lg animate-pulse`}
                    style={{
                      boxShadow: `0 0 20px ${i % 3 === 0 ? "#84cc16" : i % 3 === 1 ? "#06b6d4" : "#ec4899"}`,
                    }}
                />
              </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 pt-12 pb-20 max-w-6xl mx-auto px-4">
          {/* Y2K Profile Section */}
          <div
              className={`mb-16 transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            {/* Main Y2K Profile Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black via-gray-900 to-black border-2 border-lime-400/30 shadow-2xl">
              {/* Chrome Header Banner */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-r from-lime-400 via-cyan-400 to-pink-400 animate-gradient-shift">
                {/* Metallic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />

                {/* Digital Rain Effect */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23000%22%20fillOpacity%3D%220.1%22%3E%3Cpath%20d%3D%22M20%200v40M0%2020h40%22/%3E%3C/g%3E%3C/svg%3E')] animate-pulse" />
                </div>

                {/* Y2K Status Badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-lime-400/50 text-lime-400 text-xs font-bold animate-pulse">
                    ● ONLINE
                  </div>
                  <div className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-cyan-400/50 text-cyan-400 text-xs font-bold">
                    Y2K MODE
                  </div>
                </div>

                {/* Glitch Effect Overlay */}
                {glitchActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-blue-500/20 animate-glitch" />
                )}
              </div>

              {/* Profile Content */}
              <div className="relative p-8">
                {/* Avatar Section */}
                <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8 -mt-20 mb-8">
                  {/* Y2K Avatar */}
                  <div className="relative group">
                    {/* Neon Ring */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-lime-400 via-cyan-400 to-pink-400 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

                    {/* Chrome Ring */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-gray-300 via-white to-gray-300 rounded-full animate-spin-slow opacity-80" />

                    {/* Avatar Container */}
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-lime-400 bg-black shadow-2xl">
                      <Image
                          src="/img.png"
                          alt="ARAXYSO"
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500 saturate-150 contrast-125"
                          unoptimized
                      />

                      {/* Holographic Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-lime-400/20 via-transparent to-pink-400/20 animate-pulse" />
                    </div>

                    {/* Digital Status */}
                    <div className="absolute bottom-2 right-2 w-8 h-8 bg-lime-400 rounded-full border-4 border-black shadow-lg animate-bounce">
                      <div className="w-full h-full rounded-full bg-gradient-to-r from-lime-300 to-lime-500 animate-pulse" />
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 text-center lg:text-left lg:mb-4">
                    <div className="mb-6">
                      {/* Glitch Name Effect */}
                      <h1 className={`text-5xl lg:text-6xl font-black mb-4 ${glitchActive ? "animate-glitch-text" : ""}`}>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-cyan-400 to-pink-400 drop-shadow-2xl">
                        ARAXYSO
                      </span>
                      </h1>

                      {/* Y2K Subtitle */}
                      <div className="text-xl font-bold text-lime-400 mb-2 font-mono tracking-wider">
                        &gt; software.engineer/reverse.engineer_
                      </div>

                      {/* Digital Info Tags */}
                      <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                        <div className="px-3 py-1 bg-gradient-to-r from-lime-400/20 to-cyan-400/20 border border-lime-400/50 rounded-full text-lime-400 text-sm font-bold backdrop-blur-sm">
                          <MapPin className="inline w-3 h-3 mr-1" />
                          AUS
                        </div>
                        <div className="px-3 py-1 bg-gradient-to-r from-cyan-400/20 to-pink-400/20 border border-cyan-400/50 rounded-full text-cyan-400 text-sm font-bold backdrop-blur-sm">
                          <Calendar className="inline w-3 h-3 mr-1" />
                          AGE.18
                        </div>
                        <div className="px-3 py-1 bg-gradient-to-r from-pink-400/20 to-lime-400/20 border border-pink-400/50 rounded-full text-pink-400 text-sm font-bold backdrop-blur-sm">
                          <Award className="inline w-3 h-3 mr-1" />
                          EST.2020
                        </div>
                      </div>

                      {/* Y2K Stats Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {stats.map((stat, index) => (
                            <div key={stat.label} className="group cursor-pointer">
                              <div className="p-4 bg-gradient-to-br from-black/80 to-gray-900/80 border border-lime-400/30 rounded-2xl backdrop-blur-sm hover:border-lime-400/60 transition-all duration-300 hover:scale-105">
                                <div className="text-center">
                                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-lime-400 group-hover:text-cyan-400 transition-colors" />
                                  <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-cyan-400">
                                    {stat.value}
                                  </div>
                                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                                    {stat.label}
                                  </div>
                                </div>
                              </div>
                            </div>
                        ))}
                      </div>

                      {/* Y2K Action Buttons */}
                      <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        <Button className="bg-gradient-to-r from-lime-400 to-cyan-400 hover:from-lime-500 hover:to-cyan-500 text-black font-black px-6 py-3 rounded-full border-2 border-lime-400/50 shadow-lg hover:shadow-lime-400/25 transition-all duration-300 hover:scale-105">
                          <Coffee className="w-4 h-4 mr-2" />
                          HIRE.ME
                        </Button>
                        <Button className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-black font-black px-6 py-3 rounded-full border-2 border-pink-400/50 shadow-lg hover:shadow-pink-400/25 transition-all duration-300 hover:scale-105">
                          <Headphones className="w-4 h-4 mr-2" />
                          CONTACT
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div className="mb-8 p-6 bg-gradient-to-r from-black/60 via-gray-900/60 to-black/60 border border-lime-400/30 rounded-2xl backdrop-blur-sm">
                  <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-cyan-400 mb-4 flex items-center">
                    <Terminal className="h-6 w-6 mr-3 text-lime-400" />
                    ABOUT.EXE
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Hi, I'm Zinedin, aka Zinny! I'm 18 and passionate about development, especially reverse engineering. I
                    love coding and building projects, aiming to gain real industry experience and make my mark in tech.
                    <span className="text-lime-400 font-bold"> Life is Roblox! 🎮</span>
                  </p>
                </div>

                {/* Core Competencies Y2K Style */}
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-6 flex items-center">
                    <Code2 className="h-6 w-6 mr-3 text-cyan-400" />
                    CORE.COMPETENCIES
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                      { icon: Terminal, text: "Reverse Engineering", color: "from-lime-400 to-cyan-400" },
                      { icon: Code2, text: "Software Development", color: "from-cyan-400 to-pink-400" },
                      { icon: Cpu, text: "System Architecture", color: "from-pink-400 to-lime-400" },
                      { icon: Wifi, text: "Network Security", color: "from-lime-400 to-pink-400" },
                      { icon: Shield, text: "Cybersecurity", color: "from-cyan-400 to-lime-400" },
                      { icon: Tool, text: "Mechanical Engineering", color: "from-pink-400 to-cyan-400" },
                      { icon: Brain, text: "AI/ML Engineering", color: "from-lime-400 to-cyan-400" },
                      { icon: Layout, text: "Frontend Development", color: "from-cyan-400 to-pink-400" },
                      { icon: Database, text: "Backend Development", color: "from-pink-400 to-lime-400" },
                      { icon: Blocks, text: "Roblox Development", color: "from-lime-400 to-pink-400" },
                    ].map(({ icon: Icon, text, color }, index) => (
                        <div
                            key={text}
                            className={`group relative overflow-hidden p-4 bg-gradient-to-br from-black/80 to-gray-900/80 border-2 border-lime-400/30 rounded-xl backdrop-blur-sm hover:border-lime-400/60 transition-all duration-300 hover:scale-105 cursor-pointer ${
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                          {/* Neon Glow Background */}
                          <div
                              className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                          />

                          {/* Icon Container */}
                          <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${color} p-0.5`}>
                            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                              <Icon className="h-6 w-6 text-lime-400 group-hover:text-cyan-400 transition-colors duration-300" />
                            </div>
                          </div>

                          {/* Text */}
                          <div className="text-center">
                        <span className="text-sm font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-lime-400 group-hover:to-cyan-400 transition-all duration-300 leading-tight">
                          {text.toUpperCase()}
                        </span>
                          </div>

                          {/* Hover Effect Lines */}
                          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-lime-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    ))}
                  </div>
                </div>

                {/* Social Links Y2K Style */}
                <div>
                  <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-lime-400 mb-6 flex items-center">
                    <Wifi className="h-6 w-6 mr-3 text-pink-400" />
                    CONNECT.NET
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {socialLinks.map((social, index) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative overflow-hidden p-6 bg-gradient-to-br from-black/80 to-gray-900/80 border-2 border-lime-400/30 rounded-2xl backdrop-blur-sm hover:border-lime-400/60 transition-all duration-300 hover:scale-105"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <social.icon className="w-8 h-8 text-lime-400 group-hover:text-cyan-400 transition-colors duration-300" />
                            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-cyan-400">
                              {index === 0 ? "127" : index === 1 ? "89" : "∞"}
                            </div>
                          </div>
                          <div className="text-white font-bold text-lg mb-1">{social.name}</div>
                          <div className="text-gray-400 text-sm font-mono">CLICK.TO.CONNECT</div>

                          {/* Hover Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-lime-400/10 via-cyan-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Now Playing Section */}
          <div className="mb-12">
            <h2 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-cyan-400 mb-3 border-b-2 border-lime-400/30 pb-2 flex items-center">
              <Music className="h-5 w-5 mr-2 text-lime-400" />
              SPOTIFY.STATUS
            </h2>
            <SpotifyNowPlaying />
          </div>

          {/* Quick Links */}
          <div className="mb-12">
            <h2 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-3 border-b-2 border-cyan-400/30 pb-2">
              EXPLORE.MY.WORK
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/projects" className="group">
                <Card className="bg-gradient-to-br from-black/80 to-gray-900/80 border-2 border-lime-400/30 hover:border-lime-400/60 transition-all duration-300 h-full hover:scale-105">
                  <div className="p-5 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-lime-400/20 to-cyan-400/20 border border-lime-400/50 flex items-center justify-center mb-3">
                      <Code2 className="h-6 w-6 text-lime-400" />
                    </div>
                    <h3 className="font-black text-white mb-2 text-lg">PROJECTS</h3>
                    <p className="text-gray-400 text-sm mb-3 flex-grow">
                      Explore my software projects and technical work.
                    </p>
                    <span className="text-lime-400 text-sm font-bold group-hover:text-cyan-400 flex items-center transition-colors">
                    VIEW.PROJECTS
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </span>
                  </div>
                </Card>
              </Link>

              <Link href="/companies" className="group">
                <Card className="bg-gradient-to-br from-black/80 to-gray-900/80 border-2 border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 h-full hover:scale-105">
                  <div className="p-5 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400/20 to-pink-400/20 border border-cyan-400/50 flex items-center justify-center mb-3">
                      <Cpu className="h-6 w-6 text-cyan-400" />
                    </div>
                    <h3 className="font-black text-white mb-2 text-lg">COMPANIES</h3>
                    <p className="text-gray-400 text-sm mb-3 flex-grow">
                      Discover the companies I've founded and my work experience.
                    </p>
                    <span className="text-cyan-400 text-sm font-bold group-hover:text-pink-400 flex items-center transition-colors">
                    VIEW.COMPANIES
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </span>
                  </div>
                </Card>
              </Link>

              <Link href="/games" className="group">
                <Card className="bg-gradient-to-br from-black/80 to-gray-900/80 border-2 border-pink-400/30 hover:border-pink-400/60 transition-all duration-300 h-full hover:scale-105">
                  <div className="p-5 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400/20 to-lime-400/20 border border-pink-400/50 flex items-center justify-center mb-3">
                      <Gamepad2 className="h-6 w-6 text-pink-400" />
                    </div>
                    <h3 className="font-black text-white mb-2 text-lg">GAME.LIBRARY</h3>
                    <p className="text-gray-400 text-sm mb-3 flex-grow">
                      Browse my collection of games and gaming statistics.
                    </p>
                    <span className="text-pink-400 text-sm font-bold group-hover:text-lime-400 flex items-center transition-colors">
                    VIEW.GAMES
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </span>
                  </div>
                </Card>
              </Link>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h2 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-lime-400 mb-3 border-b-2 border-pink-400/30 pb-2">
              TAGS.SYS
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                "Nanite",
                "Retard",
                "Reverse Engineering",
                "Software Engineering",
                "Software Development",
                "Website Development",
              ].map((tag, index) => (
                  <Badge
                      key={tag}
                      className="bg-gradient-to-r from-black/80 to-gray-900/80 text-lime-400 border-2 border-lime-400/30 hover:border-lime-400/60 font-bold px-4 py-2 text-sm transition-all duration-300 hover:scale-105"
                  >
                    {tag.toUpperCase()}
                  </Badge>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes matrix-rain {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }

          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          @keyframes float-y2k {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-20px) rotate(90deg); }
            50% { transform: translateY(-10px) rotate(180deg); }
            75% { transform: translateY(-30px) rotate(270deg); }
          }

          @keyframes glitch {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-2px); }
            40% { transform: translateX(2px); }
            60% { transform: translateX(-2px); }
            80% { transform: translateX(2px); }
          }

          @keyframes glitch-text {
            0%, 100% { transform: translateX(0); }
            10% { transform: translateX(-2px) skewX(-5deg); }
            20% { transform: translateX(2px) skewX(5deg); }
            30% { transform: translateX(-1px) skewX(-2deg); }
            40% { transform: translateX(1px) skewX(2deg); }
            50% { transform: translateX(-2px) skewX(-5deg); }
            60% { transform: translateX(2px) skewX(5deg); }
            70% { transform: translateX(-1px) skewX(-2deg); }
            80% { transform: translateX(1px) skewX(2deg); }
            90% { transform: translateX(-2px) skewX(-5deg); }
          }

          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .animate-gradient-shift {
            background-size: 200% 200%;
            animation: gradient-shift 4s ease infinite;
          }

          .animate-shimmer {
            animation: shimmer 2s ease-in-out infinite;
          }

          .animate-float-y2k {
            animation: float-y2k 8s ease-in-out infinite;
          }

          .animate-glitch {
            animation: glitch 0.2s ease-in-out;
          }

          .animate-glitch-text {
            animation: glitch-text 0.5s ease-in-out;
          }

          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
        `}</style>
      </div>
  )
}
