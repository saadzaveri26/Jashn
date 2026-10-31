"use client";

import { BudgetTable } from "@/components/budget-table";
import { usePlan } from "@/hooks/use-plan";

export default function PlanBudgetPage() {
  const { plan, updatePlan } = usePlan();
  if (!plan) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
        Budget & Category Allocations
      </h1>
      <BudgetTable plan={plan} onUpdatePlan={updatePlan} />
    </div>
  );
}

