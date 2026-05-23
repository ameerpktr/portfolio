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
      ctx.fillStyle = "rgba(5, 6, 6, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const fov = 1000;

      // Parallax interaction
      const pX = mouseX.get() * 100;
      const pY = mouseY.get() * 100;

      scrollOffset.current = (scrollOffset.current + 5) % 100;

      // --- 1. Draw 3D Tunnel Planes (Floor, Ceiling, Side Walls) ---
      ctx.strokeStyle = "rgba(182, 245, 0, 0.1)"; // Using the Lime color for the base grid
      ctx.lineWidth = 1;

      // Draw Grid Planes (Horizontal & Vertical)
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
            
            if (z === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      };

      drawPlane(600 + pY);   // Floor
      drawPlane(-600 + pY);  // Ceiling
      drawPlane(0, -800 + pX, true); // Left Wall
      drawPlane(0, 800 + pX, true);  // Right Wall

      // --- 2. Draw Hyper-Dense Data Streams ---
      streams.forEach((s) => {
        s.z -= s.speed;
        if (s.z < -fov) s.z = 5000;

        const scale = fov / (fov + s.z);
        if (scale <= 0) return;

        const x2d = centerX + (s.x * canvas.width * 0.8 + pX) * scale;
        const y2d = centerY + (s.y * canvas.height * 0.8 + pY) * scale;
        const len = s.length * scale;

        // Make streams brighter
        ctx.globalAlpha = Math.min(1, scale * 3); 
        const grad = ctx.createLinearGradient(x2d, y2d, x2d, y2d + len);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.5, s.color);
        grad.addColorStop(1, "transparent");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 3 * scale; 
        ctx.shadowBlur = 10 * scale; 
        ctx.shadowColor = s.color;
        ctx.beginPath();
        ctx.moveTo(x2d, y2d);
        ctx.lineTo(x2d, y2d + len);
        ctx.stroke();

        // Nodes - shinier
        if (s.z < 2500 && Math.random() > 0.98) {
           ctx.fillStyle = "#FFFFFF"; 
           ctx.shadowBlur = 25;
           ctx.shadowColor = s.color;
           ctx.beginPath();
           ctx.arc(x2d, y2d, 3 * scale, 0, Math.PI * 2);
           ctx.fill();
           ctx.shadowBlur = 0;
        }
      });


      // --- 3. Central Volumetric Pulse ---
      const pulseGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width / 1.5);
      pulseGrad.addColorStop(0, "rgba(22, 255, 0, 0.15)"); // Increased intensity
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
