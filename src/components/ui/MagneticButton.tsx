"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";

interface BaseProps {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  strength?: number;
  cursorLabel?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-black hover:bg-white/90 shadow-[0_8px_30px_-8px_rgba(91,140,255,0.5)]",
  outline:
    "border border-line-strong bg-white/[0.02] text-ink hover:bg-white/[0.06]",
  ghost: "text-ink-dim hover:text-ink",
};

function useMagnet(strength: number) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const ref = useRef<HTMLElement>(null);

  function onMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set((mx / r.width) * strength);
    y.set((my / r.height) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }
  return { ref, sx, sy, onMove, onLeave };
}

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-colors duration-300 will-change-transform";

export function MagneticButton({
  children,
  className,
  variant = "primary",
  strength = 22,
  cursorLabel,
  onClick,
}: BaseProps & { onClick?: () => void }) {
  const { ref, sx, sy, onMove, onLeave } = useMagnet(strength);
  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      data-cursor={cursorLabel}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </motion.button>
  );
}

export function MagneticLink({
  children,
  className,
  variant = "outline",
  strength = 22,
  href,
  external,
  cursorLabel,
}: BaseProps & { href: string; external?: boolean }) {
  const { ref, sx, sy, onMove, onLeave } = useMagnet(strength);
  const props = external
    ? { target: "_blank", rel: "noreferrer noopener" }
    : {};
  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="inline-block will-change-transform"
    >
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor={cursorLabel}
        className={cn(base, variants[variant], className)}
        {...props}
      >
        {children}
      </Link>
    </motion.div>
  );
}
