"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          eyebrow="Selected Work"
          title="Each project is its own product."
          description="Not cards — full systems. Problem, architecture, and measured impact for the work I'm proudest of."
        />
      </div>

      <div className="mt-16 space-y-28 md:space-y-40">
        {featured.map((p, i) => (
          <FeatureBlock key={p.slug} project={p} flip={i % 2 === 1} index={i} />
        ))}
      </div>

      {/* remaining projects */}
      <div className="mx-auto mt-28 max-w-6xl px-6">
        <Reveal>
          <h3 className="mb-8 font-display text-2xl font-semibold text-ink-dim">
            More work
          </h3>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <MiniCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({
  project: p,
  flip,
  index,
}: {
  project: Project;
  flip: boolean;
  index: number;
}) {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div
        className={cn(
          "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
          flip && "lg:[&>*:first-child]:order-2"
        )}
      >
        {/* Copy */}
        <div>
          <Reveal>
            <div className="mb-4 flex items-center gap-3">
              <span
                className="rounded-full border px-3 py-1 text-[11px] font-medium"
                style={{ borderColor: `${p.accent}55`, color: p.accent }}
              >
                {p.status}
              </span>
              <span className="font-mono text-xs text-ink-faint">
                {p.category} · {p.period}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h3 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {p.name}
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg leading-relaxed text-ink-dim">
              {p.tagline}
            </p>
          </Reveal>

          {/* metrics */}
          <Reveal delay={0.15}>
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
              {p.metrics.map((m) => (
                <div key={m.label} className="bg-[#08080b] p-4">
                  <div
                    className="font-display text-2xl font-semibold"
                    style={{ color: p.accent }}
                  >
                    {m.value}
                  </div>
                  <div className="mt-1 text-[11px] leading-tight text-ink-faint">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* stack */}
          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {p.stack.slice(0, 7).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-white/[0.02] px-2.5 py-1 text-[11px] text-ink-dim"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={`/work/${p.slug}`}
                data-cursor="Open"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
              >
                Case study
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              {p.links.github && (
                <a
                  href={p.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink-dim transition-colors hover:border-line-strong hover:text-ink"
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
              )}
              {p.links.demo && (
                <a
                  href={p.links.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink-dim transition-colors hover:border-line-strong hover:text-ink"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live demo
                </a>
              )}
            </div>
          </Reveal>
        </div>

        {/* Visual: architecture */}
        <Reveal delay={0.15} y={40}>
          <ProjectVisual project={p} index={index} />
        </Reveal>
      </div>
    </div>
  );
}

function ProjectVisual({ project: p }: { project: Project; index: number }) {
  const reduced = useReducedMotion();
  return (
    <div className="gradient-border relative overflow-hidden rounded-2xl bg-[#07070a]/80 p-6 ring-glow">
      {/* glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
        style={{ background: `${p.accent}22` }}
      />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">
            System Architecture
          </span>
          <motion.span
            className="flex items-center gap-1.5 text-[11px] text-ink-faint"
            animate={reduced ? undefined : { opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: p.accent }}
            />
            live flow
          </motion.span>
        </div>
        <ArchitectureDiagram
          nodes={p.architecture.nodes}
          edges={p.architecture.edges}
          accent={p.accent}
        />
      </div>
    </div>
  );
}

function MiniCard({ project: p, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={index * 0.06}>
      <Link
        href={`/work/${p.slug}`}
        data-cursor="Open"
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white/[0.02] p-6 transition-colors hover:border-line-strong"
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `${p.accent}33` }}
        />
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-[11px] text-ink-faint">{p.year}</span>
          <ArrowUpRight className="h-4 w-4 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
        </div>
        <h4 className="font-display text-xl font-semibold">{p.name}</h4>
        <p className="mt-1 text-xs text-ink-faint">{p.category}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-dim">
          {p.tagline}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: p.accent }}
          />
          <span className="text-[11px] text-ink-faint">{p.status}</span>
        </div>
      </Link>
    </Reveal>
  );
}
