"use client";

import { useState } from "react";
import { AlertTriangle, CheckSquare, Square, Plus } from "lucide-react";
import type { Plan, Task } from "@/engine/schemas";
import { formatDate } from "@/lib/format";

type Props = {
  plan: Plan;
  onUpdatePlan: (p: Plan) => void;
};

export function TaskList({ plan, onUpdatePlan }: Props) {
  const [newTitle, setNewTitle] = useState("");
  const [newCat, setNewCat] = useState(plan.allocations[0]?.categoryId || "venue");
  const [newLead, setNewLead] = useState(30);

  const handleToggleDone = (taskId: string) => {
    const updated = plan.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t));
    onUpdatePlan({ ...plan, tasks: updated, version: plan.version + 1 });
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const [y, m, d] = plan.intake.eventDate.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d - newLead));
    const rawDue = dt.toISOString().slice(0, 10);
    const today = new Date().toISOString().slice(0, 10);
    const isCompressed = rawDue < today;
    const task: Task = {
      id: `task-custom-${plan.tasks.length + 1}-${Date.now().toString(36)}`,
      title: newTitle.trim(),
      categoryId: newCat,
      due: isCompressed ? today : rawDue,
      done: false,
      leadDays: newLead,
      atRisk: isCompressed,
      compressed: isCompressed,
      compressReason: isCompressed ? `Compressed from ${rawDue} because event date is imminent.` : undefined,
    };
    const tasks = [...plan.tasks, task].sort((a, b) => a.due.localeCompare(b.due));
    onUpdatePlan({ ...plan, tasks, version: plan.version + 1 });
    setNewTitle("");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddTask} className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 space-y-3">
        <h3 className="text-sm font-medium text-stone-900 dark:text-stone-100">Add Custom Timeline Task</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-2">
            <label htmlFor="task-title" className="sr-only">Task Title</label>
            <input
              id="task-title"
              type="text"
              placeholder="e.g. Schedule Bridal Trial"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
            />
          </div>
          <div>
            <label htmlFor="task-category" className="sr-only">Category</label>
            <select
              id="task-category"
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
            >
              {plan.allocations.map((a) => (
                <option key={a.categoryId} value={a.categoryId}>{a.label}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="min-h-[44px] px-4 py-2 text-sm font-medium rounded-md bg-amber-700 text-amber-50 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-600"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Add Task</span>
          </button>
        </div>
      </form>

      <ul className="space-y-2.5" aria-label="Timeline task checklist">
        {plan.tasks.map((t) => (
          <li
            key={t.id}
            className={`p-3.5 rounded-lg border transition-all flex items-start justify-between gap-3 ${
              t.done
                ? "bg-stone-50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 opacity-60"
                : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-2xs"
            }`}
          >
            <button
              type="button"
              onClick={() => handleToggleDone(t.id)}
              aria-label={t.done ? `Mark ${t.title} as incomplete` : `Mark ${t.title} as complete`}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-600 rounded-md"
            >
              {t.done ? (
                <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              ) : (
                <Square className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
            <div className="flex-1 min-w-0 pt-2">
              <span className={`text-sm font-medium block truncate ${t.done ? "line-through text-stone-500" : "text-stone-900 dark:text-stone-100"}`}>
                {t.title}
              </span>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-xs text-stone-500 dark:text-stone-400">Due: {formatDate(t.due)}</span>
                <span className="text-xs px-2 py-0.5 rounded-sm bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                  {plan.allocations.find((a) => a.categoryId === t.categoryId)?.label || t.categoryId}
                </span>
                {t.atRisk && (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-sm bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800 font-medium">
                    <AlertTriangle className="w-3 h-3 text-rose-600 dark:text-rose-400" aria-hidden="true" />
                    <span>At Risk (Compressed)</span>
                  </span>
                )}
              </div>
              {t.compressReason && (
                <p className="text-xs text-rose-700 dark:text-rose-400 mt-1">{t.compressReason}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

