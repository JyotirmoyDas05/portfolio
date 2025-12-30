import type { User } from "@/features/portfolio/types/user";

export const USER = {
  firstName: "Jyotirmoy",
  lastName: "Das",
  displayName: "Jyotirmoy Das",
  username: "JyotirmoyDas05",
  gender: "male",
  pronouns: "he/him",
  bio: "Creating with code. Small details matter.",
  flipSentences: [
    "Creating with code. Small details matter.",
    "Full Stack Developer",
    "Open Source Contributor",
  ],
  address: "India",
  email: "anlvdGltb3lkYXNjc2VAZ21haWwuY29t", // Base64 encoded for spam protection
  website: "https://jyotimoydas.in",
  jobTitle: "Full Stack Developer",
  jobs: [
    {
      title: "Full Stack Developer",
      company: "For Myself",
      website: "https://jyotimoydas.in",
    },
  ],
  about: `
- **Full Stack Developer** with a passion for building high-performance, user-centric software solutions with intuitive and engaging designs.
- Skilled in **Next.js**, **React**, **TypeScript**, and modern front-end technologies; building high-quality, user-centric web and mobile applications.
- Enthusiastic about exploring new technologies and turning ideas into reality through polished, thoughtfully crafted personal projects.
`,
  avatar: "https://github.com/JyotirmoyDas05.png",
  ogImage: "https://jyotimoydas.in/og-image.png",
  namePronunciationUrl: "",
  timeZone: "Asia/Kolkata",
  keywords: ["jyotirmoydas", "jyotirmoy das", "jyotirmoy", "das"],
  dateCreated: "2025-12-21", // YYYY-MM-DD
} satisfies User;
