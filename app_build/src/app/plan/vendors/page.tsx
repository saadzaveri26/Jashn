"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-8"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">
          Vendor Guidance & Quote Tracking
        </h1>
        <p className="text-xs text-[var(--muted-foreground)]">
          Evaluate quotes against deterministic allocations and use vendor questions to interview suppliers.
        </p>
      </div>

      <QuoteTracker plan={plan} onUpdatePlan={updatePlan} />

      <section aria-labelledby="guide-heading" className="space-y-4 pt-4 border-t border-[var(--border)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 id="guide-heading" className="text-xl font-serif font-semibold text-[var(--foreground)]">
            Vendor Interview Checklist & Red Flags
          </h2>
          <div className="flex items-center gap-2">
            <label htmlFor="cat-filter" className="text-xs text-[var(--muted-foreground)]">Filter:</label>
            <select
              id="cat-filter"
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="px-2.5 py-1 text-xs rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            >
              <option value="all">All Categories</option>
              {plan.allocations.map((a) => (
                <option key={a.categoryId} value={a.categoryId}>{a.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] space-y-3 shadow-xs">
            <h3 className="font-serif font-medium text-sm text-[var(--foreground)] flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[var(--accent)] shrink-0" aria-hidden="true" />
              <span>Questions to Ask Vendors</span>
            </h3>
            <ul className="space-y-2 text-xs text-[var(--foreground)]">
              {questions.map((q, idx) => (
                <li key={idx} className="p-2.5 rounded-md bg-[var(--surface-muted)] flex items-start gap-2">
                  <span className="font-semibold text-[var(--accent)]">Q{idx + 1}.</span>
                  <span>{q.question}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] space-y-3 shadow-xs">
            <h3 className="font-serif font-medium text-sm text-[var(--foreground)] flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4 text-[var(--vermilion)] shrink-0" aria-hidden="true" />
              <span>Critical Red Flags</span>
            </h3>
            <ul className="space-y-2 text-xs text-[var(--foreground)]">
              {redFlags.map((f, idx) => (
                <li key={idx} className="p-2.5 rounded-md bg-[var(--surface-muted)] border border-[var(--border)] flex items-start gap-2">
                  <span className="font-semibold text-[var(--vermilion)]">!</span>
                  <span>{f.flag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
