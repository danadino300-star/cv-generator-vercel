import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react";
import profileImage from "@assets/generated_images/professional_headshot_of_a_person_in_business_casual_attire.png";

export const resumeData = {
  personalInfo: {
    name: "Alex Morgan",
    role: "Senior Product Designer & Engineer",
    image: profileImage,
    summary: "Design-driven engineer with 8+ years of experience crafting digital products. Specializing in bridging the gap between design and engineering, creating robust design systems, and building polished user interfaces that scale.",
    location: "San Francisco, CA",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 123-4567",
    website: "alexmorgan.design",
    linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan"
  },
  skills: [
    { category: "Design", items: ["Figma", "Prototyping", "Design Systems", "User Research", "Interaction Design"] },
    { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js"] },
    { category: "Tools", items: ["Git", "VS Code", "Linear", "Notion", "Storybook"] }
  ],
  experience: [
    {
      company: "TechFlow",
      role: "Senior Product Designer",
      period: "2021 - Present",
      description: "Leading the design system team and contributing to the core product UI.",
      achievements: [
        "Architected and launched a comprehensive design system used by 40+ engineers.",
        "Redesigned the core dashboard, increasing user engagement by 25%.",
        "Mentored junior designers and engineers on UI best practices."
      ]
    },
    {
      company: "CreativePulse",
      role: "UX Engineer",
      period: "2018 - 2021",
      description: "Bridged the gap between design and development teams.",
      achievements: [
        "Implemented complex animations and micro-interactions using Framer Motion.",
        "Reduced frontend technical debt by 40% through component refactoring.",
        "Collaborated with product managers to define feature requirements."
      ]
    },
    {
      company: "StartUp Inc",
      role: "Frontend Developer",
      period: "2016 - 2018",
      description: "Built responsive web applications for early-stage startups.",
      achievements: [
        "Developed the MVP for a fintech application using React and Redux.",
        "Optimized application performance, achieving a 98 Lighthouse score.",
        "Integrated third-party APIs for payments and data visualization."
      ]
    }
  ],
  education: [
    {
      school: "Stanford University",
      degree: "B.S. Computer Science",
      period: "2012 - 2016",
      details: "Focus on Human-Computer Interaction. Graduated with Honors."
    }
  ]
};
