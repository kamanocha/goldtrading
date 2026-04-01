import { MOCK_HOLDING } from "@/constants";
import type { Order } from "@/types";

const ORDERS_KEY = "demo_orders";
const HOLDING_KEY = "demo_holding";

export function addDemoOrder(order: Order): void {
  const existing = getDemoOrders();
  localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...existing]));
}

export function getDemoOrders(): Order[] {
  try {
    const stored = localStorage.getItem(ORDERS_KEY);
    return stored ? (JSON.parse(stored) as Order[]) : [];
  } catch {
    return [];
  }
}

export function getDemoHolding(): { grams: number; total_invested: number } | null {
  try {
    const stored = localStorage.getItem(HOLDING_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function updateDemoHolding(addGrams: number, addAmount: number): void {
  const current = getDemoHolding() ?? {
    grams: MOCK_HOLDING.grams,
    total_invested: MOCK_HOLDING.total_invested,
  };
  localStorage.setItem(
    HOLDING_KEY,
    JSON.stringify({
      grams: current.grams + addGrams,
      total_invested: current.total_invested + addAmount,
    })
  );
}
