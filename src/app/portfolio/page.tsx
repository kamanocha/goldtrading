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
  const holding = MOCK_HOLDING;
  const orders: Order[] = MOCK_ORDERS as Order[];

  return (
    <MobileContainer>
      <div className="space-y-4 pt-5">
        <TrustBanner />

        <GoldHolding
          grams={holding.grams}
          totalInvested={holding.total_invested}
          currentPrice={GOLD_PRICE_VND}
          userName="Kashish"
          isDemoSession={true}
        />

        <ActionGrid />

        <OrderHistory orders={orders} isDemoSession={true} />

        <div className="pb-24" />
      </div>

    </MobileContainer>
  );
}
