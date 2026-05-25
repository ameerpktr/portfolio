"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Mail, Linkedin, Github, Sun, Moon } from "lucide-react";
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

  // Smooth out mouse movement for cinematic feel
  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 100 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 100 });

  // Map mouse position to 3D rotation and subtle translation
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
  const translateX = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const translateY = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    setMounted(true);
    const introTimer = setTimeout(() => setIsIntro(false), 3500);
    let transformTimer: NodeJS.Timeout;
    if (!isIntro) {
      transformTimer = setTimeout(() => setDashboardStage("final"), 100);
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

  // --- ANIMATION VARIANTS ---

  // B. Left Column Content
  const leftColumnVariants = {
    initial: { opacity: 0, x: -40 },
    animate: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.8, 
        ease: CUBIC_BEZIER_TRANSITION,
        staggerChildren: 0.1,
        delayChildren: 0.4 
      } 
    }
  };

  const leftItemVariants = {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: CUBIC_BEZIER_TRANSITION } }
  };

  // C. Right Column Content
  const rightColumnVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.8, 
        ease: CUBIC_BEZIER_TRANSITION,
        staggerChildren: 0.15,
        delayChildren: 0.4 
      } 
    }
  };

  const rightItemVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: CUBIC_BEZIER_TRANSITION } }
  };

  // D. Overlays & Badges
  const badgeVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        delay: 1.0, 
        duration: 0.5, 
        ease: CUBIC_BEZIER_TRANSITION 
      } 
    }
  };

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
              scale: 0.9,
              filter: "blur(20px)",
              transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
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
            initial="initial"
            animate="animate"
            className="relative min-h-screen w-full bg-[#f4f6f5] dark:bg-[#050505] flex flex-col transition-colors duration-1000 overflow-hidden"
            style={{ backgroundColor: theme === 'dark' ? '#050505' : '#f4f6f5' }}
          >
            {/* E. Navbar */}
            <motion.nav 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: CUBIC_BEZIER_TRANSITION }}
              className="relative z-20 w-full grid grid-cols-3 items-center px-6 lg:px-12 py-6"
            >
              <div />
              <div className="flex justify-center gap-4 lg:gap-8 text-[11px] lg:text-[13px] font-bold text-slate-800 dark:text-slate-400 tracking-tight">
                <a href="#about" className="hover:text-slate-900 dark:hover:text-[#d97706] transition-colors">About</a>
                <a href="#experience" className="hover:text-slate-900 dark:hover:text-[#d97706] transition-colors">Experience</a>
                <a href="#operations" className="hover:text-slate-900 dark:hover:text-[#d97706] transition-colors">Operations</a>
                <a href="#contact" className="hover:text-slate-900 dark:hover:text-[#d97706] transition-colors">Contact</a>
              </div>
              <div className="flex justify-end items-center gap-2 lg:gap-4">
                <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-full text-slate-600 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all">
                  {theme === "dark" ? <Sun size={18} className="text-[#d97706]" /> : <Moon size={18} />}
                </button>
                <a href="/resume.docx" download="Ameer_M_Resume.docx">
                  <Button className="bg-[#00845e] dark:bg-[#d97706] text-white rounded-xl px-4 py-4 font-bold text-[11px] lg:text-[13px] hover:opacity-90 transition-opacity">Download CV</Button>
                </a>
              </div>
            </motion.nav>

            {/* DASHBOARD CONTENT */}
            <div className="flex-1 relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-center px-6 gap-8 lg:gap-12">
              
              {/* B. Left Column Content */}
              <motion.div 
                variants={leftColumnVariants}
                className="w-full lg:flex-1 space-y-6 text-center lg:text-left order-2 lg:order-1"
              >
                <motion.h1 variants={leftItemVariants} className="font-display text-5xl lg:text-8xl font-black tracking-tighter text-slate-900 dark:text-[#f8fafc]">Ameer M</motion.h1>
                <motion.p variants={leftItemVariants} className="text-xl lg:text-2xl text-[#00845e] dark:text-[#d97706] font-bold uppercase tracking-wider">Fintech Operations Associate</motion.p>
                <motion.div variants={leftItemVariants} className="bg-emerald-500/10 dark:bg-[#d97706]/10 border-l-4 border-emerald-500 dark:border-[#d97706] p-4 rounded-r-xl">
                  <p className="text-slate-700 dark:text-slate-200 text-sm lg:text-[17px] leading-relaxed">
                    <span className="font-bold text-slate-900 dark:text-[#d97706]">Proven Impact:</span> Supported fraud prevention processes and improved workflow efficiency.
                  </p>
                </motion.div>
                <motion.p variants={leftItemVariants} className="text-slate-500 dark:text-slate-400 text-sm lg:text-[17px] leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Building secure fintech ecosystems through advanced fraud intelligence, rigorous AML/KYC compliance, and seamless operational workflows.
                </motion.p>
                {/* Prominent Contact Buttons */}
                <motion.div variants={leftItemVariants} className="flex items-center justify-center lg:justify-start gap-4">
                  <Button onClick={() => setResumeOpen(true)} className="rounded-2xl px-8 bg-[#00845e] dark:bg-[#d97706] text-white font-bold hover:opacity-90 transition-all">View My CV</Button>
                  <a href="#experience"><Button variant="ghost" className="rounded-2xl border-slate-200 dark:border-slate-800 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-900">View My Works</Button></a>
                  
                  {/* LinkedIn & Mail */}
                  <div className="flex gap-2 ml-2">
                    <a href={socials.find(s => s.label === 'Linkedin')?.href} target="_blank" className="p-3 rounded-2xl bg-white/50 dark:bg-[#1a1c1e] hover:bg-[#0077b5]/10 text-slate-800 dark:text-[#d97706] hover:text-[#0077b5] transition-all border border-slate-200 dark:border-slate-800">
                      <Linkedin size={20} />
                    </a>
                    <a href={`mailto:${socials.find(s => s.label === 'Mail')?.href}`} className="p-3 rounded-2xl bg-white/50 dark:bg-[#1a1c1e] hover:bg-[#d97706]/10 text-slate-800 dark:text-[#d97706] transition-all border border-slate-200 dark:border-slate-800">

                      <Mail size={20} />
                    </a>
                  </div>
                </motion.div>
              </motion.div>

              {/* A. The Central Portrait Image */}
              <div className="relative order-1 lg:order-2" style={{ perspective: "1200px" }}>
                <motion.div
                  initial={{ scale: 1.6, opacity: 0.8, filter: "blur(5px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  style={{ 
                    rotateX, 
                    rotateY, 
                    x: translateX, 
                    y: translateY, 
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center" 
                  }}
                  transition={{ duration: 1.5, ease: CUBIC_BEZIER_TRANSITION }}
                  className="relative h-[380px] w-[260px] lg:h-[500px] lg:w-[360px] rounded-[2rem] overflow-hidden border-[4px] border-white dark:border-[#1a1c1e] bg-slate-200 dark:bg-slate-900 z-20 shadow-2xl"
                >
                  <img src="/ameer.png" className="h-full w-full object-cover grayscale brightness-110" alt="Ameer" />
                  
                  {/* D. Overlays ('524 Txns') */}
                  {dashboardStage === "final" && (
                    <motion.div 
                      variants={badgeVariants}
                      className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-white/90 to-transparent dark:from-[#050505]/95"
                    >
                      <p className="text-[9px] font-bold text-slate-800 dark:text-[#d97706] uppercase">OPS - 24H</p>
                      <p className="text-xl font-black text-slate-900 dark:text-[#f8fafc]">524 <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400">TXNS TODAY</span></p>
                    </motion.div>
                  )}
                </motion.div>

                {/* D. Badges ('KYC Verified', 'Active') */}
                <motion.div 
                  variants={badgeVariants}
                  className="absolute top-4 -left-4 z-30 px-4 py-2 rounded-full bg-white/95 dark:bg-[#0a0a0c] shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-2"
                >
                  <span className="text-[10px] uppercase font-black text-slate-800 dark:text-slate-300">KYC verified</span>
                  <div className="h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center"><Check size={8} className="text-white" /></div>
                </motion.div>
                <motion.div 
                  variants={badgeVariants}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 px-4 py-1 rounded-full bg-slate-900 shadow-xl flex items-center gap-2"
                >
                    <div className="h-2 w-2 rounded-full bg-[#d97706] animate-pulse" />
                    <span className="text-[10px] text-white font-black uppercase tracking-widest">ACTIVE</span>
                </motion.div>
              </div>

              {/* C. Right Column Content */}
              <motion.div 
                variants={rightColumnVariants}
                className="flex flex-row lg:flex-col gap-4 order-3"
              >
                <motion.div variants={rightItemVariants} className="bg-white/80 dark:bg-[#0f1115] p-6 rounded-2xl shadow-xl w-32 lg:w-48 border border-transparent dark:border-slate-800/50">
                  <p className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-[#f8fafc]"><CountingNumber value={40} />%</p>
                  <p className="text-[9px] font-black text-emerald-600 dark:text-[#d97706] uppercase mt-1">FRAUD ↓</p>
                </motion.div>
                <motion.div variants={rightItemVariants} className="bg-[#1a1c1e] dark:bg-[#0f1115] p-6 rounded-2xl shadow-xl w-32 lg:w-48 text-white border border-transparent dark:border-slate-800/50">
                  <p className="text-lg font-black uppercase leading-tight dark:text-slate-200">Operations</p>
                  <div className="h-12 w-full mt-2">
                      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full"><motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2, duration: 1.5 }} d="M0,30 Q25,10 50,25 T100,10" fill="none" stroke={theme === 'dark' ? '#d97706' : '#10b981'} strokeWidth="4" /></svg>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* E. Footer */}
            <footer className="relative z-20 w-full flex justify-center gap-6 py-6">
              {[Linkedin, Github, Mail].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + (i * 0.1), duration: 0.8, ease: CUBIC_BEZIER_TRANSITION }}
                  href={socials[i].href} 
                  className="p-2 rounded-full bg-slate-200/50 dark:bg-slate-900/50 hover:bg-slate-300 dark:hover:bg-[#d97706]/20 transition-all text-slate-800 dark:text-[#d97706]"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
