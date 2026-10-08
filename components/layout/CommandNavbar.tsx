"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useScroll, 
  useTransform,
  useReducedMotion,
  useSpring
} from "framer-motion";
import { globalRoutes } from "@/config/routes";
import { Sparkles, Menu, X, ChevronDown } from "lucide-react";

// --- Custom Magnetic Nav Item Component ---
const NavItem = ({ 
  route, 
  isActive, 
  prefersReducedMotion,
  onClick
}: { 
  route: any; 
  isActive: boolean; 
  prefersReducedMotion: boolean | null;
  onClick: () => void;
}) => {
  const itemRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Magnetic values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Very subtle magnetic pull (max 4px)
    x.set(distanceX * 0.15);
    y.set(distanceY * 0.15);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (prefersReducedMotion) {
      onClick();
      return;
    }
    
    // Command Executed Effect
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 400);

    // Generate 3-5 random particles
    const rect = itemRef.current?.getBoundingClientRect();
    if (rect) {
      const newParticles = Array.from({ length: Math.floor(Math.random() * 3) + 3 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 30, // Random distance -15px to 15px
        y: (Math.random() - 0.5) * 30,
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 500);
    }
    
    onClick();
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <Link
        href={route.path}
        ref={itemRef}
        onClick={handleClick}
        className="relative group px-4 py-2 outline-none flex items-center justify-center h-10"
      >
        {/* Click Pulse Ripple */}
        <AnimatePresence>
          {isClicked && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 bg-cyan-400/30 rounded-full blur-sm pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Micro Particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{ x: p.x, y: p.y, scale: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-300 rounded-full pointer-events-none shadow-[0_0_5px_#00dcff]"
            />
          ))}
        </AnimatePresence>

        <motion.span 
          animate={{ 
            y: isHovered && !prefersReducedMotion ? -2 : 0,
            scale: isClicked ? 1.08 : isHovered ? 1.03 : 1
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`relative z-10 text-xs font-bold tracking-widest transition-colors duration-300 uppercase ${
            isActive 
              ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" 
              : "text-white/60 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          }`}
        >
          {route.label}
        </motion.span>
        
        {/* Active Indicator & Background */}
        {isActive && (
          <>
            <motion.div
              layoutId="desktop-nav-active-pill"
              className="absolute inset-0 rounded-full border border-cyan-400/20"
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            >
              {/* Soft Active Breathing */}
              {!prefersReducedMotion && (
                <motion.div 
                  animate={{ opacity: [0.15, 0.25, 0.15] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-cyan-900/40 rounded-full"
                />
              )}
            </motion.div>
            
            <motion.div
              layoutId="desktop-nav-active-line"
              className="absolute bottom-1 left-4 right-4 h-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            >
              {!prefersReducedMotion && (
                <motion.div 
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-full bg-white blur-[1px]"
                />
              )}
            </motion.div>
          </>
        )}

        {/* Hover Radial Light */}
        <AnimatePresence>
          {isHovered && !prefersReducedMotion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15),transparent_70%)]"
            />
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  );
};

export function CommandNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [cmdClicked, setCmdClicked] = useState(false);
  
  const navRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Scroll-based styles for the glass background
  const bgOpacity = useTransform(scrollY, [0, 100], [0.5, 0.85]);
  const blurAmount = useTransform(scrollY, [0, 100], [12, 28]);
  const borderColor = useTransform(
    scrollY, 
    [0, 100], 
    ["rgba(255,255,255,0.05)", "rgba(255,255,255,0.15)"]
  );
  const shadowIntensity = useTransform(
    scrollY,
    [0, 100],
    ["0 4px 30px rgba(0,0,0,0.3)", "0 10px 50px rgba(0,0,0,0.8)"]
  );

  const mainRoutes = globalRoutes.slice(0, 6);
  const moreRoutes = globalRoutes.slice(6);

  const currentRoute = globalRoutes.find(route => 
    route.path === "/" ? pathname === "/" : pathname?.startsWith(route.path)
  ) || globalRoutes[0];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
  }, [pathname]);

  // Click outside & Escape key logic for menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMoreMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };

    if (moreMenuOpen || mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [moreMenuOpen, mobileMenuOpen]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const handleCommandClick = () => {
    setCmdClicked(true);
    setTimeout(() => setCmdClicked(false), 300);
    router.push("/");
  };

  // --- DESKTOP RENDER ---
  if (!isMobile) {
    return (
      <div className="fixed top-6 right-7 z-[100]">
        {/* Animated Entrance Wrapper */}
        <motion.div
          initial={{ y: -18, x: 12, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <motion.div
            ref={navRef}
            onMouseMove={handleMouseMove}
            style={{
              backgroundColor: useTransform(bgOpacity, v => `rgba(5, 8, 15, ${v})`),
              backdropFilter: useTransform(blurAmount, v => `blur(${v}px) saturate(140%)`),
              borderColor,
              boxShadow: shadowIntensity
            }}
            className="relative flex items-center h-14 rounded-full px-4 py-2 border overflow-visible transition-colors duration-500"
          >
            {/* Very Slow Living Glass Sweep */}
            {!prefersReducedMotion && (
              <motion.div 
                className="absolute top-0 left-0 h-[1px] w-[30%] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Global Cursor Proximity Radial Glow */}
            {!prefersReducedMotion && (
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(100px circle at calc(${mouseX}px) calc(${mouseY}px), rgba(0, 220, 255, 0.12), transparent 100%)`,
                }}
              />
            )}

            {/* Left AI Command Mark */}
            <motion.div 
              initial={{ scale: 0, opacity: 0, rotate: -45 }}
              animate={{ scale: cmdClicked ? 0.9 : 1, opacity: 1, rotate: cmdClicked ? 0 : 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.12, rotate: 8, boxShadow: "0 0 20px rgba(34,211,238,0.5)" }}
              onClick={handleCommandClick}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 mr-4 shadow-[0_0_10px_rgba(34,211,238,0.1)] relative cursor-pointer group"
            >
              <Sparkles size={14} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              
              {/* Click Ripple */}
              <AnimatePresence>
                {cmdClicked && (
                  <motion.div
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 rounded-full border border-cyan-400"
                  />
                )}
              </AnimatePresence>

              {/* Breathing Idle Animation */}
              {!prefersReducedMotion && (
                <motion.div 
                  animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md pointer-events-none"
                />
              )}
            </motion.div>

            {/* Main Navigation Links */}
            <div className="flex items-center gap-1">
              {mainRoutes.map((route, idx) => (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05, duration: 0.5 }}
                >
                  <NavItem 
                    route={route} 
                    isActive={route.path === "/" ? pathname === "/" : pathname?.startsWith(route.path)} 
                    prefersReducedMotion={prefersReducedMotion}
                    onClick={() => {}} // Navigation handled by <Link>
                  />
                </motion.div>
              ))}

              {/* MORE Dropdown Trigger */}
              <motion.div 
                ref={moreRef}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + mainRoutes.length * 0.05, duration: 0.5 }}
                className="relative group px-4 py-2 cursor-pointer outline-none flex items-center gap-1 h-10"
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              >
                <motion.span 
                  whileHover={{ y: prefersReducedMotion ? 0 : -2, scale: 1.03 }}
                  className={`relative z-10 text-xs font-bold tracking-widest transition-colors duration-300 uppercase ${
                    moreMenuOpen || moreRoutes.some(r => pathname?.startsWith(r.path)) 
                      ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" 
                      : "text-white/60 group-hover:text-white"
                  }`}
                >
                  MORE
                </motion.span>
                <motion.div
                  animate={{ rotate: moreMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                >
                  <ChevronDown size={14} className={`${moreMenuOpen ? 'text-cyan-400' : 'text-white/60 group-hover:text-white transition-colors duration-300'}`} />
                </motion.div>

                {/* Active Underline for "More" if a sub-route is active */}
                {moreRoutes.some(r => pathname?.startsWith(r.path)) && (
                  <motion.div
                    layoutId="desktop-nav-active-line"
                    className="absolute bottom-1 left-4 right-8 h-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                
                {/* Hover Radial Light for MORE */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* The Cinematic Dropdown Menu */}
                <AnimatePresence>
                  {moreMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scaleY: 0.94 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: -4, scaleY: 0.96 }}
                      transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
                      className="absolute top-full right-0 mt-3 p-2 min-w-[200px] rounded-2xl bg-[#05080f]/95 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col gap-1 origin-top"
                    >
                      {/* Subtle Edge Glow */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute inset-0 rounded-2xl shadow-[inset_0_0_15px_rgba(34,211,238,0.1)] pointer-events-none" 
                      />

                      {moreRoutes.map((route, idx) => {
                        const isActive = pathname?.startsWith(route.path);
                        return (
                          <motion.div
                            key={route.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.06, duration: 0.4, ease: "easeOut" }}
                          >
                            <Link
                              href={route.path}
                              onClick={() => setMoreMenuOpen(false)}
                              className="relative flex items-center px-4 py-3 rounded-xl outline-none group/sub overflow-hidden"
                            >
                              <span className="text-[10px] font-mono text-cyan-500/50 mr-3 group-hover/sub:text-cyan-400 transition-colors">
                                {route.index}
                              </span>
                              <motion.span 
                                whileHover={{ x: prefersReducedMotion ? 0 : 3 }}
                                className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                                  isActive ? "text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.6)]" : "text-white/70 group-hover/sub:text-white"
                                }`}
                              >
                                {route.label}
                              </motion.span>
                              
                              {isActive && (
                                <motion.div layoutId="more-active-bg" className="absolute inset-0 bg-cyan-900/30 rounded-xl border border-cyan-400/20" />
                              )}
                              {/* Hover Glow */}
                              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,211,238,0.1),transparent)] opacity-0 group-hover/sub:opacity-100 rounded-xl transition-opacity duration-300" />
                            </Link>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // --- MOBILE RENDER ---
  return (
    <div className="fixed top-6 right-6 z-[100]" ref={mobileRef}>
      <motion.div
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <motion.div 
          style={{
            backgroundColor: useTransform(bgOpacity, v => `rgba(5, 8, 15, ${v})`),
            backdropFilter: useTransform(blurAmount, v => `blur(${v}px) saturate(140%)`),
            borderColor,
            boxShadow: shadowIntensity
          }}
          className="flex items-center justify-between h-12 rounded-full px-3 py-2 border transition-colors duration-500"
        >
          <div className="flex items-center gap-3 pr-4 border-r border-white/10">
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex items-center justify-center w-7 h-7 rounded-full bg-white/5 border border-cyan-400/20"
            >
              <Sparkles size={12} className="text-cyan-400" />
            </motion.div>
            <span className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]">
              {currentRoute.label}
            </span>
          </div>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="pl-4 pr-1 outline-none text-white/70 hover:text-white transition-colors"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileMenuOpen ? 'close' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </motion.div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
              className="absolute top-full right-0 mt-4 w-64 p-2 rounded-2xl bg-[#05080f]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-1 origin-top-right"
            >
              {globalRoutes.map((route, idx) => {
                const isActive = route.path === "/" ? pathname === "/" : pathname?.startsWith(route.path);
                return (
                  <motion.div
                    key={route.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={route.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="relative flex items-center px-4 py-3 rounded-xl outline-none active:scale-95 transition-transform"
                    >
                      <span className="text-[10px] font-mono text-cyan-500/50 mr-4">
                        {route.index}
                      </span>
                      <span className={`text-xs font-bold tracking-widest uppercase ${
                        isActive ? "text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]" : "text-white/80"
                      }`}>
                        {route.label}
                      </span>
                      {isActive && (
                        <motion.div layoutId="mobile-active-bg" className="absolute inset-0 bg-cyan-900/30 border border-cyan-400/20 rounded-xl" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
