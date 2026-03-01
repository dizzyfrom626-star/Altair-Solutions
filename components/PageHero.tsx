"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GlowButton from "./GlowButton";
import { ArrowRight } from "lucide-react";

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const particles = Array.from({ length: 20 }, (_, i) => ({
  size: seededRandom(i * 7 + 1) * 2 + 0.5,
  left: seededRandom(i * 13 + 2) * 100,
  top: seededRandom(i * 17 + 3) * 100,
  color:
    seededRandom(i * 23 + 4) > 0.5
      ? "rgba(79,143,234,0.2)"
      : "rgba(167,139,250,0.15)",
  duration: seededRandom(i * 31 + 5) * 5 + 4,
  delay: seededRandom(i * 37 + 6) * 3,
}));

interface PageHeroProps {
  label: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function PageHero({
  label,
  title,
  titleAccent,
  subtitle,
  ctaText = "Book a Strategy Call",
  ctaHref = "https://calendly.com/dizzy-from-626/30min",
}: PageHeroProps) {
  const [mounted, setMounted] = useState(false);
  const titleWords = title.split(" ");
  const accentWords = titleAccent.split(" ");

  useEffect(() => setMounted(true), []);

  return (
    <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 md:pt-44 md:pb-28 px-6 overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[50%] h-[50%] -top-[10%] left-[10%] rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, rgba(79,143,234,0.4) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -15, 8, 0],
            scale: [1, 1.04, 0.98, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[40%] h-[40%] -bottom-[5%] right-[5%] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, rgba(167,139,250,0.4) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, -15, 10, 0],
            y: [0, 10, -15, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating particles — client-only to avoid hydration mismatch */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
              y: [0, -20, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="section-label">{label}</span>
        </motion.div>

        {/* Word-by-word title reveal */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
          {titleWords.map((word, i) => (
            <motion.span
              key={`title-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}{" "}
          <span className="text-gradient">
            {accentWords.map((word, i) => (
              <motion.span
                key={`accent-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + (titleWords.length + i) * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg sm:text-xl text-muted-light max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          <GlowButton variant="primary" size="lg" href={ctaHref}>
            {ctaText}
            <ArrowRight size={18} />
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
}
