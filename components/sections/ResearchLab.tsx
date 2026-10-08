"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RESEARCH_STAGES = [
  "OCR ENGINE",
  "TEXT CLEANUP",
  "NLP CORRECTION",
  "LLM STRUCTURING"
];

export function ResearchLab() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [activeStageIndex, setActiveStageIndex] = useState(-1);

  return (
    <section className="relative min-h-screen bg-[#050505] flex items-center justify-center text-zinc-300 font-mono overflow-hidden" id="research">
      
      {/* 1. RESTRICTED ENTRANCE */}
      <AnimatePresence>
        {!accessGranted && (
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#050505]"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div className="w-16 h-16 border border-red-900/50 rounded-full flex items-center justify-center mb-8 relative">
              <div className="absolute inset-0 rounded-full border border-red-500/30 animate-ping opacity-20" />
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            </div>
            
            <div className="text-[10px] tracking-[0.5em] text-red-500/70 mb-2">10 / RESTRICTED AREA</div>
            <h2 className="text-3xl tracking-widest text-zinc-500 mb-12">● ONGOING RESEARCH</h2>
            
            <button 
              onClick={() => setAccessGranted(true)}
              className="group relative px-8 py-3 border border-zinc-800 text-xs tracking-[0.3em] hover:bg-zinc-900 hover:text-white transition-all overflow-hidden"
            >
              <span className="relative z-10">[ REQUEST ACCESS ]</span>
              <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. RESEARCH FILE ENVIRONMENT */}
      <AnimatePresence>
        {accessGranted && (
          <motion.div 
            className="absolute inset-0 z-40 p-8 md:p-24 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            {/* Blueprint Grid Background */}
            <div className="absolute inset-0 border-[0.5px] border-cyan-900/20" style={{ backgroundImage: 'linear-gradient(rgba(8, 145, 178, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(8, 145, 178, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Header */}
            <header className="relative flex justify-between items-start mb-16 border-b border-cyan-900/50 pb-8 z-10">
              <div>
                <div className="text-[10px] font-mono tracking-[0.5em] text-cyan-500/70 mb-2">10 / ACCESS GRANTED</div>
                <h1 className="text-4xl md:text-5xl font-black text-cyan-100 tracking-widest drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">● ONGOING RESEARCH</h1>
              </div>
              <div className="text-right">
                <div className="text-[10px] tracking-[0.3em] text-cyan-700 mb-1">STATUS</div>
                <div className="text-xs font-bold tracking-widest text-cyan-300 bg-cyan-950 border border-cyan-800 px-3 py-1 rounded">ACTIVE RESEARCH</div>
              </div>
            </header>

            <div className="flex-1 flex flex-col md:flex-row gap-16 relative z-10">
              
              {/* Left Panel: Scientific Description */}
              <div className="w-full md:w-1/3 flex flex-col gap-8 relative">
                {/* Blueprint brackets */}
                <div className="absolute -left-4 -top-4 w-4 h-4 border-t border-l border-cyan-500/50" />
                <div className="absolute -right-4 -top-4 w-4 h-4 border-t border-r border-cyan-500/50" />
                <div className="absolute -left-4 -bottom-4 w-4 h-4 border-b border-l border-cyan-500/50" />
                <div className="absolute -right-4 -bottom-4 w-4 h-4 border-b border-r border-cyan-500/50" />
                
                <section className="bg-cyan-950/20 p-6 border border-cyan-900/50 backdrop-blur-md flex-1 flex flex-col justify-center">
                  <div className="text-[10px] tracking-[0.3em] text-cyan-500 mb-4 border-b border-cyan-900 pb-2">GOAL</div>
                  <h2 className="text-3xl md:text-5xl font-black text-cyan-100 tracking-widest leading-tight">
                    Medical<br/>Report<br/>Parsing
                  </h2>
                </section>
              </div>

              {/* Right Panel: Holographic Pipeline Visualization */}
              <div className="flex-1 relative flex items-center justify-center border border-cyan-900/30 bg-cyan-950/10 backdrop-blur-sm overflow-hidden p-8">
                <div className="absolute top-4 left-4 text-[10px] tracking-[0.3em] text-cyan-600">ETCC // PIPELINE</div>
                
                <div className="relative w-full max-w-2xl">
                  <div className="absolute left-[15px] md:left-[23px] top-4 bottom-4 w-[2px] bg-cyan-900/50" />
                  
                  {RESEARCH_STAGES.map((stage, index) => {
                    const isActive = index <= activeStageIndex;
                    
                    return (
                      <motion.div 
                        key={stage}
                        className="relative flex items-center gap-6 md:gap-12 py-4 md:py-8 cursor-pointer group"
                        onClick={() => setActiveStageIndex(index)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                      >
                        {/* Node */}
                        <div className={`w-8 h-8 md:w-12 md:h-12 rounded-sm rotate-45 relative z-10 transition-all duration-500 flex items-center justify-center border ${
                          isActive 
                            ? "bg-cyan-500 border-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.8)] scale-110" 
                            : "bg-cyan-950 border-cyan-800 group-hover:border-cyan-500 group-hover:scale-110"
                        }`}>
                          {isActive && <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full shadow-[0_0_10px_white]" />}
                        </div>
                        
                        {/* Connecting horizontal line */}
                        <div className={`h-[2px] w-8 md:w-16 transition-colors duration-500 ${isActive ? "bg-cyan-500" : "bg-cyan-900"}`} />
                        
                        {/* Label Box */}
                        <div className={`flex-1 px-6 md:px-10 py-4 md:py-6 border transition-all duration-500 flex justify-between items-center ${
                          isActive 
                            ? "border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.1)]" 
                            : "border-cyan-900/30 bg-cyan-950/20 group-hover:border-cyan-700/50 group-hover:bg-cyan-900/20"
                        }`}>
                          <div className={`text-lg md:text-3xl tracking-widest font-mono font-black ${
                            isActive ? "text-cyan-100 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" : "text-cyan-700 group-hover:text-cyan-400"
                          }`}>
                            {stage}
                          </div>
                          <div className={`text-xs md:text-sm font-mono tracking-widest ${isActive ? "text-cyan-400 animate-pulse" : "text-cyan-900"}`}>SYS.OK</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {activeStageIndex < RESEARCH_STAGES.length - 1 && (
                  <div className="absolute bottom-4 right-4 text-[10px] tracking-widest text-cyan-600 animate-pulse font-mono border border-cyan-800/50 px-2 py-1">
                    [ CLICK NODE TO ADVANCE ]
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
