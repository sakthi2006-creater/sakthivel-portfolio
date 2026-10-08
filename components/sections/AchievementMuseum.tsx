"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { achievements, AchievementData } from "@/data/achievements";
import { X, Search, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Group achievements by year for the rail
const groupedAchievements = achievements.reduce((acc, curr) => {
  const year = curr.year || "ONGOING";
  if (!acc[year]) acc[year] = [];
  acc[year].push(curr);
  return acc;
}, {} as Record<string, AchievementData[]>);

export function AchievementMuseum() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeItem = achievements[activeIndex] || achievements[0];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024); // lg breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setEvidenceOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Scroll mapping
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (evidenceOpen) return;
      const totalStages = achievements.length + 1; // +1 for climax
      const index = Math.min(
        totalStages - 1,
        Math.floor(v * totalStages)
      );
      setActiveIndex(index);
    });
    return () => unsub();
  }, [scrollYProgress, evidenceOpen]);

  // Mobile rendering logic
  if (isMobile) {
    return (
      <section className="bg-[#020617] min-h-screen text-white font-mono px-6 py-24 pb-32">
        <div className="text-[10px] tracking-[0.5em] text-cyan-500 mb-4 uppercase">11 / ACHIEVEMENTS</div>
        <h2 className="text-3xl font-black tracking-widest mb-16 uppercase">MUSEUM</h2>
        
        <div className="flex flex-col gap-24">
          {achievements.map((item, index) => (
            <div key={item.id} className="flex flex-col">
              <div className="text-xs tracking-[0.4em] text-zinc-500 mb-6 border-b border-white/5 pb-2 uppercase">{item.year || "ONGOING"}</div>
              
              <div className="w-full aspect-square bg-[#0a0a0a] border border-white/10 rounded-xl flex flex-col items-center justify-center mb-8 relative overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{ background: `radial-gradient(circle at 50% 50%, ${item.color}40 0%, transparent 80%)` }} />
                <div className="text-6xl opacity-30 mb-6">{item.icon}</div>
                <div className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase px-4 py-2 bg-black/50 border border-white/5 rounded-full text-center">
                  ARCHIVE ATMOSPHERE
                </div>
              </div>

              <h3 className="text-2xl font-black tracking-widest mb-6 uppercase leading-snug">{item.title}</h3>
              
              <div className="flex flex-col gap-4 text-xs tracking-widest font-mono text-zinc-400 mb-8">
                <div>EVENT: <span className="text-zinc-200 block mt-1 leading-relaxed">{item.description}</span></div>
                {item.role && <div>ROLE: <span className="text-zinc-200 block mt-1">{item.role}</span></div>}
              </div>

              <button 
                onClick={() => { setActiveIndex(index); setEvidenceOpen(true); }}
                className="w-full py-4 border border-zinc-800 bg-black flex items-center justify-center gap-2 text-xs font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-colors"
              >
                VIEW EVIDENCE <ChevronRight size={14} />
              </button>
            </div>
          ))}
          
          <div className="mt-16 pt-16 border-t border-white/10 flex flex-col items-center text-center">
            <div className="text-5xl font-black text-cyan-400 mb-4">19</div>
            <div className="text-xs tracking-[0.3em] text-zinc-400 mb-8">CREDENTIALS</div>
            <Link href="/certificates" className="w-full py-4 border border-white/20 bg-white/5 text-xs font-bold tracking-[0.3em] uppercase flex justify-center items-center gap-2">
              CERTIFICATE VAULT <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Mobile Evidence Modal */}
        <AnimatePresence>
          {evidenceOpen && activeItem && (
            <motion.div 
              className="fixed inset-0 z-50 bg-[#050505] flex flex-col p-6 pt-24 overflow-y-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <button onClick={() => setEvidenceOpen(false)} className="absolute top-6 right-6 p-4 text-zinc-400 hover:text-white"><X /></button>
              <div className="text-[10px] tracking-[0.3em] mb-4 uppercase" style={{ color: activeItem.color }}>ACHIEVEMENT DISCOVERED</div>
              <h3 className="text-2xl font-black mb-8 uppercase leading-snug">{activeItem.title}</h3>
              
              <div className="w-full min-h-[300px] h-[50vh] relative border border-white/10 bg-black/50 flex flex-col items-center justify-center p-6 rounded-lg shadow-2xl">
                {activeItem.evidenceUrl ? (
                  <Image src={activeItem.evidenceUrl} alt="Evidence" fill sizes="100vw" className="object-contain p-6" />
                ) : (
                  <div className="flex flex-col items-center text-zinc-600">
                    <Search className="mb-4 opacity-20" size={32} />
                    <span className="text-xs font-bold tracking-[0.2em] text-center">EVIDENCE IMAGE NOT AVAILABLE</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  }

  // DESKTOP FIXED FRAME ARCHITECTURE
  const isClimax = activeIndex === achievements.length;
  const displayCount = Math.min(activeIndex + 1, achievements.length).toString().padStart(2, '0');

  // Exact transition model requested by user
  const slideTransition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] }; // 600ms spring-like ease

  return (
    <section 
      ref={containerRef}
      className="bg-[#050505] text-white relative font-mono h-[200vh]" // Reduced scroll mapping
    >
      {/* FIXED FRAME CONTAINER */}
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden" style={{ paddingLeft: "clamp(96px, 8vw, 140px)", paddingRight: "48px" }}>
        
        {/* Background Depth */}
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>

        {/* Global Header */}
        <div className="absolute top-12 left-0 w-full flex justify-between items-start z-40 pointer-events-none" style={{ paddingLeft: "clamp(96px, 8vw, 140px)", paddingRight: "48px" }}>
          <div className="flex flex-col">
            <div className="text-[10px] md:text-[11px] tracking-[0.5em] text-zinc-500 uppercase">11 / ARCHIVE</div>
            <h1 className="text-xl md:text-2xl font-black tracking-widest uppercase mt-2">ACHIEVEMENT MUSEUM</h1>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-2xl md:text-3xl font-black tracking-widest">
              {isClimax ? '07' : displayCount}
            </div>
            <div className="text-[10px] md:text-[11px] tracking-[0.4em] text-zinc-500 uppercase mt-2">
              MILESTONES
            </div>
          </div>
        </div>

        {/* CLIMAX STATE */}
        <AnimatePresence>
          {isClimax && !evidenceOpen && (
            <motion.div 
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
              style={{ paddingLeft: "clamp(96px, 8vw, 140px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div className="w-[1px] bg-white/20 mb-12 origin-top" initial={{ height: 0 }} animate={{ height: 200 }} transition={{ duration: 1, ease: "easeInOut" }} />
              <div className="text-7xl font-black tracking-widest text-white mb-6">07</div>
              <div className="text-base tracking-[0.5em] text-zinc-400 mb-16 uppercase font-sans font-bold">MILESTONES SHAPED THE JOURNEY</div>
              <motion.div className="w-[1px] bg-white/20 mt-4 mb-16 origin-top" initial={{ height: 0 }} animate={{ height: 100 }} transition={{ delay: 0.5, duration: 1 }} />
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex flex-col items-center">
                <div className="text-5xl font-black tracking-widest text-cyan-400 mb-10 uppercase drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                  19 CREDENTIALS
                </div>
                <Link href="/certificates" className="px-10 py-5 border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-all flex items-center gap-4 text-sm font-bold tracking-[0.3em] uppercase group cursor-pointer pointer-events-auto">
                  EXPLORE CERTIFICATE VAULT
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3-COLUMN FIXED FRAME GRID */}
        <div className={`w-full h-full flex items-center justify-center transition-opacity duration-700 ${evidenceOpen || isClimax ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <div className="w-full grid grid-cols-[minmax(220px,0.85fr)_minmax(460px,1.7fr)_minmax(280px,0.8fr)] gap-8 h-full max-h-[800px] pt-32 pb-16">
            
            {/* COLUMN 1: Chronological Rail */}
            <div className="flex flex-col justify-center relative border-r border-white/10 pr-6 shrink-0 h-full overflow-y-auto custom-scrollbar">
              {Object.entries(groupedAchievements).map(([year, items]) => (
                <div key={year} className="mb-12 last:mb-0">
                  <div className="text-[14px] font-bold tracking-[0.4em] text-zinc-600 mb-8 uppercase border-b border-white/5 pb-2">{year}</div>
                  <div className="flex flex-col gap-6">
                    {items.map(item => {
                      const idx = achievements.findIndex(a => a.id === item.id);
                      const isActive = idx === activeIndex;
                      const globalIdx = (idx + 1).toString().padStart(2, '0');
                      return (
                        <button 
                          key={item.id}
                          onClick={() => {
                            const totalStages = achievements.length + 1;
                            const targetScrollY = (containerRef.current?.offsetTop || 0) + ((idx / totalStages) * (containerRef.current?.offsetHeight || 0));
                            window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
                          }}
                          className={`text-left group flex items-start gap-4 transition-all duration-300 ${isActive ? "text-cyan-400 opacity-100" : "text-zinc-400 opacity-40 hover:opacity-70"}`}
                        >
                          <span className="text-[11px] tracking-widest font-bold mt-1 shrink-0">{globalIdx}</span>
                          <span className={`text-[13px] xl:text-[15px] font-bold tracking-widest uppercase leading-snug transition-transform ${isActive ? "scale-[1.02] origin-left" : ""}`}>
                            {item.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* COLUMN 2: Large Visual Stage (Center) */}
            <div className="flex flex-col items-center justify-center relative h-full">
              <AnimatePresence mode="wait">
                {activeItem && !isClimax && (
                  <motion.div
                    key={activeItem.id}
                    className="w-full h-full bg-[#0a0a0a] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group cursor-pointer flex flex-col items-center justify-center"
                    style={{ 
                      maxWidth: "760px",
                      maxHeight: "620px",
                      width: "100%",
                      aspectRatio: "4/3" 
                    }}
                    initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -24, filter: "blur(8px)" }}
                    transition={slideTransition}
                    onClick={() => setEvidenceOpen(true)}
                  >
                    {/* ARCHIVE ATMOSPHERE (Hero styling instead of empty block) */}
                    <div className="absolute inset-0 opacity-40 mix-blend-screen transition-opacity duration-700 group-hover:opacity-60" style={{ background: `radial-gradient(circle at 50% 50%, ${activeItem.color}50 0%, transparent 80%)` }} />
                    
                    {/* Visual Texture */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_25%,rgba(255,255,255,0.02)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.02)_75%,rgba(255,255,255,0.02)_100%)] bg-[size:40px_40px] opacity-20" />
                    
                    {/* Integrated Details to make it feel like real content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center pointer-events-none z-10">
                      <div className="text-8xl opacity-40 filter grayscale mix-blend-luminosity mb-10 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700">
                        {activeItem.icon}
                      </div>
                      <div className="flex flex-col items-center gap-3 bg-black/60 backdrop-blur-xl border border-white/10 px-8 py-6 rounded-lg w-3/4 max-w-sm">
                        <span className="text-[10px] tracking-[0.5em] text-zinc-400 uppercase">ARCHIVE ATMOSPHERE</span>
                        <span className="text-sm font-bold tracking-[0.2em] uppercase text-white leading-snug">{activeItem.title}</span>
                        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: activeItem.color }}>{activeItem.year || "VERIFIED"}</span>
                      </div>
                    </div>

                    <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-3 text-[11px] font-bold tracking-widest uppercase bg-white text-black px-6 py-3 border border-white z-20">
                      VIEW EVIDENCE <ChevronRight size={16} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* COLUMN 3: Story & Metadata */}
            <div className="flex flex-col justify-center pl-8 shrink-0 h-full">
              <AnimatePresence mode="wait">
                {activeItem && !isClimax && (
                  <motion.div
                    key={activeItem.id}
                    className="flex flex-col"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={slideTransition}
                  >
                    <h2 className="text-[32px] lg:text-[40px] xl:text-[48px] font-black tracking-widest uppercase mb-12 leading-tight">
                      {activeItem.title}
                    </h2>
                    
                    <div className="flex flex-col gap-10 text-[15px] xl:text-[17px] tracking-widest leading-relaxed">
                      <div className="flex flex-col gap-2">
                        <span className="text-[11px] text-zinc-600 font-bold uppercase">YEAR</span>
                        <span className="text-zinc-200">{activeItem.year || "VERIFIED"}</span>
                      </div>
                      {activeItem.date && (
                        <div className="flex flex-col gap-2">
                          <span className="text-[11px] text-zinc-600 font-bold uppercase">DATE</span>
                          <span className="text-zinc-200">{activeItem.date}</span>
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                        <span className="text-[11px] text-zinc-600 font-bold uppercase">EVENT</span>
                        <span className="text-zinc-200">{activeItem.description}</span>
                      </div>
                      {activeItem.role && (
                        <div className="flex flex-col gap-2">
                          <span className="text-[11px] text-zinc-600 font-bold uppercase">ROLE</span>
                          <span className="text-zinc-200">{activeItem.role}</span>
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={() => setEvidenceOpen(true)}
                      className="mt-16 px-8 py-5 border border-zinc-700 hover:border-cyan-400 transition-colors bg-black flex items-center justify-between text-[11px] font-bold tracking-[0.3em] uppercase group"
                    >
                      VIEW EVIDENCE
                      <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform text-cyan-400" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      {/* CURTAIN EVIDENCE REVEAL */}
      <AnimatePresence>
        {evidenceOpen && activeItem && (
          <motion.div 
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]/95 backdrop-blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button 
              onClick={() => setEvidenceOpen(false)}
              className="absolute top-12 right-12 z-50 px-8 py-4 border border-white/20 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-colors"
            >
              [ CLOSE DISCOVERY ]
            </button>

            <motion.div 
              className="w-full max-w-7xl h-[85vh] flex flex-col md:flex-row relative border border-white/10 bg-black shadow-2xl overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 200, delay: 0.1 }}
            >
              <div className="w-full md:w-[400px] p-12 flex flex-col justify-center border-r border-white/10 bg-[#080808] shrink-0">
                <div className="text-[11px] tracking-[0.4em] font-bold uppercase mb-8" style={{ color: activeItem.color }}>
                  ACHIEVEMENT DISCOVERED
                </div>
                <h3 className="text-4xl lg:text-[42px] font-black tracking-widest text-white uppercase mb-12 leading-tight">
                  {activeItem.title}
                </h3>
                <div className="flex flex-col gap-8 text-[15px] tracking-widest font-mono">
                  {activeItem.year && (
                    <div className="text-zinc-600 font-bold text-[11px]">YEAR <br/><span className="text-white mt-3 block text-[15px] font-normal">{activeItem.year}</span></div>
                  )}
                  <div className="text-zinc-600 font-bold text-[11px]">EVENT <br/><span className="text-white mt-3 block text-[15px] font-normal leading-relaxed">{activeItem.description}</span></div>
                  {activeItem.role && (
                    <div className="text-zinc-600 font-bold text-[11px]">ROLE <br/><span className="text-white mt-3 block text-[15px] font-normal">{activeItem.role}</span></div>
                  )}
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-12 bg-[#020202] relative">
                <div className="absolute top-10 left-10 text-[11px] font-bold tracking-[0.4em] text-zinc-600 uppercase">
                  VERIFIED EVIDENCE
                </div>
                
                {activeItem.evidenceUrl ? (
                  <div className="relative w-full h-full max-h-[70vh] mt-16">
                    <Image src={activeItem.evidenceUrl} alt="Evidence" fill sizes="50vw" className="object-contain shadow-2xl" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 bg-white/[0.02] w-full max-w-2xl aspect-video rounded-xl">
                    <Search className="mb-6 opacity-20" size={48} />
                    <div className="text-[13px] font-mono tracking-[0.3em] font-bold text-zinc-600 uppercase">
                      EVIDENCE IMAGE NOT AVAILABLE
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
