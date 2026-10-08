"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FloatingBadge } from "@/components/ui/FloatingBadge";
import { Brain, Code2, Database, Sparkles, TerminalSquare, Zap } from "lucide-react";

export function HeroVisuals() {
  const [imgSrc, setImgSrc] = useState("/myphoto.png");
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse parallax tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 60 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 30;
    const y = (e.clientY - rect.top - rect.height / 2) / 30;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Subtle Parallax Transforms (3 levels of depth)
  const portalX = useTransform(smoothX, [-10, 10], [15, -15]);
  const portalY = useTransform(smoothY, [-10, 10], [15, -15]);
  
  const portraitX = useTransform(smoothX, [-10, 10], [-5, 5]);
  const portraitY = useTransform(smoothY, [-10, 10], [-5, 5]);

  const badgesX = useTransform(smoothX, [-10, 10], [-25, 25]);
  const badgesY = useTransform(smoothY, [-10, 10], [-25, 25]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-end justify-center perspective-[1000px]"
    >
      {/* 1. Deep Futuristic Portal (Furthest Layer) */}
      <motion.div 
        style={{ x: portalX, y: portalY }}
        className="absolute top-[40%] xl:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] xl:w-[650px] xl:h-[650px] pointer-events-none flex items-center justify-center z-0"
      >
        <div className="absolute inset-0 rounded-full border border-cyan-500/10 shadow-[0_0_150px_rgba(34,211,238,0.15)]" />
        <div className="absolute w-[95%] h-[95%] rounded-full border-t border-l border-cyan-400/40 animate-[spin_30s_linear_infinite]" />
        <div className="absolute w-[115%] h-[115%] rounded-full border-b border-r border-white/10 border-dashed animate-[spin_40s_linear_infinite_reverse]" />
        <div className="absolute w-[60%] h-[60%] rounded-full bg-cyan-500/10 blur-[80px]" />
        
        {/* Subtle geometric lines */}
        <svg className="absolute w-full h-full opacity-20" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-cyan-500" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-cyan-500/50" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.2" className="text-cyan-500/50" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.2" className="text-cyan-500/50" />
        </svg>
      </motion.div>

      {/* 2. Floating Tech Badges (Middle Layer) */}
      <motion.div 
        style={{ x: badgesX, y: badgesY }}
        className="absolute inset-0 pointer-events-none hidden md:block z-10"
      >
        {/* Far positioned to avoid covering the face */}
        {/* Left Side */}
        <FloatingBadge icon={<Code2 />} title="Python" subtitle="DEVELOPMENT" className="top-[15%] left-[2%] xl:left-[8%]" delay={0.2} duration={5} />
        <FloatingBadge icon={<Brain />} title="AI / ML" subtitle="MODEL BUILDING" className="top-[45%] left-[-5%] xl:left-[-2%]" delay={0.4} duration={6} />
        <FloatingBadge icon={<Database />} title="Data Science" subtitle="ANALYTICS" className="top-[75%] left-[5%] xl:left-[10%]" delay={0.6} duration={4.5} />
        
        {/* Right Side */}
        <FloatingBadge icon={<TerminalSquare />} title="Next.js" subtitle="WEB APPS" className="top-[20%] right-[0%] xl:right-[5%]" delay={0.3} duration={5.5} />
        <FloatingBadge icon={<Zap />} title="FastAPI" subtitle="BACKEND" className="top-[50%] right-[-5%] xl:right-[-2%]" delay={0.5} duration={4} />
        <FloatingBadge icon={<Sparkles />} title="GenAI" subtitle="INNOVATION" className="top-[80%] right-[0%] xl:right-[5%]" delay={0.7} duration={5} />
      </motion.div>

      {/* 3. The Massive Portrait (Closest Layer) */}
      {/* We use mask-image to cleanly fade out the bottom without any bounding box artifacts */}
      <motion.div 
        style={{ x: portraitX, y: portraitY }}
        className="relative z-20 w-full h-[90%] xl:h-[95%] flex items-end justify-center pointer-events-none"
      >
        <Image 
          src={imgSrc} 
          alt="Sakthivel R. Portrait"
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 50vw"
          className="object-contain object-bottom filter drop-shadow-[0_0_30px_rgba(34,211,238,0.2)] brightness-105 contrast-105"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          }}
          onError={() => {
            if (imgSrc.endsWith('.png')) {
              setImgSrc('/myphoto.jpg');
            }
          }}
        />
      </motion.div>

    </div>
  );
}
