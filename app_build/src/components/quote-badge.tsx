import { CheckCircle2, TrendingDown, AlertTriangle } from "lucide-react";
import type { QuoteComparison } from "@/engine/schemas";

type Props = {
  comparison: QuoteComparison;
};

export function QuoteBadge({ comparison }: Props) {
  const { verdict, deltaPct } = comparison;
  const absPct = Math.abs(deltaPct);
  if (verdict === "under") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-700">
        <TrendingDown className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        <span>Under by {absPct}%</span>
      </span>
    );
  }
  if (verdict === "within") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-stone-100 text-stone-800 border border-stone-300 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-700">
        <CheckCircle2 className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" aria-hidden="true" />
        <span>Within target (±5%)</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-rose-50 text-rose-900 border border-rose-300 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-700">
      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
      <span>Over by {absPct}%</span>
    </span>
  );
}

