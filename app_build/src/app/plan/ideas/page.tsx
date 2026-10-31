"use client";

import { useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import { IdeaCard } from "@/components/idea-card";
import { usePlan } from "@/hooks/use-plan";

export default function PlanIdeasPage() {
  const { plan, updatePlan } = usePlan();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (!plan) return null;

  const handleEnrich = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/enrich", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          preset: plan.intake.preset,
          eventName: plan.intake.eventName,
          guests: plan.intake.guests,
          cityTier: plan.intake.cityTier,
          allocations: plan.allocations,
        }),
      });
      const data = await res.json();
      updatePlan({
        ...plan,
        ideas: data.ideas || plan.ideas,
        vendorGuide: {
          questions: data.questions || plan.vendorGuide?.questions || [],
          redFlags: data.redFlags || plan.vendorGuide?.redFlags || [],
        },
        ai: data.ai || "unavailable",
      });
    } catch {
      setError("AI service unavailable. Preset ideas remain active.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
            Personalized Celebration Ideas
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Creative touches categorized by relative cost bands and matched with category allocations.
          </p>
        </div>
        <button
          type="button"
          onClick={handleEnrich}
          disabled={loading}
          className="min-h-[44px] px-4 py-2 text-xs font-medium rounded-md bg-amber-700 text-amber-50 hover:bg-amber-800 disabled:opacity-50 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-600 self-start sm:self-center font-semibold"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
          <span>{loading ? "Generating Ideas..." : "Refresh AI Ideas"}</span>
        </button>
      </div>

      {error && (
        <div role="alert" className="p-3 text-xs rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" aria-label="Celebration ideas grid">
        {plan.ideas.map((idea, idx) => {
          const alloc = plan.allocations.find((a) => a.categoryId === idea.categoryId);
          return <IdeaCard key={idx} idea={idea} allocation={alloc} />;
        })}
      </div>
    </div>
  );
}

