"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MEMORIES = [
  "PROJECT DISCOVERED: MEDICAL ANALYZER",
  "RESEARCH DETECTED: ETCC",
  "CURRENT BUILD: FLEXZO",
  "SYSTEM STATUS: OPTIMAL",
  "USER INTENT: EXPLORATION"
];

export function SystemMemory({ isTransitioning }: { isTransitioning: boolean }) {
  const [activeMemory, setActiveMemory] = useState<string | null>(null);

  useEffect(() => {
    if (isTransitioning) {
      setActiveMemory(null);
      return;
    }

    const interval = setInterval(() => {
      // 30% chance to spawn a memory every 4 seconds
      if (Math.random() > 0.7) {
        const randomMemory = MEMORIES[Math.floor(Math.random() * MEMORIES.length)];
        setActiveMemory(randomMemory);
        
        // Clear it after a few seconds
        setTimeout(() => {
          setActiveMemory(null);
        }, 3000);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            key={activeMemory}
            initial={{ opacity: 0, y: 50, x: Math.random() * 200 - 100 }}
            animate={{ opacity: 1, y: -100, x: Math.random() * 200 - 100 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 4, ease: "easeOut" }}
            className="absolute top-3/4 left-1/4 md:left-1/3 text-[9px] tracking-[0.4em] font-mono text-primary/60 border border-primary/20 bg-background/50 px-4 py-2 rounded-sm backdrop-blur-sm uppercase"
          >
            {activeMemory}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
