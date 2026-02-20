"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Clock, Users, Lock, Brain, TrendingUp, CheckCircle2 } from "lucide-react";
import Marquee from "./Marquee";

const proofPoints = [
  { icon: <Shield size={16} />, text: "Human-in-the-Loop" },
  { icon: <Zap size={16} />, text: "AI-Powered Automation" },
  { icon: <Clock size={16} />, text: "10s Speed-to-Lead" },
  { icon: <Users size={16} />, text: "Full Team Training" },
  { icon: <Lock size={16} />, text: "Air-Gapped Deployment" },
  { icon: <Brain size={16} />, text: "Custom AI Agents" },
  { icon: <TrendingUp size={16} />, text: "4.2x Average ROAS" },
  { icon: <CheckCircle2 size={16} />, text: "HIPAA Compliant" },
];

export default function TrustedBy() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-14 px-6 border-y border-white/[0.04]"
    >
      <Marquee speed={35} pauseOnHover>
        {proofPoints.map((point) => (
          <div
            key={point.text}
            className="flex items-center gap-2.5 text-sm text-white/30 mx-8 whitespace-nowrap"
          >
            <span className="text-accent/40">{point.icon}</span>
            {point.text}
          </div>
        ))}
      </Marquee>
    </motion.section>
  );
}
