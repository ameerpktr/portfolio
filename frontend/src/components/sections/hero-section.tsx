"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Check, Download, Mail, Linkedin, Github, Sun, Moon, Activity, TrendingDown } from "lucide-react";
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
  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      onUpdate(value) { setDisplay(Math.round(value)); },
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
    const introTimer = setTimeout(() => setIsIntro(false), 5000);
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
            <div className="relative z-10"><HolographicCard /></div>
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative min-h-screen w-full bg-[#f4f6f5] dark:bg-[#0a0a0c] flex flex-col transition-colors duration-1000"
            style={{ backgroundColor: theme === 'dark' ? '#0a0a0c' : '#f4f6f5' }}
          >
            {/* Nav */}
            <motion.nav className="relative z-20 grid grid-cols-3 items-center px-6 lg:px-12 py-4">
              <div />
              <div className="flex justify-center gap-4 lg:gap-8 text-[11px] lg:text-[13px] font-bold text-slate-800 dark:text-slate-200 tracking-tight">
                <a href="#about">About</a><a href="#experience">Experience</a><a href="#operations">Operations</a><a href="#contact">Contact</a>
              </div>
              <div className="flex justify-end items-center gap-2 lg:gap-4">
                <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-full text-slate-600 dark:text-slate-400">
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <a href="/resume.docx" download="Ameer_M_Resume.docx">
                  <Button size="sm" className="bg-[#00845e] text-white rounded-xl px-4 py-4 font-bold text-[11px] lg:text-[13px]">Download CV</Button>
                </a>
              </div>
            </motion.nav>

            {/* Content */}
            <div className="flex-1 relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-center px-6 gap-8 pb-10">
              <div className="w-full lg:flex-1 space-y-6 text-center lg:text-left">
                <h1 className="font-display text-5xl lg:text-8xl font-black tracking-tighter text-slate-900 dark:text-white">Ameer M</h1>
                <p className="text-xl lg:text-2xl text-[#16FF00] font-bold uppercase">Fintech Operations Associate</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm lg:text-[17px] leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Fintech Operations Associate with 3+ years of experience. Expert in fraud detection, SEON monitoring, customer onboarding, and AML/KYC compliance.
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <Button onClick={() => setResumeOpen(true)} size="lg" className="rounded-2xl px-8 bg-[#00845e] text-white font-bold">View My CV</Button>
                  <a href="#experience"><Button variant="outline" size="lg" className="rounded-2xl border-slate-200 dark:border-slate-800 font-bold">View My Works</Button></a>
                </div>
              </div>

              {/* Profile Image & Dashboard Reveal */}
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="relative">
                  {dashboardStage === "final" && (
                    <>
                      <div className="absolute top-4 -left-4 z-30 px-4 py-2 rounded-full bg-white/95 dark:bg-black/80 shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                        <span className="text-[10px] uppercase font-black text-slate-800 dark:text-slate-200">KYC verified</span>
                        <div className="h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center"><Check size={8} className="text-white" /></div>
                      </div>
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 px-4 py-1 rounded-full bg-slate-900 shadow-xl flex items-center gap-2">
                         <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-[10px] text-white font-black uppercase">ACTIVE</span>
                      </div>
                    </>
                  )}
                  <div className="relative h-[400px] w-[280px] lg:h-[520px] lg:w-[380px] rounded-[2rem] overflow-hidden border-[4px] border-white dark:border-[#1a1c1e] bg-slate-200 dark:bg-slate-800">
                    <img src="/ameer.png" className="h-full w-full object-cover grayscale brightness-110" alt="Ameer" />
                    {dashboardStage === "final" && (
                      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-white/90 to-transparent">
                        <p className="text-[9px] font-bold text-slate-800 uppercase">OPS - 24H</p>
                        <p className="text-xl font-black text-slate-900">524 <span className="text-[9px] font-bold text-slate-500">TXNS TODAY</span></p>
                      </div>
                    )}
                  </div>
                </div>

                {dashboardStage === "final" && (
                  <div className="flex flex-row lg:flex-col gap-4">
                    <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-2xl shadow-xl w-32 lg:w-48">
                      <p className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white"><CountingNumber value={40} />%</p>
                      <p className="text-[9px] font-black text-emerald-600 uppercase mt-1">FRAUD ↓</p>
                    </div>
                    <div className="bg-[#1a1c1e] p-6 rounded-2xl shadow-xl w-32 lg:w-48 text-white">
                      <p className="text-lg font-black uppercase leading-tight">Operations</p>
                      <div className="h-12 w-full mt-2">
                         <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full"><motion.path d="M0,30 Q25,10 50,25 T100,10" fill="none" stroke="#10b981" strokeWidth="4" /></svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <footer className="relative z-20 flex justify-center gap-6 pb-6">
              {[Linkedin, Github, Mail].map((Icon, i) => (
                <a key={i} href={socials[i].href} className="p-2 rounded-full bg-slate-200/50 hover:bg-slate-300 transition-all text-slate-800"><Icon size={18} /></a>
              ))}
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
