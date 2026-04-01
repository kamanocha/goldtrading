/**
 * Format a number as Vietnamese Dong currency.
 * e.g. 4860000 → "₫4,860,000"
 */
export function formatVND(amount: number): string {
  return "₫" + new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

/** @deprecated use formatVND */
export const formatSGD = formatVND;

/**
 * Format grams with 4 decimal places.
 * e.g. 5.32141 → "5.3214g"
 */
export function formatGrams(grams: number, decimals = 4): string {
  return `${grams.toFixed(decimals)}g`;
}

/**
 * Format a percentage with sign prefix.
 * e.g. 3.5 → "+3.50%", -1.2 → "-1.20%"
 */
export function formatPercent(pct: number): string {
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toFixed(2)}%`;
}

/**
 * Format a compact number for display.
 * e.g. 247839 → "247,839"
 */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

/**
 * Format a date string as a short human-readable date.
 * e.g. "2026-01-15T10:30:00Z" → "15 Jan 2026"
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
