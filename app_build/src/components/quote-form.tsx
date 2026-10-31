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
      <form onSubmit={handleAddQuote} className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] space-y-3">
        <h3 className="text-sm font-medium text-[var(--foreground)]">Log Vendor Quote</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label htmlFor="quote-vendor" className="block text-xs text-[var(--muted-foreground)] mb-1">Vendor Name</label>
            <input
              id="quote-vendor"
              type="text"
              placeholder="e.g. Grand Heritage Hall"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              required
            />
          </div>
          <div>
            <label htmlFor="quote-cat" className="block text-xs text-[var(--muted-foreground)] mb-1">Category</label>
            <select
              id="quote-cat"
              value={catId}
              onChange={(e) => setCatId(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            >
              {plan.allocations.map((a) => (
                <option key={a.categoryId} value={a.categoryId}>{a.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="quote-amount" className="block text-xs text-[var(--muted-foreground)] mb-1">Quote (₹)</label>
            <input
              id="quote-amount"
              type="number"
              min={1}
              placeholder="250000"
              value={amountRupees}
              onChange={(e) => setAmountRupees(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              required
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full min-h-[44px] px-4 py-2 text-sm font-semibold rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
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
            <li key={q.id} className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div>
                <span className="font-medium text-[var(--foreground)] block">{q.vendorName}</span>
                <span className="text-xs text-[var(--muted-foreground)] block mt-0.5">
                  Category: {alloc?.label || q.categoryId} · Target: {formatInr(alloc?.amount ?? 0)}
                </span>
                {q.notes && <p className="text-xs text-[var(--muted-foreground)] mt-1">{q.notes}</p>}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[var(--foreground)]">{formatInr(q.amount)}</span>
                <QuoteBadge comparison={comp} />
                <button
                  type="button"
                  onClick={() => handleDelete(q.id)}
                  aria-label={`Delete quote from ${q.vendorName}`}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-[var(--muted-foreground)] hover:text-[var(--vermilion)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
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
