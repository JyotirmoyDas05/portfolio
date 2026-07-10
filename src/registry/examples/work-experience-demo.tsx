import type { ExperienceItemType } from "@/registry/work-experience";
import { WorkExperience } from "@/registry/work-experience";

const WORK_EXPERIENCE: ExperienceItemType[] = [
  {
    id: "suryastra",
    companyName: "Suryastra",
    companyLogo:
      "https://assets.jyotimoydas.in/images/blog-images/Suryastra_example_company.png",
    positions: [
      {
        id: "30d3a9fb-021d-452a-9d27-83655369b4b9",
        title: "Software Engineer",
        employmentPeriod: "06.2024 — present",
        employmentType: "Part-time",
        icon: "code",
        description: `- Developed online ordering to streamline purchases.
- Developer main Website with Next.js as Framework
- Developed Admin Panel with Strapi as Backend
- Developed Authentication System with Auth0`,
        skills: [
          "Next.js",
          "Strapi",
          "Auth0",
          "Docker",
          "NGINX",
          "Google Cloud",
          "Docusaurus",
          "Extension",
          "Research",
          "Project Management",
        ],
        isExpanded: true,
      },
      {
        id: "7586afb2-40e8-49c4-8983-2254c9446540",
        title: "Product Designer",
        employmentPeriod: "06.2024 — present",
        employmentType: "Part-time",
        icon: "design",
        description: `- Design UI/UX for Suryastra Website with a seamless experience.
- Develop a Design System for consistency and efficiency.
- Create Suryastra's brand identity, including logo and guidelines.`,
        skills: [
          "UI/UX Design",
          "UX Writing",
          "Design System",
          "Brand Design",
          "Figma",
        ],
      },
      {
        id: "991692c4-7d02-4666-8d31-933c4831768d",
        title: "Founder & Director",
        employmentPeriod: "06.2024 — present",
        employmentType: "Part-time",
        icon: "business",
        description: `- Lead and manage the company's strategy.
- Oversee technical teams and product development.
- Manage relationships with customers and partners.`,
        skills: ["Business Ownership", "Business Law", "Business Tax"],
      },
    ],
    isCurrentEmployer: true,
  },
];

export default function WorkExperienceDemo() {
  return <WorkExperience className="w-full" experiences={WORK_EXPERIENCE} />;
}
