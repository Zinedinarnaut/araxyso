export interface BlogPost {
    id: string
    title: string
    excerpt: string
    content: string
    author: string
    date: string
    tags: string[]
    headerImage: string
    contentImages: string[]
    readingTime?: number
}

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "Apple Foundation Course – Design & Coding Experience",
        excerpt:
            "The Apple Foundation Course was a three-week program where my team designed and built an iOS app using SwiftUI in Xcode, collaborating through research, design, and development. 🚀",
        content:
            "The Apple Foundation Course was an intensive three-week program focused on design and coding, where my team and I collaborated to develop a fully functional iOS application using SwiftUI in Xcode.\n\n### Team & Roles\n\nI worked in a team of four, with a dynamic and flexible structure:\n\n- 2/3 researchers who gathered insights, defined user needs, and shaped the problem space.\n- 1 programmer (me) responsible for implementing the app in SwiftUI/Xcode and ensuring its functionality.\n- 4 designers, including myself, focused on UI/UX design, prototyping, and refining the app's look and feel.\n\n### Course Phases\n\n#### Week 1: Design & Research\n\n- Used Miro for brainstorming, wireframing, and planning the user experience.\n- Conducted research and ideation to define the app's core functionality.\n- Developed high-fidelity UI/UX prototypes.\n\n#### Week 2: Coding & Development\n\n- Transitioned from design to development, implementing the app using SwiftUI in Xcode.\n- Focused on UI implementation, app logic, and debugging.\n- Iterated based on feedback to refine the user experience.\n\n#### Week 3: Finalization & Presentation\n\n- Polished the app by optimizing UI, fixing bugs, and preparing for launch.\n- Prepared a presentation showcasing our design process, technical implementation, and final product.\n- Graduated from the program with a final pitch and demonstration of our application.\n\n### Key Takeaways\n\n- Gained hands-on experience in collaborative app development, from ideation to final implementation.\n- Strengthened skills in SwiftUI, Xcode, and UI/UX design principles.\n- Learned the importance of team dynamics and cross-functional collaboration in app development.",
        author: "Zinny",
        date: "2024-07-2",
        tags: ["UTS", "Swift", "Apple Foundation"],
        headerImage:
            "https://vvsjgfmxdtecylyv.public.blob.vercel-storage.com/content/image1-S7H2BSSy8aW9YIe493vK9dX2opIHhE.png",
        contentImages: [
            "https://vvsjgfmxdtecylyv.public.blob.vercel-storage.com/content/image0-iiVacChkL5jIQzNTG9lu1aZmXbPDwF.png",
            "https://vvsjgfmxdtecylyv.public.blob.vercel-storage.com/content/AP1GczMRyZpdP4-A0MPCLb5ndo2HDVyj-kQFGUSvgHo-NmB4IeKcn-qOBbKsevnHDEik0jcSKVX0_znaEveb3tNgjJuIY_fLO6XpeTNegXvaAa0ycFiiC4v2N5vxvPLVjioH8Z_mMt65-75YNhtJS5ZPmkTow1756-h1317-s-no-gm-NH54uY2SZeDRl4eE8EXE5ekkwxUPIb.png",
        ],
        readingTime: 5,
    },
    {
        id: "2",
        title: "Reverse Engineering a Caesar Cipher in Rust",
        excerpt:
            "I dove into reverse engineering a Rust program that encrypts text using a Caesar cipher, uncovering its logic and learning key programming concepts. 🔍",
        content:
            "Reverse engineering a Rust program was an exciting challenge that revealed the inner workings of a Caesar cipher—a simple encryption method that shifts letters in the alphabet. Here's how I analyzed the code, broke down its logic, and learned valuable lessons about Rust and reverse engineering.\n\n### Understanding the Program's Purpose\n\nThe program takes a string and a shift value as input, then outputs an encrypted string where each letter is shifted (e.g., 'A' with shift 3 becomes 'D'). Non-letters like spaces or punctuation remain unchanged. Running the code with inputs like 'Hello, World!' and shift 3 produced 'Khoor, Zruog!', hinting at a cipher.\n\n### Breaking Down the Code\n\nThe program has two main parts: the `main` function for user interaction and the `encrypt` function for the cipher logic.\n\n#### The `main` Function\n\n#### The `encrypt` Function\n\nThe `encrypt` function uses Rust's iterator pattern with `map` to transform each character:\n\n- Checks if it's alphabetic using `is_alphabetic()`\n- Determines the base ('A' for uppercase, 'a' for lowercase)\n- Applies the Caesar cipher formula with modulo 26 for wrap-around\n- Collects the results into a new String\n\n### Key Insights\n\n- **Behavior First**: Running the code with inputs like 'abc' (shift 1 → 'bcd') revealed its cipher nature\n- **Functional Style**: Rust's iterator pattern made the encryption logic elegant and readable\n- **Memory Safety**: Rust's ownership system prevented common bugs while maintaining performance\n- **Pattern Matching**: Used `match` expressions for handling different character types\n- **Error Handling**: Rust's `Result` type ensured robust input validation\n\n### Rust-Specific Learning Points\n\n- **Ownership & Borrowing**: Understanding how `&str` and `String` work together\n- **Iterator Chains**: Using `chars()`, `map()`, and `collect()` for functional programming\n- **Type Safety**: Rust's type system caught potential overflow issues at compile time\n- **Pattern Matching**: Leveraging `match` for clean conditional logic\n- **Memory Efficiency**: Zero-cost abstractions made the code both safe and fast\n\n### Advanced Implementation\n\n### Lessons Learned\n\n- Reverse engineering starts with observing inputs and outputs to hypothesize purpose\n- Rust's functional programming features make complex transformations readable\n- The type system catches errors early, making reverse engineering safer\n- Pattern matching provides elegant solutions for character classification\n- Iterator chains are both performant and expressive in Rust\n\nThis exercise was a deep dive into Rust's unique approach to systems programming, combining memory safety with zero-cost abstractions. The Caesar cipher implementation showcased Rust's strengths in handling text processing while maintaining performance and safety!",
        author: "Zinny",
        date: "2025-06-10",
        tags: ["Rust", "Reverse Engineering", "Caesar Cipher", "Systems Programming"],
        headerImage: "/placeholder.svg?height=400&width=800",
        contentImages: ["/placeholder.svg?height=300&width=600", "/placeholder.svg?height=300&width=600"],
        readingTime: 8,
    },
]
