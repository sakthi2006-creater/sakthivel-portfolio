"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { achievements, AchievementData } from "@/data/achievements";
import { X, Search } from "lucide-react";

// --- Evidence Modal (V3) ---
function EvidenceModal({ item, onClose }: { item: AchievementData; onClose: () => void }) {
  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-transparent" // transparent because galaxy behind is faded
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-black/80 backdrop-blur-3xl border border-white/10 rounded-2xl flex flex-col md:flex-row relative mt-24"
        initial={{ scale: 0.95, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300, delay: 0.2 }} // Wait slightly for node to reach center
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors hover:bg-white/10"
        >
          <X size={20} />
        </button>

        {/* Info Panel */}
        <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col border-b md:border-b-0 md:border-r border-white/10">
          <div className="text-[10px] tracking-[0.3em] mb-8 uppercase" style={{ color: item.color }}>
            ACHIEVEMENT DISCOVERED
          </div>
          
          <h3 className="text-2xl font-black text-white tracking-widest mb-8 uppercase">
            {item.title}
          </h3>
          
          <div className="flex flex-col gap-6 font-mono text-xs tracking-widest">
            {item.year && (
              <div className="flex flex-col gap-1">
                <span className="text-zinc-500 uppercase">YEAR</span>
                <span className="text-zinc-200">{item.year}</span>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 uppercase">EVENT</span>
              <span className="text-zinc-200">{item.description}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 uppercase">ROLE</span>
              <span className="text-zinc-200">{item.role}</span>
            </div>
          </div>
        </div>

        {/* Evidence Panel */}
        <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col items-center justify-center bg-black/50 min-h-[300px]">
          <div className="text-[10px] tracking-[0.3em] text-zinc-500 mb-8 uppercase w-full text-left">
            EVIDENCE
          </div>
          
          {item.evidenceUrl ? (
            <motion.img 
              src={item.evidenceUrl} 
              alt={item.title}
              className="max-w-full max-h-[50vh] object-contain rounded-lg border border-white/10 shadow-2xl"
              initial={{ opacity: 0, filter: "blur(12px)", scale: 0.92 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          ) : (
            <motion.div 
              className="w-full h-full min-h-[200px] flex flex-col items-center justify-center border border-dashed border-white/10 rounded-lg text-zinc-600 bg-white/[0.02]"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Search className="mb-4 opacity-20" size={32} />
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-center px-4">
                EVIDENCE IMAGE NOT AVAILABLE
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Mobile List (V3) ---
function MobileAchievementList({ items, onDiscover }: { items: AchievementData[], onDiscover: (item: AchievementData) => void }) {
  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-6 py-32 font-mono">
      <div className="text-[10px] tracking-[0.5em] text-cyan-500 mb-4 uppercase">11 / ACHIEVEMENTS</div>
      <h2 className="text-4xl font-black text-white tracking-widest mb-16 uppercase">7 MILESTONES</h2>
      
      <div className="flex flex-col relative border-l border-white/10 ml-4">
        {items.map((item, i) => (
          <motion.div 
            key={item.id}
            className="relative pl-8 mb-16"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div 
              className="absolute left-0 top-1 -translate-x-1/2 w-3 h-3 rounded-full border border-black bg-zinc-800"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex flex-col">
              <div className="text-[10px] tracking-widest text-zinc-500 mb-2 uppercase">
                {item.year || "VERIFIED"}
              </div>
              <h3 className="text-xl font-bold text-white tracking-widest mb-2 uppercase">
                {item.title}
              </h3>
              <p className="text-xs tracking-wider text-zinc-400 leading-relaxed mb-6">
                {item.description}
              </p>
              <button
                onClick={() => onDiscover(item)}
                className="self-start text-[10px] tracking-[0.2em] px-4 py-2 border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-colors uppercase flex items-center gap-2"
              >
                <span>[ DISCOVER ]</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- Counter Sync Component ---
function GalaxyCounter({ progress, total }: { progress: number, total: number }) {
  // Sync counter to galaxy reveal progress (0 to 1)
  const count = Math.min(total, Math.floor(progress * (total + 1)));
  
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-black text-white tracking-widest mb-2 font-mono">
        {count.toString().padStart(2, '0')}
      </div>
      <div className="text-[10px] tracking-[0.5em] text-cyan-400 uppercase">
        MILESTONES
      </div>
    </div>
  );
}

// --- Main Desktop Galaxy V3 ---
export function AchievementOrbit() {
  const [activeItem, setActiveItem] = useState<AchievementData | null>(null);
  const [hoveredItem, setHoveredItem] = useState<AchievementData | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 100, mass: 1 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 100, mass: 1 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveItem(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 2;
    const y = (clientY / window.innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scene Progressions
  const galaxyReveal = useTransform(scrollYProgress, [0, 0.4], [0, 1]); // Master reveal variable
  const galaxyOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const galaxyScale = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1]);
  const climaxOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);
  
  // Parallax mappings
  const bgX = useTransform(smoothX, [-1, 1], [-4, 4]);
  const bgY = useTransform(smoothY, [-1, 1], [-4, 4]);
  const orbitX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const orbitY = useTransform(smoothY, [-1, 1], [-10, 10]);

  // Use state to track galaxy reveal for counter so we can use it in render
  const [revealAmount, setRevealAmount] = useState(0);
  useEffect(() => {
    const unsub = galaxyReveal.on("change", (v) => setRevealAmount(v));
    return () => unsub();
  }, [galaxyReveal]);

  if (isMobile) {
    return (
      <section className="bg-[#020617] min-h-screen">
        <MobileAchievementList items={achievements} onDiscover={setActiveItem} />
        <AnimatePresence>
          {activeItem && <EvidenceModal item={activeItem} onClose={() => setActiveItem(null)} />}
        </AnimatePresence>
      </section>
    );
  }

  // Calculate coordinates for nodes early to manage stateful positions
  const nodes = achievements.map((item, index) => {
    const angle = (index / achievements.length) * Math.PI * 2;
    const isMajor = item.level === "MAJOR";
    const radiusX = isMajor ? 400 : 250;
    const radiusY = isMajor ? 280 : 160;
    
    // Shift secondary nodes slightly to avoid perfect circle look and add depth
    const offsetX = isMajor ? 0 : Math.cos(angle * 2) * 30;
    const offsetY = isMajor ? 0 : Math.sin(angle * 2) * 20;

    const baseX = `calc(50% + ${Math.cos(angle) * radiusX + offsetX}px)`;
    const baseY = `calc(50% + ${Math.sin(angle) * radiusY + offsetY}px)`;
    
    const isVisible = revealAmount > (index / achievements.length) * 0.8;

    return { ...item, baseX, baseY, isMajor, isVisible };
  });

  return (
    <section 
      ref={containerRef} 
      className="relative h-[300vh] bg-[#020617] text-white" 
      id="achievements"
      onMouseMove={handleMouseMove}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center perspective-[2000px]">
        
        {/* Layer 1: Background Parallax Stars */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ x: bgX, y: bgY, opacity: galaxyOpacity }}
        >
          {/* Back: Very faint tiny stars */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          {/* Mid: Occasional brighter particles */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1.5px,transparent_1.5px)] bg-[size:150px_150px] rotate-12" />
        </motion.div>

        {/* Top Sequence Info */}
        <motion.div 
          className="absolute top-12 left-12 flex flex-col gap-2 z-40 pointer-events-none"
          style={{ opacity: galaxyOpacity }}
        >
          <div className="text-[10px] tracking-[0.5em] text-cyan-500 uppercase">11 / ACHIEVEMENTS</div>
          <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase">THE MOMENTS THAT SHAPED THE JOURNEY</div>
        </motion.div>

        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center transform-gpu"
          style={{ opacity: galaxyOpacity, scale: galaxyScale }}
        >
          
          {/* Layer 2: Orbit Ring System & Nodes */}
          <motion.div 
            className="relative w-full h-[800px] flex items-center justify-center transform-style-3d"
            style={{ x: orbitX, y: orbitY }}
          >
            {/* Massive Center Anchor */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-10 transition-opacity duration-1000"
              style={{ opacity: activeItem ? 0.05 : 1 }}
            >
              {/* V3: Massive SAKTHIVEL R. */}
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-[0.2em] uppercase text-center w-[600px] drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                SAKTHIVEL R.
              </h1>
              
              {/* Animated Counter Syncing with Nodes */}
              <div className="mt-8">
                <GalaxyCounter progress={revealAmount} total={achievements.length} />
              </div>
            </motion.div>

            {/* Orbit Rings (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ transform: "rotateX(50deg)" }}>
              {/* Major Orbit Ring */}
              <ellipse 
                cx="50%" cy="50%" rx="400" ry="280" 
                fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 8" 
              />
              {/* Secondary Orbit Ring */}
              <ellipse 
                cx="50%" cy="50%" rx="250" ry="160" 
                fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" 
              />
              
              {/* Constellation Lines */}
              <motion.g opacity={revealAmount > 0.8 ? 1 : 0} style={{ transition: "opacity 2s ease" }}>
                {/* Connecting a few random nodes visually for galaxy feel */}
                <path d="M 50% 50% L calc(50% + 400px) calc(50% + 0px)" stroke="rgba(34,211,238,0.1)" strokeWidth="0.5" />
                <path d="M 50% 50% L calc(50% - 250px) calc(50% + 160px)" stroke="rgba(139,92,255,0.1)" strokeWidth="0.5" />
              </motion.g>
            </svg>

            {/* Orbiting Nodes */}
            <div className="absolute inset-0 z-20" style={{ transform: "rotateX(50deg)", transformStyle: "preserve-3d" }}>
              {nodes.map((node, index) => {
                const isActive = activeItem?.id === node.id;
                const isHovered = hoveredItem?.id === node.id;
                const someoneElseActive = activeItem !== null && !isActive;
                
                // If active, move to center (50%, 50%), else follow orbit path
                const currentLeft = isActive ? "50%" : node.baseX;
                const currentTop = isActive ? "50%" : node.baseY;

                return (
                  <motion.div
                    key={node.id}
                    className="absolute cursor-crosshair group flex flex-col items-center justify-center transform-style-3d"
                    style={{
                      left: currentLeft,
                      top: currentTop,
                      // We must translate -50%, -50% to center the node exactly on the coordinate
                      // and counter-rotate so it faces the screen instead of lying flat on the orbit plane
                      transform: `translate(-50%, -50%) rotateX(-50deg)`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: someoneElseActive ? 0 : (node.isVisible ? 1 : 0),
                      scale: isActive ? 2 : (node.isVisible ? 1 : 0),
                      // Slow bobbing effect (disabled when active)
                      y: isActive ? 0 : ["0px", "-15px", "0px"]
                    }}
                    transition={{
                      y: { duration: 6 + (index % 4), repeat: Infinity, ease: "easeInOut" },
                      opacity: { duration: 0.8, ease: "easeOut" },
                      scale: { duration: 0.8, type: "spring", bounce: 0.2 },
                      // Node movement to center transition
                      left: { duration: 0.8, type: "spring", bounce: 0.2 },
                      top: { duration: 0.8, type: "spring", bounce: 0.2 }
                    }}
                    onMouseEnter={() => !activeItem && setHoveredItem(node)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => {
                      if (!activeItem) setActiveItem(node);
                    }}
                  >
                    {/* Node Icon */}
                    <div 
                      className={`relative rounded-full border bg-black/80 flex items-center justify-center backdrop-blur-md transition-all duration-700
                        ${node.isMajor ? "w-16 h-16 text-2xl" : "w-10 h-10 text-lg"}
                        ${isHovered ? "border-white shadow-[0_0_30px_rgba(255,255,255,0.15)] scale-110" : "border-white/10"}
                        ${isActive ? "border-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.3)]" : ""}
                      `}
                      style={{ borderColor: isHovered || isActive ? node.color : undefined }}
                    >
                      {node.icon}
                    </div>

                    {/* Permanent Label (Underneath) */}
                    {!isActive && (
                      <div className="absolute top-full mt-4 text-[9px] md:text-[10px] font-mono tracking-widest text-zinc-400 uppercase whitespace-nowrap opacity-70 group-hover:opacity-10 transition-opacity">
                        {node.title}
                      </div>
                    )}

                    {/* Spatial Hover Extension Line & Metadata */}
                    <AnimatePresence>
                      {isHovered && !activeItem && (
                        <motion.div 
                          className="absolute left-full top-1/2 -translate-y-1/2 flex items-center pointer-events-none"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 250 }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div 
                            className="h-[1px] bg-white/30 mr-4"
                            initial={{ width: 0 }}
                            animate={{ width: 60 }}
                            transition={{ duration: 0.3 }}
                          />
                          <motion.div 
                            className="flex flex-col whitespace-nowrap"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <span className="text-xs font-black tracking-[0.2em] text-white uppercase">{node.title}</span>
                            <span className="text-[10px] tracking-widest text-zinc-500 font-mono mt-1 uppercase" style={{ color: node.color }}>
                              {node.year || "VERIFIED MILESTONE"}
                            </span>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Layer 3: Climax Transition (At bottom of scroll) */}
        <motion.div 
          className="absolute inset-0 bg-black flex flex-col items-center justify-center pointer-events-none z-50"
          style={{ opacity: climaxOpacity }}
        >
          <div className="text-[10px] tracking-[0.5em] text-cyan-500 mb-8 uppercase">JOURNEY COMPLETE</div>
          <div className="text-4xl md:text-6xl font-black text-white tracking-widest uppercase mb-12 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            CREDENTIAL VAULT
          </div>
          <div className="px-8 py-4 border border-white/20 bg-white/5 text-xs font-mono tracking-widest text-zinc-300 uppercase">
            SCROLL DOWN TO ENTER
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeItem && <EvidenceModal item={activeItem} onClose={() => { setActiveItem(null); setHoveredItem(null); }} />}
      </AnimatePresence>

    </section>
  );
}
