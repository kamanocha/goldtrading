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
      <div className="mx-auto flex items-center justify-between gap-2" style={{ maxWidth: "430px" }}>
        {/* Logo */}
        <Link href="/" className="flex items-center h-8 group">
          <span className="text-base font-bold text-gold-900 leading-none whitespace-nowrap">PayYou Gold</span>
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
