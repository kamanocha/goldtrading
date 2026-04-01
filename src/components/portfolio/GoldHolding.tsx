import { formatSGD, formatPercent } from "@/lib/formatters";
import { calculateReturns } from "@/lib/goldPrice";

interface GoldHoldingProps {
  grams: number;
  totalInvested: number;
  currentPrice: number;
  userName?: string;
}

export function GoldHolding({
  grams,
  totalInvested,
  currentPrice,
  userName,
}: GoldHoldingProps) {
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
          Hello{userName ? ` ${userName}` : ""} 👋
        </p>
        <p className="text-sm text-gray-500 mt-0.5">Your gold in vault</p>
      </div>

      {/* Big gram number */}
      <div>
        <p className="text-4xl font-bold text-gold-900 tabular-nums">
          {grams.toFixed(4)}
          <span className="text-2xl font-semibold text-gold-600 ml-1">g</span>
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Value: {formatSGD(currentValue)}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gold-100" />

      {/* Invested vs Returns */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-400 mb-1">Invested</p>
          <p className="text-sm font-semibold text-gold-900">
            {formatSGD(totalInvested)}
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
            {formatSGD(absoluteReturn)} · {formatPercent(percentReturn)}
          </p>
        </div>
      </div>
    </div>
  );
}
