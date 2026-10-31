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
      <h2 ref={headingRef} tabIndex={-1} className="text-xl font-serif text-[var(--foreground)] outline-none">
        Event Name & Date
      </h2>
      <div className="space-y-3">
        <div>
          <label htmlFor="w-name" className="block text-sm font-medium text-[var(--foreground)] mb-1">
            Celebration Name
          </label>
          <input
            id="w-name"
            type="text"
            placeholder="e.g. Aarav & Diya Wedding"
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            required
          />
        </div>
        <div>
          <label htmlFor="w-date" className="block text-sm font-medium text-[var(--foreground)] mb-1">
            Target Date
          </label>
          <input
            id="w-date"
            type="date"
            value={date}
            onChange={(e) => onChangeDate(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            required
          />
        </div>
      </div>
    </div>
  );
}
