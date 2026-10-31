import { IntakeWizard } from "@/components/intake-wizard";

export default function NewPlanPage() {
  return (
    <div className="py-10 px-4 max-w-4xl mx-auto space-y-6">
      <div className="text-center max-w-lg mx-auto space-y-2">
        <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-50">
          Create Your Celebration Plan
        </h1>
        <p className="text-xs text-stone-600 dark:text-stone-400">
          Select your event preset, date, and estimated budget to launch your deterministic plan.
        </p>
      </div>
      <IntakeWizard />
    </div>
  );
}

