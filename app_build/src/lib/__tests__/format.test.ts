import { formatDate, formatInr } from "../format";

describe("format helpers", () => {
  it("formats paise to INR currency string", () => {
    const formatted = formatInr(25000000);
    expect(formatted).toContain("2,50,000");
  });

  it("formats zero and small amounts", () => {
    expect(formatInr(0)).toContain("0");
    expect(formatInr(5000)).toContain("50");
  });

  it("formats ISO date string to friendly readable date in UTC", () => {
    const formatted = formatDate("2026-11-20");
    expect(formatted).toContain("2026");
    expect(formatted).toContain("Nov");
    expect(formatted).toContain("20");
  });
});

