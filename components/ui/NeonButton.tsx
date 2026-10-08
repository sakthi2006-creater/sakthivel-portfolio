"use client";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { ReactNode } from "react";

interface NeonButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function NeonButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
  target,
  rel,
  type = "button",
  disabled,
}: NeonButtonProps) {
  const sizeMap = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base" };
  const variantMap = {
    primary:
      "bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan text-white shadow-[0_0_25px_rgba(43,124,255,0.4)]",
    outline:
      "bg-transparent border border-neon-blue/60 text-neon-blue hover:bg-neon-blue/10 hover:shadow-[0_0_20px_rgba(43,124,255,0.3)]",
    ghost: "bg-white/5 text-white/80 hover:bg-white/10 border border-white/10",
  };

  const base = cn(
    "relative rounded-xl font-semibold tracking-wide transition-all duration-300 inline-flex items-center gap-2 cursor-none overflow-hidden",
    sizeMap[size],
    variantMap[variant],
    disabled && "opacity-50 pointer-events-none",
    className
  );

  const inner = (
    <motion.span
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={base}
      onClick={onClick}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan opacity-0 hover:opacity-20 transition-opacity duration-300" />
      )}
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className="inline-block">
        {inner}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} className="inline-block bg-transparent border-none p-0">
      {inner}
    </button>
  );
}
