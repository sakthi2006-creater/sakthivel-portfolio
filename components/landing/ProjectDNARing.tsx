"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const PROJECTS = [
  { 
    id: "MEDICAL", 
    label: "MEDICAL ANALYZER",
    type: "primary", 
    color: "var(--accent)",
    flow: ["REPORT", "OCR", "AI ANALYSIS", "HEALTH INSIGHTS"],
    anchor: { x: "85%", y: "42%" } // Fixed Anchor Position
  },
  { 
    id: "CYBER", 
    label: "CYBER SHIELD",
    type: "primary", 
    color: "var(--secondary)", 
    flow: ["NETWORK", "PATTERN ANALYSIS", "PREDICTION"],
    anchor: { x: "15%", y: "42%" }
  },
  { 
    id: "RAINWATER", 
    label: "RAINWATER",
    type: "primary", 
    color: "var(--primary)", 
    flow: ["CLOUD", "RAIN", "ROOFTOP", "STORAGE"],
    anchor: { x: "70%", y: "67%" }
  },
  { 
    id: "AECE", 
    label: "AECE",
    type: "primary", 
    color: "#F59E0B", 
    flow: ["SCENARIO", "ETHICAL REASONING", "EVALUATION", "DECISION GENERATED"],
    anchor: { x: "30%", y: "67%" }
  },
  { 
    id: "GRAPH", 
    label: "GRAPH FOUNDATION MODEL",
    type: "advanced", 
    color: "#4F46E5", 
    flow: ["DATA", "EMBEDDING", "CLASSIFICATION", "GRAPH FOUNDATION MODEL"],
    anchor: { x: "50%", y: "20%" }
  },
];

export function ProjectDNARing({ 
  isTransitioning, 
  setHoveredProject 
}: { 
  isTransitioning: boolean,
  setHoveredProject: (id: string | null) => void 
}) {
  const [mounted, setMounted] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div 
      className="absolute inset-0 z-10 pointer-events-none"
      animate={{
        scale: isTransitioning ? 2 : 1,
        opacity: isTransitioning ? 0 : 1,
      }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Desktop view anchors */}
      <div className="hidden md:block absolute inset-0">
        {PROJECTS.map((project) => {
          const isActive = activeProject === project.id;
          
          return (
            <div
              key={project.id}
              className="absolute pointer-events-auto"
              style={{ left: project.anchor.x, top: project.anchor.y, transform: "translate(-50%, -50%)" }}
            >
              {/* Connection Line to Core (Center of screen 50% 50%) */}
              <svg className="absolute top-1/2 left-1/2 overflow-visible pointer-events-none" style={{ zIndex: -1 }}>
                <line 
                  x1="0" 
                  y1="0" 
                  x2={`calc(50vw - ${project.anchor.x})`} 
                  y2={`calc(50vh - ${project.anchor.y})`} 
                  stroke={project.color} 
                  strokeWidth="1" 
                  strokeDasharray="4 4"
                  opacity={isActive ? 0.5 : 0.1}
                />
              </svg>

              <div
                onMouseEnter={() => {
                  setHoveredProject(project.id);
                  setActiveProject(project.id);
                }}
                onMouseLeave={() => {
                  setHoveredProject(null);
                  setActiveProject(null);
                }}
                className={`
                  relative flex flex-col items-center justify-center cursor-crosshair transition-all duration-500
                  ${project.type === "primary" ? 'text-xs md:text-sm font-bold text-text-primary' : 'text-[10px] md:text-xs text-text-primary/70'}
                  tracking-[0.4em] uppercase
                `}
              >
                {/* Visual Node */}
                <div 
                  className="w-2 h-2 rounded-full mb-2 transition-transform duration-500 shadow-[0_0_10px_currentColor]" 
                  style={{ 
                    backgroundColor: project.color, 
                    color: project.color,
                    transform: isActive ? 'scale(2)' : 'scale(1)'
                  }} 
                />
                
                {project.id}

                {/* Spatial Unfolding Flow (Flows downwards to avoid center overlap) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      className="absolute top-full mt-4 flex flex-col items-center gap-2 pointer-events-none w-max z-50 bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-border/50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="text-[10px] text-text-primary mb-2 font-black" style={{ color: project.color }}>
                        {project.label}
                      </div>
                      {project.flow.map((step, stepIdx) => (
                        <motion.div 
                          key={step} 
                          className="flex flex-col items-center"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: stepIdx * 0.1 }}
                        >
                          {stepIdx > 0 && <div className="text-[8px] text-text-secondary/50 my-1">↓</div>}
                          <div className="text-[8px] tracking-[0.3em] text-text-secondary">{step}</div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile view grid fallback (stacked below core, handled in CinematicLanding) */}
    </motion.div>
  );
}
