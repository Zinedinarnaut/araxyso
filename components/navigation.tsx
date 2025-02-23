"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"

const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    {
        name: "Journey",
        children: [{ name: "Blog", path: "/blog" }, { name: "Companies", path: "/companies" }, { name: "Changelogs", path: "/changelogs" },{ name: "Progress", path: "/progress" }],
    },
    {
        name: "Pc",
        children: [
            { name: "Lab", path: "/lab" },
            { name: "Games", path: "/games" },
            { name: "Server status", path: "/server-status" },
            { name: "Cheats", path: "/cheats" },
        ],
    },
    { name: "Anime&Manga", path: "/anime" },
]

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const pathname = usePathname()

    const handleDropdownToggle = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name)
    }

    return (
        <header className="py-4 border-b border-purple-900/20 relative z-40">
            <nav className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="h-6 w-6 bg-purple-500/20 rounded-sm border border-purple-500/30 group-hover:border-purple-500/60 transition-colors" />
                    <span className="font-medium text-purple-200/70 group-hover:text-purple-200 transition-colors">
            araxyso.dev
          </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-6 items-center">
                    {navItems.map((item) =>
                        item.children ? (
                            <div key={item.name} className="relative group">
                                <button
                                    onClick={() => handleDropdownToggle(item.name)}
                                    className="text-sm text-purple-200/50 hover:text-purple-200 transition-colors flex items-center gap-1"
                                >
                                    {item.name}
                                    <ChevronDown
                                        size={14}
                                        className={`transform transition-transform ${openDropdown === item.name ? "rotate-180" : ""}`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openDropdown === item.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-0 mt-2 w-40 bg-black/90 border border-purple-500/30 rounded-md overflow-hidden z-50"
                                        >
                                            {item.children.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.path}
                                                    className={`block px-4 py-2 text-sm ${
                                                        pathname === subItem.path
                                                            ? "bg-purple-500/20 text-purple-200"
                                                            : "text-purple-200/50 hover:bg-purple-500/10 hover:text-purple-200"
                                                    } transition-colors`}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`text-sm ${
                                    pathname === item.path ? "text-purple-200" : "text-purple-200/50"
                                } hover:text-purple-200 transition-colors relative group`}
                            >
                                {item.name}
                                <span className="absolute -bottom-px left-0 h-px w-0 bg-purple-500 group-hover:w-full transition-all" />
                            </Link>
                        ),
                    )}
                </div>

                {/* Mobile Navigation Toggle */}
                <button
                    className="md:hidden text-purple-200 hover:text-purple-100 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Navigation Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden mt-4"
                    >
                        <div className="flex flex-col space-y-2">
                            {navItems.map((item) =>
                                item.children ? (
                                    <div key={item.name}>
                                        <button
                                            onClick={() => handleDropdownToggle(item.name)}
                                            className="w-full text-left text-sm py-2 px-4 rounded-md text-purple-200/50 hover:bg-purple-500/10 transition-colors flex items-center justify-between"
                                        >
                                            {item.name}
                                            <ChevronDown
                                                size={14}
                                                className={`transform transition-transform ${openDropdown === item.name ? "rotate-180" : ""}`}
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {openDropdown === item.name && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="pl-4 relative z-50"
                                                >
                                                    {item.children.map((subItem) => (
                                                        <Link
                                                            key={subItem.name}
                                                            href={subItem.path}
                                                            className={`block py-2 px-4 text-sm rounded-md ${
                                                                pathname === subItem.path
                                                                    ? "bg-purple-500/20 text-purple-200"
                                                                    : "text-purple-200/50 hover:bg-purple-500/10 hover:text-purple-200"
                                                            } transition-colors`}
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link
                                        key={item.name}
                                        href={item.path}
                                        className={`text-sm py-2 px-4 rounded-md ${
                                            pathname === item.path
                                                ? "bg-purple-500/20 text-purple-200"
                                                : "text-purple-200/50 hover:bg-purple-500/10 hover:text-purple-200"
                                        } transition-colors`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ),
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

