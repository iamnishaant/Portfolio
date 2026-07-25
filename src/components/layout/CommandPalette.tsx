"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  CornerDownLeft,
  Sparkles,
  UserCheck,
  FileText,
  Boxes,
  Hash,
  ArrowRight,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import { useApp } from "@/components/providers/AppState";
import { projects, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

interface Item {
  id: string;
  label: string;
  group: string;
  icon: React.ReactNode;
  keywords?: string;
  run: () => void;
}

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen, toggleRecruiterMode, askAssistant } = useApp();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  function go(hash: string) {
    setPaletteOpen(false);
    const el = document.querySelector(hash);
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).lenis;
    if (el && lenis) lenis.scrollTo(el as HTMLElement, { offset: -80 });
    else el?.scrollIntoView({ behavior: "smooth" });
  }
  function open(url: string) {
    setPaletteOpen(false);
    window.open(url, "_blank", "noopener");
  }

  const items = useMemo<Item[]>(() => {
    const nav = [
      { id: "about", label: "About", hash: "#about" },
      { id: "skills", label: "Skills graph", hash: "#skills" },
      { id: "projects", label: "Projects", hash: "#projects" },
      { id: "research", label: "Research", hash: "#research" },
      { id: "publications", label: "Publications", hash: "#publications" },
      { id: "education", label: "Education & Certifications", hash: "#education" },
      { id: "contact", label: "Contact", hash: "#contact" },
    ].map((n) => ({
      id: `nav-${n.id}`,
      label: n.label,
      group: "Navigate",
      icon: <Hash className="h-4 w-4" />,
      run: () => go(n.hash),
    }));

    const proj = projects.map((p) => ({
      id: `proj-${p.slug}`,
      label: p.name,
      group: "Projects",
      keywords: `${p.category} ${p.stack.join(" ")}`,
      icon: <Boxes className="h-4 w-4" />,
      run: () => {
        setPaletteOpen(false);
        window.location.href = `/work/${p.slug}`;
      },
    }));

    const actions: Item[] = [
      {
        id: "act-ai",
        label: "Talk to my AI assistant",
        group: "Actions",
        icon: <Sparkles className="h-4 w-4 text-blue" />,
        keywords: "chat ask question recruiter",
        run: () => {
          setPaletteOpen(false);
          askAssistant();
        },
      },
      {
        id: "act-recruiter",
        label: "Toggle recruiter mode",
        group: "Actions",
        icon: <UserCheck className="h-4 w-4" />,
        keywords: "simplify hire",
        run: () => {
          setPaletteOpen(false);
          toggleRecruiterMode();
        },
      },
      {
        id: "act-resume",
        label: "Open résumé",
        group: "Actions",
        icon: <FileText className="h-4 w-4" />,
        run: () => open(profile.socials.resume),
      },
      {
        id: "act-github",
        label: "GitHub profile",
        group: "Actions",
        icon: <Github className="h-4 w-4" />,
        run: () => open(profile.socials.github),
      },
      {
        id: "act-linkedin",
        label: "LinkedIn profile",
        group: "Actions",
        icon: <Linkedin className="h-4 w-4" />,
        run: () => open(profile.socials.linkedin),
      },
    ];

    return [...actions, ...proj, ...nav];
  }, [askAssistant, setPaletteOpen, toggleRecruiterMode]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.keywords?.toLowerCase().includes(q) ||
        i.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  const groups = useMemo(() => {
    const map = new Map<string, Item[]>();
    filtered.forEach((i) => {
      if (!map.has(i.group)) map.set(i.group, []);
      map.get(i.group)!.push(i);
    });
    return Array.from(map.entries());
  }, [filtered]);

  useEffect(() => {
    if (paletteOpen) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [paletteOpen]);

  useEffect(() => setActive(0), [query]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  }

  return (
    <AnimatePresence>
      {paletteOpen && (
        <div className="fixed inset-0 z-[130] flex items-start justify-center px-4 pt-[12vh]">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPaletteOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-label="Command palette"
            className="relative w-full max-w-xl overflow-hidden rounded-2xl glass-strong ring-glow"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 text-ink-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, sections, actions…"
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-ink-faint"
              />
              <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-ink-faint sm:block">
                ESC
              </kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="px-3 py-10 text-center text-sm text-ink-faint">
                  No results. Try “NeuroBank”, “research”, or “hire”.
                </div>
              )}
              {groups.map(([group, gItems]) => (
                <div key={group} className="mb-1">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-ink-faint">
                    {group}
                  </div>
                  {gItems.map((item) => {
                    const idx = filtered.indexOf(item);
                    const isActive = idx === active;
                    return (
                      <button
                        key={item.id}
                        onMouseEnter={() => setActive(idx)}
                        onClick={() => item.run()}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                          isActive ? "bg-white/[0.07] text-ink" : "text-ink-dim"
                        )}
                      >
                        <span className={cn(isActive ? "text-ink" : "text-ink-faint")}>
                          {item.icon}
                        </span>
                        <span className="flex-1">{item.label}</span>
                        {isActive && (
                          <ArrowRight className="h-3.5 w-3.5 text-ink-faint" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-[11px] text-ink-faint">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <CornerDownLeft className="h-3 w-3" /> select
                </span>
                <span>↑↓ navigate</span>
              </div>
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-blue" /> Nishant OS
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
