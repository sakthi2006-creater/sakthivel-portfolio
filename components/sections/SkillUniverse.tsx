"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Target, ChevronLeft, ChevronRight } from "lucide-react";
import { skills } from "@/data/skills";

// Mapped Domains for the Lab
const DOMAINS = [
  { id: "ai", label: "AI / ML", categoryName: "AI / ML" },
  { id: "software", label: "SOFTWARE", categoryName: "Programming" },
  { id: "data", label: "DATA", categoryName: "Data" },
  { id: "design", label: "DESIGN", categoryName: "UI / UX & Design" },
  { id: "research", label: "RESEARCH", categoryName: "Tools & Creative" }, // Mapping ETCC/Research to Tools & Creative based on skills.ts if available, or we fallback.
];

// Validated Project Links
const PROJECT_LINKS: Record<string, { skill: string; project: string }[]> = {
  "ai": [
    { skill: "Machine Learning", project: "Cyber Shield" },
    { skill: "Artificial Intelligence", project: "AECE" },
    { skill: "Machine Learning", project: "Medical Report Analyzer" }
  ],
  "software": [
    { skill: "System design", project: "Flexzo" },
    { skill: "System design", project: "Rainwater Harvesting" }
  ],
  "data": [
    { skill: "Data Visualization", project: "Graph Link Prediction Dashboard" }
  ],
  "design": [
    { skill: "UI Design", project: "Medical Report Analyzer" }
  ],
  "research": [
    { skill: "Problem Solving", project: "ETCC Framework" }
  ]
};

// SVG Coordinates for the generic environment template
const ENV = {
  core: { x: 300, y: 450 }, // Left side core
  domainNode: { x: 600, y: 450 }, // Center-left domain
  skillsStartX: 850,
  skillsStartY: 300,
  skillsGapY: 100,
  projectStartX: 1300,
  projectStartY: 350,
  projectGapY: 150
};

export function SkillUniverse() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const changeDomain = useCallback((newIndex: number) => {
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    changeDomain(activeIndex === DOMAINS.length - 1 ? 0 : activeIndex + 1);
  }, [activeIndex, changeDomain]);

  const handlePrev = useCallback(() => {
    changeDomain(activeIndex === 0 ? DOMAINS.length - 1 : activeIndex - 1);
  }, [activeIndex, changeDomain]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key >= "1" && e.key <= "5") {
        const index = parseInt(e.key) - 1;
        changeDomain(index);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, changeDomain]);

  // Touch Drag/Swipe
  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = offset.x;
    if (swipe < -50) handleNext();
    else if (swipe > 50) handlePrev();
  };

  if (!isMounted) return <div className="h-screen bg-[#020205]" />;

  const activeDomain = DOMAINS[activeIndex];
  const activeSkillsData = skills.find(s => s.category === activeDomain.categoryName);
  const coreSkills = activeSkillsData?.items.slice(0, 4) || ["Skill 1", "Skill 2", "Skill 3"];
  const activeProjects = PROJECT_LINKS[activeDomain.id] || [];

  // Variants for sliding the worlds
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.8, type: "spring", bounce: 0.2 }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 45 : -45,
      transition: { duration: 0.6 }
    })
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 0.4, transition: { duration: 1, delay: 0.4, ease: "easeInOut" } }
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (customDelay: number) => ({
      scale: 1, opacity: 1, transition: { type: "spring", delay: customDelay }
    })
  };

  return (
    <section 
      ref={containerRef} 
      className="h-[100svh] w-full bg-[#020205] relative font-mono text-white overflow-hidden flex flex-col perspective-1000"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#020205_100%)]" />
      </div>

      {/* Global Header */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-50 pointer-events-none">
        <div className="text-[10px] md:text-xs tracking-[0.5em] text-cyan-500 uppercase">03 / ENGINEERING DNA</div>
        <h1 className="text-xl md:text-2xl font-black tracking-widest uppercase mt-2">SKILL LAB</h1>
        <div className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase mt-4">
          <span className="hidden md:inline">SWIPE / DRAG TO EXPLORE OR USE (1-5)</span>
          <span className="md:hidden">SWIPE TO EXPLORE</span>
        </div>
      </div>

      <div className="absolute top-8 right-8 md:top-12 md:right-12 z-50 pointer-events-none text-right">
        <div className="text-[10px] md:text-xs tracking-[0.4em] text-zinc-600 uppercase">CURRENT DOMAIN</div>
        <div className="text-lg md:text-xl font-bold tracking-widest uppercase text-white mt-1">{activeDomain.label}</div>
      </div>

      {/* MAIN INTERACTIVE CANVAS */}
      <motion.div 
        className="flex-1 w-full relative touch-pan-y"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {/* --- DESKTOP 3D ENVIRONMENT (Hidden on Mobile) --- */}
            {!isMobile && (
              <div className="absolute inset-0 w-full h-full">
                {/* SVG Graph Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Core to Domain */}
                  <motion.path 
                    d={`M ${ENV.core.x} ${ENV.core.y} L ${ENV.domainNode.x} ${ENV.domainNode.y}`}
                    stroke="#22d3ee" strokeWidth="2" fill="none"
                    variants={lineVariants} initial="hidden" animate="visible"
                  />

                  {/* Domain to Skills */}
                  {coreSkills.map((skill, i) => {
                    const y = ENV.skillsStartY + (i * ENV.skillsGapY);
                    return (
                      <g key={`branch-${i}`}>
                        <motion.path 
                          d={`M ${ENV.domainNode.x} ${ENV.domainNode.y} L ${ENV.skillsStartX} ${y}`}
                          stroke="#22d3ee" strokeWidth="1" strokeDasharray="4,4" fill="none"
                          variants={lineVariants} initial="hidden" animate="visible"
                        />
                      </g>
                    );
                  })}

                  {/* Skills to Projects */}
                  {activeProjects.map((link, i) => {
                    const skillIndex = coreSkills.indexOf(link.skill);
                    // If skill not in top 4, link from domain node directly as fallback
                    const startX = skillIndex >= 0 ? ENV.skillsStartX : ENV.domainNode.x;
                    const startY = skillIndex >= 0 ? ENV.skillsStartY + (skillIndex * ENV.skillsGapY) : ENV.domainNode.y;
                    
                    const projY = ENV.projectStartY + (i * ENV.projectGapY);

                    return (
                      <g key={`proj-link-${i}`}>
                        <motion.path 
                          d={`M ${startX} ${startY} Q ${startX + 200} ${projY} ${ENV.projectStartX} ${projY}`}
                          stroke="#fff" strokeWidth="1" strokeDasharray="2,6" fill="none"
                          variants={lineVariants} initial="hidden" animate="visible"
                        />
                        {/* Travelling Light Pulse */}
                        <motion.circle r="3" fill="#fff" filter="url(#glow)" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, delay: 1.5 + (i * 0.5), repeat: Infinity }}>
                          <animate attributeName="cx" values={`${startX};${ENV.projectStartX}`} dur="2s" repeatCount="indefinite" />
                          <animate attributeName="cy" values={`${startY};${projY}`} dur="2s" repeatCount="indefinite" />
                        </motion.circle>
                      </g>
                    );
                  })}
                </svg>

                {/* HTML Overlay Nodes */}
                <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ contain: 'layout size' }}>
                  {/* The mathematical layout here perfectly matches the 1600x900 SVG viewBox via relative percentages */}
                  
                  {/* Core Node */}
                  <motion.div className="absolute flex flex-col items-center" style={{ left: `${(ENV.core.x/1600)*100}%`, top: `${(ENV.core.y/900)*100}%`, transform: 'translate(-50%, -50%)' }} custom={0} variants={nodeVariants} initial="hidden" animate="visible">
                    <div className="w-16 h-16 rounded-full border border-zinc-800 bg-black flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.1)]">
                      <div className="w-4 h-4 bg-zinc-600 rounded-full" />
                    </div>
                    <div className="absolute top-20 text-xs font-bold tracking-widest text-zinc-500 uppercase whitespace-nowrap">DNA CORE</div>
                  </motion.div>

                  {/* Domain Node */}
                  <motion.div className="absolute flex flex-col items-center" style={{ left: `${(ENV.domainNode.x/1600)*100}%`, top: `${(ENV.domainNode.y/900)*100}%`, transform: 'translate(-50%, -50%)' }} custom={0.2} variants={nodeVariants} initial="hidden" animate="visible">
                    <div className="text-4xl md:text-5xl font-black tracking-widest text-white uppercase drop-shadow-lg whitespace-nowrap mb-4">
                      {activeDomain.label}
                    </div>
                    <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
                  </motion.div>

                  {/* Skill Nodes */}
                  {coreSkills.map((skill, i) => (
                    <motion.div 
                      key={`skill-${i}`} 
                      className="absolute flex items-center gap-4" 
                      style={{ left: `${(ENV.skillsStartX/1600)*100}%`, top: `${((ENV.skillsStartY + (i * ENV.skillsGapY))/900)*100}%`, transform: 'translate(0%, -50%)' }}
                      custom={0.4 + (i * 0.1)} variants={nodeVariants} initial="hidden" animate="visible"
                    >
                      <div className="w-2 h-2 bg-zinc-500 rounded-full" />
                      <div className="text-xl md:text-2xl font-bold tracking-[0.2em] text-zinc-300 uppercase whitespace-nowrap">{skill}</div>
                    </motion.div>
                  ))}

                  {/* Project Proof Nodes */}
                  {activeProjects.map((link, i) => (
                    <motion.div 
                      key={`proj-${i}`} 
                      className="absolute flex items-center gap-4" 
                      style={{ left: `${(ENV.projectStartX/1600)*100}%`, top: `${((ENV.projectStartY + (i * ENV.projectGapY))/900)*100}%`, transform: 'translate(0%, -50%)' }}
                      custom={1 + (i * 0.2)} variants={nodeVariants} initial="hidden" animate="visible"
                    >
                      <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_15px_white]" />
                      <div className="text-sm md:text-lg font-bold tracking-[0.3em] text-cyan-400 uppercase border border-cyan-500/30 bg-cyan-900/20 px-6 py-3 backdrop-blur-sm whitespace-nowrap">
                        {link.project}
                      </div>
                    </motion.div>
                  ))}

                  {/* Special Overlay for Software (Current Focus) */}
                  {activeDomain.id === "software" && (
                    <motion.div 
                      className="absolute bottom-32 right-32 bg-cyan-900/40 border border-cyan-500 p-8 backdrop-blur-md max-w-sm"
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
                    >
                      <div className="flex items-center gap-3 text-cyan-400 mb-6">
                        <Target size={20} className="animate-pulse" />
                        <span className="text-[10px] font-bold tracking-widest uppercase">CURRENT FOCUS</span>
                      </div>
                      <div className="text-sm font-bold tracking-[0.2em] text-white uppercase leading-loose">
                        Backend Architecture <br/>
                        <span className="text-zinc-400">↓ APIs</span><br/>
                        <span className="text-zinc-400">↓ DATABASE</span><br/>
                        <span className="text-cyan-400 mt-2 block pt-4 border-t border-cyan-500/30">→ FLEXZO HR SERVICE</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* --- MOBILE VERTICAL LAYOUT --- */}
            {isMobile && (
              <div className="w-full h-full pt-48 px-8 overflow-y-auto pb-32">
                <div className="flex flex-col gap-12 border-l border-cyan-900/50 pl-6 relative">
                  <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                  
                  <motion.h2 
                    className="text-4xl font-black tracking-widest text-white uppercase"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  >
                    {activeDomain.label}
                  </motion.h2>

                  <div className="flex flex-col gap-8">
                    {coreSkills.map((skill, i) => (
                      <motion.div 
                        key={`m-skill-${i}`} 
                        className="flex flex-col gap-2 relative"
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                      >
                        <div className="absolute left-[-24px] top-3 w-4 h-[1px] bg-zinc-800" />
                        <div className="text-xl font-bold tracking-[0.2em] text-zinc-300 uppercase">{skill}</div>
                      </motion.div>
                    ))}
                  </div>

                  {activeProjects.length > 0 && (
                    <div className="pt-8 mt-8 border-t border-zinc-900">
                      <div className="text-[10px] tracking-widest text-zinc-500 uppercase mb-6">PROJECT CONNECTIONS</div>
                      <div className="flex flex-col gap-4">
                        {activeProjects.map((link, i) => (
                          <motion.div 
                            key={`m-proj-${i}`} 
                            className="bg-cyan-900/20 border border-cyan-500/30 px-4 py-3 text-cyan-400 text-xs font-bold tracking-widest uppercase flex items-center justify-between"
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + (i * 0.1) }}
                          >
                            <span>{link.project}</span>
                            <ArrowRight size={14} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeDomain.id === "software" && (
                    <div className="pt-8 mt-8 border-t border-zinc-900">
                      <div className="text-[10px] tracking-widest text-cyan-500 uppercase mb-4 flex items-center gap-2"><Target size={14} /> CURRENT FOCUS</div>
                      <div className="text-sm font-bold tracking-[0.2em] text-white uppercase">Backend → FLEXZO</div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* SKILL PASSPORT NAVIGATION */}
      <div className="absolute bottom-0 left-0 w-full z-50 bg-[#020205]/80 backdrop-blur-xl border-t border-white/5 py-4 px-4 md:px-12 flex items-center justify-between">
        
        {/* Left Controls */}
        <div className="flex items-center gap-2 md:gap-6 overflow-x-auto no-scrollbar mask-edges flex-1">
          {DOMAINS.map((domain, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={domain.id}
                onClick={() => changeDomain(i)}
                className={`relative px-4 py-3 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase whitespace-nowrap transition-colors ${isActive ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
              >
                0{i + 1} {domain.label}
                {isActive && (
                  <motion.div layoutId="passport-indicator" className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explore Projects CTA */}
        <Link href="/projects" className="hidden md:flex items-center gap-4 px-6 py-3 border border-white/20 bg-white/5 hover:bg-white text-xs font-bold tracking-[0.3em] uppercase text-white hover:text-black transition-all group ml-8">
          EXPLORE PROJECTS <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </section>
  );
}
