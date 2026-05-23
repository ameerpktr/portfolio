"use client";

import { motion } from "framer-motion";

export function HolographicCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.5, rotateY: -90 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative h-60 w-96 rounded-2xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-2xl"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Card Content Placeholder */}
      <div className="flex h-full flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="h-10 w-14 rounded-lg bg-white/20" /> {/* Chip */}
          <div className="text-white/60 font-bold tracking-widest">VISA</div> {/* Wave */}
        </div>
        <div>
          <div className="text-white font-mono tracking-widest">**** **** **** 1234</div>
          <div className="text-white/60 text-sm mt-1">AMEER M</div>
        </div>
      </div>
      
      {/* Ambient Glow */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent blur-xl" />
    </motion.div>
  );
}
