"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { allocateBudget } from "@/engine/allocate";
import { checkFeasibility } from "@/engine/feasibility";
import { getPreset } from "@/engine/presets";
import { buildTimeline } from "@/engine/timeline";
import type { CityTier, Intake, Plan, PresetId } from "@/engine/schemas";
import { setStoredPlan } from "@/lib/storage";
import { WizardStepPreset } from "./wizard-step-preset";
import { WizardStepDetails } from "./wizard-step-details";
import { WizardStepScale } from "./wizard-step-scale";
import { WizardStepPrios } from "./wizard-step-prios";
import { WizardNav } from "./wizard-nav";

export function IntakeWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [preset, setPreset] = useState<PresetId>("wedding");
  const [name, setName] = useState("");
  const [date, setDate] = useState("2026-11-20");
  const [guests, setGuests] = useState(200);
  const [budgetRupees, setBudgetRupees] = useState(1500000);
  const [tier, setTier] = useState<CityTier>("tier-2");
  const [prios, setPrios] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const presetData = getPreset(preset);

  const togglePrio = (catId: string) => {
    if (prios.includes(catId)) {
      setPrios(prios.filter((p) => p !== catId));
    } else if (prios.length < 3) {
      setPrios([...prios, catId]);
    }
  };

  const handleFinish = () => {
    const totalMinor = budgetRupees * 100;
    const today = new Date().toISOString().slice(0, 10);
    const alloc = allocateBudget({ totalMinor, preset, guests, priorities: prios, locks: new Map() });
    if (!alloc.ok) {
      setError(alloc.reason);
      return;
    }
    const time = buildTimeline({ eventDate: date, today, preset });
    const feas = checkFeasibility({ preset, totalMinor, guests, cityTier: tier });
    const intake: Intake = { preset, eventName: name.trim() || `${preset.toUpperCase()} Celebration`, eventDate: date, guests, totalBudget: totalMinor, cityTier: tier, priorities: prios, currency: "INR" };
    const plan: Plan = {
      id: `plan-${Date.now().toString(36)}`,
      version: 1,
      schemaVersion: 1,
      intake,
      allocations: alloc.allocations,
      tasks: time.tasks,
      quotes: [],
      ideas: presetData.fallbackIdeas,
      vendorGuide: { questions: presetData.fallbackQuestions, redFlags: presetData.fallbackRedFlags },
      feasibility: feas,
      createdAt: today,
      updatedAt: today,
      ai: null,
    };
    setStoredPlan(plan);
    router.push("/plan");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
      <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-100 dark:border-stone-800 pb-3">
        <span>Step {step} of 4</span>
        <span>{preset.toUpperCase()}</span>
      </div>

      {step === 1 && (
        <WizardStepPreset
          preset={preset}
          onSelect={(p) => { setPreset(p); setPrios([]); }}
          headingRef={headingRef}
        />
      )}

      {step === 2 && (
        <WizardStepDetails
          name={name}
          date={date}
          onChangeName={setName}
          onChangeDate={setDate}
          headingRef={headingRef}
        />
      )}

      {step === 3 && (
        <WizardStepScale
          guests={guests}
          tier={tier}
          budgetRupees={budgetRupees}
          onChangeGuests={setGuests}
          onChangeTier={setTier}
          onChangeBudget={setBudgetRupees}
          headingRef={headingRef}
        />
      )}

      {step === 4 && (
        <WizardStepPrios
          presetData={presetData}
          prios={prios}
          onTogglePrio={togglePrio}
          error={error}
          headingRef={headingRef}
        />
      )}

      <WizardNav
        step={step}
        onPrev={() => setStep(step - 1)}
        onNext={() => setStep(step + 1)}
        onFinish={handleFinish}
      />
    </div>
  );
}
