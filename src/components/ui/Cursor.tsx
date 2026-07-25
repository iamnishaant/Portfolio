"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom two-part cursor: a precise dot + a lagging ring that grows over
 * interactive elements. Falls back to the native cursor on touch devices.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.body.dataset.cursorActive = "1";

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;

    function onMove(e: PointerEvent) {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      const el = (e.target as HTMLElement)?.closest(
        'a, button, [role="button"], input, textarea, [data-cursor]'
      ) as HTMLElement | null;
      setHovering(!!el);
      setLabel(el?.dataset?.cursor ?? null);
    }

    function loop() {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      delete document.body.dataset.cursorActive;
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={dotRef}
        className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="absolute flex items-center justify-center rounded-full border border-white/40 transition-[width,height,background-color] duration-200 ease-out mix-blend-difference"
        style={{
          width: hovering ? 46 : 30,
          height: hovering ? 46 : 30,
          left: hovering ? -23 : -15,
          top: hovering ? -23 : -15,
          backgroundColor: hovering ? "rgba(255,255,255,0.08)" : "transparent",
        }}
      >
        {label && (
          <span className="text-[9px] font-medium tracking-wide text-white">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
