import { allocateBudget } from "@/engine/allocate";
import { checkFeasibility } from "@/engine/feasibility";
import { getPreset } from "@/engine/presets";
import type { Intake, Plan, Quote } from "@/engine/schemas";
import { buildTimeline } from "@/engine/timeline";

function getSampleQuotes(): Quote[] {
  return [
    {
      id: "q-sample-1",
      categoryId: "venue",
      vendorName: "Gulmohar Heritage Palace",
      amount: 45000000,
      notes: "Courtyard, banquet hall, and bridal suite included.",
      addedOn: "2026-05-02",
    },
    {
      id: "q-sample-2",
      categoryId: "photography",
      vendorName: "Moments & Memories Studio",
      amount: 14000000,
      notes: "2 candid photographers, 1 drone operator, teaser reel.",
      addedOn: "2026-05-03",
    },
  ];
}

function getSampleIntake(): Intake {
  return {
    preset: "wedding",
    eventName: "Aarav & Diya's Wedding",
    eventDate: "2026-11-20",
    guests: 250,
    totalBudget: 180000000,
    cityTier: "tier-2",
    priorities: ["catering", "photography"],
    currency: "INR",
  };
}

export function createSamplePlan(): Plan {
  const intake = getSampleIntake();
  const today = "2026-05-01";
  const pData = getPreset(intake.preset);
  const locks = new Map<string, number>([["venue", 45000000]]);
  const allocRes = allocateBudget({
    totalMinor: intake.totalBudget,
    preset: intake.preset,
    guests: intake.guests,
    priorities: intake.priorities,
    locks,
  });
  const timeRes = buildTimeline({ eventDate: intake.eventDate, today, preset: intake.preset });
  const feas = checkFeasibility({ preset: intake.preset, totalMinor: intake.totalBudget, guests: intake.guests, cityTier: intake.cityTier });

  return {
    id: "sample-wedding-plan",
    version: 1,
    schemaVersion: 1,
    intake,
    allocations: allocRes.ok ? allocRes.allocations : [],
    tasks: timeRes.tasks,
    quotes: getSampleQuotes(),
    ideas: pData.fallbackIdeas,
    vendorGuide: { questions: pData.fallbackQuestions, redFlags: pData.fallbackRedFlags },
    feasibility: feas,
    createdAt: today,
    updatedAt: today,
    ai: "enriched",
  };
}
