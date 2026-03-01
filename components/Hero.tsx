"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import GlowButton from "./GlowButton";
import AnimatedCounter from "./AnimatedCounter";

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const particles = Array.from({ length: 60 }, (_, i) => ({
  size: seededRandom(i * 7 + 1) * 3 + 0.5,
  left: seededRandom(i * 13 + 2) * 100,
  top: seededRandom(i * 17 + 3) * 100,
  color:
    seededRandom(i * 23 + 4) > 0.6
      ? "rgba(79,143,234,0.3)"
      : seededRandom(i * 23 + 4) > 0.3
        ? "rgba(56,189,248,0.25)"
        : "rgba(167,139,250,0.22)",
  duration: seededRandom(i * 31 + 5) * 6 + 5,
  delay: seededRandom(i * 37 + 6) * 4,
}));

const stats = [
  { value: 200, suffix: "+", label: "Workflows Automated" },
  { value: 10, suffix: "s", label: "Speed to Lead" },
  { value: 60, suffix: "%", label: "Cost Reduction" },
  { prefix: "24/", value: 7, suffix: "", label: "AI Workforce" },
];

function GradientMeshHero() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[70%] h-[70%] -top-[20%] -left-[10%] rounded-full opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle, rgba(79,143,234,0.4) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 10, 0],
          scale: [1, 1.05, 0.97, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[60%] h-[60%] -bottom-[15%] -right-[5%] rounded-full opacity-[0.10]"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.4) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 15, -25, 0],
          scale: [1, 0.97, 1.05, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[40%] h-[40%] top-[30%] left-[30%] rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.5) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 20, -15, 0],
          y: [0, -15, 20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function ParallaxGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -250]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -120]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => setMounted(true), []);

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 overflow-hidden"
      style={{ y, opacity, willChange: "transform" }}
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
              linear-gradient(rgba(79,143,234,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(79,143,234,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        className="absolute inset-0"
        style={{ y: y2, willChange: "transform" }}
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
              y: [0, -30, 0],
              opacity: [0.15, 0.7, 0.15],
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

      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#06060a_70%)]" />
    </motion.div>
  );
}

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 80,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
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
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-24 md:pt-32 pb-8">
      <GradientMeshHero />
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
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
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
            <span className="block text-gradient-subtle">
              Scale Your Revenue,
            </span>
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
            <GlowButton
              variant="primary"
              size="lg"
              href="https://calendly.com/dizzy-from-626/30min"
            >
              Book a Strategy Call
              <ArrowRight size={18} />
            </GlowButton>
            <GlowButton variant="ghost" size="lg" href="/how-we-work">
              See How It Works
            </GlowButton>
          </motion.div>
        </motion.div>

        {/* Stats ticker with animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-8 sm:gap-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 + i * 0.1 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {stat.prefix || ""}
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-xs font-mono text-muted uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1 shadow-[0_0_15px_rgba(79,143,234,0.15)]"
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-accent/60"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
