import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface WizardNavProps {
  step: number;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
}

export function WizardNav({ step, onPrev, onNext, onFinish }: WizardNavProps) {
  return (
    <div className="flex justify-between pt-4 border-t border-stone-100 dark:border-stone-800">
      {step > 1 ? (
        <button
          type="button"
          onClick={onPrev}
          className="min-h-[44px] px-4 py-2 text-sm font-medium rounded-md border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-600"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back</span>
        </button>
      ) : <div />}

      {step < 4 ? (
        <button
          type="button"
          onClick={onNext}
          className="min-h-[44px] px-5 py-2 text-sm font-medium rounded-md bg-amber-700 text-amber-50 hover:bg-amber-800 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-600"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onFinish}
          className="min-h-[44px] px-5 py-2 text-sm font-medium rounded-md bg-amber-700 text-amber-50 hover:bg-amber-800 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-600 font-semibold"
        >
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>Create Plan</span>
        </button>
      )}
    </div>
  );
}

