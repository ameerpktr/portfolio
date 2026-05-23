"use client";

import { motion } from "framer-motion";

export function HolographicCard() {
  return (
    <div className="relative group">
      {/* VOLUMETRIC NEON PULSING GLOW BEHIND CARD */}
      <motion.div
        className="absolute inset-[-100px] z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(22, 255, 0, 0.1) 0%, rgba(0,0,0,0) 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* GLASS CARD CONTAINER */}
      <motion.div
        initial={{ 
          opacity: 0, 
          scale: 1.8, 
          rotateY: -30, 
          rotateX: 15, 
          filter: "blur(10px)" 
        }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          rotateY: 0, 
          rotateX: 0, 
          filter: "blur(0px)" 
        }}
        exit={{ 
          opacity: 0, 
          scale: 0.4, 
          rotateY: 180,
          rotateX: 45,
          filter: "blur(40px)",
          transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } 
        }}
        transition={{ 
          duration: 3, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        className="relative z-50 flex flex-col justify-between rounded-[28px] p-10 overflow-hidden cursor-default"
        style={{
          width: "480px",
          height: "300px",
          transformOrigin: "20% 20%", // Start focus close to the chip area
          // CLEAR GLASS EFFECT
          background: "rgba(255, 255, 255, 0.005)", // Ultra-high transparency
          backdropFilter: "blur(16px) saturate(120%) contrast(100%)", // Reduced blur for clearer glass
          WebkitBackdropFilter: "blur(16px) saturate(120%) contrast(100%)",
          transformStyle: "preserve-3d",
          // SOFT WHITE BORDERS
          border: "1.5px solid rgba(255, 255, 255, 0.12)",
          boxShadow: `
            0 0 0 1px rgba(255, 255, 255, 0.08) inset,
            0 20px 50px rgba(0, 0, 0, 0.3),
            0 0 20px rgba(22, 255, 0, 0.05)
          `,
        }}
      >
        {/* LIGHT REFLECTIONS (Moving Highlights) */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
            backgroundSize: "200% 200%",
          }}
          animate={{ backgroundPosition: ["200% 200%", "-100% -100%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* ORGANIC CAUSTIC LIGHT (Subtle Tint) */}
        <motion.div 
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(22, 255, 0, 0.1) 0%, transparent 70%)",
          }}
          animate={{ 
            scale: [1, 1.3, 1],
            x: [-30, 30, -30],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* CONTENT WRAPPER */}
        <motion.div
          className="relative z-10 h-full w-full flex flex-col justify-between"
          animate={{ 
            y: [-5, 5, -5],
            rotateX: [-2, 2, -2],
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
            {/* Metallic Microchip */}
            <div className="h-12 w-16 rounded-lg bg-gradient-to-br from-amber-100/60 via-yellow-400/50 to-amber-600/60 border border-white/20 shadow-inner overflow-hidden relative">
               <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,white_4px,white_5px)]" />
               <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,white_4px,white_5px)]" />
            </div>
            
            {/* Contactless Icon */}
            <div className="text-white/60 group-hover:text-white/90 transition-colors">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12a7 7 0 0 1 14 0"/><path d="M8 12a4 4 0 0 1 8 0"/><path d="M11 12a1 1 0 0 1 2 0"/>
              </svg>
            </div>
          </div>

          {/* CENTER / NUMBERS */}
          <div className="mt-8">
            <p className="font-mono text-[28px] tracking-[0.24em] text-white font-bold filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              1243  3342  4358  0040
            </p>
          </div>

          {/* BOTTOM ROW */}
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <div className="flex gap-10 opacity-60">
                <p className="text-[10px] font-bold text-white tracking-[0.1em] uppercase">FICB</p>
                <p className="text-[10px] font-bold text-white tracking-[0.1em] uppercase">MAST FOXP</p>
              </div>
              <p className="text-lg font-bold text-white tracking-[0.15em] uppercase mt-2 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                AMEER M
              </p>
            </div>

            {/* Logo Circles */}
            <div className="flex -space-x-5 pr-1 mb-1 opacity-90 transition-all">
              <div className="h-11 w-11 rounded-full bg-[#EB001B]" />
              <div className="h-11 w-11 rounded-full bg-[#F79E1B]" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
