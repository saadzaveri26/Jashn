import { PlanSchema, type Plan } from "../engine/schemas";

const STORAGE_KEY = "jashn_plan";
const MAX_IMPORT_BYTES = 1024 * 1024;

let cachedPlan: Plan | null = null;
let lastRaw: string | null = null;

export function getStoredPlan(): Plan | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    cachedPlan = null;
    lastRaw = null;
    return null;
  }
  if (raw === lastRaw && cachedPlan) return cachedPlan;
  try {
    const parsed = JSON.parse(raw);
    const validated = PlanSchema.safeParse(parsed);
    if (!validated.success) {
      window.localStorage.removeItem(STORAGE_KEY);
      cachedPlan = null;
      lastRaw = null;
      return null;
    }
    cachedPlan = validated.data;
    lastRaw = raw;
    return cachedPlan;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    cachedPlan = null;
    lastRaw = null;
    return null;
  }
}

export function setStoredPlan(plan: Plan | null): void {
  if (typeof window === "undefined") return;
  if (!plan) {
    window.localStorage.removeItem(STORAGE_KEY);
    cachedPlan = null;
    lastRaw = null;
  } else {
    const raw = JSON.stringify(plan);
    window.localStorage.setItem(STORAGE_KEY, raw);
    cachedPlan = plan;
    lastRaw = raw;
  }
  window.dispatchEvent(new Event("jashn_plan_change"));
}

export function subscribePlan(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener("jashn_plan_change", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("jashn_plan_change", handler);
  };
}

export function exportPlanJson(plan: Plan): string {
  return JSON.stringify(plan, null, 2);
}

export function importPlanJson(raw: string): { ok: true; plan: Plan } | { ok: false; error: string } {
  if (new Blob([raw]).size > MAX_IMPORT_BYTES) {
    return { ok: false, error: "Import file exceeds 1MB limit" };
  }
  try {
    const parsed = JSON.parse(raw);
    const validated = PlanSchema.safeParse(parsed);
    if (!validated.success) {
      return { ok: false, error: "Invalid plan format" };
    }
    return { ok: true, plan: validated.data };
  } catch {
    return { ok: false, error: "Malformed JSON file" };
  }
}

