## Skill: Generate Code
## Objective
Build Jashn per the spec, with every criterion built in from the first commit.

## Instructions
1. Read agents.md and production_artifacts/Technical_Specification.md. Confirm the taste-skill (design-taste-frontend) is installed and apply it to every page and component with the design direction from the spec.

2. Scaffold in app_build/: Next.js 16, TypeScript strict, Tailwind v4, shadcn/ui, ESLint, Jest with next/jest, Testing Library, jest-axe, zod, framer-motion. Add scripts: dev, build, lint, typecheck, test (jest --coverage). Add .gitignore and .env.example (GEMINI_API_KEY placeholder only). Set coverageThreshold in jest config (engine 95, global 80).

3. Build in this order, committing after each step with tests passing:
   a. src/lib/brand.ts and src/engine/* (all functions, all three presets) with exhaustive tests: budget always sums to total, locks respected, locks exceeding total rejected, zero guests, one guest, huge guests, lead-time compression, event date today and in the past, quote threshold boundaries, action bounds, band-to-fit mapping.
   b. src/ai/schemas.ts, prompts.ts, gemini.ts (singleton, timeout, single retry policy, structured output) with tests using a mocked client.
   c. src/lib/storage.ts (useSyncExternalStore, versioning, corruption reset, import and export), rateLimit.ts, cache.ts (hash, TTL, max size), exporters (ics, csv) with tests for escaping, folding and formula neutralization.
   d. API routes /api/enrich and /api/assistant with tests: valid input, invalid input, oversized body, rate limit exceeded, malformed model JSON, model timeout, 429 from Gemini, an injection string in user text, a mocked malicious action that the engine rejects.
   e. UI: wizard with step focus management, budget panel (lock, sliders paired with number inputs, live rebalance), timeline panel with at-risk flags, vendors panel with quote tracker, ideas panel with engine-computed fit, assistant panel with proposed-action cards (Apply and Dismiss), sample plan loader, export menu, print view. Assistant and export panels use dynamic import.
   f. Fallback mode: when ai is unavailable the app uses preset fallbacks and shows a polite status message in an aria-live region. The full flow must work with GEMINI_API_KEY unset.

4. Component tests for the wizard, budget lock rebalance, timeline risk flag, quote status (text and icon, not color alone), assistant action Apply, and fallback mode. Add jest-axe checks for every page. Add a token contrast test asserting AA ratios for every foreground and background pair in the design tokens.

5. next.config.ts: security headers (CSP with object-src none, base-uri self, form-action self, frame-ancestors none, connect-src self; Referrer-Policy; X-Content-Type-Options; Permissions-Policy). Use nonce-based script CSP if it works without breaking the build; otherwise allow inline scripts and note the trade-off in the README.

6. .github/workflows/ci.yml on push to main: npm ci, lint, typecheck, test with coverage, build. No comments in the file.

7. README.md with: chosen vertical, approach and logic, how it works, assumptions (including that preset weights and per-guest floors are heuristics, plans are per-browser, rate limiting and cache are per serverless instance), the traceability table from the spec, how to run, how to test, and what each criterion measure is.

8. Never add comments to code. Short names. No single-use helpers. Zero any.