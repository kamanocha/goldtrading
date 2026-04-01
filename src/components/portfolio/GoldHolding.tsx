"use client";

import { useEffect, useState } from "react";
import { formatVND, formatPercent } from "@/lib/formatters";
import { calculateReturns } from "@/lib/goldPrice";
import { getDemoHolding } from "@/lib/demoStore";

interface GoldHoldingProps {
  grams: number;
  totalInvested: number;
  currentPrice: number;
  userName?: string;
  isDemoSession?: boolean;
}

export function GoldHolding({
  grams: initialGrams,
  totalInvested: initialInvested,
  currentPrice,
  userName,
  isDemoSession,
}: GoldHoldingProps) {
  const [grams, setGrams] = useState(initialGrams);
  const [totalInvested, setTotalInvested] = useState(initialInvested);

  useEffect(() => {
    if (!isDemoSession) return;
    const stored = getDemoHolding();
    if (stored) {
      setGrams(stored.grams);
      setTotalInvested(stored.total_invested);
    }
  }, [isDemoSession]);

  const { currentValue, absoluteReturn, percentReturn } = calculateReturns(
    grams,
    totalInvested,
    currentPrice
  );
  const isPositive = absoluteReturn >= 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
      {/* Greeting */}
      <div>
        <p className="text-lg font-semibold text-gold-900">
          Hello {userName ?? "there"} 👋
        </p>
        <p className="text-sm text-gray-500 mt-0.5">{userName ? "Demo account" : "Your gold in vault"}</p>
      </div>

      {/* Big gram number */}
      <div>
        <p className="text-4xl font-bold text-gold-900 tabular-nums">
          {grams.toFixed(4)}
          <span className="text-2xl font-semibold text-gold-600 ml-1">g</span>
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Value: {formatVND(currentValue)}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gold-100" />

      {/* Invested vs Returns */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-400 mb-1">Invested</p>
          <p className="text-sm font-semibold text-gold-900">
            {formatVND(totalInvested)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Returns</p>
          <p
            className={`text-sm font-semibold ${
              isPositive ? "text-green-600" : "text-red-500"
            }`}
          >
            {isPositive ? "+" : ""}
            {formatVND(absoluteReturn)} · {formatPercent(percentReturn)}
          </p>
        </div>
      </div>
    </div>
  );
}
