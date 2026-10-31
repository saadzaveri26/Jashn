## Skill: Audit Code
## Objective
Verify and fix. This is a check pass, not a first pass.

## Instructions
1. Style: grep every source, config and workflow file for comments and remove them. Grep for any, as any, and @ts-ignore. Grep for functions called exactly once that only wrap one-off logic and inline them. Find components over 150 lines and functions over 40 lines and split them.

2. Engine purity: confirm src/engine imports nothing from react, next, or the network. Confirm no Date.now or Math.random inside the engine. Confirm money is integers everywhere.

3. AI boundary: grep prompts for any instruction requiring arithmetic. Confirm all model output passes through zod and the engine before touching state. Confirm only three action types exist.

4. Security: confirm zod on every route, body size caps, rate limiting, generic errors, no dangerouslySetInnerHTML, escaping in exporters, GEMINI_API_KEY used only in server code and never logged. Run npm audit and fix or document anything high or critical. Grep the full tree and git history for key patterns (AIza, AQ., BEGIN PRIVATE KEY, secret, token) and confirm nothing is committed. Confirm no diagnostic or health route exists.

5. Efficiency: confirm the Gemini client is a singleton, enrichment is one call, what-if edits make no API calls, cache has TTL and max size, dynamic imports are in place, there are no unused dependencies (check with depcheck or equivalent), and no asset over 100KB.

6. Accessibility: one h1 per page, heading order, landmarks, skip link, labels and aria-describedby on errors, focus management in the wizard, live regions, reduced-motion handling, 44px targets, and no meaning conveyed by color alone.

7. Run lint, typecheck, test with coverage, and build. Fix everything. Report coverage numbers for the engine and globally.

8. Write production_artifacts/audit_report.md listing each check, the result, and each fix. Never print env var values.