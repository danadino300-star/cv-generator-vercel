import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react";
const profileImage = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop";

export const resumeData = {
  personalInfo: {
    name: "Rima Hazem",
    role: "Graphic Designer",
    image: profileImage,
    summary: "Creative graphic designer based in Algiers with a passion for visual storytelling. Expert in creating impactful brand identities, marketing materials, and digital content using Canva and the Affinity Suite. Dedicated to delivering high-quality designs that elevate brand presence.",
    location: "Algiers, Algeria",
    email: "rima.hazem@example.com",
    phone: "+213 555 123 456",
    website: "rimahazem.design",
    linkedin: "linkedin.com/in/rimahazem",
    github: "behance.net/rimahazem"
  },
  skills: [
    { category: "Design Software", items: ["Canva Pro", "Affinity Designer", "Affinity Photo", "Affinity Publisher", "Adobe Photoshop"] },
    { category: "Expertise", items: ["Brand Identity", "Social Media Graphics", "Print Design", "Typography", "Layout Design"] },
    { category: "Languages", items: ["Arabic (Native)", "French (Fluent)", "English (Professional)"] }
  ],
  experience: [
    {
      company: "Creative Agency DZ",
      role: "Senior Graphic Designer",
      period: "2022 - Present",
      description: "Leading creative direction for diverse client projects in Algiers.",
      achievements: [
        "Spearheaded the rebranding of 3 major local startups, resulting in increased brand recognition.",
        "Manage a team of junior designers, streamlining the workflow using Canva Team features.",
        "Create comprehensive visual assets for digital marketing campaigns."
      ]
    },
    {
      company: "Freelance",
      role: "Visual Designer",
      period: "2019 - 2022",
      description: "Delivered custom design solutions for international and local clients.",
      achievements: [
        "Designed and laid out marketing brochures and magazines using Affinity Publisher.",
        "Created high-converting social media templates for e-commerce businesses.",
        "Maintained a 5-star rating on freelance platforms for timely delivery and creativity."
      ]
    },
    {
      company: "PrintHouse Algiers",
      role: "Junior Graphic Designer",
      period: "2018 - 2019",
      description: "Assisted in the preparation of print-ready files and client adjustments.",
      achievements: [
        "Mastered pre-press processes and color management for offset printing.",
        "Collaborated with clients to refine logos and business card designs.",
        "Utilized Affinity Designer for scalable vector illustrations."
      ]
    }
  ],
  education: [
    {
      school: "École Supérieure des Beaux-Arts d'Alger",
      degree: "Bachelor in Graphic Design",
      period: "2014 - 2018",
      details: "Specialized in Visual Communication and Typography."
    }
  ]
};
