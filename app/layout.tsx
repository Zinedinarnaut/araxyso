import type React from "react"
import "./globals.css"
import { GeistMono } from "geist/font/mono"
import { cn } from "@/lib/utils"
import { Navigation } from "@/components/navigation"
import { ClientLayout } from "@/components/ClientLayout"

export const metadata = {
    title: "Araxyso - Cyberpunk Portfolio",
    description: "Personal website of Araxyso, software engineer and reverse engineering enthusiast",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
        <body className={cn(GeistMono.className, "min-h-screen bg-[#0a0a0b] text-white antialiased overflow-x-hidden")}>
        <ClientLayout>
            <div className="fixed inset-0 bg-[url('/grid.png')] bg-center opacity-20 [mask-image:linear-gradient(180deg,rgba(0,0,0,0.7)_10%,rgba(0,0,0,0.3)_100%)]" />
            <div className="relative">
                <div className="mx-auto max-w-7xl px-4">
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
