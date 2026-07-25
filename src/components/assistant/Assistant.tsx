"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useApp } from "@/components/providers/AppState";
import { starterPrompts, type Citation } from "@/lib/retrieval";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

interface Msg {
  id: string;
  role: "user" | "assistant";
  text: string;
  citations?: Citation[];
  suggestions?: string[];
  pending?: boolean;
}

let uid = 0;
const nid = () => `m${++uid}`;

export function Assistant() {
  const { assistantOpen, setAssistantOpen, assistantSeed } = useApp();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const send = useCallback(async (raw: string) => {
    const q = raw.trim();
    if (!q || busy) return;
    setInput("");
    setBusy(true);
    const userMsg: Msg = { id: nid(), role: "user", text: q };
    const pendingMsg: Msg = { id: nid(), role: "assistant", text: "", pending: true };
    setMessages((m) => [...m, userMsg, pendingMsg]);

    try {
      // small deliberate delay so the "thinking" state reads well
      const [res] = await Promise.all([
        fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: q }),
        }).then((r) => r.json()),
        new Promise((r) => setTimeout(r, 550)),
      ]);
      setMessages((m) =>
        m.map((msg) =>
          msg.id === pendingMsg.id
            ? {
                ...msg,
                pending: false,
                text: res.answer as string,
                citations: res.citations as Citation[],
                suggestions: res.suggestions as string[],
              }
            : msg
        )
      );
    } catch {
      setMessages((m) =>
        m.map((msg) =>
          msg.id === pendingMsg.id
            ? { ...msg, pending: false, text: "Something went wrong reaching the assistant. Please try again." }
            : msg
        )
      );
    } finally {
      setBusy(false);
    }
  }, [busy]);

  // Seed question when opened via "ask about X"
  useEffect(() => {
    if (assistantOpen && assistantSeed) {
      send(assistantSeed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assistantOpen, assistantSeed]);

  // Focus + Esc
  useEffect(() => {
    if (assistantOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setAssistantOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [assistantOpen, setAssistantOpen]);

  // Autoscroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <AnimatePresence>
      {assistantOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAssistantOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-label="Portfolio AI assistant"
            className="fixed inset-y-0 right-0 z-[121] flex w-full max-w-[440px] flex-col glass-strong border-l"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            {/* header */}
            <header className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative grid h-9 w-9 place-items-center rounded-full border border-line-strong bg-white/[0.04]">
                  <Sparkles className="h-4 w-4 text-blue" />
                  <span className="absolute inset-0 animate-pulse-glow rounded-full shadow-[0_0_20px_-2px_rgba(91,140,255,0.7)]" />
                </div>
                <div>
                  <div className="text-sm font-medium leading-none">
                    Ask about {profile.name.split(" ")[0]}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-faint">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Grounded in his résumé & projects
                  </div>
                </div>
              </div>
              <button
                aria-label="Close assistant"
                onClick={() => setAssistantOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-ink-faint transition-colors hover:bg-white/[0.06] hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto px-5 py-6">
              {messages.length === 0 && (
                <Empty onPick={send} />
              )}
              {messages.map((m) => (
                <Bubble key={m.id} msg={m} onPick={send} />
              ))}
            </div>

            {/* input */}
            <div className="border-t border-line p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-end gap-2 rounded-2xl border border-line bg-white/[0.03] p-2 pl-4 focus-within:border-line-strong"
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  placeholder="Ask anything about Nishant…"
                  className="max-h-28 flex-1 resize-none bg-transparent py-1.5 text-sm text-ink outline-none placeholder:text-ink-faint"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || busy}
                  aria-label="Send"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-black transition-opacity disabled:opacity-30"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </form>
              <p className="mt-2 px-1 text-center text-[10px] text-ink-faint">
                Local retrieval demo · LLM-ready endpoint
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Empty({ onPick }: { onPick: (q: string) => void }) {
  return (
    <div className="pt-6">
      <p className="mb-1 text-lg font-medium">Hi, I&apos;m the portfolio assistant.</p>
      <p className="mb-6 text-sm leading-relaxed text-ink-dim">
        Ask me anything about Nishant&apos;s work — his projects, research,
        skills, or why he&apos;d be a strong hire. Answers are grounded in his
        actual résumé.
      </p>
      <div className="space-y-2">
        {starterPrompts.map((p) => (
          <button
            key={p}
            onClick={() => onPick(p)}
            className="group flex w-full items-center justify-between rounded-xl border border-line bg-white/[0.02] px-4 py-2.5 text-left text-sm text-ink-dim transition-colors hover:border-line-strong hover:text-ink"
          >
            {p}
            <ArrowUp className="h-3.5 w-3.5 rotate-45 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-blue" />
          </button>
        ))}
      </div>
    </div>
  );
}

function Bubble({ msg, onPick }: { msg: Msg; onPick: (q: string) => void }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex flex-col gap-2", isUser ? "items-end" : "items-start")}>
      <div
        className={cn(
          "max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-white text-black"
            : "border border-line bg-white/[0.03] text-ink"
        )}
      >
        {msg.pending ? <Thinking /> : msg.text}
      </div>

      {!!msg.citations?.length && (
        <div className="flex flex-wrap gap-1.5">
          {msg.citations.map((c, i) => (
            <a
              key={i}
              href={c.href}
              className="inline-flex items-center gap-1 rounded-full border border-line bg-white/[0.02] px-2.5 py-1 text-[11px] text-ink-dim transition-colors hover:border-blue/40 hover:text-ink"
            >
              <span className="h-1 w-1 rounded-full bg-blue" />
              {c.title}
            </a>
          ))}
        </div>
      )}

      {!!msg.suggestions?.length && !msg.pending && (
        <div className="mt-1 flex flex-wrap gap-1.5">
          {msg.suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onPick(s)}
              className="rounded-full border border-line px-3 py-1 text-[11px] text-ink-faint transition-colors hover:border-line-strong hover:text-ink"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Thinking() {
  return (
    <span className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-ink-dim"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}
