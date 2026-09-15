"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  projects,
  skillGroups,
  skillLinks,
  skills,
  type SkillNode,
} from "@/lib/data";
import { cn } from "@/lib/utils";

interface Placed extends SkillNode {
  x: number;
  y: number;
}

const V = 440; // viewBox half-extent

// Math.cos/sin can differ in the last digit between Node and the browser,
// which made the server-rendered SVG coordinates fail hydration. Two decimals
// is far below a pixel at this viewBox and comes out identical on both sides.
const round2 = (v: number) => Math.round(v * 100) / 100;

function layout(): Placed[] {
  const center = skills.find((s) => s.id === "ai")!;
  const others = skills.filter((s) => s.id !== "ai");

  // group ordering so same-group nodes cluster into arcs
  const order = ["cv", "ml", "llm", "backend", "infra", "data", "core"];
  const sorted = [...others].sort(
    (a, b) => order.indexOf(a.group) - order.indexOf(b.group)
  );

  const placed: Placed[] = [{ ...center, x: 0, y: 0 }];
  const n = sorted.length;
  sorted.forEach((s, i) => {
    // two rings: heavier nodes inner
    const ring = s.weight >= 2 ? 0 : 1;
    const radius = ring === 0 ? V * 0.52 : V * 0.86;
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const jitter = ring === 0 ? 0 : 0;
    placed.push({
      ...s,
      x: round2(Math.cos(angle) * (radius + jitter)),
      y: round2(Math.sin(angle) * (radius + jitter)),
    });
  });
  return placed;
}

// The graph is static data, so it is laid out once for the module.
const NODES = layout();
const BY_ID = Object.fromEntries(NODES.map((n) => [n.id, n]));

export function Skills() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [selected, setSelected] = useState<SkillNode | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const focus = active;
  const connected = useMemo(() => {
    if (!focus) return new Set<string>();
    const set = new Set<string>();
    for (const [a, b] of skillLinks) {
      if (a === focus) set.add(b);
      if (b === focus) set.add(a);
    }
    return set;
  }, [focus]);

  function onMove(e: React.MouseEvent) {
    if (reduced || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    setParallax({ x: nx * 22, y: ny * 22 });
  }

  const selectedProjects = selected?.projects
    ?.map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <section id="skills" className="section">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="02"
          eyebrow="Capability"
          title="A knowledge graph, not a checklist."
          description="Everything traces back to Artificial Intelligence. Hover a node to see its connections; click to see where it ships."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Graph */}
          <div
            ref={wrapRef}
            onMouseMove={onMove}
            onMouseLeave={() => setParallax({ x: 0, y: 0 })}
            className="gradient-border relative aspect-square w-full overflow-hidden rounded-2xl bg-[#07070a]/70 bg-dots ring-glow"
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(91,140,255,0.10),transparent_70%)]" />
            <svg
              viewBox={`${-V} ${-V} ${V * 2} ${V * 2}`}
              className="h-full w-full"
              style={{
                transform: `translate(${parallax.x}px, ${parallax.y}px)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              {/* edges */}
              <g>
                {skillLinks.map(([a, b], i) => {
                  const na = BY_ID[a];
                  const nb = BY_ID[b];
                  if (!na || !nb) return null;
                  const isOn =
                    focus && (a === focus || b === focus);
                  return (
                    <line
                      key={i}
                      x1={na.x}
                      y1={na.y}
                      x2={nb.x}
                      y2={nb.y}
                      stroke={isOn ? "rgba(91,140,255,0.7)" : "rgba(255,255,255,0.09)"}
                      strokeWidth={isOn ? 1.4 : 0.8}
                      style={{ transition: "stroke 0.25s, stroke-width 0.25s" }}
                    />
                  );
                })}
              </g>

              {/* nodes */}
              {NODES.map((node) => {
                const isCenter = node.id === "ai";
                const dim =
                  focus && focus !== node.id && !connected.has(node.id);
                const color = skillGroups[node.group].color;
                const r = isCenter ? 13 : 5 + node.weight * 1.6;
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x} ${node.y})`}
                    className="cursor-pointer"
                    onMouseEnter={() => setActive(node.id)}
                    onMouseLeave={() => setActive(null)}
                    onClick={() => setSelected(node)}
                    style={{
                      opacity: dim ? 0.25 : 1,
                      transition: "opacity 0.25s",
                    }}
                  >
                    {(isCenter || focus === node.id) && (
                      <circle r={r + 8} fill={color} opacity={0.14}>
                        {!reduced && (
                          <animate
                            attributeName="r"
                            values={`${r + 6};${r + 12};${r + 6}`}
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        )}
                      </circle>
                    )}
                    <circle
                      r={r}
                      fill={isCenter ? "#fff" : "#0a0a0d"}
                      stroke={color}
                      strokeWidth={isCenter ? 0 : 1.6}
                    />
                    {isCenter && (
                      <circle r={r - 4} fill={color} opacity={0.9} />
                    )}
                    <text
                      y={r + 15}
                      textAnchor="middle"
                      className="pointer-events-none select-none"
                      fill={isCenter ? "#fff" : "rgba(237,237,242,0.75)"}
                      fontSize={isCenter ? 15 : 11}
                      fontWeight={isCenter ? 600 : 500}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* legend */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-x-3 gap-y-1.5">
              {Object.entries(skillGroups).map(([k, g]) => (
                <span key={k} className="flex items-center gap-1.5 text-[10px] text-ink-faint">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: g.color }}
                  />
                  {g.label}
                </span>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div
              key={selected?.id ?? "empty"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-6"
            >
              {selected ? (
                <>
                  <div
                    className="mb-3 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[11px]"
                    style={{ color: skillGroups[selected.group].color }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: skillGroups[selected.group].color }}
                    />
                    {skillGroups[selected.group].label}
                  </div>
                  <h3 className="font-display text-2xl font-semibold">
                    {selected.label}
                  </h3>
                  {selected.blurb && (
                    <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                      {selected.blurb}
                    </p>
                  )}
                  {selectedProjects && selectedProjects.length > 0 && (
                    <div className="mt-5">
                      <div className="mb-2 text-[11px] uppercase tracking-wider text-ink-faint">
                        Ships in
                      </div>
                      <div className="space-y-2">
                        {selectedProjects.map(
                          (p) =>
                            p && (
                              <a
                                key={p.slug}
                                href={`/work/${p.slug}`}
                                className="group flex items-center justify-between rounded-xl border border-line bg-white/[0.02] px-3 py-2 text-sm transition-colors hover:border-line-strong"
                              >
                                <span>{p.name}</span>
                                <span
                                  className="text-xs text-ink-faint transition-colors group-hover:text-ink"
                                  style={{ color: p.accent }}
                                >
                                  {p.category}
                                </span>
                              </a>
                            )
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full border border-line bg-white/[0.03]">
                    <span className="h-2 w-2 animate-pulse-glow rounded-full bg-blue" />
                  </div>
                  <p className="text-sm text-ink-dim">
                    Select any node in the graph to explore how that skill maps
                    to real projects and outcomes.
                  </p>
                </div>
              )}
            </motion.div>

            {/* quick chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {skills
                .filter((s) => s.weight >= 2 && s.id !== "ai")
                .slice(0, 8)
                .map((s) => (
                  <button
                    key={s.id}
                    onMouseEnter={() => setActive(s.id)}
                    onMouseLeave={() => setActive(null)}
                    onClick={() => setSelected(s)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs transition-colors",
                      selected?.id === s.id
                        ? "border-blue/50 text-ink"
                        : "border-line text-ink-dim hover:border-line-strong hover:text-ink"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
