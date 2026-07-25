"use client";

import { motion, useInView } from "motion/react";
import { useMemo, useRef } from "react";
import type { ArchNode } from "@/lib/data";

/**
 * Renders an animated data-flow architecture diagram from a node/edge
 * spec. Columns flow left→right; edges animate a travelling dash.
 */
export function ArchitectureDiagram({
  nodes,
  edges,
  accent = "#5b8cff",
  className,
}: {
  nodes: ArchNode[];
  edges: [string, string][];
  accent?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const { positioned, W, H, byId } = useMemo(() => {
    const cols = Math.max(...nodes.map((n) => n.col)) + 1;
    const colGroups: ArchNode[][] = Array.from({ length: cols }, () => []);
    nodes.forEach((n) => colGroups[n.col].push(n));

    const colW = 168;
    const rowH = 84;
    const boxW = 132;
    const boxH = 52;
    const maxRows = Math.max(...colGroups.map((c) => c.length));
    const W = cols * colW;
    const H = maxRows * rowH + 20;

    const pos: Record<string, { x: number; y: number; w: number; h: number; node: ArchNode }> = {};
    colGroups.forEach((group, ci) => {
      const totalH = group.length * rowH;
      const offset = (H - totalH) / 2;
      group.forEach((node, ri) => {
        pos[node.id] = {
          x: ci * colW + (colW - boxW) / 2,
          y: offset + ri * rowH + (rowH - boxH) / 2,
          w: boxW,
          h: boxH,
          node,
        };
      });
    });
    return { positioned: Object.values(pos), W, H, byId: pos };
  }, [nodes]);

  return (
    <div ref={ref} className={className}>
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full min-w-[560px]"
          style={{ maxWidth: W + 20 }}
        >
          {/* edges */}
          {edges.map(([a, b], i) => {
            const na = byId[a];
            const nb = byId[b];
            if (!na || !nb) return null;
            const x1 = na.x + na.w;
            const y1 = na.y + na.h / 2;
            const x2 = nb.x;
            const y2 = nb.y + nb.h / 2;
            const backward = x2 < x1; // feedback edge
            const mx = (x1 + x2) / 2;
            const d = backward
              ? `M ${x1} ${y1} C ${x1 + 40} ${y1 - 40}, ${x2 - 40} ${y2 - 40}, ${x2} ${y2}`
              : `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
            return (
              <g key={i}>
                <path
                  d={d}
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth={1.4}
                  strokeDasharray={backward ? "3 3" : undefined}
                />
                {inView && (
                  <motion.path
                    d={d}
                    fill="none"
                    stroke={accent}
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeDasharray="4 90"
                    initial={{ strokeDashoffset: 94 }}
                    animate={{ strokeDashoffset: [94, 0] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.12,
                    }}
                    opacity={0.9}
                  />
                )}
              </g>
            );
          })}

          {/* nodes */}
          {positioned.map((p, i) => (
            <motion.g
              key={p.node.id}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <rect
                x={p.x}
                y={p.y}
                width={p.w}
                height={p.h}
                rx={12}
                fill="#0a0a0d"
                stroke="rgba(255,255,255,0.14)"
              />
              <rect
                x={p.x}
                y={p.y}
                width={3}
                height={p.h}
                rx={2}
                fill={accent}
              />
              <text
                x={p.x + p.w / 2}
                y={p.node.sub ? p.y + p.h / 2 - 4 : p.y + p.h / 2 + 4}
                textAnchor="middle"
                fill="#ededf2"
                fontSize={11.5}
                fontWeight={600}
              >
                {p.node.label}
              </text>
              {p.node.sub && (
                <text
                  x={p.x + p.w / 2}
                  y={p.y + p.h / 2 + 12}
                  textAnchor="middle"
                  fill="rgba(162,162,173,0.9)"
                  fontSize={9}
                >
                  {p.node.sub}
                </text>
              )}
            </motion.g>
          ))}
        </svg>
      </div>
    </div>
  );
}
