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
  BadgeCheck,
  FileKey,
  Globe,
  Database,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import ROICalculator from "@/components/ROICalculator";

function TerminalTyping({ lines, isInView }: { lines: { prompt: boolean; text: string }[]; isInView: boolean }) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const timer = setInterval(() => {
      if (i < lines.length) {
        setVisibleLines(i + 1);
        i++;
      } else {
        clearInterval(timer);
      }
    }, 300);
    return () => clearInterval(timer);
  }, [isInView, lines.length]);

  return (
    <div className="rounded-xl bg-black/30 border border-white/[0.04] p-4 font-mono text-xs">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-2 h-2 rounded-full bg-red-500/50" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
        <div className="w-2 h-2 rounded-full bg-green-500/50" />
      </div>
      {lines.slice(0, visibleLines).map((line, j) => (
        <motion.div
          key={j}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-white/50"
        >
          {line.prompt && <span className="text-accent mr-2">$</span>}
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
      {visibleLines < lines.length && isInView && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-[6px] h-[12px] bg-accent/60 ml-0.5"
        />
      )}
    </div>
  );
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
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="glass-card-hover shimmer-border p-7"
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
                <TerminalTyping lines={terminalLines} isInView={isInView} />
              )}

              {card.steps && (
                <div className="space-y-2">
                  {card.steps.map((step, j) => (
                    <motion.div
                      key={step.label}
                      className="flex items-center gap-2.5 text-xs font-mono"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + j * 0.1 }}
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
                    </motion.div>
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
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="glass-card-hover shimmer-border p-7 flex gap-5"
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

export default function InfrastructurePageClient() {
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
