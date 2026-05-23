"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Download, Eye, Activity, TrendingDown } from "lucide-react";
import { Navbar } from "@/components/system/navbar";
import { HolographicCard } from "@/components/ui/holographic-card";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/ui-store";

const CUBIC_BEZIER_TRANSITION = [0.25, 1, 0.5, 1];

export function HeroSection() {
  const [isIntro, setIsIntro] = useState(true);
  const setResumeOpen = useUiStore((state) => state.setResumeOpen);

  useEffect(() => {
    const timer = setTimeout(() => setIsIntro(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-[#0d1110] overflow-hidden">
      
      {/* 1. VOLUMETRIC BACKGROUND GLOW (Atmospheric Light Source) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(0, 255, 102, 0.18) 0%, rgba(10, 15, 12, 0.9) 70%, #0d1110 100%)",
        }}
      />

      {/* 2. DYNAMIC 3D NEON GRID/LINES (Moving Data Matrix) */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {/* Layer 1: Forward Moving Grid */}
        <div className="absolute inset-0 [perspective:500px]">
          <motion.div 
            className="absolute inset-[-100%] opacity-40"
            style={{ 
              background: `
                linear-gradient(to right, #00FF66 1px, transparent 1px),
                linear-gradient(to bottom, #00FF66 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
              filter: "drop-shadow(0 0 8px rgba(0, 255, 102, 0.8))",
              maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
              transform: "rotateX(60deg) translateY(0%)",
            }}
            animate={{ 
              backgroundPositionY: ["0px", "80px"],
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </div>

        {/* Layer 2: Drifting Intersecting Lines (Floating Streaks) */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-[#00FF66] opacity-30 shadow-[0_0_12px_#00FF66]"
            style={{
              width: i % 2 === 0 ? "1px" : "150px",
              height: i % 2 === 0 ? "150px" : "1px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "drop-shadow(0 0 5px #00FF66)",
            }}
            animate={{ 
              x: i % 2 === 0 ? [0, 0] : [-200, 200],
              y: i % 2 === 0 ? [-200, 200] : [0, 0],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}
      </div>

      <Navbar />

      <AnimatePresence mode="wait">
        {isIntro ? (
          <motion.div 
            key="intro"
            className="flex min-h-screen items-center justify-center relative z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 0.85,
              y: 20,
              filter: "blur(20px)",
              transition: { duration: 0.8, ease: CUBIC_BEZIER_TRANSITION }
            }}
          >
            <HolographicCard />
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 grid min-h-screen max-w-7xl mx-auto items-center lg:grid-cols-2 px-10 gap-16"
          >
            {/* Left Column: Premium Dark Typography */}
            <div className="space-y-10">
              <div className="space-y-3">
                <motion.h1 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="font-display text-8xl font-black tracking-tighter text-white"
                >
                  AMEER M
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-2xl text-[#00FF66] font-bold tracking-widest uppercase filter drop-shadow-[0_0_10px_rgba(0,255,102,0.3)]"
                >
                  Fintech Operations Associate
                </motion.p>
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-white/60 text-lg leading-relaxed max-w-md font-medium"
              >
                Optimizing high-scale financial infrastructure through risk assessment, fraud prevention, and seamless payment operations.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-6"
              >
                <Button size="lg" className="rounded-full px-10 bg-white hover:bg-white/90 text-[#1E2224] font-black h-14 shadow-2xl shadow-black/40 group">
                  Download CV <Download className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-10 border-white/20 text-white font-bold h-14 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all" onClick={() => setResumeOpen(true)}>
                  View Resume
                </Button>
              </motion.div>
            </div>

            {/* Right Column: Profile & Advanced Metrics */}
            <div className="flex items-center justify-center lg:justify-end gap-10">
              {/* Profile Image Frame with Biometric Scan */}
              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="relative h-[480px] w-80 rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                >
                  {/* Glowing Laser Scan Line */}
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-[2px] bg-[#00FF66] shadow-[0_0_20px_#00FF66,0_0_40px_#00FF66] z-20"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Monochrome Portrait */}
                  <img src="/ameer.png" className="h-full w-full object-cover grayscale brightness-110 contrast-125" alt="Ameer" />
                  
                  {/* Glassmorphic Pills */}
                  <div className="absolute top-8 left-8 flex flex-col gap-3">
                    <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#00FF66]/30 shadow-[0_0_15px_rgba(0,255,136,0.2)] text-[10px] text-[#00FF66] font-black uppercase flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse shadow-[0_0_8px_#00FF66]" /> ACTIVE
                    </div>
                    <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-white font-black uppercase flex items-center gap-2">
                      <Check size={12} className="text-[#00FF66]" /> KYC VERIFIED
                    </div>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute bottom-6 right-6 h-10 w-10 border-b-2 border-r-2 border-white/20 rounded-br-2xl" />
                </motion.div>
              </div>

              {/* High-Contrast Metrics Cards */}
              <div className="flex flex-col gap-6 w-60">
                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl group hover:border-[#00FF66]/30 transition-colors"
                >
                  <p className="text-6xl font-black text-white tracking-tighter group-hover:text-[#00FF66] transition-colors">40%</p>
                  <p className="text-[10px] font-black text-[#00FF66] uppercase tracking-[0.2em] mt-2">
                    FRAUD REDUCTION ↓
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl group hover:border-[#00FF66]/30 transition-colors"
                >
                  <p className="text-6xl font-black text-white tracking-tighter group-hover:text-[#00FF66] transition-colors">28%</p>
                  <p className="text-[10px] font-black text-[#00FF66] uppercase tracking-[0.2em] mt-2 uppercase tracking-widest">OPS EFFICIENCY ↑</p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-[#00FF66]/10 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-[#00FF66]/20 shadow-[0_20px_50px_rgba(0,255,136,0.1)]"
                >
                  <p className="text-[10px] font-black text-[#00FF66] uppercase tracking-[0.25em] mb-3">OPS - 24H</p>
                  <p className="text-3xl font-black text-white flex items-baseline gap-2">
                    524 <span className="text-sm text-[#00FF66] font-bold">+16.4%</span>
                  </p>
                  <p className="text-[9px] font-bold text-white/40 uppercase mt-2 tracking-tighter">TXNS MONITORED TODAY</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
