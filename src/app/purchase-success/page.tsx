"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ConfettiCanvas } from "@/components/success/ConfettiCanvas";
import { InvestmentDetailsCard } from "@/components/success/InvestmentDetailsCard";
import { GoldButton } from "@/components/ui/GoldButton";
import { CheckCircle2 } from "lucide-react";

function PurchaseSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sgdAmount = Number(searchParams.get("amount")) || 0;
  const grams     = Number(searchParams.get("grams"))  || 0;
  const goldPrice = Number(searchParams.get("price"))  || 0;

  return (
    <div className="min-h-screen bg-gold-50 flex flex-col items-center justify-center px-4 py-12 pb-24">
      <ConfettiCanvas />

      <div className="w-full space-y-6 text-center" style={{ maxWidth: "400px" }}>
        <div className="flex justify-center">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <div className="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-30" />
            <CheckCircle2 size={56} className="text-green-500 relative" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-gold-900">Congratulations! 🎉</h1>
          <p className="text-gold-600">
            You&apos;ve successfully invested in gold.
            <br />
            Your holdings have been updated.
          </p>
        </div>

        <InvestmentDetailsCard
          sgdAmount={sgdAmount}
          goldPrice={goldPrice}
          grams={grams}
        />

        <div className="space-y-3">
          <GoldButton fullWidth size="lg" onClick={() => router.push("/portfolio")}>
            View Portfolio →
          </GoldButton>
          <GoldButton fullWidth size="md" variant="outline" onClick={() => router.push("/")}>
            Buy More Gold
          </GoldButton>
        </div>

        <p className="text-xs text-gold-400">
          Your gold is securely stored in our Brinks vault. You can check your
          balance anytime in the Portfolio tab.
        </p>
      </div>

    </div>
  );
}

export default function PurchaseSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gold-50 flex items-center justify-center">
          <div className="text-gold-600 text-sm animate-pulse">Loading…</div>
        </div>
      }
    >
      <PurchaseSuccessContent />
    </Suspense>
  );
}
