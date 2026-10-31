"use client";

import { useSyncExternalStore } from "react";
import type { Plan } from "@/engine/schemas";
import { getStoredPlan, setStoredPlan, subscribePlan } from "@/lib/storage";

export function usePlan(): {
  plan: Plan | null;
  updatePlan: (p: Plan | null) => void;
} {
  const plan = useSyncExternalStore(subscribePlan, getStoredPlan, () => null);
  return { plan, updatePlan: setStoredPlan };
}

