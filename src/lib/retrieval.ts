/* ------------------------------------------------------------------ *
 *  Local retrieval engine for the recruiter assistant.
 *
 *  This is a lightweight, dependency-free RAG-lite: it builds a corpus
 *  of passages from the site's content, scores them against the query
 *  with TF + phrase matching, and composes a grounded answer.
 *
 *  To upgrade to a real LLM, call `retrieve()` to get context passages,
 *  then pass { query, context } to your model in /api/chat. The UI and
 *  citation format already expect this shape.
 * ------------------------------------------------------------------ */
import {
  profile,
  projects,
  research,
  publications,
  education,
  certifications,
  achievements,
  skills,
  github,
} from "./data";

export interface Passage {
  id: string;
  title: string;
  section: string;
  href: string;
  text: string;
}

export interface Citation {
  title: string;
  section: string;
  href: string;
}

export interface AssistantAnswer {
  answer: string;
  citations: Citation[];
  suggestions: string[];
}

/* ---- Build the corpus once ---- */
function buildCorpus(): Passage[] {
  const out: Passage[] = [];

  out.push({
    id: "profile",
    title: "About Nishant",
    section: "Overview",
    href: "#hero",
    text: `${profile.name} is an ${profile.roles.join(", ")}. ${profile.summary} ${profile.tagline} Based in ${profile.location}. ${profile.availability}. Interests: ${profile.interests.join(", ")}.`,
  });

  for (const p of projects) {
    out.push({
      id: `project-${p.slug}`,
      title: p.name,
      section: "Projects",
      href: `/work/${p.slug}`,
      text: `${p.name} (${p.category}, ${p.year}, ${p.status}). ${p.tagline} ${p.summary} Problem: ${p.problem} Solution: ${p.solution} Built with ${p.stack.join(", ")}. Impact: ${p.metrics.map((m) => `${m.label} ${m.value}`).join(", ")}. Challenges: ${p.challenges.join(" ")}`,
    });
  }

  for (const r of research) {
    out.push({
      id: `research-${r.year}-${r.title}`,
      title: r.title,
      section: "Research",
      href: "#research",
      text: `${r.title} (${r.field}, ${r.year}). ${r.body} Topics: ${r.tags.join(", ")}.`,
    });
  }

  for (const pub of publications) {
    out.push({
      id: `pub-${pub.title}`,
      title: pub.title,
      section: "Publications",
      href: "#publications",
      text: `${pub.title}. ${pub.type} at ${pub.venue}, ${pub.year}. ${pub.abstract}`,
    });
  }

  for (const e of education) {
    out.push({
      id: `edu-${e.school}`,
      title: e.degree,
      section: "Education",
      href: "#education",
      text: `${e.degree} at ${e.school} (${e.period}). ${e.detail ?? ""}`,
    });
  }

  out.push({
    id: "certifications",
    title: "Certifications",
    section: "Education",
    href: "#education",
    text: `Certifications: ${certifications
      .map((c) => `${c.title} (${c.issuer}, ${c.date})`)
      .join("; ")}.`,
  });

  out.push({
    id: "skills",
    title: "Skills & Stack",
    section: "Skills",
    href: "#skills",
    text: `Technologies and skills: ${skills.map((s) => s.label).join(", ")}.`,
  });

  out.push({
    id: "achievements",
    title: "Achievements",
    section: "Achievements",
    href: "#achievements",
    text: achievements.map((a) => `${a.title}: ${a.detail}`).join(". "),
  });

  out.push({
    id: "github",
    title: "GitHub",
    section: "GitHub",
    href: github.url,
    text: `GitHub @${github.username} (${github.url}). Key repositories: ${github.pinned.map((r) => r.name).join(", ")}. Currently: ${github.currentWork}.`,
  });

  return out;
}

const CORPUS = buildCorpus();

const STOP = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "is", "are", "for",
  "on", "with", "does", "do", "he", "his", "she", "what", "who", "how",
  "about", "tell", "me", "show", "know", "has", "have", "did", "was",
  "why", "should", "i", "you", "your", "him", "her", "can", "any",
]);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9+.# ]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function scorePassage(qTokens: string[], query: string, p: Passage): number {
  const hay = p.text.toLowerCase();
  const title = p.title.toLowerCase();
  let score = 0;
  for (const t of qTokens) {
    if (title.includes(t)) score += 4;
    const matches = hay.split(t).length - 1;
    score += Math.min(matches, 4) * 1.2;
  }
  // phrase bonus
  const q = query.toLowerCase().trim();
  if (q.length > 4 && hay.includes(q)) score += 6;
  return score;
}

export function retrieve(query: string, k = 3): Passage[] {
  const qTokens = tokenize(query);
  if (qTokens.length === 0) return [];
  return CORPUS.map((p) => ({ p, s: scorePassage(qTokens, query, p) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, k)
    .map((x) => x.p);
}

const SUGGESTIONS = [
  "Tell me about LedgerMind",
  "Show me his healthcare projects",
  "Does he know PyTorch?",
  "What research has he done?",
  "Why should I hire him?",
  "What's his strongest project?",
];

function pickSuggestions(exclude: string): string[] {
  return SUGGESTIONS.filter(
    (s) => s.toLowerCase() !== exclude.toLowerCase()
  ).slice(0, 3);
}

/* ---- Intent-aware answer composition ---- */
export function answer(query: string): AssistantAnswer {
  const q = query.toLowerCase().trim();
  const passages = retrieve(query, 4);
  const cite = (ps: Passage[]): Citation[] =>
    ps.map((p) => ({ title: p.title, section: p.section, href: p.href }));

  // Greeting / empty
  if (!q || /^(hi|hey|hello|yo|sup)\b/.test(q)) {
    return {
      answer:
        "Hi — I'm Nishant's portfolio assistant. I can answer anything about his projects, research, skills, and experience, grounded in his actual work. Ask me something like the prompts below.",
      citations: [],
      suggestions: SUGGESTIONS.slice(0, 3),
    };
  }

  // "Who is Nishant"
  if (/\bwho\b/.test(q) || q.includes("about nishant") || q === "about") {
    return {
      answer: `${profile.name} is an AI Engineer who builds production AI systems — multi-agent LLM frameworks, retrieval platforms, and computer-vision models used in healthcare. ${profile.summary}`,
      citations: cite(passages.slice(0, 2)),
      suggestions: pickSuggestions(query),
    };
  }

  // Education / study
  if (/\b(stud(y|ies|ying)|educat|colleg|universit|degree|school|amrita|b\.?tech|graduat)\b/.test(q)) {
    const e = education[0];
    return {
      answer: `He's pursuing a ${e.degree} at ${e.school} (${e.period}), specializing in Artificial Intelligence. Alongside the degree he holds ${certifications.length} professional certifications from AWS Academy, DataCamp, Udemy, and IIRS/ISRO.`,
      citations: [{ title: e.degree, section: "Education", href: "#education" }],
      suggestions: ["What are his certifications?", "Why should I hire him?", "Show me his projects"],
    };
  }

  // Certifications
  if (q.includes("certif")) {
    return {
      answer: `He holds ${certifications.length} certifications: ${certifications
        .map((c) => `${c.title} (${c.issuer}, ${c.date})`)
        .join("; ")}.`,
      citations: [{ title: "Certifications", section: "Education", href: "#education" }],
      suggestions: ["Where does he study?", "Why should I hire him?", "What research has he done?"],
    };
  }

  // Specific project by name (check before generic intents so e.g.
  // "ClarityStack" doesn't get caught by the "stack" tech intent).
  const projByName = projects.find((p) => {
    const name = p.name.toLowerCase();
    const compact = name.replace(/\s+/g, "");
    return q.includes(name) || q.includes(compact) || q.includes(p.slug);
  });
  if (projByName) {
    return {
      answer: `${projByName.name} — ${projByName.tagline} ${projByName.summary} Built with ${projByName.stack.join(", ")}. Key results: ${projByName.metrics.map((m) => `${m.value} ${m.label.toLowerCase()}`).join(", ")}.`,
      citations: [
        {
          title: projByName.name,
          section: "Projects",
          href: `/work/${projByName.slug}`,
        },
      ],
      suggestions: [
        "Why should I hire him?",
        "What research has he done?",
        "Show me his skills",
      ],
    };
  }

  // "Why should I hire him"
  if (q.includes("hire") || q.includes("why should")) {
    return {
      answer:
        "Three reasons. 1) He builds complete, agentic AI systems end-to-end — LedgerMind, an agentic financial OS (LangGraph + FastAPI + Supabase, 108 live tests, deterministic numbers with the LLM only classifying/explaining); NeuroBank, a four-agent banking assistant; and ClarityStack, a local-first knowledge platform spanning a FastAPI backend, a Next.js web app, and a native Android client. 2) He has research depth — a peer-reviewed paper, DRISHTI, at ICTIS 2026 (Bangkok), plus 90%+ accuracy models in medical imaging and domain adaptation. 3) He owns the whole stack — models, FastAPI services, databases, and front-end — and cares about accuracy, explainability, and shipping. He's a CSE (AI) student at Amrita with real, measured results.",
      citations: cite(retrieve("LedgerMind NeuroBank ClarityStack agentic", 3)),
      suggestions: ["Tell me about LedgerMind", "What research has he done?", "Show me his skills"],
    };
  }

  // Kubernetes / specific tech yes/no
  const techQuery = q.match(/\b(kubernetes|docker|pytorch|tensorflow|aws|langgraph|rag|react|fastapi|mongodb|postgres|opencv)\b/);
  if (techQuery && (q.includes("know") || q.includes("does") || q.includes("familiar") || q.includes("experience"))) {
    const tech = techQuery[1];
    const skill = skills.find((s) => s.label.toLowerCase().includes(tech));
    const usedIn = projects
      .filter((p) => p.stack.some((t) => t.toLowerCase().includes(tech)))
      .map((p) => p.name);
    return {
      answer:
        `Yes — ${skill?.label ?? tech} is part of his toolkit.` +
        (usedIn.length
          ? ` He's used it in ${usedIn.join(", ")}.`
          : " It appears across his infrastructure and deployment work."),
      citations: cite(passages.slice(0, 2)),
      suggestions: pickSuggestions(query),
    };
  }

  // Healthcare / medical
  if (q.includes("health") || q.includes("medical") || q.includes("clinical")) {
    const med = projects.filter((p) =>
      /retinopathy|dristi|medical|health/i.test(p.category + p.summary)
    );
    return {
      answer: `His healthcare AI work includes ${med
        .map((p) => `${p.name} (${p.tagline})`)
        .join("; ")}. Both emphasise explainability and real-world deployability in low-resource clinical settings.`,
      citations: cite(med.map((p) => CORPUS.find((c) => c.id === `project-${p.slug}`)!).filter(Boolean)),
      suggestions: ["Tell me about Diabetic Retinopathy", "What research has he done?", "Why should I hire him?"],
    };
  }

  // Research
  if (q.includes("research") || q.includes("publication") || q.includes("paper")) {
    return {
      answer: `His research spans ${research
        .map((r) => r.title)
        .join(", ")} — anchored by a peer-reviewed paper, DRISHTI (ICTIS 2026, Bangkok), on multimodal edge-AI assistive navigation for the visually impaired.`,
      citations: cite(retrieve("research publication paper", 3)),
      suggestions: ["Show me his publications", "Tell me about Domain Adaptation", "Why should I hire him?"],
    };
  }

  // Technologies list
  if (q.includes("technolog") || q.includes("stack") || q.includes("skills") || q.includes("tools")) {
    return {
      answer: `His core stack: Python and PyTorch/TensorFlow for modelling; LangGraph, RAG and vector databases for LLM systems; FastAPI, React/Next.js and TypeScript for delivery; and Docker, Kubernetes and AWS for deployment. Full graph is in the Skills section.`,
      citations: cite(retrieve("skills technologies", 2)),
      suggestions: ["Does he know Kubernetes?", "Tell me about NeuroBank", "Why should I hire him?"],
    };
  }

  // Fallback: use retrieved passages
  if (passages.length === 0) {
    return {
      answer:
        "I don't have anything specific on that in Nishant's portfolio yet. Try asking about his projects (NeuroBank, ClarityStack, Diabetic Retinopathy), his research, or his tech stack.",
      citations: [],
      suggestions: SUGGESTIONS.slice(0, 3),
    };
  }

  const top = passages[0];
  const second = passages[1];
  let composed = top.text;
  // Trim to a reasonable answer length at a sentence boundary.
  if (composed.length > 420) {
    const cut = composed.slice(0, 420);
    composed = cut.slice(0, cut.lastIndexOf(".") + 1) || cut + "…";
  }
  if (second && composed.length < 260) {
    composed += ` ${second.text.split(". ").slice(0, 1).join(". ")}.`;
  }

  return {
    answer: composed,
    citations: cite(passages.slice(0, 2)),
    suggestions: pickSuggestions(query),
  };
}

export const starterPrompts = SUGGESTIONS;
