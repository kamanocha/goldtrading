"use client";

import type { BuyMode } from "@/types";

interface BuyToggleProps {
  mode: BuyMode;
  onChange: (mode: BuyMode) => void;
}

export function BuyToggle({ mode, onChange }: BuyToggleProps) {
  return (
    <div className="flex rounded-xl bg-gold-100 p-1 gap-1">
      <button
        onClick={() => onChange("lumpsum")}
        className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
          mode === "lumpsum"
            ? "bg-white text-gold-800 shadow-sm"
            : "text-gold-600 hover:text-gold-800"
        }`}
      >
        Buy Lumpsum
      </button>
      <button
        onClick={() => onChange("daily")}
        className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
          mode === "daily"
            ? "bg-white text-gold-800 shadow-sm"
            : "text-gold-600 hover:text-gold-800"
        }`}
      >
        Save Daily
      </button>
    </div>
  );
}
