"use client";

import { motion } from "framer-motion";

export function HolographicCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: -100, filter: "blur(20px)" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-50 flex flex-col justify-between rounded-[20px] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.5)] overflow-hidden cursor-default group"
      style={{
        width: "450px",
        height: "285px",
        aspectRatio: "1.58 / 1",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px) saturate(120%)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* CONTINUOUS FLOATING & TILTING ANIMATION WRAPPER */}
      <motion.div
        className="h-full w-full flex flex-col justify-between"
        animate={{ 
          y: [-8, 8, -8],
          rotateX: [2, -2, 2],
          rotateY: [3, -3, 3]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        {/* TOP ROW */}
        <div className="flex justify-between items-start">
          {/* Rectangular Golden Microchip */}
          <div className="h-12 w-16 rounded-lg bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 border border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.4)] overflow-hidden relative">
             <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,black_4px,black_5px)]" />
             <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,black_4px,black_5px)]" />
          </div>
          
          {/* Contactless Payment Wave */}
          <div className="text-white/80 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12a7 7 0 0 1 14 0"/><path d="M8 12a4 4 0 0 1 8 0"/><path d="M11 12a1 1 0 0 1 2 0"/>
            </svg>
          </div>
        </div>

        {/* CENTER / NUMBERS */}
        <div className="text-center w-full">
          <p className="font-mono text-2xl tracking-[0.25em] text-white/90 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            1243  3342  4350  0040
          </p>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex justify-between items-end">
          {/* Text Details Group */}
          <div className="space-y-1">
            <div className="flex gap-4">
              <p className="text-[10px] font-black text-white/40 tracking-[0.1em] uppercase">FICB</p>
              <p className="text-[10px] font-black text-white/40 tracking-[0.1em] uppercase">MAST FOXP</p>
            </div>
            <p className="text-sm font-bold text-white tracking-[0.15em] uppercase filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              ADTAY ODEKER
            </p>
          </div>

          {/* MasterCard Dual-Circle Logo */}
          <div className="flex -space-x-4 pr-2">
            <div className="h-10 w-10 rounded-full bg-[#EB001B] shadow-[0_0_15px_rgba(235,0,27,0.3)]" />
            <div className="h-10 w-10 rounded-full bg-[#F79E1B] opacity-90 shadow-[0_0_15px_rgba(247,158,27,0.3)]" />
          </div>
        </div>
      </motion.div>

      {/* LIGHT CATCHING REFLECTION OVERLAY */}
      <motion.div 
        className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent w-[200%] -translate-x-full"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}
