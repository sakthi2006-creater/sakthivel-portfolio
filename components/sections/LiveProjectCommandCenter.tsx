"use client";

import { motion } from "framer-motion";

const liveSystems = [
  { name: "MEDICAL ANALYZER", url: "#", status: "ONLINE" },
  { name: "CYBER SHIELD", url: "#", status: "ONLINE" },
  { name: "RAINWATER", url: "#", status: "ONLINE" },
  { name: "AECE", url: "#", status: "ONLINE" },
];

export function LiveProjectCommandCenter() {
  return (
    <section className="py-24 px-4 bg-background border-t border-border/30 relative z-10" id="live-systems">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-xs font-mono tracking-[0.2em] text-text-secondary">LIVE SYSTEMS COMMAND CENTER</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liveSystems.map((system, i) => (
            <motion.div 
              key={system.name}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-surface border border-border/50 rounded-xl hover:border-emerald-500/50 transition-colors cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Subtle hover background sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              
              <div className="flex flex-col gap-2 relative z-10 mb-4 sm:mb-0">
                <span className="font-bold tracking-widest text-text-primary">{system.name}</span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-mono tracking-widest text-emerald-500">{system.status}</span>
                </div>
              </div>
              
              <div className="relative z-10">
                <a 
                  href={system.url} 
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full text-xs font-mono tracking-widest text-text-secondary hover:text-text-primary hover:border-text-primary transition-all"
                >
                  VIEW LIVE <span className="text-lg leading-none">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
