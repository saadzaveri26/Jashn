import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Diya } from "@/components/motifs";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
      <div className="flex justify-center" aria-hidden="true">
        <Diya lit={false} size="lg" />
      </div>
      <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">
        Celebration Page Not Found
      </h1>
      <p className="text-sm text-[var(--muted-foreground)]">
        The celebration page you are looking for does not exist or has been moved.
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2 text-sm font-semibold rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Return to Planning</span>
        </Link>
      </div>
    </div>
  );
}
