"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Calculator } from "lucide-react";
import { ToranaBunting, RangoliRing, PaisleyCorner, Diya } from "@/components/motifs";
import { BRAND } from "@/lib/brand";

const headlineWords = "Plan the celebration. We'll keep the numbers honest.".split(" ");

const petals = [
  { id: 1, left: "8%", top: "12%", delay: "0s", duration: "7s" },
  { id: 2, left: "22%", top: "5%", delay: "1.5s", duration: "8s" },
  { id: 3, left: "42%", top: "18%", delay: "3s", duration: "6.5s" },
  { id: 4, left: "68%", top: "8%", delay: "0.8s", duration: "7.5s" },
  { id: 5, left: "85%", top: "15%", delay: "2.2s", duration: "9s" },
  { id: 6, left: "14%", top: "25%", delay: "4s", duration: "8.5s" },
  { id: 7, left: "55%", top: "28%", delay: "5s", duration: "7s" },
  { id: 8, left: "92%", top: "22%", delay: "2.8s", duration: "8s" },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <ToranaBunting className="opacity-90" />

      <div className="relative pointer-events-none" aria-hidden="true">
        {petals.map((p) => (
          <span
            key={p.id}
            className="marigold-petal w-3 h-3 rounded-full bg-[var(--marigold)]"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-20">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--foreground)] leading-[1.1] tracking-tight">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block mr-2.5"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-xl leading-relaxed">
              Weddings, birthdays and community gatherings, budgets and timelines that always add up, vendor questions that protect you.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/new"
                className="min-h-[44px] px-6 py-3 rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 transition-opacity font-semibold text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] shadow-xs"
              >
                <span>Start Planning Your Event</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/sample"
                className="min-h-[44px] px-6 py-3 rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-colors font-medium text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              >
                <span>Explore Verified Sample Plan</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end relative" aria-hidden="true">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
              <RangoliRing size={280} className="opacity-90 text-[var(--gold)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Diya lit={true} size="lg" className="drop-shadow-md" />
              </div>
              <PaisleyCorner position="top-right" size={44} className="absolute top-2 right-2 text-[var(--marigold)]" />
              <PaisleyCorner position="bottom-left" size={44} className="absolute bottom-2 left-2 text-[var(--rose)]" />
            </div>
          </div>
        </section>

        <section aria-labelledby="celebrations-heading" className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-0.5 bg-[var(--accent)]" aria-hidden="true" />
            <h2 id="celebrations-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[var(--foreground)]">
              Celebrations We Build For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-[var(--border)] bg-[var(--card)] relative overflow-hidden space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--rose)]">100–500 Guests</span>
              <h3 className="text-xl font-serif font-bold text-[var(--foreground)]">Weddings</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                Venues, catering tasting, decor, mandap setup, photography milestones, and guest logistics with zero arithmetic drift.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-[var(--border)] bg-[var(--card)] relative overflow-hidden space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--marigold)]">20–100 Guests</span>
              <h3 className="text-xl font-serif font-bold text-[var(--foreground)]">Birthdays</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                Themed spaces, entertainers, custom cakes, and party hampers balanced against exact guest headcounts.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-[var(--border)] bg-[var(--card)] relative overflow-hidden space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--peacock)]">50–300 Guests</span>
              <h3 className="text-xl font-serif font-bold text-[var(--foreground)]">Community Gatherings</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                Municipal permits, community halls, audio equipment, and volunteer coordination with transparent vendor questions.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="principles-heading" className="p-8 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 id="principles-heading" className="text-2xl font-serif font-bold text-[var(--foreground)]">
              AI proposes, code verifies
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              Planning celebration finances requires absolute certainty. Our generative assistant proposes creative touches, but deterministic code calculates every rupee.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--accent)] font-semibold text-sm">
                <Calculator className="w-4 h-4" aria-hidden="true" />
                <span>Deterministic Math</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Integer minor units and largest-remainder distribution ensure allocations always sum to 100%.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--accent)] font-semibold text-sm">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Contextual Ideas</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Gemini suggests vendor questions and personalized themes. Changes apply only when you tap Apply.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--accent)] font-semibold text-sm">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>Private & Local</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                No accounts or external tracking databases. Your celebration data stays safe in your browser.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
