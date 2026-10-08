"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "PROJECTS", value: "08", color: "text-blue-400" },
  { label: "INTERNSHIPS", value: "03", color: "text-cyan-400" },
  { label: "RESEARCH PAPER", value: "01", color: "text-violet-400" },
  { label: "CERTIFICATIONS", value: "19", color: "text-indigo-400" },
  { label: "LIVE EXPERIENCES", value: "04", color: "text-emerald-400" },
];

export function LiveDataHUD() {
  return (
    <section className="py-24 px-4 bg-background relative z-10 border-t border-border/30" id="data-hud">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <h2 className="text-xs font-mono tracking-[0.2em] text-text-secondary">LIVE DATA HUD</h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-border to-transparent" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              className="flex flex-col border-l border-border/50 pl-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`text-4xl md:text-5xl font-black mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs font-mono tracking-widest text-text-secondary">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 inline-flex items-center gap-4 bg-surface border border-border px-6 py-3 rounded-full shadow-glass"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-[10px] font-mono text-text-secondary">CURRENTLY BUILDING</div>
          <div className="h-4 w-[1px] bg-border" />
          <div className="text-xs font-bold text-text-primary tracking-widest">
            FLEXZO <span className="text-text-secondary font-normal">— BACKEND DEV</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
