"use client";

import { motion } from "framer-motion";

export function SystemProfile() {
  return (
    <section className="min-h-screen py-24 px-4 md:px-12 lg:px-24 flex flex-col justify-center relative z-10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Terminal Profile */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="border border-border bg-surface/50 backdrop-blur-md rounded-2xl p-8 font-mono shadow-glass"
        >
          <div className="text-accent text-xs mb-8 tracking-widest border-b border-border pb-4">
            SYSTEM_PROFILE
          </div>
          
          <div className="space-y-6 text-sm md:text-base">
            <div className="grid grid-cols-[120px_1fr] items-baseline border-b border-border/50 pb-4">
              <span className="text-text-secondary">IDENTITY</span>
              <span className="text-text-primary font-medium">Sakthivel R.</span>
            </div>
            
            <div className="grid grid-cols-[120px_1fr] items-baseline border-b border-border/50 pb-4">
              <span className="text-text-secondary">ROLE</span>
              <span className="text-text-primary font-medium">AI Engineer in Progress</span>
            </div>
            
            <div className="grid grid-cols-[120px_1fr] items-baseline border-b border-border/50 pb-4">
              <span className="text-text-secondary">EDUCATION</span>
              <span className="text-text-primary font-medium">B.Tech AI & Data Science</span>
            </div>
            
            <div className="grid grid-cols-[120px_1fr] items-baseline border-b border-border/50 pb-4">
              <span className="text-text-secondary">FOCUS</span>
              <span className="text-primary font-medium">AI / ML / Software / UI/UX</span>
            </div>
            
            <div className="grid grid-cols-[120px_1fr] items-baseline">
              <span className="text-text-secondary">STATUS</span>
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                <span className="text-accent font-bold tracking-widest">BUILDING</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skill Hierarchy */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-sm space-y-8"
        >
          <div className="group relative">
            <div className="text-primary font-bold mb-3 flex items-center gap-4">
              AI <div className="h-[1px] flex-1 bg-border group-hover:bg-primary transition-colors" />
            </div>
            <div className="pl-6 border-l border-border space-y-3 text-text-secondary">
              <div className="relative before:content-[''] before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-border hover:text-text-primary transition-colors cursor-default">ML</div>
              <div className="relative before:content-[''] before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-border hover:text-text-primary transition-colors cursor-default">NLP</div>
              <div className="relative before:content-[''] before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-border hover:text-text-primary transition-colors cursor-default">GenAI</div>
            </div>
          </div>

          <div className="group relative">
            <div className="text-secondary font-bold mb-3 flex items-center gap-4">
              SOFTWARE <div className="h-[1px] flex-1 bg-border group-hover:bg-secondary transition-colors" />
            </div>
            <div className="pl-6 border-l border-border space-y-3 text-text-secondary">
              <div className="relative before:content-[''] before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-border hover:text-text-primary transition-colors cursor-default">Frontend</div>
              <div className="relative before:content-[''] before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-border hover:text-text-primary transition-colors cursor-default">Backend</div>
              <div className="relative before:content-[''] before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-border hover:text-text-primary transition-colors cursor-default">APIs</div>
            </div>
          </div>

          <div className="group relative">
            <div className="text-accent font-bold mb-3 flex items-center gap-4">
              DATA <div className="h-[1px] flex-1 bg-border group-hover:bg-accent transition-colors" />
            </div>
            <div className="pl-6 border-l border-border space-y-3 text-text-secondary">
              <div className="relative before:content-[''] before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-border hover:text-text-primary transition-colors cursor-default">Python</div>
              <div className="relative before:content-[''] before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-border hover:text-text-primary transition-colors cursor-default">Pandas</div>
              <div className="relative before:content-[''] before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-border hover:text-text-primary transition-colors cursor-default">NumPy</div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="text-text-primary font-bold mb-3 flex items-center gap-4">
              DESIGN <div className="h-[1px] flex-1 bg-border group-hover:bg-text-primary transition-colors" />
            </div>
            <div className="pl-6 border-l border-border space-y-3 text-text-secondary">
              <div className="relative before:content-[''] before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-border hover:text-text-primary transition-colors cursor-default">UI</div>
              <div className="relative before:content-[''] before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-border hover:text-text-primary transition-colors cursor-default">UX</div>
              <div className="relative before:content-[''] before:absolute before:left-[-24px] before:top-1/2 before:w-4 before:h-[1px] before:bg-border hover:text-text-primary transition-colors cursor-default">Motion</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
