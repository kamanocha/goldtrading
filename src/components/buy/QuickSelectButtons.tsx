"use client";

import { QUICK_SELECT_AMOUNTS } from "@/constants";

interface QuickSelectButtonsProps {
  selectedAmount: number;
  onSelect: (amount: number) => void;
}

export function QuickSelectButtons({
  selectedAmount,
  onSelect,
}: QuickSelectButtonsProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-gold-600">Quick select</p>
      <div className="grid grid-cols-4 gap-2">
        {QUICK_SELECT_AMOUNTS.map((amount) => {
          const isActive = selectedAmount === amount;
          return (
            <button
              key={amount}
              onClick={() => onSelect(amount)}
              className={`rounded-xl border py-2.5 text-sm font-semibold transition-all duration-150 active:scale-95 ${
                isActive
                  ? "border-gold-600 bg-gold-600 text-white shadow-md"
                  : "border-gold-200 bg-white text-gold-700 hover:border-gold-400 hover:bg-gold-50"
              }`}
            >
              ₫{amount >= 1_000_000 ? `${amount / 1_000_000}M` : amount >= 1_000 ? `${amount / 1_000}K` : amount}
            </button>
          );
        })}
      </div>
    </div>
  );
}
