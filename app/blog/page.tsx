import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Calendar, User, ChevronRight } from "lucide-react"
import Link from "next/link"
import blogPosts from "@/data/blog-posts.json"
import type { BlogPost } from "@/types/types"

export const metadata = {
    title: "Blog | Araxyso",
    description: "Explore the latest insights on cybersecurity, AI, and technology",
}

export default function BlogPage() {
    return (
        <div className="py-12">
            <div className="mb-8 flex items-center gap-2">
                <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                    <ChevronLeft className="h-4 w-4"/>
                </Link>
                <span className="text-purple-200/50">back to home</span>
            </div>

            <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Journey Blog
            </h1>

            <div className="space-y-12">
                {(blogPosts as BlogPost[]).map((post) => (
                    <Card
                        key={post.id}
                        className="bg-black/50 border border-purple-900/20 hover:border-purple-500/50 transition-colors group overflow-hidden"
                    >
                        <div className="relative w-full h-[200px]">
                            <Image src={post.headerImage || "/placeholder.svg"} alt={post.title} fill
                                   className="object-cover"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"/>
                        </div>
                        <CardContent className="p-6 relative">
                            <Link href={`/blog/${post.id}`}>
                                <h2 className="text-2xl font-semibold text-purple-200 mb-2 group-hover:text-purple-100 transition-colors">
                                    {post.title}
                                </h2>
                            </Link>
                            <p className="text-purple-200/70 mb-4">{post.excerpt}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-purple-200/50">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4"/>
                                    {new Date(post.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="h-4 w-4"/>
                                    {post.author}
                                </div>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <Badge key={tag} variant="outline"
                                           className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                            <div className="mt-4 flex justify-end">
                                <Link
                                    href={`/blog/${post.id}`}
                                    className="text-purple-400 hover:text-purple-300 transition-colors flex items-center"
                                >
                                    Read more
                                    <ChevronRight className="ml-1 h-4 w-4"/>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

