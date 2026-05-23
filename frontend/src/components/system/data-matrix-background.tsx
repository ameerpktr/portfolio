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

    // High-Density Data Structures
    const STREAMS_COUNT = 120;
    const streams = Array.from({ length: STREAMS_COUNT }).map(() => ({
      x: Math.random() * 4 - 2, // Wider spread for tunnel walls
      y: Math.random() * 4 - 2,
      z: Math.random() * 5000,
      speed: 15 + Math.random() * 30,
      length: 300 + Math.random() * 600,
      hue: 140, // Neon Green
    }));

    const render = () => {
      ctx.fillStyle = "rgba(5, 6, 6, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const fov = 1000;

      // Parallax with spring-like feel (manual smoothing)
      const pX = mouseX.get() * 80;
      const pY = mouseY.get() * 80;

      scrollOffset.current = (scrollOffset.current + 4) % 100;

      // --- 1. Draw 3D Tunnel Planes (Floor, Ceiling, Walls) ---
      ctx.strokeStyle = "rgba(0, 255, 102, 0.15)";
      ctx.lineWidth = 1;

      const drawPlane = (rotationX: number, rotationY: number, translateZ: number) => {
        for (let i = -15; i <= 15; i++) {
          // Perspective projection for grid lines
          const lineSpacing = 150;
          const xStart = i * lineSpacing + pX;
          
          ctx.beginPath();
          // Vertical receding lines
          for (let z = 0; z < 5000; z += 500) {
            const zEff = z - scrollOffset.current * 5;
            const scale = fov / (fov + zEff);
            if (scale < 0) continue;
            
            const x = centerX + xStart * scale;
            const y = centerY + (translateZ * scale);
            
            if (z === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      };

      // Floor & Ceiling
      drawPlane(0, 0, 600 + pY);  // Floor
      drawPlane(0, 0, -600 + pY); // Ceiling

      // --- 2. Draw Hyper-Dense Data Streams ---
      streams.forEach((s) => {
        s.z -= s.speed;
        if (s.z < -fov) s.z = 5000;

        const scale = fov / (fov + s.z);
        if (scale <= 0) return;

        const x2d = centerX + (s.x * canvas.width * 0.6 + pX) * scale;
        const y2d = centerY + (s.y * canvas.height * 0.6 + pY) * scale;
        const len = s.length * scale;

        ctx.globalAlpha = Math.min(1, scale * 2);
        const grad = ctx.createLinearGradient(x2d, y2d, x2d, y2d + len);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.5, "#00FF66");
        grad.addColorStop(1, "transparent");
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 * scale;
        ctx.beginPath();
        ctx.moveTo(x2d, y2d);
        ctx.lineTo(x2d, y2d + len);
        ctx.stroke();

        // Nodes on some streams
        if (s.z < 2000 && Math.random() > 0.98) {
           ctx.fillStyle = "#00FF66";
           ctx.shadowBlur = 15;
           ctx.shadowColor = "#00FF66";
           ctx.beginPath();
           ctx.arc(x2d, y2d, 2 * scale, 0, Math.PI * 2);
           ctx.fill();
           ctx.shadowBlur = 0;
        }
      });

      // --- 3. Central Volumetric Pulse ---
      const pulseGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width / 2);
      pulseGrad.addColorStop(0, "rgba(0, 255, 102, 0.08)");
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
