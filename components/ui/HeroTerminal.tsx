"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type BootLine = {
  text: string;
  delayMs: number;
};

function useNowInterval(ms: number) {
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), ms);
    return () => window.clearInterval(id);
  }, [ms]);
  return now;
}

function formatPercent(x: number) {
  return `${Math.max(0, Math.min(100, x)).toFixed(1)}%`;
}

function formatGB(x: number) {
  return `${x.toFixed(1)}GB`;
}

export default function HeroTerminal() {
  const controls = useAnimationControls();
  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  const role = "Backend Developer";
  const location = "Remote / Worldwide";

  const bootLines: BootLine[] = useMemo(
    () => [
      { text: "Initializing AI Core...", delayMs: 0 },
      { text: "Loading Neural Network...", delayMs: 350 },
      { text: "Connecting PostgreSQL...", delayMs: 720 },
      { text: "REST APIs Online", delayMs: 1080 },
      { text: "Authentication Enabled", delayMs: 1420 },
      { text: "Machine Learning Engine Ready", delayMs: 1790 },
      { text: "Backend Services Running", delayMs: 2130 },
      { text: "Portfolio System Ready", delayMs: 2460 },
      { text: "Welcome Sakthivel R", delayMs: 2760 },
    ],
    []
  );

  const [visibleCount, setVisibleCount] = useState(0);
  const [isBooting, setIsBooting] = useState(true);

  // Live stats (simulated)
  const now = useNowInterval(900);
  const stats = useMemo(() => {
    const t = now / 1000;
    const cpu = 35 + Math.sin(t * 0.9) * 12 + Math.random() * 3;
    const gpu = 58 + Math.sin(t * 0.7 + 1.2) * 18 + Math.random() * 2;
    const mem = 6.4 + Math.sin(t * 0.5 + 0.3) * 1.6 + Math.random() * 0.2;
    const conns = 24 + Math.floor((Math.sin(t * 0.8) + 1) * 18) + Math.floor(Math.random() * 3);

    return {
      cpu: formatPercent(cpu),
      gpu: formatPercent(gpu),
      mem: formatGB(Math.max(3.1, Math.min(12.0, mem))),
      conns: `${conns} active`,
      location,
      role,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now]);

  // Boot typing effect
  const timers = useRef<number[]>([]);
  useEffect(() => {
    if (reduceMotion) {
      setVisibleCount(bootLines.length);
      setIsBooting(false);
      return;
    }

    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];

    setVisibleCount(0);
    setIsBooting(true);

    bootLines.forEach((line, idx) => {
      const id = window.setTimeout(() => {
        setVisibleCount((c) => Math.max(c, idx + 1));
        if (idx + 1 === bootLines.length) {
          setIsBooting(false);
        }
      }, line.delayMs);
      timers.current.push(id);
    });

    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
  }, [bootLines, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const promptLabel = "ai:/root";

  const statusItems = useMemo(
    () => [
      { label: "Backend status", value: isBooting ? "WARMING" : "RUNNING", ok: !isBooting },
      { label: "API status", value: !isBooting ? "ONLINE" : "SYNCING", ok: !isBooting },
      { label: "Database status", value: !isBooting ? "CONNECTED" : "WAIT", ok: !isBooting },
      { label: "Neural Network status", value: !isBooting ? "READY" : "LOADING", ok: !isBooting },
      { label: "GPU status", value: !isBooting ? "ALLOCATED" : "STAGING", ok: !isBooting },
    ],
    [isBooting]
  );

  // For Strict Mode: keep deterministic seedless lines; no layout shifts.
  const renderedLines = useMemo(() => {
    return bootLines.slice(0, visibleCount).map((l) => l.text);
  }, [bootLines, visibleCount]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={controls}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 backdrop-blur"
    >
      {/* Scanline + noise + glow */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[repeating-linear-gradient(to_bottom,rgba(39,247,255,0.10)_0,rgba(39,247,255,0.10)_1px,transparent_2px,transparent_6px)] animate-[scanMove_6s_linear_infinite]" />
        <div className="absolute inset-0 opacity-10 bg-noise bg-repeat mix-blend-overlay" />
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(39,247,255,0.18),transparent_55%)]" />
      </div>

      {/* Border light */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-[conic-gradient(from_180deg_at_50%_50%,rgba(39,247,255,0.0),rgba(39,247,255,0.35),rgba(124,58,237,0.25),rgba(39,247,255,0.0))] opacity-40 blur-[12px]" />

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan shadow-[0_0_24px_rgba(39,247,255,0.6)]" />
            <div className="font-mono text-xs uppercase tracking-widest text-white/55">
              AI Terminal
            </div>
          </div>
          <div className="font-mono text-xs text-neon-purple/80">
            {isBooting ? "booting" : "ready"}
          </div>
        </div>

        {/* Boot log */}
        <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="font-mono text-xs leading-relaxed text-white/70">
            {renderedLines.map((t, idx) => (
              <div key={`${t}-${idx}`} className="whitespace-pre-wrap">
                <span className="text-neon-cyan/80">{" >"}</span> {t}
              </div>
            ))}

            {/* Typing caret */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-neon-cyan/80">▸</span>
              <span className="text-white/60">{isBooting ? "Compiling modules" : "System stable"}</span>
              <span className="ml-auto inline-block h-3 w-[2px] bg-neon-cyan/90 animate-[blinkCaret_1.1s_step-end_infinite]" />
            </div>
          </div>
        </div>

        {/* Status + metrics */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/30 p-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
              Live metrics
            </div>
            <div className="mt-2 space-y-2 font-mono text-xs text-white/70">
              <div className="flex items-center justify-between">
                <span className="text-white/55">CPU</span>
                <span className="text-neon-cyan/85">{stats.cpu}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/55">GPU</span>
                <span className="text-neon-cyan/85">{stats.gpu}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/55">Memory</span>
                <span className="text-neon-cyan/85">{stats.mem}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/55">Connections</span>
                <span className="text-white/80">{stats.conns}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 p-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
              System status
            </div>
            <div className="mt-2 space-y-2 font-mono text-xs">
              {statusItems.map((s) => (
                <div key={s.label} className="flex items-center justify-between gap-2">
                  <span className="text-white/55">{s.label}</span>
                  <span
                    className={
                      s.ok
                        ? "text-neon-cyan/90"
                        : "text-white/70"
                    }
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prompt */}
        <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="font-mono text-xs text-white/65">
              <span className="text-neon-cyan/85">{promptLabel}</span> {isBooting ? "--init" : "status"}
            </div>
            <div className="font-mono text-[11px] text-white/50">
              {location} • {stats.role}
            </div>
          </div>

          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-neon-blue/60 via-neon-cyan/60 to-neon-purple/60 shadow-[0_0_26px_rgba(39,247,255,0.35)]"
              style={{
                width: `${isBooting ? 35 + (visibleCount / bootLines.length) * 55 : 100}%`,
                transition: "width 500ms ease",
              }}
            />
          </div>

          <div className="mt-2 flex items-center gap-2 font-mono text-[11px] text-white/50">
            <span className="inline-flex h-2 w-2 rounded-full bg-neon-cyan/70 shadow-[0_0_18px_rgba(39,247,255,0.5)]" />
            <span>neural-link: stable • transmission: clear</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

