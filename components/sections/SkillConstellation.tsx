"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DNA_STRUCTURE = [
  {
    id: "ai",
    label: "ARTIFICIAL INTELLIGENCE",
    children: [
      { id: "ml", label: "Machine Learning" },
      { id: "genai", label: "Generative AI" },
      { id: "nlp", label: "NLP & Vision" },
      { id: "python", label: "Python & PyTorch" }
    ]
  },
  {
    id: "software",
    label: "SOFTWARE ENGINEERING",
    children: [
      { id: "frontend", label: "Frontend (React/Next)" },
      { id: "backend", label: "Backend (Node/Express)" },
      { id: "apis", label: "REST APIs" },
      { id: "database", label: "SQL & NoSQL" }
    ]
  },
  {
    id: "design",
    label: "PRODUCT DESIGN",
    children: [
      { id: "ui", label: "User Interface" },
      { id: "ux", label: "User Experience" },
      { id: "figma", label: "Figma Prototyping" }
    ]
  },
  {
    id: "research",
    label: "RESEARCH & LABS",
    children: [
      { id: "etcc", label: "Emotion-to-Code" },
      { id: "graph", label: "Graph Neural Networks" },
      { id: "experimentation", label: "Rapid Prototyping" }
    ]
  }
];

export function SkillConstellation() {
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => 
      prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
    );
  };

  return (
    <section className="relative min-h-screen bg-[#020617] text-white overflow-hidden flex flex-col items-center py-32 px-6" id="skills">
      
      {/* HEADER */}
      <div className="text-center mb-24 z-10">
        <div className="text-[10px] tracking-[0.5em] text-cyan-500 mb-4 uppercase font-mono">03 / ENGINEERING DNA</div>
        <h2 className="text-4xl md:text-5xl font-black tracking-widest uppercase">
          SKILL ECOSYSTEM
        </h2>
        <div className="text-xs font-mono tracking-widest text-zinc-400 mt-4 uppercase">
          Select a domain to expand
        </div>
      </div>

      <div className="w-full max-w-4xl flex flex-col gap-8 md:gap-16 relative z-10">
        {DNA_STRUCTURE.map((domain, i) => (
          <div key={domain.id} className="flex flex-col items-center relative w-full">
            
            {/* Domain Node */}
            <motion.button 
              onClick={() => toggleNode(domain.id)}
              className={`w-full max-w-md px-8 py-6 border relative group transition-all duration-500 rounded-xl overflow-hidden ${
                expandedNodes.includes(domain.id) ? "border-cyan-400 bg-cyan-950/30 shadow-[0_0_30px_rgba(34,211,238,0.15)]" : "border-white/10 bg-[#0f172a]/50 hover:border-cyan-500/50 hover:bg-[#0f172a]"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`text-lg md:text-xl font-black tracking-widest uppercase transition-colors ${expandedNodes.includes(domain.id) ? "text-cyan-400" : "text-white group-hover:text-cyan-200"}`}>
                {domain.label}
              </div>
              <div className="absolute top-1/2 right-6 -translate-y-1/2 text-xl font-light text-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity">
                {expandedNodes.includes(domain.id) ? "−" : "+"}
              </div>
            </motion.button>

            {/* Branches */}
            <AnimatePresence>
              {expandedNodes.includes(domain.id) && (
                <motion.div 
                  className="flex flex-col items-center relative w-full overflow-hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Vertical connector line */}
                  <div className="w-[2px] h-8 bg-cyan-500/30" />
                  
                  {/* Children container */}
                  <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 md:gap-8 p-6 w-full border border-cyan-900/30 bg-[#0f172a]/30 rounded-xl backdrop-blur-sm">
                    {domain.children.map((child, j) => (
                      <motion.div 
                        key={child.id}
                        className="flex items-center gap-3 bg-[#0f172a] border border-white/5 px-4 py-3 rounded-lg w-full md:w-auto"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: j * 0.05 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <div className="text-sm font-mono tracking-widest text-zinc-300 uppercase">
                          {child.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        ))}
      </div>

    </section>
  );
}
