"use client";

import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import {
  ShieldCheck,
  Check,
  Mail,
  MessageSquare,
  Clock,
  User,
  Bot,
  Sparkles,
} from "lucide-react";

const agentSteps = [
  {
    icon: <Mail size={14} />,
    label: "New lead received",
    detail: "john.miller@acmecorp.com — Inbound Form",
    time: "2s ago",
    status: "complete" as const,
  },
  {
    icon: <Bot size={14} />,
    label: "Agent drafted response",
    detail: "Personalized follow-up email with meeting link",
    time: "1s ago",
    status: "complete" as const,
  },
  {
    icon: <MessageSquare size={14} />,
    label: "CRM updated",
    detail: "Lead stage → Contacted, notes added",
    time: "1s ago",
    status: "complete" as const,
  },
  {
    icon: <Clock size={14} />,
    label: "Awaiting your approval",
    detail: "Email ready to send — review below",
    time: "Now",
    status: "pending" as const,
  },
];

const draftEmail = {
  to: "john.miller@acmecorp.com",
  subject: "Re: Your inquiry about workflow automation",
  body: `Hi John,

Thanks for reaching out! I saw you're interested in streamlining your team's lead management process.

I'd love to walk you through how we've helped similar companies cut response times by 85%. Would Thursday at 2pm work for a quick 15-minute call?

Best,
Sarah`,
};

export default function ControlCenter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [approved, setApproved] = useState(false);

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,143,234,0.04),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <span className="section-label">The Control Center</span>
          <h2 className="section-title">
            Human-in-the-Loop.{" "}
            <span className="text-gradient">Always.</span>
          </h2>
          <p className="section-subtitle">
            Our agents don&apos;t go rogue. They draft, organize, and prep.
            You review, approve, and close. 100% control, 0% drudgery.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-6"
        >
          {/* Agent activity log */}
          <div className="glass-card p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 rounded-lg bg-accent/10">
                <Sparkles size={16} className="text-accent" />
              </div>
              <span className="text-sm font-medium text-white/70">
                Agent Activity
              </span>
              <span className="ml-auto flex items-center gap-1.5 text-xs font-mono text-emerald-400/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>

            <div className="space-y-4">
              {agentSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                  className="flex items-start gap-3"
                >
                  <div className="relative mt-1">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        step.status === "complete"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-accent/10 text-accent animate-pulse"
                      }`}
                    >
                      {step.icon}
                    </div>
                    {i < agentSteps.length - 1 && (
                      <div className="absolute top-7 left-1/2 -translate-x-1/2 w-px h-6 bg-white/[0.06]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white/80 font-medium">
                        {step.label}
                      </span>
                      <span className="text-[10px] font-mono text-white/30">
                        {step.time}
                      </span>
                    </div>
                    <span className="text-xs text-white/40 block mt-0.5 truncate">
                      {step.detail}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Email draft preview with approve button */}
          <div className="glass-card p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 rounded-lg bg-accent-purple/10">
                <User size={16} className="text-accent-purple" />
              </div>
              <span className="text-sm font-medium text-white/70">
                Your Review
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="rounded-xl bg-black/30 border border-white/[0.04] p-5"
            >
              <div className="space-y-2 mb-4 text-xs font-mono">
                <div className="flex gap-2">
                  <span className="text-white/30">To:</span>
                  <span className="text-white/60">{draftEmail.to}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-white/30">Subject:</span>
                  <span className="text-white/60">{draftEmail.subject}</span>
                </div>
              </div>
              <div className="h-px bg-white/[0.04] mb-4" />
              <pre className="text-sm text-white/50 whitespace-pre-wrap font-sans leading-relaxed">
                {draftEmail.body}
              </pre>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="mt-5 flex items-center gap-3"
            >
              <AnimatePresence mode="wait">
                {!approved ? (
                  <motion.button
                    key="approve"
                    onClick={() => setApproved(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/10 border border-accent/30 text-accent text-sm font-medium hover:bg-accent/20 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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
                    Sent! Lead notified in 12 seconds.
                  </motion.div>
                )}
              </AnimatePresence>

              {!approved && (
                <button className="px-4 py-2.5 rounded-xl text-sm text-white/40 hover:text-white/60 hover:bg-white/[0.03] transition-colors">
                  Edit Draft
                </button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
