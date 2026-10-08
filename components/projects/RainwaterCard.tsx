"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";

export function RainwaterCard() {
  const project = projects.find((p) => p.title.includes("Rainwater"));
  if (!project) return null;

  return (
    <div className="w-full h-full bg-background flex flex-col md:flex-row items-center relative overflow-hidden group">
      
      {/* Video Layer Placeholder */}

      <div className="absolute inset-0 md:relative md:flex-[1.5] h-full bg-[#03131A] border-r border-border/50 relative overflow-hidden flex items-center justify-center">
        
        {/* Deep blue gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#03131A] to-[#020B0F] z-0" />

        {/* Rain particles */}
        <div className="absolute inset-0 z-0 opacity-20">
          {[...Array(20)].map((_, i) => {
            // Pseudo-random based on index to avoid hydration mismatch
            const left = ((i * 17) % 100);
            const duration = 1 + ((i * 3) % 2);
            const delay = (i * 7) % 2;
            
            return (
              <motion.div
                key={i}
                className="absolute w-[1px] h-8 bg-blue-400"
                style={{ left: `${left}%` }}
                animate={{ top: ["-10%", "110%"] }}
                transition={{ duration, repeat: Infinity, ease: "linear", delay }}
              />
            );
          })}
        </div>

        {/* CLOUD → RAIN → COLLECTION → STORAGE sequence */}
        <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-6">
          
          {/* Cloud */}
          <motion.div 
            className="w-48 h-24 bg-slate-800/50 rounded-full blur-xl border border-blue-500/10"
            animate={{ x: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="-mt-16 mb-4 text-[10px] font-mono tracking-widest text-slate-400">
            [ 1. CLOUD / WEATHER API ]
          </div>

          {/* Rain / Transfer */}
          <div className="h-16 flex gap-4">
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i}
                className="w-1 h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>

          {/* Collection */}
          <motion.div 
            className="w-64 h-12 border-b-2 border-l-2 border-r-2 border-slate-600 rounded-b-xl flex items-end justify-center relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="w-full bg-blue-500/30"
              animate={{ height: ["20%", "80%", "20%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <div className="text-[10px] font-mono tracking-widest text-blue-400 mt-2">
            [ 2. COLLECTION METRICS ]
          </div>

          {/* Pipe */}
          <div className="w-4 h-16 border-l-2 border-r-2 border-slate-700 bg-slate-900 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 w-full h-4 bg-blue-500/50"
              animate={{ top: ["-20%", "120%"] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Storage */}
          <div className="w-48 h-32 border-2 border-blue-500/50 rounded-lg relative overflow-hidden flex items-end justify-center bg-slate-900/50 backdrop-blur-md">
            <motion.div 
              className="w-full bg-blue-600/40"
              animate={{ height: ["40%", "70%", "40%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Fake water waves */}
              <motion.div className="absolute top-0 left-0 w-[200%] h-2 bg-blue-400/30" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-sm tracking-widest text-white font-bold">STORAGE LOGIC</span>
            </div>
          </div>

        </div>
      </div>

      {/* Information Panel */}
      <div className="relative z-20 flex-1 h-full bg-background/90 md:bg-background/95 backdrop-blur-md p-8 md:p-16 flex flex-col justify-center border-l border-border/30">
        <div className="text-accent text-[10px] font-mono tracking-widest mb-6">PROJECT_03</div>
        <h3 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">{project.title}</h3>
        <p className="text-text-secondary mb-8 text-base md:text-lg leading-relaxed max-w-lg">{project.description}</p>
        
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div>
            <div className="text-[10px] text-text-secondary font-mono tracking-widest mb-2">ROLE</div>
            <div className="text-sm font-bold text-text-primary">Frontend / Integration</div>
          </div>
          <div>
            <div className="text-[10px] text-text-secondary font-mono tracking-widest mb-2">TECHNOLOGY</div>
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map(tag => (
                <span key={tag} className="text-xs font-mono text-text-primary">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mt-auto">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-8 py-4 bg-text-primary text-background text-sm font-bold tracking-widest hover:bg-accent hover:text-white transition-colors">
              LAUNCH LIVE <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 border border-border text-text-primary text-sm font-bold tracking-widest hover:border-text-primary transition-colors">
              GITHUB
            </a>
          )}
        </div>
      </div>

    </div>
  );
}
