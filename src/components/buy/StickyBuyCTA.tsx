"use client";

import { formatSGD } from "@/lib/formatters";

interface StickyBuyCTAProps {
  amount: number;
  onBuy: () => void;
  isLoading: boolean;
}

export function StickyBuyCTA({ amount, onBuy, isLoading }: StickyBuyCTAProps) {
  return (
    <div
      className="fixed bottom-16 left-0 right-0 z-50 border-t border-gold-100 bg-white/95 backdrop-blur-md px-4 pt-3 pb-3"
    >
      <div className="mx-auto" style={{ maxWidth: "430px" }}>
        <button
          onClick={onBuy}
          disabled={amount <= 0 || isLoading}
          className="relative w-full overflow-hidden rounded-2xl bg-gold-600 py-4 text-base font-bold text-white shadow-lg transition-all duration-150 hover:bg-gold-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Shine effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />

          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Processing…
            </span>
          ) : (
            <span>
              Buy Gold for{" "}
              <span className="underline decoration-dotted">
                {amount > 0 ? formatSGD(amount) : "S$0.00"}
              </span>
            </span>
          )}
        </button>

      </div>
    </div>
  );
}
