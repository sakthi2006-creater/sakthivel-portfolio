"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function IdentityOrbit({ isTransitioning }: { isTransitioning: boolean }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      {/* Invisible interaction zone for proximity effect */}
      <div 
        className="absolute top-0 left-0 bottom-0 w-1/3 z-40"
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
      />

      <motion.div
        className={`absolute left-8 md:left-24 top-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col gap-6 transition-all duration-700
          ${isActive ? 'opacity-100 scale-105' : 'opacity-80 scale-100'}
        `}
        animate={{
          x: isTransitioning ? -100 : 0,
          opacity: isTransitioning ? 0 : (isActive ? 1 : 0.8),
          filter: isTransitioning ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.0, duration: 0.8 }}
          className="text-[10px] tracking-[0.4em] text-text-secondary uppercase mb-2"
        >
          01 / IDENTITY
        </motion.div>

        <div className="flex flex-col gap-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.2, duration: 0.8 }}
            className="text-sm md:text-base tracking-[0.2em] text-text-primary font-bold uppercase"
          >
            SAKTHIVEL R.
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.4, duration: 0.8 }}
            className="text-[10px] md:text-xs tracking-[0.3em] text-text-secondary uppercase"
          >
            AI & DATA SCIENCE
          </motion.div>
        </div>

        <div className="flex flex-col gap-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.6, duration: 0.8 }}
            className="text-[10px] md:text-xs tracking-[0.3em] text-text-primary uppercase"
          >
            B.TECH
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.8, duration: 0.8 }}
            className="text-[10px] md:text-xs tracking-[0.3em] text-text-secondary uppercase"
          >
            LOYOLA INSTITUTE
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 4.0, duration: 0.8 }}
            className="text-[10px] md:text-xs tracking-[0.3em] text-text-secondary/70 uppercase"
          >
            2024 — 2028
          </motion.div>
        </div>

        <div className="flex flex-col gap-1 mt-4 border-l border-accent/30 pl-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 4.2, duration: 0.8 }}
            className="text-[9px] md:text-[10px] tracking-[0.3em] text-text-primary uppercase"
          >
            ENGINEER IN PROGRESS
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 4.4, duration: 0.8 }}
            className="text-[9px] md:text-[10px] tracking-[0.3em] text-text-secondary uppercase"
          >
            BUILDER · DEVELOPER · DESIGNER
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
