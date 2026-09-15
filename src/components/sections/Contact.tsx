"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Mail, Calendar, Check, Loader2, ArrowUpRight } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/lib/data";

const CHANNELS = [
  { icon: <Mail className="h-5 w-5" />, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", value: "in/nishant-shah", href: profile.socials.linkedin },
  { icon: <Github className="h-5 w-5" />, label: "GitHub", value: "@iamnishaant", href: profile.socials.github },
  { icon: <Calendar className="h-5 w-5" />, label: "Schedule", value: "Book a call", href: `mailto:${profile.email}?subject=Let's talk` },
];

type Status = "idle" | "sending" | "sent" | "error";

const SEND_FAILED = "Couldn't send right now.";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });

  const busy = status === "sending" || status === "sent";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      const data = await res.json().catch(() => ({}));
      // 400s carry a message written for the visitor; anything else is on our side.
      setError(res.status === 400 && typeof data.error === "string" ? data.error : SEND_FAILED);
    } catch {
      setError(SEND_FAILED);
    }
    setStatus("error");
  }

  // Fallback keeps whatever the visitor already typed.
  const mailtoFallback = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Portfolio message from ${form.name || "a visitor"}`,
  )}&body=${encodeURIComponent(form.message)}`;

  return (
    <section id="contact" className="section">
      <div className="mx-auto max-w-6xl px-6">
        <div className="gradient-border relative overflow-hidden rounded-3xl bg-[#07070a]/70 p-8 ring-glow sm:p-12">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(139,123,255,0.16),transparent_65%)] blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(85,230,255,0.12),transparent_65%)] blur-2xl" />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            {/* left: protocol */}
            <div>
              <SectionHeading
                index="09"
                eyebrow="Connect Protocol"
                title="Let's build something that reasons."
              />
              <p className="mt-6 max-w-md text-ink-dim">
                Open to AI / ML engineering roles and interesting collaborations.
                Pick a channel, or transmit a message directly.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {CHANNELS.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    className="group flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] p-4 transition-colors hover:border-line-strong"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-white/[0.03] text-blue">
                      {c.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1 text-sm font-medium">
                        {c.label}
                        <ArrowUpRight className="h-3 w-3 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100" />
                      </span>
                      <span className="block truncate text-xs text-ink-faint">
                        {c.value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* right: transmit form */}
            <form onSubmit={submit} className="glass relative rounded-2xl p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-2 font-mono text-xs text-ink-faint">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                secure channel · open
              </div>
              <div className="space-y-4">
                <Field
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder="Ada Lovelace"
                  maxLength={100}
                  disabled={busy}
                />
                <Field
                  id="contact-email"
                  name="email"
                  autoComplete="email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="you@company.com"
                  maxLength={200}
                  disabled={busy}
                />
                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block text-xs text-ink-faint">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    maxLength={5000}
                    value={form.message}
                    disabled={busy}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about the role or the problem…"
                    className="w-full resize-none rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm outline-none transition-colors focus:border-blue/50 disabled:opacity-60"
                  />
                </div>
                {/* honeypot — hidden from people, filled in by bots */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
                />
              </div>

              <button
                type="submit"
                disabled={busy}
                className="group relative mt-6 flex h-12 w-full items-center justify-center overflow-hidden rounded-xl bg-white font-medium text-black transition-transform active:scale-[0.99] disabled:cursor-default"
              >
                <AnimatePresence mode="wait">
                  {(status === "idle" || status === "error") && (
                    <motion.span key="idle" className="flex items-center gap-2" exit={{ opacity: 0, y: -10 }}>
                      {status === "error" ? "Try again" : "Transmit message"}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.span>
                  )}
                  {status === "sending" && (
                    <motion.span key="sending" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Transmitting…
                    </motion.span>
                  )}
                  {status === "sent" && (
                    <motion.span key="sent" className="flex items-center gap-2 text-emerald-600" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <Check className="h-4 w-4" />
                      Received — I&apos;ll reply soon
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              {status === "error" ? (
                <p role="alert" className="mt-3 text-center text-xs text-rose-400">
                  {error}{" "}
                  <a href={mailtoFallback} className="underline underline-offset-2 hover:text-rose-300">
                    Email me directly
                  </a>
                </p>
              ) : (
                <p className="mt-3 text-center text-[10px] text-ink-faint">
                  Goes straight to my inbox · or use the channels on the left.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  name,
  autoComplete,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
  disabled,
}: {
  id: string;
  name: string;
  autoComplete?: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  maxLength?: number;
  disabled?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs text-ink-faint">{label}</label>
      <input
        id={id}
        name={name}
        autoComplete={autoComplete}
        required
        type={type}
        value={value}
        maxLength={maxLength}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm outline-none transition-colors focus:border-blue/50 disabled:opacity-60"
      />
    </div>
  );
}
