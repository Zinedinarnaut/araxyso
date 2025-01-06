import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Terminal, Code2, Cpu, Wifi } from 'lucide-react'

export default function Home() {
  return (
      <div className="py-12">
        <div className="relative">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                ARAXYSO
              </h1>
              <div className="space-y-1">
                <p className="text-purple-200/70 text-sm">software.engineer/reverse.engineer</p>
                <p className="text-purple-200/50 text-sm">lvl 17 | code breaker | nano.innovator</p>
              </div>
            </div>
            <div className="relative group">
              <div
                  className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"/>
              <Image
                  src="/download.jpg"
                  alt="Profile"
                  width={80}
                  height={80}
                  className="relative rounded-lg border border-purple-500/20 bg-black"
              />
            </div>
          </div>

          <Card className="bg-black/50 border border-purple-900/20 p-6 backdrop-blur-sm">
            <div className="space-y-6">
              <p className="text-purple-200/70">Young prodigy specializing in software engineering and reverse
                engineering, pushing the boundaries of nano-technology.</p>

              <div>
                <p className="text-purple-200/70 mb-3">Core competencies:</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {icon: Terminal, text: "Reverse Engineering"},
                    {icon: Code2, text: "Software Development"},
                    {icon: Cpu, text: "Nano-Technology"},
                    {icon: Wifi, text: "System Architecture"}
                  ].map(({icon: Icon, text}) => (
                      <div key={text} className="flex items-center gap-2 text-sm text-purple-200/50">
                        <Icon className="h-4 w-4 text-purple-500/70"/>
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
                {['GitHub', 'LinkedIn', 'Twitter', 'Email'].map((social) => (
                    <Button
                        key={social}
                        variant="outline"
                        size="sm"
                        className="border-purple-900/20 bg-black/50 text-purple-200/70 hover:text-purple-200 hover:border-purple-500/50 transition-colors"
                    >
                      {social}
                    </Button>
                ))}
              </div>
            </div>
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
              NanoD
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
          </div>
        </div>
      </div>
  )
}