"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Download } from "lucide-react";
import { Navbar } from "@/components/system/navbar";
import { HolographicCard } from "@/components/ui/holographic-card";
import { Button } from "@/components/ui/button";

const words = "Fintech Operations Associate".split(" ");

export function HeroSection() {
  const [isIntro, setIsIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsIntro(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-[#F4F6F5] overflow-hidden">
      {/* GEOMETRIC LINE GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.12]">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern id="geo-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#22C55E" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="1.5" fill="#22C55E" opacity="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#geo-grid)" />
        </svg>
      </div>

      <Navbar />

      <AnimatePresence mode="wait">
        {isIntro ? (
          <motion.div 
            key="intro"
            className="flex min-h-screen items-center justify-center relative z-50"
            exit={{ 
              opacity: 0, 
              scale: 0.8,
              x: -200,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }}
          >
            <motion.div 
              animate={{ 
                rotateY: [10, -10, 10],
                rotateX: [2, -2, 2],
                y: [0, -15, 0] 
              }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <HolographicCard />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 grid min-h-screen max-w-7xl mx-auto items-center lg:grid-cols-2 px-10 gap-12"
          >
            {/* Left Column: Typography & CTAs */}
            <div className="space-y-8">
              <div className="space-y-2">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-display text-8xl font-black tracking-tighter text-slate-900"
                >
                  AMEER M
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl text-emerald-600 font-bold tracking-tight uppercase"
                >
                  Fintech Operations Associate
                </motion.p>
              </div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-slate-500 text-lg leading-relaxed max-w-md"
              >
                Specialized in fraud monitoring, payment systems, and scalable fintech infrastructure with a focus on operational integrity.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4"
              >
                <Button size="lg" className="rounded-full px-8 bg-slate-900 hover:bg-slate-800 text-white font-bold h-14 shadow-lg shadow-slate-200">
                  Download CV <Download className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8 border-slate-200 text-slate-600 font-bold h-14 bg-white/50 backdrop-blur-sm">
                  View Experience
                </Button>
              </motion.div>
            </div>

            {/* Right Column: Profile & Metrics */}
            <div className="flex items-center justify-between gap-8">
              {/* Profile Image Frame */}
              <div className="relative group">
                <div className="relative h-[450px] w-80 rounded-[3rem] overflow-hidden border-[12px] border-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] bg-slate-100">
                  {/* Glowing Laser Scan */}
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-1.5 bg-[#22C55E] shadow-[0_0_20px_#22C55E] z-20"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <img src="/ameer.png" className="h-full w-full object-cover grayscale brightness-105" alt="Ameer" />
                  
                  {/* Status Pills */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur shadow-sm border border-slate-100 text-[10px] text-emerald-600 font-black uppercase flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> ACTIVE
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur shadow-sm border border-slate-100 text-[10px] text-slate-800 font-black uppercase flex items-center gap-1.5">
                      <Check size={10} className="text-emerald-500" /> KYC VERIFIED
                    </div>
                  </div>
                </div>
              </div>

              {/* Stacked Metrics Cards */}
              <div className="flex flex-col gap-6 w-56">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white p-7 rounded-[2rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] border border-slate-50"
                >
                  <p className="text-5xl font-black text-slate-900 tracking-tighter">40%</p>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1 flex items-center gap-1">
                    FRAUD ↓ <span className="opacity-50 text-slate-400">YOY</span>
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white p-7 rounded-[2rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] border border-slate-50"
                >
                  <p className="text-5xl font-black text-slate-900 tracking-tighter">28%</p>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">OPS EFFICIENCY ↑</p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-slate-900 p-7 rounded-[2rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)] text-white"
                >
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">OPS - 24H</p>
                  <p className="text-2xl font-black flex items-baseline gap-2">
                    524 <span className="text-xs text-emerald-400 font-bold">+16.4%</span>
                  </p>
                  <p className="text-[8px] font-bold text-white/30 uppercase mt-1">TXNS MONITORED TODAY</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
