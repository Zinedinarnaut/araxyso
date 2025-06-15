import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Clock, ChevronLeft, Tag, Share2 } from "lucide-react"
import { blogPosts } from "@/data/blog-posts"
import { BlogContent } from "@/components/BlogContent"
import { AuthorBio } from "@/components/AuthorBio"
import { RelatedPosts } from "@/components/RelatedPosts"
import type { Metadata } from "next"

interface BlogPostPageProps {
    params: Promise<{ id: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        id: post.id,
    }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { id } = await params
    const post = blogPosts.find((p) => p.id === id)

    if (!post) {
        return {
            title: "Post Not Found",
        }
    }

    return {
        title: `${post.title} | Araxyso Blog`,
        description: post.excerpt,
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { id } = await params
    const post = blogPosts.find((post) => post.id === id)

    if (!post) {
        notFound()
    }

    const relatedPosts =  blogPosts.filter((p) => p.id !== params.id).slice(0, 3)

    return (
        <div className="min-h-screen text-purple-200 bg-gradient-to-b from-black to-purple-900/20">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="mb-12 rounded-lg overflow-hidden">
                    <div className="relative h-[50vh] md:h-[60vh]">
                        <Image
                            src={post.headerImage || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent rounded-lg" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                                        <Tag className="w-3 h-3 mr-1" />
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight glitch-text">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-purple-200/70">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(post.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    {post.author}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {post.readingTime} min read
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-12">
                    <main className="xl:w-2/3">
                        <div className="flex items-center justify-between mb-8">
                            <Link
                                href="/blog"
                                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                            >
                                <ChevronLeft className="h-4 w-4 mr-2" />
                                <span>Back to blog</span>
                            </Link>

                            <button className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                                <Share2 className="h-4 w-4 mr-2" />
                                <span>Share</span>
                            </button>
                        </div>

                        <BlogContent post={post} />

                        <div className="mt-12 pt-8 border-t border-purple-500/20">
                            <AuthorBio
                                name={post.author}
                                bio="Software Engineer and tech enthusiast passionate about cybersecurity and systems programming."
                                avatar="/placeholder.svg?height=80&width=80"
                            />
                        </div>

                        <div className="mt-12">
                            <RelatedPosts posts={relatedPosts} />
                        </div>
                    </main>

                    <aside className="xl:w-1/3">
                        <div className="sticky top-4 space-y-8">
                            <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-purple-200 mb-4 glitch-text">More Articles</h3>
                                <ul className="space-y-4">
                                    {blogPosts.slice(0, 5).map((relatedPost) => (
                                        <li key={relatedPost.id}>
                                            <Link
                                                href={`/blog/${relatedPost.id}`}
                                                className="text-purple-200/70 hover:text-purple-200 transition-colors block p-2 rounded-md hover:bg-purple-500/10"
                                            >
                                                <div className="font-medium mb-1">{relatedPost.title}</div>
                                                <div className="text-xs text-purple-200/50">{relatedPost.readingTime} min read</div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
