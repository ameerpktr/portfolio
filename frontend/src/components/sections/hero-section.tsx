"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BarChart3, Check, ChevronUp, Download, Eye, Github, Linkedin, Mail, ShieldCheck, Zap } from "lucide-react";
import { Navbar } from "@/components/system/navbar";
import { Button } from "@/components/ui/button";
import { socials } from "@/data/profile";

import { useUiStore } from "@/store/ui-store";

const words = "Fintech Operations Associate".split(" ");

export function HeroSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const setResumeOpen = useUiStore((state) => state.setResumeOpen);
  
  // Motion values for global tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for "fluency"
  const springConfig = { stiffness: 150, damping: 30 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Map mouse position to rotation
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    setMounted(true);

    const handleGlobalMouseMove = (e: MouseEvent) => {
      // Normalize mouse position between -0.5 and 0.5
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="hero" className="noise-edge relative min-h-[75vh] overflow-hidden px-4 pb-4 pt-28 sm:px-6 lg:px-8">
      <Navbar />
      <div className="absolute inset-0 bg-radial-grid bg-[length:22px_22px] opacity-[0.14] dark:opacity-[0.045]" />
      <motion.div className="absolute right-[12%] top-24 h-80 w-80 rounded-full bg-primary/10 blur-[90px]" animate={{ x: [-20, 24, -20], y: [0, 18, 0] }} transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }} />

      <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl items-center gap-10 lg:grid-cols-[0.98fr_1.02fr]">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.055 } } }}>
          <motion.div variants={{ hidden: { opacity: 0, y: 28, filter: "blur(12px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-[13px] font-extrabold uppercase tracking-[0.14em] text-primary">
            <ShieldCheck className="h-4 w-4" />
            Fintech operations - problem solver
          </motion.div>
          <motion.h1 className="font-display text-7xl font-extrabold tracking-[-0.06em] text-foreground sm:text-8xl" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.055 } } }}>
            <motion.span variants={{ hidden: { opacity: 0, y: 36, filter: "blur(12px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } } }} className="block">
              Ameer M
            </motion.span>
            <span className="mt-6 block max-w-2xl overflow-hidden text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
              {words.map((word, index) => (
                <motion.span key={`${word}-${index}`} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.48 } } }} className={`mr-2 inline-block ${word === "&" ? "accent-text" : "text-gradient"}`}>
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>
          <motion.p variants={{ hidden: { opacity: 0, y: 28, filter: "blur(12px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }} className="mt-8 max-w-2xl text-base font-medium leading-8 text-muted">
            Specialized in fraud monitoring, payment operations, compliance workflows, and scalable fintech solutions - optimizing the next wave of operational excellence.
          </motion.p>
          <motion.div variants={{ hidden: { opacity: 0, y: 28, filter: "blur(12px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }} className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#operations">
              <Button className="h-12 rounded-xl px-7 text-sm">
                View My Work
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Button>
            </a>
            <Button variant="secondary" className="h-12 rounded-xl px-7 text-sm" onClick={() => setResumeOpen(true)}>
              View My Resume
              <Eye className="h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 28, filter: "blur(12px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }} className="mt-10 flex gap-4">
            {socials.slice(0, 3).map((social, index) => {
              const Icon = [Linkedin, Github, Mail][index];
              return (
                <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border bg-card p-4 text-foreground shadow-sm transition hover:-translate-y-1 hover:border-primary/50 hover:text-primary dark:bg-card" aria-label={social.label}>
                  <Icon className="h-6 w-6" />
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.96, filter: "blur(14px)" }} 
          animate={{ 
            opacity: 1, 
            scale: 1, 
            filter: "blur(0px)"
          }} 
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} 
          className="relative hidden h-[42rem] lg:block"
          style={{ 
            transformStyle: "preserve-3d",
            rotateX,
            rotateY,
            perspective: 1000
          }}
        >
          {/* Background Glow */}
          <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.15),transparent_50%)]" />
          
          {/* Photo & UI Centered Wrapper */}
          <div className="relative mx-auto h-full w-[26rem]">
            
            {/* Main Photo Frame */}
            <motion.div 
              className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-primary/20 bg-card shadow-2xl dark:border-primary/10"
              style={{ transform: "translateZ(20px)" }}
            >
              <motion.img 
                src="/ameer.png" 
                alt="Ameer M" 
                className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Inner frame text */}
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Portrait - 2026</p>
                <h2 className="mt-1 font-display text-3xl font-extrabold tracking-tight">Ameer M</h2>
                <p className="text-xs font-semibold opacity-80">Fintech Operations Associate</p>
              </div>

              {/* Corner Decor */}
              <div className="absolute bottom-6 left-6 h-4 w-4 border-b-2 border-l-2 border-white/20" />
            </motion.div>

            {/* Floating UI Elements aligned to border sides */}
            
            {/* ACTIVE Badge */}
            <motion.div 
              className="absolute -left-6 top-8 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur-md"
              style={{ transform: "translateZ(50px)" }}
            >
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Active</span>
            </motion.div>

            {/* ID Badge */}
            <motion.div 
              className="absolute -right-6 top-8 rounded-full border border-white/10 bg-black/40 px-4 py-1.5 backdrop-blur-md"
              style={{ transform: "translateZ(40px)" }}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">ID - AM-001</span>
            </motion.div>

            {/* KYC Card */}
            <motion.div 
              className="absolute -left-16 top-32 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-lg"
              style={{ transform: "translateZ(80px)" }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white">KYC verified</p>
                <p className="text-[9px] font-medium text-white/50 uppercase tracking-tight">client #048</p>
              </div>
            </motion.div>

            {/* Fraud YoY Card */}
            <motion.div 
              className="absolute -right-16 top-[38%] flex items-center gap-4 rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-lg"
              style={{ transform: "translateZ(100px)" }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <ChevronUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white leading-none">40%</p>
                <p className="mt-1 text-[10px] font-bold text-white/50 uppercase tracking-wider">fraud &darr; YoY</p>
              </div>
            </motion.div>

            {/* SEON Pill */}
            <motion.div 
              className="absolute -left-12 bottom-[24%] rounded-full border border-white/10 bg-black/40 px-5 py-2 backdrop-blur-md"
              style={{ transform: "translateZ(60px)" }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">SEON - ZOHO - AML</span>
            </motion.div>

            {/* Live Dashboard Panel */}
            <motion.div 
              className="absolute -bottom-8 -right-12 w-56 rounded-2xl border border-white/10 bg-black/60 p-3 shadow-2xl backdrop-blur-xl"
              style={{ transform: "translateZ(120px)" }}
            >
              <div className="flex items-center justify-between">
                <p className="text-[8px] font-bold uppercase tracking-widest text-white/40">Ops - 24H</p>
                <span className="text-[8px] font-bold text-emerald-400">+12%</span>
              </div>
              <div className="mt-2 flex items-end justify-between">
                <div>
                  <p className="text-2xl font-extrabold text-white">524</p>
                  <p className="mt-0.5 text-[7px] font-bold text-white/40 uppercase">txns monitored today</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <div className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
                    <span className="text-[8px] font-black uppercase tracking-tighter text-emerald-500">Live</span>
                  </div>
                  <p className="mt-0.5 text-[7px] font-bold text-white/40 uppercase">Kerala - IN</p>
                </div>
              </div>
              {/* Mini Area Chart */}
              <div className="mt-3 h-6 w-full overflow-hidden">
                <svg viewBox="0 0 100 40" className="h-full w-full" preserveAspectRatio="none">
                  <path d="M0 40 L0 35 L10 32 L20 37 L30 25 L40 28 L50 15 L60 20 L70 10 L80 15 L90 5 L100 8 L100 40 Z" fill="url(#grad)" />
                  <path d="M0 35 L10 32 L20 37 L30 25 L40 28 L50 15 L60 20 L70 10 L80 15 L90 5 L100 8" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0.3 }} />
                      <stop offset="100%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0 }} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

