"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { compareQuote } from "@/engine/compare";
import type { Plan, Quote } from "@/engine/schemas";
import { formatInr } from "@/lib/format";
import { QuoteBadge } from "./quote-badge";

type Props = {
  plan: Plan;
  onUpdatePlan: (p: Plan) => void;
};

export function QuoteTracker({ plan, onUpdatePlan }: Props) {
  const [vendor, setVendor] = useState("");
  const [catId, setCatId] = useState(plan.allocations[0]?.categoryId || "venue");
  const [amountRupees, setAmountRupees] = useState("");
  const [notes, setNotes] = useState("");

  const handleAddQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const paise = Math.floor(Number(amountRupees) * 100);
    if (!vendor.trim() || paise <= 0) return;
    const newQuote: Quote = {
      id: `quote-${plan.quotes.length + 1}-${Date.now().toString(36)}`,
      categoryId: catId,
      vendorName: vendor.trim(),
      amount: paise,
      notes: notes.trim(),
      addedOn: new Date().toISOString().slice(0, 10),
    };
    onUpdatePlan({ ...plan, quotes: [newQuote, ...plan.quotes], version: plan.version + 1 });
    setVendor("");
    setAmountRupees("");
    setNotes("");
  };

  const handleDelete = (id: string) => {
    const updated = plan.quotes.filter((q) => q.id !== id);
    onUpdatePlan({ ...plan, quotes: updated, version: plan.version + 1 });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddQuote} className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 space-y-3">
        <h3 className="text-sm font-medium text-stone-900 dark:text-stone-100">Log Vendor Quote</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label htmlFor="quote-vendor" className="block text-xs text-stone-500 dark:text-stone-400 mb-1">Vendor Name</label>
            <input
              id="quote-vendor"
              type="text"
              placeholder="e.g. Grand Heritage Hall"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
            />
          </div>
          <div>
            <label htmlFor="quote-cat" className="block text-xs text-stone-500 dark:text-stone-400 mb-1">Category</label>
            <select
              id="quote-cat"
              value={catId}
              onChange={(e) => setCatId(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
            >
              {plan.allocations.map((a) => (
                <option key={a.categoryId} value={a.categoryId}>{a.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="quote-amount" className="block text-xs text-stone-500 dark:text-stone-400 mb-1">Quote (₹)</label>
            <input
              id="quote-amount"
              type="number"
              min={1}
              placeholder="250000"
              value={amountRupees}
              onChange={(e) => setAmountRupees(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
              required
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full min-h-[44px] px-4 py-2 text-sm font-medium rounded-md bg-amber-700 text-amber-50 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-600"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Add Quote</span>
            </button>
          </div>
        </div>
      </form>

      <ul className="space-y-3" aria-label="Logged quotes">
        {plan.quotes.map((q) => {
          const alloc = plan.allocations.find((a) => a.categoryId === q.categoryId);
          const comp = compareQuote({ quoteAmount: q.amount, allocationAmount: alloc?.amount ?? 0 });
          return (
            <li key={q.id} className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-medium text-stone-900 dark:text-stone-100 block">{q.vendorName}</span>
                <span className="text-xs text-stone-500 dark:text-stone-400 block mt-0.5">
                  Category: {alloc?.label || q.categoryId} · Target: {formatInr(alloc?.amount ?? 0)}
                </span>
                {q.notes && <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">{q.notes}</p>}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-stone-900 dark:text-stone-100">{formatInr(q.amount)}</span>
                <QuoteBadge comparison={comp} />
                <button
                  type="button"
                  onClick={() => handleDelete(q.id)}
                  aria-label={`Delete quote from ${q.vendorName}`}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

