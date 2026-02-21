"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

export default function KineticText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const oldOpacity = useTransform(scrollYProgress, [0.2, 0.45], [1, 0]);
  const oldY = useTransform(scrollYProgress, [0.2, 0.45], [0, -60]);
  const oldScale = useTransform(scrollYProgress, [0.2, 0.45], [1, 0.92]);
  const oldBlurVal = useTransform(scrollYProgress, [0.2, 0.45], [0, 14]);
  const oldFilter = useMotionTemplate`blur(${oldBlurVal}px)`;

  const newOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const newY = useTransform(scrollYProgress, [0.45, 0.7], [60, 0]);
  const newScale = useTransform(scrollYProgress, [0.45, 0.7], [1.08, 1]);
  const newBlurVal = useTransform(scrollYProgress, [0.45, 0.7], [14, 0]);
  const newFilter = useMotionTemplate`blur(${newBlurVal}px)`;

  const strikeWidth = useTransform(
    scrollYProgress,
    [0.3, 0.5],
    ["0%", "100%"]
  );

  const topLabelOpacity = useTransform(scrollYProgress, [0.3, 0.55], [1, 0.2]);
  const bottomLabelOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.7],
    [0.2, 1]
  );

  const lineHeight = useTransform(scrollYProgress, [0.55, 0.75], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh] flex items-start justify-center"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6">
        <motion.div style={{ opacity: topLabelOpacity }} className="mb-4">
          <span className="relative font-mono text-sm tracking-[0.3em] uppercase text-white/30">
            Scattered Tools
            <motion.span
              className="absolute left-0 top-1/2 h-[2px] bg-red-400/50"
              style={{ width: strikeWidth }}
            />
          </span>
        </motion.div>

        <div className="relative h-[200px] flex items-center justify-center">
          <motion.h2
            className="absolute text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white/60 text-center whitespace-nowrap"
            style={{
              opacity: oldOpacity,
              y: oldY,
              scale: oldScale,
              filter: oldFilter,
            }}
          >
            Manual Workflows
          </motion.h2>

          <motion.h2
            className="absolute text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-center whitespace-nowrap"
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

        <motion.div style={{ opacity: bottomLabelOpacity }} className="mt-4">
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
