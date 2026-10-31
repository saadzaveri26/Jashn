import { Sparkles, Info, Loader2 } from "lucide-react";

type Props = {
  status: "enriched" | "unavailable" | "loading" | null;
};

export function AiBanner({ status }: Props) {
  if (!status) return null;

  return (
    <div
      role="region"
      aria-live="polite"
      className="w-full my-4 p-3 rounded-lg border text-sm flex items-center gap-3 transition-colors duration-200"
    >
      {status === "loading" && (
        <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
          <Loader2 className="w-4 h-4 animate-spin text-amber-600 dark:text-amber-500" aria-hidden="true" />
          <span>Generating celebration ideas and vendor guidelines...</span>
        </div>
      )}
      {status === "enriched" && (
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <span>AI suggestions customized to your budget and guest list are active.</span>
        </div>
      )}
      {status === "unavailable" && (
        <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
          <Info className="w-4 h-4 text-amber-700 dark:text-amber-400" aria-hidden="true" />
          <span>AI service is currently offline. Verified preset fallbacks are active — all budget, timeline, and quote tools remain 100% functional.</span>
        </div>
      )}
    </div>
  );
}

