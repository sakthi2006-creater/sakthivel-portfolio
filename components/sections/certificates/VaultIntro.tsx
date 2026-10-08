"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface VaultIntroProps {
  onEnter: () => void;
  count: number;
}

export function VaultIntro({ onEnter, count }: VaultIntroProps) {
  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#020202] text-white overflow-hidden"
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Intro Sequence Content */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl text-center px-4">
        
        {/* Terminal Boot Sequence */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center text-[10px] md:text-xs font-mono text-cyan-500/70 mb-8 space-y-1 h-[80px]"
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>[01] CREDENTIAL SYSTEM DETECTED</motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>[02] VAULT INITIALIZED</motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>[03] {count} CREDENTIALS LOADED</motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>[04] AWAITING USER AUTHENTICATION...</motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex items-center gap-3 text-cyan-400 mb-6 font-mono text-sm tracking-widest uppercase bg-cyan-500/10 px-6 py-2 rounded-full border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
        >
          <ShieldCheck size={16} />
          Vault Status <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse ml-2" /> ONLINE
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-4xl md:text-6xl font-black tracking-[0.2em] uppercase mb-4 drop-shadow-[0_0_30px_rgba(34,211,238,0.15)]"
        >
          CREDENTIAL VAULT
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="text-zinc-400 font-mono tracking-[0.3em] uppercase text-sm md:text-base mb-16"
        >
          {count} VERIFIED CREDENTIALS <span className="mx-4 opacity-30">|</span> DIGITAL ARCHIVE
        </motion.p>

        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          onClick={onEnter}
          className="group relative flex items-center gap-4 px-10 py-5 bg-white text-black font-bold tracking-[0.4em] uppercase text-xs hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all duration-500 overflow-hidden"
        >
          {/* Light Sweep */}
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
          
          <span className="relative z-10">ENTER THE VAULT</span>
          <ArrowRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
        </motion.button>
      </div>

    </motion.div>
  );
}
