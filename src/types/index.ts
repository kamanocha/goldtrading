export interface GoldPrice {
  pricePerGram: number; // SGD
  currency: "SGD";
  updatedAt: Date;
}

export interface Order {
  id: string;
  user_id: string;
  sgd_amount: number;
  gold_price_sgd: number;
  grams_purchased: number;
  promo_code?: string;
  status: "pending" | "completed" | "failed";
  created_at: string;
}

export interface Holding {
  id: string;
  user_id: string;
  grams: number;
  total_invested: number;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name?: string;
  phone?: string;
  created_at: string;
}

export type BuyMode = "daily" | "lumpsum";

export interface ConversionState {
  sgdAmount: string;
  grams: string;
  activeField: "sgd" | "grams";
}

export interface ReturnsData {
  currentValue: number;
  absoluteReturn: number;
  percentReturn: number;
}
