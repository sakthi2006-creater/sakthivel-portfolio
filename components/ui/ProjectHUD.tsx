import { motion, MotionValue } from "framer-motion";

interface ProjectHUDProps {
  worldNum: string;
  title: string;
  subtitle?: string;
  role: string;
  liveLink?: string | null;
  githubLink?: string | null;
  color: string;
  opacity: MotionValue<number>;
}

export function ProjectHUD({
  worldNum,
  title,
  subtitle,
  role,
  liveLink,
  githubLink,
  color,
  opacity
}: ProjectHUDProps) {
  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none z-[60]"
      style={{ opacity }}
    >
      {/* Top Left: Minimal Project Identity */}
      <div className="absolute top-12 left-12">
        <div className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/50 mb-1" style={{ color: `${color}` }}>
          {worldNum} / {title}
        </div>
      </div>



      {/* Bottom Right: Links */}
      <div className="absolute bottom-12 right-12 flex flex-col items-end gap-2 pointer-events-auto">
        {liveLink && (
          <a 
            href={liveLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] font-mono tracking-[0.2em] text-white/60 hover:text-white transition-colors flex items-center gap-2"
          >
            LIVE DEMO ↗
          </a>
        )}
        {githubLink && (
          <a 
            href={githubLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] font-mono tracking-[0.2em] text-white/60 hover:text-white transition-colors flex items-center gap-2"
          >
            GITHUB ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}
