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
    <section className="relative min-h-screen w-full bg-[#050505] overflow-hidden">
      {/* 3D PERSPECTIVE MATRIX GRID */}
      <div className="absolute inset-0 [perspective:500px]">
        <div 
          className="absolute inset-0 opacity-20 [transform:rotateX(60deg)] scale-[2] bg-[linear-gradient(to_right,#00FF66_1px,transparent_1px),linear-gradient(to_bottom,#00FF66_1px,transparent_1px)] bg-[size:50px_50px]" 
          style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}
        />
      </div>

      <Navbar />

      <AnimatePresence mode="wait">
        {isIntro ? (
          <motion.div 
            key="intro"
            className="flex min-h-screen items-center justify-center"
            exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
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
              <p className="text-2xl text-[#00FF66] font-medium tracking-wide">Fintech Operations Associate</p>
              <p className="text-gray-400 max-w-md">Specializing in high-frequency fraud monitoring and scalable payment infrastructure.</p>
            </div>

            {/* Right Dashboard */}
            <div className="relative h-[500px] flex items-center justify-center">
              {/* Profile Image Frame */}
              <div className="relative h-96 w-72 rounded-[2rem] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10 bg-black/40 backdrop-blur-md">
                {/* Neon Laser Scan */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#00FF66] shadow-[0_0_12px_#00FF66] z-20 animate-scan" />
                <img src="/ameer.png" className="h-full w-full object-cover grayscale brightness-90" />
                
                {/* Pills */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="px-3 py-1 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/50 text-[10px] text-[#00FF66] font-bold uppercase shadow-[0_0_10px_rgba(0,255,102,0.3)]">Active</div>
                  <div className="px-3 py-1 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/50 text-[10px] text-[#00FF66] font-bold uppercase flex items-center gap-1 shadow-[0_0_10px_rgba(0,255,102,0.3)]"><Check size={10} /> KYC</div>
                </div>
              </div>

              {/* Metrics UI */}
              <div className="absolute -right-16 top-20 w-64 space-y-4">
                <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-xl">
                  <p className="text-4xl font-black text-white">40%</p>
                  <p className="text-[10px] text-[#00FF66] uppercase tracking-[0.2em]">Fraud ↓ YOY</p>
                </div>
                <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-xl">
                  <p className="text-xs text-white font-bold mb-1">OPS - 24H</p>
                  <p className="text-2xl font-black text-white">524 <span className="text-sm font-normal text-[#00FF66]">+16.4%</span></p>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">TXNS MONITORED TODAY</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        .animate-scan {
          animation: scan 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
