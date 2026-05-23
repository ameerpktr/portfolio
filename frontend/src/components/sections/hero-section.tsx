"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BarChart3, Check, ChevronUp, Download, Eye, Github, Linkedin, Mail, ShieldCheck, Zap, Activity, Shield, TrendingDown } from "lucide-react";
import { Navbar } from "@/components/system/navbar";
import { Button } from "@/components/ui/button";
import { socials } from "@/data/profile";
import { useUiStore } from "@/store/ui-store";

const words = "Fintech Operations Associate".split(" ");

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const portraitVariants = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(15px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.5,
    },
  },
};

const widgetVariants = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.8 + i * 0.15,
    },
  }),
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

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
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    setMounted(true);

    const handleGlobalMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <section id="hero" className="noise-edge relative min-h-[90vh] overflow-hidden px-4 pb-4 pt-28 sm:px-6 lg:px-8">
      <Navbar />
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-radial-grid bg-[length:32px_32px] opacity-[0.1] dark:opacity-[0.05]" />
      <motion.div 
        className="absolute right-[10%] top-32 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" 
        animate={{ 
          x: [-30, 30, -30], 
          y: [-20, 20, -20],
          scale: [1, 1.1, 1]
        }} 
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }} 
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-12rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        
        {/* Left Content */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={containerVariants}
          className="z-10"
        >
          <motion.div 
            variants={itemVariants} 
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-sm"
          >
            <ShieldCheck className="h-4 w-4" />
            Operational Excellence & Fintech Strategy
          </motion.div>
          
          <motion.h1 
            className="font-display text-7xl font-extrabold tracking-[-0.04em] text-foreground sm:text-8xl lg:text-9xl"
          >
            <motion.span variants={itemVariants} className="block">
              Ameer M
            </motion.span>
            <span className="mt-4 block max-w-2xl text-2xl font-medium leading-tight tracking-tight text-muted sm:text-3xl lg:text-4xl">
              {words.map((word, index) => (
                <motion.span 
                  key={`${word}-${index}`} 
                  variants={itemVariants} 
                  className={`mr-3 inline-block ${word === "Associate" ? "text-primary" : "text-foreground"}`}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-muted/80"
          >
            Optimizing high-scale financial operations through data-driven risk management, 
            fraud prevention, and streamlined compliance workflows.
          </motion.p>

          <motion.div 
            variants={itemVariants} 
            className="mt-12 flex flex-wrap items-center gap-5"
          >
            <a href="#operations">
              <Button size="lg" className="group h-14 rounded-2xl px-8 text-base font-bold shadow-xl shadow-primary/20 transition-all hover:shadow-primary/30">
                Explore Expertise
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 rounded-2xl border-2 px-8 text-base font-bold backdrop-blur-md transition-all hover:bg-primary/5" 
              onClick={() => setResumeOpen(true)}
            >
              Curriculum Vitae
              <Eye className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="mt-12 flex gap-5"
          >
            {socials.slice(0, 3).map((social, index) => {
              const Icon = [Linkedin, Github, Mail][index];
              return (
                <a 
                  key={index} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card/50 text-foreground transition-all hover:-translate-y-1 hover:border-primary/50 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right Content - Interactive Portrait */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={portraitVariants}
          className="relative hidden h-[45rem] w-full items-center justify-center lg:flex"
          style={{ 
            transformStyle: "preserve-3d",
            rotateX,
            rotateY,
            perspective: 1200
          }}
        >
          {/* Animated Background Glow behind portrait */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-[100px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Shifting data lines effect */}
            <svg className="absolute h-full w-full opacity-20" viewBox="0 0 400 400">
              <motion.path
                d="M0,100 L400,100 M0,200 L400,200 M0,300 L400,300 M100,0 L100,400 M200,0 L200,400 M300,0 L300,400"
                stroke="hsl(var(--primary))"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.2 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
            </svg>
          </div>
          
          {/* Portrait Container */}
          <div className="relative h-[36rem] w-[26rem]">
            
            {/* Main Image Frame with Glassmorphism Border */}
            <motion.div 
              className="glass absolute inset-0 overflow-hidden rounded-[3rem] border-primary/20 shadow-2xl"
              style={{ transform: "translateZ(30px)" }}
            >
              <motion.img 
                src="/ameer.png" 
                alt="Ameer M" 
                className="h-full w-full object-cover grayscale brightness-110 transition-all duration-700 hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Core Portfolio</p>
                <h2 className="mt-1 font-display text-4xl font-extrabold tracking-tight">Ameer M</h2>
                <p className="text-sm font-semibold text-white/70">Kerala, India</p>
              </div>

              {/* Technical Grid Overlay on Image */}
              <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
            </motion.div>

            {/* Floating Fintech Widgets */}
            
            {/* Widget 1: Live Transactions */}
            <motion.div 
              custom={0}
              variants={widgetVariants}
              animate={floatAnimation}
              className="absolute -right-12 top-10 z-20 w-48 rounded-2xl border border-white/10 bg-black/60 p-4 shadow-2xl backdrop-blur-xl"
              style={{ transform: "translateZ(100px)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Live Txns</span>
                </div>
                <Activity className="h-3 w-3 text-emerald-400/40" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white">1,284</span>
                <span className="text-[10px] font-bold text-emerald-400">/hr</span>
              </div>
              <div className="mt-3 h-1 w-full rounded-full bg-white/5 overflow-hidden">
                <motion.div 
                  className="h-full bg-emerald-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 2, delay: 1.5 }}
                />
              </div>
            </motion.div>

            {/* Widget 2: Fraud Reduction */}
            <motion.div 
              custom={1}
              variants={widgetVariants}
              animate={{
                ...floatAnimation,
                transition: { ...floatAnimation.transition, delay: 0.5 }
              }}
              className="absolute -left-16 top-32 z-20 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/60 p-4 shadow-2xl backdrop-blur-xl"
              style={{ transform: "translateZ(80px)" }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <TrendingDown className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-black text-white">40%</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-400/70">Fraud Reduction</p>
              </div>
            </motion.div>

            {/* Widget 3: System Status */}
            <motion.div 
              custom={2}
              variants={widgetVariants}
              animate={{
                ...floatAnimation,
                transition: { ...floatAnimation.transition, delay: 1 }
              }}
              className="absolute -right-16 bottom-32 z-20 rounded-2xl border border-white/10 bg-black/60 p-4 shadow-2xl backdrop-blur-xl"
              style={{ transform: "translateZ(120px)" }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Shield className="h-8 w-8 text-emerald-400/20" />
                  <Check className="absolute inset-0 m-auto h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-tighter">System Active</p>
                  <p className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">Compliance Secured</p>
                </div>
              </div>
            </motion.div>

            {/* Widget 4: KYC/AML Pill */}
            <motion.div 
              custom={3}
              variants={widgetVariants}
              animate={{
                ...floatAnimation,
                transition: { ...floatAnimation.transition, delay: 1.5 }
              }}
              className="absolute -left-12 bottom-12 z-20 rounded-full border border-white/10 bg-black/40 px-6 py-2.5 shadow-xl backdrop-blur-md"
              style={{ transform: "translateZ(60px)" }}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/80">SEON • ZOHO • AML</span>
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted/50">Scroll to Explore</span>
        <motion.div 
          className="h-10 w-[2px] bg-gradient-to-b from-primary to-transparent"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
