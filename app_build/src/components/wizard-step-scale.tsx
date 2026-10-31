import type { CityTier } from "@/engine/schemas";

type Props = {
  guests: number;
  tier: CityTier;
  budgetRupees: number;
  onChangeGuests: (g: number) => void;
  onChangeTier: (t: CityTier) => void;
  onChangeBudget: (b: number) => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
};

export function WizardStepScale({
  guests,
  tier,
  budgetRupees,
  onChangeGuests,
  onChangeTier,
  onChangeBudget,
  headingRef,
}: Props) {
  return (
    <div className="space-y-4">
      <h2 ref={headingRef} tabIndex={-1} className="text-xl font-serif text-stone-900 dark:text-stone-50 outline-none">
        Scale & Budget
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="w-guests" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Guest Count</label>
          <input
            id="w-guests"
            type="number"
            min={1}
            max={10000}
            value={guests}
            onChange={(e) => onChangeGuests(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-md border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>
        <div>
          <label htmlFor="w-tier" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">City Tier</label>
          <select
            id="w-tier"
            value={tier}
            onChange={(e) => onChangeTier(e.target.value as CityTier)}
            className="w-full px-3 py-2 rounded-md border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
          >
            <option value="tier-1">Tier 1 (Metro / Major City)</option>
            <option value="tier-2">Tier 2 (Regional Capital)</option>
            <option value="tier-3">Tier 3 (Town / Local)</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="w-budget" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Total Budget (₹)</label>
          <input
            id="w-budget"
            type="number"
            min={1000}
            step={5000}
            value={budgetRupees}
            onChange={(e) => onChangeBudget(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-md border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>
      </div>
    </div>
  );
}

