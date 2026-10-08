"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  const clamp = (n: number) => Math.max(0, Math.min(1, n));

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const p = height > 0 ? scrollTop / height : 0;
      setProgress(clamp(p));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const percent = useMemo(() => Math.round(progress * 100), [progress]);

  return (
    <div aria-hidden className="fixed left-0 top-0 z-[120] h-[3px] w-full">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-blue shadow-[0_0_22px_rgba(39,247,255,0.35)]"
        style={{ width: `${percent}%` }}
        initial={false}
        animate={{ width: `${percent}%` }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      />
    </div>
  );
}

