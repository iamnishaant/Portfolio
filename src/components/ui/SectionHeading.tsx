"use client";

import { cn } from "@/lib/utils";
import { Reveal, RevealText } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Reveal>
        <div
          className={cn(
            "mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-ink-faint",
            align === "center" && "justify-center"
          )}
        >
          {index && <span className="text-blue/80">{index}</span>}
          <span className="h-px w-8 bg-line-strong" />
          <span>{eyebrow}</span>
        </div>
      </Reveal>
      <h2 className="font-display text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
        <RevealText text={title} />
      </h2>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-6 text-lg leading-relaxed text-ink-dim",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
