"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">
            Personalized Celebration Ideas
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">
            Creative touches categorized by relative cost bands and matched with category allocations.
          </p>
        </div>
        <button
          type="button"
          onClick={handleEnrich}
          disabled={loading}
          className="min-h-[44px] px-4 py-2 text-xs font-semibold rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] self-start sm:self-center"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
          <span>{loading ? "Generating Ideas..." : "Refresh AI Ideas"}</span>
        </button>
      </div>

      {error && (
        <div role="alert" className="p-3 text-xs rounded-md bg-[var(--surface-muted)] text-[var(--vermilion)] border border-[var(--vermilion)]">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" aria-label="Celebration ideas grid">
        {plan.ideas.map((idea, idx) => {
          const alloc = plan.allocations.find((a) => a.categoryId === idea.categoryId);
          return <IdeaCard key={idx} index={idx} idea={idea} allocation={alloc} />;
        })}
      </div>
    </motion.div>
  );
}
