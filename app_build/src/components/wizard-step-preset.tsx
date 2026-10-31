import { getPreset } from "@/engine/presets";
import type { PresetId } from "@/engine/schemas";
import { PaisleyCorner, RangoliRing, Diya } from "@/components/motifs";

type Props = {
  preset: PresetId;
  onSelect: (p: PresetId) => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
};

export function WizardStepPreset({ preset, onSelect, headingRef }: Props) {
  const presets: PresetId[] = ["wedding", "birthday", "community"];

  return (
    <div className="space-y-4">
      <h2 ref={headingRef} tabIndex={-1} className="text-xl font-serif text-[var(--foreground)] outline-none">
        Choose Celebration Type
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {presets.map((p) => {
          const isSelected = preset === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onSelect(p)}
              className={`group relative min-h-[96px] p-4 text-left rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--ring)] overflow-hidden ${
                isSelected
                  ? "bg-[var(--surface-muted)] border-[var(--accent)] text-[var(--foreground)] ring-1 ring-[var(--accent)]"
                  : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)] text-[var(--foreground)]"
              }`}
            >
              <div className="relative z-10">
                <span className="block font-serif text-lg font-bold capitalize">{p}</span>
                <span className="text-xs text-[var(--muted-foreground)] capitalize">{getPreset(p).categories.length} categories</span>
              </div>
              <div className="absolute right-2 bottom-2 opacity-30 group-hover:opacity-70 group-hover:scale-110 group-focus:scale-110 transition-all pointer-events-none" aria-hidden="true">
                {p === "wedding" && <PaisleyCorner size={36} />}
                {p === "birthday" && <RangoliRing size={36} />}
                {p === "community" && <Diya size="sm" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
