import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, FileText } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import { projects } from "@/lib/data";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { NeuralBackground } from "@/components/ui/NeuralBackground";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — ${project.category}`,
    description: project.summary,
    openGraph: { title: project.name, description: project.summary },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  const project = projects[idx];
  if (!project) notFound();
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="pt-28">
      {/* Hero */}
      <header className="relative overflow-hidden noise">
        <div className="absolute inset-0 -z-10 opacity-40">
          <NeuralBackground density={0.00006} />
        </div>
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-[60vw] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: `${project.accent}22` }}
        />
        <div className="mx-auto max-w-5xl px-6 pb-16 pt-6">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-ink-dim transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            All work
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span
              className="rounded-full border px-3 py-1 text-xs font-medium"
              style={{ borderColor: `${project.accent}55`, color: project.accent }}
            >
              {project.status}
            </span>
            <span className="font-mono text-xs text-ink-faint">
              {project.category} · {project.period}
            </span>
          </div>

          <h1 className="mt-5 wrap-break-word font-display text-4xl font-semibold tracking-tight hyphens-auto sm:text-6xl lg:text-7xl">
            {project.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-dim sm:text-xl">
            {project.tagline}
          </p>

          {/* links */}
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.github && (
              <ProjectLink href={project.links.github} icon={<Github className="h-4 w-4" />}>
                View code
              </ProjectLink>
            )}
            {project.links.demo && (
              <ProjectLink href={project.links.demo} icon={<ExternalLink className="h-4 w-4" />}>
                Live demo
              </ProjectLink>
            )}
            {project.links.paper && (
              <ProjectLink href={project.links.paper} icon={<FileText className="h-4 w-4" />}>
                Read paper
              </ProjectLink>
            )}
          </div>

          {/* metrics */}
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-[#08080b] p-4 sm:p-5">
                <div
                  className="wrap-break-word font-display text-xl font-semibold leading-tight hyphens-auto sm:text-3xl"
                  style={{ color: project.accent }}
                >
                  <MetricValue value={m.value} />
                </div>
                <div className="mt-1 text-xs leading-tight text-ink-faint">
                  {m.label}
                </div>
                {m.hint && (
                  <div className="mt-0.5 text-[10px] text-ink-faint/70">{m.hint}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-ink-dim">
            {project.summary}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
          <Block title="The problem" body={project.problem} />
          <Block title="The solution" body={project.solution} accent={project.accent} />
        </div>

        {/* Architecture */}
        <Reveal>
          <div className="mt-20">
            <SectionLabel accent={project.accent}>System Architecture</SectionLabel>
            <div className="gradient-border mt-6 overflow-hidden rounded-2xl bg-[#07070a]/80 p-6 ring-glow sm:p-10">
              <ArchitectureDiagram
                nodes={project.architecture.nodes}
                edges={project.architecture.edges}
                accent={project.accent}
              />
            </div>
          </div>
        </Reveal>

        {/* Challenges + highlights */}
        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2">
          <Reveal>
            <div>
              <SectionLabel accent={project.accent}>Challenges solved</SectionLabel>
              <ul className="mt-6 space-y-4">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line font-mono text-[11px]"
                      style={{ color: project.accent }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-ink-dim">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <SectionLabel accent={project.accent}>Highlights</SectionLabel>
              <ul className="mt-6 space-y-3">
                {project.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-ink-dim"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Stack */}
        <Reveal>
          <div className="mt-20">
            <SectionLabel accent={project.accent}>Technology</SectionLabel>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-white/[0.02] px-4 py-2 text-sm text-ink-dim"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Next project */}
      <Link
        href={`/work/${next.slug}`}
        className="group block border-t border-line"
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-14">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wider text-ink-faint">
              Next project
            </div>
            <div className="mt-2 wrap-break-word font-display text-2xl font-semibold transition-colors group-hover:text-white sm:text-4xl">
              {next.name}
            </div>
            <div className="mt-1 text-sm text-ink-faint">{next.category}</div>
          </div>
          <ArrowRight className="h-8 w-8 shrink-0 text-ink-faint transition-all group-hover:translate-x-2 group-hover:text-ink" />
        </div>
      </Link>
    </article>
  );
}

function Block({
  title,
  body,
  accent,
}: {
  title: string;
  body: string;
  accent?: string;
}) {
  return (
    <Reveal>
      <div>
        <SectionLabel accent={accent}>{title}</SectionLabel>
        <p className="mt-4 leading-relaxed text-ink-dim">{body}</p>
      </div>
    </Reveal>
  );
}

function SectionLabel({
  children,
  accent = "#5b8cff",
}: {
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-ink-faint">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
      {children}
    </div>
  );
}

function ProjectLink({
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
      className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-5 py-2.5 text-sm text-ink-dim transition-colors hover:border-line-strong hover:text-ink"
    >
      {icon}
      {children}
    </a>
  );
}

/** Animate the numeric portion of a metric value while keeping suffix/prefix. */
function MetricValue({ value }: { value: string }) {
  const match = value.match(/^([^\d-]*)(-?[\d.]+)(.*)$/);
  if (!match) return <>{value}</>;
  const [, prefix, num, suffix] = match;
  const n = parseFloat(num);
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  if (decimals > 0) return <>{value}</>; // keep decimals static for clarity
  return (
    <>
      {prefix}
      <AnimatedCounter value={n} suffix={suffix} />
    </>
  );
}
