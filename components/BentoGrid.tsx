"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck,
  Server,
  Eye,
  BadgeCheck,
} from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  className?: string;
  children?: React.ReactNode;
}

function ServiceCard({
  icon,
  title,
  description,
  badge,
  className = "",
  children,
}: ServiceCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(0,243,255,0.3)",
      }}
      transition={{ duration: 0.3 }}
      className={`glass-card p-8 relative group overflow-hidden cursor-default ${className}`}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Header with icon and badge */}
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-cyan">
            {icon}
          </div>
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <BadgeCheck size={12} />
              {badge}
            </span>
          )}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan transition-colors duration-300">
          {title}
        </h3>
        <p className="text-white/50 leading-relaxed text-sm">{description}</p>

        {/* Optional extra content */}
        {children}
      </div>
    </motion.div>
  );
}

function TerminalBlock() {
  const lines = [
    { prompt: true, text: "ollama run llama3:70b" },
    { prompt: false, text: "pulling manifest..." },
    { prompt: false, text: "pulling 8eeb52dfb3bb... 100%" },
    { prompt: false, text: "verifying sha256 digest ✓" },
    { prompt: false, text: "" },
    { prompt: false, text: "Model running locally on :11434" },
  ];

  return (
    <div className="mt-6 rounded-xl bg-black/40 border border-white/5 p-4 font-mono text-xs">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
      </div>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: i * 0.2, duration: 0.4 }}
          viewport={{ once: true }}
          className="text-white/60"
        >
          {line.prompt && <span className="text-cyan mr-2">$</span>}
          {line.text.includes("✓") ? (
            <span>
              {line.text.replace("✓", "")}
              <span className="text-emerald-400">✓</span>
            </span>
          ) : line.text.includes("100%") ? (
            <span>
              {line.text.replace("100%", "")}
              <span className="text-cyan">100%</span>
            </span>
          ) : line.text.includes(":11434") ? (
            <span className="text-emerald-400">{line.text}</span>
          ) : (
            line.text
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default function BentoGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-cyan/60 block mb-4">
            What We Build
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            Your AI.{" "}
            <span className="text-gradient-main">Your Rules.</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min"
        >
          {/* Card 1: OpenClaw Hardening - spans 2 cols */}
          <ServiceCard
            icon={<ShieldCheck size={24} />}
            title="Secure OpenClaw Hardening"
            description="Production-grade security for your AI pipelines. We implement Cisco Skill Scanning, isolated Docker enclaves, and zero-trust network policies so your models stay locked down."
            badge="Verified"
            className="lg:col-span-2"
          >
            <div className="mt-6 flex flex-wrap gap-2">
              {["Docker Enclaves", "Cisco Scanning", "Zero-Trust", "E2E Encryption"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/50"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </ServiceCard>

          {/* Card 2: Local LLM Deployment - spans 2 cols, 2 rows (tall) */}
          <ServiceCard
            icon={<Server size={24} />}
            title="Local LLM Deployment"
            description="Run Llama 3, Mistral, and custom fine-tuned models on your own hardware. Full Ollama integration with GPU acceleration and automatic failover."
            className="lg:col-span-2 lg:row-span-2"
          >
            <TerminalBlock />
          </ServiceCard>

          {/* Card 3: Shadow AI Governance - spans 2 cols */}
          <ServiceCard
            icon={<Eye size={24} />}
            title="Shadow AI Governance & Audits"
            description="Discover unauthorized AI tools across your organization. We audit, report, and help you consolidate shadow AI into governed, secure workflows."
            className="lg:col-span-2"
          >
            <div className="mt-6 space-y-2">
              {[
                { label: "AI Tool Discovery", status: "complete" },
                { label: "Risk Assessment", status: "complete" },
                { label: "Policy Framework", status: "active" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 text-xs font-mono"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.status === "complete"
                        ? "bg-emerald-400"
                        : "bg-cyan animate-pulse"
                    }`}
                  />
                  <span className="text-white/50">{item.label}</span>
                  <span
                    className={`ml-auto text-[10px] uppercase tracking-wider ${
                      item.status === "complete"
                        ? "text-emerald-400/60"
                        : "text-cyan/60"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </ServiceCard>
        </motion.div>
      </div>
    </section>
  );
}
