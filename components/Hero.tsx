"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import GlowButton from "./GlowButton";

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const particles = Array.from({ length: 40 }, (_, i) => ({
  size: seededRandom(i * 7 + 1) * 2.5 + 0.5,
  left: seededRandom(i * 13 + 2) * 100,
  top: seededRandom(i * 17 + 3) * 100,
  color:
    seededRandom(i * 23 + 4) > 0.6
      ? "rgba(79,143,234,0.25)"
      : seededRandom(i * 23 + 4) > 0.3
        ? "rgba(56,189,248,0.2)"
        : "rgba(167,139,250,0.18)",
  duration: seededRandom(i * 31 + 5) * 6 + 5,
  delay: seededRandom(i * 37 + 6) * 4,
}));

const stats = [
  { value: "200+", label: "Workflows Automated" },
  { value: "10s", label: "Speed to Lead" },
  { value: "60%", label: "Cost Reduction" },
  { value: "24/7", label: "AI Workforce" },
];

function ParallaxGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -250]);

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 overflow-hidden"
      style={{ y, willChange: "transform" }}
    >
      <div
        className="absolute inset-0 animate-grid-float"
        style={{
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          className="absolute w-[200%] h-[200%] -left-1/2 -top-1/4"
          style={{
            transform: "rotateX(60deg)",
            backgroundImage: `
              linear-gradient(rgba(79,143,234,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(79,143,234,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {particles.map((p, i) => (
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
            opacity: [0.15, 0.6, 0.15],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#06060a_70%)]" />
    </motion.div>
  );
}

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
    stiffness: 80,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 80,
    damping: 30,
  });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParallaxGrid />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1200,
            willChange: "transform",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
          >
            <ShieldCheck size={14} className="text-accent" />
            <span className="text-xs font-mono text-white/50 tracking-wider uppercase">
              Human-in-the-Loop AI Systems
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight mb-8"
          >
            <span className="block text-gradient-subtle">Scale Your Revenue,</span>
            <span className="block text-gradient mt-1">
              Not Your Headcount.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-muted-light max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            We fill your pipeline with leads AND install the AI workforce to
            manage them&mdash;fully supervised by you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <GlowButton variant="primary" size="lg" href="https://calendly.com/dizzy-from-626/30min">
              Book a Strategy Call
              <ArrowRight size={18} />
            </GlowButton>
            <GlowButton variant="ghost" size="lg" href="/how-we-work">
              See How It Works
            </GlowButton>
          </motion.div>
        </motion.div>

        {/* Stats ticker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-8 sm:gap-12"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-xs font-mono text-muted uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1"
          >
            <motion.div className="w-1 h-2 rounded-full bg-accent/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
