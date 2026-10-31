import { buildTimeline } from "../timeline";

describe("buildTimeline", () => {
  it("builds timeline with ample lead time without compression", () => {
    const res = buildTimeline({
      eventDate: "2026-12-01",
      today: "2026-01-01",
      preset: "wedding",
    });
    expect(res.hasCompressed).toBe(false);
    expect(res.tasks.length).toBeGreaterThan(0);
    for (const t of res.tasks) {
      expect(t.atRisk).toBe(false);
      expect(t.compressed).toBe(false);
      expect(t.compressReason).toBeUndefined();
      expect(t.due >= "2026-01-01").toBe(true);
      expect(t.due <= "2026-12-01").toBe(true);
    }
  });

  it("compresses tasks when lead days exceed remaining days", () => {
    const res = buildTimeline({
      eventDate: "2026-03-01",
      today: "2026-02-15",
      preset: "wedding",
    });
    expect(res.hasCompressed).toBe(true);
    const compressed = res.tasks.filter((t) => t.compressed);
    expect(compressed.length).toBeGreaterThan(0);
    for (const t of compressed) {
      expect(t.atRisk).toBe(true);
      expect(t.due).toBe("2026-02-15");
      expect(t.compressReason).toBeDefined();
    }
  });

  it("handles event date equal to today", () => {
    const res = buildTimeline({
      eventDate: "2026-05-10",
      today: "2026-05-10",
      preset: "birthday",
    });
    expect(res.hasCompressed).toBe(true);
    for (const t of res.tasks) {
      expect(t.due).toBe("2026-05-10");
      expect(t.atRisk).toBe(true);
      expect(t.compressed).toBe(true);
    }
  });

  it("handles event date in the past", () => {
    const res = buildTimeline({
      eventDate: "2026-01-01",
      today: "2026-02-01",
      preset: "community",
    });
    expect(res.hasCompressed).toBe(true);
    for (const t of res.tasks) {
      expect(t.due).toBe("2026-02-01");
      expect(t.atRisk).toBe(true);
      expect(t.compressed).toBe(true);
    }
  });

  it("sorts tasks by due date ascending", () => {
    const res = buildTimeline({
      eventDate: "2026-08-01",
      today: "2026-04-01",
      preset: "wedding",
    });
    for (let i = 0; i < res.tasks.length - 1; i++) {
      expect(res.tasks[i].due <= res.tasks[i + 1].due).toBe(true);
    }
  });
});

