import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
      <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">
        Page Not Found
      </h1>
      <p className="text-sm text-stone-600 dark:text-stone-400">
        The celebration page you are looking for does not exist or has been moved.
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2 text-sm font-medium rounded-md bg-amber-700 text-amber-50 hover:bg-amber-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Return to Planning</span>
        </Link>
      </div>
    </div>
  );
}

