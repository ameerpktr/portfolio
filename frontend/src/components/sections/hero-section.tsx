"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Check, Download, Mail, Linkedin, Github, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { HolographicCard } from "@/components/ui/holographic-card";
import { DataMatrixBackground } from "@/components/system/data-matrix-background";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/ui-store";
import { socials } from "@/data/profile";

const CUBIC_BEZIER_TRANSITION = [0.25, 1, 0.5, 1];

// --- COUNTING NUMBER COMPONENT ---
function CountingNumber({ value, duration = 2 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const nodeRef = useRef(null);

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      onUpdate(value) {
        setDisplay(Math.round(value));
      },
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [value, duration]);

  return <span>{display}</span>;
}

export function HeroSection() {
  const [isIntro, setIsIntro] = useState(true);
  const [dashboardStage, setDashboardStage] = useState<"initial" | "final">("initial");
  const [mounted, setMounted] = useState(false);
  const setResumeOpen = useUiStore((state) => state.setResumeOpen);
  const { theme, setTheme } = useTheme();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
    // Intro Card sequence duration
    const introTimer = setTimeout(() => setIsIntro(false), 5000);
    
    // Auto-trigger the internal dashboard transformation after it mounts
    let transformTimer: NodeJS.Timeout;
    if (!isIntro) {
      transformTimer = setTimeout(() => setDashboardStage("final"), 2000);
    }

    const handleGlobalMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => {
      clearTimeout(introTimer);
      if (transformTimer) clearTimeout(transformTimer);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [isIntro, mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050606]">
      
      <AnimatePresence mode="wait">
        {isIntro ? (
          /* --- INTRO PHASE: 3D CARD & NEON TUNNEL --- */
          <motion.div 
            key="intro-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 0.8,
              filter: "blur(40px)",
              transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#050606]"
          >
            <div className="absolute inset-0 z-0">
              <DataMatrixBackground mouseX={mouseX} mouseY={mouseY} />
            </div>
            <div className="relative z-10">
              <HolographicCard />
            </div>
          </motion.div>
        ) : (
          /* --- DASHBOARD PHASE: FLUID TRANSFORMATION --- */
          <motion.div 
            key="dashboard-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative min-h-screen w-full bg-[#f4f6f5] dark:bg-[#0a0a0c] flex flex-col transition-colors duration-1000"
            style={{ 
              backgroundColor: dashboardStage === 'final' 
                ? (theme === 'dark' ? '#0a0a0c' : '#f4f6f5') 
                : (theme === 'dark' ? '#0a0a0c' : '#ffffff') 
            }}
          >
            {/* TOP NAVIGATION */}
            <motion.nav 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-20 grid grid-cols-3 items-center px-12 py-4"
            >
              <div /> {/* Left Spacer to balance grid */}
              <div className="flex justify-center gap-8 text-[13px] font-bold text-slate-800 dark:text-slate-200 tracking-tight">
                <a href="#about" className="hover:text-emerald-500 transition-colors">About</a>
                <a href="#experience" className="hover:text-emerald-500 transition-colors">Experience</a>
                <a href="#operations" className="hover:text-emerald-500 transition-colors">Operations</a>
                <a href="#contact" className="hover:text-emerald-500 transition-colors">Contact</a>
              </div>
              <div className="flex justify-end items-center gap-4">
                <button 
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <a href="/resume.docx" download="Ameer_M_Resume.docx">
                  <Button 
                    size="sm" 
                    className="bg-[#00845e] hover:bg-[#006b4d] text-white rounded-xl px-6 py-5 font-bold text-[13px] shadow-lg shadow-emerald-900/10"
                  >
                    Download CV
                  </Button>
                </a>
              </div>
            </motion.nav>

            {/* MAIN TRANSFORMATION AREA */}
            <div className="flex-1 relative z-10 max-w-7xl mx-auto w-full flex items-center px-10 gap-16 pb-0">
              
              {/* LEFT COLUMN: TYPOGRAPHY (Phase 1 -> Phase 2) */}
              <div className="flex-1 space-y-8">
                <div className="space-y-1 relative">
                  <motion.h1 
                    layout
                    className="font-display text-8xl font-black tracking-tighter text-slate-900 dark:text-white"
                  >
                    Ameer M
                  </motion.h1>
                  <motion.p 
                    layout
                    className="text-2xl text-slate-900 dark:text-slate-100 font-bold tracking-tight"
                  >
                    Fintech Operations Associate
                  </motion.p>
                </div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-500 dark:text-slate-400 text-[17px] leading-relaxed max-w-lg font-medium"
                >
                  Fintech Operations Associate with 3+ years of experience. Expert in fraud detection, SEON monitoring, customer onboarding, and AML/KYC compliance. Proven track record managing complex payment workflows (ACH, wire, RTP) and driving 40% reductions in fraud incidents while maintaining 99.9% operational accuracy.
                </motion.p>

                <motion.div layout className="flex items-center gap-4">
                  <Button 
                    onClick={() => setResumeOpen(true)}
                    size="lg" 
                    className="bg-[#00845e] hover:bg-[#006b4d] text-white rounded-2xl px-10 py-7 font-bold text-base shadow-xl shadow-emerald-900/20"
                  >
                    View My CV
                  </Button>
                  <a href="#experience">
                    <Button variant="outline" size="lg" className="rounded-2xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold h-14 px-8 hover:bg-slate-50 dark:hover:bg-slate-900">
                      View My Works
                    </Button>
                  </a>
                </motion.div>
              </div>

              {/* CENTER/RIGHT: PROFILE & DASHBOARD REVEAL */}
              <div className="flex items-center gap-8 relative">
                
                {/* PROFILE IMAGE WRAPPER (Allowing badges to overlay outside) */}
                <div className="relative">
                  {/* Active Badge (Pops in Phase 2) - Positioned relative to wrapper */}
                  <AnimatePresence>
                    {dashboardStage === "final" && (
                      <>
                        {/* KYC VERIFIED BADGE - Overlapping left edge */}
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute top-12 -left-16 z-30"
                        >
                          <div className="px-6 py-3 rounded-full bg-white/95 dark:bg-[#1a1c1e]/95 backdrop-blur-md shadow-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                            <span className="text-[13px] text-slate-800 dark:text-slate-200 font-black uppercase tracking-tight">KYC verified</span>
                            <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                              <Check size={14} className="text-white stroke-[4]" />
                            </div>
                          </div>
                        </motion.div>

                        {/* ACTIVE BADGE - Overlapping top edge */}
                        <motion.div 
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-6 left-1/2 -translate-x-1/2 z-30"
                        >
                          <div className="px-6 py-2 rounded-full bg-[#1a1c1e] shadow-2xl flex items-center gap-2.5 border border-slate-800 border-white/10">
                            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                            <span className="text-[12px] text-white font-black uppercase tracking-[0.15em]">ACTIVE</span>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>

                  <motion.div 
                    layout
                    className="relative rounded-[3rem] overflow-hidden border-[6px] border-white dark:border-[#1a1c1e] shadow-[0_40px_80px_rgba(0,0,0,0.08)] bg-slate-200 dark:bg-slate-800 z-20"
                    style={{ 
                      height: dashboardStage === "initial" ? "600px" : "520px",
                      width: dashboardStage === "initial" ? "440px" : "380px",
                    }}
                  >
                    <img src="/ameer.png" className="h-full w-full object-cover grayscale brightness-105 contrast-110" alt="Ameer" />
                    
                    {/* Bottom Stats Overlay (Reveals in Phase 3) */}
                    <AnimatePresence>
                      {dashboardStage === "final" && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-white/80 dark:from-[#0a0a0c]/80 to-transparent backdrop-blur-md border-t border-white/20 dark:border-white/5"
                        >
                          <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest">OPS - 24H</p>
                          <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">524 <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 ml-1 uppercase">TXNS MONITORED TODAY</span></p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* --- STAGE 3: DASHBOARD EXPANSION (From Right) --- */}
                <AnimatePresence>
                  {dashboardStage === "final" && (
                    <motion.div 
                      initial={{ opacity: 0, x: 100, width: 0 }}
                      animate={{ opacity: 1, x: 0, width: "auto" }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col gap-6"
                    >
                      {/* STAT CARD 1 */}
                      <motion.div 
                        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white dark:border-slate-800 shadow-[0_20px_40px_rgba(0,0,0,0.04)] dark:shadow-none w-64"
                      >
                        <p className="text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                          <CountingNumber value={40} />%
                        </p>
                        <div className="text-[40px] font-black text-slate-300 dark:text-slate-600 tracking-tighter leading-none mt-2 opacity-50 relative">
                           <CountingNumber value={25} />%
                           <div className="absolute top-1/2 left-0 w-full h-[3px] bg-slate-200 dark:bg-slate-700 -rotate-12" />
                        </div>
                        <div className="absolute top-6 right-6 flex flex-col items-end gap-0.5 opacity-20">
                          <div className="h-[2px] w-4 bg-slate-800 dark:bg-slate-200" />
                          <div className="h-[2px] w-6 bg-slate-800 dark:bg-slate-200" />
                        </div>
                        <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mt-4">FRAUD REDUCTION ↓</p>
                      </motion.div>
                      
                      {/* CHART CARD */}
                      <motion.div 
                        className="bg-[#1a1c1e] p-8 rounded-[2.5rem] shadow-2xl border border-slate-800 w-64 text-white"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest leading-none">Dashboard</p>
                            <p className="text-lg font-black text-white mt-1 uppercase">Operations</p>
                          </div>
                          <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-[10px] text-emerald-400 font-bold">+35% 5M</div>
                        </div>

                        {/* MINI CHART */}
                        <div className="h-20 w-full mt-6">
                          <svg viewBox="0 0 400 120" className="h-full w-full" preserveAspectRatio="none">
                            <motion.path
                              d="M0,100 C40,110 80,40 120,50 C160,60 200,90 240,85 C280,80 320,30 360,20 C400,10 440,10 440,10"
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="6"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 2, delay: 0.5 }}
                            />
                          </svg>
                        </div>
                        <p className="text-[9px] font-bold text-white/30 uppercase mt-4">524 TXNs MONITORED TODAY</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* BOTTOM SOCIAL LINKS */}
            <motion.footer 
              initial={{ opacity: 0 }}
              animate={{ opacity: dashboardStage === 'final' ? 1 : 0 }}
              className="relative z-20 flex justify-center gap-10 pb-2"
            >
               <a href={socials[0].href} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-200/50 hover:bg-slate-300/50 text-slate-800 transition-all hover:scale-110">
                 <Linkedin size={22} fill="currentColor" className="stroke-none" />
               </a>
               <a href={socials[1].href} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-slate-200/50 hover:bg-slate-300/50 text-slate-800 transition-all hover:scale-110">
                 <Github size={22} fill="currentColor" className="stroke-none" />
               </a>
               <a href={socials[2].href} className="p-3 rounded-full bg-slate-200/50 hover:bg-slate-300/50 text-slate-800 transition-all hover:scale-110">
                 <Mail size={22} fill="currentColor" className="stroke-none" />
               </a>
            </motion.footer>

            {/* Subtle Texture/Grain */}
            <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none bg-noise" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
