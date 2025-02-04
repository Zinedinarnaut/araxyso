import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string
    className?: string
    children: React.ReactNode
}

export const CyberButton: React.FC<CyberButtonProps> = ({ href, className, children, ...props }) => {
    const buttonClasses = cn(
        "relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 border-2 border-purple-500 rounded-md group",
        className,
    )

    const innerContent = (
        <>
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-purple-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-purple-500"></span>
            <span className="relative">{children}</span>
        </>
    )

    if (href) {
        return (
            <Link href={href} className={buttonClasses}>
                {innerContent}
            </Link>
        )
    }

    return (
        <button className={buttonClasses} {...props}>
            {innerContent}
        </button>
    )
}

