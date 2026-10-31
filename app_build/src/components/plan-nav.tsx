"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wallet, Calendar, Users, Lightbulb, MessageSquare } from "lucide-react";

const links = [
  { href: "/plan", label: "Overview", icon: LayoutDashboard },
  { href: "/plan/budget", label: "Budget", icon: Wallet },
  { href: "/plan/timeline", label: "Timeline", icon: Calendar },
  { href: "/plan/vendors", label: "Vendors & Quotes", icon: Users },
  { href: "/plan/ideas", label: "Ideas", icon: Lightbulb },
  { href: "/plan/assistant", label: "Assistant", icon: MessageSquare },
];

export function PlanNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Plan sections" className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 backdrop-blur-xs">
      <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto py-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 px-3.5 py-2.5 min-h-[44px] text-sm font-medium rounded-md whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600 ${
                isActive
                  ? "bg-amber-100/70 text-amber-950 dark:bg-amber-950/80 dark:text-amber-200"
                  : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

