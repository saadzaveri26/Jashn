import { allocateBudget } from "../allocate";

describe("allocateBudget", () => {
  it("sums to total without locks", () => {
    const res = allocateBudget({
      totalMinor: 100000000,
      preset: "wedding",
      guests: 200,
      priorities: [],
      locks: new Map(),
    });
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.allocations.reduce((sum, a) => sum + a.amount, 0)).toBe(100000000);
    expect(res.total).toBe(100000000);
    for (const a of res.allocations) {
      expect(Number.isInteger(a.amount)).toBe(true);
      expect(a.amount).toBeGreaterThan(0);
      expect(a.locked).toBe(false);
    }
  });

  it("respects locked categories", () => {
    const locks = new Map<string, number>([["venue", 30000000]]);
    const res = allocateBudget({
      totalMinor: 100000000,
      preset: "wedding",
      guests: 200,
      priorities: [],
      locks,
    });
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    const venue = res.allocations.find((a) => a.categoryId === "venue");
    expect(venue?.amount).toBe(30000000);
    expect(venue?.locked).toBe(true);
    expect(res.allocations.reduce((sum, a) => sum + a.amount, 0)).toBe(100000000);
  });

  it("rejects when locked amounts exceed total", () => {
    const locks = new Map<string, number>([["venue", 120000000]]);
    const res = allocateBudget({
      totalMinor: 100000000,
      preset: "wedding",
      guests: 200,
      priorities: [],
      locks,
    });
    expect(res.ok).toBe(false);
    if (res.ok) return;
    expect(res.code).toBe("LOCKS_EXCEED_TOTAL");
  });

  it("rejects unknown category in locks", () => {
    const locks = new Map<string, number>([["space_ship", 1000]]);
    const res = allocateBudget({
      totalMinor: 100000000,
      preset: "wedding",
      guests: 200,
      priorities: [],
      locks,
    });
    expect(res.ok).toBe(false);
    if (res.ok) return;
    expect(res.code).toBe("UNKNOWN_CATEGORY");
  });

  it("handles zero guests, one guest, and huge guest count", () => {
    const guestCounts = [0, 1, 50, 10000];
    for (const g of guestCounts) {
      const res = allocateBudget({
        totalMinor: 5000000,
        preset: "birthday",
        guests: g,
        priorities: [],
        locks: new Map(),
      });
      expect(res.ok).toBe(true);
      if (!res.ok) return;
      expect(res.allocations.reduce((s, a) => s + a.amount, 0)).toBe(5000000);
    }
  });

  it("boosts prioritized categories", () => {
    const resNoPrio = allocateBudget({
      totalMinor: 10000000,
      preset: "community",
      guests: 100,
      priorities: [],
      locks: new Map(),
    });
    const resPrio = allocateBudget({
      totalMinor: 10000000,
      preset: "community",
      guests: 100,
      priorities: ["sound"],
      locks: new Map(),
    });
    expect(resNoPrio.ok && resPrio.ok).toBe(true);
    if (!resNoPrio.ok || !resPrio.ok) return;
    const soundNo = resNoPrio.allocations.find((a) => a.categoryId === "sound");
    const soundYes = resPrio.allocations.find((a) => a.categoryId === "sound");
    expect((soundYes?.amount ?? 0)).toBeGreaterThan(soundNo?.amount ?? 0);
  });

  it("handles all categories locked exactly to total", () => {
    const locks = new Map<string, number>([
      ["venue", 2500000],
      ["catering", 2500000],
      ["decor", 1200000],
      ["entertainment", 1500000],
      ["cake", 1000000],
      ["favors", 800000],
      ["misc", 500000],
    ]);
    const res = allocateBudget({
      totalMinor: 10000000,
      preset: "birthday",
      guests: 50,
      priorities: [],
      locks,
    });
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.allocations.reduce((s, a) => s + a.amount, 0)).toBe(10000000);
  });

  it("handles zero total budget gracefully", () => {
    const res = allocateBudget({
      totalMinor: 0,
      preset: "wedding",
      guests: 100,
      priorities: [],
      locks: new Map(),
    });
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.allocations.reduce((s, a) => s + a.amount, 0)).toBe(0);
    for (const a of res.allocations) {
      expect(a.amount).toBe(0);
      expect(a.pct).toBe(0);
    }
  });

  it("handles large amounts without overflow", () => {
    const huge = 100000000000;
    const res = allocateBudget({
      totalMinor: huge,
      preset: "wedding",
      guests: 500,
      priorities: ["venue"],
      locks: new Map(),
    });
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.allocations.reduce((s, a) => s + a.amount, 0)).toBe(huge);
  });
});

