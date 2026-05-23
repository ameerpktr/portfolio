"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Activity, TrendingDown } from "lucide-react";
import { Navbar } from "@/components/system/navbar";
import { HolographicCard } from "@/components/ui/holographic-card";

export function HeroSection() {
  const [isIntro, setIsIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsIntro(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0c] overflow-hidden">
      {/* MATRIX GRID BACKGROUND */}
      <div className="absolute inset-0 perspective-[1000px] opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff41_1px,transparent_1px),linear-gradient(to_bottom,#00ff41_1px,transparent_1px)] bg-[size:50px_50px] [transform:rotateX(60deg)] scale-[2]" />
      </div>

      <Navbar />

      <AnimatePresence mode="wait">
        {isIntro ? (
          <motion.div 
            key="intro"
            className="flex min-h-screen items-center justify-center"
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <HolographicCard />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative grid min-h-screen max-w-7xl mx-auto items-center lg:grid-cols-2 px-10"
          >
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="font-display text-8xl font-black tracking-tighter text-white">AMEER M</h1>
              <p className="text-2xl text-emerald-400 font-medium">Fintech Operations Associate</p>
              <div className="space-y-4 text-gray-400">
                <p>Specializing in fraud monitoring and payment ops.</p>
              </div>
            </div>

            {/* Right Dashboard */}
            <div className="relative h-[500px] flex items-center justify-center">
              {/* Profile Image Frame */}
              <div className="relative h-96 w-72 rounded-[2rem] border border-white/10 bg-black/40 overflow-hidden backdrop-blur-md">
                {/* Laser Scan Effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_20px_#10b981] z-20 animate-scan" />
                <img src="/ameer.png" className="h-full w-full object-cover grayscale" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="px-2 py-1 rounded bg-emerald-900/50 border border-emerald-500/50 text-[10px] text-emerald-400 font-bold uppercase">Active</div>
                  <div className="px-2 py-1 rounded bg-emerald-900/50 border border-emerald-500/50 text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1"><Check size={10} /> KYC</div>
                </div>
              </div>

              {/* Metrics */}
              <div className="absolute -right-20 top-20 w-64 space-y-4">
                <div className="p-6 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl">
                  <p className="text-4xl font-black text-white">40%</p>
                  <p className="text-xs text-emerald-400 uppercase tracking-widest">Fraud ↓ YOY</p>
                </div>
                <div className="p-6 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl">
                  <p className="text-sm text-white font-bold">OPS - 24H</p>
                  <p className="text-2xl font-black text-white">524 <span className="text-sm font-normal text-emerald-400">+16.4%</span></p>
                  <p className="text-[10px] text-gray-500">TXNS MONITORED TODAY</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
