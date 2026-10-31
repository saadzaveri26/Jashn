import { exportBudgetCsv, exportQuotesCsv, sanitizeCsvCell } from "../export-csv";
import type { Plan } from "../../engine/schemas";

describe("CSV Export and formula neutralization", () => {
  it("neutralizes cells starting with dangerous characters", () => {
    expect(sanitizeCsvCell("=SUM(A1:A10)")).toBe("'=SUM(A1:A10)");
    expect(sanitizeCsvCell("+12345")).toBe("'+12345");
    expect(sanitizeCsvCell("-100")).toBe("'-100");
    expect(sanitizeCsvCell("@special")).toBe("'@special");
    expect(sanitizeCsvCell("\tindented")).toBe("'\tindented");
    expect(sanitizeCsvCell("\rreturn")).toBe("'\rreturn");
  });

  it("escapes quotes and commas in regular cells", () => {
    expect(sanitizeCsvCell('Hello "World"')).toBe('"Hello ""World"""');
    expect(sanitizeCsvCell("A, B, C")).toBe('"A, B, C"');
    expect(sanitizeCsvCell("Normal Text")).toBe("Normal Text");
  });

  it("exports budget allocations to CSV properly", () => {
    const plan: Plan = {
      id: "p1",
      version: 1,
      schemaVersion: 1,
      intake: {
        preset: "wedding",
        eventName: "Sample",
        eventDate: "2026-10-10",
        guests: 100,
        totalBudget: 1000000,
        cityTier: "tier-2",
        priorities: [],
        currency: "INR",
      },
      allocations: [
        { categoryId: "venue", label: "=Bad Venue", amount: 250000, weight: 0.25, locked: true, pct: 25 },
      ],
      tasks: [],
      quotes: [],
      ideas: [],
      vendorGuide: null,
      feasibility: "comfortable",
      createdAt: "2026-01-01",
      updatedAt: "2026-01-01",
      ai: null,
    };
    const csv = exportBudgetCsv(plan);
    expect(csv).toContain("Category,Label,Amount (Paise),Amount (INR),Share (%),Locked");
    expect(csv).toContain("'=Bad Venue");
    expect(csv).toContain("250000");
  });

  it("exports quotes to CSV properly", () => {
    const plan: Plan = {
      id: "p1",
      version: 1,
      schemaVersion: 1,
      intake: {
        preset: "birthday",
        eventName: "Birthday",
        eventDate: "2026-10-10",
        guests: 50,
        totalBudget: 500000,
        cityTier: "tier-2",
        priorities: [],
        currency: "INR",
      },
      allocations: [],
      tasks: [],
      quotes: [
        {
          id: "q1",
          categoryId: "cake",
          vendorName: "@SweetBakers",
          amount: 50000,
          notes: "Chocolate flavor",
          addedOn: "2026-01-01",
        },
      ],
      ideas: [],
      vendorGuide: null,
      feasibility: "tight",
      createdAt: "2026-01-01",
      updatedAt: "2026-01-01",
      ai: null,
    };
    const csv = exportQuotesCsv(plan);
    expect(csv).toContain("Category,Vendor,Amount (Paise),Amount (INR),Date Added,Notes");
    expect(csv).toContain("'@SweetBakers");
  });
});

