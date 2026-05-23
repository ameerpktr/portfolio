"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Eye, Github, Linkedin, Mail, ShieldCheck, Activity, Shield, TrendingDown } from "lucide-react";
import { Navbar } from "@/components/system/navbar";
import { Button } from "@/components/ui/button";
import { socials } from "@/data/profile";
import { useUiStore } from "@/store/ui-store";
import { HolographicCard } from "@/components/ui/holographic-card";

const words = "Fintech Operations Associate".split(" ");

/**
 * CINEMATIC MOTION CONSTANTS
 */
const CUBIC_BEZIER = [0.22, 1, 0.36, 1];
const SPRING_CONFIG = { stiffness: 100, damping: 20, mass: 1 };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: CUBIC_BEZIER },
  },
};

const portraitVariants = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(15px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: CUBIC_BEZIER, delay: 0.6 },
  },
};

const widgetVariants = {
  hidden: { opacity: 0, scale: 0, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", ...SPRING_CONFIG, delay: 1.2 + i * 0.15 },
  }),
};

const floatAnimation = (delay: number) => ({
  y: [0, -10, 0],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay },
});

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [isIntro, setIsIntro] = useState(true);
  const setResumeOpen = useUiStore((state) => state.setResumeOpen);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 30 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);
  const ambientGlowBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(600px circle at ${((x as number) + 0.5) * 100}% ${((y as number) + 0.5) * 100}%, hsl(var(--primary)), transparent)`
  );

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsIntro(false), 3000);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <section id="hero" className="noise-edge relative min-h-[95vh] overflow-hidden bg-background">
      <Navbar />

      {/* MATRIX BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.2]" />

      <AnimatePresence mode="wait">
        {isIntro ? (
          <motion.div 
            key="intro"
            className="flex min-h-[95vh] items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HolographicCard />
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            className="relative mx-auto grid min-h-[calc(100vh-14rem)] max-w-7xl items-center gap-16 lg:grid-cols-[1fr_1.1fr] px-4 pt-28"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div initial="hidden" animate="visible" variants={containerVariants} className="z-10">
              <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-[12px] font-bold uppercase tracking-[0.25em] text-primary backdrop-blur-md shadow-lg shadow-primary/5">
                <ShieldCheck className="h-4 w-4" />
                Operational Excellence & Fintech Strategy
              </motion.div>
              <motion.h1 className="font-display text-7xl font-extrabold tracking-[-0.045em] text-foreground sm:text-8xl lg:text-9xl">
                <motion.span variants={itemVariants} className="block">Ameer M</motion.span>
                <span className="mt-4 block max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-muted sm:text-3xl lg:text-4xl">
                  {words.map((word, index) => (
                    <motion.span key={`${word}-${index}`} variants={itemVariants} className={`mr-3 inline-block ${word === "Associate" ? "text-primary" : "text-foreground"}`}>
                      {word}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>
              <motion.p variants={itemVariants} className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-muted/70">
                Optimizing high-scale financial operations through data-driven risk management, fraud prevention, and streamlined compliance workflows.
              </motion.p>
              <motion.div variants={itemVariants} className="mt-12 flex flex-wrap items-center gap-6">
                <a href="#operations"><Button size="lg" className="group relative h-14 overflow-hidden rounded-2xl px-9 text-base font-bold shadow-2xl shadow-primary/20 transition-all hover:shadow-primary/40 active:scale-95"><span className="relative z-10 flex items-center">Explore Expertise<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" /></span><motion.div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" /></Button></a>
                <Button variant="outline" size="lg" className="h-14 rounded-2xl border-2 border-border/50 px-9 text-base font-bold backdrop-blur-xl transition-all hover:bg-primary/5 hover:border-primary/30 active:scale-95 shadow-sm" onClick={() => setResumeOpen(true)}>Curriculum Vitae<Eye className="ml-2 h-5 w-5 opacity-60 group-hover:opacity-100" /></Button>
              </motion.div>
              <motion.div variants={itemVariants} className="mt-12 flex gap-6">
                {socials.slice(0, 3).map((social, index) => {
                  const Icon = [Linkedin, Github, Mail][index];
                  return (<a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-border/40 bg-card/40 text-foreground transition-all hover:-translate-y-1.5 hover:border-primary/40 hover:text-primary hover:shadow-xl hover:shadow-primary/5 active:scale-90" aria-label={social.label}><Icon className="h-5 w-5 transition-transform group-hover:scale-110" /></a>);
                })}
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={portraitVariants} className="relative hidden h-[48rem] w-full items-center justify-center lg:flex" style={{ transformStyle: "preserve-3d", rotateX, rotateY, perspective: 1500 }}>
              <div className="absolute inset-0 flex items-center justify-center"><motion.div className="h-[35rem] w-[35rem] rounded-full bg-primary/10 blur-[120px]" animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} /></div>
              <div className="relative h-[38rem] w-[28rem]">
                <motion.div className="glass absolute inset-0 overflow-hidden rounded-[3.5rem] border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.4)] transition-all duration-700 hover:border-primary/30" style={{ transform: "translateZ(30px)", background: "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)", backdropFilter: "blur(24px)" }}>
                  {/* LASER SCAN EFFECT */}
                  <motion.div 
                    className="absolute left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-20"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.img src="/ameer.png" alt="Ameer M" className="h-full w-full object-cover grayscale brightness-110 transition-all duration-1000 hover:grayscale-0 hover:scale-[1.02]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-12 left-12 text-white"><p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Portfolio - Vol. 2026</p><h2 className="font-display text-5xl font-extrabold tracking-tight">Ameer M</h2><p className="mt-1 text-sm font-bold text-white/50 tracking-wider">FINTECH OPS SPECIALIST</p></div>
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
                </motion.div>
                <motion.div custom={0} variants={widgetVariants} animate={floatAnimation(0)} whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(16,185,129,0.15)" }} className="absolute -left-12 top-12 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 px-5 py-3 shadow-2xl backdrop-blur-xl" style={{ transform: "translateZ(100px)" }}><div className="relative flex h-2 w-2"><div className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><div className="relative h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" /></div><span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-400">Active</span></motion.div>
                <motion.div custom={1} variants={widgetVariants} animate={floatAnimation(1)} whileHover={{ scale: 1.05, y: -5 }} className="absolute -left-20 top-[40%] z-20 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/60 p-5 shadow-2xl backdrop-blur-xl transition-colors hover:border-primary/40" style={{ transform: "translateZ(80px)" }}><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 shadow-inner"><Check className="h-5 w-5" /></div><div><p className="text-[11px] font-black text-white uppercase tracking-widest">KYC VERIFIED</p><p className="text-[9px] font-bold text-white/50 uppercase tracking-tighter">CLIENT #048</p></div></motion.div>
                <motion.div custom={2} variants={widgetVariants} animate={floatAnimation(0.5)} whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(var(--primary-rgb), 0.2)" }} className="absolute -right-16 top-[32%] z-20 flex items-center gap-5 rounded-3xl border border-white/10 bg-black/70 p-6 shadow-2xl backdrop-blur-2xl" style={{ transform: "translateZ(120px)" }}><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary animate-pulse"><TrendingDown className="h-6 w-6" /></div><div><div className="flex items-baseline gap-1"><p className="text-3xl font-black text-white tracking-tighter">40%</p><p className="text-sm font-bold text-primary">↓</p></div><p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/40">FRAUD YoY</p></div><div className="absolute inset-0 -z-10 bg-primary/5 blur-2xl rounded-3xl" /></motion.div>
                <motion.div custom={3} variants={widgetVariants} animate={floatAnimation(1.5)} whileHover={{ scale: 1.02, y: -8 }} className="absolute -bottom-10 right-4 z-30 w-64 rounded-[2rem] border border-white/10 bg-black/80 p-6 shadow-[0_40px_100px_rgba(0,0,0,0.6)] backdrop-blur-3xl" style={{ transform: "translateZ(150px)" }}><div className="flex items-center justify-between mb-4"><p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Network Traffic</p><div className="flex items-center gap-2"><Activity className="h-3 w-3 text-emerald-400" /><span className="text-[9px] font-bold text-emerald-400">Stable</span></div></div><div className="flex items-end justify-between"><div><p className="text-3xl font-black text-white tracking-tight">524</p><p className="text-[9px] font-black uppercase tracking-widest text-emerald-400/80">TXNS MONITORED TODAY</p></div><div className="h-10 w-24 overflow-hidden"><svg viewBox="0 0 100 40" className="h-full w-full" preserveAspectRatio="none"><motion.path d="M0,35 Q10,30 20,38 T40,25 T60,32 T80,15 T100,20" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2.5, ease: "easeInOut", delay: 2 }} /><motion.path d="M0,35 Q10,30 20,38 T40,25 T60,32 T80,15 T100,20 L100,40 L0,40 Z" fill="url(#sparkline-grad)" initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ duration: 1.5, delay: 3 }} /><defs><linearGradient id="sparkline-grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} /><stop offset="100%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0 }} /></linearGradient></defs></svg></div></div></motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3, duration: 1.5, ease: CUBIC_BEZIER }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"><span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted/40">SCROLL TO DISCOVER</span><div className="relative h-14 w-7 rounded-full border-2 border-border/40 backdrop-blur-sm"><motion.div className="absolute left-1/2 top-2 h-2 w-1.5 -translate-x-1/2 rounded-full bg-primary" animate={{ y: [0, 24, 0], opacity: [1, 0, 1], scale: [1, 0.8, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} /></div></motion.div>
      <motion.div className="pointer-events-none absolute -inset-[500px] z-0 opacity-[0.03] dark:opacity-[0.05]" style={{ background: ambientGlowBackground }} />
    </section>
  );
}
