"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FRAGMENTS = [
  "<API/>", "Python", "PyTorch", "FastAPI", "PostgreSQL", 
  "NLP", "OCR", "GRAPH", "ETCC", "Next.js"
];

export function NeuralField({ isTransitioning }: { isTransitioning: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isMobile = window.innerWidth < 768;

  // Safe zone avoidance logic
  const getSafePosition = (i: number) => {
    // We want to avoid x: 25% to 75% AND y: 25% to 75% simultaneously
    let top = 10 + (i * 15) % 80;
    let left = 5 + (i * 25) % 85;
    
    // If it falls inside the center 50% box, push it to the edges
    if (top > 25 && top < 75 && left > 25 && left < 75) {
      if (i % 2 === 0) {
        left = left < 50 ? left - 30 : left + 30; // Push left or right
      } else {
        top = top < 50 ? top - 30 : top + 30; // Push top or bottom
      }
    }
    
    return { top, left };
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none perspective-[1000px]">
      
      {/* BACK LAYER: Slow Neural Network / Grid */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--text-primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--text-primary)) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
        animate={{
          scale: isTransitioning ? 2 : 1,
          opacity: isTransitioning ? 0 : [0.03, 0.05, 0.03]
        }}
        transition={{ scale: { duration: 2 }, opacity: { duration: 10, repeat: Infinity } }}
      />
      
      {/* MID LAYER: Technical Fragments (Avoid Center Safe Zone) */}
      <div className="absolute inset-0">
        {FRAGMENTS.map((fragment, i) => {
          const { top, left } = getSafePosition(i);
          return (
            <motion.div 
              key={fragment}
              className="absolute font-mono text-sm md:text-xl font-bold text-text-secondary/10 whitespace-nowrap opacity-15"
              style={{ top: `${top}%`, left: `${left}%` }}
              animate={{
                y: isTransitioning ? [0, (Math.random() - 0.5) * 500] : [0, (Math.random() - 0.5) * 40, 0],
                x: isTransitioning ? [0, (Math.random() - 0.5) * 500] : [0, (Math.random() - 0.5) * 20, 0],
                z: isTransitioning ? [0, 500] : 0,
                opacity: isTransitioning ? 0 : [0.08, 0.15, 0.08], // Extremely low opacity
                rotateZ: isTransitioning ? Math.random() * 90 - 45 : 0
              }}
              transition={{
                duration: isTransitioning ? 1.5 : 10 + Math.random() * 10,
                repeat: isTransitioning ? 0 : Infinity,
                ease: "easeInOut"
              }}
            >
              {fragment}
            </motion.div>
          );
        })}
      </div>

      {/* FRONT LAYER: Particles flying towards camera */}
      <div className="absolute inset-0 transform-style-3d">
        {[...Array(isMobile ? 15 : 40)].map((_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
              initial={{ z: -1000, opacity: 0 }}
              animate={{
                z: isTransitioning ? 1000 : [Math.random() * -500 - 500, 500],
                opacity: isTransitioning ? 0 : [0, 0.6, 0],
                scale: isTransitioning ? 5 : 1
              }}
              transition={{
                duration: isTransitioning ? 1.5 : 5 + Math.random() * 10,
                repeat: isTransitioning ? 0 : Infinity,
                ease: "linear",
                delay: isTransitioning ? 0 : Math.random() * 5
              }}
            />
          );
        })}
      </div>

    </div>
  );
}
