"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, CalendarDays } from "lucide-react";
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

  const today = new Date().toISOString().slice(0, 10);
  const diffMs = new Date(plan.intake.eventDate).getTime() - new Date(today).getTime();
  const daysLeft = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  const daysDigits = String(daysLeft).padStart(2, "0").split("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">
          Celebration Dashboard
        </h1>

        <div className="flex items-center gap-2 p-2 px-3 rounded-lg border border-[var(--border)] bg-[var(--card)]">
          <CalendarDays className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />
          <span className="text-xs text-[var(--muted-foreground)]">Days to Celebration:</span>
          <div className="flex items-center gap-1 font-mono font-bold text-sm">
            {daysDigits.map((d, i) => (
              <motion.span
                key={`${i}-${d}`}
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.35, delay: i * 0.1 }}
                className="inline-block px-1.5 py-0.5 rounded-sm bg-[var(--surface-muted)] text-[var(--foreground)]"
              >
                {d}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      <AiBanner status={plan.ai} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)]">
          <span className="text-xs text-[var(--muted-foreground)] block">Total Budget</span>
          <span className="text-xl font-bold font-serif text-[var(--foreground)] block mt-1">
            {formatInr(totalAlloc)}
          </span>
          <span className="text-xs text-[var(--muted-foreground)] block mt-1">{plan.allocations.length} categories</span>
        </div>

        <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)]">
          <span className="text-xs text-[var(--muted-foreground)] block">Timeline Tasks</span>
          <span className="text-xl font-bold font-serif text-[var(--foreground)] block mt-1">
            {doneTasks} / {plan.tasks.length}
          </span>
          <span className="text-xs text-[var(--leaf)] block mt-1">Completed</span>
        </div>

        <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)]">
          <span className="text-xs text-[var(--muted-foreground)] block">Quotes Logged</span>
          <span className="text-xl font-bold font-serif text-[var(--foreground)] block mt-1">
            {plan.quotes.length}
          </span>
          <span className="text-xs text-[var(--muted-foreground)] block mt-1">{formatInr(quotesTotal)} total</span>
        </div>

        <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)]">
          <span className="text-xs text-[var(--muted-foreground)] block">At-Risk Lead Times</span>
          <span className="text-xl font-bold font-serif text-[var(--foreground)] block mt-1">
            {atRiskTasks.length}
          </span>
          <span className="text-xs text-[var(--marigold)] block mt-1">Compressed deadlines</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <section aria-labelledby="tasks-preview-heading" className="p-5 rounded-lg border border-[var(--border)] bg-[var(--card)] space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="tasks-preview-heading" className="font-serif font-semibold text-lg text-[var(--foreground)]">
              Immediate Tasks
            </h2>
            <Link href="/plan/timeline" className="text-xs text-[var(--accent)] hover:opacity-80 font-medium flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] rounded-sm">
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
          <ul className="space-y-2 text-sm">
            {plan.tasks.slice(0, 4).map((t) => (
              <li key={t.id} className="flex items-center justify-between p-2 rounded-md bg-[var(--surface-muted)]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[var(--muted-foreground)]" aria-hidden="true" />
                  <span className={`text-xs ${t.done ? "line-through text-[var(--muted-foreground)]" : "text-[var(--foreground)]"}`}>{t.title}</span>
                </div>
                <span className="text-xs text-[var(--muted-foreground)]">{formatDate(t.due)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="alloc-preview-heading" className="p-5 rounded-lg border border-[var(--border)] bg-[var(--card)] space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="alloc-preview-heading" className="font-serif font-semibold text-lg text-[var(--foreground)]">
              Top Category Allocations
            </h2>
            <Link href="/plan/budget" className="text-xs text-[var(--accent)] hover:opacity-80 font-medium flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] rounded-sm">
              <span>Manage budget</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
          <ul className="space-y-2 text-sm">
            {plan.allocations.slice(0, 4).map((a) => (
              <li key={a.categoryId} className="flex items-center justify-between p-2 rounded-md bg-[var(--surface-muted)]">
                <span className="text-xs font-medium text-[var(--foreground)]">{a.label}</span>
                <span className="text-xs font-semibold text-[var(--foreground)]">{formatInr(a.amount)} ({a.pct}%)</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </motion.div>
  );
}
