"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function LiveSystemOrb({ isTransitioning }: { isTransitioning: boolean }) {
  const [isActive, setIsActive] = useState(false);

  const techStack = [
    { name: "API", color: "bg-cyan-500" },
    { name: "DATABASE", color: "bg-blue-500" },
    { name: "AUTH", color: "bg-indigo-500" },
    { name: "DEBUGGING", color: "bg-purple-500" }
  ];

  return (
    <>
      {/* Invisible interaction zone for proximity effect */}
      <div 
        className="absolute top-0 right-0 bottom-0 w-1/3 z-40"
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
      />

      <motion.div
        className={`absolute right-8 md:right-24 top-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-end text-right gap-6 transition-all duration-700
          ${isActive ? 'opacity-100 scale-105' : 'opacity-80 scale-100'}
        `}
        animate={{
          x: isTransitioning ? 100 : 0,
          opacity: isTransitioning ? 0 : (isActive ? 1 : 0.8),
          filter: isTransitioning ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.5, duration: 0.8 }}
          className="flex items-center gap-3 text-[10px] tracking-[0.4em] text-text-secondary uppercase"
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>LIVE NOW</span>
        </motion.div>

        <div className="flex flex-col items-end gap-1">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.7, duration: 0.8 }}
            className="text-sm md:text-base tracking-[0.2em] text-primary font-bold uppercase"
          >
            FLEXZO HR SERVICE
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.9, duration: 0.8 }}
            className="text-xs tracking-[0.3em] text-text-primary uppercase"
          >
            BACKEND APP DEVELOPMENT
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 4.1, duration: 0.8 }}
          className="flex flex-col gap-3 mt-4 items-end border-r border-primary/30 pr-4 relative"
        >
          {/* Data beam to core */}
          <motion.div 
            className="absolute right-[calc(100%+1rem)] top-1/2 h-[1px] bg-gradient-to-l from-primary to-transparent"
            style={{ width: '200px' }}
            animate={{
              opacity: isActive ? [0, 1, 0] : 0,
              x: isActive ? [0, -100] : 0
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {techStack.map((tech, i) => (
            <div key={tech.name} className="flex items-center gap-3">
              <span className="text-[9px] tracking-[0.4em] text-text-secondary/70 uppercase">
                {tech.name}
              </span>
              <div className={`w-1.5 h-1.5 rounded-full ${tech.color} animate-pulse`} style={{ animationDelay: `${i * 0.2}s` }} />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
