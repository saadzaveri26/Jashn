"use client";

import { Download, Calendar, FileText, Printer, FileJson } from "lucide-react";
import type { Plan } from "@/engine/schemas";
import { exportBudgetCsv, exportQuotesCsv } from "@/lib/export-csv";
import { exportPlanIcs } from "@/lib/export-ics";
import { exportPlanJson } from "@/lib/storage";

type Props = {
  plan: Plan;
};

function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function ExportMenu({ plan }: Props) {
  const handleIcs = () => {
    const ics = exportPlanIcs(plan);
    downloadFile(ics, `${plan.intake.eventName.toLowerCase().replace(/\s+/g, "-")}-schedule.ics`, "text/calendar");
  };

  const handleBudgetCsv = () => {
    const csv = exportBudgetCsv(plan);
    downloadFile(csv, `${plan.intake.eventName.toLowerCase().replace(/\s+/g, "-")}-budget.csv`, "text/csv");
  };

  const handleQuotesCsv = () => {
    const csv = exportQuotesCsv(plan);
    downloadFile(csv, `${plan.intake.eventName.toLowerCase().replace(/\s+/g, "-")}-quotes.csv`, "text/csv");
  };

  const handleJson = () => {
    const json = exportPlanJson(plan);
    downloadFile(json, `${plan.intake.eventName.toLowerCase().replace(/\s+/g, "-")}-plan.json`, "application/json");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] shadow-xs space-y-3">
      <h3 className="font-serif font-medium text-base text-[var(--foreground)] flex items-center gap-2">
        <Download className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />
        <span>Export & Share Celebration Plan</span>
      </h3>
      <p className="text-xs text-[var(--muted-foreground)]">
        Download your offline plan data or sync your timeline tasks to Apple Calendar, Google Calendar, or Excel.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2">
        <button
          type="button"
          onClick={handleIcs}
          className="min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        >
          <Calendar className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
          <span>Calendar (.ics)</span>
        </button>
        <button
          type="button"
          onClick={handleBudgetCsv}
          className="min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        >
          <FileText className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
          <span>Budget CSV</span>
        </button>
        <button
          type="button"
          onClick={handleQuotesCsv}
          className="min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        >
          <FileText className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
          <span>Quotes CSV</span>
        </button>
        <button
          type="button"
          onClick={handleJson}
          className="min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        >
          <FileJson className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
          <span>Plan Backup (JSON)</span>
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        >
          <Printer className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
          <span>Print Summary</span>
        </button>
      </div>
    </div>
  );
}
