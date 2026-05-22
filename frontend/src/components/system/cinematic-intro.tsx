"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useUiStore } from "@/store/ui-store";

const letters = "AMEER M".split("");

export function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const setIntroComplete = useUiStore((state) => state.setIntroComplete);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIntroComplete(true);
      onComplete();
    }, 1250);
    return () => {
      window.clearTimeout(timer);
    };
  }, [onComplete, setIntroComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.58, ease: [0.83, 0, 0.17, 1] }}
    >
      <motion.div className="absolute h-[34rem] w-[34rem] rounded-full bg-sky-500/20 blur-[120px]" initial={{ scale: 0.72, opacity: 0 }} animate={{ scale: 1.12, opacity: 0.82 }} transition={{ duration: 0.65, ease: "easeOut" }} />
      <motion.div className="absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-violet-500/20 blur-[100px]" initial={{ scale: 0.82, opacity: 0 }} animate={{ scale: 1, opacity: 0.7 }} transition={{ duration: 0.7, ease: "easeOut" }} />
      <div className="absolute inset-0 bg-radial-grid bg-[length:22px_22px] opacity-[0.08]" />
      <motion.h1
        className="relative font-display text-5xl font-bold tracking-[0.24em] text-white drop-shadow-[0_0_32px_rgba(125,211,252,0.45)] sm:text-8xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            scale: 1.04,
            transition: { staggerChildren: 0.045, delayChildren: 0.02 }
          }
        }}
      >
        {letters.map((letter, index) => (
          <motion.span
            className="inline-block"
            key={`${letter}-${index}`}
            variants={{
              hidden: { y: 34, opacity: 0, filter: "blur(12px)", scale: 0.96 },
              visible: { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 0.46, ease: [0.22, 1, 0.36, 1] } }
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  );
}
