"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, BookOpen, FileCode2, Award, Users, Download } from "lucide-react";

export function HeroContent() {
  return (
    <div className="relative z-30 flex flex-col justify-center h-full pt-16 md:pt-0 pb-12 md:pb-0 px-4 md:px-0 max-w-[650px] mx-auto xl:mx-0 w-full">
      
      {/* 1. Status Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-4"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)] animate-pulse" />
        <span className="text-sm font-mono tracking-widest text-cyan-50">Hello, I'm</span>
      </motion.div>

      {/* 2. Main Title - STRICTLY NO WRAP ON DESKTOP */}
      <motion.h1 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-black text-white tracking-widest uppercase mb-4 drop-shadow-[0_0_25px_rgba(34,211,238,0.15)] flex flex-wrap xl:flex-nowrap items-baseline gap-x-4 w-full"
        style={{ fontSize: "clamp(2.5rem, 5vw, 5.2rem)", lineHeight: 1.05 }}
      >
        <span>SAKTHIVEL</span> <span className="text-cyan-400">R.</span>
      </motion.h1>

      {/* 3. Subheadline */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base md:text-xl lg:text-2xl font-mono tracking-[0.25em] text-white/70 mb-8 uppercase"
      >
        AI <span className="text-cyan-500/50 mx-2">×</span> SOFTWARE <span className="text-cyan-500/50 mx-2">×</span> DESIGN
      </motion.div>

      {/* 4. Bio */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col gap-3 mb-12 border-l-[3px] border-cyan-500/40 pl-6"
      >
        <p className="text-base md:text-lg text-white font-medium tracking-wider">
          B.Tech AI & Data Science Student
        </p>
        <p className="text-sm md:text-base text-white/50 font-light tracking-widest uppercase leading-relaxed">
          Building intelligent solutions <br className="hidden md:block"/>for a better tomorrow.
        </p>
      </motion.div>

      {/* 5. CTA Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col sm:flex-row flex-wrap gap-4 mb-14"
      >
        <Link 
          href="/contact" 
          className="flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#020617] px-8 py-4 rounded-full font-bold tracking-widest uppercase text-xs hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:scale-[1.02] transition-all duration-300"
        >
          Start a Project <ArrowRight size={16} />
        </Link>
        
        <a 
          href="/reasume.jpeg" 
          download="Sakthivel_R_Resume.jpeg"
          className="flex items-center justify-center gap-3 border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm text-cyan-400 px-8 py-4 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300"
        >
          <Download size={16} /> Resume
        </a>

        <Link 
          href="/work" 
          className="flex items-center justify-center gap-3 border border-white/10 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <Play size={16} className="text-cyan-400" /> View Work
        </Link>
      </motion.div>

      {/* 6. Stats Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-wrap md:flex-nowrap justify-between gap-6 mb-12 border-t border-b border-white/5 py-8"
      >
        <div className="flex flex-col gap-1 w-[45%] md:w-auto">
          <div className="flex items-center gap-2 text-white font-black text-2xl"><BookOpen size={16} className="text-cyan-400 hidden sm:block" /> 2+</div>
          <div className="text-[9px] text-white/40 uppercase tracking-widest font-mono">Years Learning</div>
        </div>
        <div className="flex flex-col gap-1 w-[45%] md:w-auto">
          <div className="flex items-center gap-2 text-white font-black text-2xl"><FileCode2 size={16} className="text-cyan-400 hidden sm:block" /> 6+</div>
          <div className="text-[9px] text-white/40 uppercase tracking-widest font-mono">Projects</div>
        </div>
        <div className="flex flex-col gap-1 w-[45%] md:w-auto">
          <div className="flex items-center gap-2 text-white font-black text-2xl"><Award size={16} className="text-cyan-400 hidden sm:block" /> 5+</div>
          <div className="text-[9px] text-white/40 uppercase tracking-widest font-mono">Certificates</div>
        </div>
        <div className="flex flex-col gap-1 w-[45%] md:w-auto">
          <div className="flex items-center gap-2 text-white font-black text-2xl"><Users size={16} className="text-cyan-400 hidden sm:block" /> Open</div>
          <div className="text-[9px] text-white/40 uppercase tracking-widest font-mono">For Opportunities</div>
        </div>
      </motion.div>

      {/* 7. Quote Card (Minimal) */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-black/30 border border-white/5 rounded-2xl p-6 backdrop-blur-md flex items-center justify-between"
      >
        <div className="flex flex-col gap-2">
          <span className="text-2xl text-cyan-500/50 font-serif leading-none h-4">"</span>
          <p className="text-sm text-white/70 italic font-light tracking-wide">
            Turning ideas into intelligent solutions.
          </p>
          <div className="font-signature text-xl text-cyan-400/80 mt-1">Sakthivel R.</div>
        </div>
      </motion.div>

    </div>
  );
}
