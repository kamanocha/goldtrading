import { formatSGD, formatGrams } from "@/lib/formatters";

interface GoldHoldingProps {
  grams: number;
  currentValue: number;
}

export function GoldHolding({ grams, currentValue }: GoldHoldingProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-gold-600 to-gold-800 p-5 text-white shadow-lg">
      {/* Label */}
      <div className="flex items-center gap-1.5 mb-3">
        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        <p className="text-xs font-medium text-gold-200">Gold in your locker</p>
      </div>

      {/* Big gram number */}
      <p className="text-5xl font-black tracking-tight leading-none">
        {grams.toFixed(4)}
        <span className="text-2xl font-bold text-gold-300 ml-1.5">g</span>
      </p>
      <p className="mt-1 text-base font-semibold text-gold-200">
        {formatSGD(currentValue)}
      </p>

      {/* Purity badge */}
      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5">
        <span className="text-xs font-bold text-white">24K · 999.9</span>
        <span className="text-xs text-gold-200">Pure Gold</span>
      </div>
    </div>
  );
}
