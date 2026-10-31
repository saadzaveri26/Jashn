import { compareQuote } from "../compare";

describe("compareQuote", () => {
  it("returns under when quote is below 95% of allocation", () => {
    const res = compareQuote({ quoteAmount: 94000, allocationAmount: 100000 });
    expect(res.verdict).toBe("under");
    expect(res.deltaMinor).toBe(-6000);
    expect(res.deltaPct).toBe(-6);
  });

  it("returns within at exactly 95% boundary", () => {
    const res = compareQuote({ quoteAmount: 95000, allocationAmount: 100000 });
    expect(res.verdict).toBe("within");
    expect(res.deltaMinor).toBe(-5000);
    expect(res.deltaPct).toBe(-5);
  });

  it("returns within at 100% exact match", () => {
    const res = compareQuote({ quoteAmount: 100000, allocationAmount: 100000 });
    expect(res.verdict).toBe("within");
    expect(res.deltaMinor).toBe(0);
    expect(res.deltaPct).toBe(0);
  });

  it("returns within at exactly 105% boundary", () => {
    const res = compareQuote({ quoteAmount: 105000, allocationAmount: 100000 });
    expect(res.verdict).toBe("within");
    expect(res.deltaMinor).toBe(5000);
    expect(res.deltaPct).toBe(5);
  });

  it("returns over when quote exceeds 105% boundary", () => {
    const res = compareQuote({ quoteAmount: 105100, allocationAmount: 100000 });
    expect(res.verdict).toBe("over");
    expect(res.deltaMinor).toBe(5100);
    expect(res.deltaPct).toBe(5.1);
  });

  it("handles zero allocation amount", () => {
    const res1 = compareQuote({ quoteAmount: 5000, allocationAmount: 0 });
    expect(res1.verdict).toBe("over");
    expect(res1.deltaMinor).toBe(5000);
    expect(res1.deltaPct).toBe(100);

    const res2 = compareQuote({ quoteAmount: 0, allocationAmount: 0 });
    expect(res2.verdict).toBe("within");
    expect(res2.deltaMinor).toBe(0);
    expect(res2.deltaPct).toBe(0);
  });
});

