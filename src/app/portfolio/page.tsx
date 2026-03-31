import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { Header } from "@/components/layout/Header";
import { TrustBanner } from "@/components/portfolio/TrustBanner";
import { GoldHolding } from "@/components/portfolio/GoldHolding";
import { ReturnsSummary } from "@/components/portfolio/ReturnsSummary";
import { ActionGrid } from "@/components/portfolio/ActionGrid";
import { OrderHistory } from "@/components/portfolio/OrderHistory";
import { calculateReturns } from "@/lib/goldPrice";
import { GOLD_PRICE_SGD, MOCK_HOLDING, MOCK_ORDERS } from "@/constants";
import type { Order } from "@/types";

export const metadata = {
  title: "Portfolio — GoldVault SG",
};

export default async function PortfolioPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth");

  // Fetch live data — fall back to mock if not configured
  let holding = MOCK_HOLDING;
  let orders: Order[] = MOCK_ORDERS as Order[];

  try {
    const { data: holdingData } = await supabase
      .from("holdings")
      .select("*")
      .eq("user_id", user.id)
      .single();

    const { data: ordersData } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);

    if (holdingData) holding = holdingData;
    if (ordersData && ordersData.length > 0) orders = ordersData;
  } catch {
    // Supabase not configured — use mock data
  }

  const { currentValue } = calculateReturns(
    holding.grams,
    holding.total_invested,
    GOLD_PRICE_SGD
  );

  return (
    <MobileContainer>
      <Header />

      <div className="space-y-4 pt-4 pb-8">
        {/* Page heading */}
        <div>
          <h1 className="text-xl font-black text-gold-900">My Portfolio</h1>
          <p className="text-xs text-gold-500 mt-0.5">
            Updated live · {new Date().toLocaleDateString("en-SG", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Trust banner */}
        <TrustBanner />

        {/* Holdings */}
        <GoldHolding
          grams={holding.grams}
          currentValue={currentValue}
        />

        {/* Returns */}
        <ReturnsSummary
          holding={holding}
          currentPrice={GOLD_PRICE_SGD}
        />

        {/* Actions */}
        <ActionGrid />

        {/* Order history */}
        <OrderHistory orders={orders} />
      </div>
    </MobileContainer>
  );
}
