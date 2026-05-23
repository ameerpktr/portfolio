"use client";

import { motion } from "framer-motion";

export function HolographicCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: -30, rotateX: 20 }}
      animate={{ opacity: 1, scale: 1, rotateY: 10, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: -100, transition: { duration: 0.5 } }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-[32rem] w-64 rounded-[2.5rem] p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        background: "linear-gradient(135deg, #E2E8F0 0%, #F8FAFC 50%, #CBD5E1 100%)",
        border: "1px solid rgba(255, 255, 255, 0.8)",
      }}
    >
      {/* Subtle Metallic Sheen Shine */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent w-[200%] -translate-x-full"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Gold Chip */}
      <div className="relative z-10 h-12 w-16 rounded-xl bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 border border-amber-200/50 shadow-inner overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(90deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%)] bg-[size:4px_100%]" />
      </div>
      
      {/* Card Content */}
      <div className="relative z-10 mt-40 space-y-8">
        <div className="space-y-1">
          <p className="font-mono text-sm tracking-tighter text-slate-400 uppercase">Card Member</p>
          <p className="font-mono text-lg tracking-[0.15em] text-slate-800">•••• 8821</p>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ameer Mocsen</p>
            <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.3em]">Fintech Operations</p>
          </div>
          
          {/* MasterCard Style Logo */}
          <div className="flex -space-x-3">
            <div className="h-8 w-8 rounded-full bg-red-500/80 opacity-90" />
            <div className="h-8 w-8 rounded-full bg-amber-500/80 opacity-90" />
          </div>
        </div>
      </div>
      
      {/* Ambient Light Catching Edge */}
      <div className="absolute inset-0 rounded-[2.5rem] border-[1px] border-white/40 pointer-events-none" />
    </motion.div>
  );
}
