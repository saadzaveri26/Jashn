import { CheckCircle2, AlertTriangle, AlertOctagon } from "lucide-react";
import type { FeasibilityVerdict } from "@/engine/schemas";

type Props = {
  verdict: FeasibilityVerdict;
};

export function FeasibilityBadge({ verdict }: Props) {
  if (verdict === "comfortable") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-[var(--surface-muted)] text-[var(--leaf)] border border-[var(--leaf)]">
        <CheckCircle2 className="w-4 h-4 text-[var(--leaf)]" aria-hidden="true" />
        <span>Comfortable Budget</span>
      </span>
    );
  }
  if (verdict === "tight") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-[var(--surface-muted)] text-[var(--marigold)] border border-[var(--marigold)]">
        <AlertTriangle className="w-4 h-4 text-[var(--marigold)]" aria-hidden="true" />
        <span>Tight Budget</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-[var(--surface-muted)] text-[var(--vermilion)] border border-[var(--vermilion)]">
      <AlertOctagon className="w-4 h-4 text-[var(--vermilion)]" aria-hidden="true" />
      <span>Unrealistic Budget</span>
    </span>
  );
}
