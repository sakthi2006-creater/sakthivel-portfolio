"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import { globalRoutes } from "@/config/routes";
import {
  Home,
  UserRound,
  Layers3,
  BriefcaseBusiness,
  Microscope,
  Trophy,
  BadgeCheck,
  Terminal,
  Mail,
  Cpu,
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  home: Home,
  about: UserRound,
  projects: Layers3,
  experience: BriefcaseBusiness,
  research: Microscope,
  achievements: Trophy,
  certificates: BadgeCheck,
  skills: Terminal,
  contact: Mail,
};

// Math helpers
const getDesktopPosition = (index: number, total: number, radius = 240) => {
  const startAngle = -75;
  const endAngle = 75;
  const angle = startAngle + (index / (total - 1)) * (endAngle - startAngle);
  const rad = (angle * Math.PI) / 180;
  return {
    x: -Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
};

const getMobilePosition = (index: number, total: number, radius = 160) => {
  const startAngle = 180;
  const endAngle = 270;
  const angle = startAngle + (index / (total - 1)) * (endAngle - startAngle);
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
};

export function CommandDock() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Core rotation based on mouse proximity
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Relative to the center of the viewport or wrapper
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    setHoveredRoute(null);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Positions
  const total = globalRoutes.length;
  const getPos = isMobile ? getMobilePosition : getDesktopPosition;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={handleMouseLeave}
      className={`fixed z-[100] flex items-center justify-center ${
        isMobile
          ? "bottom-10 right-6 w-32 h-32"
          : "top-1/2 right-12 -translate-y-1/2 w-64 h-[600px]"
      }`}
    >
      {/* Invisible trigger zone to keep expansion active */}
      <div className="absolute inset-0 bg-transparent z-0" />

      {/* Connection Lines Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: "visible" }}>
        {isExpanded && globalRoutes.map((route, idx) => {
          const pos = getPos(idx, total);
          const isActive = route.path === "/" ? pathname === "/" : pathname?.startsWith(route.path);
          
          return (
            <motion.line
              key={`line-${route.id}`}
              x1="0"
              y1="0"
              x2={pos.x}
              y2={pos.y}
              stroke={isActive ? "rgba(34,211,238,0.4)" : "rgba(255,255,255,0.05)"}
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.05, ease: "easeOut" }}
              // Position relative to the center of the wrapper
              style={{ transform: "translate(50%, 50%)" }}
            />
          );
        })}
      </svg>

      {/* Orbital Nodes */}
      <AnimatePresence>
        {isExpanded && globalRoutes.map((route, idx) => {
          const pos = getPos(idx, total);
          const isActive = route.path === "/" ? pathname === "/" : pathname?.startsWith(route.path);
          const isHovered = hoveredRoute === route.id;
          const IconComponent = ICON_MAP[route.id];

          return (
            <motion.div
              key={route.id}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{ x: pos.x, y: pos.y, opacity: 1, scale: 1 }}
              exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.04, type: "spring", stiffness: 200, damping: 20 }}
              className="absolute z-20"
              style={{ top: '50%', left: '50%', margin: '-16px 0 0 -16px' }}
            >
              <motion.div
                onMouseEnter={() => setHoveredRoute(route.id)}
                whileHover={{ scale: 1.12, x: isMobile ? -3 : 5 }}
                className="relative flex items-center"
              >
                {/* Node Label (Only on Hover) */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, x: isMobile ? -10 : -16, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: 5, filter: "blur(4px)" }}
                      className="absolute right-full whitespace-nowrap flex flex-col items-end pointer-events-none"
                    >
                      <span className="text-[9px] font-mono tracking-[0.3em] text-cyan-400/70 mb-[2px]">
                        {route.index}
                      </span>
                      <span className="text-xs font-bold tracking-[0.2em] text-white uppercase shadow-black drop-shadow-md">
                        {route.label}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Node Orb */}
                <Link
                  href={route.path}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 backdrop-blur-md outline-none ${
                    isActive 
                      ? "bg-cyan-900/40 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.4)]" 
                      : isHovered 
                        ? "bg-white/10 border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                        : "bg-black/40 border-white/10"
                  }`}
                  aria-label={route.label}
                >
                  {IconComponent && (
                    <IconComponent
                      size={14}
                      className={`transition-colors duration-300 ${isActive ? "text-cyan-300" : isHovered ? "text-white" : "text-white/40"}`}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="active-orbital-indicator"
                      className="absolute inset-0 rounded-full border border-cyan-300"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Central Command Core */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="absolute z-30 pointer-events-none flex items-center justify-center"
      >
        <motion.div
          animate={{
            boxShadow: isExpanded 
              ? "0 0 40px rgba(34,211,238,0.3), inset 0 0 20px rgba(34,211,238,0.2)"
              : "0 0 15px rgba(34,211,238,0.1), inset 0 0 10px rgba(34,211,238,0.1)",
            scale: isExpanded ? 1.05 : 1
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-14 h-14 rounded-full bg-[#020617]/80 backdrop-blur-xl border border-cyan-900/50 flex items-center justify-center relative overflow-hidden"
        >
          {/* Subtle spinning rings */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-cyan-400/20 opacity-50"
          />
          <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border border-cyan-400/10 opacity-30"
          />
          
          <Cpu size={20} className={`transition-colors duration-700 ${isExpanded ? "text-cyan-300" : "text-cyan-500/50"}`} />
          
          {/* Inner pulse */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-4 bg-cyan-500/20 rounded-full blur-md"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
