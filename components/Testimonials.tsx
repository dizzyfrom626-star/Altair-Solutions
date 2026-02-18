"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Target,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import GlowButton from "./GlowButton";

const CALENDLY_URL = "https://calendly.com/dizzy-from-626/30min";

const expectations = [
  {
    icon: <Target size={20} />,
    title: "We learn your business",
    description:
      "We ask about your current workflows, pain points, and goals — no pitch, just listening.",
  },
  {
    icon: <Clock size={20} />,
    title: "We identify quick wins",
    description:
      "We'll map out 2-3 immediate opportunities where AI and automation can save you time and money.",
  },
  {
    icon: <Calendar size={20} />,
    title: "You get an action plan",
    description:
      "You leave with a clear, no-obligation roadmap — whether you work with us or not.",
  },
];

const noStrings = [
  "No contracts or commitments",
  "No technical jargon — we speak business",
  "30 minutes, focused and actionable",
  "Your data and ideas stay yours",
];

export default function BookingSection() {
  return (
    <section id="booking" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(167,139,250,0.03),transparent_60%)]" />
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <span className="section-label">Free Strategy Call</span>
          <h2 className="section-title">
            Here&apos;s What Happens{" "}
            <span className="text-gradient">On the Call.</span>
          </h2>
          <p className="section-subtitle">
            No sales pressure. Just a focused conversation about your business
            and where AI can make a real difference.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: what to expect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {expectations.map((item, i) => (
              <div key={i} className="glass-card p-6 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right: CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true }}
            className="glass-card p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Book your free 30-minute call
              </h3>
              <p className="text-sm text-white/40 mb-6 leading-relaxed">
                Pick a time that works for you. We&apos;ll come prepared with
                initial ideas for your industry.
              </p>

              <div className="space-y-3 mb-8">
                {noStrings.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 text-sm text-white/50"
                  >
                    <CheckCircle2 size={14} className="text-emerald-400/50 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <GlowButton variant="primary" size="lg" href={CALENDLY_URL}>
              Pick a Time
              <ArrowRight size={18} />
            </GlowButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
