import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import { profile } from "@/lib/data";

export const runtime = "nodejs";

/**
 * Contact form endpoint.
 *
 * Sends each message from your Gmail account to your inbox over SMTP.
 * Needs GMAIL_APP_PASSWORD — a Google App Password, not the account
 * password (see .env.example). GMAIL_USER and CONTACT_TO_EMAIL default to
 * profile.email. Without a password it answers 503 so the form points
 * visitors at the direct email link instead of pretending to send.
 */

const LIMITS = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

function field(body: Record<string, unknown>, key: string) {
  const v = body[key];
  return typeof v === "string" ? v.trim() : "";
}

function bad(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed = await req.json();
    body = parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return bad("Bad request");
  }

  // Honeypot: people never see this field, bots fill it in.
  // Report success so they don't retry.
  if (field(body, "website")) return NextResponse.json({ ok: true });

  const name = field(body, "name").replace(/[\r\n]+/g, " ");
  const email = field(body, "email");
  const message = field(body, "message");

  if (!name || !email || !message) {
    return bad("Please fill in your name, email, and message.");
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return bad("That message is too long — please shorten it.");
  }
  if (!EMAIL_RE.test(email)) {
    return bad("That email address doesn't look right.");
  }

  // Google shows app passwords in groups of four; the spaces aren't part of it.
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!pass) {
    console.error("[contact] GMAIL_APP_PASSWORD is not set — message not sent.");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  const user = process.env.GMAIL_USER || profile.email;

  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  try {
    await transport.sendMail({
      from: { name: "Portfolio contact", address: user },
      to: process.env.CONTACT_TO_EMAIL || profile.email,
      replyTo: { name, address: email },
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
      html: `<p style="white-space:pre-wrap">${escapeHtml(message)}</p><p>— ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`,
    });
  } catch (err) {
    const e = err as { code?: string; responseCode?: number; message?: string };
    console.error(
      `[contact] Gmail send failed (${e.code ?? "unknown"}${e.responseCode ? ` ${e.responseCode}` : ""}):`,
      e.message,
    );
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
