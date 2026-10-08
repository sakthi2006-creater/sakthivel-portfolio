"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingBadgeProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
}

export function FloatingBadge({ icon, title, subtitle, className = "", delay = 0, yOffset = 15, duration = 4 }: FloatingBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={`absolute z-30 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -yOffset, 0] }}
        transition={{ repeat: Infinity, duration, ease: "easeInOut", delay }}
        className="flex items-center gap-3 rounded-xl border border-cyan-500/30 bg-[#020617]/70 p-3 pr-6 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.15)] pointer-events-none"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white tracking-wide">{title}</span>
          <span className="text-[10px] font-mono text-cyan-500/80 uppercase tracking-widest">{subtitle}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
