"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { usePlan } from "@/hooks/use-plan";

const AssistantChat = dynamic(
  () => import("@/components/assistant-chat").then((m) => m.AssistantChat),
  {
    loading: () => (
      <div className="h-[520px] rounded-lg border border-[var(--border)] bg-[var(--card)] flex items-center justify-center text-xs text-[var(--muted-foreground)] gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-[var(--accent)]" aria-hidden="true" />
        <span>Loading Celebration Assistant...</span>
      </div>
    ),
  }
);

export default function PlanAssistantPage() {
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
          Planning Assistant & Action Center
        </h1>
        <p className="text-xs text-[var(--muted-foreground)]">
          Discuss changes with the celebration assistant. Proposed actions must be confirmed with the Apply button.
        </p>
      </div>
      <AssistantChat plan={plan} onUpdatePlan={updatePlan} />
    </motion.div>
  );
}
