"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { FileText, Presentation, Code2, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { publications } from "@/lib/data";

export function Publications() {
  return (
    <section id="publications" className="section">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          index="05"
          eyebrow="Publications"
          title="Peer-reviewed, and reproducible."
          description="Research that shipped with code and results others can verify."
        />

        <div className="mt-14 divide-y divide-line border-y border-line">
          {publications.map((pub, i) => (
            <PubRow key={i} pub={pub} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PubRow({
  pub,
  index,
}: {
  pub: (typeof publications)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 0.05}>
      <div className="group py-7">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-xs text-ink-faint">
            <span className="rounded-full border border-line px-2.5 py-0.5 font-mono">
              {pub.type}
            </span>
            <span>{pub.year}</span>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-left font-display text-xl font-semibold leading-snug transition-colors group-hover:text-white sm:text-2xl"
          >
            {pub.title}
          </button>
          <p className="text-sm text-ink-dim">
            <span className="italic">{pub.venue}</span> · {pub.authors}
          </p>

          <motion.div
            initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="rounded-xl border border-line bg-white/[0.02] p-5">
              <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-wider text-ink-faint">
                <Quote className="h-3.5 w-3.5" /> Abstract
              </div>
              <p className="text-sm leading-relaxed text-ink-dim">
                {pub.abstract}
              </p>
              {pub.doi && (
                <p className="mt-3 font-mono text-xs text-ink-faint">
                  DOI: {pub.doi}
                </p>
              )}
            </div>
          </motion.div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setOpen((v) => !v)}
              className="text-xs font-medium text-blue transition-colors hover:text-cyan"
            >
              {open ? "Hide abstract" : "Read abstract"}
            </button>
            <span className="text-ink-faint">·</span>
            {pub.links.pdf && (
              <PubLink href={pub.links.pdf} icon={<FileText className="h-3.5 w-3.5" />}>
                PDF
              </PubLink>
            )}
            {pub.links.slides && (
              <PubLink href={pub.links.slides} icon={<Presentation className="h-3.5 w-3.5" />}>
                Slides
              </PubLink>
            )}
            {pub.links.code && (
              <PubLink href={pub.links.code} icon={<Code2 className="h-3.5 w-3.5" />}>
                Code
              </PubLink>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function PubLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center gap-1 text-xs text-ink-dim transition-colors hover:text-ink"
    >
      {icon}
      {children}
    </a>
  );
}
