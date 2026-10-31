import { CheckCircle2, AlertTriangle, AlertOctagon } from "lucide-react";
import type { FeasibilityVerdict } from "@/engine/schemas";

type Props = {
  verdict: FeasibilityVerdict;
};

export function FeasibilityBadge({ verdict }: Props) {
  if (verdict === "comfortable") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-700">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        <span>Comfortable Budget</span>
      </span>
    );
  }
  if (verdict === "tight") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full bg-amber-50 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-700">
        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
        <span>Tight Budget</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full bg-rose-50 text-rose-900 border border-rose-300 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-700">
      <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400" aria-hidden="true" />
      <span>Unrealistic Budget</span>
    </span>
  );
}

