"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { HeartPulse, ScanLine, FileText, Database, Activity } from "lucide-react";
import { ProjectHUD } from "@/components/ui/ProjectHUD";
import { projects } from "@/data/projects";

export function MedicalAnalyzerWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const projectData = projects.find(p => p.title.includes("Medical"))!;

  // 10 Scenes map (0 to 9)
  const sceneProgress = useTransform(scrollYProgress, 
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  );
  
  const [activeScene, setActiveScene] = useState(0);
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  
  sceneProgress.on("change", (latest) => {
    const scene = Math.min(9, Math.floor(latest));
    if (scene !== activeScene) {
      setActiveScene(scene);
    }
  });

  const hudOpacity = useTransform(scrollYProgress, [0.05, 0.1, 0.9, 0.95], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative bg-[#020617] w-full text-white">
      
      {/* Mobile Stack Fallback */}
      <div className="md:hidden min-h-[100dvh] flex flex-col items-center p-8">
        <HeartPulse size={32} className="text-cyan-400 mb-8 opacity-80" />
        <div className="text-[10px] font-mono tracking-widest text-cyan-400/70 uppercase mb-4 text-center">
          01 / PROJECT WORLD
        </div>
        <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-6 text-center leading-tight">
          {projectData.title}
        </h2>
        <div className="text-xs font-mono text-white/70 mb-12 text-center">
          {projectData.description}
        </div>
        <div className="flex gap-4 mb-16">
          <a href={projectData.github} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-white border border-white/20 px-4 py-2 rounded">
            GITHUB ↗
          </a>
          <a href={projectData.demo!} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-white border border-cyan-500/50 bg-cyan-900/30 px-4 py-2 rounded">
            DEMO ↗
          </a>
        </div>
      </div>

      {/* DESKTOP NATIVE SCROLL STORY */}
      <div className="hidden md:block">
        
        <ProjectHUD 
          worldNum="01"
          title={projectData.title}
          subtitle={projectData.description}
          role={projectData.highlights[0]}
          liveLink={projectData.demo}
          githubLink={projectData.github}
          color="#22d3ee"
          opacity={hudOpacity}
        />

        {/* STICKY BACKGROUND MEDICAL HOLOGRAM LAYER */}
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden pointer-events-none z-0 flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1)_0%,transparent_100%)] pointer-events-none" />

          {/* THE MEDICAL REPORT HOLOGRAM */}
          <motion.div 
            className="absolute flex flex-col pointer-events-none"
            initial={false}
            animate={{
              // Shift right for text on left, move center for huge reveals
              x: activeScene === 1 || activeScene === 2 || activeScene === 5 || activeScene === 6 ? "25vw" : 0,
              y: activeScene === 3 || activeScene === 7 ? "20vh" : 0,
              scale: activeScene === 4 ? 1.5 : (activeScene === 3 || activeScene === 7 ? 0.8 : (activeScene === 8 ? 0 : 1.2)),
              opacity: activeScene === 8 ? 0 : 1,
              rotateY: activeScene === 4 ? 0 : -5,
              rotateX: activeScene === 4 ? 0 : 5,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className={`
              relative w-[500px] h-[700px] bg-[#0f172a]/80 backdrop-blur-md border rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.1)] transition-colors duration-1000
              ${activeScene === 4 ? 'border-cyan-400/80 pointer-events-auto' : 'border-cyan-500/30'}
              ${activeScene === 9 ? 'opacity-30 border-cyan-900/50' : ''}
            `}>
              {/* Report Header */}
              <div className="p-8 border-b border-cyan-500/30 flex justify-between items-start">
                <div>
                  <div className="text-2xl font-black tracking-widest text-white">MEDICAL REPORT</div>
                  <div className="text-xs font-mono text-cyan-400/50 mt-2">PATIENT ID: #8472-A</div>
                </div>
                {activeScene === 4 && (
                  <div className="text-[10px] font-bold bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded animate-pulse">
                    DEMO / SAMPLE DATA
                  </div>
                )}
              </div>

              {/* Report Content */}
              <div className="p-12 flex flex-col gap-12 font-mono relative">
                <div 
                  className="flex justify-between items-end border-b border-white/10 pb-4 relative group cursor-crosshair"
                  onMouseEnter={() => activeScene === 4 && setHoveredField("HEMO")}
                  onMouseLeave={() => activeScene === 4 && setHoveredField(null)}
                >
                  <span className="text-lg text-white/50 tracking-widest">HEMOGLOBIN</span>
                  <span className="text-5xl text-cyan-400 font-bold tracking-tighter">13.2 <span className="text-xl font-light">g/dL</span></span>
                  
                  {activeScene === 4 && hoveredField === "HEMO" && (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="absolute -left-12 top-0 bottom-0 flex items-center">
                      <div className="bg-cyan-900 text-cyan-400 px-3 py-1 rounded text-xs font-bold tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                        EXTRACTED
                      </div>
                    </motion.div>
                  )}
                </div>

                <div 
                  className="flex justify-between items-end border-b border-white/10 pb-4 relative cursor-crosshair"
                  onMouseEnter={() => activeScene === 4 && setHoveredField("GLUC")}
                  onMouseLeave={() => activeScene === 4 && setHoveredField(null)}
                >
                  <span className="text-lg text-white/50 tracking-widest">GLUCOSE</span>
                  <span className="text-5xl text-white font-bold tracking-tighter">102 <span className="text-xl font-light">mg/dL</span></span>
                  
                  {activeScene === 4 && hoveredField === "GLUC" && (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="absolute -left-12 top-0 bottom-0 flex items-center">
                      <div className="bg-cyan-900 text-cyan-400 px-3 py-1 rounded text-xs font-bold tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                        EXTRACTED
                      </div>
                    </motion.div>
                  )}
                </div>

                <div 
                  className="flex justify-between items-end border-b border-white/10 pb-4 relative cursor-crosshair"
                  onMouseEnter={() => activeScene === 4 && setHoveredField("BP")}
                  onMouseLeave={() => activeScene === 4 && setHoveredField(null)}
                >
                  <span className="text-lg text-white/50 tracking-widest">BLOOD PRESSURE</span>
                  <span className="text-5xl text-cyan-400 font-bold tracking-tighter">120/80</span>
                  
                  {activeScene === 4 && hoveredField === "BP" && (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="absolute -left-12 top-0 bottom-0 flex items-center">
                      <div className="bg-cyan-900 text-cyan-400 px-3 py-1 rounded text-xs font-bold tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                        EXTRACTED
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Holographic Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <HeartPulse size={300} />
              </div>

              {/* Scanning Laser (Active in Scene 2) */}
              <AnimatePresence>
                {activeScene === 2 && (
                  <motion.div 
                    className="absolute left-0 right-0 h-[4px] bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,1)] z-20 pointer-events-none"
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* 10 NATIVE MIN-H-SCREEN SCENES (FOREGROUND TEXT LAYER) */}
        <div className="relative z-10 w-full lg:pr-[140px] -mt-[100svh]">
          
          {/* 01: Intro */}
          <div className="min-h-[100svh] w-full flex flex-col justify-center px-12 md:px-24">
            <div className="max-w-3xl pointer-events-auto bg-black/60 p-12 rounded-3xl backdrop-blur-md border border-cyan-900/30">
              <div className="text-sm font-mono tracking-[0.4em] text-cyan-500 uppercase mb-6">01 / PROJECT UNIVERSE</div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-widest uppercase mb-6 leading-tight">
                {projectData.title}
              </h2>
              <div className="text-xl font-mono text-cyan-400 tracking-[0.2em] mb-8">
                AI-POWERED HEALTH REPORT ANALYSIS
              </div>
              <div className="text-lg font-mono tracking-[0.2em] text-white/50 mb-12">
                CORE DEVELOPER & UI/UX DESIGNER
              </div>
              <div className="flex gap-6 pointer-events-auto">
                <a href={projectData.github} target="_blank" rel="noopener noreferrer" className="text-sm font-mono tracking-[0.2em] text-white border border-white/20 px-8 py-4 hover:bg-white/10 transition-colors">
                  [ GITHUB ↗ ]
                </a>
                <a href={projectData.demo!} target="_blank" rel="noopener noreferrer" className="text-sm font-mono tracking-[0.2em] text-cyan-400 border border-cyan-500/50 bg-cyan-900/30 px-8 py-4 hover:bg-cyan-900/60 transition-colors">
                  [ LIVE DEMO ↗ ]
                </a>
              </div>
            </div>
          </div>

          {/* 02: Concept */}
          <div className="min-h-[100svh] w-full flex flex-col justify-center px-12 md:px-24">
            <div className="flex flex-col gap-8">
              <div className="text-3xl font-black text-white tracking-widest">MEDICAL REPORT</div>
              <div className="text-cyan-500 text-3xl pl-4">↓</div>
              <div className="text-4xl font-black text-cyan-400 tracking-widest max-w-lg drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">UNSTRUCTURED CLINICAL INFORMATION</div>
              <div className="text-cyan-500 text-3xl pl-4">↓</div>
              <div className="text-3xl font-black text-white tracking-widest">AI-ASSISTED ANALYSIS</div>
              <div className="text-cyan-500 text-3xl pl-4">↓</div>
              <div className="text-3xl font-black text-white tracking-widest">EASIER-TO-UNDERSTAND INSIGHTS</div>
            </div>
          </div>

          {/* 03: Why? */}
          <div className="min-h-[100svh] w-full flex flex-col justify-center px-12 md:px-24">
            <div className="flex flex-col gap-8">
              <div className="text-3xl font-black text-white tracking-widest">UNSTRUCTURED TEXT</div>
              <div className="text-cyan-500 text-3xl pl-4">↓</div>
              <div className="text-5xl font-black text-cyan-400 tracking-widest drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">OCR / SCAN</div>
              <div className="text-cyan-500 text-3xl pl-4">↓</div>
              <div className="text-3xl font-black text-white tracking-widest">DATA EXTRACTION</div>
              <div className="text-cyan-500 text-3xl pl-4">↓</div>
              <div className="text-3xl font-black text-white tracking-widest">MEANING</div>
            </div>
          </div>

          {/* 04: Project Flow */}
          <div className="min-h-[100svh] w-full flex flex-col justify-start items-center pt-24">
            <div className="text-sm font-mono tracking-[0.4em] text-cyan-500 mb-8">PROJECT PIPELINE</div>
            <div className="flex flex-col items-center gap-6">
              <div className="text-cyan-500 text-3xl">↓</div>
              <div className="text-3xl font-black text-white tracking-widest px-12 py-6 border border-white/20 rounded bg-black/60 backdrop-blur-sm">OCR</div>
              <div className="text-cyan-500 text-3xl">↓</div>
              <div className="text-3xl font-black text-white tracking-widest px-12 py-6 border border-white/20 rounded bg-black/60 backdrop-blur-sm">TEXT EXTRACTION</div>
              <div className="text-cyan-500 text-3xl">↓</div>
              <div className="text-4xl font-black text-cyan-400 tracking-widest px-16 py-8 border border-cyan-500/50 rounded bg-cyan-900/40 drop-shadow-[0_0_25px_rgba(34,211,238,0.5)] backdrop-blur-md">AI ANALYSIS</div>
              <div className="text-cyan-500 text-3xl">↓</div>
              <div className="text-3xl font-black text-white tracking-widest px-12 py-6 border border-white/20 rounded bg-black/60 backdrop-blur-sm">HEALTH INSIGHTS</div>
            </div>
          </div>

          {/* 05: Discovery */}
          <div className="min-h-[100svh] w-full flex flex-col justify-end items-center pb-24 pointer-events-none">
            <div className="text-sm font-mono tracking-[0.4em] text-cyan-400 bg-cyan-900/80 px-8 py-4 rounded-full border border-cyan-500/50 drop-shadow-xl pointer-events-auto">
              HOVER OVER REPORT DATA TO SEE EXTRACTION
            </div>
          </div>

          {/* 06: My Role */}
          <div className="min-h-[100svh] w-full flex flex-col justify-center px-12 md:px-24">
            <div className="max-w-2xl bg-black/60 backdrop-blur-md p-16 border border-cyan-900/50">
              <div className="text-sm font-mono tracking-[0.5em] text-cyan-500 mb-12">MY ROLE</div>
              <div className="text-5xl md:text-7xl font-black text-white tracking-widest mb-6 leading-tight">
                CORE DEVELOPER
              </div>
              <div className="text-3xl text-cyan-500 mb-6 px-4">×</div>
              <div className="text-5xl md:text-7xl font-black text-white tracking-widest mb-16 leading-tight">
                UI / UX DESIGNER
              </div>
              <div className="inline-block text-lg font-mono tracking-[0.2em] text-cyan-400 border border-cyan-500/30 bg-cyan-900/20 px-8 py-4 rounded-full">
                PRESENTED AT FORGE VISTA 2026 PROJECT EXPO
              </div>
            </div>
          </div>

          {/* 07: Tech */}
          <div className="min-h-[100svh] w-full flex flex-col justify-center px-12 md:px-24">
            <div className="text-sm font-mono tracking-[0.4em] text-cyan-500 mb-12">TECHNOLOGY</div>
            <div className="flex flex-col gap-10">
              <div className="text-3xl md:text-5xl font-black text-white tracking-widest bg-[#0f172a]/90 px-10 py-6 border border-cyan-500/30 rounded inline-flex items-center gap-6 shadow-xl w-fit">
                <Activity className="text-cyan-400" size={40}/> AI LOGIC INTEGRATION
              </div>
              <div className="text-cyan-500 text-3xl pl-12">↓</div>
              <div className="text-3xl md:text-5xl font-black text-white tracking-widest bg-[#0f172a]/90 px-10 py-6 border border-cyan-500/30 rounded inline-flex items-center gap-6 shadow-xl w-fit">
                <Database className="text-cyan-400" size={40}/> SYSTEM DESIGN
              </div>
              <div className="text-cyan-500 text-3xl pl-12">↓</div>
              <div className="text-3xl md:text-5xl font-black text-white tracking-widest bg-[#0f172a]/90 px-10 py-6 border border-cyan-500/30 rounded inline-flex items-center gap-6 shadow-xl w-fit">
                <FileText className="text-cyan-400" size={40}/> UI / UX
              </div>
              <div className="text-cyan-500 text-3xl pl-12">↓</div>
              <div className="text-3xl md:text-5xl font-black text-white tracking-widest bg-[#0f172a]/90 px-10 py-6 border border-cyan-500/30 rounded shadow-xl w-fit">
                DEVELOPMENT
              </div>
            </div>
          </div>

          {/* 08: Architecture */}
          <div className="min-h-[100svh] w-full flex flex-col justify-start items-center pt-24">
            <div className="text-sm font-mono tracking-[0.4em] text-cyan-500 mb-12 bg-black/60 px-4 py-2 rounded">CONCEPTUAL ARCHITECTURE</div>
            <div className="flex flex-col items-center gap-6">
              <div className="text-cyan-500 text-3xl">↓</div>
              <div className="text-2xl font-mono text-white tracking-widest flex items-center gap-6 bg-black/80 px-8 py-4 border border-white/20 rounded"><ScanLine size={24}/> OCR SCAN</div>
              <div className="text-cyan-500 text-3xl">↓</div>
              <div className="text-2xl font-mono text-white tracking-widest flex items-center gap-6 bg-black/80 px-8 py-4 border border-white/20 rounded"><FileText size={24}/> TEXT EXTRACTION</div>
              <div className="text-cyan-500 text-3xl">↓</div>
              <div className="text-2xl font-mono text-cyan-400 tracking-widest flex items-center gap-6 bg-cyan-900/40 px-8 py-4 border border-cyan-500/50 rounded drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]"><Activity size={24}/> AI / RULE-BASED ANALYSIS</div>
              <div className="text-cyan-500 text-3xl">↓</div>
              <div className="text-2xl font-mono text-white tracking-widest bg-black/80 px-8 py-4 border border-white/20 rounded">STRUCTURED INSIGHTS</div>
            </div>
          </div>

          {/* 09: Insight */}
          <div className="min-h-[100svh] w-full flex flex-col justify-center items-center px-12 md:px-24 text-center">
            <div className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none max-w-6xl drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              "UNDERSTANDING MEDICAL DATA WITHOUT MANUAL INTERPRETATION."
            </div>
          </div>

          {/* 10: Final Reveal */}
          <div className="min-h-[100svh] w-full flex flex-col justify-center items-center px-12 text-center">
            <div className="bg-[#020617]/90 backdrop-blur-xl p-16 md:p-24 border border-cyan-500/50 rounded-3xl shadow-[0_0_100px_rgba(34,211,238,0.2)] max-w-4xl w-full">
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-widest uppercase mb-8">
                {projectData.title}
              </h2>
              <div className="text-xl font-mono tracking-[0.2em] text-cyan-400 mb-12">
                CORE DEVELOPER & UI/UX DESIGNER
              </div>
              
              <div className="flex justify-center gap-8 pointer-events-auto mt-16">
                <a href={projectData.github} target="_blank" rel="noopener noreferrer" className="text-lg font-mono tracking-[0.2em] text-white border border-white/20 px-12 py-6 hover:bg-white/10 transition-colors">
                  [ VIEW GITHUB ↗ ]
                </a>
                <a href={projectData.demo!} target="_blank" rel="noopener noreferrer" className="text-lg font-mono tracking-[0.2em] text-cyan-400 border border-cyan-500/50 bg-cyan-900/30 px-12 py-6 hover:bg-cyan-900/60 transition-colors">
                  [ LIVE DEMO ↗ ]
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
