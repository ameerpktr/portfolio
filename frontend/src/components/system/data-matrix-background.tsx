"use client";

import React, { useRef, useEffect } from "react";

interface Props {
  mouseX: any;
  mouseY: any;
}

export function DataMatrixBackground({ mouseX, mouseY }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollOffset = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    // HYPER-DENSITY DATA STRUCTURES (CINEMATIC PALETTE)
    const PALETTE = ["#00F0FF", "#16FF00", "#7D3CFF", "#FFFFFF"];
    
    const STREAMS_COUNT = 2000; // Extreme density for ultra-immersive effect
    const streams = Array.from({ length: STREAMS_COUNT }).map(() => ({
      x: Math.random() * 10 - 5, 
      y: Math.random() * 10 - 5,
      z: Math.random() * 6000,
      speed: 10 + Math.random() * 45, 
      length: 100 + Math.random() * 400,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)]
    }));

    const render = () => {
      const time = performance.now() * 0.001;
      // 1. Update Physics
      const fov = 1400; // Increased FOV for better perspective at high density
      const pX = mouseX.get() * 150;
      const pY = mouseY.get() * 150;

      streams.forEach((s) => {
        s.z -= s.speed;
        if (s.z < -fov) s.z = 6000;
      });
      scrollOffset.current = (scrollOffset.current + 4) % 100;

      // ... (canvas draw)
      ctx.fillStyle = "#050606";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // --- 1. Draw 3D Tunnel Planes ---
      ctx.strokeStyle = "rgba(0, 240, 255, 0.015)"; // Minimalist grid
      ctx.lineWidth = 0.5;

      // Draw Grid Planes
      const drawPlane = (translateY: number, translateX: number = 0, rotate: boolean = false) => {
        for (let i = -12; i <= 12; i++) { // Optimized count
          const startOffset = i * 250 + (rotate ? pY : pX);
          ctx.beginPath();
          for (let z = 0; z < 6000; z += 800) { // Larger steps for performance
            const zEff = z - scrollOffset.current * 12;
            const scale = fov / (fov + zEff);
            if (scale < 0) continue;
            const x = centerX + (rotate ? (translateX * scale) : (startOffset * scale));
            const y = centerY + (rotate ? (startOffset * scale) : (translateY * scale));
            if (z === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      };

      drawPlane(800 + pY); drawPlane(-800 + pY);
      drawPlane(0, -1000 + pX, true); drawPlane(0, 1000 + pX, true);

      // --- 2. Draw Hyper-Dense Data Streams ---
      ctx.globalCompositeOperation = 'screen'; 
      streams.forEach((s) => {
        const scale = fov / (fov + s.z);
        if (scale <= 0) return;

        const x2d = centerX + (s.x * canvas.width * 1.5 + pX) * scale;
        const y2d = centerY + (s.y * canvas.height * 1.5 + pY) * scale;
        const len = s.length * scale;
// CINEMATIC SHINE FLOW: Modulate opacity and thickness based on time and Z-position
// Adding subtle flicker (5% chance per frame) for organic "glitch" feel
const flicker = Math.random() > 0.95 ? 0.4 : 1.0;
const shine = Math.sin(time * 2 + s.z * 0.002) * 0.3 + 0.7;

const alpha = Math.min(0.9, scale * 1.8 * shine * flicker);
const weight = 1.2 * scale * shine;

// PASS 1: Outer Neon Glow (Colored)
ctx.globalAlpha = alpha * 0.6;
ctx.strokeStyle = s.color;
ctx.lineWidth = weight * 2.5; 
ctx.beginPath();
ctx.moveTo(x2d, y2d);
ctx.lineTo(x2d, y2d + len);
ctx.stroke();

// PASS 2: Shiny Inner Core (White/High Brightness)
ctx.globalAlpha = alpha;
ctx.strokeStyle = "#FFFFFF";
ctx.lineWidth = weight * 0.8; 
ctx.beginPath();
ctx.moveTo(x2d, y2d);
ctx.lineTo(x2d, y2d + len);
ctx.stroke();
});

      ctx.globalCompositeOperation = 'source-over';

      // --- 3. Central Volumetric Pulse ---
      const pulseGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width);
      pulseGrad.addColorStop(0, "rgba(22, 255, 0, 0.08)");
      pulseGrad.addColorStop(0.3, "rgba(0, 240, 255, 0.02)");
      pulseGrad.addColorStop(1, "transparent");

      ctx.fillStyle = pulseGrad;
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
