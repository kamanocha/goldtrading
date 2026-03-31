export const GOLD_PRICE_SGD = 186.16; // mock price per gram SGD
export const PLATFORM_FEE_PERCENT = 0;
export const USER_COUNT_DISPLAY = 247839;

export const QUICK_SELECT_AMOUNTS = [100, 500, 1000, 5000] as const;
export type QuickSelectAmount = (typeof QUICK_SELECT_AMOUNTS)[number];

export const SLIDER_MAX = 10000; // SGD

export const FAQ_DATA = [
  {
    q: "Is my gold physically stored?",
    a: "Yes — every gram you buy is backed by physical 24K gold held in a Brinks-certified vault in Singapore. You own a direct allocation, not a fund unit.",
  },
  {
    q: "How is the gold price calculated?",
    a: "We use live international spot prices (XAU/USD) converted to SGD at the mid-market rate, updated every 30 seconds during trading hours.",
  },
  {
    q: "Can I withdraw physical gold?",
    a: "Yes, in multiples of 1g. Delivery is available island-wide. A small delivery fee applies for orders under 10g.",
  },
  {
    q: "What are the fees?",
    a: "Zero storage fees during Phase 1. A 0.5% spread is built into the buy/sell price — no hidden charges.",
  },
  {
    q: "Is GoldVault SG regulated?",
    a: "We operate in compliance with MAS guidelines for digital payment token services and precious metals trading in Singapore.",
  },
  {
    q: "How do I sell my gold?",
    a: "Tap 'Sell Gold' in your portfolio. Funds are credited to your linked bank account within 1–2 business days via PayNow.",
  },
] as const;

export const EDUCATION_CARDS = [
  {
    title: "Gold Storage & Security",
    icon: "Shield",
    description:
      "Your gold is insured and stored in a Brinks-audited vault. We publish quarterly proof-of-reserve reports.",
    slug: "storage",
  },
  {
    title: "Selling Digital Gold",
    icon: "TrendingUp",
    description:
      "Sell any amount, anytime. Receive SGD instantly or opt for physical delivery of 1g coins.",
    slug: "selling",
  },
  {
    title: "Gold Prices & Trends",
    icon: "BarChart2",
    description:
      "Gold has delivered ~8% annualised returns over 20 years. Ideal as an inflation hedge and portfolio diversifier.",
    slug: "trends",
  },
] as const;

export const MOCK_HISTORICAL_PRICES = [
  { month: "Apr '25", price: 168.4 },
  { month: "May '25", price: 171.2 },
  { month: "Jun '25", price: 169.8 },
  { month: "Jul '25", price: 174.5 },
  { month: "Aug '25", price: 176.3 },
  { month: "Sep '25", price: 178.1 },
  { month: "Oct '25", price: 175.9 },
  { month: "Nov '25", price: 180.2 },
  { month: "Dec '25", price: 182.6 },
  { month: "Jan '26", price: 183.4 },
  { month: "Feb '26", price: 184.9 },
  { month: "Mar '26", price: 186.16 },
] as const;

export const MOCK_HOLDING = {
  grams: 5.3214,
  total_invested: 950.0,
};

export const MOCK_ORDERS = [
  {
    id: "ord_1",
    sgd_amount: 500,
    gold_price_sgd: 183.4,
    grams_purchased: 2.7265,
    status: "completed" as const,
    created_at: "2026-01-15T10:30:00Z",
  },
  {
    id: "ord_2",
    sgd_amount: 300,
    gold_price_sgd: 184.9,
    grams_purchased: 1.6225,
    status: "completed" as const,
    created_at: "2026-02-03T14:20:00Z",
  },
  {
    id: "ord_3",
    sgd_amount: 150,
    gold_price_sgd: 186.16,
    grams_purchased: 0.9724,
    status: "completed" as const,
    created_at: "2026-03-10T09:15:00Z",
  },
];

export const VALID_PROMO_CODES: Record<string, string> = {
  GOLD10: "10% bonus gold on first purchase",
  SAVE5: "S$5 off your purchase",
  VAULT20: "20% off storage for 6 months",
};
