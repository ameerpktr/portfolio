"use client";

import { motion } from "framer-motion";

export function HolographicCard() {
  return (
    <div className="relative group">
      {/* VOLUMETRIC NEON PULSING GLOW BEHIND CARD */}
      <motion.div
        className="absolute inset-[-120px] z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(22, 255, 0, 0.12) 0%, rgba(0, 240, 255, 0.03) 40%, rgba(0,0,0,0) 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* SECONDARY CINEMATIC GLOW (VIOLET/BLUE) */}
      <div
        className="absolute inset-[-80px] z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 60%)",
        }}
      />

      {/* GLASS CARD CONTAINER */}
      <motion.div
        initial={{ 
          opacity: 0, 
          scale: 1.6, 
          rotateY: -20, 
          rotateX: 10, 
          filter: "blur(15px)" 
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
          scale: 0.5, 
          rotateY: 90,
          rotateX: 20,
          filter: "blur(30px)",
          transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } 
        }}
        transition={{ 
          duration: 2.5, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        className="relative z-50 flex flex-col justify-between rounded-[32px] p-12 overflow-hidden cursor-default"
        style={{
          width: "600px", // Increased from 480px
          height: "380px", // Increased from 300px
          transformOrigin: "center center",
          background: "rgba(255, 255, 255, 0.002)", // Even more transparent
          backdropFilter: "blur(24px) saturate(160%) contrast(110%)", // Increased blur and saturation
          WebkitBackdropFilter: "blur(24px) saturate(160%) contrast(110%)",
          transformStyle: "preserve-3d",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: `
            0 0 0 1px rgba(255, 255, 255, 0.1) inset,
            0 30px 60px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(22, 255, 0, 0.1)
          `,
        }}
      >
        {/* LIGHT REFLECTIONS (Moving Highlights) */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
            backgroundSize: "200% 200%",
          }}
          animate={{ backgroundPosition: ["200% 200%", "-100% -100%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* ORGANIC CAUSTIC LIGHT (Subtle Tint) */}
        <div 
          className="absolute inset-0 z-0 opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(22, 255, 0, 0.15) 0%, transparent 70%)",
          }}
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
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="h-14 w-20 rounded-lg bg-gradient-to-br from-amber-100/80 via-yellow-400/60 to-amber-600/80 border border-white/30 shadow-[0_0_20px_rgba(251,191,36,0.3)] overflow-hidden relative"
            >
               <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,white_4px,white_5px)]" />
               <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,white_4px,white_5px)]" />
            </motion.div>
            
            {/* Contactless Icon */}
            <div className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12a7 7 0 0 1 14 0"/><path d="M8 12a4 4 0 0 1 8 0"/><path d="M11 12a1 1 0 0 1 2 0"/>
              </svg>
            </div>
          </div>

          {/* CENTER / NUMBERS */}
          <div className="mt-4">
            <p className="font-mono text-[34px] tracking-[0.24em] text-white font-black filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              1243  3342  4358  0040
            </p>
          </div>

          {/* BOTTOM ROW */}
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <div className="flex gap-10 opacity-90">
                <p className="text-[12px] font-black text-white tracking-[0.1em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">FICB</p>
                <p className="text-[12px] font-black text-white tracking-[0.1em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">MAST FOXP</p>
              </div>
              <p className="text-2xl font-black text-white tracking-[0.15em] uppercase mt-3 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                AMEER M
              </p>
            </div>

            {/* Logo Circles */}
            <div className="flex -space-x-6 pr-2 mb-1 opacity-100 transition-all drop-shadow-[0_0_15px_rgba(0,0,0,0.3)]">
              <div className="h-14 w-14 rounded-full bg-[#EB001B] border border-white/10" />
              <div className="h-14 w-14 rounded-full bg-[#F79E1B] border border-white/10" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
