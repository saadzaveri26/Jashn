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
      <h2 ref={headingRef} tabIndex={-1} className="text-xl font-serif text-stone-900 dark:text-stone-50 outline-none">
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
              className={`min-h-[44px] p-2.5 text-xs font-medium rounded-md border transition-all text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-amber-600 ${
                selected
                  ? "bg-amber-100 border-amber-400 text-amber-950 dark:bg-amber-950 dark:text-amber-100"
                  : "border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300"
              }`}
            >
              <span>{c.label}</span>
              {selected && <Check className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      {error && <div role="alert" className="text-xs text-rose-600">{error}</div>}
    </div>
  );
}

