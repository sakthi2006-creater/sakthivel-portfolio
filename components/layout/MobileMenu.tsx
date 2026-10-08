"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "HOME", path: "/", num: "01" },
  { label: "ABOUT", path: "/about", num: "02" },
  { label: "PROJECTS", path: "/projects", num: "03" },
  { label: "EXPERIENCE", path: "/experience", num: "04" },
  { label: "RESEARCH", path: "/research", num: "05" },
  { label: "ACHIEVEMENTS", path: "/achievements", num: "06" },
  { label: "CERTIFICATES", path: "/certificates", num: "07" },
  { label: "SKILLS", path: "/skills", num: "08" },
  { label: "CONTACT", path: "/contact", num: "09" },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Hamburger Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 p-3 bg-black/50 backdrop-blur-md border border-white/10 rounded text-white"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#020617]/95 overflow-y-auto"
          >
            {/* Blueprint Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(34,211,238,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.3)_1px,transparent_1px)] bg-[size:20px_20px]" />

            <div className="flex flex-col min-h-screen px-8 py-24">
              <div className="text-sm font-black tracking-[0.3em] text-cyan-400 mb-12 uppercase">
                SAKTHIVEL R.
              </div>

              <div className="flex flex-col gap-6">
                {NAV_ITEMS.map((item) => {
                  const isActive = item.path === "/" 
                    ? pathname === "/" 
                    : pathname?.startsWith(item.path);

                  return (
                    <Link 
                      key={item.path} 
                      href={item.path}
                      className="flex items-center gap-6"
                    >
                      <span className={`text-xs font-mono w-6 ${isActive ? 'text-cyan-400' : 'text-white/40'}`}>
                        {item.num}
                      </span>
                      <span className={`text-xl font-bold tracking-[0.2em] uppercase ${isActive ? 'text-white' : 'text-white/70'}`}>
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto pt-16">
                <div className="text-[10px] font-mono tracking-widest text-cyan-500 mb-2">AI × SOFTWARE × DESIGN</div>
                <div className="text-[10px] font-mono text-white/40">SYSTEM NAVIGATION OVERLAY</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
