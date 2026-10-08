"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";

export function MedicalAnalyzerCard() {
  const project = projects.find((p) => p.title.includes("Medical Report Analyzer"));
  if (!project) return null;

  return (
    <div className="w-full h-full bg-background flex flex-col md:flex-row items-center relative overflow-hidden group">
      
      {/* 
        Video Layer Placeholder:
        Once videos are ready, place a <video src="/videos/medical.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity z-0" /> here.
      */}

      {/* Cinematic Visual Metaphor Area (Background/Left) */}
      <div className="absolute inset-0 md:relative md:flex-[1.5] h-full bg-[#0A0F1C] border-r border-border/50 relative overflow-hidden flex items-center justify-center">
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0A0F1C]/80 to-[#0A0F1C] z-0" />
        
        {/* REPORT → OCR → AI ANALYSIS → INSIGHTS sequence */}
        <div className="relative z-10 w-full max-w-lg aspect-square flex flex-col items-center justify-center gap-12">
          
          {/* Document / OCR Node */}
          <motion.div 
            className="w-48 h-64 bg-surface/5 border border-border/30 rounded flex flex-col p-4 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Fake text lines */}
            <div className="w-3/4 h-2 bg-text-secondary/30 rounded mb-4" />
            <div className="w-full h-2 bg-text-secondary/20 rounded mb-2" />
            <div className="w-5/6 h-2 bg-text-secondary/20 rounded mb-2" />
            <div className="w-4/5 h-2 bg-text-secondary/20 rounded mb-6" />
            
            {/* OCR Scanner */}
            <motion.div 
              className="absolute left-0 w-full h-1 bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,1)]"
              animate={{ top: ["10%", "90%", "10%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-cyan-500">
              [ 1. OCR LAYER ]
            </div>
          </motion.div>

          {/* Connection Line */}
          <motion.div 
            className="w-[1px] h-12 bg-gradient-to-b from-cyan-500 to-blue-500 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          />

          {/* AI Analysis Node */}
          <motion.div 
            className="px-8 py-4 bg-blue-900/20 border border-blue-500/30 rounded-full backdrop-blur-md relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <div className="absolute inset-0 rounded-full border border-blue-500 border-dashed animate-[spin_10s_linear_infinite] opacity-30" />
            <span className="font-mono text-xs tracking-widest text-blue-400">
              2. AI ANALYSIS MODEL
            </span>
          </motion.div>

          {/* Connection Line */}
          <motion.div 
            className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-emerald-500 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          />

          {/* Insights Node */}
          <motion.div 
            className="px-8 py-4 bg-emerald-900/20 border border-emerald-500/50 rounded-xl backdrop-blur-md"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, type: "spring" }}
          >
            <span className="font-mono text-sm font-bold tracking-widest text-emerald-400">
              3. ACTIONABLE INSIGHTS
            </span>
          </motion.div>

        </div>
      </div>

      {/* Information Panel (Right on Desktop, Front on Mobile) */}
      <div className="relative z-20 flex-1 h-full bg-background/90 md:bg-background/95 backdrop-blur-md p-8 md:p-16 flex flex-col justify-center border-l border-border/30 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
        
        <div className="text-accent text-[10px] font-mono tracking-widest mb-6">PROJECT_01</div>
        
        <h3 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
          {project.title}
        </h3>
        
        <p className="text-text-secondary mb-8 text-base md:text-lg leading-relaxed max-w-lg">
          {project.description}
        </p>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <div>
            <div className="text-[10px] text-text-secondary font-mono tracking-widest mb-2">ROLE</div>
            <div className="text-sm font-bold text-text-primary">AI & Backend Developer</div>
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
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 bg-text-primary text-background text-sm font-bold tracking-widest hover:bg-accent hover:text-white transition-colors"
            >
              LAUNCH LIVE <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          )}
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 border border-border text-text-primary text-sm font-bold tracking-widest hover:border-text-primary transition-colors"
            >
              GITHUB
            </a>
          )}
        </div>
      </div>

    </div>
  );
}
