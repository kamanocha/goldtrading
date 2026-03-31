import { GOLD_PRICE_SGD } from "@/constants";
import type { ReturnsData } from "@/types";

/**
 * Convert SGD amount to grams of gold.
 */
export function sgdToGrams(
  sgd: number,
  pricePerGram: number = GOLD_PRICE_SGD
): number {
  if (!sgd || !pricePerGram) return 0;
  return sgd / pricePerGram;
}

/**
 * Convert grams of gold to SGD.
 */
export function gramsToSgd(
  grams: number,
  pricePerGram: number = GOLD_PRICE_SGD
): number {
  if (!grams || !pricePerGram) return 0;
  return grams * pricePerGram;
}

/**
 * Calculate investment returns given current holdings and price.
 */
export function calculateReturns(
  grams: number,
  totalInvested: number,
  currentPrice: number = GOLD_PRICE_SGD
): ReturnsData {
  const currentValue = grams * currentPrice;
  const absoluteReturn = currentValue - totalInvested;
  const percentReturn =
    totalInvested > 0 ? (absoluteReturn / totalInvested) * 100 : 0;

  return { currentValue, absoluteReturn, percentReturn };
}
