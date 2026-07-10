import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "freelance",
    companyName: "Freelance",
    positions: [
      {
        id: "f0becfba-057d-40db-b252-739e1654faa1",
        title: "Full-stack Developer",
        employmentPeriod: {
          start: "2025",
          end: undefined,
        },
        employmentType: "Part-time",
        description: `- Built an order management website with real-time delivery tracking.
- Developed an e-commerce site for bird's nest products.
- Created a map to display monitoring station data.
- Designed a customizable WordPress landing page.`,
        icon: "code",
        skills: [
          "Laravel",
          "React",
          "Express.js",
          "Socket.IO",
          "MongoDB",
          "Firebase",
          "WordPress",
          "Docker",
          "NGINX",
        ],
      },
      {
        id: "0eecdfcb-028d-41f4-93e9-1269ba7eff7e",
        title: "Graphic & UI/UX Designer",
        employmentPeriod: {
          start: "2024",
          end: "2025",
        },
        employmentType: "Part-time",
        description: "Designed logos, posters, ads, and UI.",
        icon: "design",
        skills: [
          "Creativity",
          "UI/UX Design",
          "Graphic Design",
          "Figma",
          "Adobe Photoshop",
          "Adobe Illustrator",
        ],
      },
    ],
  },
  {
    id: "education",
    companyName: "Education",
    positions: [
      {
        id: "c47f5903-88ae-4512-8a50-0b91b0cf99b6",
        title: "Gauhati University institute of Science and Technology",
        employmentPeriod: {
          start: "08.2024",
          end: "2028",
        },
        icon: "education",
        description: `- Currently studying for a Bachelor's degree in Computer Science Engineering.
- Language Proficiency: B2 English Level.
- Achieved several awards, including:
  - 4th Position — HACK-To-HIRE Ideathon 2025 `,
        skills: [
          "C++",
          "C",
          "Python",
          "Data Structures",
          "Algorithms",
          "Advanced Databases",
          "Systems Design",
          "Distributed Systems",
          "Software Engineering",
          "Self-learning",
          "Teamwork",
          "Presentation",
        ],
      },
      {
        id: "70131ed8-36d9-4e54-8c78-eaed18240eca",
        title: "Cambridge Internation School Guwahati",
        employmentPeriod: {
          start: "06.2023",
          end: "04.2024",
        },
        icon: "education",
        description: `- Studied 12th Standard — Physics, Chemistry, Biology, Mathematics, English, Physical Education: 86 %`,
      },
      {
        id: "36c4c6fb-02d0-48c0-8947-fda6e9a24af7",
        title: "Kendriya Vidyalaya Khanapara, Guwahati",
        employmentPeriod: {
          start: "06.2012",
          end: "05.2023",
        },
        icon: "education",
        description: `- Recognized as one of the most outstanding student of the district.
- Achieved numerous awards at city and national levels:
    - 5th Position - State Level English Olympiad 2016,
    - 10th Position - Zonal rank in National Science Olympiad 2017,
    - 2nd Prize — 5th Regional Abacus Competiton 2019
- Achieved the title of Outstanding Student from Grade 6-9.
- Achieved **9.89** CGPA in 10th Standard
- Developed playful starter websites using the open-source Scratch.`,
        skills: ["HTML", "CSS", "JavaScript", "Self-learning"],
      },
    ],
  },
];
