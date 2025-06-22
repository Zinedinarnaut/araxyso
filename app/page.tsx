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
  Coffee,
  Headphones,
  Shield,
  Brain,
  Database,
  Layout,
  Blocks,
  PenToolIcon as Tool,
} from "lucide-react"
import { SpotifyNowPlaying } from "@/components/SpotifyNowPlaying"
import { GitHubBadges } from "@/components/GitHubBadges"

const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com/zinedinarnaut" },
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/zinedinarnaut" },
  { name: "Email", icon: Mail, url: "mailto:zinedinarnaut085@gmail.com" },
]

// Deterministic particle positions to avoid hydration issues
const particlePositions = [
  { left: 15, top: 25, delay: 2, duration: 12, color: 0 },
  { left: 75, top: 15, delay: 5, duration: 15, color: 1 },
  { left: 25, top: 65, delay: 1, duration: 10, color: 2 },
  { left: 85, top: 45, delay: 7, duration: 14, color: 0 },
  { left: 45, top: 85, delay: 3, duration: 11, color: 1 },
  { left: 65, top: 25, delay: 6, duration: 13, color: 2 },
  { left: 35, top: 55, delay: 4, duration: 16, color: 0 },
  { left: 55, top: 75, delay: 8, duration: 9, color: 1 },
]

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Fix hydration by only showing particles after mount
    setIsMounted(true)

    const video = videoRef.current
    if (video) {
      video.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }

    setTimeout(() => setIsVisible(true), 100)

    // Subtle glitch effect - less frequent
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 150)
    }, 15000) // Much less frequent

    return () => clearInterval(glitchInterval)
  }, [])

  return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Subtle Background Effects - Billie Style */}
        <div className="fixed inset-0 z-[-1]">
          {/* Dark gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

          {/* Subtle neon accents */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
          <div
              className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "3s" }}
          />
          <div
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "6s" }}
          />
        </div>

        {/* Minimal floating elements - Only render after mount to avoid hydration issues */}
        {isMounted && (
            <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
              {particlePositions.map((particle, i) => (
                  <div
                      key={i}
                      className="absolute animate-float-subtle"
                      style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
                      }}
                  >
                    <div
                        className={`w-1 h-1 rounded-full ${
                            particle.color === 0
                                ? "bg-emerald-400/30"
                                : particle.color === 1
                                    ? "bg-blue-400/30"
                                    : "bg-orange-400/30"
                        } animate-pulse`}
                    />
                  </div>
              ))}
            </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 pt-12 pb-20 max-w-6xl mx-auto px-4">
          {/* Billie-Inspired Profile Section */}
          <div
              className={`mb-16 transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            {/* Main Profile Card - Clean & Dark */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 shadow-2xl">
              {/* Subtle Header Banner */}
              <div className="relative h-32 overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                {/* Billie's signature neon accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

                {/* Status indicator */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full border border-emerald-400/30 text-emerald-400 text-xs font-medium">
                    ● online
                  </div>
                </div>

                {/* Subtle glitch effect */}
                {glitchActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10 animate-glitch-subtle" />
                )}
              </div>

              {/* Profile Content */}
              <div className="relative p-8">
                {/* Avatar & Info Section */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 -mt-16 mb-8">
                  {/* Clean Avatar */}
                  <div className="relative group">
                    {/* Subtle glow */}
                    <div className="absolute -inset-3 bg-emerald-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Avatar Container */}
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-emerald-400/50 bg-gray-900 shadow-xl">
                      <Image
                          src="/img.png"
                          alt="ARAXYSO"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                      />
                    </div>

                    {/* Status dot */}
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-400 rounded-full border-2 border-black shadow-lg">
                      <div className="w-full h-full rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                  </div>

                  {/* User Info - Clean Typography */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="mb-6">
                      {/* Name with subtle effect */}
                      <h1
                          className={`text-4xl lg:text-5xl font-bold mb-3 text-white ${glitchActive ? "animate-glitch-text-subtle" : ""}`}
                      >
                        ZINNY
                      </h1>

                      {/* Clean subtitle */}
                      <div className="text-lg text-emerald-400 mb-4 font-medium">
                        software engineer / reverse engineer
                      </div>

                      {/* Info tags - Billie's album colors */}
                      <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                        <div className="px-3 py-1 bg-emerald-400/10 border border-emerald-400/30 rounded-full text-emerald-400 text-sm font-medium">
                          <MapPin className="inline w-3 h-3 mr-1" />
                          Australia
                        </div>
                        <div className="px-3 py-1 bg-blue-400/10 border border-blue-400/30 rounded-full text-blue-400 text-sm font-medium">
                          <Calendar className="inline w-3 h-3 mr-1" />
                          Age 18
                        </div>
                        <div className="px-3 py-1 bg-orange-400/10 border border-orange-400/30 rounded-full text-orange-400 text-sm font-medium">
                          <Award className="inline w-3 h-3 mr-1" />
                          Est. 2020
                        </div>
                      </div>

                      {/* Clean Action Buttons */}
                      <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        <Button className="bg-emerald-400 hover:bg-emerald-500 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105">
                          <Coffee className="w-4 h-4 mr-2" />
                          Hire Me
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-transparent border-gray-600 text-gray-300 hover:border-emerald-400 hover:text-emerald-400 font-semibold px-6 py-2 rounded-full transition-all duration-300"
                        >
                          <Headphones className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Section - Clean */}
                <div className="mb-8 p-6 bg-gray-900/30 border border-gray-700 rounded-2xl backdrop-blur-sm">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Terminal className="h-5 w-5 mr-3 text-emerald-400" />
                    About
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    Hi, I&apos;m Zinedin, aka Zinny! I&apos;m 18 and passionate about development, especially reverse
                    engineering. I love coding and building projects, aiming to gain real industry experience and make my
                    mark in tech.
                    <span className="text-emerald-400 font-medium"> Life is Roblox! 🎮</span>
                  </p>
                </div>

                {/* Skills - Billie Style */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <Code2 className="h-5 w-5 mr-3 text-emerald-400" />
                    Core Competencies
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {[
                      { icon: Terminal, text: "Reverse Engineering", color: "emerald" },
                      { icon: Code2, text: "Software Development", color: "blue" },
                      { icon: Cpu, text: "System Architecture", color: "orange" },
                      { icon: Wifi, text: "Network Security", color: "emerald" },
                      { icon: Shield, text: "Cybersecurity", color: "blue" },
                      { icon: Tool, text: "Mechanical Engineering", color: "orange" },
                      { icon: Brain, text: "AI/ML Engineering", color: "emerald" },
                      { icon: Layout, text: "Frontend Development", color: "blue" },
                      { icon: Database, text: "Backend Development", color: "orange" },
                      { icon: Blocks, text: "Roblox Development", color: "emerald" },
                    ].map(({ icon: Icon, text, color }, _index) => (
                        <div
                            key={text}
                            className={`group relative p-3 bg-gray-900/30 border border-gray-700 rounded-lg backdrop-blur-sm hover:border-${color}-400/30 transition-all duration-300 hover:bg-gray-800/30 cursor-pointer ${
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                            style={{ transitionDelay: `${_index * 50}ms` }}
                        >
                          <div className="text-center">
                            <Icon
                                className={`h-5 w-5 mx-auto mb-2 text-gray-400 group-hover:text-${color}-400 transition-colors duration-300`}
                            />
                            <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors duration-300 leading-tight">
                          {text}
                        </span>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>

                {/* Social Links - Clean */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <Wifi className="h-5 w-5 mr-3 text-emerald-400" />
                    Connect
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {socialLinks.map((social, index) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-5 bg-gray-900/30 border border-gray-700 rounded-xl backdrop-blur-sm hover:border-emerald-400/30 transition-all duration-300 hover:bg-gray-800/30"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <social.icon className="w-6 h-6 text-gray-400 group-hover:text-emerald-400 transition-colors duration-300" />
                            <div className="text-lg font-bold text-emerald-400">
                              {index === 0 ? "127" : index === 1 ? "89" : "∞"}
                            </div>
                          </div>
                          <div className="text-white font-medium text-base mb-1">{social.name}</div>
                          <div className="text-gray-500 text-sm">Click to connect</div>
                        </a>
                    ))}
                  </div>
                </div>

                {/* GitHub Badges */}
                <div className="mt-8">
                  <GitHubBadges />
                </div>
              </div>
            </div>
          </div>

          {/* Now Playing Section */}
          <div className="mb-12">
            <h2 className="text-lg font-bold text-white mb-3 border-b border-gray-700 pb-2 flex items-center">
              <Music className="h-5 w-5 mr-2 text-emerald-400" />
              Now Playing
            </h2>
            <SpotifyNowPlaying />
          </div>

          {/* Quick Links */}
          <div className="mb-12">
            <h2 className="text-lg font-bold text-white mb-3 border-b border-gray-700 pb-2">Explore My Work</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/projects" className="group">
                <Card className="bg-gray-900/30 border border-gray-700 hover:border-emerald-400/30 transition-all duration-300 h-full hover:bg-gray-800/30">
                  <div className="p-5 flex flex-col h-full">
                    <div className="w-10 h-10 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center mb-3">
                      <Code2 className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h3 className="font-bold text-white mb-2">Projects</h3>
                    <p className="text-gray-400 text-sm mb-3 flex-grow">
                      Explore my software projects and technical work.
                    </p>
                    <span className="text-emerald-400 text-sm font-medium group-hover:text-emerald-300 flex items-center transition-colors">
                    View Projects
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </span>
                  </div>
                </Card>
              </Link>

              <Link href="/companies" className="group">
                <Card className="bg-gray-900/30 border border-gray-700 hover:border-blue-400/30 transition-all duration-300 h-full hover:bg-gray-800/30">
                  <div className="p-5 flex flex-col h-full">
                    <div className="w-10 h-10 rounded-full bg-blue-400/10 border border-blue-400/30 flex items-center justify-center mb-3">
                      <Cpu className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="font-bold text-white mb-2">Companies</h3>
                    <p className="text-gray-400 text-sm mb-3 flex-grow">
                      Discover the companies I&#39;ve founded and my work experience.
                    </p>
                    <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 flex items-center transition-colors">
                    View Companies
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </span>
                  </div>
                </Card>
              </Link>

              <Link href="/games" className="group">
                <Card className="bg-gray-900/30 border border-gray-700 hover:border-orange-400/30 transition-all duration-300 h-full hover:bg-gray-800/30">
                  <div className="p-5 flex flex-col h-full">
                    <div className="w-10 h-10 rounded-full bg-orange-400/10 border border-orange-400/30 flex items-center justify-center mb-3">
                      <Gamepad2 className="h-5 w-5 text-orange-400" />
                    </div>
                    <h3 className="font-bold text-white mb-2">Game Library</h3>
                    <p className="text-gray-400 text-sm mb-3 flex-grow">
                      Browse my collection of games and gaming statistics.
                    </p>
                    <span className="text-orange-400 text-sm font-medium group-hover:text-orange-300 flex items-center transition-colors">
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
            <h2 className="text-lg font-bold text-white mb-3 border-b border-gray-700 pb-2">Tags</h2>
            <div className="flex flex-wrap gap-3">
              {[
                "Nanite",
                "Retard",
                "Reverse Engineering",
                "Software Engineering",
                "Software Development",
                "Website Development",
              ].map((tag) => (
                  <Badge
                      key={tag}
                      className="bg-gray-900/30 text-gray-300 border border-gray-700 hover:border-emerald-400/30 hover:text-emerald-400 font-medium px-3 py-1 text-sm transition-all duration-300"
                  >
                    {tag}
                  </Badge>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float-subtle {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(180deg); }
          }

          @keyframes glitch-subtle {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(1px); }
          }

          @keyframes glitch-text-subtle {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-1px); }
            75% { transform: translateX(1px); }
          }

          .animate-float-subtle {
            animation: float-subtle 12s ease-in-out infinite;
          }

          .animate-glitch-subtle {
            animation: glitch-subtle 0.3s ease-in-out;
          }

          .animate-glitch-text-subtle {
            animation: glitch-text-subtle 0.3s ease-in-out;
          }
        `}</style>
      </div>
  )
}
