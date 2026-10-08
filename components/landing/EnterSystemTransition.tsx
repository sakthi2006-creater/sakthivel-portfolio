"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function EnterSystemTransition({ 
  onEnter, 
  isTransitioning,
  setHoverState,
  clickPhase
}: { 
  onEnter: () => void;
  isTransitioning: boolean;
  setHoverState: (state: string | null) => void;
  clickPhase: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center gap-6"
      animate={{
        opacity: clickPhase > 0 ? 0 : 1,
        scale: isHovered ? 1.05 : 1
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <button
        onClick={onEnter}
        onMouseEnter={() => {
          setIsHovered(true);
          setHoverState("ENTER");
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoverState(null);
        }}
        className={`
          group relative px-6 py-3 md:px-8 md:py-4 overflow-hidden border bg-background/50 backdrop-blur-md transition-all duration-500
          ${isHovered ? 'border-primary/80 shadow-glow-blue' : 'border-border/50 hover:border-accent/50'}
        `}
      >
        <div className="absolute inset-0 w-0 bg-text-primary group-hover:w-full transition-all duration-700 ease-out z-0" />
        <span className="relative z-10 flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-mono tracking-[0.2em] md:tracking-[0.4em] text-text-primary group-hover:text-background transition-colors font-bold uppercase">
          {clickPhase === 1 ? "[ ENTERING SYSTEM ]" : "[ ENTER THE SYSTEM ]"}
          <span className="inline-block transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
        </span>
      </button>
      
      {/* Flight visual cue */}
      <div className={`w-[1px] h-8 md:h-12 bg-gradient-to-b from-text-primary/50 to-transparent transition-all duration-300 ${isHovered ? 'h-12 md:h-16' : ''} animate-pulse`} />
    </motion.div>
  );
}
