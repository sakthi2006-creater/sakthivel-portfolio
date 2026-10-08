"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

export function ProjectLab() {
  const featuredProjects = projects.filter(p => p.featured !== false);

  return (
    <div id="projects" className="relative w-full bg-[#020617] text-white min-h-screen flex flex-col items-center pt-32 pb-24 px-6 md:px-12">
      
      {/* HEADER */}
      <div className="text-center mb-24">
        <div className="text-[10px] tracking-[0.5em] text-cyan-500 mb-6 uppercase font-mono">
          07 / PROJECT UNIVERSE
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-widest uppercase drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          FEATURED PROJECTS
        </h2>
      </div>

      {/* PROJECT LIST */}
      <div className="flex flex-col gap-8 w-full max-w-5xl">
        {featuredProjects.map((project, index) => {
          
          let slug = project.title.toLowerCase().replace(/ /g, "-");
          if (slug.includes("medical")) slug = "medical-analyzer";
          if (slug.includes("cyber")) slug = "cyber-shield";
          if (slug.includes("rainwater")) slug = "rainwater";
          if (slug.includes("aece")) slug = "aece";
          if (slug.includes("graph")) slug = "graph-foundation-model";

          return (
            <Link 
              key={project.title} 
              href={`/projects/${slug}`}
              className="group relative flex flex-col md:flex-row justify-between items-start md:items-center p-8 md:p-12 border border-white/10 bg-[#0f172a]/50 backdrop-blur-md rounded-2xl hover:border-cyan-500/50 hover:bg-[#0f172a] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/0 via-cyan-900/0 to-cyan-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="z-10 flex flex-col gap-4">
                <div className="text-sm font-mono tracking-widest text-cyan-500">
                  {String(index + 1).padStart(2, "0")} / {project.domain}
                </div>
                <h3 className="text-2xl md:text-4xl font-black tracking-widest uppercase text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <div className="text-sm text-zinc-400 max-w-xl">
                  {project.description}
                </div>
              </div>

              <div className="z-10 mt-8 md:mt-0 flex items-center justify-center w-12 h-12 rounded-full border border-white/20 group-hover:border-cyan-400 group-hover:bg-cyan-900/30 transition-all duration-300">
                <ArrowRight size={20} className="text-white/50 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
