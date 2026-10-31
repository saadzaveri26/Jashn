"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { allocateBudget } from "@/engine/allocate";
import type { Allocation, CategoryId, Plan } from "@/engine/schemas";
import { formatInr } from "@/lib/format";
import { WhatIfSlider } from "./what-if-slider";

type Props = {
  plan: Plan;
  onUpdatePlan: (p: Plan) => void;
};

const paletteColors = [
  "var(--marigold, #d97706)",
  "var(--rose, #9d174d)",
  "var(--peacock, #0f766e)",
  "var(--vermilion, #b91c1c)",
  "var(--leaf, #15803d)",
  "var(--plum, #701a75)",
  "var(--gold, #b48310)",
];

export function BudgetTable({ plan, onUpdatePlan }: Props) {
  const [error, setError] = useState<string | null>(null);

  const handleToggleLock = (catId: CategoryId) => {
    const locks = new Map<CategoryId, number>();
    for (const a of plan.allocations) {
      if (a.categoryId === catId ? !a.locked : a.locked) {
        locks.set(a.categoryId, a.amount);
      }
    }
    const res = allocateBudget({
      totalMinor: plan.intake.totalBudget,
      preset: plan.intake.preset,
      guests: plan.intake.guests,
      priorities: plan.intake.priorities,
      locks,
    });
    if (res.ok) {
      setError(null);
      onUpdatePlan({ ...plan, allocations: res.allocations, version: plan.version + 1 });
    } else {
      setError(res.reason);
    }
  };

  const handleChangeAmount = (catId: CategoryId, newAmount: number) => {
    const locks = new Map<CategoryId, number>();
    for (const a of plan.allocations) {
      if (a.locked || a.categoryId === catId) {
        locks.set(a.categoryId, a.categoryId === catId ? newAmount : a.amount);
      }
    }
    const res = allocateBudget({
      totalMinor: plan.intake.totalBudget,
      preset: plan.intake.preset,
      guests: plan.intake.guests,
      priorities: plan.intake.priorities,
      locks,
    });
    if (res.ok) {
      setError(null);
      onUpdatePlan({ ...plan, allocations: res.allocations, version: plan.version + 1 });
    } else {
      setError(res.reason);
    }
  };

  const totalAllocated = plan.allocations.reduce((acc, a) => acc + a.amount, 0);
  const isBalanced = totalAllocated === plan.intake.totalBudget;

  return (
    <section aria-labelledby="budget-heading" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border)]">
        <div>
          <h2 id="budget-heading" className="text-xl font-serif text-[var(--foreground)]">
            Category Allocations
          </h2>
          <p className="text-xs text-[var(--muted-foreground)]">
            Lock categories to pin their budgets. Unlocked categories dynamically rebalance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isBalanced && (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="px-2.5 py-1 rounded-full border border-[var(--leaf)] bg-[var(--surface-muted)] text-[var(--leaf)] text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Balanced</span>
            </motion.div>
          )}
          <div className="text-right">
            <span className="text-xs text-[var(--muted-foreground)] block">Total Budget</span>
            <span className="text-lg font-semibold text-[var(--foreground)]">
              {formatInr(totalAllocated)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] space-y-2">
        <span className="text-xs font-medium text-[var(--muted-foreground)] block">Garland Allocation Distribution</span>
        <div className="h-4 w-full flex rounded-full overflow-hidden bg-[var(--surface-muted)] gap-0.5">
          {plan.allocations.map((a, i) => (
            <motion.div
              key={a.categoryId}
              layout
              style={{ width: `${a.pct}%`, backgroundColor: paletteColors[i % paletteColors.length] }}
              className="h-full transition-all"
              title={`${a.label}: ${a.pct}%`}
            />
          ))}
        </div>
      </div>

      {error && (
        <div role="alert" className="p-3 text-sm rounded-md bg-[var(--surface-muted)] text-[var(--vermilion)] border border-[var(--vermilion)]">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {plan.allocations.map((a: Allocation) => (
          <WhatIfSlider
            key={a.categoryId}
            id={a.categoryId}
            label={a.label}
            amount={a.amount}
            pct={a.pct}
            totalBudget={plan.intake.totalBudget}
            locked={a.locked}
            onToggleLock={() => handleToggleLock(a.categoryId)}
            onChangeAmount={(newAmt) => handleChangeAmount(a.categoryId, newAmt)}
          />
        ))}
      </div>
    </section>
  );
}
