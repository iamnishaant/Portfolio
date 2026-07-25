"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpRight, MessageSquare, Sparkles } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import { NeuralBackground } from "@/components/ui/NeuralBackground";
import { MagneticButton, MagneticLink } from "@/components/ui/MagneticButton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";
import { useApp } from "@/components/providers/AppState";
import { profile, stats } from "@/lib/data";

export function Hero() {
  const { askAssistant } = useApp();
  const reduced = useReducedMotion();
  const [roleIdx, setRoleIdx] = useState(0);

  // Mouse spotlight
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const id = setInterval(
      () => setRoleIdx((i) => (i + 1) % profile.roles.length),
      2400
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (reduced) return;
    function onMove(e: PointerEvent) {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduced]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden noise"
    >
      {/* Neural network */}
      <div className="absolute inset-0 -z-10 opacity-70">
        <NeuralBackground />
      </div>

      {/* Mouse-follow spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${sx}% ${sy}%, rgba(91,140,255,0.12), transparent 60%)`,
        }}
      />
      {/* top + bottom vignette */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Availability pill */}
        <Reveal>
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 text-xs text-ink-dim backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </div>
        </Reveal>

        {/* Headline */}
        <h1 className="max-w-4xl font-display text-[clamp(2.6rem,8vw,6.2rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
          <HeroLine text="Building AI systems" delay={0.05} />
          <HeroLine text="that think, reason," delay={0.15} />
          <span className="block">
            <HeroWord text="and" delay={0.25} />{" "}
            <span className="text-gradient-blue">
              <HeroWord text="solve" delay={0.32} />
            </span>{" "}
            <HeroWord text="real problems." delay={0.4} />
          </span>
        </h1>

        {/* Rotating role + description */}
        <Reveal delay={0.4}>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 font-mono text-sm text-ink-dim">
              <span className="text-blue">{profile.name}</span>
              <span className="text-ink-faint">—</span>
              <span className="relative inline-block h-5 w-[220px] overflow-hidden">
                {profile.roles.map((r, i) => (
                  <motion.span
                    key={r}
                    className="absolute left-0 top-0 whitespace-nowrap text-ink"
                    initial={false}
                    animate={{
                      y: `${(i - roleIdx) * 100}%`,
                      opacity: i === roleIdx ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {r}
                  </motion.span>
                ))}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.48}>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-dim sm:text-lg">
            {profile.tagline} I ship multi-agent LLM frameworks, retrieval
            platforms, and computer-vision models — from research to production.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={0.56}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticLink href="#projects" variant="primary" cursorLabel="View">
              Explore Projects
              <ArrowUpRight className="h-4 w-4" />
            </MagneticLink>
            <MagneticButton
              variant="outline"
              onClick={() => askAssistant()}
              cursorLabel="Ask"
            >
              <Sparkles className="h-4 w-4 text-blue" />
              Talk to my AI
            </MagneticButton>
            <MagneticLink
              href={profile.socials.resume}
              variant="ghost"
              external
              cursorLabel="Open"
            >
              Résumé
            </MagneticLink>
            <div className="flex items-center gap-1">
              <IconLink href={profile.socials.github} label="GitHub">
                <Github className="h-4 w-4" />
              </IconLink>
              <IconLink href={profile.socials.linkedin} label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </IconLink>
              <IconLink onClick={() => askAssistant()} label="Assistant">
                <MessageSquare className="h-4 w-4" />
              </IconLink>
            </div>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={0.7}>
          <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-3xl font-semibold tracking-tight">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-1 text-xs leading-tight text-ink-faint">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-faint"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-line-strong to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

/* Small helpers ---------------------------------------------------- */
function HeroLine({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

function HeroWord({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

function IconLink({
  href,
  onClick,
  label,
  children,
}: {
  href?: string;
  onClick?: () => void;
  label: string;
  children: React.ReactNode;
}) {
  const cls =
    "grid h-10 w-10 place-items-center rounded-full border border-line bg-white/[0.02] text-ink-dim transition-colors hover:border-line-strong hover:text-ink";
  if (href)
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={label}
        data-cursor=""
        className={cls}
      >
        {children}
      </a>
    );
  return (
    <button aria-label={label} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
