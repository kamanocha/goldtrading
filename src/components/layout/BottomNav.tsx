"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet, Star, BarChart2, User } from "lucide-react";

function GoldBarIcon({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Top face (trapezoid) */}
      <path d="M7.5 5.5h9l1.5 3h-12z" />
      {/* Main body */}
      <rect x="5" y="8.5" width="14" height="8" rx="1.2" />
      {/* Shine lines on body */}
      <rect x="7.5" y="11" width="3" height="0.8" rx="0.4" fill="white" opacity="0.35" />
      <rect x="7.5" y="13" width="5" height="0.8" rx="0.4" fill="white" opacity="0.25" />
    </svg>
  );
}

const NAV_ITEMS = [
  { label: "Pay",       icon: "Wallet",   href: null,         disabled: true  },
  { label: "Points",    icon: "Star",     href: null,         disabled: true  },
  { label: "Gold",      icon: "GoldBar",  href: "/",          disabled: false, center: true },
  { label: "Portfolio", icon: "BarChart2",href: "/portfolio", disabled: false },
  { label: "Profile",   icon: "User",     href: null,         disabled: true  },
] as const;

const IconMap = { Wallet, Star, BarChart2, User };

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100">
      <div
        className="mx-auto flex items-end px-2"
        style={{ maxWidth: "430px", height: "64px" }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = item.href !== null && pathname === item.href;

          /* ── Centre Gold tab ── */
          if ("center" in item && item.center) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-1 flex-col items-center gap-1 pb-2"
              >
                <div
                  className={`flex items-center justify-center rounded-full shadow-md -mt-5 transition-all ${
                    isActive
                      ? "bg-amber-600 ring-4 ring-amber-100"
                      : "bg-amber-500 ring-4 ring-amber-50 hover:bg-amber-600"
                  }`}
                  style={{ width: 52, height: 52 }}
                >
                  <GoldBarIcon size={26} className="text-white" />
                </div>
                <span className={`text-[10px] font-semibold ${isActive ? "text-amber-600" : "text-gray-600"}`}>
                  {item.label}
                </span>
              </Link>
            );
          }

          /* ── Disabled tab ── */
          if (item.disabled) {
            const Icon = IconMap[item.icon as keyof typeof IconMap];
            return (
              <div
                key={item.label}
                className="flex flex-1 flex-col items-center justify-end gap-1 pb-3 opacity-75 cursor-default"
              >
                <Icon size={22} className="text-gray-300" strokeWidth={1.75} />
                <span className="text-[10px] font-medium text-gray-300">{item.label}</span>
              </div>
            );
          }

          /* ── Enabled tab ── */
          const Icon = IconMap[item.icon as keyof typeof IconMap];
          return (
            <Link
              key={item.label}
              href={item.href!}
              className="flex flex-1 flex-col items-center justify-end gap-1 pb-3 transition-colors"
            >
              <Icon
                size={22}
                className={isActive ? "text-amber-600" : "text-gray-600"}
                strokeWidth={isActive ? 2.25 : 1.75}
              />
              <span className={`text-[10px] font-medium ${isActive ? "text-amber-600" : "text-gray-600"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
