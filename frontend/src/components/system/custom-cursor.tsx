"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 420, damping: 35 });
  const smoothY = useSpring(y, { stiffness: 420, damping: 35 });

  useEffect(() => {
    const update = (event: PointerEvent) => {
      x.set(event.clientX - 10);
      y.set(event.clientY - 10);
    };
    window.addEventListener("pointermove", update);
    return () => window.removeEventListener("pointermove", update);
  }, [x, y]);

  return <motion.div style={{ x: smoothX, y: smoothY }} className="cursor-dot pointer-events-none fixed z-[90] hidden h-5 w-5 rounded-full border border-white/70 md:block" />;
}
