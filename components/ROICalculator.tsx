"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useInView } from "framer-motion";
import { Cloud, HardDrive, TrendingDown } from "lucide-react";
import GlowButton from "./GlowButton";

function AnimatedNumber({ value, prefix = "$" }: { value: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
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

interface YearData {
  year: number;
  cloud: number;
  local: number;
}

function generateData(monthlyCloud: number, localCost: number): YearData[] {
  return Array.from({ length: 5 }, (_, i) => ({
    year: i + 1,
    cloud: monthlyCloud * 12 * (i + 1),
    local: localCost,
  }));
}

export default function ROICalculator() {
  const [mode, setMode] = useState<"cloud" | "local">("cloud");
  const monthlyCloud = 500;
  const localOneTime = 12000;
  const data = generateData(monthlyCloud, localOneTime);

  const totalCloud = monthlyCloud * 12 * 5; // $30,000
  const totalLocal = localOneTime; // $12,000
  const savings = totalCloud - totalLocal; // $18,000

  const maxBar = totalCloud;

  return (
    <section id="roi" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-cyan/60 block mb-4">
            The Math
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            See Your{" "}
            <span className="text-gradient-main">5-Year Savings</span>
          </h2>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass-card p-8 sm:p-10"
        >
          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <button
              onClick={() => setMode("cloud")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-sm transition-all duration-300 ${
                mode === "cloud"
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              <Cloud size={16} />
              Cloud Subscription
            </button>
            <button
              onClick={() => setMode("local")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-sm transition-all duration-300 ${
                mode === "local"
                  ? "bg-cyan/10 text-cyan border border-cyan/30"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              <HardDrive size={16} />
              Local Hardware
            </button>
          </div>

          {/* Cost breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <p className="font-mono text-xs text-white/40 uppercase tracking-wider mb-2">
                {mode === "cloud" ? "Monthly Cost" : "One-Time Cost"}
              </p>
              <p className="text-3xl font-bold">
                {mode === "cloud" ? (
                  <span className="text-white/80">
                    <AnimatedNumber value={monthlyCloud} />
                    <span className="text-sm text-white/40">/mo</span>
                  </span>
                ) : (
                  <span className="text-cyan">
                    <AnimatedNumber value={localOneTime} />
                  </span>
                )}
              </p>
            </div>

            <div className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <p className="font-mono text-xs text-white/40 uppercase tracking-wider mb-2">
                5-Year Total
              </p>
              <p className="text-3xl font-bold">
                {mode === "cloud" ? (
                  <span className="text-red-400/80">
                    <AnimatedNumber value={totalCloud} />
                  </span>
                ) : (
                  <span className="text-cyan">
                    <AnimatedNumber value={totalLocal} />
                  </span>
                )}
              </p>
            </div>

            <div className="text-center p-4 rounded-xl bg-cyan/5 border border-cyan/20">
              <p className="font-mono text-xs text-cyan/60 uppercase tracking-wider mb-2">
                You Save
              </p>
              <p className="text-3xl font-bold text-cyan">
                <AnimatedNumber value={savings} />
                <span className="text-sm text-cyan/60">+</span>
              </p>
            </div>
          </div>

          {/* Visual comparison bars */}
          <div className="space-y-4 mb-10">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/50 font-mono flex items-center gap-2">
                  <Cloud size={14} />
                  Cloud (5yr)
                </span>
                <span className="text-sm text-white/40 font-mono">
                  ${totalCloud.toLocaleString()}
                </span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-red-500/60 to-red-400/40"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/50 font-mono flex items-center gap-2">
                  <HardDrive size={14} />
                  Local (5yr)
                </span>
                <span className="text-sm text-cyan/70 font-mono">
                  ${totalLocal.toLocaleString()}
                </span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan/80 to-cyan/40"
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${(totalLocal / maxBar) * 100}%`,
                  }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          </div>

          {/* Savings highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-cyan/10 to-purple/10 border border-cyan/20"
          >
            <div className="flex items-center gap-3">
              <TrendingDown className="text-cyan" size={20} />
              <span className="text-sm text-white/70">
                Switch to local and save{" "}
                <span className="text-cyan font-bold">60%</span> over 5 years
              </span>
            </div>
            <GlowButton variant="cyan" size="sm" href="#contact">
              Start Saving
            </GlowButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
