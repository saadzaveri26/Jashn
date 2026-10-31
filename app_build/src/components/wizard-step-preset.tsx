import { getPreset } from "@/engine/presets";
import type { PresetId } from "@/engine/schemas";

type Props = {
  preset: PresetId;
  onSelect: (p: PresetId) => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
};

export function WizardStepPreset({ preset, onSelect, headingRef }: Props) {
  const presets: PresetId[] = ["wedding", "birthday", "community"];

  return (
    <div className="space-y-4">
      <h2 ref={headingRef} tabIndex={-1} className="text-xl font-serif text-stone-900 dark:text-stone-50 outline-none">
        Choose Celebration Type
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onSelect(p)}
            className={`min-h-[64px] p-4 text-left rounded-lg border font-medium capitalize transition-all focus:outline-none focus:ring-2 focus:ring-amber-600 ${
              preset === p
                ? "bg-amber-50 border-amber-500 text-amber-950 dark:bg-amber-950 dark:border-amber-600 dark:text-amber-100 ring-1 ring-amber-500"
                : "border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700"
            }`}
          >
            <span className="block font-serif text-base">{p}</span>
            <span className="text-xs text-stone-500 capitalize">{getPreset(p).categories.length} categories</span>
          </button>
        ))}
      </div>
    </div>
  );
}

