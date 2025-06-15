"use client"

import { useState } from "react"
import Image from "next/image"
import { CodeBlock } from "./CodeBlock"
import { ChartWidget } from "./ChartWidget"
import type { BlogPost } from "@/data/blog-posts"

interface BlogContentProps {
    post: BlogPost
}

export function BlogContent({ post }: BlogContentProps) {
    const [activeTab, setActiveTab] = useState<"content" | "code" | "charts">("content")

    const renderContent = (content: string) => {
        const sections = content.split(/\n\n+/)

        return sections
            .map((section, index) => {
                const trimmed = section.trim()

                if (!trimmed) return null

                // Handle headings
                if (trimmed.startsWith("### ")) {
                    return (
                        <h3 key={index} className="text-2xl font-bold text-purple-200 mt-8 mb-4 glitch-text">
                            {trimmed.slice(4)}
                        </h3>
                    )
                }

                if (trimmed.startsWith("#### ")) {
                    return (
                        <h4 key={index} className="text-xl font-semibold text-purple-200 mt-6 mb-3">
                            {trimmed.slice(5)}
                        </h4>
                    )
                }

                // Handle bullet points
                if (trimmed.includes("\n- ")) {
                    const items = trimmed.split("\n").filter((line) => line.trim().startsWith("- "))
                    return (
                        <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-purple-200/80 ml-4">
                            {items.map((item, i) => (
                                <li key={i} className="leading-relaxed">
                                    {item.slice(2)}
                                </li>
                            ))}
                        </ul>
                    )
                }

                // Regular paragraphs
                return (
                    <p key={index} className="text-purple-200/80 leading-relaxed mb-6">
                        {trimmed}
                    </p>
                )
            })
            .filter(Boolean)
    }

    // Rust code examples for the Caesar cipher blog
    const rustCodeExamples = [
        {
            title: "Main Function",
            code: `use std::io;

fn main() {
    println!("Enter text to encrypt:");
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let text = input.trim();
    
    println!("Enter shift value:");
    let mut shift_input = String::new();
    io::stdin().read_line(&mut shift_input).expect("Failed to read line");
    let shift: i32 = shift_input.trim().parse().expect("Invalid number");
    
    let encrypted = encrypt(text, shift);
    println!("Encrypted: {}", encrypted);
}`,
            language: "rust",
            filename: "main.rs",
            runnable: true,
        },
        {
            title: "Encrypt Function",
            code: `fn encrypt(text: &str, shift: i32) -> String {
    text.chars()
        .map(|c| {
            if c.is_alphabetic() {
                let base = if c.is_uppercase() { b'A' } else { b'a' } as char;
                let shifted = (c as u8 - base as u8 + shift as u8) % 26;
                (base as u8 + shifted) as char
            } else {
                c
            }
        })
        .collect()
}`,
            language: "rust",
            filename: "encrypt.rs",
            runnable: false,
        },
        {
            title: "Advanced Implementation",
            code: `use std::io;

fn encrypt_advanced(text: &str, shift: i32) -> Result<String, &'static str> {
    if shift < 0 || shift > 25 {
        return Err("Shift must be between 0 and 25");
    }
    
    let result = text.chars()
        .map(|c| match c {
            'A'..='Z' => {
                let shifted = (c as u8 - b'A' + shift as u8) % 26;
                (b'A' + shifted) as char
            },
            'a'..='z' => {
                let shifted = (c as u8 - b'a' + shift as u8) % 26;
                (b'a' + shifted) as char
            },
            _ => c,
        })
        .collect();
    
    Ok(result)
}`,
            language: "rust",
            filename: "advanced_encrypt.rs",
            runnable: true,
        },
    ]

    // Chart data for the Caesar cipher blog
    const chartData = [
        {
            type: "pie" as const,
            title: "Character Processing Distribution",
            data: {
                labels: ["Letters Processed", "Non-Letters Skipped"],
                datasets: [
                    {
                        data: [80, 20],
                        backgroundColor: ["#36A2EB", "#FF6384"],
                    },
                ],
            },
        },
        {
            type: "bar" as const,
            title: "Program Flow Effort Allocation",
            data: {
                labels: ["Input Handling", "Encryption Logic", "Output"],
                datasets: [
                    {
                        label: "Effort (%)",
                        data: [20, 70, 10],
                        backgroundColor: "#36A2EB",
                    },
                ],
            },
        },
    ]

    // Swift code example for the Apple Foundation Course blog
    const swiftCodeExample = {
        title: "SwiftUI View Example",
        code: `import SwiftUI

struct ContentView: View {
    @State private var name: String = ""
    @State private var isSubmitted: Bool = false
    
    var body: some View {
        VStack(spacing: 20) {
            Text("Apple Foundation App")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            TextField("Enter your name", text: $name)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding(.horizontal)
            
            Button(action: {
                isSubmitted = true
            }) {
                Text("Submit")
                    .fontWeight(.semibold)
                    .foregroundColor(.white)
                    .padding()
                    .background(Color.blue)
                    .cornerRadius(10)
            }
            
            if isSubmitted && !name.isEmpty {
                Text("Hello, \\(name)!")
                    .font(.title2)
                    .padding()
            }
        }
        .padding()
    }
}`,
        language: "swift",
        filename: "ContentView.swift",
        runnable: false,
    }

    return (
        <div className="space-y-8">
            {/* Blog header image */}
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8">
                <Image src={post.headerImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-xs font-medium bg-purple-500/30 text-purple-200 rounded-full border border-purple-500/40"
                            >
                {tag}
              </span>
                        ))}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{post.title}</h1>
                    <div className="flex items-center text-sm text-purple-200/70">
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                        {post.readingTime && (
                            <>
                                <span className="mx-2">•</span>
                                <span>{post.readingTime} min read</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Tab navigation for blog with code examples */}
            {post.id === "2" && (
                <div className="flex border-b border-purple-500/30 mb-8">
                    <button
                        className={`px-4 py-2 text-sm font-medium ${
                            activeTab === "content"
                                ? "text-purple-300 border-b-2 border-purple-500"
                                : "text-purple-300/60 hover:text-purple-300"
                        }`}
                        onClick={() => setActiveTab("content")}
                    >
                        Article
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${
                            activeTab === "code"
                                ? "text-purple-300 border-b-2 border-purple-500"
                                : "text-purple-300/60 hover:text-purple-300"
                        }`}
                        onClick={() => setActiveTab("code")}
                    >
                        Code Examples
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium ${
                            activeTab === "charts"
                                ? "text-purple-300 border-b-2 border-purple-500"
                                : "text-purple-300/60 hover:text-purple-300"
                        }`}
                        onClick={() => setActiveTab("charts")}
                    >
                        Charts
                    </button>
                </div>
            )}

            {/* Blog content */}
            <div className="prose prose-invert prose-purple max-w-none">
                {activeTab === "content" && (
                    <>
                        <p className="text-xl text-purple-200/90 mb-8 leading-relaxed">{post.excerpt}</p>
                        <div className="space-y-6">{renderContent(post.content)}</div>

                        {/* Content images for blog post 1 */}
                        {post.id === "1" && post.contentImages && post.contentImages.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                {post.contentImages.map((img, idx) => (
                                    <div key={idx} className="relative h-64 rounded-lg overflow-hidden border border-purple-500/30">
                                        <Image
                                            src={img || "/placeholder.svg"}
                                            alt={`Project image ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Swift code example for blog post 1 */}
                        {post.id === "1" && (
                            <div className="mt-8">
                                <h3 className="text-2xl font-bold text-purple-200 mb-4 glitch-text">SwiftUI Code Example</h3>
                                <CodeBlock {...swiftCodeExample} />
                            </div>
                        )}
                    </>
                )}

                {/* Code examples tab for blog post 2 */}
                {activeTab === "code" && post.id === "2" && (
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-purple-200 mb-6 glitch-text">
                            Caesar Cipher Implementation in Rust
                        </h3>
                        {rustCodeExamples.map((example, idx) => (
                            <div key={idx} className="mb-8">
                                <CodeBlock {...example} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Charts tab for blog post 2 */}
                {activeTab === "charts" && post.id === "2" && (
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-purple-200 mb-6 glitch-text">Caesar Cipher Analysis</h3>
                        {chartData.map((chart, idx) => (
                            <ChartWidget key={idx} chartData={chart} className="mb-8" />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
