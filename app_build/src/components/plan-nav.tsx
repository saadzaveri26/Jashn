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
    <nav aria-label="Plan sections" className="border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-xs">
      <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto py-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 px-3.5 py-2.5 min-h-[44px] text-sm font-medium rounded-md whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)] ${
                isActive
                  ? "bg-[var(--surface-muted)] text-[var(--accent)] font-semibold"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
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
