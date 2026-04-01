"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet, Star, BarChart2, User } from "lucide-react";

function GoldBarIcon({ size = 22, className = "", strokeWidth = 1.75 }: { size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Top lip of ingot */}
      <path d="M8 7V5h8v2" />
      {/* Trapezoidal body: narrower top, wider bottom */}
      <path d="M6 7h12l2 12H4L6 7z" />
    </svg>
  );
}

const NAV_ITEMS = [
  { label: "Pay",       icon: "Wallet",   href: null,         disabled: true  },
  { label: "Points",    icon: "Star",     href: null,         disabled: true  },
  { label: "Gold",      icon: "GoldBar",  href: "/",          disabled: false },
  { label: "Portfolio", icon: "BarChart2",href: "/portfolio", disabled: false },
  { label: "Profile",   icon: "User",     href: null,         disabled: true  },
] as const;

const IconMap = { Wallet, Star, BarChart2, User };

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="shrink-0 bg-white border-t border-gray-100"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div
        className="mx-auto flex items-end px-2"
        style={{ maxWidth: "430px", height: "56px" }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = item.href !== null && pathname === item.href;

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

          /* ── Enabled tab (Gold + Portfolio) ── */
          const iconColor = isActive ? "text-amber-600" : "text-gray-600";
          const MappedIcon = item.icon !== "GoldBar" ? IconMap[item.icon as keyof typeof IconMap] : null;
          return (
            <Link
              key={item.label}
              href={item.href!}
              className="flex flex-1 flex-col items-center justify-end gap-1 pb-3 transition-colors"
            >
              {item.icon === "GoldBar" ? (
                <GoldBarIcon size={22} className={iconColor} strokeWidth={isActive ? 2.25 : 1.75} />
              ) : MappedIcon ? (
                <MappedIcon size={22} className={iconColor} strokeWidth={isActive ? 2.25 : 1.75} />
              ) : null}
              <span className={`text-[10px] font-medium ${iconColor}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
