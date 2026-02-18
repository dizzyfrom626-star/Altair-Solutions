"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Clock, Users } from "lucide-react";

const proofPoints = [
  { icon: <Shield size={16} />, text: "Human-in-the-Loop" },
  { icon: <Zap size={16} />, text: "AI-Powered Automation" },
  { icon: <Clock size={16} />, text: "10s Speed-to-Lead" },
  { icon: <Users size={16} />, text: "Full Team Training" },
];

export default function TrustedBy() {
  return (
    <section className="py-14 px-6 border-y border-white/[0.03]">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {proofPoints.map((point, i) => (
            <motion.div
              key={point.text}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-sm text-white/25"
            >
              <span className="text-accent/30">{point.icon}</span>
              {point.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
