"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function Counter({ to, inView }: { to: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }
    
    let start = 0;
    const duration = 2000; 
    const increment = to / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [to, inView]);

  return <span>{count.toFixed(2)}</span>;
}

export function AcademicCore() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-background flex flex-col justify-center py-24 px-6 md:px-12 lg:px-24 lg:pr-[140px] border-t border-border overflow-hidden" 
      id="academic"
    >
      
      {/* 01: Top Label */}
      <motion.div 
        className="text-[10px] md:text-xs font-mono tracking-[0.4em] text-text-secondary uppercase mb-16"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.8 }}
      >
        04 / ACADEMIC FOUNDATION
      </motion.div>

      <div className="w-full flex flex-col md:flex-row items-start justify-between gap-16 md:gap-8">
        
        {/* LEFT COLUMN: Main Academic Info */}
        <div className="flex-1 w-full max-w-3xl flex flex-col gap-12 z-10">
          
          {/* TITLE */}
          <div className="flex flex-col">
            <div className="overflow-hidden">
              <motion.h2 
                className="text-4xl md:text-6xl lg:text-7xl font-black text-text-primary tracking-widest leading-none uppercase"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
              >
                ACADEMIC
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2 
                className="text-4xl md:text-6xl lg:text-7xl font-black text-text-primary tracking-widest leading-none uppercase"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 0.8, ease: "circOut", delay: 0.3 }}
              >
                FOUNDATION
              </motion.h2>
            </div>
            
            <motion.div 
              className="h-[1px] bg-border mt-8 origin-left"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </div>

          {/* DEGREE */}
          <div className="flex flex-col gap-2">
            <div className="overflow-hidden">
              <motion.div 
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-[0.1em] leading-tight"
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                B.Tech in Artificial Intelligence
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div 
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-[0.1em] leading-tight"
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                & Data Science
              </motion.div>
            </div>
          </div>

          {/* INSTITUTION */}
          <div className="relative">
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-[4px] bg-accent origin-top"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            />
            <motion.div 
              className="pl-6 flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <div className="text-lg md:text-xl font-mono tracking-[0.2em] text-text-primary uppercase font-bold">
                LOYOLA INSTITUTE
              </div>
              <div className="text-lg md:text-xl font-mono tracking-[0.2em] text-text-secondary uppercase">
                OF TECHNOLOGY
              </div>
            </motion.div>
          </div>

          {/* TIMELINE */}
          <motion.div 
            className="flex items-center gap-4 text-xs md:text-sm font-mono tracking-[0.3em] text-text-secondary mt-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            <span>2024</span>
            <motion.div 
              className="flex-1 h-[1px] bg-border origin-left"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 1.9 }}
            />
            <span>2028</span>
            <span className="text-primary hidden sm:inline ml-4 border border-primary/30 px-3 py-1 bg-primary/5">CURRENT STUDENT</span>
          </motion.div>
          <motion.div 
            className="sm:hidden text-[10px] font-mono tracking-[0.3em] text-primary border border-primary/30 px-3 py-1 bg-primary/5 w-fit"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 2.2 }}
          >
            CURRENT STUDENT
          </motion.div>

        </div>

        {/* RIGHT COLUMN: CGPA & CORE DOMAINS */}
        <div className="flex-1 w-full md:w-auto md:max-w-sm flex flex-col gap-16 z-10 pt-4 md:pt-32">
          
          {/* CGPA BOX */}
          <motion.div 
            className="border border-border/50 bg-background/50 backdrop-blur-md p-8 relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="text-[10px] font-mono tracking-[0.4em] text-text-secondary uppercase mb-6 flex items-center gap-4">
              CURRENT CGPA
              <div className="flex-1 h-[1px] bg-border" />
            </div>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl md:text-6xl font-black text-text-primary tracking-tighter">
                <Counter to={8.22} inView={isInView} />
              </span>
              <span className="text-xl md:text-2xl text-text-secondary/50 font-light">/ 10</span>
            </div>

            <div className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-primary uppercase border-t border-border pt-4">
              AI & DATA SCIENCE
            </div>
          </motion.div>

          {/* CORE DOMAINS */}
          <div className="flex flex-col gap-6">
            <motion.div 
              className="text-[10px] font-mono tracking-[0.4em] text-text-secondary uppercase"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 2.5 }}
            >
              CORE DOMAINS
            </motion.div>
            
            <div className="grid grid-cols-2 gap-y-8 gap-x-4 relative">
              {/* Vertical connector line */}
              <motion.div 
                className="absolute left-1/2 top-4 bottom-4 w-[1px] bg-border/50 -translate-x-1/2 origin-top hidden sm:block"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1, delay: 2.8 }}
              />

              {[
                "AI", "MACHINE LEARNING",
                "DATA", "SOFTWARE DEVELOPMENT"
              ].map((domain, i) => (
                <motion.div 
                  key={domain}
                  className={`text-[9px] md:text-[10px] font-mono tracking-[0.2em] md:tracking-[0.3em] uppercase
                    ${i % 2 === 0 ? 'text-left text-text-primary' : 'text-right sm:text-left sm:pl-8 text-text-secondary'}
                  `}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -10 : 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: i % 2 === 0 ? -10 : 10 }}
                  transition={{ duration: 0.5, delay: 2.6 + (i * 0.1) }}
                >
                  <div className="flex items-center gap-4 w-full">
                    <span className="flex-1 whitespace-nowrap">{domain}</span>
                    {i % 2 === 0 && <div className="h-[1px] bg-border/50 flex-1 hidden sm:block" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
