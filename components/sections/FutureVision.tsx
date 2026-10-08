"use client";

import { motion } from "framer-motion";

const FUTURE_STEPS = [
  { id: "01", title: "CURRENT", desc: "BUILDING AT FLEXZO" },
  { id: "02", title: "INTERNSHIP", desc: "EXPANDING CAPABILITIES" },
  { id: "03", title: "FREELANCE", desc: "INDEPENDENT PROJECTS" },
  { id: "04", title: "REAL-WORLD", desc: "PRODUCTION SYSTEMS" },
  { id: "05", title: "AI / SOFTWARE ENGINEER", desc: "ARCHITECTING THE FUTURE" }
];

export function FutureVision() {
  return (
    <section className="relative min-h-[150vh] bg-black overflow-hidden flex flex-col items-center py-32" id="future">
      
      <div className="absolute top-12 left-12 z-50 text-[10px] font-mono tracking-[0.5em] text-zinc-500 uppercase">
        13 / FUTURE VISION
      </div>

      <motion.div 
        className="text-center mb-32 z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-widest mb-4">
          WHAT'S NEXT?
        </h2>
        <div className="text-xs tracking-[0.4em] text-zinc-400">
          THE ROAD AHEAD
        </div>
      </motion.div>

      {/* The Horizon Path */}
      <div className="w-full max-w-4xl px-4 flex flex-col items-center relative z-10 perspective-1000">
        
        {/* Floor grid effect */}
        <div className="absolute inset-0 top-1/2 -z-10" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            transform: 'rotateX(60deg) scale(2)',
            transformOrigin: 'top center'
          }} 
        />

        {FUTURE_STEPS.map((step, i) => (
          <motion.div 
            key={step.id}
            className="w-full max-w-md p-8 border border-zinc-800 bg-black/80 backdrop-blur-md text-center mb-16 relative"
            initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black border border-white px-4 py-1 text-[10px] font-mono tracking-widest text-white">
              PHASE {step.id}
            </div>
            <h3 className="text-xl md:text-3xl font-black tracking-widest text-white mt-4 mb-2">
              {step.title}
            </h3>
            <p className="text-sm font-mono tracking-widest text-zinc-400">
              {step.desc}
            </p>
          </motion.div>
        ))}

      </div>

      <motion.div 
        className="w-[2px] bg-gradient-to-b from-white to-transparent mt-32"
        initial={{ height: 0 }}
        whileInView={{ height: 200 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
    </section>
  );
}
