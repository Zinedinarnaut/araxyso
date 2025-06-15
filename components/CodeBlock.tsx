"use client"

import { useState } from "react"
import { Check, Copy, Play, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
    code: string
    language: string
    title?: string
    filename?: string
    runnable?: boolean
    className?: string
}

export function CodeBlock({ code, language, title, filename, runnable = false, className }: CodeBlockProps) {
    const [copied, setCopied] = useState(false)
    const [output, setOutput] = useState<string | null>(null)
    const [isRunning, setIsRunning] = useState(false)

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const runCode = () => {
        setIsRunning(true)
        // Simulate code execution
        setTimeout(() => {
            if (language === "rust" && code.includes("fn encrypt")) {
                setOutput("Enter text to encrypt:\nHello, World!\nEnter shift value:\n3\nEncrypted: Khoor, Zruog!")
            } else {
                setOutput("Program executed successfully!")
            }
            setIsRunning(false)
        }, 1000)
    }

    return (
        <div className={cn("rounded-lg overflow-hidden bg-zinc-900/50 border border-purple-500/30", className)}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-purple-500/20">
                <div className="flex items-center gap-2">
                    {language === "rust" && <Terminal size={16} className="text-purple-400" />}
                    <span className="text-sm font-mono text-purple-300">{title || filename || language}</span>
                </div>
                <div className="flex items-center gap-2">
                    {runnable && (
                        <button
                            onClick={runCode}
                            disabled={isRunning}
                            className="p-1.5 rounded hover:bg-purple-500/20 text-purple-400 transition-colors"
                            aria-label="Run code"
                        >
                            <Play size={14} />
                        </button>
                    )}
                    <button
                        onClick={copyToClipboard}
                        className="p-1.5 rounded hover:bg-purple-500/20 text-purple-400 transition-colors"
                        aria-label="Copy code"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                </div>
            </div>

            {/* Code content */}
            <pre className="p-4 overflow-x-auto text-sm font-mono text-purple-200/90 leading-relaxed">
        <code>{code}</code>
      </pre>

            {/* Output */}
            {output && (
                <div className="border-t border-purple-500/20 bg-black/30">
                    <div className="px-4 py-2 text-xs text-purple-400 border-b border-purple-500/20">Output</div>
                    <pre className="p-4 overflow-x-auto text-sm font-mono text-green-400/90 whitespace-pre-wrap">{output}</pre>
                </div>
            )}
        </div>
    )
}
