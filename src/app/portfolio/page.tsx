import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { MobileContainer } from "@/components/layout/MobileContainer";
import { TrustBanner } from "@/components/portfolio/TrustBanner";
import { GoldHolding } from "@/components/portfolio/GoldHolding";
import { ActionGrid } from "@/components/portfolio/ActionGrid";
import { OrderHistory } from "@/components/portfolio/OrderHistory";
import { GOLD_PRICE_VND, MOCK_HOLDING, MOCK_ORDERS } from "@/constants";
import type { Order } from "@/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Portfolio — PayYou Gold",
};

export default async function PortfolioPage() {
  const cookieStore = await cookies();
  const isDemoSession = cookieStore.get("gv_demo")?.value === "1";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let holding = MOCK_HOLDING;
  let orders: Order[] = MOCK_ORDERS as Order[];

  // Only query Supabase when a real user is authenticated
  if (user) {
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
      // Supabase not configured — keep mock data
    }
  }

  return (
    <MobileContainer>
      <div className="space-y-4 pt-5">
        <TrustBanner />

        <GoldHolding
          grams={holding.grams}
          totalInvested={holding.total_invested}
          currentPrice={GOLD_PRICE_VND}
          userName={isDemoSession ? "Kashish" : undefined}
          isDemoSession={isDemoSession}
        />

        <ActionGrid />

        <OrderHistory orders={orders} isDemoSession={isDemoSession} />

        <div className="pb-24" />
      </div>

    </MobileContainer>
  );
}
