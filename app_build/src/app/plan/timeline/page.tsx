"use client";

import { motion } from "framer-motion";
import { TaskList } from "@/components/task-list";
import { usePlan } from "@/hooks/use-plan";

export default function PlanTimelinePage() {
  const { plan, updatePlan } = usePlan();
  if (!plan) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">
          Celebration Timeline & Lead Times
        </h1>
        <p className="text-xs text-[var(--muted-foreground)]">
          Backward-scheduled from your celebration date. Compressed deadlines carry explicit warnings.
        </p>
      </div>
      <TaskList plan={plan} onUpdatePlan={updatePlan} />
    </motion.div>
  );
}
