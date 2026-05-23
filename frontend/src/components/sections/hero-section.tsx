"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Download, Eye, Activity, TrendingDown } from "lucide-react";
import { Navbar } from "@/components/system/navbar";
import { HolographicCard } from "@/components/ui/holographic-card";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/ui-store";

const CUBIC_BEZIER_TRANSITION = [0.25, 1, 0.5, 1];

// Background Neon Light Beam Configurations
const BEAMS = [
  { left: "15%", top: "-10%", width: "2px", height: "40%", rotate: "25deg", delay: 0 },
  { left: "40%", top: "20%", width: "1px", height: "50%", rotate: "-15deg", delay: 1 },
  { left: "65%", top: "-5%", width: "3px", height: "35%", rotate: "35deg", delay: 0.5 },
  { left: "80%", top: "40%", width: "1px", height: "60%", rotate: "-20deg", delay: 2 },
  { left: "25%", top: "50%", width: "2px", height: "45%", rotate: "10deg", delay: 1.5 },
];

export function HeroSection() {
  const [isIntro, setIsIntro] = useState(true);
  const setResumeOpen = useUiStore((state) => state.setResumeOpen);

  useEffect(() => {
    const timer = setTimeout(() => setIsIntro(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0b] overflow-hidden">
      
      {/* DYNAMIC 3D MATRIX BACKGROUND MOTION */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 [perspective:1000px]">
          <motion.div 
            className="absolute inset-0 opacity-[0.25]"
            initial={{ rotateX: 60, scale: 2.5, y: "-15%" }}
            animate={{ 
              backgroundPositionY: ["0px", "60px"],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{ 
              background: `
                linear-gradient(to right, #00FF66 1px, transparent 1px),
                linear-gradient(to bottom, #00FF66 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              maskImage: "linear-gradient(to bottom, transparent, black 40%, black 60%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 40%, black 60%, transparent)"
            }}
          />
        </div>

        {/* NEON LIGHT BEAMS (Specific Streaks from Reference) */}
        {isIntro && BEAMS.map((beam, i) => (
          <motion.div
            key={i}
            className="absolute z-0"
            style={{
              left: beam.left,
              top: beam.top,
              width: beam.width,
              height: beam.height,
              rotate: beam.rotate,
              background: "linear-gradient(to bottom, transparent, #00FF66, transparent)",
              boxShadow: "0 0 15px #00FF66, 0 0 30px #00FF66",
              opacity: 0.4
            }}
            animate={{ 
              y: [-20, 20, -20],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 6 + i, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: beam.delay 
            }}
          />
        ))}

        {/* BACKGROUND AMBIENT NEON PULSE */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #00FF66 0%, transparent 70%)"
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Navbar />

      <AnimatePresence mode="wait">
        {isIntro ? (
          <motion.div 
            key="intro"
            className="flex min-h-screen items-center justify-center relative z-50"
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
            className="relative z-10 grid min-h-screen max-w-7xl mx-auto items-center lg:grid-cols-2 px-10 gap-16"
          >
            {/* Left Column: Typography */}
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

            {/* Right Column: Profile Image */}
            <div className="flex items-center justify-center lg:justify-end gap-10">
              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  className="relative h-[480px] w-80 rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                >
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-[2px] bg-[#00FF66] shadow-[0_0_20px_#00FF66,0_0_40px_#00FF66] z-20"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <img src="/ameer.png" className="h-full w-full object-cover grayscale brightness-110 contrast-125" alt="Ameer" />
                  <div className="absolute top-8 left-8 flex flex-col gap-3">
                    <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#00FF66]/30 shadow-[0_0_15px_rgba(0,255,136,0.2)] text-[10px] text-[#00FF66] font-black uppercase flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse shadow-[0_0_8px_#00FF66]" /> ACTIVE
                    </div>
                    <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-white font-black uppercase flex items-center gap-2">
                      <Check size={12} className="text-[#00FF66]" /> KYC VERIFIED
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-6 h-10 w-10 border-b-2 border-r-2 border-white/20 rounded-br-2xl" />
                </motion.div>
              </div>

              {/* Metrics Cards */}
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
