"use client";

import { motion } from "motion/react";
import { Star, GitBranch, Users, Activity, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { github, contributionGrid } from "@/lib/data";

const LEVELS = [
  "rgba(255,255,255,0.05)",
  "rgba(91,140,255,0.25)",
  "rgba(91,140,255,0.45)",
  "rgba(91,140,255,0.7)",
  "rgba(91,140,255,1)",
];

export function Github() {
  return (
    <section id="github" className="section">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="08"
          eyebrow="Open Source"
          title="Signal, not just a green wall."
          description="A live-feeling snapshot of how the work actually happens."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {/* Stat tiles */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-1">
            <StatTile icon={<GitBranch className="h-4 w-4" />} label="Repositories" value={github.repos} />
            <StatTile icon={<Star className="h-4 w-4" />} label="Total stars" value={github.totalStars} />
            <StatTile icon={<Users className="h-4 w-4" />} label="Followers" value={github.followers} />
            <StatTile icon={<Activity className="h-4 w-4" />} label="Contributions" value={github.contributionsThisYear} />
          </div>

          {/* Contribution grid */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="h-full rounded-2xl border border-line bg-white/[0.02] p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-ink-dim">
                  {github.contributionsThisYear.toLocaleString()} contributions in the last year
                </span>
                <a
                  href={github.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-xs text-blue hover:text-cyan"
                >
                  @{github.username} <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
              <div className="overflow-x-auto">
                <div
                  className="grid grid-flow-col gap-[3px]"
                  style={{ gridTemplateRows: "repeat(7, 1fr)" }}
                >
                  {contributionGrid.map((lvl, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.4 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (i % 60) * 0.004, duration: 0.3 }}
                      className="h-[11px] w-[11px] rounded-[3px]"
                      style={{ background: LEVELS[lvl] }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end gap-1.5 text-[10px] text-ink-faint">
                Less
                {LEVELS.map((c, i) => (
                  <span key={i} className="h-[10px] w-[10px] rounded-[2px]" style={{ background: c }} />
                ))}
                More
              </div>
            </div>
          </Reveal>
        </div>

        {/* Languages + pinned */}
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <Reveal>
            <div className="rounded-2xl border border-line bg-white/[0.02] p-6">
              <h3 className="mb-4 text-sm font-medium text-ink-dim">Languages</h3>
              <div className="mb-4 flex h-2.5 w-full overflow-hidden rounded-full">
                {github.languages.map((l) => (
                  <div key={l.name} style={{ width: `${l.pct}%`, background: l.color }} />
                ))}
              </div>
              <div className="space-y-2">
                {github.languages.map((l) => (
                  <div key={l.name} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-ink-dim">
                      <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
                      {l.name}
                    </span>
                    <span className="text-ink-faint">{l.pct}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-line bg-white/[0.02] p-3">
                <div className="text-[11px] uppercase tracking-wider text-ink-faint">
                  Currently
                </div>
                <p className="mt-1 text-sm text-ink-dim">{github.currentWork}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="grid h-full gap-4 sm:grid-cols-2">
              {github.pinned.map((r) => (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex flex-col rounded-2xl border border-line bg-white/[0.02] p-5 transition-colors hover:border-line-strong"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-mono text-sm text-ink">
                      <GitBranch className="h-3.5 w-3.5 text-ink-faint" />
                      {r.name}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                  </div>
                  <p className="mt-2 flex-1 text-sm text-ink-dim">{r.desc}</p>
                  <span className="mt-3 flex items-center gap-1.5 text-[11px] text-ink-faint">
                    <span className="h-2 w-2 rounded-full bg-blue" />
                    {r.lang}
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StatTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <Reveal>
      <div className="rounded-2xl border border-line bg-white/[0.02] p-5">
        <div className="mb-3 grid h-9 w-9 place-items-center rounded-lg border border-line bg-white/[0.03] text-blue">
          {icon}
        </div>
        <div className="font-display text-2xl font-semibold">
          <AnimatedCounter value={value} />
        </div>
        <div className="mt-0.5 text-xs text-ink-faint">{label}</div>
      </div>
    </Reveal>
  );
}
