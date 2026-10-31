import { Check, X, SlidersHorizontal, PlusCircle, Users } from "lucide-react";
import type { Action } from "@/engine/schemas";
import { formatInr } from "@/lib/format";

type Props = {
  action: Action;
  onApply: () => void;
  onDismiss: () => void;
};

export function ActionCard({ action, onApply, onDismiss }: Props) {
  let title = "Proposed Change";
  let detail = "";
  let Icon = SlidersHorizontal;

  if (action.type === "adjust_category") {
    title = `Adjust ${action.categoryId} budget`;
    detail = `Set allocation to ${formatInr(action.newAmount)} and rebalance remaining categories`;
    Icon = SlidersHorizontal;
  } else if (action.type === "add_task") {
    title = `Add task: ${action.title}`;
    detail = `Schedule task under ${action.categoryId} with ${action.leadDays} days lead time`;
    Icon = PlusCircle;
  } else if (action.type === "set_guest_count") {
    title = `Update guest count to ${action.guests}`;
    detail = `Recalculate allocations and feasibility for ${action.guests} guests`;
    Icon = Users;
  }

  return (
    <div className="p-3.5 my-2 rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/40 text-stone-900 dark:text-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-start gap-2.5">
        <Icon className="w-4 h-4 text-amber-700 dark:text-amber-400 mt-0.5 shrink-0" aria-hidden="true" />
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">Proposed Action</span>
          <span className="text-sm font-medium block">{title}</span>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">{detail}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 self-end sm:self-center">
        <button
          type="button"
          onClick={onDismiss}
          className="min-h-[44px] min-w-[44px] px-3 py-1.5 text-xs font-medium rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600 flex items-center justify-center gap-1"
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Dismiss</span>
        </button>
        <button
          type="button"
          onClick={onApply}
          className="min-h-[44px] min-w-[44px] px-3.5 py-1.5 text-xs font-medium rounded-md bg-amber-700 text-amber-50 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600 flex items-center justify-center gap-1 font-semibold"
        >
          <Check className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Apply</span>
        </button>
      </div>
    </div>
  );
}

