"use client";

import { ArrowLeftRight } from "lucide-react";
import type { useConverter } from "@/hooks/useConverter";

interface ConverterCardProps {
  converter: ReturnType<typeof useConverter>;
  goldPrice: number;
}

export function ConverterCard({ converter, goldPrice }: ConverterCardProps) {
  const {
    sgdAmount,
    grams,
    sliderValue,
    sliderMax,
    handleSgdChange,
    handleGramsChange,
    handleSliderChange,
  } = converter;

  const fillPercent = sliderMax > 0 ? (sliderValue / sliderMax) * 100 : 0;

  return (
    <div className="gold-card space-y-4">
      {/* Input row */}
      <div className="flex items-center gap-2">
        {/* SGD input */}
        <div className="flex-1 rounded-xl border border-gold-200 bg-gold-50 p-3">
          <p className="mb-1 text-xs font-medium text-gold-500">You Pay</p>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold text-gold-600">₫</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={sliderMax}
              value={sgdAmount}
              onChange={(e) => handleSgdChange(e.target.value)}
              placeholder="0"
              className="gold-input"
              aria-label="Amount in VND"
            />
          </div>
          <p className="mt-1 text-xs text-gold-400">Vietnamese Dong</p>
        </div>

        {/* Swap icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-100">
          <ArrowLeftRight size={14} className="text-gold-600" />
        </div>

        {/* Grams input */}
        <div className="flex-1 rounded-xl border border-gold-200 bg-gold-50 p-3">
          <p className="mb-1 text-xs font-medium text-gold-500">You Get</p>
          <div className="flex items-center gap-1">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              value={grams}
              onChange={(e) => handleGramsChange(e.target.value)}
              placeholder="0.0000"
              className="gold-input"
              aria-label="Amount in grams"
            />
          </div>
          <p className="mt-1 text-xs text-gold-400">24K Gold (grams)</p>
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-2">
        <input
          type="range"
          min={0}
          max={sliderMax}
          step={10}
          value={sliderValue}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          className="gold-slider"
          style={{
            background: `linear-gradient(to right, #D97706 0%, #D97706 ${fillPercent}%, #FDE68A ${fillPercent}%, #FDE68A 100%)`,
          }}
          aria-label="Select amount"
        />
        <div className="flex justify-between text-xs text-gold-400">
          <span>₫0</span>
          <span>₫500M</span>
        </div>
      </div>

      {/* Live price note */}
      <div className="flex items-center gap-1.5 rounded-lg bg-gold-50 border border-gold-100 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
        <p className="text-xs text-gold-600">
          <span className="font-semibold">₫{goldPrice.toLocaleString("en-US")}/g</span>
          {" · "}
          Live price · 24K 999.9 purity
        </p>
      </div>
    </div>
  );
}
