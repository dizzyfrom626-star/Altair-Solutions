"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
}

const variants = {
  primary: {
    base: "bg-accent/10 hover:bg-accent/20 border-accent/40 text-accent",
    glow: [
      "0 0 15px rgba(79,143,234,0.15), 0 0 45px rgba(79,143,234,0.05)",
      "0 0 20px rgba(79,143,234,0.3), 0 0 60px rgba(79,143,234,0.1)",
      "0 0 15px rgba(79,143,234,0.15), 0 0 45px rgba(79,143,234,0.05)",
    ],
  },
  secondary: {
    base: "bg-accent-purple/10 hover:bg-accent-purple/20 border-accent-purple/40 text-accent-purple",
    glow: [
      "0 0 15px rgba(167,139,250,0.15), 0 0 45px rgba(167,139,250,0.05)",
      "0 0 20px rgba(167,139,250,0.3), 0 0 60px rgba(167,139,250,0.1)",
      "0 0 15px rgba(167,139,250,0.15), 0 0 45px rgba(167,139,250,0.05)",
    ],
  },
  ghost: {
    base: "bg-white/[0.03] hover:bg-white/[0.06] border-white/10 text-white/70 hover:text-white",
    glow: ["none", "none", "none"],
  },
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function GlowButton({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
}: GlowButtonProps) {
  const v = variants[variant];

  const buttonContent = (
    <motion.span
      className={`
        relative inline-flex items-center justify-center gap-2
        rounded-full border font-medium
        transition-colors duration-300 cursor-pointer
        ${v.base}
        ${sizes[size]}
        ${className}
      `}
      animate={{
        boxShadow: v.glow,
      }}
      transition={{
        boxShadow: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: v.glow[1],
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    if (href.startsWith("#") || href.startsWith("mailto:")) {
      return (
        <a href={href} className="inline-block">
          {buttonContent}
        </a>
      );
    }
    return (
      <Link href={href} className="inline-block">
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="inline-block">
      {buttonContent}
    </button>
  );
}
