import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import Link from "next/link"
import { Terminal, Code2, Cpu, Wifi, Linkedin, Mail, Github, Zap } from 'lucide-react'
import { SpotifyNowPlaying } from "@/components/SpotifyNowPlaying"

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/zinedinarnaut' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/zinedinarnaut' },
  { name: 'Email', icon: Mail, url: 'mailto:inquiries@nanite.tech' },
]

const skills = [
  { name: "Reverse Engineering", progress: 35 },
  { name: "Software Development", progress: 85 },
  { name: "Web Development", progress: 85 },
  { name: "System Architecture", progress: 75 },
]

export default function Home() {
  return (
      <div className="py-12 space-y-12">
        <div className="relative">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                ARAXYSO
              </h1>
              <div className="space-y-1">
                <p className="text-purple-200/70 text-sm">software.engineer/reverse.engineer</p>
                <p className="text-purple-200/50 text-sm">Age 18 | code breaker | nano.innovator</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <Image
                  src="/izumo-tenka-tenka-izumo.gif"
                  alt="Profile"
                  width={80}
                  height={80}
                  className="relative rounded-lg border border-purple-500/20 bg-black"
              />
            </div>
          </div>

          <Card className="bg-black/50 border border-purple-900/20 p-6 backdrop-blur-sm">
            <div className="space-y-6">
              <p className="text-purple-200/70">Young prodigy specializing in software engineering and reverse engineering, pushing the boundaries of future technology.</p>

              <div>
                <p className="text-purple-200/70 mb-3">Core competencies:</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Terminal, text: "Reverse Engineering" },
                    { icon: Code2, text: "Software Development" },
                    { icon: Cpu, text: "Website Development" },
                    { icon: Wifi, text: "System Architecture" }
                  ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2 text-sm text-purple-200/50">
                        <Icon className="h-4 w-4 text-purple-500/70" />
                        {text}
                      </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-purple-200/70 mb-3">Current project status:</p>
                <p className="text-purple-200/50 text-sm">Innovating at the nanoscale... [Progress: Ongoing]</p>
              </div>
            </div>
          </Card>

          <div className="mt-8 space-y-6">
            <div>
              <h2 className="text-sm font-medium text-purple-200/70 mb-3">Explore My Work</h2>
              <div className="flex gap-3">
                <Link href="/projects" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Projects
                </Link>
                {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                <span className="text-purple-200/20">//</span>
                <Link href="/companies" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Companies
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-medium text-purple-200/70 mb-3">Connect With Me</h2>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                    <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                      <Button
                          variant="outline"
                          size="sm"
                          className="border-purple-900/20 bg-black/50 text-purple-200/70 hover:text-purple-200 hover:border-purple-500/50 transition-colors"
                      >
                        <social.icon className="h-4 w-4 mr-2"/>
                        {social.name}
                      </Button>
                    </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-medium text-purple-200/70 mb-3">Now Playing</h2>
            <SpotifyNowPlaying/>
          </div>

          <div className="mt-12">
            <h2 className="text-sm font-medium text-purple-200/70 mb-3">Skills</h2>
            <div className="space-y-4">
              {skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-200/70">{skill.name}</span>
                      <span className="text-purple-200/50">{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
              ))}
            </div>
          </div>

{/*          <div className="mt-12">
            <h2 className="text-sm font-medium text-purple-200/70 mb-3">Featured Project</h2>
            <Card className="bg-black/50 border border-purple-900/20 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-purple-200 mb-2">NanoInject</h3>
              <p className="text-purple-200/70 mb-4">Advanced memory manipulation tool with real-time pattern scanning and signature-based detection avoidance.</p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Badge variant="outline" className="border-purple-900/20 bg-black/50 text-purple-200/50">
                    C++
                  </Badge>
                  <Badge variant="outline" className="border-purple-900/20 bg-black/50 text-purple-200/50">
                    Reverse Engineering
                  </Badge>
                </div>
                <Link href="/projects/nanoinject" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center">
                  View Project <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </Card>
          </div>*/}

          <div className="mt-12">
            <Card className="bg-black/50 border border-purple-900/20 p-6 backdrop-blur-sm">
              <div className="flex items-start space-x-4">
                <Zap className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                <blockquote className="text-purple-200/70 italic">
                  “Don’t compare your chapter 1 to someone else’s chapter 20.”
                  <footer className="text-purple-200/50 text-sm mt-2">- Someone</footer>
                </blockquote>
              </div>
            </Card>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Badge
                variant="outline"
                className="border-purple-900/20 bg-black/50 text-purple-200/50"
            >
              Nanite
            </Badge>
            <Badge
                variant="outline"
                className="border-purple-900/20 bg-black/50 text-purple-200/50"
            >
              Retard
            </Badge>
            <Badge
                variant="outline"
                className="border-purple-900/20 bg-black/50 text-purple-200/50"
            >
              Reverse Engineering
            </Badge>
            <Badge
                variant="outline"
                className="border-purple-900/20 bg-black/50 text-purple-200/50"
            >
              Software Engineering
            </Badge>
            <Badge
                variant="outline"
                className="border-purple-900/20 bg-black/50 text-purple-200/50"
            >
              Software Development
            </Badge>
            <Badge
                variant="outline"
                className="border-purple-900/20 bg-black/50 text-purple-200/50"
            >
              Website Development
            </Badge>
          </div>
        </div>
      </div>
  )
}

