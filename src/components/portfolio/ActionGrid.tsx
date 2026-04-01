"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusCircle, Bell, TrendingDown, Package } from "lucide-react";

interface ToastState {
  visible: boolean;
  message: string;
}

const ACTIONS = [
  {
    label: "Buy More",
    icon: PlusCircle,
    href: "/",
    comingSoon: false,
  },
  {
    label: "Price Alert",
    icon: Bell,
    href: null,
    comingSoon: true,
  },
  {
    label: "Sell Gold",
    icon: TrendingDown,
    href: null,
    comingSoon: false,
  },
  {
    label: "Physical Gold",
    icon: Package,
    href: null,
    comingSoon: true,
  },
] as const;

export function ActionGrid() {
  const [toast, setToast] = useState<ToastState>({ visible: false, message: "" });

  const showToast = (label: string) => {
    setToast({ visible: true, message: `${label} — coming soon` });
    setTimeout(() => setToast({ visible: false, message: "" }), 2200);
  };

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
        Quick actions
      </p>

      <div className="grid grid-cols-4 gap-2">
        {ACTIONS.map(({ label, icon: Icon, href, comingSoon }) => {
          const inner = (
            <div className="h-full bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 ring-1 ring-gold-100 hover:ring-amber-200 hover:shadow-sm transition-all active:scale-95">
              <Icon size={24} className="text-amber-600" strokeWidth={1.75} />
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                {label}
              </span>
            </div>
          );

          if (comingSoon) {
            return (
              <button key={label} onClick={() => showToast(label)} className="text-left h-full w-full">
                {inner}
              </button>
            );
          }

          if (href) {
            return (
              <Link key={label} href={href} className="h-full">
                {inner}
              </Link>
            );
          }

          return (
            <button key={label} className="text-left h-full w-full">
              {inner}
            </button>
          );
        })}
      </div>

      {/* Toast */}
      {toast.visible && (
        <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gray-800 px-4 py-2 shadow-lg">
          <p className="text-xs font-medium text-white whitespace-nowrap">
            {toast.message}
          </p>
        </div>
      )}
    </div>
  );
}
