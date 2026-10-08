"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const archiveProjects = [
  { id: "06", title: "STORYTIME BUDDY", tag: "GEN AI", color: "from-amber-500/20 to-transparent" },
  { id: "07", title: "MY DAILY ROUTINE TIMELINE", tag: "FULL STACK", color: "from-rose-500/20 to-transparent" },
  { id: "08", title: "GRAPH LINK PREDICTION", tag: "GRAPH ML", color: "from-fuchsia-500/20 to-transparent" }
];

export function ProjectArchive() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section className="py-32 px-4 bg-background relative z-10 border-t border-border/30" id="archive">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 min-h-[600px]">
        
        {/* Index List */}
        <div className="flex-1">
          <div className="text-[10px] font-mono tracking-[0.5em] text-zinc-500 uppercase mb-12">08 / PROJECT ARCHIVE</div>
          
          <div className="flex flex-col border-t border-border/50">
            {archiveProjects.map((project) => (
              <motion.div
                key={project.id}
                className="group flex items-center justify-between py-6 border-b border-border/50 cursor-pointer relative overflow-hidden"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Background Hover Sweep */}
                <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                
                <div className="flex items-center gap-6 relative z-10">
                  <span className="text-sm font-mono text-text-secondary group-hover:text-text-primary transition-colors">{project.id}</span>
                  <h4 className="text-xl md:text-2xl font-bold text-text-secondary group-hover:text-text-primary transition-colors">{project.title}</h4>
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] font-mono tracking-widest text-text-secondary px-3 py-1 border border-border/50 rounded-full group-hover:border-text-secondary transition-colors">
                    {project.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Large Visual Preview Panel */}
        <div className="hidden lg:flex flex-1 relative items-center justify-center">
          <div className="w-full aspect-[4/3] bg-surface border border-border/50 rounded-2xl overflow-hidden relative shadow-2xl flex items-center justify-center">
            
            <AnimatePresence mode="wait">
              {hoveredProject ? (
                <motion.div
                  key={hoveredProject}
                  className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center">
                    <div className="text-6xl text-text-secondary mb-4 opacity-20">{hoveredProject}</div>
                    <div className="text-sm font-mono tracking-widest text-text-primary">PREVIEW COMING SOON</div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center opacity-50">
                  <div className="text-sm font-mono tracking-widest text-text-secondary">HOVER TO EXPLORE</div>
                </div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
