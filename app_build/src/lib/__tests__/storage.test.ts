import {
  exportPlanJson,
  getStoredPlan,
  importPlanJson,
  setStoredPlan,
  subscribePlan,
} from "../storage";
import type { Plan } from "../../engine/schemas";

function createValidPlan(): Plan {
  return {
    id: "p-test",
    version: 1,
    schemaVersion: 1,
    intake: {
      preset: "birthday",
      eventName: "Rohan Birthday",
      eventDate: "2026-10-15",
      guests: 40,
      totalBudget: 4000000,
      cityTier: "tier-2",
      priorities: [],
      currency: "INR",
    },
    allocations: [],
    tasks: [],
    quotes: [],
    ideas: [],
    vendorGuide: null,
    feasibility: "comfortable",
    createdAt: "2026-06-01",
    updatedAt: "2026-06-01",
    ai: null,
  };
}

describe("storage layer", () => {
  beforeEach(() => {
    window.localStorage.clear();
    setStoredPlan(null);
  });

  it("returns null when no plan is stored", () => {
    expect(getStoredPlan()).toBeNull();
  });

  it("stores and retrieves a valid plan", () => {
    const plan = createValidPlan();
    setStoredPlan(plan);
    const retrieved = getStoredPlan();
    expect(retrieved).toEqual(plan);
  });

  it("notifies subscribers when plan updates", () => {
    const cb = jest.fn();
    const unsub = subscribePlan(cb);
    setStoredPlan(createValidPlan());
    expect(cb).toHaveBeenCalled();
    unsub();
  });

  it("gracefully resets on corrupted JSON in localStorage", () => {
    window.localStorage.setItem("jashn_plan", "{ corrupted json");
    expect(getStoredPlan()).toBeNull();
    expect(window.localStorage.getItem("jashn_plan")).toBeNull();
  });

  it("gracefully resets on schema mismatch in localStorage", () => {
    window.localStorage.setItem("jashn_plan", JSON.stringify({ bad: "data" }));
    expect(getStoredPlan()).toBeNull();
    expect(window.localStorage.getItem("jashn_plan")).toBeNull();
  });

  it("exports and imports valid JSON", () => {
    const plan = createValidPlan();
    const json = exportPlanJson(plan);
    const imported = importPlanJson(json);
    expect(imported.ok).toBe(true);
    if (!imported.ok) return;
    expect(imported.plan).toEqual(plan);
  });

  it("rejects import when malformed or invalid", () => {
    expect(importPlanJson("{ bad json").ok).toBe(false);
    expect(importPlanJson(JSON.stringify({ not: "a plan" })).ok).toBe(false);

    const oversized = "a".repeat(1024 * 1024 + 10);
    expect(importPlanJson(oversized).ok).toBe(false);
  });
});

