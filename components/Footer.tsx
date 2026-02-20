"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Twitter, Mail } from "lucide-react";
import Link from "next/link";
import GlowButton from "./GlowButton";

const CALENDLY_URL = "https://calendly.com/dizzy-from-626/30min";

const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "Growth Engine", href: "/growth" },
      { label: "AI Workforce", href: "/automation" },
      { label: "Infrastructure", href: "/infrastructure" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How We Work", href: "/how-we-work" },
      { label: "Contact", href: "#contact" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "ROI Calculator", href: "/infrastructure#roi" },
      { label: "Security", href: "/infrastructure#security" },
      { label: "FAQ", href: "#faq" },
    ],
  },
];

const socialLinks = [
  { icon: <Twitter size={16} />, href: "#", label: "Twitter" },
  { icon: <Linkedin size={16} />, href: "#", label: "LinkedIn" },
  { icon: <Mail size={16} />, href: "mailto:AltairSolutions.info@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative">
      {/* Gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="py-24 sm:py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Ready to{" "}
            <span className="text-gradient">Build Your Engine?</span>
          </h2>
          <p className="text-muted-light text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Stop juggling tools and guessing at growth. Let&apos;s install a
            system that fills your pipeline, automates your operations, and keeps
            you in control.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlowButton variant="primary" size="lg" href={CALENDLY_URL}>
              Book a Free Strategy Call
              <ArrowUpRight size={18} />
            </GlowButton>
            <GlowButton
              variant="ghost"
              size="lg"
              href="mailto:AltairSolutions.info@gmail.com"
            >
              AltairSolutions.info@gmail.com
            </GlowButton>
          </div>
        </motion.div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10"
        >
          <motion.div
            className="col-span-2 md:col-span-1"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center">
                <span className="text-background font-bold text-xs">A</span>
              </div>
              <span className="text-sm font-semibold text-white">
                Altair Solutions
              </span>
            </Link>
            <p className="text-xs text-white/30 leading-relaxed max-w-[200px]">
              Growth and operations partner. We build the engine — you hold the
              keys.
            </p>
          </motion.div>

          {footerColumns.map((col) => (
            <motion.div
              key={col.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <h4 className="text-xs font-mono text-white/40 uppercase tracking-wider mb-4">
                {col.title}
              </h4>
              <div className="space-y-3">
                {col.links.map((link) =>
                  link.href.startsWith("#") ? (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block text-sm text-white/30 hover:text-white/60 transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      <div className="px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Altair Solutions. All rights reserved.
          </span>
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-2 rounded-lg text-white/25 hover:text-accent hover:bg-white/[0.03] transition-all duration-300"
                whileHover={{ scale: 1.15, boxShadow: "0 0 12px rgba(79,143,234,0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
