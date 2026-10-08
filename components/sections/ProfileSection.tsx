"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ProfileSection() {
  return (
    <section className="w-full bg-[#020617] text-white py-24 px-6 md:px-12 flex flex-col items-center" id="profile">
      
      <div className="max-w-5xl w-full flex flex-col gap-24">
        
        {/* 01 WHO AM I */}
        <motion.div 
          className="flex flex-col md:flex-row gap-12 md:gap-24 items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full md:w-1/3 flex flex-col gap-8">
            <div>
              <div className="text-[10px] tracking-[0.5em] text-cyan-500 mb-4 uppercase font-mono">01 / IDENTITY</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-widest uppercase">WHO AM I?</h2>
            </div>
            
            {/* Highly Animated 3D Holographic Orb */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative w-56 h-56 shrink-0 mt-8 mb-4 ml-4"
            >
              {/* Rotating Orbital Rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute inset-[-15px] rounded-full border border-cyan-500/30 border-t-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                className="absolute inset-[-30px] rounded-full border border-white/10 border-b-white/50 border-dashed"
              />
              
              {/* Center Photo Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-[#020617] bg-black/50 shadow-[0_0_40px_rgba(34,211,238,0.3)] ring-2 ring-cyan-500/20">
                <div className="w-full h-full rounded-full overflow-hidden relative group">
                  <div className="absolute inset-0 bg-noise bg-repeat opacity-30 z-10 pointer-events-none mix-blend-overlay" />
                  
                  {/* The Image with Grayscale + High Contrast for Cyberpunk vibe */}
                  <Image 
                    src="/profile.png" 
                    alt="Sakthivel R"
                    fill
                    sizes="(max-width: 768px) 250px, 300px"
                    className="object-cover scale-[1.15] transition-transform duration-1000 group-hover:scale-125 filter grayscale contrast-125 brightness-90"
                  />
                  
                  {/* Glowing Cyan Color Tint over the photo */}
                  <div className="absolute inset-0 bg-cyan-500/20 mix-blend-color z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80 z-10" />

                  {/* Scanline animation inside the orb */}
                  <div className="pointer-events-none absolute left-0 right-0 top-0 h-[3px] bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-[scanLine_2s_ease-in-out_infinite] z-20" />
                </div>
              </div>

              {/* Technical Badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#020617] border border-cyan-500/50 px-5 py-2 rounded-full text-[10px] font-mono tracking-widest text-cyan-400 whitespace-nowrap shadow-[0_0_20px_rgba(34,211,238,0.2)] z-30 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                SYSTEM // ONLINE
              </div>
            </motion.div>
          </div>
          
          <div className="w-full md:w-2/3 flex flex-col gap-6">
            <div className="text-2xl md:text-3xl font-light tracking-widest text-zinc-300">
              B.Tech Artificial Intelligence & Data Science
            </div>
            <div className="flex flex-col gap-2 border-l-2 border-cyan-500/30 pl-6">
              <div className="text-lg md:text-xl font-mono tracking-widest text-white">
                Loyola Institute of Technology
              </div>
              <div className="text-sm font-mono tracking-[0.3em] text-cyan-400">
                2024 — 2028
              </div>
              <div className="text-sm font-mono tracking-widest text-zinc-400 mt-2">
                CGPA: <span className="text-white font-bold">8.22</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 md:gap-8 pt-8 mt-4 border-t border-white/10">
              {['AI', 'SOFTWARE', 'DESIGN', 'RESEARCH'].map((skill) => (
                <div key={skill} className="text-xs md:text-sm font-mono tracking-widest text-zinc-400 uppercase">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 02 WHY AI */}
        <motion.div 
          className="flex flex-col md:flex-row gap-12 md:gap-24 items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full md:w-1/3">
            <div className="text-[10px] tracking-[0.5em] text-cyan-500 mb-4 uppercase font-mono">02 / PURPOSE</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-widest uppercase">WHY AI?</h2>
          </div>
          
          <div className="w-full md:w-2/3 flex flex-col gap-12">
            
            <div className="flex flex-col gap-4">
              <h3 className="text-xl md:text-2xl font-black tracking-widest text-white">WHY DO I BUILD?</h3>
              <p className="text-sm md:text-base font-mono tracking-widest text-zinc-400 leading-relaxed uppercase border-l-2 border-cyan-500/30 pl-6">
                Theory without implementation is useless. I build to solve real-world problems and transform raw data into intelligent, predictive systems.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xl md:text-2xl font-black tracking-widest text-white">WHAT TYPE OF ENGINEER?</h3>
              <p className="text-sm md:text-base font-mono tracking-widest text-zinc-400 leading-relaxed uppercase border-l-2 border-cyan-500/30 pl-6">
                A hybrid builder bridging the gap between Data Science, Software Engineering, and UI/UX Design.
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
