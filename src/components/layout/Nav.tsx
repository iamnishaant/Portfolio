"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Command, Menu, Sparkles, UserCheck, X } from "lucide-react";
import { useApp } from "@/components/providers/AppState";
import { LiveClock } from "./LiveClock";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Work" },
  { href: "#research", label: "Research" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { setPaletteOpen, askAssistant, recruiterMode, toggleRecruiterMode } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 transition-all duration-500",
            scrolled
              ? "glass-strong border-line-strong"
              : "border-transparent bg-transparent"
          )}
        >
          {/* logo */}
          <Link href="#hero" className="flex items-center gap-2.5" data-cursor="Top">
            <span className="relative grid h-8 w-8 place-items-center rounded-lg border border-line-strong bg-white/[0.04]">
              <span className="font-display text-xs font-bold text-gradient-blue">
                {profile.initials}
              </span>
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
              Nishant Shah
            </span>
          </Link>

          {/* center links */}
          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-ink-dim transition-colors hover:bg-white/[0.05] hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* right cluster */}
          <div className="flex items-center gap-2">
            <LiveClock className="hidden font-mono text-xs text-ink-dim xl:block" />

            <button
              onClick={toggleRecruiterMode}
              data-cursor={recruiterMode ? "On" : "Off"}
              className={cn(
                "hidden items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:flex",
                recruiterMode
                  ? "border-blue/50 bg-blue/10 text-ink"
                  : "border-line text-ink-dim hover:border-line-strong hover:text-ink"
              )}
              title="Recruiter mode: hides everything but the essentials"
            >
              <UserCheck className="h-3.5 w-3.5" />
              Recruiter
            </button>

            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-ink-faint transition-colors hover:border-line-strong hover:text-ink md:flex"
            >
              <Command className="h-3.5 w-3.5" />
              <span className="font-mono">⌘K</span>
            </button>

            <button
              onClick={() => askAssistant()}
              className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-black transition-transform hover:-translate-y-0.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue" />
              Ask AI
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[110] flex flex-col bg-bg/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display font-semibold">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="grid h-9 w-9 place-items-center rounded-full border border-line"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 font-display text-3xl font-semibold text-ink-dim transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex items-center gap-3 border-t border-line px-6 py-5">
              <button
                onClick={() => {
                  toggleRecruiterMode();
                  setMenuOpen(false);
                }}
                className="flex-1 rounded-full border border-line py-3 text-sm text-ink-dim"
              >
                {recruiterMode ? "Exit recruiter mode" : "Recruiter mode"}
              </button>
              <button
                onClick={() => {
                  askAssistant();
                  setMenuOpen(false);
                }}
                className="flex-1 rounded-full bg-white py-3 text-sm font-medium text-black"
              >
                Ask AI
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
