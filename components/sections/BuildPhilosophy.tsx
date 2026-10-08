"use client";

import { motion } from "framer-motion";

const PIPELINE = [
  { id: "IDEA", proj: null },
  { id: "RESEARCH", proj: "ETCC" },
  { id: "DESIGN", proj: "Medical Analyzer" },
  { id: "BUILD", proj: "Cyber Shield" },
  { id: "TEST", proj: null },
  { id: "DEPLOY", proj: null },
  { id: "ITERATE", proj: null },
];

export function BuildPhilosophy() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center py-32" id="how-i-build">
      
      <div className="absolute top-12 left-12 z-50 text-[10px] font-mono tracking-[0.5em] text-zinc-500 uppercase">
        09 / BUILD PHILOSOPHY
      </div>

      <motion.div 
        className="text-center mb-24 z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-widest mb-4">
          HOW I BUILD
        </h2>
        <div className="text-xs tracking-[0.4em] text-zinc-400">
          THE ENGINEERING PIPELINE
        </div>
      </motion.div>

      <div className="w-full max-w-5xl px-4 flex flex-col items-center z-10 relative">
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-zinc-800" />
        
        {PIPELINE.map((stage, i) => (
          <div key={stage.id} className="flex flex-col items-center w-full">
            <motion.div 
              className="flex flex-col items-center text-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-2xl md:text-4xl font-black tracking-widest text-white mb-2">
                {stage.id}
              </div>
              
              {stage.proj && (
                <div className="flex flex-col items-center mt-2">
                  <div className="w-[1px] h-4 bg-zinc-600" />
                  <div className="border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-xs font-mono tracking-widest text-zinc-400 mt-2">
                    └── {stage.proj}
                  </div>
                </div>
              )}
            </motion.div>
            
            {i < PIPELINE.length - 1 && (
              <motion.div 
                className="text-zinc-600 text-xl font-light my-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                ↓
              </motion.div>
            )}
          </div>
        ))}
      </div>

    </section>
  );
}
