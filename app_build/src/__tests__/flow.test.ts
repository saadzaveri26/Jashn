import { allocateBudget } from "@/engine/allocate";
import { buildTimeline } from "@/engine/timeline";
import { checkFeasibility } from "@/engine/feasibility";
import { compareQuote } from "@/engine/compare";
import { applyAction } from "@/engine/actions";
import { exportBudgetCsv, exportQuotesCsv } from "@/lib/export-csv";
import { exportPlanIcs } from "@/lib/export-ics";
import { exportPlanJson, importPlanJson } from "@/lib/storage";
import { getPreset } from "@/engine/presets";
import type { Plan, PresetId } from "@/engine/schemas";

describe("End-to-End Flow (Offline & Fallback Mode)", () => {
  const presets: PresetId[] = ["wedding", "birthday", "community"];

  it.each(presets)("runs complete deterministic lifecycle for preset %s", (preset) => {
    const totalMinor = 12000000;
    const guests = 150;
    const today = "2026-05-01";
    const eventDate = "2026-11-15";
    const pData = getPreset(preset);

    const allocRes = allocateBudget({
      totalMinor,
      preset,
      guests,
      priorities: [pData.categories[0].id],
      locks: new Map(),
    });
    expect(allocRes.ok).toBe(true);
    if (!allocRes.ok) return;
    expect(allocRes.allocations.reduce((s, a) => s + a.amount, 0)).toBe(totalMinor);

    const timeRes = buildTimeline({ eventDate, today, preset });
    expect(timeRes.tasks.length).toBeGreaterThan(0);

    const feas = checkFeasibility({ preset, totalMinor, guests, cityTier: "tier-2" });
    expect(["comfortable", "tight", "unrealistic"]).toContain(feas);

    let plan: Plan = {
      id: `flow-${preset}`,
      version: 1,
      schemaVersion: 1,
      intake: {
        preset,
        eventName: `${preset.toUpperCase()} Test`,
        eventDate,
        guests,
        totalBudget: totalMinor,
        cityTier: "tier-2",
        priorities: [pData.categories[0].id],
        currency: "INR",
      },
      allocations: allocRes.allocations,
      tasks: timeRes.tasks,
      quotes: [],
      ideas: pData.fallbackIdeas,
      vendorGuide: { questions: pData.fallbackQuestions, redFlags: pData.fallbackRedFlags },
      feasibility: feas,
      createdAt: today,
      updatedAt: today,
      ai: "unavailable",
    };

    const firstCat = plan.allocations[0];
    const quoteRes = compareQuote({ quoteAmount: firstCat.amount, allocationAmount: firstCat.amount });
    expect(quoteRes.verdict).toBe("within");

    const actionRes = applyAction(
      plan,
      { type: "set_guest_count", guests: 200 },
      "2026-05-02"
    );
    expect(actionRes.ok).toBe(true);
    if (actionRes.ok) {
      plan = actionRes.plan;
      expect(plan.intake.guests).toBe(200);
      expect(plan.version).toBe(2);
    }

    const ics = exportPlanIcs(plan);
    expect(ics).toContain("BEGIN:VCALENDAR");

    const csv = exportBudgetCsv(plan);
    expect(csv).toContain("Category,Label");

    const json = exportPlanJson(plan);
    const imported = importPlanJson(json);
    expect(imported.ok).toBe(true);
  });
});

