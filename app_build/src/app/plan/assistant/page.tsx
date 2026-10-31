"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { usePlan } from "@/hooks/use-plan";

const AssistantChat = dynamic(
  () => import("@/components/assistant-chat").then((m) => m.AssistantChat),
  {
    loading: () => (
      <div className="h-[520px] rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center justify-center text-xs text-stone-500 gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-amber-600" aria-hidden="true" />
        <span>Loading AI Assistant...</span>
      </div>
    ),
  }
);

export default function PlanAssistantPage() {
  const { plan, updatePlan } = usePlan();
  if (!plan) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
          Planning Assistant & Action Center
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Discuss changes with the celebration assistant. Proposed actions must be confirmed with the Apply button.
        </p>
      </div>
      <AssistantChat plan={plan} onUpdatePlan={updatePlan} />
    </div>
  );
}

