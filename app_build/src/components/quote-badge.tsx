import { motion } from "framer-motion";
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
      <motion.span
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-[var(--surface-muted)] text-[var(--leaf)] border border-[var(--leaf)]"
      >
        <TrendingDown className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Under by {absPct}%</span>
      </motion.span>
    );
  }
  if (verdict === "within") {
    return (
      <motion.span
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-[var(--surface-muted)] text-[var(--foreground)] border border-[var(--border)]"
      >
        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Within target (±5%)</span>
      </motion.span>
    );
  }
  return (
    <motion.span
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-[var(--surface-muted)] text-[var(--vermilion)] border border-[var(--vermilion)]"
    >
      <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
      <span>Over by {absPct}%</span>
    </motion.span>
  );
}
