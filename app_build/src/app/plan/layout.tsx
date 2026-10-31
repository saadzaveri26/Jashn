"use client";

import Link from "next/link";
import { PlusCircle, Calendar, Users, Wallet } from "lucide-react";
import { ExportMenu } from "@/components/export-menu";
import { FeasibilityBadge } from "@/components/feasibility-badge";
import { PlanNav } from "@/components/plan-nav";
import { usePlan } from "@/hooks/use-plan";
import { formatDate, formatInr } from "@/lib/format";

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  const { plan } = usePlan();

  if (!plan) {
    return (
      <div className="py-20 px-4 text-center max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
          No Active Plan Found
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Start a new plan or load our verified wedding sample to begin organizing.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            href="/new"
            className="min-h-[44px] px-4 py-2 text-sm font-medium rounded-md bg-amber-700 text-amber-50 hover:bg-amber-800 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-600 font-semibold"
          >
            <PlusCircle className="w-4 h-4" aria-hidden="true" />
            <span>Create Plan</span>
          </Link>
          <Link
            href="/sample"
            className="min-h-[44px] px-4 py-2 text-sm font-medium rounded-md border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-50 transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-amber-600"
          >
            <span>Load Sample</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div data-theme={plan.intake.preset} className="space-y-4 pb-16">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                {plan.intake.preset}
              </span>
              {plan.feasibility && <FeasibilityBadge verdict={plan.feasibility} />}
            </div>
            <p className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
              {plan.intake.eventName}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 dark:text-stone-400 pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                {formatDate(plan.intake.eventDate)}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" aria-hidden="true" />
                {plan.intake.guests} guests ({plan.intake.cityTier})
              </span>
              <span className="flex items-center gap-1">
                <Wallet className="w-3.5 h-3.5" aria-hidden="true" />
                {formatInr(plan.intake.totalBudget)}
              </span>
            </div>
          </div>
          <div>
            <ExportMenu plan={plan} />
          </div>
        </div>
      </div>

      <PlanNav />

      <div className="max-w-6xl mx-auto px-4 pt-2">
        {children}
      </div>
    </div>
  );
}

