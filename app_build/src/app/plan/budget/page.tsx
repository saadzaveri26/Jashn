"use client";

import { motion } from "framer-motion";
import { BudgetTable } from "@/components/budget-table";
import { usePlan } from "@/hooks/use-plan";

export default function PlanBudgetPage() {
  const { plan, updatePlan } = usePlan();
  if (!plan) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">
        Budget & Category Allocations
      </h1>
      <BudgetTable plan={plan} onUpdatePlan={updatePlan} />
    </motion.div>
  );
}
