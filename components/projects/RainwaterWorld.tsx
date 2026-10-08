"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Droplet } from "lucide-react";
import { ProjectHUD } from "@/components/ui/ProjectHUD";
import { projects } from "@/data/projects";
import { CloudRain, Home, Cylinder, Droplets } from "lucide-react";

export function RainwaterWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const projectData = projects.find(p => p.title.includes("Rainwater"))!;

  // 0.0 - 0.15: Intro
  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  
  // HUD (Visible during the main scene, after intro, fades out at transition)
  const hudOpacity = useTransform(scrollYProgress, [0.1, 0.15, 0.9, 0.95], [0, 1, 1, 0]);

  // Adjust remaining beats by shifting them after 0.15
  const sceneY = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "-300%"]);
  
  const rainOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.75], [0, 1, 1, 0]);

  // Transition to AECE: The storage tank turns into a glowing decision core
  const transitionColor = useTransform(scrollYProgress, [0.95, 1], ["#0ea5e9", "#8b5cf6"]);
  const transitionScale = useTransform(scrollYProgress, [0.95, 1], [1, 50]);

  return (
    <section ref={containerRef} className="relative bg-[#082f49]">
      
      {/* DESKTOP 3D EXPERIENCE */}
      <div className="hidden md:block h-[350vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden perspective-[1000px] flex items-center justify-center">

          <ProjectHUD 
            worldNum="04"
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
            className="absolute inset-0 z-[70] flex flex-col items-center justify-center bg-[#082f49]"
            style={{ opacity: introOpacity }}
          >
            <Droplet size={48} className="text-sky-400 mb-6 opacity-80" />
            <div className="text-[10px] font-mono tracking-[0.3em] text-sky-400/70 uppercase mb-8">
              07 / PROJECT UNIVERSE
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white dark:text-white text-slate-900 tracking-widest uppercase mb-4 text-center max-w-3xl">
              {projectData.title}
            </h2>
            <div className="text-sm font-mono tracking-[0.2em] text-white/70 text-center max-w-xl mb-12">
              {projectData.description.toUpperCase()}
            </div>
            
            <div className="flex flex-col items-center gap-2 mb-16 text-xs font-mono tracking-[0.3em] text-sky-400 uppercase">
              <div>IoT DEVELOPER</div>
              <div>CLOUD ARCHITECT</div>
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

        {/* Global Rain overlay (Massive Density) */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none mix-blend-screen will-change-opacity"
          style={{ opacity: rainOpacity }}
        >
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-[2px] h-24 bg-sky-400/80 will-change-transform ${i > 20 ? "hidden md:block" : ""}`}
              style={{ left: `${((i * 13) % 100)}%` }}
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 0.4 + ((i * 3) % 1), repeat: Infinity, ease: "linear", delay: (i * 7) % 2 }}
            />
          ))}
        </motion.div>

        <motion.div 
          className="absolute top-0 left-0 w-full h-[400vh] pointer-events-none will-change-transform"
          style={{ y: sceneY }}
        >
          {/* Stage 1: CLOUD */}
          <div className="h-screen w-full flex flex-col items-center justify-center relative">
            <div className="relative w-[50vw] max-w-2xl h-64 mb-16 flex justify-center items-center scale-150">
              {/* Massive stylized CSS cloud */}
              <div className="absolute w-64 h-64 bg-sky-900/40 rounded-full blur-2xl animate-pulse" />
              <div className="absolute w-96 h-48 bg-gradient-to-b from-sky-300/20 to-sky-500/5 rounded-full -translate-x-24 translate-y-8 backdrop-blur-sm border border-sky-400/20" />
              <div className="absolute w-80 h-64 bg-gradient-to-b from-sky-200/20 to-sky-600/5 rounded-full translate-x-24 -translate-y-8 backdrop-blur-sm border border-sky-400/20" />
              <div className="absolute w-[28rem] h-56 bg-gradient-to-b from-white/10 to-transparent rounded-full translate-y-16 backdrop-blur-md border-t border-sky-300/30" />
            </div>
            <h2 className="text-6xl md:text-9xl font-black text-white tracking-widest drop-shadow-[0_0_50px_rgba(56,189,248,0.8)] mt-12 relative z-10">ATMOSPHERE</h2>
            <div className="text-sky-400/70 font-mono text-xl tracking-[0.5em] mt-8 relative z-10 font-bold">PRECIPITATION DETECTED</div>
          </div>

          {/* Stage 2: ROOFTOP */}
          <div className="h-screen w-full flex flex-col items-center justify-center relative bg-gradient-to-b from-transparent to-[#0c4a6e]">
            {/* Stylized Rooftop SVG */}
            <div className="w-[80vw] max-w-4xl h-[40vh] mb-12 relative flex justify-center">
              <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-[0_40px_50px_rgba(0,0,0,0.8)]" preserveAspectRatio="none">
                {/* Roof slopes */}
                <polygon points="100,20 10,80 190,80" fill="rgba(12,74,110,0.9)" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="100,20 190,80 200,80 100,10" fill="rgba(56,189,248,0.4)" />
                <polygon points="100,20 10,80 0,80 100,10" fill="rgba(56,189,248,0.2)" />
                {/* Gutter */}
                <rect x="5" y="80" width="190" height="8" fill="#0284c7" />
                <rect x="180" y="88" width="12" height="20" fill="#0369a1" />
              </svg>
            </div>
            <h2 className="text-6xl md:text-9xl font-black text-white tracking-widest drop-shadow-[0_0_40px_rgba(56,189,248,0.5)]">ROOFTOP</h2>
            <div className="text-sky-400/70 font-mono text-xl tracking-[0.5em] mt-8 font-bold">SURFACE COLLECTION</div>
          </div>

          {/* Stage 3: PIPE */}
          <div className="h-screen w-full flex flex-col items-center justify-center relative bg-gradient-to-b from-[#0c4a6e] to-[#0f172a]">
            {/* Stylized massive pipe */}
            <div className="w-32 h-[80vh] relative flex items-center justify-center mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 via-sky-700/40 to-sky-900/90 border-x-[8px] border-sky-900 rounded-sm shadow-[0_0_50px_rgba(14,165,233,0.2)]" />
              {/* Pipe rings */}
              <div className="absolute top-1/4 w-40 h-8 bg-sky-800 rounded shadow-xl border-y border-sky-700/50" />
              <div className="absolute top-3/4 w-40 h-8 bg-sky-800 rounded shadow-xl border-y border-sky-700/50" />
              {/* Flowing water */}
              <motion.div 
                className="absolute inset-x-4 top-0 h-1/2 bg-sky-400/70 blur-lg"
                animate={{ y: ["0%", "200%"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-x-8 top-0 h-1/3 bg-white/50 blur-md"
                animate={{ y: ["-50%", "300%"] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <h2 className="text-6xl md:text-9xl font-black text-white tracking-widest drop-shadow-[0_0_40px_rgba(56,189,248,0.5)] absolute top-1/2 -translate-y-1/2 mix-blend-overlay">FILTRATION</h2>
          </div>

          {/* Stage 4: STORAGE */}
          <div className="h-screen w-full flex flex-col items-center justify-center relative bg-[#0f172a]">
            <motion.div
              className="flex flex-col items-center w-full"
            >
              {/* Massive stylized Tank */}
              <div className="relative w-[80vw] md:w-[60vw] max-w-4xl h-[50vh] md:h-[60vh] mb-12 border-8 border-sky-900/50 bg-sky-950/40 rounded-b-[4rem] rounded-t-lg flex items-end justify-center overflow-hidden shadow-[0_0_100px_rgba(14,165,233,0.2)]">
                {/* Tank depth / grid */}
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.3) 2px, transparent 2px), linear-gradient(90deg, rgba(56, 189, 248, 0.3) 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
                
                {/* Water Level */}
                <motion.div 
                  className="w-full bg-sky-500/40 relative"
                  initial={{ height: "10%" }}
                  whileInView={{ height: "80%" }}
                  transition={{ duration: 3, ease: "easeOut" }}
                >
                  <div className="absolute top-0 inset-x-0 h-4 bg-sky-400/80 blur-md" />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-sky-600/50 to-transparent"
                    animate={{ opacity: [0.6, 0.9, 0.6] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>

              <div className="text-sm font-mono tracking-[0.4em] text-sky-400 mb-2">SMART TANK CORE</div>
              <h2 className="text-6xl md:text-9xl font-black text-white tracking-widest mb-12 drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]">STORED</h2>
              
              {/* Transition Core trigger */}
              <motion.div 
                className="w-32 h-32 rounded-full blur-[2px] shadow-[0_0_50px_rgba(14,165,233,0.5)] flex flex-col items-center justify-center relative overflow-hidden mt-8"
                style={{ backgroundColor: transitionColor as any, scale: transitionScale }}
              >
                <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-ping" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
          
          {/* TRANSITION TO AECE TEXT */}
          <motion.div 
            className="absolute inset-0 z-[80] flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity: useTransform(scrollYProgress, [0.95, 1], [0, 1]) }}
          >
            <div className="text-2xl font-black tracking-widest text-violet-500 uppercase">
              04 / COMPLETE
            </div>
          </motion.div>

        </div>
      </div>

      {/* MOBILE 2D FALLBACK */}
      <div className="md:hidden min-h-[100dvh] flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <Droplet size={32} className="text-sky-400 mb-8 opacity-80" />
        <div className="text-[10px] font-mono tracking-widest text-sky-400/70 uppercase mb-4 text-center">
          04 / PROJECT WORLD
        </div>
        <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-12 text-center leading-tight">
          {projectData.title}
        </h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center"
        >
          {/* Static Stage representation */}
          <div className="flex flex-col items-center mb-12">
            <CloudRain size={32} className="text-sky-300 mb-2 opacity-50" />
            <div className="w-[1px] h-4 bg-sky-500/50 mb-2" />
            <Home size={32} className="text-sky-300 mb-2 opacity-50" />
            <div className="w-[1px] h-4 bg-sky-500/50 mb-2" />
            <Cylinder size={32} className="text-sky-300 mb-8 opacity-50" />
          </div>

          <div className="text-sm font-mono tracking-[0.3em] text-sky-400 mb-4">SMART TANK</div>
          <h2 className="text-4xl font-black text-white tracking-widest mb-8">STORED</h2>
          
          <div className="flex items-center gap-4 border border-sky-900/50 bg-sky-900/20 px-8 py-4 rounded-full backdrop-blur-md">
            <Droplets size={20} className="text-sky-400" />
            <div className="text-xl font-light text-white tracking-widest">92% EFFICIENCY</div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
