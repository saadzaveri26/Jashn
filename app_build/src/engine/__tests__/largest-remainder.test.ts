import { distributeByLargestRemainder } from "../largest-remainder";

describe("distributeByLargestRemainder", () => {
  it("returns empty array for empty weights", () => {
    expect(distributeByLargestRemainder(100, [])).toEqual([]);
  });

  it("handles zero and negative totals", () => {
    expect(distributeByLargestRemainder(0, [1, 2])).toEqual([0, 0]);
    expect(distributeByLargestRemainder(-50, [1, 2])).toEqual([0, 0]);
  });

  it("handles zero sum weights by equal split", () => {
    const res = distributeByLargestRemainder(10, [0, 0, 0]);
    expect(res.reduce((a, b) => a + b, 0)).toBe(10);
    expect(res).toEqual([4, 3, 3]);
  });

  it("sums exactly to total for simple split", () => {
    const res = distributeByLargestRemainder(100, [1, 1, 1]);
    expect(res.reduce((a, b) => a + b, 0)).toBe(100);
    expect(res).toEqual([34, 33, 33]);
  });

  it("sums exactly to total across large numbers and varied weights", () => {
    const totals = [1, 7, 100, 1000000, 999999999];
    const weightSets = [
      [0.25, 0.3, 0.1, 0.08, 0.07, 0.06, 0.04, 0.05, 0.05],
      [10, 20, 30, 40],
      [0.0001, 0.9999],
      [1, 1, 1, 1, 1, 1, 1],
    ];
    for (const tot of totals) {
      for (const w of weightSets) {
        const res = distributeByLargestRemainder(tot, w);
        expect(res.reduce((a, b) => a + b, 0)).toBe(tot);
        for (const item of res) {
          expect(Number.isInteger(item)).toBe(true);
          expect(item).toBeGreaterThanOrEqual(0);
        }
      }
    }
  });
});

