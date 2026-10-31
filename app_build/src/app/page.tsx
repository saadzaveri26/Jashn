import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Calculator, Clock, Users } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function HomePage() {
  return (
    <div className="space-y-16 py-12 px-4 max-w-6xl mx-auto">
      <section className="text-center max-w-3xl mx-auto space-y-6 pt-8">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-50 leading-tight">
          Celebrate with elegance and mathematical precision.
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
          {BRAND} pairs creative generative ideas with a strict deterministic engine. Plan weddings, birthdays, and community gatherings with zero arithmetic errors and transparent vendor guidance.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/new"
            className="min-h-[44px] px-6 py-3 rounded-lg bg-amber-700 text-amber-50 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 transition-all font-semibold text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-600 shadow-sm"
          >
            <span>Start Planning Your Event</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            href="/sample"
            className="min-h-[44px] px-6 py-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all font-medium text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
          >
            <span>Explore Verified Sample Plan</span>
          </Link>
        </div>
      </section>

      <section aria-labelledby="principles-heading" className="space-y-8 pt-8 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-2xl">
          <h2 id="principles-heading" className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
            AI Proposes. Code Verifies.
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            Why event planning requires an uncompromising separation between creative AI and exact financial code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <Calculator className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-serif font-semibold text-lg text-stone-900 dark:text-stone-100">Deterministic Engine</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Every single rupee and date is computed with integer arithmetic and largest-remainder distribution. The model is never asked to sum numbers or count calendar days.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <Sparkles className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-serif font-semibold text-lg text-stone-900 dark:text-stone-100">Contextual Intelligence</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Gemini provides contextual ideas, red flags, and vendor negotiation checklists. AI proposals only touch your plan when you explicitly tap Apply.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-serif font-semibold text-lg text-stone-900 dark:text-stone-100">Private & Local-First</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              No accounts, no external tracking database. Your plans persist in your browser with full JSON export, .ics calendar integration, and offline fallbacks.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="events-heading" className="space-y-6 pt-8 border-t border-stone-200 dark:border-stone-800">
        <h2 id="events-heading" className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
          Tailored Event Presets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="p-5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40">
            <h3 className="font-serif font-semibold text-base text-stone-900 dark:text-stone-100">Weddings</h3>
            <p className="text-xs text-stone-500 mt-1">100–500 guests · Venues, catering tasting, decor, photography, mandap, and guest logistics.</p>
          </div>
          <div className="p-5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40">
            <h3 className="font-serif font-semibold text-base text-stone-900 dark:text-stone-100">Birthdays</h3>
            <p className="text-xs text-stone-500 mt-1">20–100 guests · Themed spaces, custom cakes, interactive entertainers, and party hampers.</p>
          </div>
          <div className="p-5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40">
            <h3 className="font-serif font-semibold text-base text-stone-900 dark:text-stone-100">Community Gatherings</h3>
            <p className="text-xs text-stone-500 mt-1">50–300 guests · Municipal permits, community halls, public address audio, and volunteer safety.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

