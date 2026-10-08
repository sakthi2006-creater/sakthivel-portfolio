"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

const workflow = [
  { id: "01", title: "IDEA", details: "Identifying problems worth solving in the AI space." },
  { id: "02", title: "RESEARCH", details: "Example: ETCC & Graph AI foundation work." },
  { id: "03", title: "ARCHITECTURE", details: "Scalable system design and data modeling." },
  { id: "04", title: "DESIGN", details: "UI/UX, micro-interactions, and visual storytelling." },
  { id: "05", title: "BUILD", details: "Example: Medical Analyzer & Cyber Shield." },
  { id: "06", title: "TEST", details: "Performance, accessibility, and edge-case testing." },
  { id: "07", title: "DEPLOY", details: "Live systems running on modern edge infrastructure." },
  { id: "08", title: "ITERATE", details: "Gathering feedback and pushing V2 upgrades." }
];

export function HowIBuild() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section ref={containerRef} className="py-32 px-4 bg-background relative z-10 border-t border-border/30" id="how-i-build">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-24">
          <div className="text-accent text-xs font-mono tracking-[0.2em] mb-4">ENGINEERING PROCESS</div>
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary">How I Build</h2>
        </div>

        <div className="relative">
          {/* Main vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-border/50" />
          
          {/* Animated active line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-accent via-cyan-500 to-transparent origin-top"
            style={{ scaleY: scrollYProgress, height: "100%" }}
          />

          <div className="flex flex-col gap-12 md:gap-24 relative z-10">
            {workflow.map((step, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={step.id}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block flex-1" />

                  {/* Node */}
                  <div className="relative flex items-center justify-center shrink-0">
                    <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center shadow-glass z-10 relative">
                      <div className="w-2 h-2 rounded-full bg-text-secondary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <div className="text-accent text-xs font-mono tracking-widest mb-2">{step.id}</div>
                    <h3 className="text-2xl font-bold text-text-primary mb-3">{step.title}</h3>
                    <p className="text-text-secondary font-mono text-sm border-l-2 md:border-l-0 md:border-b-2 border-border/50 pl-4 md:pl-0 md:pb-2">
                      {step.details}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
