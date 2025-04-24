"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = 50; // Reduced particle count
    const connectionDistance = 150; // Reduced connection distance
    const mouseRadius = 100; // Radius of mouse influence

    // Simplified color function using our blue palette variables
    const getThemeColors = () => {
      const style = getComputedStyle(document.documentElement);

      // Use HSL values for easier manipulation if needed, otherwise hex/rgb is fine
      const primaryColor =
        style.getPropertyValue("--primary").trim() || "hsl(200, 100%, 50%)"; // Fallback HSL
      const accentColor =
        style.getPropertyValue("--accent").trim() || "hsl(217, 100%, 30%)"; // Fallback HSL

      return [primaryColor, accentColor];
    };

    let colors = getThemeColors();

    // Update colors when theme changes
    const updateColors = () => {
      colors = getThemeColors();
      // Update existing particles colors
      particles.forEach((particle) => {
        particle.color = colors[Math.floor(Math.random() * colors.length)];
      });
    };

    // Set canvas dimensions with high DPI support
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    window.addEventListener("resize", resizeCanvas);

    // Track mouse movement with debouncing for performance
    let mouseMoveTimeout: number;
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = window.setTimeout(() => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
        setIsHovering(true);
      }, 10); // Small delay to reduce frequent updates
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "class" &&
          (mutation.target as HTMLElement).classList.contains("dark")
        ) {
          updateColors();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    resizeCanvas();

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        // Add null check for canvas
        this.x = canvas ? Math.random() * canvas.width : 0;
        this.y = canvas ? Math.random() * canvas.height : 0;
        this.size = Math.random() * 2 + 1; // Smaller size range
        this.speedX = Math.random() * 0.5 - 0.25; // Reduced speed
        this.speedY = Math.random() * 0.5 - 0.25; // Reduced speed
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(mouseX: number, mouseY: number, isHovering: boolean) {
        // Add null check for canvas
        if (!canvas) return;

        // Move particles
        this.x += this.speedX;
        this.y += this.speedY;

        // Simple mouse interaction
        if (isHovering) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseRadius) {
            const force = (mouseRadius - distance) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            this.speedX -= Math.cos(angle) * force * 0.1;
            this.speedY -= Math.sin(angle) * force * 0.1;
          }
        }

        // Apply slight dampening
        this.speedX *= 0.99;
        this.speedY *= 0.99;

        // Simple boundary checking
        if (this.x > canvas.width || this.x < 0) {
          this.speedX *= -1;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY *= -1;
        }
      }

      draw() {
        if (!ctx) return;

        // Draw simple circle without glow effects
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop with frame limiting
    let lastTime = 0;
    const frameInterval = 1000 / 30; // Limit to 30fps for better performance

    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;

      if (deltaTime > frameInterval) {
        lastTime = timestamp - (deltaTime % frameInterval);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Connect particles with lines first (to render behind particles)
        ctx.globalAlpha = 0.15;
        ctx.lineWidth = 0.5;

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              ctx.beginPath();
              ctx.strokeStyle = particles[i].color;
              ctx.globalAlpha = 0.15 * (1 - distance / connectionDistance);
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        // Update and draw particles
        ctx.globalAlpha = 0.6;
        for (let i = 0; i < particles.length; i++) {
          particles[i].update(mousePosition.x, mousePosition.y, isHovering);
          particles[i].draw();
        }
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
      clearTimeout(mouseMoveTimeout);
    };
  }, [mousePosition, isHovering]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-30" // Removed dark:opacity-20, single opacity value
      aria-hidden="true"
    />
  );
}
