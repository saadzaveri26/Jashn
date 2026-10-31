"use client";

import { Pause, Play } from "lucide-react";
import { useMotionContext } from "./motion-provider";

export function PauseToggle() {
  const { isPaused, togglePaused } = useMotionContext();

  return (
    <button
      type="button"
      onClick={togglePaused}
      aria-pressed={isPaused}
      aria-label={isPaused ? "Resume animations" : "Pause animations"}
      title={isPaused ? "Resume ambient animations" : "Pause ambient animations"}
      className="min-h-[44px] min-w-[44px] p-2.5 rounded-md flex items-center justify-center text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600"
    >
      {isPaused ? (
        <Play className="w-4 h-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
      ) : (
        <Pause className="w-4 h-4 text-stone-700 dark:text-stone-300" aria-hidden="true" />
      )}
    </button>
  );
}

