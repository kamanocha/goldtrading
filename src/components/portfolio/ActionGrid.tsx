"use client";

import Link from "next/link";
import { ShoppingCart, Bell, Users, Package } from "lucide-react";

const ACTIONS = [
  {
    label: "Buy More Gold",
    icon: ShoppingCart,
    href: "/",
    color: "bg-gold-100 text-gold-700",
    ring: "ring-gold-200",
  },
  {
    label: "Set Price Alert",
    icon: Bell,
    href: "#",
    color: "bg-blue-50 text-blue-600",
    ring: "ring-blue-100",
  },
  {
    label: "Invite Friends",
    icon: Users,
    href: "#",
    color: "bg-green-50 text-green-600",
    ring: "ring-green-100",
  },
  {
    label: "Withdraw Gold",
    icon: Package,
    href: "#",
    color: "bg-purple-50 text-purple-600",
    ring: "ring-purple-100",
  },
] as const;

export function ActionGrid() {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-bold text-gold-900">Quick actions</h2>
      <div className="grid grid-cols-4 gap-2">
        {ACTIONS.map(({ label, icon: Icon, href, color, ring }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center gap-2 rounded-xl bg-white border border-gold-100 p-3 hover:shadow-sm transition-all active:scale-95"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ring-2 ${color} ${ring}`}
            >
              <Icon size={18} />
            </div>
            <span className="text-center text-xs font-medium text-gold-700 leading-tight">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
