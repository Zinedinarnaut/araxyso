import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import type { BlogPost } from "@/types/types"

interface RelatedPostsProps {
    posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-purple-200 mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Card
                        key={post.id}
                        className="bg-black/50 border border-purple-900/20 hover:border-purple-500/50 transition-colors group overflow-hidden"
                    >
                        <div className="relative w-full h-40">
                            <Image src={post.headerImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        </div>
                        <CardContent className="p-4">
                            <Link href={`/blog/${post.id}`}>
                                <h3 className="text-lg font-semibold text-purple-200 mb-2 group-hover:text-purple-100 transition-colors">
                                    {post.title}
                                </h3>
                            </Link>
                            <p className="text-purple-200/70 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                            <Link
                                href={`/blog/${post.id}`}
                                className="text-purple-400 hover:text-purple-300 transition-colors flex items-center text-sm"
                            >
                                Read more
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

