"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Building2,
  Stethoscope,
  Home,
  Scale,
  ShoppingCart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const industries = [
  {
    id: "healthcare",
    label: "Healthcare",
    icon: <Stethoscope size={18} />,
    headline: "HIPAA-Compliant AI That Actually Saves Time",
    description:
      "From patient intake triage to appointment scheduling, our agents handle the admin so your staff can focus on care.",
    painPoints: [
      "Drowning in patient intake paperwork",
      "Missed follow-ups and no-shows",
      "Compliance anxiety with every new tool",
    ],
    solutions: [
      "AI triage agents that route patients instantly",
      "Automated appointment reminders and rescheduling",
      "On-prem deployment — your data never leaves your facility",
    ],
    stat: { value: "73%", label: "reduction in admin time" },
  },
  {
    id: "realestate",
    label: "Real Estate",
    icon: <Home size={18} />,
    headline: "Turn Every Lead Into a Conversation in Under 10 Seconds",
    description:
      "Speed-to-lead wins deals. Our system responds to inquiries instantly while your agents sleep.",
    painPoints: [
      "Leads go cold in minutes, not hours",
      "Manually qualifying hundreds of inquiries",
      "CRM data is always outdated",
    ],
    solutions: [
      "AI voice agent calls new leads within seconds",
      "Automated lead qualification and CRM updates",
      "Smart follow-up sequences that feel personal",
    ],
    stat: { value: "4.2x", label: "more appointments booked" },
  },
  {
    id: "legal",
    label: "Legal",
    icon: <Scale size={18} />,
    headline: "Privileged Data Deserves Private Infrastructure",
    description:
      "Attorney-client privilege demands airtight security. Our local AI deployment meets that standard.",
    painPoints: [
      "Cloud AI raises privilege and confidentiality concerns",
      "Paralegals buried in document review",
      "Client communication delays hurt retention",
    ],
    solutions: [
      "Air-gapped AI for document analysis and summarization",
      "Automated client status updates with approval gates",
      "Intake forms processed and routed in seconds",
    ],
    stat: { value: "60%", label: "faster document review" },
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: <ShoppingCart size={18} />,
    headline: "Scale Your Store Without Scaling Your Support Team",
    description:
      "Handle 10x the customer volume with AI agents that manage tickets, track orders, and recover carts.",
    painPoints: [
      "Support tickets pile up during peak seasons",
      "Cart abandonment eats into revenue",
      "Manual order tracking takes hours",
    ],
    solutions: [
      "AI support agents with full order system access",
      "Automated cart recovery via email and SMS",
      "Intelligent ticket routing and escalation",
    ],
    stat: { value: "38%", label: "increase in recovered revenue" },
  },
  {
    id: "professional",
    label: "Professional Services",
    icon: <Building2 size={18} />,
    headline: "Automate the Back Office. Focus on Billable Hours.",
    description:
      "Consulting firms, agencies, and service businesses — reclaim the hours lost to admin and operations.",
    painPoints: [
      "Non-billable admin work eats margins",
      "Client onboarding is slow and manual",
      "Proposals and reports take days to assemble",
    ],
    solutions: [
      "AI-drafted proposals and reports in minutes",
      "Automated client onboarding workflows",
      "Smart scheduling and resource allocation",
    ],
    stat: { value: "22hrs", label: "saved per team member weekly" },
  },
];

export default function IndustryTabs() {
  const [activeTab, setActiveTab] = useState("healthcare");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const activeIndustry = industries.find((i) => i.id === activeTab)!;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.03),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <span className="section-label">Industries</span>
          <h2 className="section-title">
            Built for{" "}
            <span className="text-gradient">Your Industry.</span>
          </h2>
          <p className="section-subtitle">
            Every vertical has unique pain points. We learn your industry deeply,
            then templatize the solution for maximum impact.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Tab bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setActiveTab(industry.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === industry.id
                    ? "bg-accent/10 text-accent border border-accent/20"
                    : "text-white/40 hover:text-white/60 hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                {industry.icon}
                <span className="hidden sm:inline">{industry.label}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-8 sm:p-10"
            >
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Left: headline + pain points */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                    {activeIndustry.headline}
                  </h3>
                  <p className="text-muted-light mb-8 leading-relaxed">
                    {activeIndustry.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-xs font-mono text-red-400/60 uppercase tracking-wider">
                      The Problem
                    </span>
                    <div className="mt-3 space-y-3">
                      {activeIndustry.painPoints.map((point, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 text-sm text-white/40"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400/40 mt-1.5 shrink-0" />
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: solutions + stat */}
                <div>
                  <div className="mb-8">
                    <span className="text-xs font-mono text-emerald-400/60 uppercase tracking-wider">
                      Our Solution
                    </span>
                    <div className="mt-3 space-y-3">
                      {activeIndustry.solutions.map((solution, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 text-sm text-white/60"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-emerald-400/60 mt-0.5 shrink-0"
                          />
                          {solution}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stat callout */}
                  <div className="p-5 rounded-xl bg-accent/[0.04] border border-accent/10">
                    <div className="text-3xl font-bold text-accent mb-1">
                      {activeIndustry.stat.value}
                    </div>
                    <div className="text-sm text-white/40">
                      {activeIndustry.stat.label}
                    </div>
                  </div>

                  <div className="mt-6">
                    <a
                      href="https://calendly.com/dizzy-from-626/30min"
                      className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors"
                    >
                      Get a free audit for your industry
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
