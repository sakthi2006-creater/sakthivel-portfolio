"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";

export function CyberShieldCard() {
  const project = projects.find((p) => p.title.includes("Cyber Shield"));
  if (!project) return null;

  return (
    <div className="w-full h-full bg-background flex flex-col md:flex-row items-center relative overflow-hidden group">
      
      {/* Video Layer Placeholder */}

      <div className="absolute inset-0 md:relative md:flex-[1.5] h-full bg-[#050B14] border-r border-border/50 relative overflow-hidden flex items-center justify-center">
        
        {/* Radar Grid Background */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: "linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        {/* NETWORK → ANALYSIS → PREDICTION sequence */}
        <div className="relative z-10 w-full max-w-lg aspect-video flex flex-col items-center justify-center">
          
          <div className="flex gap-16 items-center">
            {/* Network Nodes */}
            <div className="relative w-32 h-32">
              <motion.div className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
              <motion.div className="absolute bottom-0 left-0 w-3 h-3 bg-cyan-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} />
              <motion.div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, delay: 1, repeat: Infinity }} />
              {/* Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-cyan-500/30">
                <line x1="50%" y1="0" x2="0" y2="100%" />
                <line x1="50%" y1="0" x2="100%" y2="100%" />
                <line x1="0" y1="100%" x2="100%" y2="100%" />
              </svg>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-cyan-500 whitespace-nowrap">
                [ 1. NETWORK ]
              </div>
            </div>

            {/* Connection Flow */}
            <div className="flex-1 h-[1px] bg-border relative">
              <motion.div className="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-[1px] bg-cyan-500 shadow-[0_0_10px_#06b6d4]" animate={{ left: ["0%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
            </div>

            {/* Analysis Node */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <motion.div className="absolute inset-0 border border-violet-500 rounded-full" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
              <motion.div className="absolute inset-4 border border-violet-500 rounded-full border-dashed animate-[spin_8s_linear_infinite]" />
              <div className="w-4 h-4 bg-violet-500 rounded-full shadow-[0_0_20px_#8b5cf6]" />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-violet-500 whitespace-nowrap">
                [ 2. ANALYSIS ]
              </div>
            </div>
            
            {/* Connection Flow */}
            <div className="flex-1 h-[1px] bg-border relative">
              <motion.div className="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-[1px] bg-violet-500 shadow-[0_0_10px_#8b5cf6]" animate={{ left: ["0%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
            </div>

            {/* Prediction Node */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-500/20 border border-red-500 rounded flex items-center justify-center backdrop-blur-md">
                <div className="w-8 h-8 bg-red-500 rounded-sm shadow-[0_0_30px_#ef4444]" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-red-500 whitespace-nowrap">
                [ 3. PREDICTION ]
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Panel */}
      <div className="relative z-20 flex-1 h-full bg-background/90 md:bg-background/95 backdrop-blur-md p-8 md:p-16 flex flex-col justify-center border-l border-border/30">
        <div className="text-accent text-[10px] font-mono tracking-widest mb-6">PROJECT_02</div>
        <h3 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">{project.title}</h3>
        <p className="text-text-secondary mb-8 text-base md:text-lg leading-relaxed max-w-lg">{project.description}</p>
        
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div>
            <div className="text-[10px] text-text-secondary font-mono tracking-widest mb-2">ROLE</div>
            <div className="text-sm font-bold text-text-primary">Machine Learning Engineer</div>
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
