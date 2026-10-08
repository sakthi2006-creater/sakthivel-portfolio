"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Core fragments that float around the start screen
const FRAGMENTS = ["AI", "ML", "GRAPH", "CODE", "RESEARCH", "DESIGN"];

export function Hero2() {
  const [phase, setPhase] = useState<"start" | "transitioning" | "identity" | "zoomed">("start");
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Simulated mouse position for subtle core reaction
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const enterExperience = () => {
    setPhase("transitioning");
    setTimeout(() => {
      setPhase("identity");
    }, 2000); // 2 second cinematic zoom transition
  };

  const handleNodeClick = (nodeName: string) => {
    setActiveNode(nodeName);
    setPhase("zoomed");
  };

  const backToIdentity = () => {
    setActiveNode(null);
    setPhase("identity");
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center text-white" id="hero">
      
      {/* 1. START SCREEN */}
      <AnimatePresence>
        {phase === "start" && (
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
            exit={{ opacity: 0, filter: "blur(20px)", scale: 2 }}
            transition={{ duration: 1.5, ease: "easeIn" }}
          >
            
            {/* The interactive AI Core (No cards, no boxes) */}
            <motion.div 
              className="relative flex items-center justify-center mb-16"
              style={{ x: mousePos.x, y: mousePos.y }}
            >
              {/* Core glow */}
              <motion.div 
                className="absolute w-32 h-32 bg-white/20 blur-3xl rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Central Core sphere */}
              <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,1)] z-10" />

              {/* Floating Fragments orbiting the core */}
              {FRAGMENTS.map((frag, i) => {
                const angle = (i / FRAGMENTS.length) * Math.PI * 2;
                return (
                  <motion.div
                    key={frag}
                    className="absolute text-[10px] font-mono tracking-[0.2em] text-white/50"
                    animate={{
                      rotate: [0, 360],
                      x: [Math.cos(angle) * 100, Math.cos(angle + Math.PI) * 100, Math.cos(angle) * 100],
                      y: [Math.sin(angle) * 100, Math.sin(angle + Math.PI) * 100, Math.sin(angle) * 100]
                    }}
                    transition={{
                      duration: 20 + i * 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {frag}
                  </motion.div>
                );
              })}
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-black tracking-[0.2em] mb-4 text-center">
              SAKTHIVEL R.
            </h1>
            <div className="text-xs md:text-sm font-mono tracking-[0.3em] text-white mb-4 text-center">
              AI × SOFTWARE × DESIGN
            </div>
            <div className="text-[10px] md:text-xs font-mono tracking-widest text-white/60 mb-2 text-center uppercase">
              B.Tech AI & Data Science student
            </div>
            <div className="text-[10px] md:text-xs font-mono tracking-widest text-white/40 mb-20 text-center uppercase">
              Builder / Developer / Designer
            </div>

            <button 
              onClick={enterExperience}
              className="group text-sm font-mono tracking-[0.3em] uppercase transition-all hover:text-white text-white/60"
            >
              <span className="opacity-0 group-hover:opacity-100 mr-4 transition-opacity">[</span>
              ENTER EXPERIENCE
              <span className="opacity-0 group-hover:opacity-100 ml-4 transition-opacity">]</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TRANSITION PARTICLES (Camera zoom effect through Z-space) */}
      <AnimatePresence>
        {phase === "transitioning" && (
          <motion.div className="absolute inset-0 z-40 overflow-hidden perspective-[1000px]">
            {/* Core expanding open like a ring */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-4 border-white rounded-full"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 200, opacity: 0, borderWidth: "1px" }}
              transition={{ duration: 1.5, ease: "circIn" }}
            />
            
            {/* Particles rushing past the camera (Z-axis translation) */}
            {[...Array(40)].map((_, i) => (
              <motion.div 
                key={`particle-${i}`}
                className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
                initial={{ 
                  x: (((i * 17) % 100) / 100 - 0.5) * 500, 
                  y: (((i * 23) % 100) / 100 - 0.5) * 500, 
                  z: -1000,
                  opacity: 0 
                }}
                animate={{ 
                  z: 1000, 
                  opacity: [0, 1, 0] 
                }}
                transition={{ 
                  duration: 1 + (((i * 31) % 100) / 100), 
                  ease: "linear",
                  delay: (((i * 37) % 100) / 100) * 0.5
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. IDENTITY WORLD */}
      <AnimatePresence>
        {(phase === "identity" || phase === "zoomed") && (
          <motion.div 
            className="absolute inset-0 z-30 flex flex-col items-center justify-center perspective-[1000px]"
            initial={{ opacity: 0, z: -500 }}
            animate={{ opacity: 1, z: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Background Neural Lines / Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
            
            {/* Background Code Fragments (Massive scale) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] font-mono text-xl md:text-4xl leading-tight text-white whitespace-pre select-none">
              {Array(15).fill(0).map((_, i) => (
                <motion.div 
                  key={`code-${i}`} 
                  className="absolute"
                  style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                  animate={{ y: [0, -50, 0], opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 15 + Math.random() * 20, repeat: Infinity, ease: "linear" }}
                >
                  {`function process_node_${i}() {\n  return analyze_tensor(vec3(${Math.random().toFixed(2)}, ${Math.random().toFixed(2)}));\n}`}
                </motion.div>
              ))}
            </div>
            {/* Center Anchor (Dominates Screen) */}
            <motion.div 
              className="text-center flex flex-col items-center"
              animate={{ 
                opacity: phase === "zoomed" ? 0 : 1,
                z: phase === "zoomed" ? 500 : 0,
                filter: phase === "zoomed" ? "blur(10px)" : "blur(0px)" 
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <div className="text-6xl md:text-[8rem] font-black tracking-widest text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.3)] leading-none">
                SAKTHIVEL R.
              </div>
              <div className="text-sm md:text-2xl font-mono tracking-[0.5em] text-white/50 mt-8">
                AI × SOFTWARE × DESIGN
              </div>
            </motion.div>

            {/* Spatial objects around center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none transform-style-3d">
              
              {/* AI Portal Node */}
              <motion.div 
                className="absolute top-1/4 left-[15%] pointer-events-auto cursor-pointer flex flex-col items-center group"
                animate={{ 
                  y: [0, -15, 0],
                  scale: activeNode === "AI" ? 5 : (phase === "zoomed" ? 0 : 1),
                  opacity: activeNode === "AI" ? 0 : (phase === "zoomed" ? 0 : 1),
                  z: activeNode === "AI" ? 1000 : 0
                }}
                transition={{ 
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 1, ease: "easeInOut" },
                  opacity: { duration: 1, ease: "easeInOut" },
                  z: { duration: 1, ease: "easeInOut" }
                }}
                whileHover={phase !== "zoomed" ? { scale: 1.2 } : {}}
                onClick={() => handleNodeClick("AI")}
              >
                <div className="text-4xl md:text-6xl font-black tracking-widest text-white/30 group-hover:text-white transition-colors">AI</div>
                <div className="w-2 h-2 bg-white/20 mt-4 rounded-full group-hover:bg-white group-hover:shadow-[0_0_20px_white]" />
              </motion.div>

              {/* SOFTWARE Portal Node */}
              <motion.div 
                className="absolute bottom-1/4 left-[20%] pointer-events-auto cursor-pointer flex flex-col items-center group"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.2 }}
                onClick={() => handleNodeClick("SOFTWARE")}
              >
                <div className="text-4xl md:text-6xl font-black tracking-widest text-white/30 group-hover:text-white transition-colors">SOFTWARE</div>
                <div className="w-2 h-2 bg-white/20 mt-4 rounded-full group-hover:bg-white group-hover:shadow-[0_0_20px_white]" />
              </motion.div>

              {/* DESIGN Portal Node */}
              <motion.div 
                className="absolute top-[30%] right-[15%] pointer-events-auto cursor-pointer flex flex-col items-center group"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.2 }}
                onClick={() => handleNodeClick("DESIGN")}
              >
                <div className="text-4xl md:text-6xl font-black tracking-widest text-white/30 group-hover:text-white transition-colors">DESIGN</div>
                <div className="w-2 h-2 bg-white/20 mt-4 rounded-full group-hover:bg-white group-hover:shadow-[0_0_20px_white]" />
              </motion.div>

              {/* RESEARCH Portal Node */}
              <motion.div 
                className="absolute bottom-[30%] right-[20%] pointer-events-auto cursor-pointer flex flex-col items-center group"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.2 }}
                onClick={() => handleNodeClick("RESEARCH")}
              >
                <div className="text-4xl md:text-6xl font-black tracking-widest text-white/30 group-hover:text-white transition-colors">RESEARCH</div>
                <div className="w-2 h-2 bg-white/20 mt-4 rounded-full group-hover:bg-white group-hover:shadow-[0_0_20px_white]" />
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ZOOMED EXPLORATION STATE */}
      <AnimatePresence>
        {phase === "zoomed" && activeNode && (
          <motion.div 
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button 
              onClick={backToIdentity}
              className="absolute top-12 left-12 text-[10px] font-mono tracking-[0.3em] uppercase text-white/50 hover:text-white transition-colors"
            >
              ← RETURN TO CENTER
            </button>
            
            <h2 className="text-8xl font-black tracking-[0.2em] text-white/10 absolute">
              {activeNode}
            </h2>

            {/* Raw spatial text elements revealed during zoom */}
            <div className="relative z-10 flex flex-col items-center gap-6 text-center mt-12">
              {activeNode === "AI" && (
                <>
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-2xl font-light tracking-widest">Machine Learning</motion.div>
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl font-light tracking-widest">Generative AI</motion.div>
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-2xl font-light tracking-widest">NLP</motion.div>
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-2xl font-light tracking-widest">Python</motion.div>
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-2xl font-light tracking-widest">AI Systems</motion.div>
                </>
              )}
              {activeNode === "SOFTWARE" && (
                <>
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-2xl font-light tracking-widest">Backend Systems</motion.div>
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl font-light tracking-widest">REST APIs</motion.div>
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-2xl font-light tracking-widest">Database Arch</motion.div>
                </>
              )}
              {activeNode === "DESIGN" && (
                <>
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-2xl font-light tracking-widest">UI / UX</motion.div>
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl font-light tracking-widest">Motion Design</motion.div>
                </>
              )}
              {activeNode === "RESEARCH" && (
                <>
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-2xl font-light tracking-widest">ETCC Project</motion.div>
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl font-light tracking-widest">Empathetic Tech</motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
