"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const particles = Array.from({ length: 24 }, (_, i) => ({
  size: seededRandom(i * 11 + 1) * 3 + 1,
  left: seededRandom(i * 17 + 2) * 100,
  top: seededRandom(i * 23 + 3) * 100,
  color:
    seededRandom(i * 29 + 4) > 0.5
      ? "rgba(79,143,234,0.15)"
      : "rgba(167,139,250,0.12)",
  duration: seededRandom(i * 37 + 5) * 6 + 5,
  delay: seededRandom(i * 41 + 6) * 4,
}));

export default function KineticText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Old text (Manual Workflows) — exits more dramatically
  const oldOpacity = useTransform(scrollYProgress, [0.2, 0.45], [1, 0]);
  const oldY = useTransform(scrollYProgress, [0.2, 0.45], [0, -100]);
  const oldScale = useTransform(scrollYProgress, [0.2, 0.45], [1, 0.75]);
  const oldBlurVal = useTransform(scrollYProgress, [0.2, 0.45], [0, 20]);
  const oldFilter = useMotionTemplate`blur(${oldBlurVal}px)`;

  // New text (Autonomous Growth) — enters from larger with more travel
  const newOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const newY = useTransform(scrollYProgress, [0.45, 0.7], [80, 0]);
  const newScale = useTransform(scrollYProgress, [0.45, 0.7], [1.15, 1]);
  const newBlurVal = useTransform(scrollYProgress, [0.45, 0.7], [16, 0]);
  const newFilter = useMotionTemplate`blur(${newBlurVal}px)`;

  // Strikethrough on "Scattered Tools"
  const strikeWidth = useTransform(scrollYProgress, [0.3, 0.5], ["0%", "100%"]);

  // Label opacities
  const topLabelOpacity = useTransform(scrollYProgress, [0.3, 0.55], [1, 0.2]);
  const bottomLabelOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0.2, 1]);

  // Gradient line at bottom
  const lineHeight = useTransform(scrollYProgress, [0.55, 0.75], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);

  // Glow burst behind "Autonomous Growth"
  const glowOpacity = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0, 0.6, 0.3]);
  const glowScale = useTransform(scrollYProgress, [0.4, 0.65], [0.5, 1.2]);

  // Horizontal sweep line at crossover
  const sweepWidth = useTransform(scrollYProgress, [0.38, 0.52], ["0%", "100%"]);
  const sweepOpacity = useTransform(scrollYProgress, [0.38, 0.45, 0.55], [0, 1, 0]);

  // Background color shift (warm → cool)
  const bgRedOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0.04, 0]);
  const bgBlueOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 0.05]);

  // Particle drift
  const particleY = useTransform(scrollYProgress, [0.2, 0.8], [0, -60]);
  const particleOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.6, 0.85], [0, 0.6, 0.6, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh] flex items-start justify-center"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6">
        {/* Background gradient mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute w-[60%] h-[60%] top-[10%] left-[15%] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(220,80,80,0.4) 0%, transparent 70%)",
              filter: "blur(120px)",
              opacity: bgRedOpacity,
            }}
          />
          <motion.div
            className="absolute w-[60%] h-[60%] top-[10%] left-[25%] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(79,143,234,0.4) 0%, transparent 70%)",
              filter: "blur(120px)",
              opacity: bgBlueOpacity,
            }}
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(79,143,234,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(79,143,234,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Floating particles */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: particleY, opacity: particleOpacity }}
        >
          {mounted && particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.left}%`,
                top: `${p.top}%`,
                backgroundColor: p.color,
              }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}
        </motion.div>

        {/* Top label */}
        <motion.div style={{ opacity: topLabelOpacity }} className="mb-4 relative z-10">
          <span className="relative font-mono text-sm tracking-[0.3em] uppercase text-white/30">
            Scattered Tools
            <motion.span
              className="absolute left-0 top-1/2 h-[2px] bg-red-400/50"
              style={{ width: strikeWidth }}
            />
          </span>
        </motion.div>

        {/* Main text area */}
        <div className="relative h-[200px] flex items-center justify-center">
          {/* Glow burst behind new text */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "120%",
              height: "300%",
              background: "radial-gradient(ellipse, rgba(79,143,234,0.25) 0%, rgba(56,189,248,0.08) 40%, transparent 70%)",
              opacity: glowOpacity,
              scale: glowScale,
            }}
          />

          {/* Horizontal sweep line at crossover */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] pointer-events-none"
            style={{
              width: sweepWidth,
              opacity: sweepOpacity,
              background: "linear-gradient(90deg, transparent, rgba(79,143,234,0.6), rgba(56,189,248,0.8), rgba(167,139,250,0.6), transparent)",
            }}
          />

          {/* Old text */}
          <motion.h2
            className="absolute text-3xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white/60 text-center whitespace-nowrap"
            style={{
              opacity: oldOpacity,
              y: oldY,
              scale: oldScale,
              filter: oldFilter,
            }}
          >
            Manual Workflows
          </motion.h2>

          {/* New text */}
          <motion.h2
            className="absolute text-3xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-center whitespace-nowrap"
            style={{
              opacity: newOpacity,
              y: newY,
              scale: newScale,
              filter: newFilter,
            }}
          >
            <span className="text-gradient-blue drop-shadow-[0_0_40px_rgba(79,143,234,0.35)]">
              Autonomous Growth
            </span>
          </motion.h2>
        </div>

        {/* Bottom label */}
        <motion.div style={{ opacity: bottomLabelOpacity }} className="mt-4 relative z-10">
          <span className="font-mono text-sm tracking-[0.3em] uppercase text-accent">
            Unified System
          </span>
        </motion.div>

        {/* Animated gradient line */}
        <div className="mt-12 relative w-px h-24">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent/50 via-accent-cyan/30 to-transparent"
            style={{ height: lineHeight, opacity: lineOpacity }}
          />
        </div>
      </div>
    </section>
  );
}
