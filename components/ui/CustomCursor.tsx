"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type CursorVariant = {
  size: number;
  glow: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.9 });
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.9 });

  const variant = useMemo<CursorVariant>(() => ({ size: 14, glow: 40 }), []);

  useEffect(() => {
    const mq = window.matchMedia?.("(hover: hover) and (pointer: fine)");
    const ok = mq ? mq.matches : window.innerWidth > 768;
    setEnabled(ok);

    if (!ok) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onScroll = () => {
      // keep stable; cursor position comes from pointer.
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [x, y]);

  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      const el = t?.closest?.("a,button,[data-cursor-hover='true']");
      setHovering(Boolean(el));
    };

    const onOut = () => setHovering(false);

    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, [enabled]);

  const size = hovering ? variant.size * 1.8 : variant.size;
  const glowOpacity = hovering ? 0.24 : 0.14;

  if (!enabled) return null;

  return (
    <>
      {/* Spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200]"
        style={{
          width: variant.glow,
          height: variant.glow,
          borderRadius: "9999px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle at center, rgba(39,247,255,0.22), rgba(39,247,255,0.0) 60%)",
          opacity: glowOpacity,
          x: sx,
          y: sy,
          filter: "blur(1px)",
        } as any}
      />

      {/* Cursor core */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[201]"
        style={{
          width: size,
          height: size,
          borderRadius: "9999px",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(39,247,255,0.55)",
          boxShadow:
            "0 0 24px rgba(39,247,255,0.35), 0 0 70px rgba(124,58,237,0.16)",
          background: "rgba(0,0,0,0.15)",
          x: sx,
          y: sy,
        } as any}
        animate={{ scale: hovering ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
      />

      {/* Click ripple */}
      <ClickRipple enabled={enabled} />
    </>
  );
}

function ClickRipple({ enabled }: { enabled: boolean }) {
  const [ripples, setRipples] = useState<Array<{ id: string; x: number; y: number }>>(
    []
  );

  useEffect(() => {
    if (!enabled) return;

    const onDown = (e: PointerEvent) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);
    };

    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[202]"
          style={{
            width: 36,
            height: 36,
            borderRadius: "9999px",
            border: "1px solid rgba(39,247,255,0.7)",
            transform: "translate(-50%, -50%)",
            left: r.x,
            top: r.y,
            background: "rgba(39,247,255,0.06)",
            boxShadow: "0 0 32px rgba(39,247,255,0.35)",
          }}
          initial={{ scale: 0.7, opacity: 0.0 }}
          animate={{ scale: 1.4, opacity: 0.9 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

