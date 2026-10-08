"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certifications } from "@/data/certificates";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { VaultIntro } from "./certificates/VaultIntro";
import { CertificateCard } from "./certificates/CertificateCard";
import { CertificateViewerModal } from "./certificates/CertificateViewerModal";

const categories = ["ALL", ...Array.from(new Set(certifications.map(c => c.category || "GENERAL")))];

export function CertificateVault() {
  const [vaultOpen, setVaultOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [direction, setDirection] = useState(1);

  const filteredCerts = useMemo(() => {
    if (activeFilter === "ALL") return certifications;
    return certifications.filter(c => (c.category || "GENERAL") === activeFilter);
  }, [activeFilter]);

  const activeCert = filteredCerts[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === filteredCerts.length - 1;

  const handleFilterChange = (cat: string) => {
    setActiveFilter(cat);
    setActiveIndex(0);
    setDirection(1);
  };

  const handleNext = () => {
    if (!isLast) {
      setDirection(1);
      setActiveIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      setDirection(-1);
      setActiveIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    if (!vaultOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewerOpen) {
        if (e.key === "Escape") setViewerOpen(false);
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        return;
      }
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [vaultOpen, viewerOpen, activeIndex, filteredCerts.length]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0, scale: 0.8, z: -200 }),
    center: { z: 0, x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ z: -200, x: dir < 0 ? 100 : -100, opacity: 0, scale: 0.8 })
  };

  return (
    <section className="relative min-h-[100svh] bg-[#020202] text-white flex flex-col font-mono overflow-hidden" id="certificates">
      
      {/* 1. VAULT INTRO */}
      <AnimatePresence>
        {!vaultOpen && (
          <VaultIntro onEnter={() => setVaultOpen(true)} count={certifications.length} />
        )}
      </AnimatePresence>

      {/* 2. MAIN VAULT ARCHIVE */}
      <AnimatePresence>
        {vaultOpen && (
          <motion.div 
            className="absolute inset-0 z-40 flex flex-col pt-12 lg:pt-6 pb-8 px-4 md:px-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row flex-1 w-full max-w-[1600px] mx-auto gap-8 lg:gap-16">
              
              {/* LEFT: Navigation / Indicators */}
              <div className="hidden lg:flex flex-col justify-between w-24 shrink-0 py-8">
                <div className="text-xl font-black tracking-widest text-white">
                  {(activeIndex + 1).toString().padStart(2, '0')}
                  <span className="text-zinc-600 block text-xs mt-2">/ {filteredCerts.length.toString().padStart(2, '0')}</span>
                </div>

                <div className="flex flex-col gap-4">
                  <button onClick={handlePrev} disabled={isFirst} className={`p-4 border border-zinc-800 rounded-full transition-all flex items-center justify-center ${isFirst ? 'opacity-20' : 'hover:bg-white/5 hover:border-white/20'}`}>
                    <ArrowLeft size={20} />
                  </button>
                  <button onClick={handleNext} disabled={isLast} className={`p-4 border border-zinc-800 rounded-full transition-all flex items-center justify-center ${isLast ? 'opacity-20' : 'hover:bg-white/5 hover:border-white/20'}`}>
                    <ArrowRight size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-2 items-center">
                  {filteredCerts.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => { setDirection(idx > activeIndex ? 1 : -1); setActiveIndex(idx); }}
                      className={`w-2 rounded-full transition-all ${idx === activeIndex ? 'h-8 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'h-2 bg-zinc-800 hover:bg-zinc-600'}`}
                    />
                  ))}
                </div>
              </div>

              {/* CENTER: Main Certificate Presentation */}
              <div className="flex-1 flex flex-col items-center justify-center relative min-h-[50vh] lg:min-h-0">
                <AnimatePresence custom={direction} mode="wait">
                  {activeCert && (
                    <motion.div
                      key={activeCert.name}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <CertificateCard 
                        imageSrc={activeCert.image} 
                        title={activeCert.name}
                        onClick={() => setViewerOpen(true)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* RIGHT: Metadata Panel */}
              <div className="w-full lg:w-[350px] shrink-0 flex flex-col justify-center gap-10">
                <AnimatePresence mode="wait">
                  {activeCert && (
                    <motion.div
                      key={`meta-${activeCert.name}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col gap-10"
                    >
                      <div className="flex flex-col gap-3">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase border-l-2 border-zinc-800 pl-4">INSTITUTION</span>
                        <span className="text-xl font-bold tracking-widest text-white uppercase pl-4">{activeCert.issuer}</span>
                      </div>

                      <div className="flex flex-col gap-3">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase border-l-2 border-zinc-800 pl-4">CATEGORY</span>
                        <div className="pl-4">
                          <span className="text-xs tracking-widest font-bold uppercase px-4 py-2 rounded-full border border-white/10" style={{ color: activeCert.color || "#22d3ee", backgroundColor: `${activeCert.color || "#22d3ee"}10` }}>
                            {activeCert.category || "GENERAL"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-cyan-500 uppercase border-l-2 border-cyan-500/50 pl-4">CERTIFICATION TITLE</span>
                        <h3 className="text-2xl md:text-3xl font-black tracking-widest text-white uppercase pl-4 leading-snug">
                          {activeCert.name}
                        </h3>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mobile Navigation */}
                <div className="flex lg:hidden items-center justify-between mt-8 border-t border-zinc-800 pt-6">
                  <div className="text-sm font-black tracking-widest text-white">
                    {(activeIndex + 1).toString().padStart(2, '0')} <span className="text-zinc-600 text-xs">/ {filteredCerts.length.toString().padStart(2, '0')}</span>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={handlePrev} disabled={isFirst} className={`p-3 border border-zinc-800 rounded-full ${isFirst ? 'opacity-20' : 'hover:bg-white/5'}`}>
                      <ArrowLeft size={16} />
                    </button>
                    <button onClick={handleNext} disabled={isLast} className={`p-3 border border-zinc-800 rounded-full ${isLast ? 'opacity-20' : 'hover:bg-white/5'}`}>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Category Filter */}
            <div className="relative z-10 mt-auto pt-8 flex items-center justify-center lg:justify-start gap-2 overflow-x-auto custom-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleFilterChange(cat)}
                  className={`px-6 py-3 text-[10px] font-bold tracking-[0.4em] uppercase whitespace-nowrap transition-all border ${activeFilter === cat ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-transparent text-zinc-500 border-zinc-800 hover:text-white hover:border-zinc-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. FULLSCREEN VIEWER MODAL */}
      <CertificateViewerModal 
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        imageSrc={activeCert?.image || ""}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={!isLast}
        hasPrev={!isFirst}
      />
      
    </section>
  );
}
