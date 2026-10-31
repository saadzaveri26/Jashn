# Jashn — GenAI Celebration & Event Planner

> PromptWars Challenge 5 · Submission Quality Build

Jashn is a GenAI-powered planning assistant designed for first-time hosts organizing celebrations (weddings, birthdays, and community gatherings) on a fixed budget.

## Core Architecture: AI Proposes, Code Verifies

Jashn enforces a strict architectural boundary between creative AI and financial/calendar code:
- **Deterministic Engine (`src/engine/`)**: Computes every single budget number, date calculation, category allocation, and feasibility comparison. All money is stored as integer minor units (paise). Allocations use the largest-remainder method so category allocations always sum exactly to the total. The engine is pure TypeScript with zero imports from React, Next.js, or the network, and never calls `Date.now()` or `Math.random()`.
- **Generative AI (`src/ai/`)**: Powered by Gemini 2.5 Flash via a module-level singleton client. Gemini generates contextual ideas, vendor questions, red flags, and assistant replies. The model is never asked to do arithmetic or date math.
- **Controlled State Mutation**: The AI can only propose changes through three engine-validated action types (`adjust_category`, `add_task`, `set_guest_count`). State is updated only when the host explicitly clicks **Apply**.
- **Local-First & Private**: No accounts, no database, no GCP tooling. Persistence is stored in `localStorage` with Zod schema validation and graceful corruption recovery. Export to CSV, .ics calendar, and JSON backup are fully supported.
- **Offline / Fallback Mode**: If `GEMINI_API_KEY` is unset or an API call fails, verified preset fallbacks activate seamlessly. All deterministic planning tools remain 100% operational.

---

## Celebration Theme & Visual Identity

Jashn is styled as an authentic Indian celebration, moving away from generic SaaS styling and dark fintech surfaces:
- **Warm Cream Paper & Evening Celebration**: Default surface is a warm cream handmade paper (`#faf7f2`), with an evening celebration dark variant in deep royal plum (`#160d1f`) accented with warm gold (`#f5b738`). Respects `prefers-color-scheme` on first visit and persists user preference via a header theme toggle with `aria-pressed`.
- **Event-Specific Themes**: Dynamic `data-theme` on the plan root sets CSS variables for each event preset:
  - *Wedding*: Rose (`#9d174d`), Gold (`#b48310`), and Vermilion (`#b91c1c`)
  - *Birthday*: Coral (`#c2410c`), Turquoise (`#0f766e`), and Sunny Yellow (`#d97706`)
  - *Community*: Saffron (`#d97706`), Peacock Teal (`#0f766e`), and Leaf Green (`#15803d`)
- **Typography Payload under 60 KB**: Loaded via `next/font/local` with latin subsets (Rozha One display serif at 18.1 KB and Plus Jakarta Sans UI sans at 27.3 KB, total 45.4 KB).
- **Cultural Motifs**: 100% inline SVG vector components in `src/components/motifs/` (Torana bunting, Marigold garland line, Jaali lattice border, Paisley corner, Diya flame, and Rangoli ring). All motifs are decorative (`aria-hidden="true"`, `pointer-events-none`).

---

## Celebration Motion & Accessibility

- **Motion System (`src/lib/motion.ts`)**: Centralized motion constants for durations and cubic bezier easings (`easeOut`, `easeExpo`, `easeInOut`). All animations transform and opacity only.
- **Micro-interactions**: Torana flags sway gently in ambient breeze, wizard step diyas light up on completion, timeline garlands pulse at-risk items with text + icon indicators, and balanced budget allocations show a celebratory stamp.
- **Celebration Burst**: Dynamic confetti burst (at most 40 lightweight marigold petals and festive paper particles, ~1.2s duration) loaded via dynamic import. Fires only on sample plan load (`?burst=sample`), when all plan tasks become completed, and when an AI assistant action is applied.
- **WCAG Pause Control**: A persistent header "Pause animations" button (`aria-pressed`) pauses all ambient motion (bunting sway, drifting petals, diya flicker).
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` by defaulting pause mode to true and disabling particle bursts entirely while preserving clear static visual motifs.

---

## Design and Accessibility Choices

1. **Color Contrast Integrity**: Every semantic token pair (foreground/background, muted foreground, card surfaces, and accents) in both light cream and dark plum themes, as well as across all three event presets, strictly passes WCAG AA contrast (ratios ranging from 5.1:1 to 17.7:1), validated by automated programmatic tests.
2. **Dual-Channel Status Indicators**: At-risk timeline milestones, budget feasibility warnings, and quote alerts always pair meaningful color with distinct SVG icons and explicit text badges, satisfying WCAG 1.4.1 (use of color).
3. **No Flashing or Layout Shifts**: All animations run under 3 flashes per second, animate transform/opacity only, and avoid triggering layout recalculations.

---

## Traceability Table

| Brief Phrase | Feature | Route(s) | Engine Function(s) | Test File(s) |
|---|---|---|---|---|
| **GenAI-powered planning assistant** | Assistant chat with proposed actions | `/plan/assistant`, `POST /api/assistant` | `applyAction` | `assistant-chat.test.tsx`, `route.test.ts` (assistant), `actions.test.ts` |
| **weddings** | Wedding preset (weights, lead times, fallbacks) | `/new`, `/plan/*` | All engine functions with `preset: "wedding"` | `allocate.test.ts`, `feasibility.test.ts`, `timeline.test.ts` |
| **birthdays** | Birthday preset (weights, lead times, fallbacks) | `/new`, `/plan/*` | All engine functions with `preset: "birthday"` | `allocate.test.ts`, `feasibility.test.ts`, `timeline.test.ts` |
| **community events** | Community preset (weights, lead times, fallbacks) | `/new`, `/plan/*` | All engine functions with `preset: "community"` | `allocate.test.ts`, `feasibility.test.ts`, `timeline.test.ts` |
| **budgets** | Allocation, live what-if rebalancing, feasibility | `/plan/budget` | `allocateBudget`, `checkFeasibility` | `allocate.test.ts`, `feasibility.test.ts`, `budget-table.test.tsx` |
| **timelines** | Backward scheduling, date compression, risk flags | `/plan/timeline` | `buildTimeline` | `timeline.test.ts`, `task-list.test.tsx` |
| **vendor checklists** | Per-category vendor questions and red flags | `/plan/vendors`, `POST /api/enrich` | Data from AI / preset fallback | `route.test.ts` (enrich), `flow.test.ts` |
| **personalized ideas** | Creative ideas tagged with cost bands and fit | `/plan/ideas`, `POST /api/enrich` | `ideaFits` | `idea-fit.test.ts`, `route.test.ts` (enrich) |
| **helps users organize** | Full lifecycle: intake → plan → adjust → compare → export (.ics, CSV, JSON) | `/new` → `/plan/*` | Full engine suite | `flow.test.ts` |

---

## Key Assumptions

1. **Heuristic Benchmarks**: Preset category weights and per-guest city tier floors (Tier 1, Tier 2, Tier 3) are heuristic baseline assumptions tuned for celebrations in India, not surveyed vendor quotes.
2. **Local Persistence**: Plans persist on a per-browser basis using `localStorage`. Exporting to JSON allows migrating plans across devices.
3. **Instance-Level Cache and Rate Limits**: The SHA-256 response cache (TTL 5 min, LRU 100) and sliding window rate limiter (10 requests/min per IP) run in server memory per serverless instance.
4. **Content Security Policy**: Inline scripts are permitted for Next.js hydration while object-src, base-uri, and frame-ancestors are strictly restricted.

---

## Evaluation Criteria Implementation

- **Code Quality**: Strict TypeScript without `any` types; all types derived from Zod schemas; zero comments in source/config files; no function over 40 lines; no component over 150 lines; single error shape `{ error, code }`.
- **Security**: 16 KB body size cap; Zod validation on every request, Gemini response, and imported file; prompt injection isolation via `<USER_DATA>` delimiters; CSV formula injection neutralization; ICS escaping and 75-octet folding; server-only `GEMINI_API_KEY`.
- **Efficiency**: Singleton Gemini client; SHA-256 input-hash cache; what-if edits recompute locally with zero network calls; dynamic imports for assistant and export dialogs; zero raster images; bundle size optimized.
- **Testing**: Engine coverage >= 95% lines and branches; global coverage >= 80%; exhaustive test matrix including quote boundaries (94.9%, 95%, 105%, 105.1%), malicious actions, rate limits, model timeouts, and injection strings.
- **Accessibility**: Single `h1` per page; correct heading hierarchy; visible 2px focus rings; 44px minimum touch targets; status conveyed by icon + text (never color alone); `aria-live` announcements for AI states; WCAG AA contrast on design tokens; `prefers-reduced-motion` honored throughout.
- **Problem Statement Alignment**: Full support for weddings, birthdays, and community gatherings; verified sample plan available in one click; full offline fallback functionality when `GEMINI_API_KEY` is unset.

---

## How to Run & Test Locally

```bash
# Navigate to application directory
cd app_build

# Install dependencies
npm ci

# Run test suite with coverage thresholds
npm test

# Run TypeScript typecheck
npm run typecheck

# Run ESLint
npm run lint

# Run development server
npm run dev

# Run production build
npm run build
```
