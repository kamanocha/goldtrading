"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { MOCK_HISTORICAL_PRICES, GOLD_PRICE_SGD } from "@/constants";
import { TrendingUp } from "lucide-react";

const startPrice = MOCK_HISTORICAL_PRICES[0].price;
const endPrice = GOLD_PRICE_SGD;
const gain = endPrice - startPrice;
const gainPct = ((gain / startPrice) * 100).toFixed(1);

interface TooltipEntry {
  value?: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-gold-100 bg-white px-3 py-2 shadow-lg text-xs">
        <p className="font-medium text-gold-600">{label}</p>
        <p className="font-bold text-gold-900">S${payload[0].value?.toFixed(2)}/g</p>
      </div>
    );
  }
  return null;
}

export default function GoldPriceChart() {
  return (
    <div className="gold-card space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gold-500">Gold price 12M</p>
          <p className="text-2xl font-bold text-gold-900">
            S${endPrice.toFixed(2)}
            <span className="text-sm text-gold-500 font-normal">/g</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-green-50 border border-green-100 px-2.5 py-1">
          <TrendingUp size={13} className="text-green-600" />
          <span className="text-xs font-bold text-green-700">+{gainPct}%</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={MOCK_HISTORICAL_PRICES as unknown as Record<string, unknown>[]}
            margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D97706" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#D97706" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#FDE68A"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "#B45309" }}
              tickLine={false}
              axisLine={false}
              interval={2}
            />
            <YAxis
              domain={["auto", "auto"]}
              tick={{ fontSize: 10, fill: "#B45309" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}`}
              width={36}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={startPrice}
              stroke="#FCD34D"
              strokeDasharray="3 3"
              strokeWidth={1}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#D97706"
              strokeWidth={2.5}
              fill="url(#goldGradient)"
              dot={false}
              activeDot={{ r: 5, fill: "#D97706", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-gold-400 text-center">
        Historical SGD/g · For illustrative purposes
      </p>
    </div>
  );
}
