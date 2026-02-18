"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Megaphone,
  Bot,
  Server,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import GlowButton from "./GlowButton";

const services = [
  {
    label: "Growth Engine",
    href: "/growth",
    icon: <Megaphone size={20} />,
    description: "Paid ads, SEO, and AI-powered lead generation",
    color: "text-accent-cyan",
  },
  {
    label: "AI Workforce",
    href: "/automation",
    icon: <Bot size={20} />,
    description: "Agentic AI automation with human-in-the-loop",
    color: "text-accent",
  },
  {
    label: "Infrastructure",
    href: "/infrastructure",
    icon: <Server size={20} />,
    description: "On-prem AI deployment you own and control",
    color: "text-accent-purple",
  },
];

const navLinks = [
  { label: "How We Work", href: "/how-we-work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.06]);
  const bgColor = useMotionTemplate`rgba(6, 6, 10, ${bgOpacity})`;
  const borderColor = useMotionTemplate`1px solid rgba(255, 255, 255, ${borderOpacity})`;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        className="absolute inset-0 backdrop-blur-2xl"
        style={{
          backgroundColor: bgColor,
          borderBottom: borderColor,
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center">
            <span className="text-background font-bold text-sm">A</span>
          </div>
          <span className="text-lg font-semibold text-white tracking-tight">
            Altair Solutions
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {/* Services dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1 px-3 py-2 text-sm text-white/60 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/[0.03]"
            >
              Services
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[380px] rounded-2xl glass p-2"
                >
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={() => setServicesOpen(false)}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors duration-200 group/item"
                    >
                      <div
                        className={`mt-0.5 p-2 rounded-lg bg-white/[0.04] ${service.color}`}
                      >
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white group-hover/item:text-accent transition-colors">
                            {service.label}
                          </span>
                          <ArrowRight
                            size={12}
                            className="opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 text-accent"
                          />
                        </div>
                        <span className="text-xs text-white/40 mt-0.5 block">
                          {service.description}
                        </span>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-white/60 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/[0.03]"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-white/60 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/[0.03]"
              >
                {link.label}
              </Link>
            )
          )}

          <div className="ml-4">
            <GlowButton variant="primary" size="sm" href="https://calendly.com/dizzy-from-626/30min">
              Book a Call
            </GlowButton>
          </div>
        </div>

        <button
          className="md:hidden text-white/80 hover:text-accent transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="relative md:hidden glass border-t border-white/[0.06]"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              <span className="text-xs font-mono text-white/30 uppercase tracking-wider px-3 mb-1">
                Services
              </span>
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/[0.04] transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className={service.color}>{service.icon}</span>
                  <span>{service.label}</span>
                </Link>
              ))}
              <div className="h-px bg-white/[0.06] my-2" />
              {navLinks.map((link) =>
                link.href.startsWith("#") ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-3 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/[0.04] transition-all"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/[0.04] transition-all"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="mt-2">
                <GlowButton variant="primary" size="sm" href="https://calendly.com/dizzy-from-626/30min">
                  Book a Call
                </GlowButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
