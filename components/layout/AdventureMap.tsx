"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STAGES = [
  { id: "hero", label: "01 ─ ENTRY" },
  { id: "profile", label: "02 ─ IDENTITY" },
  { id: "skills", label: "03 ─ ENGINEERING DNA" },
  { id: "academic", label: "04 ─ ACADEMIC FOUNDATION" },
  { id: "experience", label: "05 ─ PROFESSIONAL JOURNEY" },
  { id: "live-now", label: "06 ─ LIVE NOW" },
  { id: "projects", label: "07 ─ PROJECT UNIVERSE" },
  { id: "archive", label: "08 ─ PROJECT ARCHIVE" },
  { id: "how-i-build", label: "09 ─ BUILD PHILOSOPHY" },
  { id: "research", label: "10 ─ RESEARCH LAB" },
  { id: "achievements", label: "11 ─ ACHIEVEMENTS" },
  { id: "certificates", label: "12 ─ CREDENTIAL VAULT" },
  { id: "future", label: "13 ─ FUTURE VISION" },
  { id: "contact", label: "14 ─ CONTACT" }
];

export function AdventureMap() {
  const [activeId, setActiveId] = useState("hero");

  const scrollTo = (id: string) => {
    if (id === "hero") {
      sessionStorage.removeItem("portfolio-entered");
      window.location.reload();
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {STAGES.map((stage, index) => {
        const isActive = activeId === stage.id;
        return (
          <button
            key={stage.id}
            onClick={() => scrollTo(stage.id)}
            className={`flex items-center gap-4 group transition-all duration-500 relative py-1 ${
              isActive ? "opacity-100 scale-100" : "opacity-30 hover:opacity-100 scale-95"
            }`}
          >
            <div 
              className={`text-[9px] font-mono tracking-[0.3em] whitespace-nowrap transition-all duration-500 ${
                isActive ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "text-white/50"
              }`}
            >
              {stage.label}
            </div>

            {/* Connecting line to the next item */}
            {index < STAGES.length - 1 && (
              <div className="absolute top-[50%] left-[32px] w-[1px] h-[24px] bg-white/20 translate-y-2 pointer-events-none" />
            )}
          </button>
        );
      })}
    </div>
  );
}
