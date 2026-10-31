import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface WizardNavProps {
  step: number;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
}

export function WizardNav({ step, onPrev, onNext, onFinish }: WizardNavProps) {
  return (
    <div className="flex justify-between pt-4 border-t border-[var(--border)]">
      {step > 1 ? (
        <button
          type="button"
          onClick={onPrev}
          className="min-h-[44px] px-4 py-2 text-sm font-medium rounded-md border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back</span>
        </button>
      ) : <div />}

      {step < 4 ? (
        <button
          type="button"
          onClick={onNext}
          className="min-h-[44px] px-5 py-2 text-sm font-medium rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 transition-opacity flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onFinish}
          className="min-h-[44px] px-5 py-2 text-sm font-semibold rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 transition-opacity flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        >
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>Create Plan</span>
        </button>
      )}
    </div>
  );
}
