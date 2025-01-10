import './globals.css'
import { GeistMono } from 'geist/font/mono'
import { cn } from '@/lib/utils'
import { Navigation } from '@/components/navigation'
import { ClientLayout } from '@/components/ClientLayout'

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
        <ClientLayout>
            <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,rgba(0,0,0,0.7)_10%,rgba(0,0,0,0.3)_100%)]" />
            <div className="relative">
                <div className="absolute top-0 z-[-1] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                <div className="mx-auto max-w-2xl px-4">
                    <Navigation />
                    <main>{children}</main>
                    <footer className="py-8 text-center text-sm text-purple-200/30">
                        <span className="font-mono">&lt;/&gt;</span> with
                        <span className="text-red-500/70"> ♥ </span>
                        by <span className="text-purple-400/50">Araxyso</span>
                    </footer>
                </div>
            </div>
        </ClientLayout>
        </body>
        </html>
    )
}

