"use client";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({ title, subtitle, className, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      className={cn("mb-16", align === "center" ? "text-center" : "text-left", className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {subtitle && (
        <p className="text-neon-cyan text-sm font-mono uppercase tracking-[0.3em] mb-3 opacity-80">{subtitle}</p>
      )}
      <h2 className={cn("text-4xl md:text-5xl font-bold", align === "center" && "mx-auto")}>
        <span className="gradient-text">{title}</span>
      </h2>
      <div className={cn("mt-4 flex gap-2", align === "center" ? "justify-center" : "justify-start")}>
        <div className="h-0.5 w-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full" />
        <div className="h-0.5 w-4 bg-neon-cyan rounded-full" />
        <div className="h-0.5 w-2 bg-neon-purple/40 rounded-full" />
      </div>
    </motion.div>
  );
}
