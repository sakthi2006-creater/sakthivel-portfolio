"use client";

import { useState, useEffect } from "react";
import { NeuralField } from "./NeuralField";
import { NeuralCore } from "./NeuralCore";
import { IdentityOrbit } from "./IdentityOrbit";
import { LiveSystemOrb } from "./LiveSystemOrb";
import { ProjectDNARing } from "./ProjectDNARing";
import { SystemMemory } from "./SystemMemory";
import { LandingHUD } from "./LandingHUD";
import { LandingCursor } from "./LandingCursor";
import { EnterSystemTransition } from "./EnterSystemTransition";

export function CinematicLanding({ onComplete }: { onComplete: () => void }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [clickPhase, setClickPhase] = useState(0); 
  const [hoverState, setHoverState] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !isTransitioning) {
        handleEnter();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isTransitioning]);

  const handleEnter = () => {
    setIsTransitioning(true);
    setHoverState(null);
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      setTimeout(() => onComplete(), 500);
      return;
    }

    setClickPhase(1); // 0%
    setTimeout(() => setClickPhase(2), 400); // 25% Projects pull in
    setTimeout(() => setClickPhase(3), 800); // 50% Particles break
    setTimeout(() => setClickPhase(4), 1200); // 75% Camera zoom
    setTimeout(() => {
      setClickPhase(5); // 100% Reveal
      onComplete();
    }, 1800); 
  };

  return (
    <div className={`fixed inset-0 z-[100] bg-background overflow-hidden selection:bg-transparent transition-colors duration-500
      ${hoverState === 'ENTER' ? 'bg-background/90' : ''}
    `}>
      <LandingCursor hoverState={hoverState} />
      
      {/* z-0 */}
      <NeuralField isTransitioning={clickPhase >= 4} />
      
      {/* Desktop/Tablet Composition */}
      {!isMobile && (
        <>
          {/* z-10 */}
          <ProjectDNARing 
            isTransitioning={clickPhase >= 2} 
            setHoveredProject={setHoveredProject}
          />
          {/* z-30 */}
          <IdentityOrbit isTransitioning={clickPhase >= 1} />
          <LiveSystemOrb isTransitioning={clickPhase >= 1} />
          <SystemMemory isTransitioning={clickPhase >= 1} />
          
          {/* z-20 (Glow) + z-40 (Text Stack containing CTA) */}
          <NeuralCore 
            isTransitioning={clickPhase >= 3} 
            setHoverState={setHoverState}
          >
            {/* The CTA is passed as children to sit perfectly in the central flex stack */}
            <EnterSystemTransition 
              onEnter={handleEnter} 
              isTransitioning={clickPhase >= 1} 
              setHoverState={setHoverState}
              clickPhase={clickPhase}
            />
          </NeuralCore>

          {/* z-50 */}
          <LandingHUD isTransitioning={clickPhase >= 1} />
        </>
      )}

      {/* Mobile Stacked Composition */}
      {isMobile && (
        <div className="absolute inset-0 flex flex-col pt-12 px-6 pb-6 overflow-y-auto z-40">
          
          <div className="flex-none min-h-[300px] flex items-center justify-center relative">
            <NeuralCore 
              isTransitioning={clickPhase >= 3} 
              setHoverState={setHoverState}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 my-8">
            {["MEDICAL", "CYBER", "AECE", "GRAPH"].map(p => (
              <div key={p} className="text-center p-4 border border-border/50 bg-background/50 rounded text-xs font-mono tracking-widest text-primary">
                {p}
              </div>
            ))}
          </div>

          <div className="flex justify-center my-8">
            <EnterSystemTransition 
              onEnter={handleEnter} 
              isTransitioning={clickPhase >= 1} 
              setHoverState={setHoverState}
              clickPhase={clickPhase}
            />
          </div>

          <div className="flex flex-col gap-8 mt-4 text-center">
            <div className="text-xs text-text-secondary tracking-widest">01 / IDENTITY</div>
            <div className="text-sm text-text-primary tracking-[0.2em] uppercase font-bold">AI & DATA SCIENCE<br/>LOYOLA 2024-2028</div>
            <div className="h-[1px] bg-border mx-12" />
            <div className="text-xs text-text-secondary tracking-widest">● LIVE NOW</div>
            <div className="text-sm text-primary tracking-[0.2em] uppercase font-bold">FLEXZO HR SERVICE<br/>BACKEND DEV</div>
          </div>
          
          <div className="mt-12">
            <LandingHUD isTransitioning={clickPhase >= 1} />
          </div>

        </div>
      )}

    </div>
  );
}
