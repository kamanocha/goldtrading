"use client";

interface LivePriceBadgeProps {
  price: number;
  isLive: boolean;
}

export function LivePriceBadge({ price, isLive }: LivePriceBadgeProps) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-gold-200 bg-gold-50 px-3 py-1.5 shadow-sm">
      {/* Pulsing dot */}
      <span className="relative flex h-2 w-2">
        {isLive && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            isLive ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      </span>

      <span className="text-xs font-semibold text-gold-800">
        ₫{price.toLocaleString("en-US")}/g
      </span>

      {isLive && (
        <span className="text-xs font-medium text-green-600">Live</span>
      )}
    </div>
  );
}
