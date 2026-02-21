"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Search,
  Wrench,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  Shield,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import GlowButton from "@/components/GlowButton";

const steps = [
  {
    number: "01",
    icon: <Search size={28} />,
    title: "The Deep Dive Audit",
    subtitle: "Week 1-2",
    description:
      "We don't guess. We map your entire workflow to find the bottlenecks, inefficiencies, and opportunities for AI-driven improvement.",
    details: [
      "Full operational workflow mapping",
      "Shadow AI and tool audit across your org",
      "Revenue leak and bottleneck identification",
      "Custom opportunity scorecard with ROI projections",
    ],
    iconBoxClass: "bg-sky-400/10 border-sky-400/20 text-sky-400",
    subtitleClass: "text-sky-400/60",
    checkClass: "text-sky-400/50",
    lineColor: "from-sky-400/30",
  },
  {
    number: "02",
    icon: <Wrench size={28} />,
    title: "The Build & Install",
    subtitle: "Week 3-6",
    description:
      "Custom-engineered agents and systems, not generic templates. We build specifically for your workflows, your tools, and your team.",
    details: [
      "Custom AI agents designed for your exact workflows",
      "Integration with your existing CRM, email, and tools",
      "Marketing campaigns launched and optimized",
      "Testing with your real data in a sandboxed environment",
    ],
    iconBoxClass: "bg-accent/10 border-accent/20 text-accent",
    subtitleClass: "text-accent/60",
    checkClass: "text-accent/50",
    lineColor: "from-accent/30",
  },
  {
    number: "03",
    icon: <GraduationCap size={28} />,
    title: "The Handover & Training",
    subtitle: "Week 7-8",
    description:
      "We don't just build it. We teach you to drive it. Comprehensive team training included — we turn your staff into AI Operators.",
    details: [
      "Hands-on training for your entire team",
      "Documentation and playbooks customized to your setup",
      "30-day guided support and optimization period",
      "Monthly performance reviews and system tuning",
    ],
    iconBoxClass: "bg-accent-purple/10 border-accent-purple/20 text-accent-purple",
    subtitleClass: "text-accent-purple/60",
    checkClass: "text-accent-purple/50",
    lineColor: "from-accent-purple/30",
  },
];

const differentiators = [
  {
    icon: <Clock size={20} />,
    title: "8 Weeks to Launch",
    description:
      "From first call to fully operational. No 6-month timelines or scope creep.",
  },
  {
    icon: <Users size={20} />,
    title: "Your Team Learns to Drive",
    description:
      "We're not building dependency. We're building capability inside your organization.",
  },
  {
    icon: <Shield size={20} />,
    title: "You Own Everything",
    description:
      "Every agent, every workflow, every piece of data. No hostage-ware, no subscription traps.",
  },
];

function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,143,234,0.03),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto" ref={containerRef}>
        <div className="absolute left-[27px] top-0 bottom-0 w-px bg-white/[0.03] hidden md:block">
          <motion.div
            className="w-full bg-gradient-to-b from-accent/30 via-accent-purple/20 to-transparent"
            style={{ height: lineHeight }}
          />
        </div>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.25,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative"
            >
              <div className="glass-card p-8 sm:p-10 hover:border-white/[0.1] transition-colors duration-500">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="shrink-0">
                    <motion.div
                      className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${step.iconBoxClass}`}
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono text-muted tracking-wider">
                        Step {step.number}
                      </span>
                      <span className={`text-xs font-mono ${step.subtitleClass}`}>
                        {step.subtitle}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                      {step.title}
                    </h3>

                    <p className="text-muted-light leading-relaxed mb-6 max-w-xl">
                      {step.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {step.details.map((detail, j) => (
                        <motion.div
                          key={j}
                          className="flex items-start gap-2.5 text-sm text-white/50"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: i * 0.25 + j * 0.08 + 0.3 }}
                        >
                          <CheckCircle2
                            size={14}
                            className={`mt-0.5 shrink-0 ${step.checkClass}`}
                          />
                          {detail}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Differentiators() {
  return (
    <section className="section-padding relative">
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <span className="section-label">Why Us</span>
          <h2 className="section-title">
            We Build the Engine.{" "}
            <span className="text-gradient">You Hold the Keys.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true }}
              className="glass-card-hover shimmer-border p-7 text-center"
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto mb-5"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {d.icon}
              </motion.div>
              <h3 className="text-base font-semibold text-white mb-2">
                {d.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                {d.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <GlowButton variant="primary" size="lg" href="https://calendly.com/dizzy-from-626/30min">
            Start Your Audit
            <ArrowRight size={18} />
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
}

export default function HowWeWorkPageClient() {
  return (
    <main>
      <Navbar />
      <PageHero
        label="How We Work"
        title="From Audit to"
        titleAccent="Autonomous in 8 Weeks."
        subtitle="A transparent, three-step process designed to give you maximum results with minimum disruption to your team."
      />
      <ProcessTimeline />
      <Differentiators />
      <Footer />
    </main>
  );
}
