"use client";

import { motion } from "framer-motion";

export function HolographicCard() {
  return (
    <div className="relative group">
      {/* VOLUMETRIC NEON PULSING GLOW BEHIND CARD */}
      <motion.div
        className="absolute inset-[-100px] z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,255,102,0.15) 0%, rgba(0,0,0,0) 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotateY: -15, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, rotateY: -5, rotateX: 5 }}
        exit={{ 
          opacity: 0, 
          scale: 0.85, 
          filter: "blur(20px)",
          transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-50 flex flex-col justify-between rounded-[24px] p-10 overflow-hidden cursor-default border border-white/20"
        style={{
          width: "480px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(25px) saturate(140%)",
          transformStyle: "preserve-3d",
          boxShadow: "0 0 20px rgba(0, 255, 102, 0.25), inset 0 0 10px rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* ORGANIC FLOWING LIGHT EFFECTS (Caustics) */}
        <motion.div 
          className="absolute inset-0 z-0 opacity-40 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.15) 0%, transparent 60%)",
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [-20, 20, -20],
            y: [-10, 10, -10],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] z-0 opacity-20 pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg at 50% 50%, transparent, rgba(255,255,255,0.1), transparent, rgba(0, 255, 136, 0.05), transparent)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* COMBINED FLOATING & TILTING ANIMATION WRAPPER */}
        <motion.div
          className="relative z-10 h-full w-full flex flex-col justify-between"
          animate={{ 
            y: [-6, 6, -6],
            rotateX: [-3, 3, -3],
            rotateY: [4, -4, 4]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {/* TOP ROW */}
          <div className="flex justify-between items-start">
            {/* Rectangular Golden Microchip */}
            <div className="h-12 w-16 rounded-lg bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 border border-amber-200/50 shadow-[0_0_20px_rgba(251,191,36,0.3)] overflow-hidden relative">
               <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(0,0,0,0.4)_4px,rgba(0,0,0,0.4)_5px)]" />
               <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,rgba(0,0,0,0.4)_4px,rgba(0,0,0,0.4)_5px)]" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-black/20" />
            </div>
            
            {/* Contactless Payment Wave */}
            <div className="text-white/70">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12a7 7 0 0 1 14 0"/><path d="M8 12a4 4 0 0 1 8 0"/><path d="M11 12a1 1 0 0 1 2 0"/>
              </svg>
            </div>
          </div>

          {/* CENTER / NUMBERS */}
          <div className="mt-8">
            <p className="font-mono text-[28px] tracking-[0.22em] text-white/95 text-shadow-glow">
              1243  3342  4358  0040
            </p>
          </div>

          {/* BOTTOM ROW */}
          <div className="flex justify-between items-end">
            {/* Text Details Group */}
            <div className="space-y-1">
              <div className="flex gap-10">
                <p className="text-[11px] font-medium text-white/40 tracking-[0.1em] uppercase">FICB</p>
                <p className="text-[11px] font-medium text-white/40 tracking-[0.1em] uppercase">MAST FOXP</p>
              </div>
              <p className="text-lg font-medium text-white/90 tracking-[0.12em] uppercase mt-2">
                ADTAY ODEKER
              </p>
            </div>

            {/* MasterCard Style Dual-Circle Logo */}
            <div className="flex -space-x-4 pr-1 mb-1 opacity-90">
              <div className="h-11 w-11 rounded-full bg-[#EB001B]/90 shadow-[0_0_20px_rgba(235,0,27,0.2)]" />
              <div className="h-11 w-11 rounded-full bg-[#F79E1B]/90 shadow-[0_0_20px_rgba(247,158,27,0.2)]" />
            </div>
          </div>
        </motion.div>

        <style jsx>{`
          .text-shadow-glow {
            text-shadow: 0 0 10px rgba(255,255,255,0.3);
          }
        `}</style>
      </motion.div>
    </div>
  );
}
