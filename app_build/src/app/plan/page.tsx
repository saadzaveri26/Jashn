"use client";

import Link from "next/link";
import { ArrowRight, CheckSquare, Clock, AlertTriangle } from "lucide-react";
import { AiBanner } from "@/components/ai-banner";
import { usePlan } from "@/hooks/use-plan";
import { formatDate, formatInr } from "@/lib/format";

export default function PlanOverviewPage() {
  const { plan } = usePlan();
  if (!plan) return null;

  const totalAlloc = plan.allocations.reduce((acc, a) => acc + a.amount, 0);
  const doneTasks = plan.tasks.filter((t) => t.done).length;
  const atRiskTasks = plan.tasks.filter((t) => t.atRisk && !t.done);
  const quotesTotal = plan.quotes.reduce((acc, q) => acc + q.amount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
        Celebration Dashboard
      </h1>

      <AiBanner status={plan.ai} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
          <span className="text-xs text-stone-500 dark:text-stone-400 block">Total Budget</span>
          <span className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100 block mt-1">
            {formatInr(totalAlloc)}
          </span>
          <span className="text-xs text-stone-400 block mt-1">{plan.allocations.length} categories</span>
        </div>

        <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
          <span className="text-xs text-stone-500 dark:text-stone-400 block">Timeline Tasks</span>
          <span className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100 block mt-1">
            {doneTasks} / {plan.tasks.length}
          </span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 block mt-1">Completed</span>
        </div>

        <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
          <span className="text-xs text-stone-500 dark:text-stone-400 block">Quotes Logged</span>
          <span className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100 block mt-1">
            {plan.quotes.length}
          </span>
          <span className="text-xs text-stone-400 block mt-1">{formatInr(quotesTotal)} total</span>
        </div>

        <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
          <span className="text-xs text-stone-500 dark:text-stone-400 block">At-Risk Lead Times</span>
          <span className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100 block mt-1">
            {atRiskTasks.length}
          </span>
          <span className="text-xs text-amber-600 dark:text-amber-400 block mt-1">Compressed deadlines</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <section aria-labelledby="tasks-preview-heading" className="p-5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="tasks-preview-heading" className="font-serif font-semibold text-lg text-stone-900 dark:text-stone-100">
              Immediate Tasks
            </h2>
            <Link href="/plan/timeline" className="text-xs text-amber-700 hover:text-amber-800 dark:text-amber-400 font-medium flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-amber-600 rounded-sm">
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
          <ul className="space-y-2 text-sm">
            {plan.tasks.slice(0, 4).map((t) => (
              <li key={t.id} className="flex items-center justify-between p-2 rounded-md bg-stone-50 dark:bg-stone-800/50">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-stone-400" aria-hidden="true" />
                  <span className={`text-xs ${t.done ? "line-through text-stone-400" : "text-stone-800 dark:text-stone-200"}`}>{t.title}</span>
                </div>
                <span className="text-xs text-stone-500">{formatDate(t.due)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="alloc-preview-heading" className="p-5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="alloc-preview-heading" className="font-serif font-semibold text-lg text-stone-900 dark:text-stone-100">
              Top Category Allocations
            </h2>
            <Link href="/plan/budget" className="text-xs text-amber-700 hover:text-amber-800 dark:text-amber-400 font-medium flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-amber-600 rounded-sm">
              <span>Manage budget</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
          <ul className="space-y-2 text-sm">
            {plan.allocations.slice(0, 4).map((a) => (
              <li key={a.categoryId} className="flex items-center justify-between p-2 rounded-md bg-stone-50 dark:bg-stone-800/50">
                <span className="text-xs font-medium text-stone-800 dark:text-stone-200">{a.label}</span>
                <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">{formatInr(a.amount)} ({a.pct}%)</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

