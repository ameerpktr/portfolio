"use client";

import Lenis from "lenis";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Toaster } from "sonner";
import { CinematicIntro } from "@/components/system/cinematic-intro";
import { CommandPalette } from "@/components/system/command-palette";
import { CustomCursor } from "@/components/system/custom-cursor";
import { ResumeModal } from "@/components/system/resume-modal";
import { ScrollProgress } from "@/components/system/scroll-progress";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [showIntro, setShowIntro] = useState(true);
  const completeIntro = useCallback(() => setShowIntro(false), []);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 0.85 });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showIntro ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <AnimatePresence mode="wait" initial={false}>
          {showIntro ? (
            <CinematicIntro key="intro" onComplete={completeIntro} />
          ) : (
            <motion.div key="portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
              <ScrollProgress />
              <CustomCursor />
              <CommandPalette />
              <ResumeModal />
              {children}
            </motion.div>
          )}
        </AnimatePresence>
        <Toaster richColors position="bottom-right" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
