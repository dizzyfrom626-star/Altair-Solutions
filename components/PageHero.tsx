"use client";

import { motion } from "framer-motion";
import GlowButton from "./GlowButton";
import { ArrowRight } from "lucide-react";

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
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,143,234,0.06),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="section-label">{label}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6"
        >
          {title}{" "}
          <span className="text-gradient">{titleAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-lg sm:text-xl text-muted-light max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
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
