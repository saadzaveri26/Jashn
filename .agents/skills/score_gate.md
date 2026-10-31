## Skill: Score Gate
## Objective
Block submission until every evaluation criterion has concrete evidence. The target is the highest score on the first attempt.

## Instructions
For each criterion, produce evidence from the actual repo, not from memory. If any item fails, fix it and re-run the gate. Do not proceed to deploy_vercel until every item passes.

1. Code Quality: lint and typecheck clean; zero any; no comments; no function over 40 lines; no component over 150 lines; engine isolated from UI; one error shape across routes; clear commit history; README accurate against the code.
2. Security: security checklist from audit_code passes; secret scan of tree and history is clean; npm audit has no high or critical; injection and malicious-action tests exist and pass; CSP and headers present.
3. Efficiency: singleton client; one call per enrichment; local what-if recompute; cache with limits; timeouts and retry policy; dynamic imports; bundle build output reviewed and no oversized client chunk without reason.
4. Testing: coverage thresholds enforced and met; every engine edge case present; route tests cover valid, invalid, oversized, rate-limited, malformed model output, timeout, injection; component and axe tests for every page; CI file runs all of it.
5. Accessibility: axe passes on every page; token contrast test passes; keyboard-only flow verified; live regions present; reduced motion honored; no color-only meaning.
6. Problem Statement Alignment: README traceability table covers weddings, birthdays, community events, budgets, timelines, vendor checklists, personalized ideas, planning assistant; each row names a route and a test; Gen AI is in the core flow; sample plan demonstrates all of it; the app works in fallback mode.
7. Rules compliance: single branch main, repository public, size under 10MB (report the number), .env* ignored, README includes vertical, approach and logic, how it works, and assumptions.
8. Output production_artifacts/score_gate_report.md with each criterion, the evidence, and pass or fail. Never print env var values.