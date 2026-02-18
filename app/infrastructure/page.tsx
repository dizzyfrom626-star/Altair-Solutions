"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useSpring,
} from "framer-motion";
import {
  Server,
  ShieldCheck,
  Lock,
  Eye,
  Cloud,
  HardDrive,
  TrendingDown,
  BadgeCheck,
  CheckCircle2,
  FileKey,
  Globe,
  Database,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import GlowButton from "@/components/GlowButton";

function AnimatedNumber({
  value,
  prefix = "$",
}: {
  value: number;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString()}`;
      }
    });
    return unsubscribe;
  }, [spring, prefix]);

  return <span ref={ref}>{prefix}0</span>;
}

function ServiceCards() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      icon: <ShieldCheck size={22} />,
      title: "Secure Hardening",
      description:
        "Production-grade security for your AI pipelines with isolated Docker enclaves and zero-trust network policies.",
      badge: "Verified",
      tags: ["Docker Enclaves", "Zero-Trust", "E2E Encryption"],
    },
    {
      icon: <Server size={22} />,
      title: "Local LLM Deployment",
      description:
        "Run Llama, Mistral, and custom fine-tuned models on your own hardware with GPU acceleration and automatic failover.",
      terminal: true,
    },
    {
      icon: <Eye size={22} />,
      title: "Shadow AI Governance",
      description:
        "Discover unauthorized AI tools across your org. We audit, report, and consolidate into governed workflows.",
      steps: [
        { label: "AI Tool Discovery", done: true },
        { label: "Risk Assessment", done: true },
        { label: "Policy Framework", done: false },
      ],
    },
  ];

  const terminalLines = [
    { prompt: true, text: "ollama run llama3:70b" },
    { prompt: false, text: "pulling manifest..." },
    { prompt: false, text: "pulling 8eeb52dfb3bb... 100%" },
    { prompt: false, text: "verifying sha256 digest ✓" },
    { prompt: false, text: "" },
    { prompt: false, text: "Model running locally on :11434" },
  ];

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
          <span className="section-label">Capabilities</span>
          <h2 className="section-title">
            Your AI.{" "}
            <span className="text-gradient">Your Rules.</span>
          </h2>
        </motion.div>

        <motion.div ref={ref} className="grid md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-card-hover p-7"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple">
                  {card.icon}
                </div>
                {card.badge && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                    <BadgeCheck size={10} />
                    {card.badge}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed mb-5">
                {card.description}
              </p>

              {card.tags && (
                <div className="flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {card.terminal && (
                <div className="rounded-xl bg-black/30 border border-white/[0.04] p-4 font-mono text-xs">
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  {terminalLines.map((line, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: j * 0.15, duration: 0.3 }}
                      viewport={{ once: true }}
                      className="text-white/50"
                    >
                      {line.prompt && (
                        <span className="text-accent mr-2">$</span>
                      )}
                      {line.text.includes("✓") ? (
                        <span>
                          {line.text.replace("✓", "")}
                          <span className="text-emerald-400">✓</span>
                        </span>
                      ) : line.text.includes("100%") ? (
                        <span>
                          {line.text.replace("100%", "")}
                          <span className="text-accent-cyan">100%</span>
                        </span>
                      ) : line.text.includes(":11434") ? (
                        <span className="text-emerald-400">{line.text}</span>
                      ) : (
                        line.text
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {card.steps && (
                <div className="space-y-2">
                  {card.steps.map((step) => (
                    <div
                      key={step.label}
                      className="flex items-center gap-2.5 text-xs font-mono"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${step.done ? "bg-emerald-400" : "bg-accent animate-pulse"}`}
                      />
                      <span className="text-white/40">{step.label}</span>
                      <span
                        className={`ml-auto text-[10px] uppercase tracking-wider ${step.done ? "text-emerald-400/50" : "text-accent/50"}`}
                      >
                        {step.done ? "complete" : "active"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ROICalculator() {
  const [mode, setMode] = useState<"cloud" | "local">("cloud");
  const monthlyCloud = 500;
  const localOneTime = 12000;
  const totalCloud = monthlyCloud * 12 * 5;
  const totalLocal = localOneTime;
  const savings = totalCloud - totalLocal;

  return (
    <section id="roi" className="section-padding relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(79,143,234,0.03),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <span className="section-label">The Math</span>
          <h2 className="section-title">
            See Your{" "}
            <span className="text-gradient">5-Year Savings.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass-card p-8 sm:p-10"
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            <button
              onClick={() => setMode("cloud")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-sm transition-all duration-300 ${
                mode === "cloud"
                  ? "bg-white/[0.06] text-white border border-white/10"
                  : "text-white/30 hover:text-white/50"
              }`}
            >
              <Cloud size={16} />
              Cloud Subscription
            </button>
            <button
              onClick={() => setMode("local")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-sm transition-all duration-300 ${
                mode === "local"
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "text-white/30 hover:text-white/50"
              }`}
            >
              <HardDrive size={16} />
              Local Hardware
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            <div className="text-center p-5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <p className="font-mono text-xs text-white/30 uppercase tracking-wider mb-2">
                {mode === "cloud" ? "Monthly Cost" : "One-Time Cost"}
              </p>
              <p className="text-3xl font-bold">
                {mode === "cloud" ? (
                  <span className="text-white/70">
                    <AnimatedNumber value={monthlyCloud} />
                    <span className="text-sm text-white/30">/mo</span>
                  </span>
                ) : (
                  <span className="text-accent">
                    <AnimatedNumber value={localOneTime} />
                  </span>
                )}
              </p>
            </div>
            <div className="text-center p-5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <p className="font-mono text-xs text-white/30 uppercase tracking-wider mb-2">
                5-Year Total
              </p>
              <p className="text-3xl font-bold">
                {mode === "cloud" ? (
                  <span className="text-red-400/70">
                    <AnimatedNumber value={totalCloud} />
                  </span>
                ) : (
                  <span className="text-accent">
                    <AnimatedNumber value={totalLocal} />
                  </span>
                )}
              </p>
            </div>
            <div className="text-center p-5 rounded-xl bg-accent/[0.04] border border-accent/10">
              <p className="font-mono text-xs text-accent/50 uppercase tracking-wider mb-2">
                You Save
              </p>
              <p className="text-3xl font-bold text-accent">
                <AnimatedNumber value={savings} />
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/40 font-mono flex items-center gap-2">
                  <Cloud size={14} />
                  Cloud (5yr)
                </span>
                <span className="text-sm text-white/30 font-mono">
                  ${totalCloud.toLocaleString()}
                </span>
              </div>
              <div className="h-2.5 bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-red-500/50 to-red-400/30"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/40 font-mono flex items-center gap-2">
                  <HardDrive size={14} />
                  Local (5yr)
                </span>
                <span className="text-sm text-accent/60 font-mono">
                  ${totalLocal.toLocaleString()}
                </span>
              </div>
              <div className="h-2.5 bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent/30"
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${(totalLocal / totalCloud) * 100}%`,
                  }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center justify-between p-4 rounded-xl bg-accent/[0.04] border border-accent/10"
          >
            <div className="flex items-center gap-3">
              <TrendingDown className="text-accent" size={18} />
              <span className="text-sm text-white/60">
                Switch to local and save{" "}
                <span className="text-accent font-semibold">60%</span> over 5
                years
              </span>
            </div>
            <GlowButton variant="primary" size="sm" href="https://calendly.com/dizzy-from-626/30min">
              Start Saving
            </GlowButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SecuritySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: <Lock size={20} />,
      title: "Air-Gapped Deployment",
      description: "Your AI runs on your hardware, behind your firewall. No data leaves your premises.",
    },
    {
      icon: <FileKey size={20} />,
      title: "HIPAA & GDPR Compliant",
      description: "Built-in compliance frameworks for regulated industries from day one.",
    },
    {
      icon: <Database size={20} />,
      title: "You Own Your Data",
      description: "No vendor lock-in. Your models, your data, your IP. We build it, you keep it.",
    },
    {
      icon: <Globe size={20} />,
      title: "Zero-Trust Architecture",
      description: "Every request authenticated, every action logged. Enterprise-grade security by default.",
    },
  ];

  return (
    <section id="security" className="section-padding relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(167,139,250,0.04),transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <span className="section-label">The Glass Box</span>
          <h2 className="section-title">
            Your Data. Your Agents.{" "}
            <span className="text-gradient">Your IP.</span>
          </h2>
          <p className="section-subtitle">
            Unlike SaaS platforms that hold your data hostage, we build systems
            you own. Enterprise-grade privacy, zero compromise.
          </p>
        </motion.div>

        <motion.div ref={ref} className="grid sm:grid-cols-2 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-hover p-7 flex gap-5"
            >
              <div className="w-11 h-11 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function InfrastructurePage() {
  return (
    <main>
      <Navbar />
      <PageHero
        label="Private Infrastructure"
        title="Own Your AI."
        titleAccent="Own Your Data."
        subtitle="On-premise AI deployment that runs on your hardware, behind your firewall. Zero vendor lock-in, zero data exposure."
      />
      <ServiceCards />
      <ROICalculator />
      <SecuritySection />
      <Footer />
    </main>
  );
}
