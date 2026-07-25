"use client";

import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import { LiveClock } from "./LiveClock";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,140,255,0.1),transparent_65%)] blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <div className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Let&apos;s build the{" "}
              <span className="text-gradient-blue">future</span>.
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-flex items-center gap-2 text-ink-dim transition-colors hover:text-ink"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FooterIcon href={profile.socials.github} label="GitHub">
              <Github className="h-4 w-4" />
            </FooterIcon>
            <FooterIcon href={profile.socials.linkedin} label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </FooterIcon>
            <Link
              href="#hero"
              aria-label="Back to top"
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink-dim transition-colors hover:border-line-strong hover:text-ink"
            >
              <ArrowUp className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Nishant Shah. Crafted with intent.</span>
          <div className="flex items-center gap-4">
            <LiveClock className="font-mono" />
            <span className="hidden sm:inline">·</span>
            <span>Next.js · Motion · Canvas</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink-dim transition-colors hover:border-line-strong hover:text-ink"
    >
      {children}
    </a>
  );
}
