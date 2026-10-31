import { escapeIcsValue, exportPlanIcs, foldIcsLine } from "../export-ics";
import type { Plan } from "../../engine/schemas";

describe("ICS Export and formatting", () => {
  it("escapes backslash, comma, semicolon, newline", () => {
    const raw = "Backslash \\ and, comma; and semicolon\nnewline";
    const escaped = escapeIcsValue(raw);
    expect(escaped).toBe("Backslash \\\\ and\\, comma\\; and semicolon\\nnewline");
  });

  it("folds lines longer than 75 octets", () => {
    const long = "SUMMARY:This is a very long line that exceeds the standard 75 octets limit defined by RFC 5545 specification for calendar files";
    const folded = foldIcsLine(long);
    expect(folded).toContain("\r\n ");
    const lines = folded.split("\r\n");
    for (const l of lines) {
      expect(Buffer.byteLength(l, "utf8")).toBeLessThanOrEqual(75);
    }
  });

  it("exports valid iCalendar structure", () => {
    const plan: Plan = {
      id: "plan-123",
      version: 1,
      schemaVersion: 1,
      intake: {
        preset: "wedding",
        eventName: "Big Wedding",
        eventDate: "2026-11-15",
        guests: 300,
        totalBudget: 20000000,
        cityTier: "tier-1",
        priorities: [],
        currency: "INR",
      },
      allocations: [],
      tasks: [
        {
          id: "task-1",
          title: "Book Venue, Catering & Decor",
          categoryId: "venue",
          due: "2026-05-15",
          done: false,
          leadDays: 180,
          atRisk: false,
          compressed: false,
        },
      ],
      quotes: [],
      ideas: [],
      vendorGuide: null,
      feasibility: "comfortable",
      createdAt: "2026-01-01",
      updatedAt: "2026-01-01",
      ai: null,
    };
    const ics = exportPlanIcs(plan);
    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("VERSION:2.0");
    expect(ics).toContain("PRODID:-//Jashn//EN");
    expect(ics).toContain("BEGIN:VEVENT");
    expect(ics).toContain("DTSTART;VALUE=DATE:20260515");
    expect(ics).toContain("SUMMARY:Book Venue\\, Catering & Decor");
    expect(ics).toContain("END:VEVENT");
    expect(ics).toContain("END:VCALENDAR");
  });
});

