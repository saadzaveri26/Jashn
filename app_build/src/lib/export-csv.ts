import type { Plan } from "../engine/schemas";

export function sanitizeCsvCell(val: string | number): string {
  const str = String(val);
  if (/^[=+\-@\t\r]/.test(str)) {
    return `'${str.replace(/"/g, '""')}`;
  }
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportBudgetCsv(plan: Plan): string {
  const headers = ["Category", "Label", "Amount (Paise)", "Amount (INR)", "Share (%)", "Locked"];
  const rows = plan.allocations.map((a) => [
    sanitizeCsvCell(a.categoryId),
    sanitizeCsvCell(a.label),
    sanitizeCsvCell(a.amount),
    sanitizeCsvCell((a.amount / 100).toFixed(2)),
    sanitizeCsvCell(a.pct),
    sanitizeCsvCell(a.locked ? "Yes" : "No"),
  ]);
  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
}

export function exportQuotesCsv(plan: Plan): string {
  const headers = ["Category", "Vendor", "Amount (Paise)", "Amount (INR)", "Date Added", "Notes"];
  const rows = plan.quotes.map((q) => [
    sanitizeCsvCell(q.categoryId),
    sanitizeCsvCell(q.vendorName),
    sanitizeCsvCell(q.amount),
    sanitizeCsvCell((q.amount / 100).toFixed(2)),
    sanitizeCsvCell(q.addedOn),
    sanitizeCsvCell(q.notes),
  ]);
  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
}

