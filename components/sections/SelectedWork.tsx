"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { GlobalCTA } from "@/components/ui/GlobalCTA";
import { ProjectVideoPreview } from "@/components/ui/ProjectVideoPreview";
import { projects } from "@/data/projects";

const selectedProjects = [
  {
    id: "flexzo",
    name: "Flexzo HR Service",
    description: "A modern, premium human resources service platform built for scalable enterprise use.",
    role: "Frontend / UI / responsive implementation",
    tech: "Next.js / React / TypeScript / CSS",
    keyWork: [
      "Premium UI redesign",
      "Responsive implementation",
      "Interactive animations",
      "Component architecture",
      "API integration",
    ],
    demoLink: "https://www.flexzo.in/",
    codeLink: "",
    imageSrc: "/ProjectVideoPreview.png",
  },
  {
    id: "portfolio",
    name: "Personal AI Portfolio",
    description: "A cinematic, AI-themed operating system portfolio designed to convert visitors into clients.",
    role: "Full website development",
    tech: "Next.js / TypeScript / Tailwind / Framer Motion",
    keyWork: [
      "Premium animated UI",
      "Navigation system",
      "Responsive experience",
      "Freelance conversion flow",
    ],
    demoLink: "/",
    codeLink: "https://github.com/sakthi2006-creater",
    imageSrc: "/portfolio-preview.png",
  },
  {
    id: "health-ai",
    name: "AI-Based Health Report Analyzer",
    description: "An intelligent platform that uses AI to scan, parse, and analyze medical health reports.",
    role: "UI + application integration",
    tech: "OCR / AI Logic / Web Interface / Data Presentation",
    keyWork: [
      "Data presentation",
      "Responsive UI",
      "Frontend integration",
      "User flows",
    ],
    demoLink: "https://medical-report-analyzer-eight.vercel.app/",
    codeLink: "https://github.com/sakthi2006-creater/Medical-Report-Analyzer",
    imageSrc: "/medical preview.png",
  },
];

export function SelectedWork() {
  return (
    <section className="relative min-h-screen bg-[#020617] font-mono overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee05_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee05_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* 1. HERO SECTION */}
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col justify-center relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="text-[10px] font-mono tracking-[0.5em] text-cyan-500 mb-6 uppercase">
            03 / PROOF
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-widest mb-6 uppercase drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            SELECTED WORK
          </h1>
          <div className="text-sm md:text-base text-white/50 max-w-2xl font-light tracking-wide">
            A showcase of web applications and digital experiences built for performance, design, and usability.
          </div>
        </div>

        {/* 2. PROJECT CARDS */}
        <div className="flex flex-col gap-24 mt-8">
          {selectedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="group flex flex-col lg:flex-row gap-12 items-center"
            >
              <div className="w-full lg:w-1/2">
                <ProjectVideoPreview 
                  videoSrc={(project as any).video}
                  imageSrc={(project as any).imageSrc}
                  title={project.name}
                  category="FEATURED CASE STUDY"
                />
              </div>

              {/* Project Details */}
              <div className="w-full lg:w-1/2 flex flex-col">
                <h2 className="text-2xl font-black text-white tracking-widest mb-4 uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                  {project.name}
                </h2>
                <p className="text-sm text-white/60 font-light leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="flex flex-col gap-6 mb-8">
                  <div>
                    <h3 className="text-xs font-bold text-cyan-400 tracking-widest uppercase mb-2">My Role</h3>
                    <p className="text-sm text-white/80">{project.role}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-bold text-cyan-400 tracking-widest uppercase mb-2">Technologies</h3>
                    <p className="text-sm text-white/80">{project.tech}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-cyan-400 tracking-widest uppercase mb-2">Key Work</h3>
                    <ul className="flex flex-col gap-2">
                      {project.keyWork.map((kw, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                          <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                          {kw}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  {project.demoLink && (
                    <a href={project.demoLink} className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#020617] bg-cyan-400 px-6 py-3 rounded hover:bg-cyan-300 transition-colors uppercase">
                      VIEW PROJECT <ExternalLink size={14} />
                    </a>
                  )}
                  {project.codeLink && (
                    <a href={project.codeLink} className="flex items-center gap-2 text-xs font-bold tracking-widest text-white border border-white/20 px-6 py-3 rounded hover:bg-white/10 transition-colors uppercase">
                      VIEW CODE <Github size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. MORE WORK / ARCHIVE */}
      <div className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <h3 className="text-xl font-black text-white tracking-widest mb-6 uppercase">
            MORE PROJECTS & EXPERIMENTS
          </h3>
          <p className="text-sm text-white/50 max-w-xl font-light leading-relaxed">
            While the projects above highlight my primary web development capabilities, my broader portfolio includes AI models, full-stack applications, and technical research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-[#0f172a]/40 backdrop-blur-md border border-white/5 hover:border-cyan-500/30 p-6 rounded-xl transition-colors duration-300 flex flex-col items-start overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {project.video && (
                <div className="w-full mb-6 z-10">
                  <ProjectVideoPreview 
                    videoSrc={project.video}
                    title={project.title}
                    category="PROJECT DEMO"
                  />
                </div>
              )}

              <h4 className="text-lg font-bold text-white tracking-wide mb-2 uppercase relative z-10">
                {project.title}
              </h4>
              <p className="text-sm text-white/60 font-light leading-relaxed mb-6 relative z-10 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 bg-white/5 border border-white/10 rounded text-white/70">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-auto relative z-10 w-full pt-4 border-t border-white/5">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors uppercase">
                    <ExternalLink size={14} /> LIVE
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold tracking-widest text-white/70 hover:text-white transition-colors uppercase">
                    <Github size={14} /> CODE
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. GLOBAL CTA */}
      <div className="border-t border-white/5 relative z-10">
        <GlobalCTA />
      </div>
    </section>
  );
}
