"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label="Toggle evening celebration theme"
      className="min-h-[44px] min-w-[44px] p-2.5 rounded-md flex items-center justify-center text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4 text-stone-700" aria-hidden="true" />
      )}
    </button>
  );
}

