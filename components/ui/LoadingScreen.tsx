"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 12 + 3;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setTimeout(() => setDone(true), 600);
      }
      setProgress(Math.min(p, 100));
    }, 120);
    return () => clearInterval(iv);
  }, []);

  // Neural network nodes
  const nodes = [
    { x: 80, y: 100 }, { x: 80, y: 160 }, { x: 80, y: 220 },
    { x: 180, y: 80 }, { x: 180, y: 140 }, { x: 180, y: 200 }, { x: 180, y: 260 },
    { x: 280, y: 100 }, { x: 280, y: 160 }, { x: 280, y: 220 },
    { x: 380, y: 130 }, { x: 380, y: 190 },
  ];
  const edges = [
    [0,3],[0,4],[1,3],[1,4],[1,5],[2,4],[2,5],[2,6],
    [3,7],[3,8],[4,7],[4,8],[4,9],[5,8],[5,9],[6,9],
    [7,10],[7,11],[8,10],[8,11],[9,10],[9,11],
  ];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Neural Network SVG */}
          <div className="mb-10">
            <svg width="460" height="340" viewBox="0 0 460 340" className="opacity-90">
              {edges.map(([a, b], i) => (
                <motion.line
                  key={i}
                  x1={nodes[a].x} y1={nodes[a].y}
                  x2={nodes[b].x} y2={nodes[b].y}
                  stroke="url(#lineGrad)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 1, delay: i * 0.04, ease: "easeOut" }}
                />
              ))}
              {nodes.map((n, i) => (
                <motion.circle
                  key={i}
                  cx={n.x} cy={n.y} r={6}
                  fill={i % 3 === 0 ? "#2B7CFF" : i % 3 === 1 ? "#8B5CFF" : "#27F7FF"}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                  style={{ filter: "drop-shadow(0 0 8px currentColor)" }}
                />
              ))}
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2B7CFF" />
                  <stop offset="50%" stopColor="#8B5CFF" />
                  <stop offset="100%" stopColor="#27F7FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Text */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-neon-cyan text-xs font-mono tracking-[0.4em] uppercase mb-3 opacity-70">
              AI Portfolio
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Sakthivel R</h1>
            <p className="text-white/50 text-sm font-mono tracking-wider">
              Artificial Intelligence & Data Science · Software Developer
            </p>
          </motion.div>

          {/* Progress */}
          <div className="w-64">
            <div className="flex justify-between text-xs text-white/30 font-mono mb-2">
              <span>Initializing AI Systems</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
