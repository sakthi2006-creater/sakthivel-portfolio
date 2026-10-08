"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { NeonButton } from "../ui/NeonButton";
import { FiDownload, FiFileText } from "react-icons/fi";

export function Resume() {
  return (
    <section id="resume" className="relative py-32 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-neon-cyan/10 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Resume" subtitle="Download / View" />

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassCard glow="cyan">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl glass border border-neon-cyan/30 flex items-center justify-center">
                  <FiFileText className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Sakthivel R — Resume</h3>
                  <p className="text-white/50 text-sm font-mono">PDF (public)</p>
                </div>
              </div>

              <p className="text-white/60 text-sm leading-relaxed mb-6">
                View the resume directly in the browser, or download it as a PDF.
              </p>

              <div className="flex flex-wrap gap-4">
                <NeonButton
                  variant="primary"
                  size="lg"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiFileText className="w-4 h-4" />
                  View Resume
                </NeonButton>

                <a href="/resume.pdf" download className="inline-block">
                  <NeonButton variant="outline" size="lg">
                    <FiDownload className="w-4 h-4" />
                    Download
                  </NeonButton>
                </a>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <GlassCard glow="purple">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <iframe
                  title="Resume PDF"
                  src="/resume.pdf"
                  className="w-full h-[540px] md:h-[620px]"
                />
              </div>
              <p className="text-white/40 text-xs font-mono mt-3">
                If the preview doesn’t load on your browser, use “Download Resume”.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

