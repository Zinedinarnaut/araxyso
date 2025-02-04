import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Clock, ChevronLeft, Tag } from "lucide-react"
import blogPosts from "@/data/blog-posts.json"
import type { BlogPost } from "@/types/types"
import { TableOfContents } from "@/components/TableOfContents"
import { AuthorBio } from "@/components/AuthorBio"
import { RelatedPosts } from "@/components/RelatedPosts"
import { CyberButton } from "@/components/CyberButton"
import type { Metadata } from "next"
import type { PageProps } from "@/types/types"
import type { JSX } from "react"

export const dynamicParams = false

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        id: post.id,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    const post = blogPosts.find((p) => p.id === id) as BlogPost | undefined

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

export default async function BlogPostPage({ params }: PageProps) {
    const { id } = await params
    const post = blogPosts.find((p) => p.id === id) as BlogPost | undefined

    if (!post) {
        notFound()
    }

    const contentParagraphs = post.content.split("\n\n")
    const readingTime = Math.ceil(post.content.split(" ").length / 200) // Assuming 200 words per minute

    const relatedPosts = blogPosts.filter((p) => p.id !== id).slice(0, 3) as BlogPost[]

    return (
        <div className="min-h-screen text-purple-200 bg-gradient-to-b from-black to-purple-900/20">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Banner image */}
                <div className="mb-12 rounded-lg overflow-hidden">
                    <div className="relative h-[50vh] md:h-[60vh]">
                        <Image
                            src={post.headerImage || "/placeholder.svg"}
                            alt={post.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
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
                                    {readingTime} min read
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-12">
                    <main className="xl:w-2/3">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-6"
                        >
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            <span>Back to blog</span>
                        </Link>

                        <div className="prose prose-invert prose-purple max-w-none mb-12">
                            <p className="text-xl text-purple-200/90 mb-8 leading-relaxed">{post.excerpt}</p>

                            <TableOfContents content={post.content} />

                            {contentParagraphs.map((paragraph, index) => {
                                if (paragraph.startsWith("#")) {
                                    const level = paragraph.split(" ")[0].length
                                    const text = paragraph.slice(level + 1)
                                    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
                                    return (
                                        <HeadingTag
                                            key={index}
                                            id={text.toLowerCase().replace(/\s+/g, "-")}
                                            className="text-purple-200 mt-8 mb-4 glitch-text"
                                        >
                                            {text}
                                        </HeadingTag>
                                    )
                                }

                                // Insert images after every 3 paragraphs
                                const shouldInsertImage = (index + 1) % 3 === 0 && post.contentImages[Math.floor(index / 3)]
                                const imageIndex = Math.floor(index / 3)

                                return (
                                    <div key={index} className="mb-6">
                                        <p className="text-purple-200/80 leading-relaxed">{paragraph}</p>
                                        {shouldInsertImage && (
                                            <div
                                                className={`my-8 ${imageIndex % 2 === 0 ? "float-right ml-8" : "float-left mr-8"} w-1/2 md:w-2/5`}
                                            >
                                                <Image
                                                    src={post.contentImages[imageIndex] || "/placeholder.svg"}
                                                    alt={`Content image ${imageIndex + 1}`}
                                                    width={400}
                                                    height={300}
                                                    layout="responsive"
                                                    className="rounded-lg shadow-lg shadow-purple-500/20"
                                                />
                                                <p className="text-sm text-purple-200/60 mt-2 text-center">Figure {imageIndex + 1}</p>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        <div className="mb-12 clear-both">
                            <h2 className="text-xl font-semibold mb-4 glitch-text">Tags</h2>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant="outline"
                                        className="bg-purple-500/20 text-purple-200 border-purple-500/30 hover:bg-purple-500/30 transition-colors cursor-pointer"
                                    >
                                        <Tag className="w-3 h-3 mr-1" />
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <AuthorBio
                            name={post.author}
                            bio="Software Engineer and tech enthusiast."
                            avatar="/images/author-avatar.jpg"
                            className="mb-12"
                        />

                        <RelatedPosts posts={relatedPosts} />
                    </main>

                    <aside className="xl:w-1/3">
                        <div className="sticky top-4 space-y-8">
                            <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 backdrop-blur-sm">
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 glitch-text">More from Araxyso</h2>
                                <ul className="space-y-4">
                                    {blogPosts.slice(0, 5).map((relatedPost) => (
                                        <li key={relatedPost.id}>
                                            <Link
                                                href={`/blog/${relatedPost.id}`}
                                                className="text-purple-200/70 hover:text-purple-200 transition-colors block p-2 rounded-md hover:bg-purple-500/10"
                                            >
                                                {relatedPost.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 backdrop-blur-sm">
                                <h2 className="text-xl font-semibold text-purple-200 mb-4 glitch-text">Join Our Community</h2>
                                <p className="text-purple-200/70 mb-4">
                                    Connect with fellow cybersecurity enthusiasts and stay updated on the latest tech trends.
                                </p>
                                <CyberButton href="#" className="w-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5 mr-2"
                                    >
                                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                                    </svg>
                                    Join Discord
                                </CyberButton>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

