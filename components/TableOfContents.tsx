"use client"

import { useState, useEffect } from "react"
import { Link } from "lucide-react"

interface TableOfContentsProps {
    content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])

    useEffect(() => {
        const headingRegex = /^(#{1,3})\s+(.+)$/gm
        const matches = [...content.matchAll(headingRegex)]
        const parsedHeadings = matches.map((match) => ({
            id: match[2].toLowerCase().replace(/\s+/g, "-"),
            text: match[2],
            level: match[1].length,
        }))
        setHeadings(parsedHeadings)
    }, [content])

    return (
        <nav className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4 mb-8">
            <h2 className="text-lg font-semibold text-purple-200 mb-4">Table of Contents</h2>
            <ul className="space-y-2">
                {headings.map((heading) => (
                    <li key={heading.id} className={`${heading.level === 1 ? "ml-0" : heading.level === 2 ? "ml-4" : "ml-8"}`}>
                        <a
                            href={`#${heading.id}`}
                            className="text-purple-200/70 hover:text-purple-200 transition-colors flex items-center"
                        >
                            <Link className="h-4 w-4 mr-2" />
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

