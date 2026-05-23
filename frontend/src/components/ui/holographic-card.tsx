"use client";

import { motion } from "framer-motion";

export function HolographicCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.9, rotateX: -10 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-64 w-[26rem] rounded-3xl border border-white/20 bg-white/5 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
      style={{
        transformStyle: "preserve-3d",
        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute left-8 top-8 h-10 w-16 rounded-lg bg-amber-400/40 border border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.3)]" />
      <div className="absolute right-8 top-8 text-white/80"><div className="h-6 w-8 rounded-full border-2 border-white/40" /></div>
      
      {/* Card Content */}
      <div className="mt-20">
        <p className="font-mono text-xl tracking-[0.2em] text-white">4532 8842 1290 8821</p>
        <div className="mt-4 flex justify-between items-end">
          <p className="text-sm text-white/60 tracking-widest uppercase">AMEER MOCSEN</p>
          <div className="h-8 w-12 rounded bg-white/10 flex items-center justify-center font-bold text-[8px] text-white">LOGO</div>
        </div>
      </div>
      
      {/* Ambient Glow */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-primary/20 to-transparent blur-2xl" />
    </motion.div>
  );
}
