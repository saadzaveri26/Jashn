type Props = {
  name: string;
  date: string;
  onChangeName: (v: string) => void;
  onChangeDate: (v: string) => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
};

export function WizardStepDetails({ name, date, onChangeName, onChangeDate, headingRef }: Props) {
  return (
    <div className="space-y-4">
      <h2 ref={headingRef} tabIndex={-1} className="text-xl font-serif text-stone-900 dark:text-stone-50 outline-none">
        Event Name & Date
      </h2>
      <div className="space-y-3">
        <div>
          <label htmlFor="w-name" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Celebration Name</label>
          <input
            id="w-name"
            type="text"
            placeholder="e.g. Aarav & Diya Wedding"
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
            required
          />
        </div>
        <div>
          <label htmlFor="w-date" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Target Date</label>
          <input
            id="w-date"
            type="date"
            value={date}
            onChange={(e) => onChangeDate(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
            required
          />
        </div>
      </div>
    </div>
  );
}

