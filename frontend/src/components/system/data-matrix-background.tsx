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

    // HYPER-DENSITY DATA STRUCTURES
    const PALETTE = ["#F2B50B", "#E8E2D8", "#F075AE", "#F4991A", "#B6F500"];
    
    const STREAMS_COUNT = 250; 
    const streams = Array.from({ length: STREAMS_COUNT }).map(() => ({
      x: Math.random() * 6 - 3, 
      y: Math.random() * 6 - 3,
      z: Math.random() * 5000,
      speed: 20 + Math.random() * 40, 
      length: 400 + Math.random() * 800,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)]
    }));

    const render = () => {
      // 1. Update Physics
      streams.forEach((s) => {
        s.z -= s.speed;
        if (s.z < -fov) s.z = 5000;
      });
      scrollOffset.current = (scrollOffset.current + 8) % 100;

      // 2. Draw Frame
      ctx.fillStyle = "rgba(5, 6, 6, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const pX = mouseX.get() * 100;
      const pY = mouseY.get() * 100;

      // Draw Grid Planes
      ctx.strokeStyle = "rgba(22, 255, 0, 0.1)";
      const drawPlane = (translateY: number, translateX: number = 0, rotate: boolean = false) => {
        for (let i = -15; i <= 15; i++) {
          const startOffset = i * 150 + (rotate ? pY : pX);
          ctx.beginPath();
          for (let z = 0; z < 5000; z += 500) {
            const zEff = z - scrollOffset.current * 8;
            const scale = fov / (fov + zEff);
            if (scale < 0) continue;
            const x = centerX + (rotate ? (translateX * scale) : (startOffset * scale));
            const y = centerY + (rotate ? (startOffset * scale) : (translateY * scale));
            if (z === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      };

      drawPlane(600 + pY); drawPlane(-600 + pY);
      drawPlane(0, -800 + pX, true); drawPlane(0, 800 + pX, true);

      // Draw Streams
      streams.forEach((s) => {
        const scale = fov / (fov + s.z);
        if (scale <= 0) return;

        const x2d = centerX + (s.x * canvas.width * 0.8 + pX) * scale;
        const y2d = centerY + (s.y * canvas.height * 0.8 + pY) * scale;
        const len = s.length * scale;

        ctx.globalAlpha = Math.min(1, scale * 2);
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        ctx.moveTo(x2d, y2d);
        ctx.lineTo(x2d, y2d + len);
        ctx.stroke();
      });

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
