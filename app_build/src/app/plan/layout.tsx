"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { PlusCircle, Calendar, Users, Wallet } from "lucide-react";
import { ExportMenu } from "@/components/export-menu";
import { FeasibilityBadge } from "@/components/feasibility-badge";
import { PlanNav } from "@/components/plan-nav";
import { usePlan } from "@/hooks/use-plan";
import { formatDate, formatInr } from "@/lib/format";

const CelebrationBurst = dynamic(
  () => import("@/components/celebration-burst").then((m) => m.CelebrationBurst),
  { ssr: false }
);

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  const { plan } = usePlan();
  const [showBurst, setShowBurst] = useState(false);
  const wasCompleteRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("burst=sample")) {
      setShowBurst(true);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (!plan || plan.tasks.length === 0) return;
    const isComplete = plan.tasks.every((t) => t.done);
    if (isComplete && !wasCompleteRef.current) {
      setShowBurst(true);
    }
    wasCompleteRef.current = isComplete;
  }, [plan]);

  if (!plan) {
    return (
      <div className="py-20 px-4 text-center max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">
          No Active Plan Found
        </h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          Start a new plan or load our verified wedding sample to begin organizing.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            href="/new"
            className="min-h-[44px] px-4 py-2 text-sm font-semibold rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 transition-opacity flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
          >
            <PlusCircle className="w-4 h-4" aria-hidden="true" />
            <span>Create Plan</span>
          </Link>
          <Link
            href="/sample"
            className="min-h-[44px] px-4 py-2 text-sm font-medium rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
          >
            <span>Load Sample</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div data-theme={plan.intake.preset} className="space-y-4 pb-16">
      {showBurst && <CelebrationBurst onComplete={() => setShowBurst(false)} />}
      <div className="border-b border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-xs py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--surface-muted)] text-[var(--accent)] border border-[var(--border)]">
                {plan.intake.preset}
              </span>
              {plan.feasibility && <FeasibilityBadge verdict={plan.feasibility} />}
            </div>
            <p className="text-2xl font-serif font-bold text-[var(--foreground)]">
              {plan.intake.eventName}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--muted-foreground)] pt-1">
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
