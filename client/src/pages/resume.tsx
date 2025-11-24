import { resumeData } from "@/data/resume-data";
import { ResumeSection, ResumeItem } from "@/components/resume-section";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-slate-100 py-8 md:py-16 px-4 print:p-0 print:bg-white">
      {/* Controls - Hidden in print */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[210mm] mx-auto mb-6 flex justify-end gap-2 print:hidden"
      >
        <Button variant="outline" size="sm" onClick={() => window.print()}>
          <Printer className="w-4 h-4 mr-2" />
          Print / PDF
        </Button>
      </motion.div>

      {/* A4 Paper Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-[210mm] mx-auto bg-white shadow-2xl print:shadow-none overflow-hidden rounded-sm min-h-[297mm]"
      >
        <div className="flex flex-col md:flex-row h-full">
          
          {/* Sidebar / Left Column */}
          <div className="w-full md:w-1/3 bg-slate-900 text-slate-100 p-8 print:bg-slate-900 print:text-slate-100 print:w-1/3">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 mb-6 shadow-xl">
                <img 
                  src={resumeData.personalInfo.image} 
                  alt={resumeData.personalInfo.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="font-serif text-2xl font-bold tracking-tight mb-2 text-white">
                {resumeData.personalInfo.name}
              </h1>
              <p className="text-slate-400 text-sm uppercase tracking-widest font-medium">
                {resumeData.personalInfo.role}
              </p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="space-y-3">
                <h3 className="text-white/90 font-bold uppercase tracking-wider text-xs border-b border-white/10 pb-2 mb-4">
                  Contact
                </h3>
                <a href={`mailto:${resumeData.personalInfo.email}`} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>{resumeData.personalInfo.email}</span>
                </a>
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="w-4 h-4" />
                  <span>{resumeData.personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin className="w-4 h-4" />
                  <span>{resumeData.personalInfo.location}</span>
                </div>
                <a href={`https://${resumeData.personalInfo.website}`} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                  <Globe className="w-4 h-4" />
                  <span>{resumeData.personalInfo.website}</span>
                </a>
              </div>

              <div className="pt-6">
                <h3 className="text-white/90 font-bold uppercase tracking-wider text-xs border-b border-white/10 pb-2 mb-4">
                  Skills
                </h3>
                <div className="space-y-4">
                  {resumeData.skills.map((skillGroup) => (
                    <div key={skillGroup.category}>
                      <p className="text-slate-400 text-xs mb-2 font-medium">{skillGroup.category}</p>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <span key={skill} className="px-2 py-1 bg-white/5 rounded text-xs text-slate-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-white/90 font-bold uppercase tracking-wider text-xs border-b border-white/10 pb-2 mb-4">
                  Education
                </h3>
                {resumeData.education.map((edu) => (
                  <div key={edu.school} className="mb-4">
                    <p className="font-bold text-white">{edu.school}</p>
                    <p className="text-slate-300">{edu.degree}</p>
                    <p className="text-slate-500 text-xs mt-1">{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content / Right Column */}
          <div className="w-full md:w-2/3 p-8 md:p-12 bg-white print:w-2/3">
            <ResumeSection title="Profile">
              <p className="text-muted-foreground leading-relaxed text-base">
                {resumeData.personalInfo.summary}
              </p>
            </ResumeSection>

            <div className="my-8 border-t border-dashed border-gray-200" />

            <ResumeSection title="Experience">
              {resumeData.experience.map((job, index) => (
                <ResumeItem
                  key={index}
                  title={job.company}
                  subtitle={job.role}
                  period={job.period}
                  description={job.description}
                >
                  <ul className="list-disc list-outside ml-4 space-y-1 mt-2">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-muted-foreground pl-1 marker:text-gray-300">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </ResumeItem>
              ))}
            </ResumeSection>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
