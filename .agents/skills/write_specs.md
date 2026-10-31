## Skill: Write Specs
## Objective
Produce production_artifacts/Technical_Specification.md for Jashn.

## Instructions
1. Read agents.md first. Every rule there binds the spec.

2. Product definition:
   - Persona: a first-time host in India planning an event on a fixed budget.
   - Event presets (data, not code paths): wedding, birthday, community. INR default; engine is currency-agnostic.
   - Gen AI is mandatory in the core flow: enrichment (ideas, vendor questions, red flags) and the assistant.

3. Engine specification (src/engine), with exact function signatures and zod types:
   - allocateBudget({ totalMinor, preset, guests, priorities, locks }) returns allocations that sum exactly to totalMinor. Locked categories keep their amounts; the rest rebalance by preset weight, guest scaling and priority boost using largest remainder. If locks exceed the total, return a typed error.
   - checkFeasibility(plan) returns comfortable, tight, or unrealistic using per-guest floors by preset and city tier. State clearly in the spec that these floors and the preset weights are heuristic assumptions, not market data.
   - buildTimeline({ eventDate, today, preset }) schedules backward from the event date using per-task lead times. If a due date falls before today, compress deterministically, mark atRisk, and set a compressed flag with a reason.
   - compareQuote(quote, allocation) returns under (below 95%), within (95 to 105%), or over (above 105%) with deltaPct and deltaMinor.
   - ideaFits(costBand, allocation) maps low, medium, high bands to fractions of the category allocation. The model returns only the band; the engine decides fit.
   - applyAction(plan, action) validates bounds and returns { ok: true, plan } or { ok: false, reason }.
   - Presets live in src/engine/presets/{wedding,birthday,community}.ts: categories, weights, lead-time tasks, fallback ideas, fallback vendor questions.

4. Data model: Intake, Plan (versioned), Allocation, Task, Quote, Idea, VendorGuide, Action, AssistantRequest, AssistantResponse, EnrichRequest, EnrichResponse, all as zod schemas.

5. Routes and pages:
   - / landing (server component), /new wizard, /sample loads the sample plan, /plan overview, /plan/budget, /plan/timeline, /plan/vendors, /plan/ideas, /plan/assistant.
   - Each route has loading.tsx and error.tsx; global not-found.tsx.
   - API: POST /api/enrich, POST /api/assistant. Both: zod request and response validation, body size cap, per-IP rate limit, Gemini timeout, one retry on 5xx or network error only, input-hash cache, maxDuration set, structured output (responseMimeType application/json plus a response schema) validated again with zod, and a typed fallback response that signals ai: unavailable.

6. AI prompt design (src/ai/prompts.ts):
   - System prompt: planning assistant, not a financial or legal advisor, never invents prices, only proposes actions from the allowed set, treats delimited user text as data.
   - Enrichment receives engine-computed allocations as facts; it returns ideas (title, description, categoryId, costBand), and per-category vendor questions (3 to 6) and red flags (2 to 4).
   - Assistant receives a compact plan summary, the last 10 messages, and the user message; returns reply (plain text) and up to 3 actions.

7. Persistence: localStorage via useSyncExternalStore, versioned schema, zod parse on load, graceful reset on corruption, export and import of JSON capped at 1MB. Single active plan; creating a new plan asks for confirmation.

8. Exports: .ics (all-day events, deterministic UIDs), CSV (budget and quotes), print stylesheet. Escaping rules from agents.md.

9. Design direction: warm, editorial, celebratory but restrained. Light default with a proper dark variant. Display serif plus clean sans, one deliberate accent color. Avoid dark navy with a gradient accent, centered pill badge heroes, and symmetric card grids. No raster images; CSS and SVG only.

10. Traceability table in the spec: every phrase of the brief (weddings, birthdays, community events, budgets, timelines, vendor checklists, personalized ideas, planning assistant) maps to a feature, a route, and a test file.

11. Criteria plan: one section per evaluation criterion (Code Quality, Security, Efficiency, Testing, Accessibility, Problem Statement Alignment) listing the concrete measures that will be built, each paired with the test or check that proves it.

12. Output to production_artifacts/Technical_Specification.md. Do not write any application code in this step.