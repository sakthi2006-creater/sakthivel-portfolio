"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  glow?: "blue" | "purple" | "cyan" | "none";
  hover?: boolean;
}

const glowMap = {
  blue: "hover:shadow-[0_0_30px_rgba(43,124,255,0.35)] hover:border-neon-blue/40",
  purple: "hover:shadow-[0_0_30px_rgba(139,92,255,0.35)] hover:border-neon-purple/40",
  cyan: "hover:shadow-[0_0_30px_rgba(39,247,255,0.35)] hover:border-neon-cyan/40",
  none: "",
};

export function GlassCard({ className, glow = "blue", hover = true, children, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass rounded-2xl p-6 border border-white/10 transition-all duration-500",
        hover && glowMap[glow],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
