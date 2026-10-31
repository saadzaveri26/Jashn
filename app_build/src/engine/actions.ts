import { allocateBudget } from "./allocate";
import { checkFeasibility } from "./feasibility";
import type { Action, AddTaskAction, AdjustCategoryAction, Plan, SetGuestCountAction, Task } from "./schemas";

function applyAdjust(plan: Plan, act: AdjustCategoryAction, today: string): { ok: true; plan: Plan } | { ok: false; reason: string } {
  if (act.newAmount < 0) return { ok: false, reason: "Amount cannot be negative" };
  const cat = plan.allocations.find((a) => a.categoryId === act.categoryId);
  if (!cat) return { ok: false, reason: "Category does not exist" };
  const locks = new Map<string, number>();
  for (const a of plan.allocations) {
    if (a.locked && a.categoryId !== act.categoryId) locks.set(a.categoryId, a.amount);
  }
  locks.set(act.categoryId, act.newAmount);
  const allocRes = allocateBudget({
    totalMinor: plan.intake.totalBudget,
    preset: plan.intake.preset,
    guests: plan.intake.guests,
    priorities: plan.intake.priorities,
    locks,
  });
  if (!allocRes.ok) return { ok: false, reason: allocRes.reason };
  const feas = checkFeasibility({
    preset: plan.intake.preset,
    totalMinor: plan.intake.totalBudget,
    guests: plan.intake.guests,
    cityTier: plan.intake.cityTier,
  });
  return {
    ok: true,
    plan: {
      ...plan,
      version: plan.version + 1,
      allocations: allocRes.allocations,
      feasibility: feas,
      updatedAt: today,
    },
  };
}

function applyAdd(plan: Plan, act: AddTaskAction, today: string): { ok: true; plan: Plan } | { ok: false; reason: string } {
  if (!act.title.trim()) return { ok: false, reason: "Title cannot be empty" };
  if (act.leadDays < 0 || act.leadDays > 365) return { ok: false, reason: "Lead days out of range" };
  const exists = plan.allocations.some((a) => a.categoryId === act.categoryId);
  if (!exists) return { ok: false, reason: "Category does not exist" };
  const [y, m, d] = plan.intake.eventDate.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d - act.leadDays));
  const rawDue = dt.toISOString().slice(0, 10);
  const isCompressed = rawDue < today;
  const task: Task = {
    id: `custom-${plan.tasks.length + 1}-${act.categoryId}-${act.leadDays}`,
    title: act.title.trim(),
    categoryId: act.categoryId,
    due: isCompressed ? today : rawDue,
    done: false,
    leadDays: act.leadDays,
    atRisk: isCompressed,
    compressed: isCompressed,
    compressReason: isCompressed ? `Originally due ${rawDue}; compressed because planning started late.` : undefined,
  };
  const tasks = [...plan.tasks, task].sort((a, b) => a.due.localeCompare(b.due));
  return { ok: true, plan: { ...plan, version: plan.version + 1, tasks, updatedAt: today } };
}

function applyGuests(plan: Plan, act: SetGuestCountAction, today: string): { ok: true; plan: Plan } | { ok: false; reason: string } {
  if (act.guests < 1 || act.guests > 10000) return { ok: false, reason: "Guest count out of range" };
  const locks = new Map<string, number>();
  for (const a of plan.allocations) {
    if (a.locked) locks.set(a.categoryId, a.amount);
  }
  const allocRes = allocateBudget({
    totalMinor: plan.intake.totalBudget,
    preset: plan.intake.preset,
    guests: act.guests,
    priorities: plan.intake.priorities,
    locks,
  });
  if (!allocRes.ok) return { ok: false, reason: allocRes.reason };
  const feas = checkFeasibility({
    preset: plan.intake.preset,
    totalMinor: plan.intake.totalBudget,
    guests: act.guests,
    cityTier: plan.intake.cityTier,
  });
  return {
    ok: true,
    plan: {
      ...plan,
      version: plan.version + 1,
      intake: { ...plan.intake, guests: act.guests },
      allocations: allocRes.allocations,
      feasibility: feas,
      updatedAt: today,
    },
  };
}

export function applyAction(plan: Plan, action: Action, today: string): { ok: true; plan: Plan } | { ok: false; reason: string } {
  switch (action.type) {
    case "adjust_category":
      return applyAdjust(plan, action, today);
    case "add_task":
      return applyAdd(plan, action, today);
    case "set_guest_count":
      return applyGuests(plan, action, today);
  }
}
