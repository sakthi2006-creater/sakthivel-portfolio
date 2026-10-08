"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const dnaDimensions = {
  AI: ["Machine Learning", "NLP", "Generative AI", "Computer Vision"],
  SOFTWARE: ["Backend Architecture", "REST APIs", "Database Design", "System Design"],
  DESIGN: ["UI / UX", "Interaction Design", "Prototyping", "Wireframing"],
  RESEARCH: ["ETCC Methodology", "Graph AI", "Academic Writing", "Data Analysis"]
};

type Dimension = keyof typeof dnaDimensions | null;

export function EngineeringDNA() {
  const [activeDimension, setActiveDimension] = useState<Dimension>(null);

  return (
    <section className="py-32 px-4 bg-background relative z-10 overflow-hidden" id="dna">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16">
          <div className="text-accent text-xs font-mono tracking-[0.2em] mb-4">MY ENGINEERING DNA</div>
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary">The intersection of disciplines</h2>
        </div>

        <div className="relative w-full max-w-4xl aspect-[4/3] md:aspect-video flex items-center justify-center">
          
          {/* Center Identity */}
          <motion.div 
            className="absolute z-20 bg-surface border border-border px-8 py-4 rounded-xl shadow-glass cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveDimension(null)}
          >
            <span className="font-bold text-xl tracking-widest text-text-primary">
              SAKTHIVEL R.
            </span>
          </motion.div>

          {/* Lines mapping to 4 dimensions */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
            {/* We will draw simple dynamic SVG lines connecting the center to the 4 nodes */}
            <path d="M50% 50% L30% 30%" stroke="currentColor" className="text-border" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M50% 50% L70% 30%" stroke="currentColor" className="text-border" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M50% 50% L30% 70%" stroke="currentColor" className="text-border" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M50% 50% L70% 70%" stroke="currentColor" className="text-border" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          {/* The 4 Dimension Nodes */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {Object.keys(dnaDimensions).map((dim, index) => {
              const angles = [-135, -45, 135, 45]; // Top-left, Top-right, Bottom-left, Bottom-right
              const angle = (angles[index] * Math.PI) / 180;
              const radius = 200; // Distance from center
              
              return (
                <motion.div
                  key={dim}
                  className="absolute pointer-events-auto cursor-pointer"
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                    top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                    transform: "translate(-50%, -50%)"
                  }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setActiveDimension(dim as Dimension)}
                >
                  <div className={`px-6 py-3 rounded-full border bg-surface/80 backdrop-blur-md transition-colors ${activeDimension === dim ? 'border-accent shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'border-border/50'}`}>
                    <span className="font-mono text-sm tracking-widest">{dim}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Expanded Ecosystem Panel */}
          <AnimatePresence>
            {activeDimension && (
              <motion.div 
                className="absolute inset-x-8 bottom-8 md:bottom-12 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl bg-surface/90 backdrop-blur-xl border border-accent/50 p-8 rounded-2xl shadow-glass z-30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold tracking-widest text-accent">{activeDimension} ECOSYSTEM</h3>
                  <button onClick={() => setActiveDimension(null)} className="text-text-secondary hover:text-text-primary">✕</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {dnaDimensions[activeDimension].map((skill, i) => (
                    <motion.div 
                      key={skill}
                      className="border-l-2 border-border pl-4 py-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="font-mono text-sm">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </div>
    </section>
  );
}
