import { distributeByLargestRemainder } from "./largest-remainder";
import { getPreset } from "./presets";
import type { Allocation, CategoryId, PresetId } from "./schemas";

export type AllocateInput = {
  totalMinor: number;
  preset: PresetId;
  guests: number;
  priorities: CategoryId[];
  locks: Map<CategoryId, number>;
};

export type AllocateOutput =
  | { ok: true; allocations: Allocation[]; total: number }
  | { ok: false; reason: string; code: "LOCKS_EXCEED_TOTAL" | "UNKNOWN_CATEGORY" };

function calcWeight(catId: string, base: number, guests: number, prios: string[], min: number, max: number): number {
  const span = Math.max(max - min, 1);
  const factor = catId === "catering" ? 1 + (Math.max(0, guests) - min) / span * 0.2 : 1;
  const boost = prios.includes(catId) ? 1.25 : 1;
  return Math.max(base * factor * boost, 0.001);
}

export function allocateBudget(input: AllocateInput): AllocateOutput {
  const preset = getPreset(input.preset);
  const validIds = new Set(preset.categories.map((c) => c.id));
  for (const lockedId of input.locks.keys()) {
    if (!validIds.has(lockedId)) {
      return { ok: false, reason: "Unknown category in locks", code: "UNKNOWN_CATEGORY" };
    }
  }
  let lockedSum = 0;
  for (const amt of input.locks.values()) lockedSum += amt;
  if (lockedSum > input.totalMinor) {
    return { ok: false, reason: "Locked amounts exceed total", code: "LOCKS_EXCEED_TOTAL" };
  }
  const rem = input.totalMinor - lockedSum;
  const unlocked = preset.categories.filter((c) => !input.locks.has(c.id));
  const rawWeights = unlocked.map((c) =>
    calcWeight(c.id, c.weight, input.guests, input.priorities, preset.guestRange.min, preset.guestRange.max)
  );
  const distributed = distributeByLargestRemainder(rem, rawWeights);
  const distMap = new Map(unlocked.map((c, i) => [c.id, distributed[i]]));
  const allocations: Allocation[] = preset.categories.map((c) => {
    const isLocked = input.locks.has(c.id);
    const amount = isLocked ? input.locks.get(c.id)! : distMap.get(c.id)!;
    const pct = input.totalMinor > 0 ? Math.round((amount * 10000) / input.totalMinor) / 100 : 0;
    return { categoryId: c.id, label: c.label, amount, weight: c.weight, locked: isLocked, pct };
  });
  return { ok: true, allocations, total: input.totalMinor };
}

