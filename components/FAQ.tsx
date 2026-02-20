"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What exactly does Altair Solutions do?",
    answer:
      "We're a growth and operations partner. We combine digital marketing (ads, SEO, lead gen) with AI-powered automation (email agents, voice AI, workflow bots) and private infrastructure (on-prem AI you own). Most agencies do one of these — we do all three as one integrated system.",
  },
  {
    question: "What does \"human-in-the-loop\" mean?",
    answer:
      "It means our AI agents never act without your approval on important actions. They'll draft emails, update your CRM, and prep responses — but a human on your team reviews and approves before anything goes out. You stay in control, always.",
  },
  {
    question: "How long does it take to get set up?",
    answer:
      "Our typical engagement runs 8 weeks from kickoff to fully operational. Week 1-2 is the deep dive audit, weeks 3-6 are build and install, and weeks 7-8 are training and handover. You'll see early wins within the first 2 weeks.",
  },
  {
    question: "Do I need technical knowledge to use this?",
    answer:
      "Not at all. We build everything for you and train your team to use it. If you can use email and click an \"Approve\" button, you can operate our systems. We turn your staff into AI operators — no coding required.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "We work with healthcare, real estate, legal, e-commerce, and professional services firms. Each industry has unique workflows and compliance requirements — we customize everything to fit your specific needs.",
  },
  {
    question: "How is this different from just using ChatGPT or other AI tools?",
    answer:
      "Generic AI tools are great for one-off tasks, but they don't integrate into your workflows, they don't update your CRM, and they definitely don't call your leads in 10 seconds. We build custom agents that plug into your existing systems and work 24/7 on autopilot — with your oversight.",
  },
  {
    question: "What does the free strategy call include?",
    answer:
      "A focused 30-minute conversation where we learn your business, identify 2-3 immediate opportunities for AI and automation, and give you a clear action plan. No sales pressure, no contracts — you walk away with value whether you hire us or not.",
  },
  {
    question: "Do you own my data?",
    answer:
      "Never. Your data, your agents, your IP — everything we build belongs to you. Unlike SaaS platforms that hold your data hostage, we build systems you own outright. When we're done, you have full control.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      className="border-b border-white/[0.04]"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base font-medium text-white/80 group-hover:text-white transition-colors duration-300 pr-4">
          {question}
        </span>
        <motion.span
          className="text-white/30 shrink-0"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Plus size={16} />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: "spring", stiffness: 200, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="overflow-hidden"
          >
            <p className="text-sm text-white/40 leading-relaxed pb-5">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding relative">
      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <span className="section-label">FAQ</span>
          <h2 className="section-title">
            Common{" "}
            <span className="text-gradient">Questions.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="glass-card px-8 py-2"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
