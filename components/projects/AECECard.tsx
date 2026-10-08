"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";

export function AECECard() {
  const project = projects.find((p) => p.title.includes("AECE"));
  if (!project) return null;

  return (
    <div className="w-full h-full bg-background flex flex-col md:flex-row items-center relative overflow-hidden group">
      
      {/* Video Layer Placeholder */}

      <div className="absolute inset-0 md:relative md:flex-[1.5] h-full bg-[#0B0914] border-r border-border/50 relative overflow-hidden flex items-center justify-center">
        
        {/* Subtle grid */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: "linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />

        {/* AECE SCENARIO → ETHICAL REASONING → EVALUATION → DECISION */}
        <div className="relative z-10 w-full max-w-2xl px-12 flex flex-col items-center">
          
          {/* Scenario Input */}
          <motion.div 
            className="w-full max-w-md border border-border/50 bg-surface/50 p-4 rounded-lg backdrop-blur-sm relative"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-[10px] text-text-secondary font-mono mb-2">SCENARIO INPUT</div>
            <div className="w-3/4 h-2 bg-text-primary/20 rounded mb-2" />
            <div className="w-1/2 h-2 bg-text-primary/20 rounded" />
          </motion.div>

          <div className="w-[1px] h-12 bg-border" />

          {/* Ethical Reasoning Engine */}
          <motion.div 
            className="w-full border border-violet-500/30 bg-violet-900/10 p-6 rounded-xl flex gap-4 justify-between relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* scanning light */}
            <motion.div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent pointer-events-none" animate={{ left: ["-20%", "120%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
            
            {["UTILITARIAN", "DEONTOLOGICAL", "VIRTUE", "CARE"].map((framework, i) => (
              <div key={framework} className="flex flex-col items-center flex-1">
                <div className="text-[10px] font-mono text-violet-400 mb-3">{framework}</div>
                {/* Dynamic bars replacing fake numbers */}
                <div className="w-8 h-24 bg-black/50 border border-violet-500/20 rounded-full relative overflow-hidden flex items-end justify-center pb-1">
                  <motion.div 
                    className="w-6 bg-violet-500/50 rounded-full"
                    animate={{ height: ["30%", "80%", "40%"] }}
                    transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  />
                </div>
              </div>
            ))}
          </motion.div>

          <div className="w-[1px] h-12 bg-border" />

          {/* AI Reasoning / Evaluation */}
          <motion.div 
            className="px-8 py-4 bg-background border border-text-primary/20 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.1)] flex items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <span className="font-mono text-sm tracking-widest text-text-primary">EVALUATING CONTEXT</span>
          </motion.div>

          <div className="w-[1px] h-12 bg-border" />

          {/* Decision */}
          <motion.div 
            className="w-full max-w-sm border-l-4 border-emerald-500 bg-emerald-900/10 p-6 rounded-r-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-[10px] text-emerald-500 font-mono mb-2">FINAL OUTPUT</div>
            <div className="text-sm font-bold text-text-primary mb-1">REASONING COMPLETE</div>
            <div className="text-xs text-text-secondary">DECISION GENERATED</div>
          </motion.div>

        </div>
      </div>

      {/* Information Panel */}
      <div className="relative z-20 flex-1 h-full bg-background/90 md:bg-background/95 backdrop-blur-md p-8 md:p-16 flex flex-col justify-center border-l border-border/30">
        <div className="text-accent text-[10px] font-mono tracking-widest mb-6">PROJECT_04</div>
        <h3 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">{project.title}</h3>
        <p className="text-text-secondary mb-8 text-base md:text-lg leading-relaxed max-w-lg">{project.description}</p>
        
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div>
            <div className="text-[10px] text-text-secondary font-mono tracking-widest mb-2">ROLE</div>
            <div className="text-sm font-bold text-text-primary">AI Ethics / Full Stack</div>
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
