export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--foreground)] focus:text-[var(--background)] focus:ring-2 focus:ring-[var(--ring)] focus:outline-none focus:rounded-sm text-sm font-semibold"
    >
      Skip to main content
    </a>
  );
}
