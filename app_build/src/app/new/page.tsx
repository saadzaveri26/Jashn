import { IntakeWizard } from "@/components/intake-wizard";

export default function NewPlanPage() {
  return (
    <div className="py-10 px-4 max-w-4xl mx-auto space-y-6">
      <div className="text-center max-w-lg mx-auto space-y-2">
        <h1 className="text-3xl font-serif font-bold text-[var(--foreground)]">
          Create Your Celebration Plan
        </h1>
        <p className="text-sm text-[var(--muted-foreground)]">
          Select your celebration type, date, and budget to begin your exact plan.
        </p>
      </div>
      <IntakeWizard />
    </div>
  );
}
