"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { FiArrowRight } from "react-icons/fi";
import AICoreScene from "@/components/three/AICoreScene";
import { useTypewriter } from "@/hooks/useTypewriter";
import { personalInfo } from "@/data/portfolio";

const overlayId = "ai-command-overlay";

export function Hero() {
  const typed = useTypewriter(personalInfo.roles);
  const rolesLine = useMemo(() => typed, [typed]);

  return (
    <section
      id="hero"
      aria-label="AI Command Center"
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* 3D scene */}
      <div className="absolute inset-0 -z-0">
        <AICoreScene />
      </div>

      {/* Holographic volumetric layer */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[980px] h-[520px] rounded-full bg-gradient-to-r from-neon-blue/20 via-neon-purple/15 to-neon-cyan/15 blur-[90px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(39,247,255,0.12),transparent_45%),radial-gradient(circle_at_70%_40%,rgba(139,92,255,0.12),transparent_45%)]" />

        <div className="absolute inset-0 opacity-30 mix-blend-screen bg-[repeating-linear-gradient(to_bottom,rgba(39,247,255,0.08)_0,rgba(39,247,255,0.08)_1px,transparent_2px,transparent_6px)] animate-[scanMove_6s_linear_infinite]" />
      </div>

      {/* UI Overlay */}
      <div id={overlayId} className="relative z-10 w-full max-w-7xl px-6 pt-28 pb-16 mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/30 border border-neon-cyan/20 backdrop-blur"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse" />
              <span className="text-xs font-mono tracking-[0.2em] text-neon-cyan/90 uppercase">AI Operating System</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-5xl md:text-7xl font-black leading-[0.92] tracking-tight"
            >
              <span className="text-white">SAKTHIVEL</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan">R</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6"
            >
              <div className="flex items-center gap-3 text-sm md:text-base font-mono text-white/60">
                <span className="text-neon-cyan">AI Engineer</span>
                <span className="text-white/30">//</span>
                <span className="text-white/70">{rolesLine}</span>
                <span className="inline-block w-[8px] h-[16px] bg-neon-cyan/80 ml-1 animate-pulse" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 max-w-xl bg-black/25 border border-white/10 p-5 rounded-2xl backdrop-blur"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="text-xs font-mono uppercase tracking-widest text-white/50">Live Terminal</div>
                <div className="text-xs font-mono text-neon-cyan/80">connected</div>
              </div>

              <div className="mt-4 space-y-2">
                {[
                  "init://neural-core",
                  "sync://holo-ui",
                  "stream://digital-scanlines",
                  "ready://portfolio-render",
                ].map((line, i) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.28 + i * 0.08 }}
                    className="flex items-center gap-2 text-sm font-mono"
                  >
                    <span className="text-neon-cyan/80">{" >"}</span>
                    <span className={i % 2 === 0 ? "text-white/75" : "text-white/55"}>{line}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neon-cyan/5 border border-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300 font-mono"
              >
                Enter Projects
                <FiArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-3 rounded-xl bg-black/30 border border-white/10 hover:border-neon-cyan/30 transition-all duration-300 font-mono text-white/70"
              >
                Download Resume
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-[520px]">
              <motion.div
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-10 right-0 w-[360px] max-w-[80vw]"
              >
                <div className="bg-black/20 border border-white/10 rounded-2xl overflow-hidden backdrop-blur">
                  <div className="px-5 py-3 flex items-center justify-between border-b border-white/10">
                    <div className="text-xs font-mono uppercase tracking-widest text-white/50">Holo Interface</div>
                    <div className="text-xs font-mono text-neon-purple/80">v1.0</div>
                  </div>
                  <div className="p-5 space-y-4">
                    {["Neural Core", "Orbital Rings", "Particle Field", "Scanline Stream"].map((t, idx) => (
                      <motion.div
                        key={t}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 + idx * 0.08 }}
                        className="flex items-center gap-3"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{
                            background: idx % 2 === 0 ? "#2B7CFF" : "#27F7FF",
                            boxShadow: idx % 2 === 0 ? "0 0 12px rgba(43,124,255,0.8)" : "0 0 12px rgba(39,247,255,0.8)",
                          }}
                        />
                        <div className="text-sm font-mono text-white/70">{t}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                aria-hidden
              >
                <div className="w-[320px] h-[320px] rounded-full border border-neon-cyan/20" />
                <div className="absolute inset-0 rounded-full border border-neon-purple/20 animate-spinSlow" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue/5 to-neon-purple/5 blur-xl" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

