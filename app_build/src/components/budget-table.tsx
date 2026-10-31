"use client";

import { useState } from "react";
import { allocateBudget } from "@/engine/allocate";
import type { Allocation, CategoryId, Plan } from "@/engine/schemas";
import { formatInr } from "@/lib/format";
import { WhatIfSlider } from "./what-if-slider";

type Props = {
  plan: Plan;
  onUpdatePlan: (p: Plan) => void;
};

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

  return (
    <section aria-labelledby="budget-heading" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 id="budget-heading" className="text-xl font-serif text-stone-900 dark:text-stone-50">
            Category Allocations
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Lock categories to pin their budgets. Unlocked categories dynamically rebalance.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-stone-500 dark:text-stone-400 block">Total Budget</span>
          <span className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            {formatInr(totalAllocated)}
          </span>
        </div>
      </div>

      {error && (
        <div role="alert" className="p-3 text-sm rounded-md bg-rose-50 text-rose-800 border border-rose-300 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800">
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

