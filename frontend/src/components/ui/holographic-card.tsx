"use client";

import { motion } from "framer-motion";

export function HolographicCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.9, rotateX: -10 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-64 w-[26rem] rounded-3xl p-8 shadow-[0_0_30px_rgba(0,255,102,0.15)] overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    >
      {/* Metallic Chip */}
      <div className="absolute left-8 top-8 h-10 w-14 rounded-lg bg-gradient-to-br from-amber-200 to-amber-500 border border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
      
      {/* Contactless Wave */}
      <div className="absolute right-8 top-8 text-white/60">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12a7 7 0 0 1 14 0"/><path d="M8 12a4 4 0 0 1 8 0"/><path d="M11 12a1 1 0 0 1 2 0"/></svg>
      </div>
      
      {/* Card Content */}
      <div className="mt-20">
        <p className="font-mono text-xl tracking-[0.2em] text-white">4532 8842 1290 8821</p>
        <div className="mt-6 flex justify-between items-end">
          <p className="text-xs font-semibold text-white/70 tracking-widest uppercase">AMEER MOCSEN</p>
          <div className="h-8 w-16 rounded border border-white/20 flex items-center justify-center font-bold text-[10px] text-white tracking-tighter bg-white/5">FINTECH</div>
        </div>
      </div>
      
      {/* Neon Border Glow */}
      <div className="absolute inset-0 -z-10 rounded-3xl border border-[#00FF66]/30 shadow-[0_0_20px_rgba(0,255,102,0.2)]" />
    </motion.div>
  );
}
