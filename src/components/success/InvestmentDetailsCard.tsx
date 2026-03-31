import { formatSGD, formatGrams } from "@/lib/formatters";

interface InvestmentDetailsCardProps {
  sgdAmount: number;
  goldPrice: number;
  grams: number;
}

export function InvestmentDetailsCard({
  sgdAmount,
  goldPrice,
  grams,
}: InvestmentDetailsCardProps) {
  const rows = [
    { label: "Purchase Amount", value: formatSGD(sgdAmount) },
    { label: "Gold Price", value: `${formatSGD(goldPrice)}/g` },
    { label: "Gold Added", value: formatGrams(grams) },
  ];

  return (
    <div className="w-full gold-card divide-y divide-gold-100">
      {rows.map(({ label, value }) => (
        <div
          key={label}
          className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
        >
          <span className="text-sm text-gold-600">{label}</span>
          <span className="text-sm font-bold text-gold-900">{value}</span>
        </div>
      ))}
    </div>
  );
}
