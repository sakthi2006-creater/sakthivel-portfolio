"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function GlobalCTA() {
  return (
    <div className="w-full py-24 flex flex-col items-center text-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.05),transparent_70%)] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-widest mb-6 uppercase drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          LET'S BUILD YOUR NEXT WEBSITE.
        </h2>
        
        <p className="text-sm md:text-base text-white/50 max-w-xl mb-12 font-light tracking-wide leading-relaxed">
          Have a project in mind? Let's turn it into a polished, high-performing web experience designed for real business impact.
        </p>

        <Link 
          href="/contact" 
          className="flex items-center justify-center gap-4 text-xs font-mono tracking-[0.2em] text-[#020617] bg-cyan-400 px-10 py-5 hover:bg-cyan-300 transition-all rounded shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]"
        >
          START A PROJECT <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
}
