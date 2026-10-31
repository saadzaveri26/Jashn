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
      <div className="w-12 h-12 rounded-full bg-[var(--surface-muted)] flex items-center justify-center text-[var(--vermilion)] mx-auto">
        <AlertCircle className="w-6 h-6" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-serif font-bold text-[var(--foreground)]">
        Something went wrong
      </h2>
      <p className="text-sm text-[var(--muted-foreground)]">
        An unexpected error occurred while loading this celebration view. Your saved plan data remains safe.
      </p>
      <div className="pt-2">
        <button
          type="button"
          onClick={() => reset()}
          className="min-h-[44px] px-5 py-2 text-sm font-semibold rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
