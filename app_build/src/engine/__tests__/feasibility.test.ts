import { checkFeasibility } from "../feasibility";

describe("checkFeasibility", () => {
  it("returns comfortable when well above floor", () => {
    const res = checkFeasibility({
      preset: "wedding",
      totalMinor: 500000000,
      guests: 100,
      cityTier: "tier-1",
    });
    expect(res).toBe("comfortable");
  });

  it("returns tight when between floor and 1.5x floor", () => {
    const floor = 300000;
    const guests = 100;
    const totalMinor = floor * 1.2 * guests;
    const res = checkFeasibility({
      preset: "wedding",
      totalMinor,
      guests,
      cityTier: "tier-1",
    });
    expect(res).toBe("tight");
  });

  it("returns unrealistic when below floor", () => {
    const floor = 300000;
    const guests = 100;
    const totalMinor = (floor - 50000) * guests;
    const res = checkFeasibility({
      preset: "wedding",
      totalMinor,
      guests,
      cityTier: "tier-1",
    });
    expect(res).toBe("unrealistic");
  });

  it("handles boundary values at exactly floor and 1.5x floor", () => {
    const floor = 200000;
    const guests = 10;
    expect(
      checkFeasibility({
        preset: "wedding",
        totalMinor: floor * guests,
        guests,
        cityTier: "tier-2",
      })
    ).toBe("tight");

    expect(
      checkFeasibility({
        preset: "wedding",
        totalMinor: floor * 1.5 * guests,
        guests,
        cityTier: "tier-2",
      })
    ).toBe("comfortable");
  });

  it("handles zero and negative guests or total", () => {
    expect(
      checkFeasibility({
        preset: "birthday",
        totalMinor: 100000,
        guests: 0,
        cityTier: "tier-2",
      })
    ).toBe("unrealistic");

    expect(
      checkFeasibility({
        preset: "birthday",
        totalMinor: -500,
        guests: 10,
        cityTier: "tier-2",
      })
    ).toBe("unrealistic");
  });

  it("works across all presets and tiers", () => {
    const tiers = ["tier-1", "tier-2", "tier-3"] as const;
    const presets = ["wedding", "birthday", "community"] as const;
    for (const p of presets) {
      for (const t of tiers) {
        const v = checkFeasibility({
          preset: p,
          totalMinor: 10000000,
          guests: 50,
          cityTier: t,
        });
        expect(["comfortable", "tight", "unrealistic"]).toContain(v);
      }
    }
  });
});

