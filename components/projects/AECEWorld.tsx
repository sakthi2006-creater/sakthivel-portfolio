"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scale } from "lucide-react";
import { ProjectHUD } from "@/components/ui/ProjectHUD";
import { projects } from "@/data/projects";

export function AECEWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const projectData = projects.find(p => p.title.includes("AECE"))!;

  // 0.0 - 0.15: Intro
  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  
  // HUD
  const hudOpacity = useTransform(scrollYProgress, [0.1, 0.15, 0.9, 0.95], [0, 1, 1, 0]);

  // Adjust remaining beats by shifting them after 0.15
  const scenarioOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.45, 0.55], [0, 1, 1, 0]);
  const scenarioY = useTransform(scrollYProgress, [0.15, 0.35], [50, -50]);
  const scenarioZ = useTransform(scrollYProgress, [0.2, 0.4], [0, 500]);

  const dimZ = useTransform(scrollYProgress, [0.15, 0.55], [-1500, 0]);

  const reasoningOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.75, 0.85], [0, 1, 1, 0]);
  const reasoningScale = useTransform(scrollYProgress, [0.45, 0.65], [0.5, 1]);

  const coreScale = useTransform(scrollYProgress, [0.65, 0.75], [1, 50]);
  const coreColor = useTransform(scrollYProgress, [0.65, 0.75], ["rgba(245,158,11,0)", "rgba(139,92,246,1)"]);

  const decisionOpacity = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 0]);
  const decisionScale = useTransform(scrollYProgress, [0.75, 0.85], [0.8, 1]);

  // Transition to Graph
  const transitionZ = useTransform(scrollYProgress, [0.95, 1], [0, 1000]);
  const transitionOpacity = useTransform(scrollYProgress, [0.95, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative bg-zinc-950">
      
      {/* DESKTOP 3D EXPERIENCE */}
      <div className="hidden md:block h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden perspective-[1000px] flex items-center justify-center">

          <ProjectHUD 
            worldNum="05"
            title={projectData.title}
            subtitle={projectData.description}
            role={projectData.highlights[0]}
            liveLink={projectData.demo}
            githubLink={projectData.github}
            color={projectData.color}
            opacity={hudOpacity}
          />

          {/* INTRO SEQUENCE */}
          <motion.div 
            className="absolute inset-0 z-[70] flex flex-col items-center justify-center bg-zinc-950"
            style={{ opacity: introOpacity }}
          >
            <Scale size={48} className="text-amber-500 mb-6 opacity-80" />
            <div className="text-[10px] font-mono tracking-[0.3em] text-amber-500/70 uppercase mb-8">
              07 / PROJECT UNIVERSE
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white dark:text-white text-slate-900 tracking-widest uppercase mb-4 text-center max-w-3xl">
              {projectData.title}
            </h2>
            <div className="text-sm font-mono tracking-[0.2em] text-white/70 text-center max-w-xl mb-12">
              {projectData.description.toUpperCase()}
            </div>
            
            <div className="flex flex-col items-center gap-2 mb-16 text-xs font-mono tracking-[0.3em] text-amber-500 uppercase">
              <div>AI ETHICS RESEARCHER</div>
              <div>SYSTEM ARCHITECT</div>
            </div>

            <div className="flex gap-8 mb-16">
              {projectData.demo && (
                <a href={projectData.demo} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono tracking-[0.2em] text-white/60 hover:text-white border border-white/20 px-6 py-3 rounded hover:bg-white/10 transition-all">
                  [ LIVE DEMO ↗ ]
                </a>
              )}
              {projectData.github && (
                <a href={projectData.github} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono tracking-[0.2em] text-white/60 hover:text-white border border-white/20 px-6 py-3 rounded hover:bg-white/10 transition-all">
                  [ GITHUB ↗ ]
                </a>
              )}
            </div>

            <div className="text-[9px] font-mono tracking-[0.4em] text-white/30 animate-pulse uppercase">
              ↓ ENTER WORLD
            </div>
          </motion.div>

        {/* 1. SCENARIO */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
          style={{ opacity: scenarioOpacity, z: scenarioZ, y: scenarioY }}
        >
          <div className="text-xs font-mono tracking-[0.4em] text-zinc-500 mb-6">AECE SYSTEM</div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-widest text-center">
            ETHICAL SCENARIO
          </h2>
        </motion.div>

        {/* 2. REASONING DIMENSIONS CONVERGING */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none transform-style-3d"
          style={{ opacity: reasoningOpacity, scale: reasoningScale }}
        >
          {/* Massive Surrounding Models */}
          <motion.div className="absolute top-1/4 left-1/4 text-5xl md:text-8xl font-black tracking-widest text-zinc-700/50 flex flex-col items-end" style={{ z: dimZ, x: dimZ, y: dimZ }}>
            UTILITARIAN
            <div className="w-[40vw] h-[2px] bg-amber-500/30 rotate-45 origin-right translate-y-12 translate-x-12" />
          </motion.div>
          <motion.div className="absolute top-1/4 right-1/4 text-5xl md:text-8xl font-black tracking-widest text-zinc-700/50 flex flex-col items-start" style={{ z: dimZ, x: useTransform(dimZ, v => -v), y: dimZ }}>
            VIRTUE
            <div className="w-[40vw] h-[2px] bg-amber-500/30 -rotate-45 origin-left translate-y-12 -translate-x-12" />
          </motion.div>
          <motion.div className="absolute bottom-1/4 left-1/4 text-5xl md:text-8xl font-black tracking-widest text-zinc-700/50 flex flex-col items-end" style={{ z: dimZ, x: dimZ, y: useTransform(dimZ, v => -v) }}>
            <div className="w-[40vw] h-[2px] bg-amber-500/30 -rotate-45 origin-right -translate-y-12 translate-x-12" />
            DEONTOLOGICAL
          </motion.div>
          <motion.div className="absolute bottom-1/4 right-1/4 text-5xl md:text-8xl font-black tracking-widest text-zinc-700/50 flex flex-col items-start" style={{ z: dimZ, x: useTransform(dimZ, v => -v), y: useTransform(dimZ, v => -v) }}>
            <div className="w-[40vw] h-[2px] bg-amber-500/30 rotate-45 origin-left -translate-y-12 -translate-x-12" />
            CARE
          </motion.div>

          {/* Central Core Expansion */}
          <motion.div 
            className="absolute w-48 h-48 md:w-80 md:h-80 rounded-full border-[8px] border-amber-500/50 flex flex-col items-center justify-center text-sm md:text-2xl font-black text-amber-500 tracking-[0.5em] backdrop-blur-md z-30 shadow-[0_0_150px_rgba(245,158,11,0.5)] bg-zinc-950/50"
            style={{ scale: coreScale, backgroundColor: coreColor as any }}
          >
            <motion.div className="absolute inset-0 rounded-full border border-amber-400/50 animate-ping" />
            AI CORE
          </motion.div>
          
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1)_0%,transparent_50%)]" />
        </motion.div>

        {/* 3. DECISION GENERATED */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none mix-blend-screen"
          style={{ opacity: decisionOpacity, scale: decisionScale }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.3)_0%,transparent_70%)] opacity-50" />
          
          <div className="text-sm md:text-xl font-mono tracking-[0.5em] text-violet-300 mb-8 border border-violet-500/50 px-8 py-4 rounded-full shadow-[0_0_50px_rgba(139,92,246,0.5)]">
            REASONING COMPLETE
          </div>
          <h2 className="text-6xl md:text-9xl font-black text-white tracking-widest mb-12 text-center leading-tight drop-shadow-[0_0_50px_rgba(139,92,246,1)]">
            DECISION<br/>GENERATED
          </h2>
          
          <div className="max-w-3xl text-center text-white/90 font-mono text-lg md:text-xl leading-relaxed tracking-wider border-t border-violet-500/50 pt-8 mt-8">
            MULTI-DIMENSIONAL EVALUATION MERGED WITH CONTEXTUAL GOVERNANCE DIRECTIVES.
          </div>
        </motion.div>

        {/* TRANSITION TO GRAPH TEXT */}
        <motion.div 
          className="absolute inset-0 z-[80] flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: transitionOpacity, z: transitionZ }}
        >
          <div className="text-2xl font-black tracking-widest text-blue-500 uppercase">
            05 / COMPLETE
          </div>
        </motion.div>

        </div>
      </div>

      {/* MOBILE 2D FALLBACK */}
      <div className="md:hidden min-h-[100dvh] flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <Scale size={32} className="text-violet-500 mb-8 opacity-80" />
        <div className="text-[10px] font-mono tracking-widest text-violet-500/70 uppercase mb-4 text-center">
          05 / PROJECT WORLD
        </div>
        <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-12 text-center leading-tight">
          {projectData.title}
        </h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center w-full max-w-sm"
        >
          {/* Static Converged representation */}
          <div className="w-full aspect-square border border-zinc-800 rounded-lg flex items-center justify-center relative overflow-hidden mb-8">
            <div className="w-16 h-16 border border-zinc-700 bg-zinc-900 rounded flex items-center justify-center text-xs font-mono text-zinc-500 tracking-widest z-30 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              CORE
            </div>
            {/* Surrounding nodes simplified */}
            <div className="absolute top-8 left-8 text-[9px] font-mono tracking-widest text-zinc-600">UTILITARIAN</div>
            <div className="absolute bottom-8 right-8 text-[9px] font-mono tracking-widest text-zinc-600">VIRTUE</div>
            <div className="absolute top-1/2 left-4 -translate-y-1/2 text-[9px] font-mono tracking-widest text-zinc-600">CONTEXT</div>
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
          </div>

          <div className="text-[10px] font-mono tracking-[0.5em] text-zinc-500 mb-6 border border-zinc-800 px-4 py-2 rounded-full">
            REASONING COMPLETE
          </div>
          <h2 className="text-3xl font-black text-white tracking-widest mb-6 leading-tight">
            DECISION<br/>GENERATED
          </h2>
          
          <div className="text-zinc-400 font-mono text-[10px] leading-relaxed tracking-wider">
            MULTI-DIMENSIONAL EVALUATION MERGED WITH CONTEXTUAL GOVERNANCE DIRECTIVES.
          </div>
        </motion.div>
      </div>

    </section>
  );
}
