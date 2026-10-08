 "use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { personalInfo } from "@/data/portfolio";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  hint: string;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function formatStatValue(v: number, suffix?: string) {
  const fixed = v % 1 === 0 ? v.toFixed(0) : v.toFixed(1);
  return `${fixed}${suffix ?? ""}`;
}

function useAnimatedNumber(target: number, ms = 900) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const from = 0;

    let raf = 0;
    const tick = (t: number) => {
      const p = clamp((t - start) / ms, 0, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(from + (target - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ms, reduced, target]);

  return value;
}

export default function About() {
  const reduced = useReducedMotion();

  const name = "Sakthivel R";
  const roles = [
    "Freelance Web Developer",
    "Software Engineer",
    "AI Integration Specialist",
  ];

  const stats: Stat[] = useMemo(
    () => [
      { label: "Systems shipped", value: 12, suffix: "+", hint: "Web applications & UI modules" },
      { label: "Core projects", value: 5, suffix: "", hint: "Full-stack architecture" },
      { label: "Design focus", value: 92, suffix: "%", hint: "Premium UX engineering" },
      { label: "Latency budget", value: 60, suffix: "ms", hint: "Performance tuning mindset" },
    ],
    []
  );

  const animated = stats.map((s) => useAnimatedNumber(s.value, 900));

  return (
    <section id="about" className="relative overflow-hidden bg-black/0 py-16">
      {/* aurora + noise */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-[520px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(39,247,255,0.20),transparent_58%),radial-gradient(circle_at_70%_40%,rgba(124,58,237,0.18),transparent_55%)] blur-[26px]" />
        <div className="absolute inset-0 opacity-[0.10] bg-noise bg-repeat" />
        <div className="absolute inset-0 opacity-25 mix-blend-screen bg-[repeating-linear-gradient(to_bottom,rgba(39,247,255,0.07)_0,rgba(39,247,255,0.07)_1px,transparent_2px,transparent_6px)] animate-[scanMove_8s_linear_infinite]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 rounded-full border border-neon-cyan/20 bg-black/30 px-4 py-2 backdrop-blur"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan shadow-[0_0_24px_rgba(39,247,255,0.55)] animate-pulseSoft" />
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-neon-cyan/90">Professional Identity</span>
            </motion.div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-white md:text-5xl">
              {name}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple"> Developer Profile</span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
              I build modern, high-performance web applications that merge premium design with robust backend architecture. 
              My focus is on creating digital experiences that look exceptional and drive real business results.
            </p>
          </div>

          {/* profile hologram */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-[420px] xl:w-[480px]"
          >
            <div className="relative rounded-2xl border border-white/10 bg-black/25 p-5 backdrop-blur">
              {/* holographic scan line */}
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-neon-cyan/80 shadow-[0_0_22px_rgba(39,247,255,0.6)] animate-[scanLine_2.4s_ease-in-out_infinite] z-20" />

              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-4">
                
                {/* 3D Animated Photo container */}
                <div className="relative w-28 h-28 shrink-0 rounded-xl overflow-hidden border border-neon-cyan/40 bg-black/50 shadow-[0_0_25px_rgba(39,247,255,0.2)] group">
                  <div className="absolute inset-0 bg-noise bg-repeat opacity-20 z-10 pointer-events-none mix-blend-overlay" />
                  <img 
                    src="/profile.png" 
                    alt="Sakthivel R" 
                    className="w-full h-full object-cover object-top scale-[1.15] transition-transform duration-700 group-hover:scale-100 filter contrast-125 grayscale-[20%]"
                  />
                  {/* Glitch/Scan Overlay on photo */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/10 to-neon-purple/20 mix-blend-color z-10" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_2px,rgba(39,247,255,0.15)_3px)]" />
                </div>

                <div className="flex-1 flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                  <div className="text-left sm:text-right">
                  <div className="font-mono text-xs uppercase tracking-widest text-white/55">Current role</div>
                  <div className="mt-1 text-base font-semibold text-white/90">{roles[0]}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-right">
                  <div className="font-mono text-xs uppercase tracking-widest text-white/55">Signal</div>
                  <div className="mt-1 font-mono text-sm text-neon-cyan/90" suppressHydrationWarning>+0.{Math.floor(Math.random() * 90) + 10}</div>
                </div>
              </div>
              </div>

              {/* animated biography blocks */}
              <div className="mt-4 grid gap-3">
                {[
                  "Premium web development for businesses and startups.",
                  "Modern UX + performance-aware UI architecture.",
                  "Backend-first execution: APIs, databases, integrations.",
                ].map((t, idx) => (
                  <motion.div
                    key={t}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: idx * 0.06 }}
                    className="rounded-xl border border-white/10 bg-black/30 p-3"
                  >
                    <div className="font-mono text-xs text-white/60">expertise:{String(idx + 1).padStart(2, "0")}</div>
                    <div className="mt-1 text-sm text-white/80">{t}</div>
                  </motion.div>
                ))}
              </div>

              {/* career scan */}
              <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs uppercase tracking-widest text-white/55">Professional journey</div>
                  <div className="font-mono text-xs text-neon-purple/80">timeline</div>
                </div>
                <div className="mt-3 space-y-2">
                  {[
                    { k: "Now", v: "Freelance Web Developer" },
                    { k: "Next", v: "Production pipelines + enterprise apps" },
                    { k: "Goal", v: "High-performance digital experiences" },
                  ].map((it) => (
                    <div key={it.k} className="flex items-center justify-between gap-3">
                      <div className="font-mono text-xs text-white/60">{it.k.toUpperCase()}</div>
                      <div className="flex-1 rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-xs text-white/70">
                        {it.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* interactive stats */}
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: idx * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-5 backdrop-blur"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -top-20 left-1/2 h-[160px] w-[260px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(39,247,255,0.25),transparent_58%)] blur-[26px]" />
              </div>

              <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">{s.label}</div>
              <div className="mt-3 text-3xl font-black tracking-tight text-white">
                {formatStatValue(animated[idx] ?? 0, s.suffix)}
              </div>
              <div className="mt-2 text-sm text-white/70">{s.hint}</div>

              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple"
                  style={{ width: `${clamp((animated[idx] ?? 0) / (s.value || 1), 0, 1) * 100}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* floating glass cards */}
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {[
            { tag: "objective", title: "Career objectives", body: "Ship AI-enabled products with measurable impact and clean engineering." },
            { tag: "signal", title: "AI profile scan", body: "Realtime holographic scan of skills, focus areas, and system readiness." },
            { tag: "modules", title: "Subsystem modules", body: "UI motion + data pipelines + performance tuning—integrated as one experience." },
          ].map((c, idx) => (
            <motion.div
              key={c.title}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: idx * 0.05 }}
              className="relative rounded-2xl border border-white/10 bg-black/25 p-5 backdrop-blur"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-white/55">{c.tag}</div>
              <div className="mt-2 text-lg font-semibold text-white/90">{c.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{c.body}</p>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        {/* hidden: use personalInfo to ensure existing data is used without breaking builds */}
        <div className="sr-only" aria-hidden>
          {personalInfo?.name ?? ""}
        </div>
      </div>
    </section>
  );
}

