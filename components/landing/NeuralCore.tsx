"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function NeuralCore({ 
  isTransitioning,
  setHoverState,
  children // This will be the CTA button
}: { 
  isTransitioning: boolean;
  setHoverState: (state: string | null) => void;
  children?: React.ReactNode;
}) {
  const [phase, setPhase] = useState(0); 

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1500); 
    const t2 = setTimeout(() => setPhase(2), 2500);
    const t3 = setTimeout(() => setPhase(3), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const identityText = "SAKTHIVEL";

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none px-4">
      
      {/* --- CORE LAYER (Visual Glows) --- */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full mix-blend-screen pointer-events-auto cursor-crosshair z-0"
        style={{
          background: 'radial-gradient(circle, hsla(var(--primary)/0.08) 0%, transparent 60%)'
        }}
        animate={{
          scale: isTransitioning ? 5 : [1, 1.05, 1],
          opacity: isTransitioning ? 0 : [0.5, 0.8, 0.5],
        }}
        transition={{ 
          scale: isTransitioning ? { duration: 1.5, ease: "anticipate" } : { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: isTransitioning ? { duration: 0.5 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        onMouseEnter={() => setHoverState("CONNECT")}
        onMouseLeave={() => setHoverState(null)}
      />

      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] md:w-[200px] md:h-[200px] border border-primary/20 rounded-full z-0"
        animate={{ rotateX: 60, rotateY: 30, rotateZ: [0, 360], scale: isTransitioning ? 10 : 1, opacity: isTransitioning ? 0 : 1 }}
        transition={{ rotateZ: { duration: 15, repeat: Infinity, ease: "linear" }, scale: { duration: 1.5 } }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[250px] md:h-[250px] border border-accent/10 rounded-full z-0"
        animate={{ rotateX: -40, rotateY: 60, rotateZ: [360, 0], scale: isTransitioning ? 10 : 1, opacity: isTransitioning ? 0 : 1 }}
        transition={{ rotateZ: { duration: 25, repeat: Infinity, ease: "linear" }, scale: { duration: 1.5 } }}
      />


      {/* --- CENTRAL FLEX STACK (Center Safe Zone) --- */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center mt-[-10vh] md:mt-0 w-full max-w-[600px]">
        
        {/* Core Top Info */}
        <motion.div 
          className="text-[10px] tracking-[0.5em] text-text-secondary/70 uppercase mb-4 md:mb-8 font-mono"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: phase > 1 ? 1 : 0, y: phase > 1 ? 0 : -10 }}
          transition={{ duration: 1 }}
        >
          SYSTEM / 001
        </motion.div>

        {/* Identity Typography Assembly */}
        <div className="h-[60px] md:h-[100px] flex items-center justify-center relative w-full mb-2 md:mb-6">
          {phase < 2 && (
            <div className="absolute inset-0 flex items-center justify-center gap-3 md:gap-8 text-xl md:text-3xl font-mono text-text-primary/70 tracking-widest uppercase perspective-[1000px]">
              {identityText.split("").map((char, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, z: -500, rotateX: 90 }}
                  animate={{ 
                    opacity: phase === 0 ? 1 : 0, 
                    z: phase === 0 ? 0 : 500,
                    rotateX: phase === 0 ? 0 : -90,
                    filter: phase === 1 ? "blur(10px)" : "blur(0px)"
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: phase === 0 ? i * 0.1 : 0,
                    ease: "circOut"
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          )}

          <motion.div 
            className="absolute inset-0 flex items-center justify-center text-3xl sm:text-5xl md:text-7xl font-black text-text-primary tracking-widest uppercase drop-shadow-glow"
            initial={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
            animate={{ 
              opacity: phase >= 2 ? (isTransitioning ? 0 : 1) : 0, 
              scale: phase >= 2 ? (isTransitioning ? 2 : 1) : 1.2,
              filter: phase >= 2 ? (isTransitioning ? "blur(20px)" : "blur(0px)") : "blur(20px)",
              z: isTransitioning ? 500 : 0,
            }}
            transition={{ duration: isTransitioning ? 1.5 : 1.2, ease: "easeOut" }}
          >
            SAKTHIVEL R.
          </motion.div>
        </div>

        {/* Core Bottom Info */}
        <motion.div 
          className="text-xs sm:text-sm md:text-xl tracking-[0.2em] md:tracking-[0.5em] text-text-secondary uppercase font-light mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ 
            opacity: phase >= 3 ? (isTransitioning ? 0 : 1) : 0, 
            y: phase >= 3 ? (isTransitioning ? -50 : 0) : 20,
            filter: phase >= 3 ? (isTransitioning ? "blur(10px)" : "blur(0px)") : "blur(10px)"
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          AI × SOFTWARE × DESIGN
        </motion.div>

        {/* CTA Wrapper - Standard Flex Flow */}
        <motion.div
          className="pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
