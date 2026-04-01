"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useGoldPrice } from "@/hooks/useGoldPrice";
import { useConverter } from "@/hooks/useConverter";
import { addDemoOrder, updateDemoHolding } from "@/lib/demoStore";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { Header } from "@/components/layout/Header";
import { BuyToggle } from "@/components/buy/BuyToggle";
import { ConverterCard } from "@/components/buy/ConverterCard";
import { QuickSelectButtons } from "@/components/buy/QuickSelectButtons";
import { PromoCodeInput } from "@/components/buy/PromoCodeInput";
import { StickyBuyCTA } from "@/components/buy/StickyBuyCTA";
import { UserCounter } from "@/components/social/UserCounter";
import { EducationCards } from "@/components/social/EducationCards";
import { FAQAccordion } from "@/components/social/FAQAccordion";
import { TermsLink } from "@/components/social/TermsLink";
import type { BuyMode } from "@/types";

// Recharts uses window — must be loaded client-side only
const GoldPriceChart = dynamic(
  () => import("@/components/social/GoldPriceChart"),
  {
    ssr: false,
    loading: () => (
      <div className="gold-card">
        <div className="h-5 w-32 rounded-md bg-gold-100 animate-pulse mb-3" />
        <div className="h-40 w-full rounded-xl bg-gold-100 animate-pulse" />
      </div>
    ),
  }
);

export default function BuyPage() {
  const router = useRouter();
  const { price: goldPrice } = useGoldPrice();
  const converter = useConverter(goldPrice);
  const [mode, setMode] = useState<BuyMode>("lumpsum");

  const handleBuy = () => {
    if (converter.numericSgd <= 0) return;

    const gramsVal = parseFloat(converter.grams) || 0;

    addDemoOrder({
      id: `ord_${Date.now()}`,
      user_id: "demo",
      sgd_amount: converter.numericSgd,
      gold_price_sgd: goldPrice,
      grams_purchased: gramsVal,
      status: "completed",
      created_at: new Date().toISOString(),
    });

    updateDemoHolding(gramsVal, converter.numericSgd);

    router.push(
      `/purchase-success?amount=${converter.numericSgd}&grams=${gramsVal}&price=${goldPrice}`
    );
  };

  return (
    <MobileContainer>
      <Header />

      <div className="space-y-4 pt-4">
        {/* Mode toggle */}
        <BuyToggle mode={mode} onChange={setMode} />

        {/* Save Daily notice */}
        {mode === "daily" && (
          <div className="rounded-xl border border-gold-200 bg-gold-100 px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gold-800">
                📅 Daily savings mode
              </p>
              <span className="rounded-full bg-gold-200 px-2 py-0.5 text-xs font-semibold text-gold-700">
                Coming soon
              </span>
            </div>
          </div>
        )}

        {/* Converter */}
        <ConverterCard converter={converter} goldPrice={goldPrice} />

        {/* Quick select */}
        <QuickSelectButtons
          selectedAmount={converter.numericSgd}
          onSelect={converter.handleQuickSelect}
        />

        {/* Promo code */}
        <PromoCodeInput />

        {/* ── Social proof section ────────────────────── */}
        <div className="pt-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gold-200" />
            <span className="text-xs font-semibold text-gold-500 uppercase tracking-wider">
              Why PayYou Gold
            </span>
            <div className="h-px flex-1 bg-gold-200" />
          </div>

          <div className="space-y-4">
            <UserCounter />
            <GoldPriceChart />
            <EducationCards />
            <FAQAccordion />
            <TermsLink />
          </div>
        </div>

        {/* Spacer for sticky CTA + nav bar */}
        <div className="h-32" />
      </div>

      {/* Sticky buy button (floats above BottomNav) */}
      <StickyBuyCTA
        amount={converter.numericSgd}
        onBuy={handleBuy}
        isLoading={false}
      />
    </MobileContainer>
  );
}
