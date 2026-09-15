"use client";

import { motion, useInView } from "motion/react";
import { useMemo, useRef } from "react";
import type { ArchNode } from "@/lib/data";

type Box = { x: number; y: number; w: number; h: number; node: ArchNode };
type Layout = { boxes: Box[]; byId: Record<string, Box>; W: number; H: number; vertical: boolean };

/**
 * Lays the diagram out stage by stage. Horizontal: stages are columns
 * flowing left→right. Vertical (small screens): stages are rows flowing
 * top→bottom, with nodes of the same stage side by side.
 */
function layout(nodes: ArchNode[], vertical: boolean): Layout {
  const stages = Math.max(...nodes.map((n) => n.col)) + 1;
  const groups: ArchNode[][] = Array.from({ length: stages }, () => []);
  nodes.forEach((n) => groups[n.col].push(n));
  const maxSiblings = Math.max(...groups.map((g) => g.length));

  const byId: Record<string, Box> = {};
  if (vertical) {
    const rowH = 72;
    const colW = 172;
    const boxW = 156;
    const boxH = 46;
    const W = maxSiblings * colW;
    const H = stages * rowH + 8;
    groups.forEach((group, si) => {
      const offset = (W - group.length * colW) / 2;
      group.forEach((node, i) => {
        byId[node.id] = {
          x: offset + i * colW + (colW - boxW) / 2,
          y: si * rowH + (rowH - boxH) / 2 + 4,
          w: boxW,
          h: boxH,
          node,
        };
      });
    });
    return { boxes: Object.values(byId), byId, W, H, vertical };
  }

  const colW = 168;
  const rowH = 84;
  const boxW = 132;
  const boxH = 52;
  const W = stages * colW;
  const H = maxSiblings * rowH + 20;
  groups.forEach((group, si) => {
    const offset = (H - group.length * rowH) / 2;
    group.forEach((node, i) => {
      byId[node.id] = {
        x: si * colW + (colW - boxW) / 2,
        y: offset + i * rowH + (rowH - boxH) / 2,
        w: boxW,
        h: boxH,
        node,
      };
    });
  });
  return { boxes: Object.values(byId), byId, W, H, vertical };
}

function edgePath(a: Box, b: Box, vertical: boolean) {
  if (vertical) {
    const x1 = a.x + a.w / 2;
    const y1 = a.y + a.h;
    const x2 = b.x + b.w / 2;
    const y2 = b.y;
    const backward = y2 < y1; // feedback edge
    const my = (y1 + y2) / 2;
    return {
      backward,
      d: backward
        ? `M ${x1} ${y1} C ${x1 + 40} ${y1 + 40}, ${x2 + 40} ${y2 - 40}, ${x2} ${y2}`
        : `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`,
    };
  }
  const x1 = a.x + a.w;
  const y1 = a.y + a.h / 2;
  const x2 = b.x;
  const y2 = b.y + b.h / 2;
  const backward = x2 < x1; // feedback edge
  const mx = (x1 + x2) / 2;
  return {
    backward,
    d: backward
      ? `M ${x1} ${y1} C ${x1 + 40} ${y1 - 40}, ${x2 - 40} ${y2 - 40}, ${x2} ${y2}`
      : `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`,
  };
}

/**
 * Renders an animated data-flow architecture diagram from a node/edge
 * spec. Stages flow left→right on wide screens and top→bottom on small
 * ones; edges animate a travelling dash.
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

  const wide = useMemo(() => layout(nodes, false), [nodes]);
  const tall = useMemo(() => layout(nodes, true), [nodes]);

  return (
    <div ref={ref} className={className}>
      <div className="hidden w-full overflow-x-auto md:block">
        <Diagram l={wide} edges={edges} accent={accent} inView={inView} />
      </div>
      <div className="md:hidden">
        <Diagram l={tall} edges={edges} accent={accent} inView={inView} />
      </div>
    </div>
  );
}

function Diagram({
  l,
  edges,
  accent,
  inView,
}: {
  l: Layout;
  edges: [string, string][];
  accent: string;
  inView: boolean;
}) {
  const label = l.vertical ? 12 : 11.5;
  const sub = l.vertical ? 9.5 : 9;
  return (
    <svg
      viewBox={`0 0 ${l.W} ${l.H}`}
      className={l.vertical ? "mx-auto h-auto w-full" : "h-auto w-full min-w-[560px]"}
      style={{ maxWidth: l.vertical ? l.W * 1.1 : l.W + 20 }}
    >
      {/* edges */}
      {edges.map(([a, b], i) => {
        const na = l.byId[a];
        const nb = l.byId[b];
        if (!na || !nb) return null;
        const { d, backward } = edgePath(na, nb, l.vertical);
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
      {l.boxes.map((p, i) => (
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
          <rect x={p.x} y={p.y} width={3} height={p.h} rx={2} fill={accent} />
          <text
            x={p.x + p.w / 2}
            y={p.node.sub ? p.y + p.h / 2 - 4 : p.y + p.h / 2 + 4}
            textAnchor="middle"
            fill="#ededf2"
            fontSize={label}
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
              fontSize={sub}
            >
              {p.node.sub}
            </text>
          )}
        </motion.g>
      ))}
    </svg>
  );
}
