"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    void error;
  }, [error]);

  return (
    <div className="py-24 px-4 text-center max-w-md mx-auto space-y-4">
      <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-400 mx-auto">
        <AlertCircle className="w-6 h-6" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-50">
        Something went wrong
      </h2>
      <p className="text-sm text-stone-600 dark:text-stone-400">
        An unexpected error occurred while loading this view. Your saved plan data remains safe.
      </p>
      <div className="pt-2">
        <button
          type="button"
          onClick={() => reset()}
          className="min-h-[44px] px-5 py-2 text-sm font-medium rounded-md bg-amber-700 text-amber-50 hover:bg-amber-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600 font-semibold"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

