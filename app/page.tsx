"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CinematicLanding } from "@/components/landing/CinematicLanding";
import { HeroVisuals } from "@/components/sections/HeroVisuals";
import { HeroContent } from "@/components/sections/HeroContent";

const AINetworkBackground = dynamic(
  () => import("@/components/background/AINetworkWrapper").then((mod) => mod.AINetworkBackground),
  { ssr: false }
);

export default function Home() {
  const [hasEnteredSystem, setHasEnteredSystem] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasEntered = sessionStorage.getItem("portfolio-entered");
    if (hasEntered === "true") {
      setHasEnteredSystem(true);
    }
  }, []);

  const handleEnterSystem = () => {
    setHasEnteredSystem(true);
    sessionStorage.setItem("portfolio-entered", "true");
  };

  if (!isMounted) return null;

  return (
    <main className="relative min-h-screen bg-[#020617] text-white overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* Cinematic Landing Page Overlay */}
      {!hasEnteredSystem && (
        <CinematicLanding onComplete={handleEnterSystem} />
      )}

      {/* Portfolio Content (Visible after entering) */}
      <div className={`transition-opacity duration-1000 w-full min-h-screen relative ${hasEnteredSystem ? "opacity-100" : "opacity-0 pointer-events-none hidden"}`}>
        
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <AINetworkBackground />
          <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay" />
        </div>
        
        {/* Main Content Container */}
        <div className="relative z-10 w-full min-h-screen max-w-[1800px] mx-auto flex flex-col xl:flex-row pt-20 xl:pt-0">
          
          {/* Far Left: Vertical Scroll Indicator (Desktop Only) */}
          <div className="hidden xl:flex flex-col items-center justify-center gap-6 absolute left-6 top-1/2 -translate-y-1/2 z-40 h-full max-h-[600px]">
            <div className="flex flex-col gap-6 text-[10px] font-mono text-white/30">
              <span className="text-cyan-400 font-bold flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />01</span>
              <span className="pl-3.5 hover:text-white/70 transition-colors cursor-pointer">02</span>
              <span className="pl-3.5 hover:text-white/70 transition-colors cursor-pointer">03</span>
              <span className="pl-3.5 hover:text-white/70 transition-colors cursor-pointer">04</span>
              <span className="pl-3.5 hover:text-white/70 transition-colors cursor-pointer">05</span>
            </div>
            <div className="w-[1px] h-32 bg-gradient-to-b from-cyan-500/50 to-transparent my-4" />
            <div className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">
              Scroll to explore
            </div>
          </div>

          {/* Left Column: Visuals & Portrait (55%) */}
          {/* On mobile it stacks on top, on desktop it takes the left side */}
          <div className="w-full xl:w-[55%] h-[60vh] xl:h-screen relative flex items-end justify-center xl:pl-20">
            <HeroVisuals />
          </div>

          {/* Right Column: Content (45%) */}
          <div className="w-full xl:w-[45%] flex flex-col justify-center px-6 sm:px-12 xl:pr-16 xl:pl-8 pt-8 xl:pt-28 pb-20 z-30">
            <HeroContent />
          </div>

        </div>
      </div>
    </main>
  );
}
