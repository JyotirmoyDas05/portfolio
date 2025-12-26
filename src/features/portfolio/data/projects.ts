import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  {
    id: "context7",
    title: "Context7",
    period: {
      start: "12.2024",
    },
    link: "https://context7.com",
    skills: [
      "Open Source",
      "MCP Server",
      "TypeScript",
      "LLM Integration",
      "Cursor",
      "VS Code",
      "Copilot",
      "Upstash",
    ],
    description: `Context7 MCP Server — Up-to-date documentation for LLMs and AI code editors. Pull version-specific docs straight into your prompt.

**Featured:**
- 📚 Up-to-date code docs for any prompt — no more outdated training data
- 🔧 MCP integration with Cursor, VS Code, Copilot Coding Agent, Kiro, LM Studio
- 🎯 resolve-library-id: Resolves library names into Context7-compatible IDs
- 📖 get-library-docs: Fetches version-specific documentation and code examples
- ⚡ Just add "use context7" to your prompts for instant accurate answers
- 🌐 Supports 1000+ libraries with community contributions`,
    logo: "https://context7.com/brand/context7-icon-green.svg",
    isExpanded: true,
  },
  {
    id: "colabdraw",
    title: "ColabDraw",
    period: {
      start: "12.2024",
    },
    link: "https://github.com/JyotirmoyDas05/ColabDraw",
    skills: [
      "Open Source",
      "React 19",
      "TypeScript",
      "Vite",
      "Appwrite",
      "Socket.io",
      "Jotai",
      "Bun",
      "PWA",
      "E2E Encryption",
    ],
    description: `A collaborative whiteboard application — a new way to visualize together in real-time.

**Core Features:**
- 💯 Free & open-source
- 🎨 Infinite, canvas-based whiteboard with hand-drawn like style
- 🤼 Real-time collaboration via Appwrite
- 🔒 End-to-end encryption for secure sharing
- 🖼️ Image support with export to PNG, SVG & clipboard
- 🖤 Dark/Light mode with customizable background Pallete themes
- 📡 PWA support (works offline)
- 💾 Local-first support (autosaves to the browser)
- 🔗 Shareable links
- 🌐 Localization (i18n) support
- ⚒️ Wide range of tools...`,
    logo: "https://colab-draw-with-nextjs.vercel.app/favicon-32x32.png",
    isExpanded: true,
  },
  {
    id: "tuneup-v2",
    title: "TuneUp V2",
    period: {
      start: "11.2024",
    },
    link: "https://github.com/JyotirmoyDas05/tuneup-v2",
    skills: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Appwrite",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
      "shadcn/ui",
      "OAuth",
    ],
    description: `A platform connecting Musicians, Bands, Studios, Cafés, and Organizers — with profiles, hiring, and real-time collaboration.

**Featured:**
- 👤 User Profiles for Musicians, Bands, Studios, Cafés, and Organizers
- 💼 Posting & Hiring System with application chat and status updates
- 📱 Social Feed with posts, photos, videos, likes, comments, reposts
- 🔍 Discovery & Filtering by genre, city, instruments, availability
- 💬 Real-time Chat System via Appwrite Realtime
- 🔐 OAuth Integration with Google and GitHub
- ✨ Dynamic animations with GSAP & Framer Motion`,
    logo: "PLACEHOLDER_TUNEUP_LOGO",
  },
  {
    id: "lightnote",
    title: "LightNote",
    period: {
      start: "11.2024",
    },
    link: "https://github.com/JyotirmoyDas05/LightNote",
    skills: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Tiptap Editor",
      "Tailwind CSS",
      "shadcn/ui",
      "Resend",
      "Vercel",
    ],
    description: `A personal note-taking app built on a rich text editor with full PostgreSQL database support.

**Featured:**
- 📝 Rich Text Editor powered by Tiptap with full markdown support
- 📚 Notebook Organization with customizable emoji icons
- ⭐ Favorites System for quick access to important notes
- 🔍 Smart Search to find notes instantly
- 🎨 Dark/Light Theme switching
- 📱 Responsive design across desktop, tablet, and mobile
- 🔐 Secure authentication with email verification
- 💾 Auto-save as you type
- 🗃️ Drag & Drop intuitive sidebar navigation`,
    logo: "https://lightnote.page/favicon.ico",
  },
  {
    id: "finwisely",
    title: "FinWise.ly",
    period: {
      start: "10.2024",
    },
    link: "https://github.com/JyotirmoyDas05/finwise.ly",
    skills: [
      "Next.js 15",
      "TypeScript",
      "Firebase",
      "Google Gemini AI",
      "NextAuth.js",
      "YouTube Data API",
      "shadcn/ui",
      "Vercel",
    ],
    description: `An AI-powered personal finance management platform that helps users track expenses, set financial goals, and enhance financial literacy.

**Featured:**
- 📊 Advanced Dashboard with real-time financial health overview
- 💰 Smart Finance Management with expense tracking and categorization
- 🎯 Goal Setting & Tracking with visual progress indicators
- 📚 Interactive Learning Hub with quizzes and video tutorials
- 🤖 AI Financial Assistant powered by Google Gemini for budget advice
- 🔒 Secure authentication with Firebase
- 📱 Fully responsive design for all devices`,
    logo: "PLACEHOLDER_FINWISELY_LOGO",
  },
  {
    id: "openpilot",
    title: "OpenPilot",
    period: {
      start: "09.2024",
    },
    link: "https://github.com/JyotirmoyDas05/OpenPilot",
    skills: [
      "CLI Tool",
      "AI Agent",
      "Multi-Model LLMs",
      "MCP Support",
      "LSP Enhanced",
      "Cross-Platform",
    ],
    description: `Your favorite AI agent now in your favorite terminal — in a stylish way.

**Featured:**
- 🤖 Multi-Model: Choose from a wide range of LLMs or add your own via OpenAI/Anthropic-compatible APIs
- 🔄 Flexible: Switch LLMs mid-session while preserving context
- 📂 Session-Based: Maintain multiple work sessions and contexts per project
- 🔧 LSP-Enhanced: Uses Language Server Protocols for additional context
- 🔌 Extensible: Add capabilities via MCPs (http, stdio, and sse)
- 🌍 Works Everywhere: First-class support in every terminal on macOS, Linux, Windows (PowerShell and WSL), FreeBSD, OpenBSD, and NetBSD`,
    logo: "PLACEHOLDER_OPENPILOT_LOGO",
  },
  {
    id: "hack-a-bot",
    title: "Hack-a-Bot",
    period: {
      start: "08.2024",
    },
    link: "https://github.com/JyotirmoyDas05/Hack-a-Bot",
    skills: [
      "Discord Bot",
      "Node.js",
      "MongoDB",
      "Web Scraping",
      "Docker",
      "Railway",
    ],
    description: `A Discord bot for getting dev opportunities right on your favorite/personal Discord server.

**Featured:**
- 🔍 Multi-platform scraping: Devpost, AllHackathons, Hack2Skill
- 🎯 Smart filtering by website, mode (online/offline/hybrid), prizes
- 🔎 Advanced search across names, tags, locations
- 📢 Automatic alerts for new hackathons with rich Discord embeds
- 🛡️ Duplicate prevention with smart deduplication
- ⚙️ Slash commands with admin permission system
- 🐳 Docker deployment support with Railway/Render/Heroku`,
    logo: "PLACEHOLDER_HACKABOT_LOGO",
  },
  {
    id: "ecomitra",
    title: "EcoMitra",
    period: {
      start: "01.2025",
    },
    link: "https://github.com/JyotirmoyDas05/Buddhiman-Bin-sih2",
    skills: [
      "Smart India Hackathon 2025",
      "React Native",
      "Expo",
      "ONNX Models",
      "TensorFlow Lite",
      "YOLOv5",
      "AI/ML",
    ],
    description: `An innovative waste management solution built for Smart India Hackathon 2025 — revolutionizing waste classification through AI and smart scanning technology.

**Featured:**
- 🤖 AI-powered waste classification using multiple ML models
- 📷 Smart scanning with YOLOv5 object detection
- 📱 Cross-platform mobile app built with Expo
- 🔐 Secure authentication with OTP verification
- 🌍 Environmental monitoring capabilities
- 🏆 Built for Smart India Hackathon 2025 by Team Smart_Sorters`,
    logo: "PLACEHOLDER_ECOMITRA_LOGO",
  },
  {
    id: "fashion-compare-extension",
    title: "SimplyShop Extension",
    period: {
      start: "07.2024",
    },
    link: "https://github.com/JyotirmoyDas05/Fashion-compare-Coupon-Extension",
    skills: [
      "Chrome Extension",
      "Manifest V3",
      "JavaScript",
      "Image Similarity",
      "Coupon API",
    ],
    description: `A Chrome extension for fashion product comparison and coupon integration using advanced image similarity algorithms.

**Featured:**
- 🔍 Identify similar fashion products across platforms
- 💰 Compare prices and discounts in real-time
- 🏷️ Suggest and integrate relevant coupons via API
- 🛒 Smart shopping assistant for fashion e-commerce`,
    logo: "PLACEHOLDER_SIMPLYSHOP_LOGO",
  },
  {
    id: "hack-a-bot-scraper",
    title: "Hack-a-Bot Scraper",
    period: {
      start: "08.2024",
    },
    link: "https://github.com/JyotirmoyDas05/Hack-a-Bot-scraper",
    skills: ["Python", "Web Scraping", "BeautifulSoup", "Selenium"],
    description: `A web scraper tool built to scrape hackathon and internship organizer websites — integrated with Hack-a-Bot Discord bot for timely opportunity updates.`,
    logo: "PLACEHOLDER_SCRAPER_LOGO",
  },
  {
    id: "dsa",
    title: "DSA Collection",
    period: {
      start: "01.2023",
    },
    link: "https://github.com/JyotirmoyDas05/DSA",
    skills: [
      "Data Structures",
      "Algorithms",
      "LeetCode",
      "Codeforces",
      "Problem Solving",
    ],
    description: `A collection of LeetCode and Codeforces solutions done during academic years to ace coding interviews — organized by topic and difficulty.`,
    logo: "PLACEHOLDER_DSA_LOGO",
  },
];
