import { ideaFits } from "../idea-fit";

describe("ideaFits", () => {
  it("computes low band ceiling at 15%", () => {
    const res = ideaFits({ costBand: "low", allocationAmount: 100000 });
    expect(res.fits).toBe(true);
    expect(res.bandCeiling).toBe(15000);
    expect(res.allocation).toBe(100000);
  });

  it("computes medium band ceiling at 35%", () => {
    const res = ideaFits({ costBand: "medium", allocationAmount: 100000 });
    expect(res.fits).toBe(true);
    expect(res.bandCeiling).toBe(35000);
    expect(res.allocation).toBe(100000);
  });

  it("computes high band ceiling at 60%", () => {
    const res = ideaFits({ costBand: "high", allocationAmount: 100000 });
    expect(res.fits).toBe(true);
    expect(res.bandCeiling).toBe(60000);
    expect(res.allocation).toBe(100000);
  });

  it("handles zero allocation amount", () => {
    const res = ideaFits({ costBand: "low", allocationAmount: 0 });
    expect(res.fits).toBe(false);
    expect(res.bandCeiling).toBe(0);
    expect(res.allocation).toBe(0);
  });
});

