export const GOLD_PRICE_VND = 4_860_000; // mock price per gram in Vietnamese Dong
/** @deprecated use GOLD_PRICE_VND */
export const GOLD_PRICE_SGD = GOLD_PRICE_VND;

export const PLATFORM_FEE_PERCENT = 0;
export const USER_COUNT_DISPLAY = 247839;

export const QUICK_SELECT_AMOUNTS = [1_000_000, 5_000_000, 10_000_000, 50_000_000] as const;
export type QuickSelectAmount = (typeof QUICK_SELECT_AMOUNTS)[number];

export const SLIDER_MAX = 500_000_000; // ₫500M

export const FAQ_DATA = [
  {
    q: "Is my gold physically stored?",
    a: "Yes — every gram you buy is backed by physical 24K gold held in a certified vault in Vietnam. You own a direct allocation, not a fund unit.",
  },
  {
    q: "Can I withdraw physical gold?",
    a: "Yes, in multiples of 1g. Delivery is available nationwide. A small delivery fee applies for orders under 10g.",
  },
  {
    q: "What are the fees?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    q: "Is PayYou Gold regulated?",
    a: "Yes. Vietnam's Decree 232 (Oct 2025) explicitly authorises our product category. Bank-X holds a gold trading licence under Decree 232 and acts as custodian and counterparty.",
  },
  {
    q: "How do I sell my gold?",
    a: "Tap 'Sell Gold' in your portfolio. Funds are credited to your linked bank account within 1–2 business days via bank transfer.",
  },
] as const;

export const EDUCATION_CARDS = [
  {
    title: "Gold Storage & Security",
    icon: "Shield",
    description:
      "Your gold is insured and stored in a certified vault. We publish quarterly proof-of-reserve reports.",
    slug: "storage",
  },
  {
    title: "Selling Digital Gold",
    icon: "TrendingUp",
    description:
      "Sell any amount, anytime. Receive VND instantly or opt for physical delivery of 1g coins.",
    slug: "selling",
  },
  {
    title: "Gold Prices & Trends",
    icon: "BarChart2",
    description:
      "Gold has delivered ~21.1% annualised returns over the past 5 years in VND. Ideal as an inflation hedge and portfolio diversifier.",
    slug: "trends",
  },
] as const;

export const MOCK_HISTORICAL_PRICES = [
  { month: "Apr '25", price: 4_200_000 },
  { month: "May '25", price: 4_270_000 },
  { month: "Jun '25", price: 4_240_000 },
  { month: "Jul '25", price: 4_350_000 },
  { month: "Aug '25", price: 4_400_000 },
  { month: "Sep '25", price: 4_445_000 },
  { month: "Oct '25", price: 4_390_000 },
  { month: "Nov '25", price: 4_490_000 },
  { month: "Dec '25", price: 4_555_000 },
  { month: "Jan '26", price: 4_575_000 },
  { month: "Feb '26", price: 4_615_000 },
  { month: "Mar '26", price: 4_860_000 },
] as const;

export const MOCK_HOLDING = {
  grams: 5.3214,
  total_invested: 25_000_000, // ₫25M
};

export const MOCK_ORDERS = [
  {
    id: "ord_1",
    sgd_amount: 13_000_000,
    gold_price_sgd: 4_764_000,
    grams_purchased: 2.7265,
    status: "completed" as const,
    created_at: "2026-01-15T10:30:00Z",
  },
  {
    id: "ord_2",
    sgd_amount: 7_500_000,
    gold_price_sgd: 4_622_000,
    grams_purchased: 1.6225,
    status: "completed" as const,
    created_at: "2026-02-03T14:20:00Z",
  },
  {
    id: "ord_3",
    sgd_amount: 4_726_000,
    gold_price_sgd: 4_860_000,
    grams_purchased: 0.9724,
    status: "completed" as const,
    created_at: "2026-03-10T09:15:00Z",
  },
];

export const VALID_PROMO_CODES: Record<string, string> = {
  GOLD10: "10% bonus gold on first purchase",
  SAVE5: "₫100,000 off your purchase",
};
