"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { research } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Research() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="research" className="section">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          index="04"
          eyebrow="Research Arc"
          title="Six years of curiosity, one trajectory."
          description="From combinatorial biology to reasoning agents — each stop compounding into the next."
        />

        <div ref={ref} className="relative mt-16 pl-8 sm:pl-10">
          {/* track */}
          <div className="absolute left-[10px] top-2 h-full w-px bg-line sm:left-[14px]" />
          <motion.div
            className="absolute left-[10px] top-2 w-px bg-gradient-to-b from-cyan via-blue to-violet sm:left-[14px]"
            style={{ height }}
          />

          <div className="space-y-4">
            {research.map((r, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="relative">
                  {/* dot */}
                  <div className="absolute -left-8 top-4 sm:-left-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                      className={cn(
                        "grid h-5 w-5 place-items-center rounded-full border-2 bg-bg transition-colors",
                        isOpen ? "border-blue" : "border-line-strong"
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-colors",
                          isOpen ? "bg-blue" : "bg-ink-faint"
                        )}
                      />
                    </motion.div>
                  </div>

                  <motion.button
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5 }}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={cn(
                      "w-full rounded-2xl border p-5 text-left transition-colors",
                      isOpen
                        ? "border-line-strong bg-white/[0.04]"
                        : "border-line bg-white/[0.02] hover:border-line-strong"
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <span className="font-mono text-xs text-blue">{r.year}</span>
                        <h3 className="mt-1 font-display text-xl font-semibold">
                          {r.title}
                        </h3>
                        <p className="text-xs text-ink-faint">{r.field}</p>
                      </div>
                      <Plus
                        className={cn(
                          "h-5 w-5 shrink-0 text-ink-faint transition-transform duration-300",
                          isOpen && "rotate-45 text-blue"
                        )}
                      />
                    </div>

                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-sm leading-relaxed text-ink-dim">
                        {r.body}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {r.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-ink-faint"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
