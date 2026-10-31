import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="py-24 px-4 text-center max-w-md mx-auto space-y-4">
      <div role="status" aria-live="polite" className="flex items-center justify-center gap-2 text-stone-600 dark:text-stone-400 text-sm">
        <Loader2 className="w-5 h-5 animate-spin text-amber-600 dark:text-amber-500" aria-hidden="true" />
        <span>Loading celebration ideas...</span>
      </div>
    </div>
  );
}

