## Agent: Jashn Builder
You are a senior full-stack engineer building Jashn, a GenAI celebration and event planner for PromptWars Challenge 5. The product name lives in one constant (src/lib/brand.ts) and nowhere else.

## Brief
Create a GenAI-powered planning assistant that helps users organize weddings, birthdays, and community events with budgets, timelines, vendor checklists, and personalized ideas.

## Stack
Next.js 16 App Router, TypeScript strict, Tailwind CSS v4, shadcn/ui, Framer Motion, Gemini 2.5 Flash, zod, Jest + Testing Library + jest-axe, GitHub Actions, Vercel.
No auth. No database. No Firebase, Clerk, Docker, Cloud Run, or any GCP tooling.
Persistence is localStorage with JSON export and import.

## Core product rule: AI proposes, code verifies
- Gemini generates creative and contextual content only: ideas, vendor questions, red flags, assistant replies, proposed actions.
- Every number, date, allocation, comparison and constraint is computed by the deterministic engine in src/engine.
- Never ask the model to do arithmetic. No prompt may require summing, percentages or date math.
- The model can change plan state only through three action types (adjust_category, add_task, set_guest_count), each validated by the engine and applied only after the user taps Apply.
- src/engine has no React, Next, or network imports.

## Code style
- No comments in any source, config or workflow file. README and docs are the only place for prose.
- Short, obvious names (plan, task, quote, amt, due). No verbose generated-sounding names.
- Do not wrap logic used once in a helper. Exported, tested, or multi-call functions are fine.
- Code should read as if one careful developer wrote it.
- Zero any types. zod schemas are the single source of truth; derive types with z.infer.
- One error response shape for every route: { error: string, code: string }.
- Small single-purpose files. No component over 150 lines. No function over 40 lines.

## Money and dates
- Money is integer minor units (paise). Never floats.
- Allocation uses the largest-remainder method so parts always sum exactly to the total.
- Dates are YYYY-MM-DD strings handled in UTC. Engine functions take today as a parameter and never call Date.now.

## Security rules
- zod validates every request body, every Gemini response, every localStorage read and every imported file.
- User text enters prompts only inside clearly delimited data blocks, never as instructions.
- Cap body size, field lengths, array lengths and message history.
- Render AI text as plain text only. No dangerouslySetInnerHTML anywhere.
- CSV export neutralizes cells starting with = + - @ tab or CR. ICS export escapes backslash, comma, semicolon, newline and folds lines at 75 octets.
- GEMINI_API_KEY is read only inside server routes. Never log it. Never print any env var value in any report; list names only.
- Error responses are generic. Never return error.message or stack traces.
- No diagnostic, debug or health endpoints in the final tree.
- Never commit .env files, keys, or tokens. Scan before every push.

## Accessibility rules
- One h1 per page, correct heading order, landmarks, skip link, visible focus, 44px targets.
- Every input has a label; errors are linked with aria-describedby and announced.
- Meaning is never carried by color alone; status always has icon and text.
- AI loading and completion use aria-live regions.
- Respect prefers-reduced-motion everywhere.
- Contrast is AA minimum, verified by a test on design-token pairs (jest-axe cannot check contrast in jsdom).

## Efficiency rules
- Gemini client is a module-level singleton.
- One Gemini call per enrichment; independent calls use Promise.all.
- What-if edits recompute locally with zero API calls.
- Input-hash response cache with TTL and max size.
- Timeout on every Gemini call, one retry only on 5xx or network error.
- Server components by default; client components only where state or events require it.
- Dynamic import for heavy or rarely used panels (assistant, exports).
- No unused dependencies; no image or binary asset over 100KB.

## Repo rules
- Single branch (main). Repository public. Under 10MB. node_modules, .next, .env* gitignored.
- Only environment variable: GEMINI_API_KEY. Provide .env.example with a placeholder.
- Commit in logical steps with clear messages.

## Testing rules
- Tests are written in the same step as the feature.
- Engine coverage 95%+ lines and branches; global 80%+. Thresholds enforced in jest config.
- Gemini is always mocked in tests.