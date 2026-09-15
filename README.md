# Nishant OS — AI Engineer Portfolio

An award-grade, "the website *is* the project" portfolio. Built to feel like a
premium AI product (OpenAI / Anthropic / Linear / Vercel), not a template.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first tokens in `globals.css`)
- **Motion** (Framer Motion) for animation · **Lenis** for smooth scroll
- **Canvas 2D** neural-network background & knowledge graph (no heavy 3D)
- **lucide-react** icons (+ custom brand marks)

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the build
```

## Feature map

| Feature | Where |
| --- | --- |
| AI boot sequence | `components/layout/BootLoader.tsx` |
| Hero + neural bg + mouse light | `components/sections/Hero.tsx`, `ui/NeuralBackground.tsx` |
| **AI recruiter assistant** | `components/assistant/Assistant.tsx` + `app/api/chat/route.ts` |
| Retrieval engine (RAG-lite) | `lib/retrieval.ts` |
| Terminal about | `components/sections/About.tsx` |
| Knowledge graph | `components/sections/Skills.tsx` |
| Project showcases | `components/sections/Projects.tsx` |
| Project case studies | `app/work/[slug]/page.tsx` |
| Animated architecture diagrams | `components/ui/ArchitectureDiagram.tsx` |
| Research / Publications / Achievements / Experience / GitHub | `components/sections/*` |
| Connect Protocol (contact) | `components/sections/Contact.tsx` |
| Command palette (⌘K) + global search | `components/layout/CommandPalette.tsx` |
| Recruiter mode | `components/providers/AppState.tsx` + `data-recruiter-hide` in `app/page.tsx` |
| Custom cursor / magnetic buttons / live clock | `components/ui/*`, `components/layout/LiveClock.tsx` |

## Make it yours

**1. Content.** Everything lives in one file: [`src/lib/data.ts`](src/lib/data.ts).
Edit `profile`, `projects`, `research`, `publications`, `experience`,
`achievements`, `skills`, and `github`. The whole site *and* the AI assistant
read from here.

**2. Résumé.** Replace `public/resume.pdf` with your real résumé.

**3. Social links.** In `data.ts` → `profile.socials`.

**4. Connect the assistant to a real LLM.** The endpoint
`app/api/chat/route.ts` already retrieves grounded context via
`retrieve(query)`. Uncomment the LLM hook and pass the context + question to
your model (e.g. Claude via the Anthropic SDK). The client already expects the
`{ answer, citations, suggestions }` shape, so no UI changes are needed.

**5. Contact form.** Messages are sent from your Gmail account by
`app/api/contact/route.ts`. Copy `.env.example` to `.env.local` and add a
Google App Password (`GMAIL_APP_PASSWORD`) to make it live.

## Keyboard shortcuts

- `⌘K` / `Ctrl K` — command palette
- `⌘J` / `Ctrl J` — toggle AI assistant
- `Esc` — close overlays

## Accessibility & performance

- Respects `prefers-reduced-motion` everywhere (boot, cursor, canvas, reveals).
- Custom cursor only hides the native cursor on fine-pointer, motion-OK devices.
- Semantic landmarks, focus-visible rings, keyboard-navigable palette & assistant.
- Static generation for all pages; canvas pauses when offscreen.
