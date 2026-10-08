"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield } from "lucide-react";
import { ProjectHUD } from "@/components/ui/ProjectHUD";
import { projects } from "@/data/projects";

export function CyberShieldWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const projectData = projects.find(p => p.title.includes("Cyber"))!;

  // 0.0 - 0.15: Intro
  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  
  // HUD (Visible during the main scene, after intro, fades out at transition)
  const hudOpacity = useTransform(scrollYProgress, [0.1, 0.15, 0.9, 0.95], [0, 1, 1, 0]);

  // Adjust remaining beats by shifting them after 0.15
  const networkZ = useTransform(scrollYProgress, [0.15, 0.45], [-1000, 1000]);
  const networkOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.4, 0.5], [0, 1, 1, 0]);

  const analysisOpacity = useTransform(scrollYProgress, [0.45, 0.5, 0.7, 0.75], [0, 1, 1, 0]);
  
  const predictionOpacity = useTransform(scrollYProgress, [0.75, 0.8, 0.95, 1], [0, 1, 1, 0]);
  const predictionZ = useTransform(scrollYProgress, [0.75, 0.85], [-500, 0]);

  // Transition to Rainwater: Droplets start forming
  const transitionY = useTransform(scrollYProgress, [0.95, 1], [0, 1000]);
  const transitionOpacity = useTransform(scrollYProgress, [0.95, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative bg-black">
      
      {/* DESKTOP 3D EXPERIENCE */}
      <div className="hidden md:block h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden perspective-[1000px] flex items-center justify-center">

          <ProjectHUD 
            worldNum="03"
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
            className="absolute inset-0 z-[70] flex flex-col items-center justify-center bg-black"
            style={{ opacity: introOpacity }}
          >
            <Shield size={48} className="text-violet-500 mb-6 opacity-80" />
            <div className="text-[10px] font-mono tracking-[0.3em] text-violet-500/70 uppercase mb-8">
              07 / PROJECT UNIVERSE
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white dark:text-white text-slate-900 tracking-widest uppercase mb-4 text-center max-w-3xl">
              {projectData.title}
            </h2>
            <div className="text-sm font-mono tracking-[0.2em] text-white/70 text-center max-w-xl mb-12">
              {projectData.description.toUpperCase()}
            </div>
            
            <div className="flex flex-col items-center gap-2 mb-16 text-xs font-mono tracking-[0.3em] text-violet-500 uppercase">
              <div>AI ENGINEER</div>
              <div>SECURITY RESEARCHER</div>
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

        {/* 1. NETWORK TRACE */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center transform-style-3d pointer-events-none will-change-transform"
          style={{ z: networkZ, opacity: networkOpacity }}
        >
          {/* Dense Network Map */}
          <div className="relative w-[90vw] h-[90vh] max-w-[1200px]">
            {/* Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-violet-500/50 rounded-full flex items-center justify-center bg-violet-900/20 backdrop-blur-md z-20 shadow-[0_0_100px_rgba(139,92,246,0.3)]">
              <div className="text-2xl font-black tracking-widest text-violet-300">AI CORE</div>
            </div>

            {/* Nodes */}
            {[
              { id: "A", top: "10%", left: "10%" },
              { id: "B", top: "5%", left: "50%" },
              { id: "C", top: "15%", left: "90%" },
              { id: "D", top: "85%", left: "15%" },
              { id: "E", top: "95%", left: "50%" },
              { id: "F", top: "80%", left: "85%" },
            ].map((node, i) => (
              <div key={i} className="absolute flex flex-col items-center z-10" style={{ top: node.top, left: node.left }}>
                <div className="w-8 h-8 bg-violet-500/30 border-2 border-violet-500 rounded-full shadow-[0_0_30px_#8b5cf6]" />
                <div className="text-sm font-mono tracking-widest text-violet-400 mt-2">NODE {node.id}</div>
              </div>
            ))}
            
            {/* Connecting lines and packet flow */}
            <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="packet-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              
              {/* Static lines */}
              <line x1="10" y1="10" x2="50" y2="50" stroke="#8b5cf6" strokeWidth="0.3" strokeOpacity="0.4" />
              <line x1="50" y1="5" x2="50" y2="50" stroke="#8b5cf6" strokeWidth="0.3" strokeOpacity="0.4" />
              <line x1="90" y1="15" x2="50" y2="50" stroke="#8b5cf6" strokeWidth="0.3" strokeOpacity="0.4" />
              <line x1="15" y1="85" x2="50" y2="50" stroke="#8b5cf6" strokeWidth="0.3" strokeOpacity="0.4" />
              <line x1="50" y1="95" x2="50" y2="50" stroke="#8b5cf6" strokeWidth="0.3" strokeOpacity="0.4" />
              <line x1="85" y1="80" x2="50" y2="50" stroke="#8b5cf6" strokeWidth="0.3" strokeOpacity="0.4" />

              {/* Packet flows */}
              <motion.line x1="10" y1="10" x2="50" y2="50" stroke="url(#packet-gradient)" strokeWidth="1" strokeDasharray="10 90" animate={{ strokeDashoffset: [100, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
              <motion.line x1="90" y1="15" x2="50" y2="50" stroke="url(#packet-gradient)" strokeWidth="1" strokeDasharray="15 85" animate={{ strokeDashoffset: [100, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }} />
              <motion.line x1="15" y1="85" x2="50" y2="50" stroke="url(#packet-gradient)" strokeWidth="1" strokeDasharray="12 88" animate={{ strokeDashoffset: [100, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 1 }} />
              <motion.line x1="50" y1="95" x2="50" y2="50" stroke="url(#packet-gradient)" strokeWidth="1" strokeDasharray="8 92" animate={{ strokeDashoffset: [100, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.2 }} />
            </svg>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-mono tracking-[0.4em] text-violet-400">NETWORK TRAFFIC & PACKET FLOW</div>
          </div>
        </motion.div>

        {/* 2. ANALYSIS */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none will-change-opacity bg-black/50 backdrop-blur-sm"
          style={{ opacity: analysisOpacity }}
        >
          <div className="text-4xl md:text-7xl font-black text-violet-500 tracking-widest mb-4">PATTERN ANALYSIS</div>
          <div className="w-64 h-1 bg-violet-900 overflow-hidden relative rounded">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 w-1/2 bg-violet-500"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* 3. PREDICTION */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-black/90 backdrop-blur-md pointer-events-none will-change-transform"
          style={{ opacity: predictionOpacity, z: predictionZ }}
        >
          <div className="text-sm font-mono tracking-[0.3em] text-violet-500 mb-6">CYBER SHIELD</div>
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-widest mb-12 drop-shadow-[0_0_30px_rgba(139,92,246,0.8)]">PREDICTION</h2>
          
          <div className="max-w-md text-center text-violet-400/70 font-mono text-sm tracking-widest border border-violet-500/30 p-6 rounded bg-violet-900/10 backdrop-blur-md">
            BEHAVIOR VECTOR ISOLATED.<br/><br/>NETWORK PATH SECURED.
          </div>
        </motion.div>

        {/* TRANSITION TO RAINWATER */}
        <motion.div 
          className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
          style={{ opacity: transitionOpacity }}
        >
          <motion.div 
            className="w-4 h-4 bg-sky-400 rounded-full shadow-[0_0_20px_#38bdf8]"
            style={{ y: transitionY }}
          />
        </motion.div>

        {/* TRANSITION TO RAINWATER TEXT */}
        <motion.div 
          className="absolute inset-0 z-[80] flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: transitionOpacity }}
        >
          <div className="text-2xl font-black tracking-widest text-sky-400 uppercase">
            03 / COMPLETE
          </div>
        </motion.div>

        </div>
      </div>

      {/* MOBILE 2D FALLBACK */}
      <div className="md:hidden min-h-[100dvh] flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <Shield size={32} className="text-emerald-500 mb-8 opacity-80" />
        <div className="text-[10px] font-mono tracking-widest text-emerald-500/70 uppercase mb-4 text-center">
          03 / PROJECT WORLD
        </div>
        <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-12 text-center leading-tight">
          {projectData.title}
        </h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col items-center text-center w-full max-w-sm"
        >
          {/* Static Network Graphic */}
          <div className="w-full aspect-video border border-emerald-900/50 bg-emerald-950/20 rounded-lg flex items-center justify-center relative overflow-hidden mb-12">
            <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_20px_#10b981] absolute top-1/3 left-1/4" />
            <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] absolute bottom-1/4 right-1/4" />
            <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981] absolute top-1/2 left-3/4" />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="25" y1="33" x2="75" y2="50" stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.5" />
              <line x1="25" y1="33" x2="75" y2="75" stroke="#10b981" strokeWidth="0.5" strokeOpacity="0.3" />
            </svg>
          </div>

          <div className="text-sm font-mono tracking-[0.3em] text-emerald-500 mb-4">CYBER SHIELD</div>
          <h2 className="text-3xl font-black text-white tracking-widest mb-8">PREDICTION STAGE</h2>
          
          <div className="text-center text-emerald-400/70 font-mono text-xs tracking-widest leading-relaxed border border-emerald-900/30 p-4 rounded bg-emerald-950/10">
            BEHAVIOR VECTOR ISOLATED.<br/>NETWORK PATH SECURED.
          </div>
        </motion.div>
      </div>

    </section>
  );
}
