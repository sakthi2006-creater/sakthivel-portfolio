"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Network } from "lucide-react";
import { ProjectHUD } from "@/components/ui/ProjectHUD";
import { projects } from "@/data/projects";

// The evolving central graph nodes
const NODES = [
  { id: 0, label: "DATA" },
  { id: 1, label: "CONSTRUCTION" },
  { id: 2, label: "EMBEDDING" },
  { id: 3, label: "FEATURE LEARNING" },
  { id: 4, label: "CLASSIFICATION" },
  { id: 5, label: "MODEL" },
  { id: 6, label: "INPUT" },
  { id: 7, label: "OUTPUT" },
];

export function GraphAIWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const projectData = projects.find(p => p.title.includes("Graph Foundation"))!;

  // Map scroll progress to a discrete "scene" (0 to 9 for 10 scenes)
  const sceneProgress = useTransform(scrollYProgress, 
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  );
  
  const [activeScene, setActiveScene] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  
  sceneProgress.on("change", (latest) => {
    const scene = Math.min(9, Math.floor(latest));
    if (scene !== activeScene) {
      setActiveScene(scene);
    }
  });

  const hudOpacity = useTransform(scrollYProgress, [0.05, 0.1, 0.9, 0.95], [0, 1, 1, 0]);

  // Determine node positions based on the active scene
  const getNodePosition = (nodeId: number, scene: number) => {
    // Default hidden
    let pos = { x: 50, y: 50, scale: 0, opacity: 0 };

    switch(scene) {
      case 0: // Intro (3 massive nodes on the right)
        if (nodeId === 0) pos = { x: 75, y: 30, scale: 1.5, opacity: 1 };
        if (nodeId === 1) pos = { x: 60, y: 65, scale: 1.2, opacity: 1 };
        if (nodeId === 2) pos = { x: 85, y: 75, scale: 1.5, opacity: 1 };
        break;
      case 1: // What is it (6 nodes wrapping the right side)
        if (nodeId <= 5) {
          const angle = (nodeId / 6) * Math.PI * 2;
          pos = { 
            x: 75 + Math.cos(angle) * 15, 
            y: 50 + Math.sin(angle) * 35, 
            scale: 1, 
            opacity: 1 
          };
        }
        break;
      case 2: // Why Graph (Illuminated edges, same position)
        if (nodeId <= 5) {
          const angle = (nodeId / 6) * Math.PI * 2;
          pos = { 
            x: 75 + Math.cos(angle) * 20, 
            y: 50 + Math.sin(angle) * 40, 
            scale: 1.2, 
            opacity: 1 
          };
        }
        break;
      case 3: // Flow / Pipeline (Cascading down the right side)
        if (nodeId <= 5) {
          pos = { x: 75, y: 15 + (nodeId * 14), scale: 1.2, opacity: 1 };
        }
        break;
      case 4: // Explore (Interactive huge scattered nodes)
        if (nodeId <= 5) {
          // Spread widely across 20% to 80% width, 20% to 80% height
          const coords = [
            {x: 30, y: 20}, {x: 70, y: 25}, {x: 50, y: 50}, 
            {x: 25, y: 75}, {x: 75, y: 70}, {x: 50, y: 85}
          ];
          pos = { x: coords[nodeId].x, y: coords[nodeId].y, scale: 1.5, opacity: 1 };
          
          if (hoveredNode !== null && hoveredNode !== nodeId) {
            pos.opacity = 0.2;
          }
        }
        break;
      case 5: // My Role (Moved right, medium size)
        if (nodeId <= 5) {
          const angle = (nodeId / 6) * Math.PI * 2;
          pos = { 
            x: 80 + Math.cos(angle) * 10, 
            y: 50 + Math.sin(angle) * 25, 
            scale: 0.8, 
            opacity: 0.3 
          };
        }
        break;
      case 6: // Tech (Moved right)
        if (nodeId <= 2) { 
          pos = { x: 75, y: 30 + (nodeId * 20), scale: 1.5, opacity: 1 };
        }
        break;
      case 7: // Conceptual Architecture (Center flow chart)
        pos = { x: 50, y: 20 + (nodeId * 9), scale: 1.2, opacity: 1 };
        if (nodeId === 6) pos = { x: 50, y: 8, scale: 1.2, opacity: 1 }; // Input top
        if (nodeId === 7) pos = { x: 50, y: 92, scale: 1.2, opacity: 1 }; // Output bottom
        break;
      case 8: // Insight (Dimmed background)
        if (nodeId <= 5) {
          const angle = (nodeId / 6) * Math.PI * 2;
          pos = { 
            x: 50 + Math.cos(angle) * 45, 
            y: 50 + Math.sin(angle) * 45, 
            scale: 0.5, 
            opacity: 0.05 
          };
        }
        break;
      case 9: // Final Reveal (Massive everywhere)
        if (nodeId <= 7) {
          const coords = [
            {x: 10, y: 10}, {x: 90, y: 15}, {x: 50, y: 30}, 
            {x: 20, y: 50}, {x: 80, y: 55}, {x: 50, y: 70},
            {x: 30, y: 90}, {x: 70, y: 85}
          ];
          pos = { x: coords[nodeId].x, y: coords[nodeId].y, scale: 2, opacity: 0.4 };
        }
        break;
      default:
        break;
    }

    return pos;
  };

  // Edges logic based on scene
  const renderEdges = () => {
    let edges: [number, number][] = [];
    
    switch(activeScene) {
      case 0: edges = [[0,1], [0,2], [1,2]]; break;
      case 1: 
      case 2:
      case 5:
      case 8: edges = [[0,1], [1,2], [2,3], [3,4], [4,5], [5,0], [0,3], [1,4]]; break;
      case 3: edges = [[0,1], [1,2], [2,3], [3,4], [4,5]]; break;
      case 4: edges = [[0,1], [0,2], [1,3], [2,4], [3,5], [4,5], [2,5]]; break;
      case 6: edges = [[0,1], [1,2]]; break;
      case 7: edges = [[6,0], [0,1], [1,2], [2,3], [3,4], [4,5], [5,7]]; break;
      case 9: edges = [[0,1], [1,2], [2,3], [3,4], [4,5], [5,6], [6,7], [7,0], [0,3], [1,4], [2,7], [3,6], [4,7]]; break;
    }

    return edges.map(([source, target]) => {
      const p1 = getNodePosition(source, activeScene);
      const p2 = getNodePosition(target, activeScene);
      if (p1.opacity === 0 || p2.opacity === 0) return null;

      const isHighlighted = activeScene === 2 || (activeScene === 4 && (hoveredNode === source || hoveredNode === target));

      return (
        <motion.line
          key={`${source}-${target}`}
          x1={`${p1.x}%`} y1={`${p1.y}%`}
          x2={`${p2.x}%`} y2={`${p2.y}%`}
          stroke="currentColor"
          strokeWidth="6"
          className={isHighlighted ? "text-violet-400" : "text-violet-900/30"}
          initial={false}
          animate={{ 
            x1: `${p1.x}%`, y1: `${p1.y}%`, 
            x2: `${p2.x}%`, y2: `${p2.y}%` 
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      );
    });
  };

  return (
    <section ref={containerRef} className="relative bg-black w-full text-white">
      
      {/* MOBILE 2D FALLBACK (Unaffected by Desktop scrollytelling) */}
      <div className="md:hidden min-h-[100dvh] flex flex-col items-center p-8 bg-black">
        <Network size={32} className="text-violet-500 mb-8 opacity-80" />
        <div className="text-[10px] font-mono tracking-widest text-violet-500/70 uppercase mb-4 text-center">
          06 / PROJECT WORLD
        </div>
        <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-6 text-center leading-tight">
          {projectData.title}
        </h2>
        <div className="text-xs font-mono text-white/70 mb-12 text-center">
          A graph-based AI project exploring relationships, representations and learning over graph structures.
        </div>
        <a href={projectData.github} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-white border border-white/20 px-6 py-3 rounded mb-16">
          [ VIEW GITHUB ↗ ]
        </a>
      </div>

      {/* DESKTOP NATIVE SCROLL STORY */}
      <div className="hidden md:block">
        
        <ProjectHUD 
          worldNum="06"
          title={projectData.title}
          subtitle={projectData.description}
          role={projectData.highlights[0]}
          liveLink={projectData.demo}
          githubLink={projectData.github}
          color={projectData.color}
          opacity={hudOpacity}
        />

        {/* STICKY BACKGROUND GRAPH LAYER */}
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0%,transparent_100%)] pointer-events-none" />
          
          <svg className="absolute inset-0 w-full h-full">
            {renderEdges()}
          </svg>
          
          {NODES.map((node) => {
            const pos = getNodePosition(node.id, activeScene);
            const isFlowScene = activeScene === 3 || activeScene === 7;
            
            return (
              <motion.div
                key={node.id}
                className={`absolute flex items-center justify-center ${activeScene === 4 ? 'pointer-events-auto cursor-pointer hover:scale-125' : 'pointer-events-none'}`}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)"
                }}
                animate={{ 
                  left: `${pos.x}%`, 
                  top: `${pos.y}%`, 
                  scale: pos.scale, 
                  opacity: pos.opacity 
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                onMouseEnter={() => activeScene === 4 && setHoveredNode(node.id)}
                onMouseLeave={() => activeScene === 4 && setHoveredNode(null)}
              >
                {/* Massive Node Sizes (w-24 h-24 -> 96px base) */}
                <div className={`
                  rounded-full transition-colors duration-500 flex items-center justify-center
                  w-24 h-24 bg-violet-600/80 border border-violet-400 shadow-[0_0_40px_rgba(139,92,246,0.3)]
                  ${activeScene === 4 && hoveredNode === node.id ? 'bg-violet-400 shadow-[0_0_60px_rgba(139,92,246,0.8)]' : ''}
                  ${activeScene === 9 ? 'opacity-30' : ''}
                `} />
                
                {/* Node Label Displayed Visually Inside the Flow */}
                {isFlowScene && (
                  <div className="absolute left-[110%] whitespace-nowrap text-lg font-black tracking-widest text-white drop-shadow-md">
                    {node.label}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* 10 NATIVE MIN-H-SCREEN SCENES (FOREGROUND TEXT LAYER) */}
        <div className="relative z-10 w-full lg:pr-[140px] -mt-[100svh]">
          
          {/* 01: Intro */}
          <div className="min-h-[100svh] w-full flex flex-col justify-center px-12 md:px-24">
            <div className="max-w-3xl pointer-events-auto bg-black/30 p-8 rounded-2xl backdrop-blur-sm border border-transparent hover:border-violet-900/30 transition-colors">
              <div className="text-sm font-mono tracking-[0.4em] text-violet-500 uppercase mb-6">06 / PROJECT UNIVERSE</div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-widest uppercase mb-6 leading-tight">
                {projectData.title}
              </h2>
              <div className="text-xl font-mono tracking-[0.3em] text-violet-400 mb-8">
                GRAPH AI · MACHINE LEARNING
              </div>
              <div className="text-lg font-mono text-white/70 tracking-[0.1em] mb-12">
                CORE DEVELOPMENT TEAM
              </div>
              <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">
                A graph-based AI project exploring relationships, representations and learning over graph structures.
              </p>
              <a href={projectData.github} target="_blank" rel="noopener noreferrer" className="inline-block pointer-events-auto text-sm font-mono tracking-[0.2em] text-white border border-white/20 px-8 py-4 hover:bg-white/10 transition-colors">
                [ VIEW GITHUB ↗ ]
              </a>
            </div>
          </div>

          {/* 02: Concept */}
          <div className="min-h-[100svh] w-full flex flex-col justify-center px-12 md:px-24">
            <div className="max-w-2xl bg-black/60 backdrop-blur-md p-12 border border-violet-900/50">
              <h3 className="text-4xl font-black text-white tracking-widest uppercase mb-8">What is Graph AI?</h3>
              <p className="text-xl text-zinc-300 leading-relaxed mb-6">
                Traditional ML models assume data points are independent. 
              </p>
              <p className="text-xl text-zinc-300 leading-relaxed">
                This project builds representations that natively understand the complex web of relationships between entities.
              </p>
            </div>
          </div>

          {/* 03: Why Graph? */}
          <div className="min-h-[100svh] w-full flex flex-col justify-center px-12 md:px-24">
            <div className="flex flex-col gap-6">
              <div className="text-sm font-mono tracking-[0.4em] text-violet-500 mb-4">WHY GRAPH?</div>
              <div className="text-4xl md:text-5xl font-black text-white tracking-widest">DATA</div>
              <div className="text-violet-500 text-3xl pl-4">↓</div>
              <div className="text-4xl md:text-5xl font-black text-white tracking-widest">RELATIONSHIPS</div>
              <div className="text-violet-500 text-3xl pl-4">↓</div>
              <div className="text-4xl md:text-5xl font-black text-violet-400 tracking-widest drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]">GRAPH STRUCTURE</div>
              <div className="text-violet-500 text-3xl pl-4">↓</div>
              <div className="text-4xl md:text-5xl font-black text-white tracking-widest">REPRESENTATION</div>
              <div className="text-violet-500 text-3xl pl-4">↓</div>
              <div className="text-4xl md:text-5xl font-black text-white tracking-widest">LEARNING</div>
            </div>
          </div>

          {/* 04: Project Flow */}
          <div className="min-h-[100svh] w-full flex flex-col justify-center px-12 md:px-24">
            <div className="text-sm font-mono tracking-[0.4em] text-violet-500 mb-12">PROJECT FLOW</div>
            <div className="flex flex-col gap-8 max-w-xl">
              <div className="text-3xl font-black text-white tracking-widest p-6 border border-white/20 bg-black/50">DATA</div>
              <div className="text-3xl font-black text-white tracking-widest p-6 border border-white/20 bg-black/50">GRAPH CONSTRUCTION</div>
              <div className="text-3xl font-black text-white tracking-widest p-6 border border-white/20 bg-black/50">NODE/EDGE REPRESENTATION</div>
              <div className="text-3xl font-black text-white tracking-widest p-6 border border-white/20 bg-black/50">EMBEDDING</div>
              <div className="text-3xl font-black text-violet-400 tracking-widest p-6 border border-violet-500/50 bg-violet-900/30">FEATURE LEARNING</div>
              <div className="text-3xl font-black text-white tracking-widest p-6 border border-white/20 bg-black/50">CLASSIFICATION</div>
            </div>
          </div>

          {/* 05: Explore */}
          <div className="min-h-[100svh] w-full flex flex-col justify-end items-center pb-24 pointer-events-none">
            <div className="text-sm font-mono tracking-[0.4em] text-violet-400 bg-violet-900/80 px-8 py-4 rounded-full border border-violet-500/50 drop-shadow-xl pointer-events-auto">
              HOVER NODES TO EXPLORE TOPOLOGY
            </div>
          </div>

          {/* 06: My Role */}
          <div className="min-h-[100svh] w-full flex flex-col justify-center px-12 md:px-24">
            <div className="max-w-xl bg-black/60 backdrop-blur-md p-12 border border-violet-900/30">
              <div className="text-sm font-mono tracking-[0.5em] text-violet-500 mb-8">MY ROLE</div>
              <div className="text-4xl md:text-5xl font-black text-white tracking-widest mb-12 leading-tight">
                CORE DEVELOPMENT TEAM
              </div>
              <ul className="flex flex-col gap-6 text-xl font-mono tracking-[0.1em] text-zinc-300">
                <li>• Early research</li>
                <li>• Idea exploration</li>
                <li>• System design</li>
                <li>• Implementation</li>
                <li>• Experimentation</li>
                <li>• Technical direction</li>
              </ul>
            </div>
          </div>

          {/* 07: Technology */}
          <div className="min-h-[100svh] w-full flex flex-col justify-center px-12 md:px-24">
            <div className="text-sm font-mono tracking-[0.4em] text-violet-500 mb-12">TECHNOLOGY</div>
            <div className="flex flex-col gap-12 text-4xl md:text-6xl font-black tracking-widest text-white">
              <div>PYTHON</div>
              <div className="text-violet-500 text-3xl">↓</div>
              <div>MACHINE LEARNING</div>
              <div className="text-violet-500 text-3xl">↓</div>
              <div className="text-violet-400 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]">GRAPH AI</div>
            </div>
          </div>

          {/* 08: Architecture */}
          <div className="min-h-[100svh] w-full flex flex-col justify-center px-12 md:px-24">
            {/* Background graph visually handles this flow, text remains sparse to avoid overlap */}
            <div className="text-sm font-mono tracking-[0.4em] text-violet-500 mb-4 bg-black/50 p-4 inline-block">CONCEPTUAL</div>
            <div className="text-4xl font-black text-white tracking-widest bg-black/50 p-4 inline-block">PROJECT ARCHITECTURE</div>
          </div>

          {/* 09: Insight */}
          <div className="min-h-[100svh] w-full flex flex-col justify-center items-center px-12 md:px-24 text-center">
            <div className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none max-w-6xl drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] mb-8">
              "UNDERSTANDING DATA THROUGH RELATIONSHIPS
            </div>
            <div className="text-3xl md:text-5xl font-black text-violet-400 tracking-wide">
              NOT JUST ISOLATED VALUES."
            </div>
          </div>

          {/* 10: Final Reveal */}
          <div className="min-h-[100svh] w-full flex flex-col justify-center items-center px-12 text-center">
            <div className="bg-black/80 backdrop-blur-xl p-16 md:p-24 border border-violet-500/50 rounded-3xl shadow-[0_0_100px_rgba(139,92,246,0.2)] max-w-4xl w-full">
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-widest uppercase mb-8">
                {projectData.title}
              </h2>
              <div className="text-xl font-mono tracking-[0.2em] text-violet-400 mb-12">
                CORE DEVELOPMENT TEAM
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-lg font-mono tracking-[0.1em] text-zinc-300 mb-16">
                <span>PYTHON</span>
                <span className="text-violet-500">·</span>
                <span>MACHINE LEARNING</span>
                <span className="text-violet-500">·</span>
                <span>GRAPH AI</span>
              </div>
              <a href={projectData.github} target="_blank" rel="noopener noreferrer" className="inline-block pointer-events-auto text-lg font-mono tracking-[0.2em] text-white border border-violet-500 bg-violet-900/30 px-12 py-6 hover:bg-violet-900/60 transition-colors">
                [ VIEW GITHUB ↗ ]
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
