"use client";

import { Award, GraduationCap, Trophy, FlaskConical, Star, GitFork } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievements, type Achievement } from "@/lib/data";

const ICONS: Record<Achievement["kind"], React.ReactNode> = {
  award: <Award className="h-5 w-5" />,
  scholarship: <GraduationCap className="h-5 w-5" />,
  research: <FlaskConical className="h-5 w-5" />,
  hackathon: <Trophy className="h-5 w-5" />,
};

const EXTRA = [<Star key="s" className="h-5 w-5" />, <GitFork key="g" className="h-5 w-5" />];

export function Achievements() {
  return (
    <section id="achievements" className="section">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="06"
          eyebrow="Recognition"
          title="A wall of proof."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white/[0.02] p-6 transition-all duration-500 hover:border-line-strong hover:bg-white/[0.04]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(91,140,255,0.12),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex items-start gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-blue transition-transform duration-500 group-hover:scale-110">
                    {ICONS[a.kind] ?? EXTRA[i % EXTRA.length]}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-tight">
                      {a.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
                      {a.detail}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
