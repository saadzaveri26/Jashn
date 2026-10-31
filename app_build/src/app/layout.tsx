import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { Sparkles } from "lucide-react";
import { SkipLink } from "@/components/skip-link";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { BRAND } from "@/lib/brand";
import "./globals.css";

const serifFont = localFont({
  src: "../fonts/rozha-one-latin.woff2",
  variable: "--font-serif",
  display: "swap",
});

const sansFont = localFont({
  src: "../fonts/plus-jakarta-sans-latin.woff2",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND} — GenAI Celebration & Event Planner`,
  description: "Deterministic budgeting, backward timelines, and AI-powered ideas for weddings, birthdays, and community events.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable}`}>
      <body className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
        <ThemeProvider>
          <SkipLink />
          <header className="border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-xs sticky top-0 z-40">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-serif font-bold text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] rounded-sm"
                aria-label={`${BRAND} Home`}
              >
                <Sparkles className="w-5 h-5 text-[var(--accent)]" aria-hidden="true" />
                <span>{BRAND}</span>
              </Link>

              <nav aria-label="Main navigation" className="flex items-center gap-3">
                <Link
                  href="/sample"
                  className="min-h-[44px] px-3.5 py-2 text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center focus:outline-none focus:ring-2 focus:ring-[var(--ring)] rounded-md"
                >
                  Sample Plan
                </Link>
                <Link
                  href="/new"
                  className="min-h-[44px] px-4 py-2 text-xs font-semibold rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 transition-opacity flex items-center focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                >
                  Start Planning
                </Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>

          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>

          <footer className="border-t border-[var(--border)] py-8 bg-[var(--card)] text-xs text-[var(--muted-foreground)]">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>© 2026 {BRAND} · AI proposes, code verifies.</p>
              <p>Deterministic calculations run locally in your browser.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
