import Link from "next/link"
import Image from "next/image"
import { blogPosts } from "@/data/blog-posts"

export default function BlogPage() {
    // Sort posts by date (newest first)
    const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Featured post is the newest one
    const featuredPost = sortedPosts[0]
    const regularPosts = sortedPosts.slice(1)

    return (
        <main className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-purple-200 mb-8 glitch-text">Blog</h1>

            {/* Featured post */}
            <div className="mb-16">
                <h2 className="text-xl font-semibold text-purple-300 mb-6">Featured Post</h2>
                <Link href={`/blog/${featuredPost.id}`} className="block group">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-900/50 rounded-xl overflow-hidden border border-purple-500/30 hover:border-purple-500/50 transition-colors">
                        <div className="relative h-64 md:h-auto md:col-span-1">
                            <Image
                                src={featuredPost.headerImage || "/placeholder.svg"}
                                alt={featuredPost.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6 md:col-span-2">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {featuredPost.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-xs font-medium bg-purple-500/30 text-purple-200 rounded-full border border-purple-500/40"
                                    >
                    {tag}
                  </span>
                                ))}
                            </div>
                            <h3 className="text-2xl font-bold text-purple-200 mb-3 group-hover:text-purple-400 transition-colors">
                                {featuredPost.title}
                            </h3>
                            <p className="text-purple-200/70 mb-4">{featuredPost.excerpt}</p>
                            <div className="flex items-center text-sm text-purple-300/60">
                                <span>{featuredPost.author}</span>
                                <span className="mx-2">•</span>
                                <span>{featuredPost.date}</span>
                                {featuredPost.readingTime && (
                                    <>
                                        <span className="mx-2">•</span>
                                        <span>{featuredPost.readingTime} min read</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Regular posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`} className="block group">
                        <div className="bg-zinc-900/50 rounded-xl overflow-hidden border border-purple-500/30 hover:border-purple-500/50 transition-colors h-full flex flex-col">
                            <div className="relative h-48">
                                <Image src={post.headerImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {post.tags.slice(0, 2).map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 text-xs font-medium bg-purple-500/30 text-purple-200 rounded-full border border-purple-500/40"
                                        >
                      {tag}
                    </span>
                                    ))}
                                    {post.tags.length > 2 && (
                                        <span className="px-2 py-1 text-xs font-medium bg-purple-500/20 text-purple-200/70 rounded-full">
                      +{post.tags.length - 2}
                    </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-purple-200 mb-3 group-hover:text-purple-400 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-purple-200/70 mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
                                <div className="flex items-center text-sm text-purple-300/60 mt-auto">
                                    <span>{post.author}</span>
                                    <span className="mx-2">•</span>
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}
