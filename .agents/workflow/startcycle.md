## Workflow: Start Cycle
## Objective
Build Jashn for PromptWars Challenge 5 to submission quality in one pass.

## Steps
1. Confirm taste-skill is installed (npx skills add Leonxlnx/taste-skill --skill "design-taste-frontend"). If not, stop and ask the user to install it.
2. @write_specs
3. Pause and show the user the spec summary: engine function list, route list, and the criteria plan. Wait for approval.
4. @generate_code
5. @audit_code
6. @deploy_app
7. @score_gate
8. Write production_artifacts/Demo_Script.md: a provisional 2 to 3 minute video script following the beats in the plan (problem, sample plan, lock and rebalance with no AI call, date compression with risk flags, quote comparison, assistant action with Apply, .ics export, short engineering segment). Mark it provisional until the video requirements are confirmed.
9. @deploy_vercel
10. Final summary: coverage numbers, score gate results, repo size, the environment variable name to set in Vercel, and any open risks.