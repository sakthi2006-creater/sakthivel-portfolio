"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

interface CertificateCardProps {
  imageSrc: string;
  title: string;
  onClick: () => void;
}

export function CertificateCard({ imageSrc, title, onClick }: CertificateCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState(imageSrc);

  // Update internal state if props change
  useEffect(() => {
    setSrc(imageSrc);
  }, [imageSrc]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const highlightX = useTransform(mouseXSpring, [-0.5, 0.5], ["-100%", "200%"]);
  const highlightY = useTransform(mouseYSpring, [-0.5, 0.5], ["-100%", "200%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full h-full max-h-[70vh] cursor-pointer group perspective-[2000px] flex items-center justify-center"
    >
      <div 
        className="relative w-full h-full bg-[#050505]/40 backdrop-blur-xl border border-white/10 rounded-xl p-2 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(34,211,238,0.1)] transition-colors duration-500 group-hover:border-cyan-500/30 overflow-hidden flex items-center justify-center"
      >
        {/* Holographic Highlight Sweep */}
        <motion.div 
          style={{ x: highlightX, y: highlightY }}
          className="absolute inset-0 w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 mix-blend-overlay pointer-events-none z-20"
        />

        {!src || src.includes("placeholder") ? (
          <div className="flex flex-col items-center justify-center w-full h-full border border-dashed border-zinc-800 bg-[#020202]/50 text-center px-6">
             <Search size={48} className="text-zinc-800 mb-6" />
             <div className="text-sm font-bold tracking-[0.4em] text-zinc-500 mb-2 uppercase">CERTIFICATE IMAGE</div>
             <div className="text-[11px] tracking-[0.3em] text-zinc-600 uppercase bg-zinc-900/50 px-4 py-2 rounded-full">IMAGE NOT AVAILABLE</div>
          </div>
        ) : (
          <Image 
            src={src} 
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain filter drop-shadow-2xl relative z-10"
            style={{ transform: "translateZ(30px)" }} // Pop out effect
            onError={() => {
              if (src.endsWith('.jpeg')) setSrc(src.replace('.jpeg', '.jpg'));
              else if (src.endsWith('.jpg')) setSrc(src.replace('.jpg', '.png'));
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
