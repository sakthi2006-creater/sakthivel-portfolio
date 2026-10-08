"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_SEQUENCE = [
  "SYSTEM INITIALIZING...",
  "LOADING AI CORE...",
  "LOADING PROJECTS...",
  "LOADING RESEARCH...",
  "SYSTEM ONLINE",
];

export function HeroSequence() {
  const [bootIndex, setBootIndex] = useState(-1);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    // Check if it's the first visit this session
    const hasVisited = sessionStorage.getItem("portfolio_visited");
    
    if (hasVisited) {
      setBootComplete(true);
      return;
    }

    setBootIndex(0);
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < BOOT_SEQUENCE.length) {
        setBootIndex(currentIndex);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setBootComplete(true);
          sessionStorage.setItem("portfolio_visited", "true");
        }, 800);
      }
    }, 600); // 600ms per step

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Boot Sequence Overlay */}
      <AnimatePresence>
        {!bootComplete && bootIndex >= 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-background"
          >
            <div className="flex flex-col items-center gap-2">
              <motion.div
                key={bootIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-mono text-sm md:text-base text-accent uppercase tracking-widest"
              >
                {BOOT_SEQUENCE[bootIndex]}
              </motion.div>
              <div className="w-48 h-1 bg-surface rounded-full overflow-hidden mt-4">
                <motion.div 
                  className="h-full bg-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((bootIndex + 1) / BOOT_SEQUENCE.length) * 100}%` }}
                  transition={{ duration: 0.6, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Hero Reveal */}
      <AnimatePresence>
        {bootComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="z-10 flex flex-col items-center text-center px-4"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="font-mono text-xs md:text-sm tracking-[0.3em] text-accent mb-6"
            >
              AI × CODE × CREATIVITY
            </motion.p>
            
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-4 text-text-primary">
              SAKTHIVEL <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">R.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary font-light tracking-wide mb-12 max-w-2xl mx-auto">
              AI ENGINEER IN PROGRESS <br className="md:hidden" />
              <span className="hidden md:inline"> • </span> 
              BUILDING INTELLIGENT SYSTEMS & DIGITAL EXPERIENCES
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <button 
                data-cursor="EXPLORE"
                className="px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-secondary transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center gap-2 group"
                onClick={() => {
                  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                }}
              >
                <span>EXPLORE MY WORK</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              
              <button 
                data-cursor="VIEW"
                className="px-8 py-4 bg-surface text-text-primary border border-border font-medium rounded-full hover:border-accent hover:text-accent transition-all duration-300"
              >
                VIEW RESUME
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
