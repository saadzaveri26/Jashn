"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createSamplePlan } from "@/lib/sample-plan";
import { setStoredPlan } from "@/lib/storage";

export default function SamplePage() {
  const router = useRouter();

  useEffect(() => {
    const sample = createSamplePlan();
    setStoredPlan(sample);
    router.replace("/plan?burst=sample");
  }, [router]);

  return (
    <div className="py-24 px-4 text-center max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">
        Preparing Verified Sample Plan...
      </h1>
      <div role="status" aria-live="polite" className="flex items-center justify-center gap-2 text-[var(--muted-foreground)] text-xs">
        <Loader2 className="w-5 h-5 animate-spin text-[var(--accent)]" aria-hidden="true" />
        <span>Initializing Aarav & Diya Wedding celebration model...</span>
      </div>
    </div>
  );
}
