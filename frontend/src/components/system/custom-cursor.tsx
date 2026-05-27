"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 420, damping: 35 });
  const smoothY = useSpring(y, { stiffness: 420, damping: 35 });

  useEffect(() => {
    const update = (clientX: number, clientY: number) => {
      x.set(clientX - 10);
      y.set(clientY - 10);
    };

    const handlePointerMove = (e: PointerEvent) => update(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        update(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
    };
  }, [x, y]);

  return <motion.div style={{ x: smoothX, y: smoothY }} className="cursor-dot pointer-events-none fixed z-[90] h-6 w-6 rounded-full border-2 border-slate-900 bg-slate-900/5 dark:border-white dark:bg-white/5" />;
}
