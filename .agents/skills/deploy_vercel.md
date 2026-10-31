## Skill: Deploy to Vercel
## Objective
Prepare the repo for a manual Vercel deploy and push it.

## Instructions
1. Confirm score_gate_report.md shows every item passing. If not, stop and report.
2. Confirm package.json has build: next build and that app_build is the Next.js root (or that the repo root is, and tell the user which root directory to set in Vercel).
3. Confirm no Docker, Firebase, Clerk or GCP files or dependencies exist.
4. The only required environment variable is GEMINI_API_KEY. List the name only, never the value.
5. Confirm .env.local is gitignored and not in history.
6. Commit with a clear message and push to main. Confirm only one branch exists locally and on the remote. Report the repo size.
7. Do not deploy via CLI. The user connects the repo to Vercel in the dashboard, sets GEMINI_API_KEY for Production, and redeploys.
8. Remind the user to confirm the deployment shows Ready on the latest commit before submitting, then open the live URL once with the key set and once-through the sample plan.