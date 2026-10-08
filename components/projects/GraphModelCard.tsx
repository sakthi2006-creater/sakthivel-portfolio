"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";

export function GraphModelCard() {
  const project = projects.find((p) => p.title.includes("Graph Foundation"));
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  if (!project || !project.graphNodes) return null;

  const nodes = project.graphNodes;

  return (
    <div className="w-full max-w-[800px] bg-surface border border-border rounded-2xl p-6 md:p-12 shrink-0 flex flex-col md:flex-row gap-8 items-center shadow-glass relative overflow-hidden group">
      
      <div className="flex-[0.8] flex flex-col items-start text-left">
        <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
          {project.title}
        </h3>
        <p className="text-text-secondary mb-6 text-sm md:text-base">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs font-mono bg-border/40 text-text-primary px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mt-auto">
          {project.demo && (
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              data-cursor="OPEN"
              className="px-6 py-2 bg-text-primary text-background text-sm font-medium rounded-full hover:scale-105 transition-transform"
            >
              LIVE DEMO
            </a>
          )}
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              data-cursor="CODE"
              className="px-6 py-2 border border-border text-text-primary text-sm font-medium rounded-full hover:border-text-primary transition-colors"
            >
              GITHUB
            </a>
          )}
        </div>
      </div>

      <div className="flex-1 w-full h-[300px] bg-[#050C17] rounded-xl border border-border/50 relative overflow-hidden flex items-center justify-center p-4">
        
        {/* SVG Graph Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
          <line x1="50%" y1="30%" x2="20%" y2="60%" stroke="#2B7CFF" strokeWidth="1" />
          <line x1="50%" y1="30%" x2="80%" y2="70%" stroke="#2B7CFF" strokeWidth="1" />
          <line x1="20%" y1="60%" x2="50%" y2="90%" stroke="#2B7CFF" strokeWidth="1" />
          <line x1="80%" y1="70%" x2="50%" y2="90%" stroke="#2B7CFF" strokeWidth="1" />
          <line x1="20%" y1="60%" x2="80%" y2="70%" stroke="#2B7CFF" strokeWidth="1" strokeDasharray="4" />
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <div 
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-crosshair group/node"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <motion.div 
              className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${hoveredNode === node.id ? 'bg-[#2B7CFF] shadow-[0_0_15px_#2B7CFF]' : 'bg-[#2B7CFF]/50'}`}
              whileHover={{ scale: 1.5 }}
            >
              <div className="w-1 h-1 bg-white rounded-full" />
            </motion.div>
          </div>
        ))}

        {/* Metadata Popover */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div 
              className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-md border border-border p-3 rounded-lg text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
            >
              <div className="text-[10px] text-text-secondary font-mono mb-1">NODE_ID: {hoveredNode}</div>
              <div className="text-sm font-bold text-text-primary">
                {nodes.find(n => n.id === hoveredNode)?.label}
              </div>
              <div className="text-xs text-text-secondary">
                {nodes.find(n => n.id === hoveredNode)?.desc}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
