"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

type Line =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; accent?: boolean }
  | { kind: "gap" };

const SCRIPT: Line[] = [
  { kind: "cmd", text: "whoami" },
  ...profile.whoami.map((t, i) => ({ kind: "out" as const, text: t, accent: i === 0 })),
  { kind: "gap" },
  { kind: "cmd", text: "cat interests.txt" },
  ...profile.interests.map((t) => ({ kind: "out" as const, text: t })),
  { kind: "gap" },
  { kind: "cmd", text: "echo $MISSION" },
  { kind: "out", text: profile.summary },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(SCRIPT.length);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setVisible(i);
      if (i >= SCRIPT.length) clearInterval(id);
    }, 260);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section id="about" className="section">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-ink-faint">
          <span className="text-blue/80">01</span>
          <span className="h-px w-8 bg-line-strong" />
          <span>About</span>
        </div>

        <div
          ref={ref}
          className="gradient-border overflow-hidden rounded-2xl bg-[#08080b]/80 ring-glow backdrop-blur"
        >
          {/* terminal chrome */}
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-ink-faint">
              nishant@os — ~/about
            </span>
          </div>

          {/* terminal body */}
          <div className="min-h-[420px] p-6 font-mono text-sm leading-relaxed sm:p-8 sm:text-[15px]">
            {SCRIPT.slice(0, visible).map((line, i) => (
              <Row key={i} line={line} isLast={i === visible - 1 && visible < SCRIPT.length} />
            ))}
            {visible >= SCRIPT.length && (
              <div className="mt-4 flex items-center gap-1 text-ink-dim">
                <span className="text-emerald-400">➜</span>
                <span className="text-blue">~</span>
                <span className="caret" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ line, isLast }: { line: Line; isLast: boolean }) {
  if (line.kind === "gap") return <div className="h-4" />;
  if (line.kind === "cmd")
    return (
      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        className="flex items-center gap-2 text-ink"
      >
        <span className="text-emerald-400">➜</span>
        <span className="text-blue">~</span>
        <span className="text-ink-dim">$</span>
        <span>
          {line.text}
          {isLast && <span className="caret" />}
        </span>
      </motion.div>
    );
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "pl-6",
        line.accent ? "text-lg font-semibold text-gradient-blue" : "text-ink-dim"
      )}
    >
      {line.text}
    </motion.div>
  );
}
