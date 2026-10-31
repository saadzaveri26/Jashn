"use client";

import { motion } from "framer-motion";
import { Lock, Unlock } from "lucide-react";

type Props = {
  id: string;
  label: string;
  amount: number;
  pct: number;
  totalBudget: number;
  locked: boolean;
  onToggleLock: () => void;
  onChangeAmount: (newPaise: number) => void;
};

export function WhatIfSlider({
  id,
  label,
  amount,
  pct,
  totalBudget,
  locked,
  onToggleLock,
  onChangeAmount,
}: Props) {
  const rupees = Math.floor(amount / 100);
  const maxRupees = Math.floor(totalBudget / 100);

  return (
    <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] transition-all">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={`input-${id}`} className="font-medium text-[var(--foreground)] text-sm">
          {label}
        </label>
        <button
          type="button"
          onClick={onToggleLock}
          aria-label={locked ? `Unlock ${label}` : `Lock ${label}`}
          className={`min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-md border text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)] ${
            locked
              ? "bg-[var(--surface-muted)] text-[var(--accent)] border-[var(--accent)]"
              : "bg-[var(--card)] text-[var(--muted-foreground)] border-[var(--border)] hover:text-[var(--foreground)]"
          }`}
        >
          <motion.span
            animate={{ rotate: locked ? [0, -15, 0] : 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-1.5"
          >
            {locked ? (
              <>
                <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Locked</span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Unlocked</span>
              </>
            )}
          </motion.span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
        <div>
          <label htmlFor={`slider-${id}`} className="sr-only">
            {label} budget slider
          </label>
          <input
            id={`slider-${id}`}
            type="range"
            min={0}
            max={maxRupees}
            step={100}
            value={rupees}
            onChange={(e) => onChangeAmount(Number(e.target.value) * 100)}
            className="w-full h-2 bg-[var(--surface-muted)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2">
          <span className="text-xs text-[var(--muted-foreground)] w-12 text-right">{pct}%</span>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-xs text-[var(--muted-foreground)]">₹</span>
            <input
              id={`input-${id}`}
              type="number"
              min={0}
              max={maxRupees}
              value={rupees}
              onChange={(e) => onChangeAmount(Math.max(0, Number(e.target.value)) * 100)}
              className="w-28 pl-6 pr-2 py-1.5 text-right text-sm rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
