/* ------------------------------------------------------------------ *
 *  Central content model.
 *  Everything the site renders — and everything the AI assistant
 *  answers from — lives here. Edit this one file to update the site.
 * ------------------------------------------------------------------ */

export const profile = {
  name: "Nishant Shah",
  initials: "NS",
  roles: [
    "AI Engineer",
    "Machine Learning Engineer",
    "Computer Vision Engineer",
    "Deep Learning Engineer",
    "Full-Stack AI Developer",
    "Researcher",
  ],
  tagline: "Building AI systems that think, reason, and solve real problems.",
  summary:
    "Computer Science student specializing in AI with hands-on experience in Machine Learning, Deep Learning, Computer Vision, and data-driven analytics. I've developed and deployed scalable AI models achieving 90%+ classification accuracy across healthcare, domain adaptation, and assistive-intelligence applications — skilled in Python, TensorFlow, PyTorch, FastAPI, and modern full-stack architectures, and focused on translating complex data into production-ready intelligent systems.",
  location: "Amritapuri, India",
  availability: "Open to AI / ML engineering roles & internships",
  email: "nishant108ns@gmail.com",
  socials: {
    github: "https://github.com/iamnishaant",
    linkedin: "https://www.linkedin.com/in/nishant-shah-638577256/",
    resume: "/resume.pdf",
  },
  interests: [
    "Artificial Intelligence",
    "Computer Vision",
    "Large Language Models",
    "AI Agents",
    "Healthcare AI",
    "Bioinformatics",
  ],
  whoami: ["Nishant Shah", "AI Engineer", "CSE (AI) @ Amrita", "Researcher", "Builder"],
} as const;

/* ------------------------------------------------------------------ */
/*  Stats — animated counters                                          */
/* ------------------------------------------------------------------ */
export const stats = [
  { label: "AI & ML projects", value: 8, suffix: "" },
  { label: "Best model precision", value: 98, suffix: "%" },
  { label: "Peer-reviewed paper", value: 1, suffix: "" },
  { label: "Certifications", value: 5, suffix: "" },
] as const;

/* ------------------------------------------------------------------ */
/*  Skills — knowledge graph                                          */
/* ------------------------------------------------------------------ */
export type SkillGroup =
  | "core"
  | "ml"
  | "cv"
  | "llm"
  | "backend"
  | "infra"
  | "data";

export interface SkillNode {
  id: string;
  label: string;
  group: SkillGroup;
  /** relative importance 1..3 — drives node size */
  weight: number;
  /** projects this skill powers (project slugs) */
  projects?: string[];
  blurb?: string;
}

export const skillGroups: Record<SkillGroup, { label: string; color: string }> = {
  core: { label: "Foundations", color: "#ffffff" },
  ml: { label: "Machine / Deep Learning", color: "#5b8cff" },
  cv: { label: "Computer Vision", color: "#55e6ff" },
  llm: { label: "LLMs & Agents", color: "#8b7bff" },
  backend: { label: "Backend & Web", color: "#4ade80" },
  infra: { label: "Infra & Edge", color: "#fbbf24" },
  data: { label: "Data & Bio", color: "#f472b6" },
};

export const skills: SkillNode[] = [
  { id: "ai", label: "Artificial Intelligence", group: "core", weight: 3, blurb: "The through-line of everything I build." },
  { id: "python", label: "Python", group: "core", weight: 3, blurb: "My primary language across ML, backend, and research." },
  { id: "dl", label: "Deep Learning", group: "ml", weight: 3, projects: ["diabetic-retinopathy", "domain-adaptation", "dristi"] },
  { id: "cv", label: "Computer Vision", group: "cv", weight: 3, projects: ["diabetic-retinopathy", "dristi", "domain-adaptation"] },
  { id: "llm", label: "LLMs", group: "llm", weight: 3, projects: ["ledgermind", "esgenuine", "neurobank", "claritystack"] },
  { id: "agents", label: "AI Agents", group: "llm", weight: 3, projects: ["ledgermind", "neurobank"], blurb: "Agentic AI — planners, reflection, execution, and durable human-in-the-loop workflows." },
  { id: "rag", label: "RAG", group: "llm", weight: 2, projects: ["claritystack", "neurobank", "ledgermind"] },
  { id: "genai", label: "Generative AI", group: "llm", weight: 2, projects: ["neurobank", "claritystack"] },
  { id: "langgraph", label: "LangGraph", group: "llm", weight: 2, projects: ["ledgermind", "neurobank"] },
  { id: "pytorch", label: "PyTorch", group: "ml", weight: 3, projects: ["diabetic-retinopathy", "domain-adaptation", "dristi"] },
  { id: "tensorflow", label: "TensorFlow", group: "ml", weight: 2, projects: ["diabetic-retinopathy"] },
  { id: "sklearn", label: "scikit-learn", group: "ml", weight: 2, projects: ["domain-adaptation", "genome-assembly"] },
  { id: "opencv", label: "OpenCV", group: "cv", weight: 2, projects: ["dristi", "diabetic-retinopathy"] },
  { id: "fastapi", label: "FastAPI", group: "backend", weight: 3, projects: ["ledgermind", "esgenuine", "neurobank", "claritystack"] },
  { id: "react", label: "React / Next.js", group: "backend", weight: 2, projects: ["ledgermind", "esgenuine", "claritystack"] },
  { id: "typescript", label: "TypeScript", group: "backend", weight: 2, projects: ["ledgermind", "esgenuine", "claritystack"] },
  { id: "docker", label: "Docker", group: "infra", weight: 2, projects: ["esgenuine"] },
  { id: "kubernetes", label: "Kubernetes", group: "infra", weight: 1 },
  { id: "aws", label: "AWS", group: "infra", weight: 2 },
  { id: "raspberrypi", label: "Raspberry Pi / Edge", group: "infra", weight: 2, projects: ["dristi"] },
  { id: "postgres", label: "PostgreSQL", group: "data", weight: 2, projects: ["ledgermind", "esgenuine", "claritystack"] },
  { id: "bioinformatics", label: "Genome Assembly", group: "data", weight: 2, projects: ["genome-assembly"], blurb: "de Bruijn assembly & viral genomics with BioPython / PySam." },
];

/** Edges of the knowledge graph. Central node is `ai`. */
export const skillLinks: [string, string][] = [
  ["ai", "python"], ["ai", "dl"], ["ai", "cv"], ["ai", "llm"], ["ai", "agents"],
  ["dl", "pytorch"], ["dl", "tensorflow"], ["dl", "cv"],
  ["cv", "opencv"], ["cv", "pytorch"],
  ["llm", "agents"], ["llm", "rag"], ["llm", "genai"], ["llm", "langgraph"],
  ["agents", "langgraph"], ["rag", "genai"],
  ["pytorch", "python"], ["tensorflow", "python"], ["sklearn", "python"],
  ["fastapi", "python"], ["fastapi", "react"], ["fastapi", "postgres"],
  ["react", "typescript"],
  ["docker", "kubernetes"], ["docker", "aws"], ["kubernetes", "aws"],
  ["raspberrypi", "cv"], ["raspberrypi", "python"],
  ["bioinformatics", "python"], ["bioinformatics", "sklearn"],
];

/* ------------------------------------------------------------------ */
/*  Projects                                                          */
/* ------------------------------------------------------------------ */
export interface Metric {
  label: string;
  value: string;
  hint?: string;
}
export interface ArchNode {
  id: string;
  label: string;
  sub?: string;
  /** column (0..n) for layout */
  col: number;
}
export interface Project {
  slug: string;
  name: string;
  category: string;
  year: string;
  period: string;
  tagline: string;
  status: "Production" | "Research" | "Prototype";
  accent: string; // hex
  summary: string;
  problem: string;
  solution: string;
  challenges: string[];
  metrics: Metric[];
  stack: string[];
  architecture: {
    nodes: ArchNode[];
    edges: [string, string][];
  };
  highlights: string[];
  links: { github?: string; demo?: string; paper?: string };
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "ledgermind",
    name: "LedgerMind",
    category: "Agentic Financial OS · Fintech",
    year: "2026",
    period: "Jul 2026 – Present",
    tagline: "An agentic financial OS — a virtual accountant, bookkeeper, analyst, and CFO in one.",
    status: "Production",
    accent: "#34d399",
    summary:
      "LedgerMind is an agentic financial operating system for small businesses — a virtual accountant, bookkeeper, analyst, and CFO in one platform. Users upload receipts or connect Gmail, and a chain of AI agents categorizes expenses, detects fraud, and monitors budgets — with a strict design principle: numbers are computed by SQL/Python, and the LLM only classifies and explains.",
    problem:
      "Small businesses juggle receipts, bookkeeping, tax, and forecasting across disconnected tools — hours of manual data entry, and no early warning when fraud or budget overruns creep in.",
    solution:
      "A LangGraph-orchestrated agent pipeline runs per receipt — OCR, then human review if confidence is low, then accounting categorization, fraud detection, and budget monitoring. Business-level intelligence (GST, forecasting, CFO summaries) runs on demand. A durable Postgres checkpointer makes every workflow resumable, pausing for human-in-the-loop review when needed.",
    challenges: [
      "Keeping financial numbers exact — deterministic SQL/Python, never the LLM.",
      "Durable, resumable agent workflows with human-in-the-loop checkpoints.",
      "Securely ingesting real data (Gmail OAuth) with row-level security and audit logs.",
    ],
    metrics: [
      { label: "Live backend tests", value: "108", hint: "against real Supabase" },
      { label: "Roadmap complete", value: "10/11", hint: "phases" },
      { label: "Numbers", value: "Deterministic", hint: "SQL/Python, not the LLM" },
      { label: "LLM providers", value: "Swappable", hint: "Anthropic · OpenAI · NIM" },
    ],
    stack: ["Python", "FastAPI", "LangGraph", "PaddleOCR", "Next.js", "TypeScript", "Supabase", "pgvector", "Recharts"],
    architecture: {
      nodes: [
        { id: "ingest", label: "Receipt / Gmail", sub: "upload · OAuth", col: 0 },
        { id: "ocr", label: "PaddleOCR", sub: "parse", col: 1 },
        { id: "review", label: "Human Review", sub: "low-confidence", col: 2 },
        { id: "cat", label: "Categorizer", sub: "LLM classifies", col: 3 },
        { id: "fraud", label: "Fraud Detection", col: 4 },
        { id: "ledger", label: "Ledger + CFO", sub: "Supabase · SQL", col: 5 },
      ],
      edges: [
        ["ingest", "ocr"], ["ocr", "review"], ["review", "cat"],
        ["ocr", "cat"], ["cat", "fraud"], ["fraud", "ledger"],
      ],
    },
    highlights: [
      "Deterministic by design: numbers via SQL/Python, LLM only classifies & explains.",
      "LangGraph durable Postgres checkpointer with human-in-the-loop review.",
      "108 live tests against real Supabase infra — auth, RLS, agents, durability.",
      "Provider-swappable LLM (Anthropic / OpenAI / NVIDIA NIM) + Gmail ingestion.",
    ],
    links: { github: "https://github.com/iamnishaant/LedgerMind" },
    featured: true,
  },
  {
    slug: "esgenuine",
    name: "ESGenuine",
    category: "ESG Document AI · LLM Evaluation",
    year: "2026",
    period: "Jun 2026 – Sep 2026",
    tagline: "Evidence-grounded ESG claim extraction — with a deterministic layer that repairs what the LLM gets wrong.",
    status: "Production",
    accent: "#fb923c",
    summary:
      "ESGenuine is an evidence-grounded ESG claim extraction and auditing system. It turns a 90-page sustainability report into structured, provenance-carrying claims, then measures how much of that extraction can actually be trusted — with a deterministic post-correction layer that repairs what the language model gets wrong at 0.45 ms per claim and zero inference cost. Every reported number regenerates offline from committed fixtures, with no API key and no network.",
    problem:
      "ESG disclosures are unstructured and unverified — the same metric appears as a table cell in one report, a sentence in another, and a footnote in a third. LLM extraction from them fails quietly: 31.7% of a 70B model's emitted values do not appear on the page it cites, and ratings from major providers agree at a correlation of only ~0.54.",
    solution:
      "Docling parses the PDF into sections and tables, an LLM (Llama-3.3-70B via NVIDIA NIM) extracts claims, and a five-stage deterministic repair layer — taxonomy normalisation, fiscal-year column repair, source-value verification, a rule-based gate, and a furniture filter — corrects them before each claim is grounded against its source page and stored with provenance in Supabase. NLI contradiction checks and a greenwashing taxonomy feed a document integrity report in a React dashboard.",
    challenges: [
      "Catching silent LLM errors — plausible values that never occur on the cited page.",
      "Measuring recall honestly, against table cells enumerated from the parsed document instead of a gold set sampled from the system's own output.",
      "Different disclosure formats need different repairs — statutory filings and narrative reports respond to different stages.",
    ],
    metrics: [
      { label: "Precision composite", value: "96.1", hint: "up from 67.7 · statutory filing" },
      { label: "Repair layer gain", value: "+24.6", hint: "points, zero LLM cost" },
      { label: "Repair latency", value: "0.45 ms", hint: "per claim, no network" },
      { label: "Claims extracted", value: "1,730", hint: "461 pages · 6 reports" },
    ],
    stack: ["Python", "FastAPI", "Docling", "Llama 3.3 70B", "Supabase", "pgvector", "React", "TypeScript", "DistilBERT NLI", "Docker"],
    architecture: {
      nodes: [
        { id: "pdf", label: "ESG Report PDF", sub: "BRSR · IR", col: 0 },
        { id: "parse", label: "Docling Parser", sub: "sections · tables", col: 1 },
        { id: "llm", label: "LLM Extraction", sub: "Llama-3.3-70B · NIM", col: 2 },
        { id: "repair", label: "Deterministic Repair", sub: "S1–S5 · 0.45 ms", col: 3 },
        { id: "store", label: "Supabase", sub: "pgvector · provenance", col: 4 },
        { id: "nli", label: "Contradictions", sub: "NLI", col: 5 },
        { id: "report", label: "Integrity Report", sub: "dashboard", col: 5 },
      ],
      edges: [
        ["pdf", "parse"], ["parse", "llm"], ["llm", "repair"], ["parse", "repair"],
        ["repair", "store"], ["store", "nli"], ["store", "report"],
      ],
    },
    highlights: [
      "Deterministic repair layer: +24.6 points on a statutory filing at zero inference cost.",
      "Central finding: the dominant repair depends on disclosure format — with non-overlapping 95% CIs.",
      "Eight evaluation harnesses with bootstrap confidence intervals and a CI gate on ground truth.",
      "Fully reproducible offline — seeded RNGs and models pinned by commit SHA.",
    ],
    links: { github: "https://github.com/iamnishaant/ESGenuine", demo: "https://esgenuine.onrender.com" },
    featured: true,
  },
  {
    slug: "neurobank",
    name: "NeuroBank",
    category: "AI Banking Assistant · Multi-Agent",
    year: "2026",
    period: "May 2026 – Jul 2026",
    tagline: "An AI banking assistant that runs real banking operations through conversation.",
    status: "Production",
    accent: "#5b8cff",
    summary:
      "NeuroBank is an AI-powered banking assistant built with Python, FastAPI, SQLite, and LLMs that automates banking services through natural-language interactions. A multi-agent architecture — NLU, Planner, Reflection, and Execution agents — handles intent recognition, reasoning, and secure task execution, with LLM function calling wired directly into backend APIs.",
    problem:
      "Everyday banking is buried in forms and menus. Natural language could automate it — but a single LLM call hallucinates, can't reason through multi-step tasks, and certainly can't be trusted to move money securely.",
    solution:
      "A four-agent pipeline decomposes each request: an NLU agent extracts intent, a Planner sequences the work, a Reflection agent verifies it, and an Execution agent invokes typed backend APIs via LLM function calling. A secure, modular microservice backend adds authentication and persistent state so operations stay reliable and extensible.",
    challenges: [
      "Accurate intent recognition across varied natural-language phrasings.",
      "Secure task execution — money movement must be verified, never guessed.",
      "Reliable LLM function calling wired to real backend APIs.",
    ],
    metrics: [
      { label: "Specialized agents", value: "4", hint: "NLU · Planner · Reflection · Execution" },
      { label: "Core workflows", value: "4", hint: "balance · transfer · history · advice" },
      { label: "Backend", value: "FastAPI", hint: "modular microservices" },
      { label: "Auth", value: "Secure", hint: "persistent state" },
    ],
    stack: ["Python", "FastAPI", "SQLite", "LLMs", "LangGraph", "Function Calling", "Microservices"],
    architecture: {
      nodes: [
        { id: "user", label: "User Query", sub: "natural language", col: 0 },
        { id: "nlu", label: "NLU Agent", sub: "intent", col: 1 },
        { id: "planner", label: "Planner Agent", sub: "sequences task", col: 2 },
        { id: "reflect", label: "Reflection Agent", sub: "verifies", col: 3 },
        { id: "exec", label: "Execution Agent", sub: "function calling", col: 4 },
        { id: "api", label: "Banking APIs", sub: "FastAPI · SQLite", col: 5 },
      ],
      edges: [
        ["user", "nlu"], ["nlu", "planner"], ["planner", "reflect"],
        ["reflect", "exec"], ["exec", "api"], ["reflect", "planner"],
      ],
    },
    highlights: [
      "Four cooperating agents: NLU, Planner, Reflection, Execution.",
      "LLM function calling bound to real backend banking APIs.",
      "Secure, modular microservice backend with persistent state.",
    ],
    links: { github: "https://github.com/iamnishaant/NeuroBank" },
    featured: true,
  },
  {
    slug: "claritystack",
    name: "ClarityStack",
    category: "Local-First Knowledge Management",
    year: "2026",
    period: "Feb 2026 – May 2026",
    tagline: "Turn long-form AI chat histories into structured, version-controlled knowledge.",
    status: "Production",
    accent: "#8b7bff",
    summary:
      "ClarityStack is an end-to-end, local-first knowledge-management system that extracts long-form AI chat histories into structured, version-controlled knowledge bases — while preserving the raw transcripts as immutable ground truth. A distributed FastAPI + SQLite backend powers dedicated services for spaced-repetition learning, document editing, and analytics, served to a Next.js web app and a native Android client.",
    problem:
      "The knowledge you build up inside AI chats is trapped in long, ephemeral transcripts. It's hard to revisit, impossible to version, and easy to lose — and naive summaries throw away the original ground truth.",
    solution:
      "ClarityStack extracts transcripts into structured, version-controlled knowledge bases while keeping the raw text immutable. Microservices handle spaced-repetition (SRS), rich-text/markdown editing, and specialized analytics (ThreatLens); markdown workflows feed directly into SRS and temporal tracking cards for long-term retention across web and Android.",
    challenges: [
      "Extracting structure without ever mutating the ground-truth transcript.",
      "A distributed microservice backend that stays coherent across services.",
      "One seamless experience across a Next.js web app and a native Android client.",
    ],
    metrics: [
      { label: "Microservices", value: "3", hint: "SRS · editor · ThreatLens" },
      { label: "Client platforms", value: "2", hint: "Next.js web · Android" },
      { label: "Ground truth", value: "Immutable", hint: "raw transcripts" },
      { label: "Retention", value: "SRS", hint: "spaced repetition" },
    ],
    stack: ["Python", "FastAPI", "SQLite", "Next.js", "TypeScript", "Jetpack Compose", "Markdown", "RAG"],
    architecture: {
      nodes: [
        { id: "chat", label: "AI Chat Histories", col: 0 },
        { id: "extract", label: "Extractor", sub: "structure", col: 1 },
        { id: "kb", label: "Versioned KB", sub: "+ immutable raw", col: 2 },
        { id: "srs", label: "SRS Service", col: 3 },
        { id: "edit", label: "Editor Service", col: 3 },
        { id: "threat", label: "ThreatLens", sub: "analytics", col: 3 },
        { id: "clients", label: "Web + Android", sub: "Next.js · Compose", col: 4 },
      ],
      edges: [
        ["chat", "extract"], ["extract", "kb"], ["kb", "srs"], ["kb", "edit"],
        ["kb", "threat"], ["srs", "clients"], ["edit", "clients"], ["threat", "clients"],
      ],
    },
    highlights: [
      "Local-first: raw transcripts stay as immutable ground truth.",
      "Distributed FastAPI microservices for SRS, editing, and analytics.",
      "Cross-platform Next.js web app + native Android (Jetpack Compose).",
    ],
    links: { github: "https://github.com/iamnishaant/Clarity-Stack--A-Complete-System" },
    featured: true,
  },
  {
    slug: "diabetic-retinopathy",
    name: "Diabetic Retinopathy Detection",
    category: "Medical Computer Vision · Deep Learning",
    year: "2026",
    period: "Sep 2025 – Jan 2026",
    tagline: "Grading diabetic retinopathy from retinal fundus images at clinical agreement.",
    status: "Research",
    accent: "#55e6ff",
    summary:
      "A deep-learning pipeline for multi-class grading of diabetic retinopathy from retinal fundus images, benchmarking EfficientNet, ConvNeXt, and Swin-Tiny backbones and adding Grad-CAM explainability to highlight clinically relevant regions. It reaches 90.42% accuracy and a 94.17% Quadratic Weighted Kappa — indicating strong agreement with clinical grading.",
    problem:
      "Diabetic retinopathy is a leading cause of preventable blindness, but screening is bottlenecked by the shortage of ophthalmologists — and black-box models won't earn clinical trust.",
    solution:
      "Engineered pipelines across three modern backbones (EfficientNet, ConvNeXt, Swin-Tiny) for five-class DR classification, paired with Grad-CAM visualizations so predictions can be inspected against clinically relevant regions of the retina.",
    challenges: [
      "Multi-class imbalance across the five DR severity grades.",
      "Interpretability strong enough to earn clinical trust.",
      "Benchmarking modern CNN and transformer backbones fairly.",
    ],
    metrics: [
      { label: "Accuracy", value: "90.42%", hint: "5-class" },
      { label: "Quadratic Kappa", value: "0.94", hint: "clinical agreement" },
      { label: "Backbones", value: "3", hint: "EfficientNet · ConvNeXt · Swin" },
      { label: "Explainability", value: "Grad-CAM" },
    ],
    stack: ["Python", "PyTorch", "TensorFlow", "EfficientNet", "ConvNeXt", "Swin-Tiny", "Grad-CAM", "OpenCV"],
    architecture: {
      nodes: [
        { id: "img", label: "Fundus Image", col: 0 },
        { id: "pre", label: "Preprocess", sub: "crop · normalize", col: 1 },
        { id: "back", label: "Backbones", sub: "EfficientNet · ConvNeXt · Swin", col: 2 },
        { id: "grade", label: "5-Class Grade", col: 3 },
        { id: "cam", label: "Grad-CAM", sub: "explainability", col: 3 },
      ],
      edges: [
        ["img", "pre"], ["pre", "back"], ["back", "grade"], ["back", "cam"],
      ],
    },
    highlights: [
      "90.42% accuracy with 0.94 Quadratic Weighted Kappa.",
      "Three-backbone benchmark: EfficientNet, ConvNeXt, Swin-Tiny.",
      "Grad-CAM overlays for clinical interpretability.",
    ],
    links: { github: "https://github.com/iamnishaant" },
    featured: true,
  },
  {
    slug: "dristi",
    name: "DRISHTI",
    category: "Assistive AI · Edge · IoT",
    year: "2024",
    period: "Mar 2024 – Sep 2024",
    tagline: "A Raspberry Pi wearable that guides the visually impaired with real-time multimodal sensing.",
    status: "Research",
    accent: "#fbbf24",
    summary:
      "DRISHTI is a Raspberry Pi 5-based wearable that fuses YOLOv8-nano object detection, ultrasonic ranging, on-device face recognition, and image captioning into real-time navigation for visually-impaired users — reaching 98.42% detection precision at 25 ms latency, fully offline. Presented at the ICTIS 2026 Conference, Bangkok, Thailand.",
    problem:
      "Assistive navigation has to be real-time, wearable, and reliable exactly when connectivity drops — yet most solutions are bulky, cloud-dependent, or too slow to trust on the move.",
    solution:
      "A Raspberry Pi 5 platform runs YOLOv8-nano detection, ultrasonic distance sensing, KNN-based on-device face recognition with dynamic enrollment, and image captioning — fused into multimodal voice and haptic feedback for situational awareness, with zero cloud dependence.",
    challenges: [
      "Real-time inference within a Raspberry Pi's power and compute budget.",
      "Fusing vision, ranging, and audio into calm, non-overwhelming guidance.",
      "On-device face recognition with dynamic enrollment and no cloud.",
    ],
    metrics: [
      { label: "Detection precision", value: "98.42%" },
      { label: "Latency", value: "25ms", hint: "real-time" },
      { label: "Offline", value: "100%", hint: "no cloud" },
      { label: "Sensing", value: "Multimodal", hint: "vision · ultrasonic · audio" },
    ],
    stack: ["Python", "YOLOv8-nano", "OpenCV", "Raspberry Pi 5", "PyTorch", "KNN", "Ultrasonic Sensors"],
    architecture: {
      nodes: [
        { id: "cam", label: "Camera + Ultrasonic", col: 0 },
        { id: "yolo", label: "YOLOv8-nano", sub: "detection", col: 1 },
        { id: "face", label: "Face Recognition", sub: "KNN on-device", col: 1 },
        { id: "cap", label: "Image Captioning", col: 2 },
        { id: "fuse", label: "Multimodal Fusion", sub: "priority", col: 3 },
        { id: "out", label: "Voice + Haptic", col: 4 },
      ],
      edges: [
        ["cam", "yolo"], ["cam", "face"], ["yolo", "cap"], ["yolo", "fuse"],
        ["face", "fuse"], ["cap", "fuse"], ["fuse", "out"],
      ],
    },
    highlights: [
      "98.42% detection precision at 25 ms, fully offline on a Pi 5.",
      "Vision + ultrasonic + face recognition + captioning, fused.",
      "Published at ICTIS 2026, Bangkok, Thailand.",
    ],
    links: { github: "https://github.com/iamnishaant/Meenakshi", paper: "#" },
    featured: true,
  },
  {
    slug: "domain-adaptation",
    name: "Domain Adaptation",
    category: "Transfer Learning · Computer Vision",
    year: "2025",
    period: "Jan 2025 – Jun 2025",
    tagline: "Making CNNs generalise across datasets with CORAL feature alignment.",
    status: "Research",
    accent: "#4ade80",
    summary:
      "A study of cross-domain image classification: CNN models trained and evaluated across MNIST, MNIST-M, Caltech-256, and Office-31, using CORAL loss and data augmentation for robust feature alignment and transfer learning to cut dataset bias and improve generalisation.",
    problem:
      "Models trained on one dataset degrade sharply on another with a different distribution — and re-labelling every new domain is expensive or impossible.",
    solution:
      "Engineered CNN classifiers with CORAL (correlation-alignment) loss plus augmentation to align source and target feature statistics, then applied transfer learning to reduce dataset bias and boost cross-domain generalisation.",
    challenges: [
      "Aligning feature distributions across very different domains.",
      "Reducing dataset bias without target-domain labels.",
      "Fair evaluation across four heterogeneous benchmarks.",
    ],
    metrics: [
      { label: "Benchmarks", value: "4", hint: "MNIST · MNIST-M · Caltech-256 · Office-31" },
      { label: "Alignment", value: "CORAL", hint: "correlation alignment" },
      { label: "Method", value: "Transfer", hint: "+ augmentation" },
    ],
    stack: ["Python", "PyTorch", "scikit-learn", "CORAL", "CNNs"],
    architecture: {
      nodes: [
        { id: "src", label: "Source Domain", col: 0 },
        { id: "tgt", label: "Target Domain", col: 0 },
        { id: "cnn", label: "Shared CNN", sub: "encoder", col: 1 },
        { id: "coral", label: "CORAL Loss", sub: "align stats", col: 2 },
        { id: "cls", label: "Classifier", col: 2 },
        { id: "out", label: "Adapted Model", col: 3 },
      ],
      edges: [
        ["src", "cnn"], ["tgt", "cnn"], ["cnn", "coral"], ["cnn", "cls"],
        ["coral", "out"], ["cls", "out"],
      ],
    },
    highlights: [
      "CORAL alignment across four vision benchmarks.",
      "Transfer learning to cut dataset bias.",
      "Foundational to the cross-domain medical-imaging work.",
    ],
    links: {},
    featured: false,
  },
  {
    slug: "genome-assembly",
    name: "Genome Assembly & SARS-CoV-2 Quantification",
    category: "Bioinformatics · Genomics",
    year: "2024",
    period: "Apr 2024 – Oct 2024",
    tagline: "de Bruijn genome assembly and variant quantification for viral surveillance.",
    status: "Research",
    accent: "#f472b6",
    summary:
      "Genome-assembly pipelines built on de Bruijn graphs to quantify closely related viral strains, with machine-learning-optimised k-mer selection for accuracy and robustness. The workflow was extended to SARS-CoV-2 and Omicron quantification — integrating variant calling (PySam), mutation annotation (Nextclade, CoV-GLUE), and phylogenetic tree generation (ETE3, Biopython) for large-scale genomic surveillance.",
    problem:
      "Telling apart closely related viral strains from short reads is a hard combinatorial problem — and it has to scale for real genomic surveillance.",
    solution:
      "de Bruijn-graph assembly with ML-tuned k-mer selection differentiates strains, then variant calling, mutation annotation, and phylogenetics extend it into a full SARS-CoV-2 / Omicron quantification and surveillance workflow.",
    challenges: [
      "Optimising k-mer selection for accuracy and robustness.",
      "Differentiating strains and enhancing mutation sensitivity.",
      "Scaling the workflow for large-scale viral surveillance.",
    ],
    metrics: [
      { label: "Assembly", value: "de Bruijn", hint: "graph-based" },
      { label: "Targets", value: "SARS-CoV-2", hint: "+ Omicron" },
      { label: "k-mer", value: "ML-tuned" },
      { label: "Toolchain", value: "PySam", hint: "Nextclade · ETE3" },
    ],
    stack: ["Python", "BioPython", "PySam", "Nextclade", "CoV-GLUE", "ETE3", "scikit-learn"],
    architecture: {
      nodes: [
        { id: "reads", label: "Sequencing Reads", col: 0 },
        { id: "kmer", label: "k-mer Selection", sub: "ML-optimised", col: 1 },
        { id: "asm", label: "de Bruijn Assembly", col: 2 },
        { id: "var", label: "Variant Calling", sub: "PySam", col: 3 },
        { id: "anno", label: "Annotation", sub: "Nextclade · CoV-GLUE", col: 4 },
        { id: "phylo", label: "Phylogenetics", sub: "ETE3 · Biopython", col: 5 },
      ],
      edges: [
        ["reads", "kmer"], ["kmer", "asm"], ["asm", "var"], ["var", "anno"], ["anno", "phylo"],
      ],
    },
    highlights: [
      "ML-optimised k-mer selection over de Bruijn assembly.",
      "SARS-CoV-2 & Omicron variant calling and annotation.",
      "Phylogenetic trees for large-scale viral surveillance.",
    ],
    links: {},
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

/* ------------------------------------------------------------------ */
/*  Research timeline                                                 */
/* ------------------------------------------------------------------ */
export interface ResearchStop {
  year: string;
  title: string;
  field: string;
  body: string;
  tags: string[];
}
export const research: ResearchStop[] = [
  {
    year: "2024",
    title: "Assistive Edge AI — DRISHTI",
    field: "Edge AI · IoT",
    body: "Started by putting AI where it matters most: a Raspberry Pi wearable fusing vision, ultrasonic ranging, and audio to guide the visually impaired in real time — later published at ICTIS 2026.",
    tags: ["Edge AI", "YOLOv8", "IoT", "Assistive"],
  },
  {
    year: "2024",
    title: "Genome Assembly & Viral Genomics",
    field: "Bioinformatics",
    body: "Moved into computational biology — de Bruijn genome assembly with ML-tuned k-mer selection, extended to SARS-CoV-2 and Omicron variant quantification for large-scale surveillance.",
    tags: ["Genome Assembly", "PySam", "Phylogenetics"],
  },
  {
    year: "2025",
    title: "Domain Adaptation",
    field: "Transfer Learning",
    body: "Studied why vision models fail under distribution shift, using CORAL feature alignment across MNIST, MNIST-M, Caltech-256, and Office-31 to generalise across domains.",
    tags: ["Domain Adaptation", "CORAL", "Computer Vision"],
  },
  {
    year: "2026",
    title: "Healthcare AI — Diabetic Retinopathy",
    field: "Medical Imaging",
    body: "Applied deep learning to a real clinical problem: benchmarking EfficientNet, ConvNeXt, and Swin-Tiny for DR grading with Grad-CAM explainability — 90.42% accuracy, 0.94 QWK.",
    tags: ["Medical CV", "Explainability", "PyTorch"],
  },
  {
    year: "2026",
    title: "Knowledge Systems & RAG — ClarityStack",
    field: "LLMs / RAG",
    body: "Built a local-first knowledge platform that extracts AI chat histories into structured, version-controlled knowledge bases with spaced-repetition retention across web and Android.",
    tags: ["RAG", "Knowledge Graphs", "Full-Stack"],
  },
  {
    year: "2026",
    title: "Agentic AI — LedgerMind & NeuroBank",
    field: "Autonomous Systems",
    body: "Composed LLMs into agentic systems: LedgerMind, an agentic financial OS with durable LangGraph workflows and human-in-the-loop review, and NeuroBank, a four-agent banking assistant with secure function calling into real backend APIs.",
    tags: ["AI Agents", "LangGraph", "Human-in-the-loop"],
  },
];

/* ------------------------------------------------------------------ */
/*  Publications                                                      */
/* ------------------------------------------------------------------ */
export interface Publication {
  title: string;
  venue: string;
  year: string;
  type: string;
  authors: string;
  abstract: string;
  doi?: string;
  links: { pdf?: string; slides?: string; code?: string };
}
export const publications: Publication[] = [
  {
    title:
      "DRISHTI: An Edge-AI and IoT Multimodal Assistive Navigation System for the Visually Impaired",
    venue: "ICTIS 2026 — Int'l Conference on ICT for Intelligent Systems, Bangkok, Thailand",
    year: "2026",
    type: "Conference Paper",
    authors: "N. Shah, et al.",
    abstract:
      "DRISHTI is a Raspberry Pi 5-based wearable edge-AI and IoT system that fuses multimodal sensing — YOLOv8-nano vision, ultrasonic ranging, on-device face recognition, and image captioning — to deliver real-time, fully offline navigation assistance for visually-impaired users. The system reaches 98.42% detection precision at 25 ms latency and delivers guidance through multimodal voice and haptic feedback, eliminating cloud dependence.",
    // doi: "add-your-doi-here",
    links: { code: "https://github.com/iamnishaant/Meenakshi" },
  },
];

/* ------------------------------------------------------------------ */
/*  Education                                                         */
/* ------------------------------------------------------------------ */
export interface Education {
  degree: string;
  school: string;
  period: string;
  detail?: string;
}
export const education: Education[] = [
  {
    degree: "B.Tech in Computer Science Engineering (AI)",
    school: "Amrita Vishwa Vidyapeetham, Amritapuri",
    period: "2023 – Present",
    detail: "Specializing in Artificial Intelligence — ML, deep learning, computer vision, and full-stack AI systems.",
  },
  {
    degree: "Higher Secondary (+2), Computer Science",
    school: "Bal Kalyan Vidhya Mandir Secondary School",
    period: "2020 – 2022",
  },
];

/* ------------------------------------------------------------------ */
/*  Certifications                                                    */
/* ------------------------------------------------------------------ */
export interface Certification {
  title: string;
  issuer: string;
  date: string;
}
export const certifications: Certification[] = [
  { title: "Associate Data Analyst", issuer: "DataCamp", date: "Feb 2026" },
  { title: "Exploring AI: Use Cases & Applications", issuer: "AWS Academy", date: "Sep 2025" },
  { title: "AWS Academy Cloud Foundations", issuer: "Amazon Web Services", date: "Aug 2025" },
  { title: "Machine Learning A-Z: AI, Python & R", issuer: "Udemy", date: "May 2025" },
  { title: "AI/ML for Geodata Analysis", issuer: "IIRS, ISRO", date: "Sep 2024" },
];

/* ------------------------------------------------------------------ */
/*  Achievements                                                      */
/* ------------------------------------------------------------------ */
export interface Achievement {
  title: string;
  detail: string;
  kind: "award" | "scholarship" | "research" | "hackathon";
}
export const achievements: Achievement[] = [
  { title: "First Place — Hackathon", detail: "Winner of the hackathon organized by NitroStack and WeKan", kind: "hackathon" },
  { title: "Published at ICTIS 2026", detail: "DRISHTI presented at the ICTIS 2026 Conference, Bangkok, Thailand", kind: "research" },
  { title: "Data Fellowship 2025", detail: "Selected for data-driven research and civic-tech innovation", kind: "research" },
  { title: "Chancellor's Scholarship", detail: "Awarded by Amrita Vishwa Vidyapeetham", kind: "scholarship" },
  { title: "5 Professional Certifications", detail: "DataCamp, AWS Academy, Udemy, and IIRS/ISRO", kind: "award" },
];

/* ------------------------------------------------------------------ */
/*  GitHub dashboard                                                  */
/*  NOTE: the follower/star/contribution counts below are            */
/*  placeholders — wire them to the GitHub API or edit to taste.     */
/* ------------------------------------------------------------------ */
export const github = {
  username: "iamnishaant",
  url: "https://github.com/iamnishaant",
  followers: 30,
  totalStars: 40,
  repos: 20,
  contributionsThisYear: 820,
  languages: [
    { name: "Python", pct: 62, color: "#5b8cff" },
    { name: "TypeScript", pct: 18, color: "#55e6ff" },
    { name: "Java", pct: 12, color: "#8b7bff" },
    { name: "Other", pct: 8, color: "#6b6b78" },
  ],
  pinned: [
    { name: "LedgerMind", desc: "Agentic financial OS for small businesses.", lang: "Python", url: "https://github.com/iamnishaant/LedgerMind" },
    { name: "NeuroBank", desc: "AI-powered multi-agent banking assistant.", lang: "Python", url: "https://github.com/iamnishaant/NeuroBank" },
    { name: "Clarity-Stack", desc: "Local-first AI knowledge-management system.", lang: "Python", url: "https://github.com/iamnishaant/Clarity-Stack--A-Complete-System" },
    { name: "Meenakshi (DRISHTI)", desc: "Edge-AI assistive navigation for the visually impaired.", lang: "Python", url: "https://github.com/iamnishaant/Meenakshi" },
  ],
  currentWork: "Building LedgerMind — an agentic financial OS on FastAPI + LangGraph + Supabase.",
} as const;

/* Deterministic pseudo contribution grid (52 weeks x 7 days) */
export const contributionGrid: number[] = Array.from({ length: 371 }, (_, i) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  const r = x - Math.floor(x);
  return Math.floor(r * 5);
});
