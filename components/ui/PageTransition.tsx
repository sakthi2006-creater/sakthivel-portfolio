"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(10px)" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen"
      >
        {/* Route overlay for cinematic feel */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(39,247,255,0.16),transparent_55%)]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 opacity-20 mix-blend-screen bg-[repeating-linear-gradient(to_bottom,rgba(39,247,255,0.10)_0,rgba(39,247,255,0.10)_1px,transparent_2px,transparent_6px)]"
          />
        </div>

        {children}
      </motion.div>
    </AnimatePresence>
  );
}

