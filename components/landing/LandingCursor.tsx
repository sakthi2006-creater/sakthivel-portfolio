"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LandingCursor({ hoverState }: { hoverState: string | null }) {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePos = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    
    // Only on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("mousemove", updateMousePos);
      document.addEventListener("mouseleave", handleMouseLeave);
      
      return () => {
        window.removeEventListener("mousemove", updateMousePos);
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center gap-4"
      animate={{ x: mousePos.x, y: mousePos.y }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      style={{ translateX: "-50%", translateY: "-50%" }}
    >
      <div className={`
        rounded-full transition-all duration-300 flex items-center justify-center
        ${hoverState ? 'w-12 h-12 border border-accent bg-accent/10 backdrop-blur-sm' : 'w-2 h-2 bg-text-primary'}
      `}>
        {hoverState === "CONNECT" && <div className="w-2 h-2 rounded-full bg-accent animate-ping" />}
        {hoverState === "ENTER" && <div className="w-1 h-1 rounded-full bg-primary" />}
      </div>
      
      <AnimatePresence>
        {hoverState && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="text-[9px] font-mono tracking-widest text-text-primary whitespace-nowrap bg-background/80 px-2 py-1 rounded backdrop-blur-md border border-border"
          >
            {hoverState === "CONNECT" && "◎ CONNECT"}
            {hoverState === "ENTER" && "↗ ENTER"}
            {hoverState === "VIEW" && "VIEW"}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
