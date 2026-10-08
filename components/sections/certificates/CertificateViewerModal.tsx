"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface CertificateViewerModalProps {
  imageSrc: string;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export function CertificateViewerModal({
  imageSrc,
  isOpen,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev
}: CertificateViewerModalProps) {
  const [scale, setScale] = useState(1);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.5, 0.5));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-12"
          onClick={onClose}
        >
          {/* Controls Overlay */}
          <div className="absolute top-6 right-6 flex items-center gap-4 z-50">
            <button onClick={handleZoomOut} className="p-3 bg-white/5 hover:bg-white/20 rounded-full text-white transition-colors border border-white/10">
              <ZoomOut size={20} />
            </button>
            <button onClick={handleZoomIn} className="p-3 bg-white/5 hover:bg-white/20 rounded-full text-white transition-colors border border-white/10">
              <ZoomIn size={20} />
            </button>
            <div className="w-px h-8 bg-white/20 mx-2" />
            <button onClick={onClose} className="p-3 bg-white/10 hover:bg-cyan-500 rounded-full text-white transition-colors border border-white/20">
              <X size={20} />
            </button>
          </div>

          {/* Navigation Controls */}
          {hasPrev && (
            <button 
              onClick={(e) => { e.stopPropagation(); setScale(1); onPrev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-white/20 rounded-full text-white transition-colors border border-white/10 z-50"
            >
              <ArrowLeft size={24} />
            </button>
          )}

          {hasNext && (
            <button 
              onClick={(e) => { e.stopPropagation(); setScale(1); onNext(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-white/20 rounded-full text-white transition-colors border border-white/10 z-50"
            >
              <ArrowRight size={24} />
            </button>
          )}

          {/* Image Container */}
          <motion.div 
            className="relative w-[90vw] h-[80vh] cursor-grab active:cursor-grabbing"
            onClick={(e) => e.stopPropagation()}
            drag
            dragConstraints={{ top: -200, bottom: 200, left: -200, right: 200 }}
            dragElastic={0.1}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Image
              key={imageSrc}
              src={imageSrc}
              alt="Fullscreen Certificate"
              fill
              sizes="100vw"
              className="object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] pointer-events-none"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
