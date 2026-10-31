"use client";

import { Lock, Unlock } from "lucide-react";
import { formatInr } from "@/lib/format";

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
    <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 transition-all">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={`input-${id}`} className="font-medium text-stone-900 dark:text-stone-100 text-sm">
          {label}
        </label>
        <button
          type="button"
          onClick={onToggleLock}
          aria-label={locked ? `Unlock ${label}` : `Lock ${label}`}
          className={`min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-md border text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600 ${
            locked
              ? "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-700"
              : "bg-stone-50 text-stone-600 border-stone-300 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-700"
          }`}
        >
          {locked ? (
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Locked</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Unlock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Unlocked</span>
            </span>
          )}
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
            className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2">
          <span className="text-xs text-stone-500 dark:text-stone-400 w-12 text-right">{pct}%</span>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-xs text-stone-400">₹</span>
            <input
              id={`input-${id}`}
              type="number"
              min={0}
              max={maxRupees}
              value={rupees}
              onChange={(e) => onChangeAmount(Math.max(0, Number(e.target.value)) * 100)}
              className="w-28 pl-6 pr-2 py-1.5 text-right text-sm rounded-md border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

