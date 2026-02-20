"use client";

import { useRef, useState, useCallback } from "react";
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
    rippleColor: "rgba(79,143,234,0.3)",
  },
  secondary: {
    base: "bg-accent-purple/10 hover:bg-accent-purple/20 border-accent-purple/40 text-accent-purple",
    glow: [
      "0 0 15px rgba(167,139,250,0.15), 0 0 45px rgba(167,139,250,0.05)",
      "0 0 20px rgba(167,139,250,0.3), 0 0 60px rgba(167,139,250,0.1)",
      "0 0 15px rgba(167,139,250,0.15), 0 0 45px rgba(167,139,250,0.05)",
    ],
    rippleColor: "rgba(167,139,250,0.3)",
  },
  ghost: {
    base: "bg-white/[0.03] hover:bg-white/[0.06] border-white/10 text-white/70 hover:text-white",
    glow: ["none", "none", "none"],
    rippleColor: "rgba(255,255,255,0.15)",
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
  const buttonRef = useRef<HTMLSpanElement>(null);
  const [magOffset, setMagOffset] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.15;
      const dy = (e.clientY - cy) * 0.15;
      setMagOffset({ x: Math.max(-5, Math.min(5, dx)), y: Math.max(-5, Math.min(5, dy)) });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setMagOffset({ x: 0, y: 0 });
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
      onClick?.();
    },
    [onClick],
  );

  const buttonContent = (
    <motion.span
      ref={buttonRef}
      className={`
        relative inline-flex items-center justify-center gap-2
        rounded-full border font-medium overflow-hidden
        transition-colors duration-300 cursor-pointer
        ${v.base}
        ${sizes[size]}
        ${className}
      `}
      animate={{
        boxShadow: v.glow,
        x: magOffset.x,
        y: magOffset.y,
      }}
      transition={{
        boxShadow: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
        x: { type: "spring", stiffness: 400, damping: 25 },
        y: { type: "spring", stiffness: 400, damping: 25 },
      }}
      whileHover={{
        scale: 1.04,
        boxShadow: v.glow[1],
      }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            marginLeft: -5,
            marginTop: -5,
            backgroundColor: v.rippleColor,
          }}
        />
      ))}
    </motion.span>
  );

  if (href) {
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) {
      return (
        <a href={href} className="inline-block" onClick={handleClick}>
          {buttonContent}
        </a>
      );
    }
    return (
      <Link href={href} className="inline-block" onClick={handleClick}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className="inline-block">
      {buttonContent}
    </button>
  );
}
