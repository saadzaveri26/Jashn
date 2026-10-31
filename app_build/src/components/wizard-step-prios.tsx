import { Check } from "lucide-react";
import type { PresetData } from "@/engine/presets";

type Props = {
  presetData: PresetData;
  prios: string[];
  onTogglePrio: (catId: string) => void;
  error: string | null;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
};

export function WizardStepPrios({
  presetData,
  prios,
  onTogglePrio,
  error,
  headingRef,
}: Props) {
  return (
    <div className="space-y-4">
      <h2 ref={headingRef} tabIndex={-1} className="text-xl font-serif text-[var(--foreground)] outline-none">
        Priority Categories (Optional, pick up to 3)
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {presetData.categories.map((c) => {
          const selected = prios.includes(c.id);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onTogglePrio(c.id)}
              className={`min-h-[44px] p-2.5 text-xs font-medium rounded-md border transition-all text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[var(--ring)] ${
                selected
                  ? "bg-[var(--surface-muted)] border-[var(--accent)] text-[var(--foreground)]"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              <span>{c.label}</span>
              {selected && <Check className="w-3.5 h-3.5 text-[var(--accent)]" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      {error && <div role="alert" className="text-xs text-[var(--vermilion)] font-medium">{error}</div>}
    </div>
  );
}
