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
      const fov = 1000;
      
      // 2. Draw Frame
      ctx.fillStyle = "rgba(5, 6, 6, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // --- 3. Central Volumetric Pulse ---
      const pulseGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width / 1.5);
      pulseGrad.addColorStop(0, "rgba(22, 255, 0, 0.05)"); 
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
