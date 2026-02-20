"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Bot,
  Phone,
  GitBranch,
  ShieldCheck,
  Mail,
  MessageSquare,
  Bell,
  Check,
  Play,
  Pause,
  CheckCircle2,
  Workflow,
  Repeat,
  Brain,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";

const demoTabs = [
  { id: "voice", label: "Hear the Agent", icon: <Phone size={16} /> },
  { id: "triage", label: "See the Logic", icon: <GitBranch size={16} /> },
  { id: "control", label: "Approve Actions", icon: <ShieldCheck size={16} /> },
];

function VoiceDemo() {
  const [playing, setPlaying] = useState(false);

  const transcript = [
    {
      speaker: "AI Agent",
      text: "Hi, is this John? This is Sarah's assistant from Altair Solutions — you submitted a form about workflow automation?",
      isAI: true,
    },
    {
      speaker: "John",
      text: "Oh yeah, I did that like 2 minutes ago. That was fast.",
      isAI: false,
    },
    {
      speaker: "AI Agent",
      text: "We try to be quick! Sarah asked me to reach out. She'd love to walk you through how we've helped companies like yours save about 20 hours a week. Would Thursday at 2pm work?",
      isAI: true,
    },
    {
      speaker: "John",
      text: "Yeah, Thursday works. Put me down.",
      isAI: false,
    },
    {
      speaker: "AI Agent",
      text: "Done! I'm sending you a calendar invite right now. Looking forward to connecting you with Sarah. Have a great day, John.",
      isAI: true,
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <motion.button
          onClick={() => setPlaying(!playing)}
          className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent hover:bg-accent/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </motion.button>
        <div className="flex-1">
          <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full bg-accent/40 rounded-full"
              initial={{ width: "0%" }}
              animate={playing ? { width: "100%" } : {}}
              transition={{ duration: 15, ease: "linear" }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] font-mono text-white/30">
              Sample conversation
            </span>
            <span className="text-[10px] font-mono text-white/30">0:42</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
        {transcript.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.15 }}
            className={`flex gap-3 ${line.isAI ? "" : "flex-row-reverse"}`}
          >
            <div
              className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                line.isAI
                  ? "bg-accent/10 text-accent"
                  : "bg-white/[0.06] text-white/50"
              }`}
            >
              {line.isAI ? <Bot size={14} /> : "J"}
            </div>
            <div
              className={`rounded-xl px-4 py-2.5 max-w-[80%] ${
                line.isAI
                  ? "bg-accent/[0.06] border border-accent/10"
                  : "bg-white/[0.04] border border-white/[0.06]"
              }`}
            >
              <span className="text-[10px] font-mono text-white/30 block mb-1">
                {line.speaker}
              </span>
              <p className="text-sm text-white/60 leading-relaxed">
                {line.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TriageDemo() {
  const steps = [
    {
      icon: <Mail size={16} />,
      label: "Email received",
      detail: "New support ticket from client",
      boxClass: "bg-accent/10 text-accent",
    },
    {
      icon: <Brain size={16} />,
      label: "Agent reads & classifies",
      detail: 'Priority: High — Category: "Billing"',
      boxClass: "bg-accent-purple/10 text-accent-purple",
    },
    {
      icon: <Repeat size={16} />,
      label: "CRM updated",
      detail: "Ticket #4892 created, assigned to billing team",
      boxClass: "bg-sky-400/10 text-sky-400",
    },
    {
      icon: <Bell size={16} />,
      label: "Slack alert sent",
      detail: "#billing-support: New high-priority ticket",
      boxClass: "bg-emerald-400/10 text-emerald-400",
    },
    {
      icon: <MessageSquare size={16} />,
      label: "Auto-reply drafted",
      detail: "Awaiting human approval before sending",
      boxClass: "bg-accent/10 text-accent",
    },
  ];

  return (
    <div className="space-y-3">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-start gap-3"
        >
          <div className="relative">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${step.boxClass}`}
            >
              {step.icon}
            </div>
            {i < steps.length - 1 && (
              <motion.div
                className="absolute top-8 left-1/2 -translate-x-1/2 w-px bg-white/[0.08]"
                initial={{ height: 0 }}
                animate={{ height: 20 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.12 }}
              />
            )}
          </div>
          <div className="pt-1">
            <span className="text-sm text-white/70 font-medium block">
              {step.label}
            </span>
            <span className="text-xs text-white/35 block mt-0.5">
              {step.detail}
            </span>
          </div>
          <div className="ml-auto pt-1.5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 400, damping: 15 }}
            >
              <CheckCircle2 size={14} className="text-emerald-400/50" />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ControlDemo() {
  const [approved, setApproved] = useState(false);

  return (
    <div>
      <div className="rounded-xl bg-black/20 border border-white/[0.04] p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Bot size={14} className="text-accent" />
          <span className="text-xs font-mono text-white/40">
            Agent-drafted response
          </span>
        </div>
        <div className="text-sm text-white/60 leading-relaxed space-y-2">
          <p>Hi Sarah,</p>
          <p>
            I&apos;ve looked into your billing concern. It appears the double charge on
            invoice #2847 was due to a payment processing delay. I&apos;ve initiated a
            refund of $249.00 which should appear within 3-5 business days.
          </p>
          <p>
            If you need anything else, don&apos;t hesitate to reach out. We appreciate
            your patience.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <AnimatePresence mode="wait">
          {!approved ? (
            <motion.button
              key="approve"
              onClick={() => setApproved(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/10 border border-accent/30 text-accent text-sm font-medium hover:bg-accent/20 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(79,143,234,0)",
                  "0 0 0 6px rgba(79,143,234,0.1)",
                  "0 0 0 0 rgba(79,143,234,0)",
                ],
              }}
              transition={{
                boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <ShieldCheck size={16} />
              Approve & Send
            </motion.button>
          ) : (
            <motion.div
              key="approved"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium"
            >
              <Check size={16} />
              Approved! Response sent.
            </motion.div>
          )}
        </AnimatePresence>
        {!approved && (
          <button className="px-4 py-2.5 rounded-xl text-sm text-white/40 hover:text-white/60 hover:bg-white/[0.03] transition-colors">
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState("voice");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,143,234,0.04),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <span className="section-label">Interactive Demo</span>
          <h2 className="section-title">
            See It{" "}
            <span className="text-gradient">In Action.</span>
          </h2>
          <p className="section-subtitle">
            Explore how our AI agents handle real scenarios — with you always in the loop.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Tabs with layoutId animated indicator */}
          <div className="flex justify-center gap-2 mb-8">
            {demoTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-300"
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="demo-tab-bg"
                    className="absolute inset-0 bg-accent/10 border border-accent/20 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${
                  activeTab === tab.id ? "text-accent" : "text-white/40 hover:text-white/60"
                }`}>
                  {tab.icon}
                </span>
                <span className={`relative z-10 ${
                  activeTab === tab.id ? "text-accent" : "text-white/40 hover:text-white/60"
                }`}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-card p-8"
            >
              {activeTab === "voice" && <VoiceDemo />}
              {activeTab === "triage" && <TriageDemo />}
              {activeTab === "control" && <ControlDemo />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function WorkflowExamples() {
  const examples = [
    {
      icon: <Mail size={20} />,
      title: "Email & Inbox Management",
      description:
        "AI reads, classifies, and drafts responses. You approve before anything sends.",
    },
    {
      icon: <Phone size={20} />,
      title: "Voice AI & Phone Handling",
      description:
        "Inbound and outbound calls handled by natural-sounding AI agents, 24/7.",
    },
    {
      icon: <Workflow size={20} />,
      title: "CRM & Pipeline Automation",
      description:
        "Leads scored, contacts updated, tasks created — without manual data entry.",
    },
    {
      icon: <MessageSquare size={20} />,
      title: "Customer Support Triage",
      description:
        "Tickets classified, routed, and draft-resolved in seconds, not hours.",
    },
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
            Workflows We{" "}
            <span className="text-gradient">Automate.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {examples.map((ex, i) => (
            <motion.div
              key={ex.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true }}
              className="glass-card-hover shimmer-border p-7 flex gap-5"
            >
              <div className="w-11 h-11 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple shrink-0">
                {ex.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1">
                  {ex.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {ex.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AutomationPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        label="AI Workforce"
        title="Your Team's New"
        titleAccent="AI Coworkers."
        subtitle="Custom-built AI agents that handle your busywork — drafting, routing, calling, updating — with human approval on every action that matters."
      />
      <InteractiveDemo />
      <WorkflowExamples />
      <Footer />
    </main>
  );
}
