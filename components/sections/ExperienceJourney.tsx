"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/experience";

export function ExperienceJourney() {
  
  const mappedExperience = experience.map(exp => {
    if (exp.company.toLowerCase().includes("pantech")) {
      return { ...exp, period: "21 AUGUST 2025 → 25 SEPTEMBER 2025" };
    }
    return exp;
  });

  return (
    <section className="relative min-h-screen bg-[#020617] text-white py-32 px-6" id="experience">
      
      {/* HEADER */}
      <div className="text-center mb-32">
        <div className="text-[10px] tracking-[0.5em] text-cyan-500 mb-4 uppercase font-mono">05 / PROFESSIONAL JOURNEY</div>
        <h2 className="text-4xl md:text-5xl font-black tracking-widest uppercase">
          EXPERIENCE
        </h2>
      </div>

      {/* TIMELINE */}
      <div className="max-w-4xl mx-auto relative">
        {/* Main Line */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-[1px]" />

        {mappedExperience.map((exp, i) => {
          const isCurrent = exp.type === "CURRENT";
          
          return (
            <div key={i} className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start mb-24 w-full group ${
              i % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}>
              
              {/* Timeline Dot */}
              <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full border-2 bg-[#020617] -translate-x-1/2 mt-2 z-10 transition-colors duration-500"
                   style={{ borderColor: exp.color || "#22d3ee" }}>
                {isCurrent && (
                  <div className="absolute inset-0 rounded-full animate-ping opacity-50" style={{ backgroundColor: exp.color || "#22d3ee" }} />
                )}
              </div>

              {/* Content Panel */}
              <motion.div 
                className="w-full md:w-[calc(50%-40px)] pl-12 md:pl-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className={`flex flex-col gap-4 border border-white/10 bg-[#0f172a]/50 p-8 rounded-2xl transition-all duration-300 hover:bg-[#0f172a] hover:border-cyan-500/50 ${
                  i % 2 === 0 ? "md:items-end md:text-right" : ""
                }`}>
                  
                  <div className="flex flex-col gap-1">
                    {isCurrent && (
                      <div className="text-[10px] font-mono tracking-widest text-cyan-400 mb-2 uppercase flex items-center gap-2"
                           style={{ justifyContent: i % 2 === 0 ? "flex-end" : "flex-start" }}>
                        <div className="w-2 h-2 rounded-full animate-pulse bg-cyan-400" />
                        CURRENTLY BUILDING
                      </div>
                    )}
                    <h3 className="text-2xl font-black tracking-widest text-white uppercase">{exp.company}</h3>
                    <div className="text-sm font-bold tracking-widest text-cyan-500 uppercase">{exp.role}</div>
                    <div className="text-xs font-mono tracking-widest text-zinc-400 uppercase mt-2">{exp.period}</div>
                  </div>

                  <div className="text-sm font-mono tracking-widest text-zinc-300 leading-relaxed uppercase border-l-2 md:border-l-0 md:border-r-2 border-cyan-500/30 pl-4 md:pl-0 md:pr-4 py-2 my-2">
                    {exp.description}
                  </div>

                  <div className={`flex flex-wrap gap-2 mt-2 ${
                    i % 2 === 0 ? "md:justify-end" : ""
                  }`}>
                    {exp.responsibilities.map(skill => (
                      <span key={skill} className="text-[10px] font-mono tracking-widest text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {!isCurrent && (
                    <div className="text-[10px] font-mono tracking-widest text-zinc-500 mt-4 uppercase">
                      CERTIFICATE IN CREDENTIAL VAULT
                    </div>
                  )}
                  
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
