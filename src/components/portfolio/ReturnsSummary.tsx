import { TrendingUp, TrendingDown } from "lucide-react";
import { calculateReturns } from "@/lib/goldPrice";
import { formatSGD, formatPercent } from "@/lib/formatters";
import type { Holding } from "@/types";

interface ReturnsSummaryProps {
  holding: Pick<Holding, "grams" | "total_invested">;
  currentPrice: number;
}

export function ReturnsSummary({ holding, currentPrice }: ReturnsSummaryProps) {
  const { currentValue, absoluteReturn, percentReturn } = calculateReturns(
    holding.grams,
    holding.total_invested,
    currentPrice
  );

  const isPositive = absoluteReturn >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="gold-card">
      <div className="grid grid-cols-3 gap-3">
        {/* Invested */}
        <div className="text-center">
          <p className="text-xs text-gold-500 mb-1">Invested</p>
          <p className="text-sm font-bold text-gold-900">
            {formatSGD(holding.total_invested)}
          </p>
        </div>

        {/* Current Value */}
        <div className="text-center border-x border-gold-100">
          <p className="text-xs text-gold-500 mb-1">Current Value</p>
          <p className="text-sm font-bold text-gold-900">
            {formatSGD(currentValue)}
          </p>
        </div>

        {/* Returns */}
        <div className="text-center">
          <p className="text-xs text-gold-500 mb-1">Returns</p>
          <div className="flex items-center justify-center gap-1">
            <Icon
              size={12}
              className={isPositive ? "text-green-600" : "text-red-500"}
            />
            <p
              className={`text-sm font-bold ${
                isPositive ? "text-green-600" : "text-red-500"
              }`}
            >
              {formatPercent(percentReturn)}
            </p>
          </div>
          <p
            className={`text-xs font-medium ${
              isPositive ? "text-green-500" : "text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {formatSGD(absoluteReturn)}
          </p>
        </div>
      </div>
    </div>
  );
}
