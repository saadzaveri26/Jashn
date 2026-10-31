# Jashn — Video Demonstration Script (Provisional)

> **Status:** Provisional (awaiting final video format and recording confirmation)  
> **Target Duration:** 2 minutes 30 seconds to 3 minutes  
> **Presenter:** Solo screen recording with voiceover  

---

## Video Beats & Visual Storyboard

### Beat 1: The Problem (0:00 – 0:25)
- **Visual:** Clean landing page of Jashn at `/`. Hero headline visible: *"Plan celebrations that feel like magic, on a budget that stays real."*
- **Voiceover:**
  > "Organizing a wedding, milestone birthday, or community celebration is stressful. First-time hosts are handed complex spreadsheets or hallucinating AI chatbots that invent numbers, miss local customs, and fail basic arithmetic.
  >
  > Meet **Jashn** — a GenAI celebration planner built on one strict principle: **AI proposes, code verifies**. Gemini handles creative inspiration, while our deterministic engine does the math with zero errors."

---

### Beat 2: One-Click Sample Plan (0:25 – 0:45)
- **Visual:** Click **"Explore Sample Wedding"** button on the homepage, immediately navigating to `/sample` and redirecting to `/plan`.
- **Voiceover:**
  > "With a single click, we load a complete celebration plan — Rohit & Priya's Wedding in Jaipur with 200 guests and a ₹15 lakh budget.
  >
  > Notice the top-level feasibility badge: our engine analyzed per-guest budget floors for Tier-2 cities and rated this plan 'Realistic'. Everything here — from allocations to checklists — is ready to explore."

---

### Beat 3: Lock & Rebalance with Zero Network Calls (0:45 – 1:10)
- **Visual:** Navigate to **Budget** tab (`/plan/budget`). Click the lock icon on the **Venue** category (₹3,75,000). Slide the total budget up or adjust another slider. Show the browser DevTools Network tab — completely idle.
- **Voiceover:**
  > "Let's lock the Venue category at ₹3,75,000 because our deposit is already paid. 
  >
  > Now, when we adjust the budget slider, our deterministic engine rebalances every remaining category in real time using the largest-remainder method. Not a single paisa is lost to rounding, and not a single network request is made. The what-if calculations run entirely in browser memory."

---

### Beat 4: Timeline Scheduling & Risk Flags (1:10 – 1:30)
- **Visual:** Navigate to **Timeline** tab (`/plan/timeline`). Show the backward-scheduled milestones. Click the date editor and pull the event date closer to today.
- **Voiceover:**
  > "Our timeline engine works backward from the event date based on vendor lead times. 
  >
  > If we bring the celebration date closer, the engine instantly recalculates all deadlines and flags at-risk tasks with red alert badges and clear warning icons — never relying on color alone, fully accessible for screen readers."

---

### Beat 5: Vendor Quote Comparison (1:30 – 1:50)
- **Visual:** Navigate to **Vendors** tab (`/plan/vendors`). Open the quote comparison card for 'Decorator'. Enter a quote of ₹2,60,000 against the ₹2,25,000 allocation.
- **Voiceover:**
  > "When comparing vendor estimates, Jashn takes the guesswork out of negotiations. Entering this florist quote shows an immediate 'Over budget' badge (+₹35,000). 
  >
  > Right below, Jashn provides AI-curated vendor negotiation questions and red flags to watch for during contract reviews."

---

### Beat 6: Planning Assistant & Human-in-the-Loop Apply (1:50 – 2:15)
- **Visual:** Navigate to **Assistant** tab (`/plan/assistant`). Type: *"Can we increase photography by 25000 by taking from decor?"* Send. Gemini responds with conversational context and an action card proposing `adjust_category`.
- **Voiceover:**
  > "Need adjustments? Ask our assistant. Unlike conventional bots that blindly overwrite data, Gemini proposes a structured action card with a before-and-after diff.
  >
  > The application state is never touched until the host reviews the change and clicks **Apply**. When applied, our deterministic engine validates the boundaries and updates the plan."

---

### Beat 7: Portable Export & Privacy (2:15 – 2:35)
- **Visual:** Click **Export** menu in the top navigation bar. Show options: Download .ics Calendar, Download CSV, Backup JSON. Click **Download .ics Calendar** and open the file.
- **Voiceover:**
  > "Your celebration stays yours. No accounts, no database, no trackers. State is stored locally with Zod schema verification.
  >
  > In one click, export every deadline directly into Apple or Google Calendar via our RFC-compliant 75-octet folded `.ics` export, or download formula-sanitized spreadsheets for family accounting."

---

### Beat 8: Engineering Excellence & Close (2:35 – 2:55)
- **Visual:** Fast cut to terminal showing `npm test` passing with 100% engine coverage, `npm run typecheck`, and production build summary.
- **Voiceover:**
  > "Under the hood: Next.js 16 App Router, Tailwind CSS v4, zero `any` types, zero source comments, WCAG 2.1 AA accessibility on every page, and 100% engine unit test coverage. If Gemini is unavailable, verified preset templates keep the app 100% operational in offline fallback mode.
  >
  > Jashn brings serenity to celebrations through deterministic software engineering and thoughtful AI."

---

## Recording Checklist
- [ ] Screen resolution set to 1920x1080 (16:9)
- [ ] Browser zoom at 100% with light mode or dark mode consistent
- [ ] DevTools network tab visible during Beat 3 to prove 0 API calls
- [ ] Microphone level tested with clear voiceover audio

