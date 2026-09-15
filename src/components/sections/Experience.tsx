"use client";

import { GraduationCap, BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, certifications } from "@/lib/data";

export function Experience() {
  return (
    <section id="education" className="section">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          index="07"
          eyebrow="Education & Credentials"
          title="The foundation."
          description="A CSE (AI) degree in progress, backed by industry certifications from AWS, DataCamp, ISRO/IIRS and more."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          {/* Education */}
          <div>
            <div className="mb-6 flex items-center gap-2 text-sm font-medium text-ink-dim">
              <GraduationCap className="h-4 w-4 text-blue" />
              Education
            </div>
            <div className="space-y-3">
              {education.map((e, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="group rounded-2xl border border-line bg-white/[0.02] p-6 transition-colors hover:border-line-strong">
                    <div className="font-mono text-xs text-blue">{e.period}</div>
                    <h3 className="mt-2 font-display text-xl font-semibold leading-snug">
                      {e.degree}
                    </h3>
                    <p className="mt-1 text-sm text-ink-dim">{e.school}</p>
                    {e.detail && (
                      <p className="mt-3 text-sm leading-relaxed text-ink-faint">
                        {e.detail}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="mb-6 flex items-center gap-2 text-sm font-medium text-ink-dim">
              <BadgeCheck className="h-4 w-4 text-blue" />
              Certifications
            </div>
            <div className="space-y-2">
              {certifications.map((c, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="group flex items-start justify-between gap-4 rounded-xl border border-line bg-white/[0.02] px-4 py-3 transition-colors hover:border-line-strong">
                    <div>
                      <div className="text-sm font-medium leading-tight">
                        {c.title}
                      </div>
                      <div className="mt-0.5 text-xs text-ink-faint">{c.issuer}</div>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-ink-faint">
                      {c.date}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
