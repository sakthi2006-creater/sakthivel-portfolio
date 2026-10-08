"use client";

import { motion } from "framer-motion";

export function LiveSystem() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center py-32" id="live-now">
      
      {/* Incoming Connection from ExperienceJourney */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-32 bg-white" />

      <div className="absolute top-12 left-12 z-50 text-[10px] font-mono tracking-[0.5em] text-zinc-500 uppercase">
        06 / LIVE NOW
      </div>

      <motion.div 
        className="w-full max-w-4xl px-4 flex flex-col items-center text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
          <div className="text-sm font-mono tracking-[0.3em] text-green-500 uppercase">
            ● LIVE NOW
          </div>
        </div>

        <h2 className="text-5xl md:text-7xl font-black text-white tracking-widest mb-4">
          FLEXZO HR SERVICE
        </h2>
        
        <h3 className="text-xl md:text-3xl font-light tracking-widest text-zinc-400 mb-16">
          BACKEND APP DEVELOPMENT
        </h3>

        <div className="w-full flex flex-col items-center gap-16 text-center">
          <div className="flex flex-wrap justify-center gap-8 text-sm md:text-base font-mono tracking-widest text-zinc-300 uppercase">
            <span>APIs</span>
            <span className="text-zinc-700">•</span>
            <span>DATABASE</span>
            <span className="text-zinc-700">•</span>
            <span>AUTHENTICATION</span>
            <span className="text-zinc-700">•</span>
            <span>DEBUGGING</span>
          </div>

          <div className="p-8 border border-zinc-800 bg-white/[0.02] inline-flex flex-col items-center mt-8">
            <div className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 mb-4 uppercase">
              CURRENT STATUS
            </div>
            <div className="text-2xl font-black tracking-widest text-white uppercase animate-pulse">
              BUILDING
            </div>
          </div>
        </div>
      </motion.div>

      {/* Transition to Project Universe */}
      <motion.div 
        className="text-center mt-32 z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="text-xs font-mono tracking-widest text-white/50 animate-pulse mb-8">
          INITIATING PROJECT UNIVERSE
        </div>
        <div className="w-[2px] h-32 bg-white" />
      </motion.div>

    </section>
  );
}
