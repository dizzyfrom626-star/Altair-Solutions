"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Megaphone,
  Zap,
  Phone,
  TrendingUp,
  BarChart3,
  Target,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import GlowButton from "@/components/GlowButton";
import AnimatedCounter from "@/components/AnimatedCounter";

const speedToLeadSteps = [
  {
    icon: <Target size={20} />,
    title: "Ad Generates Lead",
    description: "Your paid campaign captures a new prospect",
    time: "0s",
  },
  {
    icon: <Zap size={20} />,
    title: "AI Qualifies Instantly",
    description: "Our system scores and enriches the lead data",
    time: "2s",
  },
  {
    icon: <Phone size={20} />,
    title: "Voice AI Calls",
    description: "A natural-sounding AI agent calls the lead",
    time: "8s",
  },
  {
    icon: <CheckCircle2 size={20} />,
    title: "Appointment Booked",
    description: "Your team gets a qualified, booked meeting",
    time: "45s",
  },
];

const services = [
  {
    icon: <BarChart3 size={22} />,
    title: "Paid Advertising",
    description:
      "Google Ads, Meta, LinkedIn — we manage full-funnel campaigns optimized by AI for maximum ROAS.",
    features: [
      "AI-optimized bidding strategies",
      "Dynamic creative testing",
      "Real-time budget allocation",
    ],
  },
  {
    icon: <TrendingUp size={22} />,
    title: "SEO & Content",
    description:
      "Organic growth powered by AI-generated content strategies and technical SEO that compounds over time.",
    features: [
      "AI-assisted content strategy",
      "Technical SEO audits",
      "Programmatic content at scale",
    ],
  },
  {
    icon: <Megaphone size={22} />,
    title: "Lead Generation",
    description:
      "End-to-end pipeline from ad impression to booked appointment. We don't just get clicks — we get conversations.",
    features: [
      "Multi-channel lead capture",
      "AI lead scoring",
      "Automated nurture sequences",
    ],
  },
];

const results = [
  { value: 4.2, suffix: "x", label: "Average ROAS", decimals: 1 },
  { prefix: "<", value: 10, suffix: "s", label: "Speed to Lead" },
  { value: 67, suffix: "%", label: "Lower CAC" },
  { value: 3.1, suffix: "M+", label: "Leads Generated", decimals: 1 },
];

function SpeedToLead() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.04),transparent_60%)]" />
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <span className="section-label">The Speed-to-Lead Guarantee</span>
          <h2 className="section-title">
            From Ad Click to{" "}
            <span className="text-gradient">Phone Call in 10 Seconds.</span>
          </h2>
          <p className="section-subtitle">
            Our ads generate the lead. Our Voice AI calls them within 10 seconds.
            Your team gets the booked appointment.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {speedToLeadSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="glass-card p-6 relative group hover:border-accent-cyan/20 transition-colors duration-500"
            >
              {i < speedToLeadSteps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-white/10"
                  animate={isInView ? { opacity: [0, 1], x: [-5, 0] } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.15 }}
                >
                  <ArrowRight size={16} />
                </motion.div>
              )}
              <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan mb-4">
                {step.icon}
              </div>
              <div className="text-xs font-mono text-accent-cyan/60 mb-2">
                {step.time}
              </div>
              <h3 className="text-base font-semibold text-white mb-1">
                {step.title}
              </h3>
              <p className="text-xs text-white/40">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative">
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <span className="section-label">Services</span>
          <h2 className="section-title">
            Full-Funnel{" "}
            <span className="text-gradient">Growth Marketing.</span>
          </h2>
        </motion.div>

        <motion.div ref={ref} className="grid md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="glass-card-hover shimmer-border p-7"
            >
              <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-accent mb-5">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-white/40 mb-5 leading-relaxed">
                {service.description}
              </p>
              <div className="space-y-2.5">
                {service.features.map((f, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-2 text-xs text-white/50"
                  >
                    <CheckCircle2 size={12} className="text-emerald-400/50" />
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ResultsStrip() {
  return (
    <section className="py-20 px-6 border-y border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {results.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-accent mb-1">
                {r.prefix || ""}
                <AnimatedCounter
                  end={r.value}
                  suffix={r.suffix}
                  decimals={r.decimals || 0}
                />
              </div>
              <div className="text-xs font-mono text-muted uppercase tracking-wider">
                {r.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function GrowthPageClient() {
  return (
    <main>
      <Navbar />
      <PageHero
        label="Growth Engine"
        title="Fill Your Pipeline."
        titleAccent="Close More Deals."
        subtitle="AI-enhanced digital marketing that generates leads and gets them on the phone — before your competitors even know they exist."
      />
      <ResultsStrip />
      <SpeedToLead />
      <ServicesGrid />
      <Footer />
    </main>
  );
}
