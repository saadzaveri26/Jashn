"use client";

import { TaskList } from "@/components/task-list";
import { usePlan } from "@/hooks/use-plan";

export default function PlanTimelinePage() {
  const { plan, updatePlan } = usePlan();
  if (!plan) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
          Celebration Timeline & Lead Times
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Backward-scheduled from your event date. Compressed deadlines are flagged with risk warnings.
        </p>
      </div>
      <TaskList plan={plan} onUpdatePlan={updatePlan} />
    </div>
  );
}

