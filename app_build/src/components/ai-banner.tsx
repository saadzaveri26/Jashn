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
      className="w-full my-4 p-3 rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm flex items-center gap-3 transition-colors duration-200"
    >
      {status === "loading" && (
        <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
          <Loader2 className="w-4 h-4 animate-spin text-[var(--accent)]" aria-hidden="true" />
          <span>Generating celebration ideas and vendor guidelines...</span>
        </div>
      )}
      {status === "enriched" && (
        <div className="flex items-center gap-2 text-[var(--leaf)] font-medium">
          <Sparkles className="w-4 h-4 text-[var(--leaf)]" aria-hidden="true" />
          <span>AI suggestions customized to your budget and guest list are active.</span>
        </div>
      )}
      {status === "unavailable" && (
        <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
          <Info className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />
          <span>AI service is currently offline. Verified preset fallbacks are active — all budget, timeline, and quote tools remain 100% functional.</span>
        </div>
      )}
    </div>
  );
}
