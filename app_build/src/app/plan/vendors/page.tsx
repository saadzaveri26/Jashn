"use client";

import { useState } from "react";
import { HelpCircle, AlertOctagon } from "lucide-react";
import { QuoteTracker } from "@/components/quote-form";
import { usePlan } from "@/hooks/use-plan";

export default function PlanVendorsPage() {
  const { plan, updatePlan } = usePlan();
  const [selectedCat, setSelectedCat] = useState("all");
  if (!plan) return null;

  const questions = plan.vendorGuide?.questions.filter((q) => selectedCat === "all" || q.categoryId === selectedCat) || [];
  const redFlags = plan.vendorGuide?.redFlags.filter((f) => selectedCat === "all" || f.categoryId === selectedCat) || [];

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
          Vendor Guidance & Quote Tracking
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Evaluate quotes against deterministic category allocations and use vendor questions to interview suppliers.
        </p>
      </div>

      <QuoteTracker plan={plan} onUpdatePlan={updatePlan} />

      <section aria-labelledby="guide-heading" className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 id="guide-heading" className="text-xl font-serif font-semibold text-stone-900 dark:text-stone-100">
            Vendor Interview Checklist & Red Flags
          </h2>
          <div className="flex items-center gap-2">
            <label htmlFor="cat-filter" className="text-xs text-stone-500">Filter:</label>
            <select
              id="cat-filter"
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="px-2.5 py-1 text-xs rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
            >
              <option value="all">All Categories</option>
              {plan.allocations.map((a) => (
                <option key={a.categoryId} value={a.categoryId}>{a.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-3">
            <h3 className="font-serif font-medium text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" aria-hidden="true" />
              <span>Questions to Ask Vendors</span>
            </h3>
            <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
              {questions.map((q, idx) => (
                <li key={idx} className="p-2.5 rounded-md bg-stone-50 dark:bg-stone-800/50 flex items-start gap-2">
                  <span className="font-semibold text-amber-700 dark:text-amber-400">Q{idx + 1}.</span>
                  <span>{q.question}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-3">
            <h3 className="font-serif font-medium text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" aria-hidden="true" />
              <span>Critical Red Flags</span>
            </h3>
            <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
              {redFlags.map((f, idx) => (
                <li key={idx} className="p-2.5 rounded-md bg-rose-50/50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 flex items-start gap-2">
                  <span className="font-semibold text-rose-600 dark:text-rose-400">!</span>
                  <span>{f.flag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

