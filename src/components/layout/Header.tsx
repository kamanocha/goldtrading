"use client";

import Link from "next/link";
import { useGoldPrice } from "@/hooks/useGoldPrice";
import { LivePriceBadge } from "@/components/ui/LivePriceBadge";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export function Header() {
  const { price, isLive } = useGoldPrice();
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    // Clear both real session and demo session
    document.cookie = "gv_demo=; path=/; max-age=0";
    await signOut();
    router.push("/auth");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 bg-gold-50/90 backdrop-blur-md border-b border-gold-100 px-4 py-3">
      <div className="flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-600 shadow-sm group-hover:bg-gold-700 transition-colors">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div>
            <span className="text-base font-bold text-gold-900 leading-none">
              GoldVault
            </span>
            <span className="ml-0.5 text-base font-bold text-gold-600 leading-none">
              SG
            </span>
          </div>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <LivePriceBadge price={price} isLive={isLive} />

          {user ? (
            <button
              onClick={handleSignOut}
              className="text-xs text-gold-600 font-medium hover:text-gold-800 transition-colors px-2 py-1 rounded-lg hover:bg-gold-100"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/auth"
              className="text-xs text-gold-600 font-medium hover:text-gold-800 transition-colors px-2 py-1 rounded-lg hover:bg-gold-100"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
