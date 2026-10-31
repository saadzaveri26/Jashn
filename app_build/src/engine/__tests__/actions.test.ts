import { applyAction } from "../actions";
import { allocateBudget } from "../allocate";
import { buildTimeline } from "../timeline";
import type { Plan } from "../schemas";

function createTestPlan(): Plan {
  const allocRes = allocateBudget({
    totalMinor: 10000000,
    preset: "wedding",
    guests: 200,
    priorities: [],
    locks: new Map(),
  });
  const timeRes = buildTimeline({
    eventDate: "2026-12-01",
    today: "2026-06-01",
    preset: "wedding",
  });
  return {
    id: "plan-1",
    version: 1,
    schemaVersion: 1,
    intake: {
      preset: "wedding",
      eventName: "Aarav & Diya Wedding",
      eventDate: "2026-12-01",
      guests: 200,
      totalBudget: 10000000,
      cityTier: "tier-2",
      priorities: [],
      currency: "INR",
    },
    allocations: allocRes.ok ? allocRes.allocations : [],
    tasks: timeRes.tasks,
    quotes: [],
    ideas: [],
    vendorGuide: null,
    feasibility: "comfortable",
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
    ai: null,
  };
}

describe("applyAction", () => {
  it("applies valid adjust_category action", () => {
    const plan = createTestPlan();
    const res = applyAction(
      plan,
      {
        type: "adjust_category",
        categoryId: "venue",
        newAmount: 3000000,
      },
      "2026-06-02"
    );
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.plan.version).toBe(2);
    expect(res.plan.updatedAt).toBe("2026-06-02");
    const venue = res.plan.allocations.find((a) => a.categoryId === "venue");
    expect(venue?.amount).toBe(3000000);
    expect(venue?.locked).toBe(true);
  });

  it("rejects adjust_category with invalid parameters", () => {
    const plan = createTestPlan();
    const resNegative = applyAction(
      plan,
      { type: "adjust_category", categoryId: "venue", newAmount: -500 },
      "2026-06-02"
    );
    expect(resNegative.ok).toBe(false);

    const resUnknown = applyAction(
      plan,
      { type: "adjust_category", categoryId: "spaceship", newAmount: 5000 },
      "2026-06-02"
    );
    expect(resUnknown.ok).toBe(false);

    const resExcess = applyAction(
      plan,
      { type: "adjust_category", categoryId: "venue", newAmount: 999999999 },
      "2026-06-02"
    );
    expect(resExcess.ok).toBe(false);
  });

  it("applies valid add_task action", () => {
    const plan = createTestPlan();
    const countBefore = plan.tasks.length;
    const res = applyAction(
      plan,
      {
        type: "add_task",
        title: "Book Mehendi Artist",
        categoryId: "attire",
        leadDays: 30,
      },
      "2026-06-02"
    );
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.plan.version).toBe(2);
    expect(res.plan.tasks.length).toBe(countBefore + 1);
    const added = res.plan.tasks.find((t) => t.title === "Book Mehendi Artist");
    expect(added).toBeDefined();
    expect(added?.categoryId).toBe("attire");
    expect(added?.due).toBe("2026-11-01");
  });

  it("rejects add_task with empty title or out of range lead days", () => {
    const plan = createTestPlan();
    const resEmpty = applyAction(
      plan,
      { type: "add_task", title: "   ", categoryId: "attire", leadDays: 30 },
      "2026-06-02"
    );
    expect(resEmpty.ok).toBe(false);

    const resNegativeLead = applyAction(
      plan,
      { type: "add_task", title: "Test", categoryId: "attire", leadDays: -5 },
      "2026-06-02"
    );
    expect(resNegativeLead.ok).toBe(false);

    const resHugeLead = applyAction(
      plan,
      { type: "add_task", title: "Test", categoryId: "attire", leadDays: 999 },
      "2026-06-02"
    );
    expect(resHugeLead.ok).toBe(false);

    const resUnknownCat = applyAction(
      plan,
      { type: "add_task", title: "Test", categoryId: "unknown", leadDays: 10 },
      "2026-06-02"
    );
    expect(resUnknownCat.ok).toBe(false);
  });

  it("applies valid set_guest_count action", () => {
    const plan = createTestPlan();
    const res = applyAction(
      plan,
      {
        type: "set_guest_count",
        guests: 350,
      },
      "2026-06-02"
    );
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.plan.version).toBe(2);
    expect(res.plan.intake.guests).toBe(350);
  });

  it("rejects set_guest_count with out of range guests", () => {
    const plan = createTestPlan();
    const resZero = applyAction(
      plan,
      { type: "set_guest_count", guests: 0 },
      "2026-06-02"
    );
    expect(resZero.ok).toBe(false);

    const resHuge = applyAction(
      plan,
      { type: "set_guest_count", guests: 50000 },
      "2026-06-02"
    );
    expect(resHuge.ok).toBe(false);
  });

  it("handles adjust_category with other locked categories", () => {
    const plan = createTestPlan();
    plan.allocations[0].locked = true;
    const res = applyAction(
      plan,
      { type: "adjust_category", categoryId: "catering", newAmount: 1000000 },
      "2026-06-02"
    );
    expect(res.ok).toBe(true);
  });

  it("compresses add_task when lead time causes due date before today", () => {
    const plan = createTestPlan();
    const res = applyAction(
      plan,
      { type: "add_task", title: "Urgent Pandit", categoryId: "venue", leadDays: 200 },
      "2026-06-02"
    );
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    const added = res.plan.tasks.find((t) => t.title === "Urgent Pandit");
    expect(added?.atRisk).toBe(true);
    expect(added?.due).toBe("2026-06-02");
  });

  it("handles set_guest_count with locked categories and fails if locks exceed total", () => {
    const plan = createTestPlan();
    plan.allocations[0].locked = true;
    const resOk = applyAction(
      plan,
      { type: "set_guest_count", guests: 220 },
      "2026-06-02"
    );
    expect(resOk.ok).toBe(true);

    plan.allocations[0].amount = plan.intake.totalBudget + 5000;
    const resFail = applyAction(
      plan,
      { type: "set_guest_count", guests: 220 },
      "2026-06-02"
    );
    expect(resFail.ok).toBe(false);
  });
});

