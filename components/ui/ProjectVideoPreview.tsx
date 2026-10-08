"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectVideoPreviewProps {
  videoSrc?: string;
  imageSrc?: string;
  title: string;
  category: string;
}

export function ProjectVideoPreview({ videoSrc, imageSrc, title, category }: ProjectVideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleInteraction = (play: boolean) => {
    if (!videoRef.current) return;
    
    if (play) {
      setIsPlaying(true);
      videoRef.current.play().catch(() => {
        // Handle autoplay restrictions gracefully
        setIsPlaying(false);
      });
    } else {
      setIsPlaying(false);
      videoRef.current.pause();
    }
  };

  if (!videoSrc) {
    if (imageSrc) {
      return (
        <div className="w-full h-full aspect-video rounded-2xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 group">
          <Image 
            src={imageSrc} 
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      );
    }
    
    return (
      <div className="w-full h-full aspect-video bg-[#0f172a]/80 border border-white/5 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-transparent opacity-50" />
        <span className="text-white/20 font-bold tracking-[0.5em] uppercase text-sm z-10 text-center px-4">
          {title} <br/> VISUAL
        </span>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-full aspect-video rounded-2xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 group cursor-pointer"
      onMouseEnter={() => handleInteraction(true)}
      onMouseLeave={() => handleInteraction(false)}
      onClick={() => handleInteraction(!isPlaying)}
    >
      <video
        ref={videoRef}
        src={encodeURI(videoSrc)}
        muted
        playsInline
        loop
        preload="metadata"
        onError={(e) => {
          console.error("Project video failed to load:", videoSrc);
        }}
        className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? "scale-[1.02]" : "scale-100"}`}
      />

      {/* Direct Fallback Link for debugging */}
      <a 
        href={encodeURI(videoSrc)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="absolute top-4 right-4 z-50 bg-black/80 backdrop-blur border border-white/10 text-white/70 hover:text-white px-3 py-1.5 text-[10px] font-mono tracking-widest rounded-full transition-colors opacity-0 group-hover:opacity-100 uppercase"
      >
        OPEN DEMO →
      </a>

      {/* Cinematic Overlay */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-500 flex flex-col items-center justify-center ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
          <Play className="text-cyan-400 ml-1" size={24} />
        </div>
        
        <span className="text-xs font-mono tracking-[0.3em] text-cyan-400 mb-2 uppercase text-center">
          {category}
        </span>
        <h3 className="text-xl md:text-2xl font-black text-white tracking-widest uppercase text-center px-4">
          {title}
        </h3>
        
        <div className="mt-8 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-white/50 border border-white/10 px-4 py-2 rounded-full uppercase">
          DEMO
        </div>
      </div>
      
      {/* Subtle Glow when playing */}
      <div className={`absolute inset-0 shadow-[inset_0_0_50px_rgba(34,211,238,0.2)] pointer-events-none transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}
