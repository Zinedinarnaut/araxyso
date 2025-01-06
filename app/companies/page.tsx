import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function CompaniesPage() {
  return (
    <div className="py-12">
      <div className="mb-8 flex items-center gap-2">
        <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <span className="text-purple-200/50">back to home</span>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        My Companies
      </h1>

      <div className="space-y-6">
        <Card className="bg-black/50 border border-purple-900/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-purple-200">Nanite</CardTitle>
            <CardDescription className="text-purple-200/70">Pioneering nano-technology solutions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-purple-200/50">
              Nanite is at the forefront of nano-scale engineering, developing cutting-edge technologies that push the boundaries of what&#39;s possible at the molecular level.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border border-purple-900/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-purple-200">NanoD</CardTitle>
            <CardDescription className="text-purple-200/70">Revolutionizing digital experiences</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-purple-200/50">
              NanoD focuses on creating immersive digital experiences by leveraging nano-technology. We&#39;re bridging the gap between the physical and digital worlds in unprecedented ways.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

