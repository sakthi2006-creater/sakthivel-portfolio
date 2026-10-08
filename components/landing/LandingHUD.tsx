"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

function Counter({ to, delay }: { to: number; delay: number }) {
  const spring = useSpring(0, { duration: 2000, bounce: 0 });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      spring.set(to);
    }, delay);
    return () => clearTimeout(timer);
  }, [to, delay, spring]);

  const display = useTransform(spring, (current) => 
    Math.round(current).toString().padStart(2, '0')
  );

  return <motion.span>{display}</motion.span>;
}

export function LandingHUD({ isTransitioning }: { isTransitioning: boolean }) {
  return (
    <motion.div
      className="absolute bottom-8 left-0 right-0 flex justify-center items-center z-20 pointer-events-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isTransitioning ? 0 : 1, 
        y: isTransitioning ? 50 : 0 
      }}
      transition={{ delay: isTransitioning ? 0 : 4, duration: 1 }}
    >
      <div className="flex items-start gap-8 md:gap-16">
        
        {/* Projects */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-xl md:text-2xl font-mono text-text-primary drop-shadow-glow">
            <Counter to={8} delay={4500} />
          </div>
          <div className="h-[1px] w-full bg-border" />
          <div className="text-[9px] tracking-[0.3em] uppercase text-text-secondary/70">
            PROJECTS
          </div>
        </div>

        {/* Credentials */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-xl md:text-2xl font-mono text-text-primary drop-shadow-glow">
            <Counter to={19} delay={4700} />
          </div>
          <div className="h-[1px] w-full bg-border" />
          <div className="text-[9px] tracking-[0.3em] uppercase text-text-secondary/70">
            CREDENTIALS
          </div>
        </div>

        {/* Internships */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-xl md:text-2xl font-mono text-text-primary drop-shadow-glow">
            <Counter to={3} delay={4900} />
          </div>
          <div className="h-[1px] w-full bg-border" />
          <div className="text-[9px] tracking-[0.3em] uppercase text-text-secondary/70 text-center">
            INTERNSHIP<br/>EXPERIENCES
          </div>
        </div>

      </div>
    </motion.div>
  );
}
