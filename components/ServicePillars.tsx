"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Megaphone,
  Bot,
  Server,
  ArrowRight,
  Zap,
  TrendingUp,
  Shield,
  Phone,
  Brain,
  Lock,
} from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    icon: <Megaphone size={24} />,
    title: "Growth Engine",
    subtitle: "Digital Marketing",
    description:
      "AI-enhanced paid ads, SEO, and lead generation that fills your pipeline — then hands off to your AI workforce.",
    features: [
      { icon: <TrendingUp size={14} />, text: "Paid ads & SEO management" },
      { icon: <Phone size={14} />, text: "Speed-to-lead in under 10 seconds" },
      { icon: <Zap size={14} />, text: "AI-optimized campaign performance" },
    ],
    href: "/growth",
    iconColor: "text-sky-400",
    iconBg: "bg-sky-400/10 border-sky-400/20",
    titleHover: "group-hover:text-sky-400",
    featureColor: "text-sky-400/60",
    gradient: "from-sky-400/10 to-transparent",
    linkColor: "text-sky-400/70 group-hover:text-sky-400",
  },
  {
    icon: <Bot size={24} />,
    title: "AI Workforce",
    subtitle: "Agentic Automation",
    description:
      "Custom AI agents that handle your repetitive tasks — drafting emails, updating CRMs, routing tickets — with you always in control.",
    features: [
      { icon: <Brain size={14} />, text: "Custom-built AI agents" },
      { icon: <Shield size={14} />, text: "Human-in-the-loop approval" },
      { icon: <Zap size={14} />, text: "Workflow automation at scale" },
    ],
    href: "/automation",
    iconColor: "text-accent",
    iconBg: "bg-accent/10 border-accent/20",
    titleHover: "group-hover:text-accent",
    featureColor: "text-accent/60",
    gradient: "from-accent/10 to-transparent",
    linkColor: "text-accent/70 group-hover:text-accent",
  },
  {
    icon: <Server size={24} />,
    title: "Private Infrastructure",
    subtitle: "Local AI Deployment",
    description:
      "On-premise AI that you own. Your data never leaves your building. Enterprise-grade security with zero vendor lock-in.",
    features: [
      { icon: <Lock size={14} />, text: "On-prem, air-gapped deployment" },
      { icon: <Shield size={14} />, text: "HIPAA & GDPR compliant" },
      { icon: <Zap size={14} />, text: "60% cost savings vs. cloud" },
    ],
    href: "/infrastructure",
    iconColor: "text-accent-purple",
    iconBg: "bg-accent-purple/10 border-accent-purple/20",
    titleHover: "group-hover:text-accent-purple",
    featureColor: "text-accent-purple/60",
    gradient: "from-accent-purple/10 to-transparent",
    linkColor: "text-accent-purple/70 group-hover:text-accent-purple",
  },
];

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
      {/* Shine overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          opacity: isHovered ? 0.06 : 0,
          background: `radial-gradient(circle at ${(tilt.y / 8 + 0.5) * 100}% ${(-tilt.x / 8 + 0.5) * 100}%, rgba(255,255,255,0.15), transparent 60%)`,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}

export default function ServicePillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(167,139,250,0.03),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <span className="section-label">What We Build</span>
          <h2 className="section-title">
            Three Pillars.{" "}
            <span className="text-gradient">One System.</span>
          </h2>
          <p className="section-subtitle">
            We don&apos;t just run ads or build bots. We install a complete
            growth and operations engine — with you in the driver&apos;s seat.
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          style={{ y }}
          className="grid md:grid-cols-3 gap-5"
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <TiltCard className="relative h-full">
                <Link href={pillar.href} className="block group h-full">
                  <div className="glass-card-hover shimmer-border p-7 sm:p-8 h-full relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-b ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    <div className="relative z-10">
                      <motion.div
                        className={`w-12 h-12 rounded-xl border flex items-center justify-center ${pillar.iconColor} ${pillar.iconBg} mb-6`}
                        whileHover={{ y: -4 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                        }}
                      >
                        {pillar.icon}
                      </motion.div>

                      <div className="mb-4">
                        <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
                          {pillar.subtitle}
                        </span>
                        <h3
                          className={`text-xl font-bold text-white mt-1 transition-colors duration-300 ${pillar.titleHover}`}
                        >
                          {pillar.title}
                        </h3>
                      </div>

                      <p className="text-sm text-white/40 leading-relaxed mb-6">
                        {pillar.description}
                      </p>

                      <div className="space-y-3 mb-8">
                        {pillar.features.map((feature, j) => (
                          <div
                            key={j}
                            className="flex items-center gap-2.5 text-sm text-white/50"
                          >
                            <span className={pillar.featureColor}>
                              {feature.icon}
                            </span>
                            {feature.text}
                          </div>
                        ))}
                      </div>

                      <div
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${pillar.linkColor}`}
                      >
                        Learn more
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1.5 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
