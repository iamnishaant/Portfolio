"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useApp } from "@/components/providers/AppState";
import { profile } from "@/lib/data";

const SEQUENCE = [
  "Initializing Nishant AI",
  "Loading language models",
  "Loading computer-vision engine",
  "Spinning up multi-agent framework",
  "Indexing research database",
  "Building knowledge graph",
  "Compiling portfolio",
];

export function BootLoader() {
  const { booted, setBooted } = useApp();
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Replay only once per browser session.
    if (sessionStorage.getItem("booted") === "1") {
      setBooted(true);
      setHidden(true);
      return;
    }
    document.body.style.overflow = "hidden";

    if (reduced) {
      setProgress(100);
      finish();
      return;
    }

    let p = 0;
    const total = 2200;
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const t = Math.min((now - start) / total, 1);
      // ease-out
      p = Math.round((1 - Math.pow(1 - t, 2.2)) * 100);
      setProgress(p);
      setLineIdx(Math.min(SEQUENCE.length - 1, Math.floor(t * SEQUENCE.length)));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        finish();
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    setDone(true);
    setTimeout(() => {
      sessionStorage.setItem("booted", "1");
      setBooted(true);
      document.body.style.overflow = "";
      setTimeout(() => setHidden(true), 900);
    }, 700);
  }

  if (hidden || booted) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="boot"
        className="fixed inset-0 z-[10000] flex items-center justify-center bg-bg noise"
        initial={{ opacity: 1 }}
        animate={{ opacity: done ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,140,255,0.12),transparent_60%)] blur-2xl" />
        </div>

        <div className="relative w-[min(90vw,460px)] px-6">
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex items-center gap-3"
          >
            <div className="relative grid h-10 w-10 place-items-center rounded-xl border border-line-strong bg-white/[0.03]">
              <span className="font-display text-sm font-semibold text-gradient-blue">
                {profile.initials}
              </span>
              <div className="absolute inset-0 animate-pulse-glow rounded-xl shadow-[0_0_30px_-4px_rgba(91,140,255,0.6)]" />
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
              Nishant&nbsp;OS
            </div>
          </motion.div>

          {/* Streaming log lines */}
          <div className="mb-8 h-6 font-mono text-sm text-ink-dim">
            <AnimatePresence mode="wait">
              <motion.div
                key={done ? "welcome" : lineIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                {done ? (
                  <span className="text-ink">Welcome.</span>
                ) : (
                  <>
                    <span className="text-blue">›</span>
                    <span className="shimmer-text">{SEQUENCE[lineIdx]}…</span>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress */}
          <div className="relative h-px w-full overflow-hidden bg-line">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan via-blue to-violet"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-ink-faint">
            <span>{done ? "READY" : "LOADING"}</span>
            <span className="tabular-nums">{progress}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
