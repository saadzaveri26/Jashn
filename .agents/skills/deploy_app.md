## Skill: Deploy App
## Objective
Run Jashn locally and prove the full flow works, with and without Gemini.

## Instructions
1. cd app_build && npm ci
2. Create .env.local from .env.example and ask the user for GEMINI_API_KEY if missing. Never echo it.
3. Run lint, typecheck, test with coverage, and build. All must pass with zero warnings.
4. npm run dev and verify:
   - / loads; /sample loads the sample plan in one click
   - /new wizard completes for each of the three presets
   - Locking a budget category rebalances the rest with no network request (confirm in the network panel)
   - Moving the event date close shows at-risk tasks with text and icon
   - A vendor quote shows under, within, or over with text and icon
   - Ideas show an engine-computed fit label
   - Assistant proposes an action; Apply updates the plan; an out-of-bounds action is rejected with a clear message
   - .ics, CSV and print view all work
   - Reload preserves the plan; corrupt localStorage resets gracefully
   - With GEMINI_API_KEY unset, the whole flow still works in fallback mode
5. Keyboard-only run through the wizard and one panel; confirm focus order and visible focus.
6. Report results as a checklist with pass or fail per item. Do not print env var values.