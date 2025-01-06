import '@/styles/globals.css'
import { GeistMono } from 'geist/font/mono'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'Araxyso - Cyberpunk Portfolio',
  description: 'Personal website of Araxyso, software engineer and reverse engineering enthusiast',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(GeistMono.className, "min-h-screen bg-[#0a0a0b] text-white antialiased")}>
        <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,rgba(0,0,0,0.7)_10%,rgba(0,0,0,0.3)_100%)]" />
        <div className="relative">
          <div className="absolute top-0 z-[-1] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
          <div className="mx-auto max-w-2xl px-4">
            <header className="flex items-center justify-between py-4 border-b border-purple-900/20">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="h-6 w-6 bg-purple-500/20 rounded-sm border border-purple-500/30 group-hover:border-purple-500/60 transition-colors" />
                <span className="font-medium text-purple-200/70 group-hover:text-purple-200 transition-colors">
                  araxyso.dev
                </span>
              </Link>
              <nav className="flex gap-6">
                {['home', 'projects', 'companies'].map((item) => (
                  <Link
                    key={item}
                    href={item === 'home' ? '/' : `/${item}`}
                    className="text-sm text-purple-200/50 hover:text-purple-200 transition-colors relative group"
                  >
                    {item}
                    <span className="absolute -bottom-px left-0 h-px w-0 bg-purple-500 group-hover:w-full transition-all" />
                  </Link>
                ))}
              </nav>
            </header>
            <main>{children}</main>
            <footer className="py-8 text-center text-sm text-purple-200/30">
              <span className="font-mono">&lt;/&gt;</span> with 
              <span className="text-red-500/70"> ♥ </span> 
              by <span className="text-purple-400/50">Araxyso</span>
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}

