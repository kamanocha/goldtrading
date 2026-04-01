import { Shield, TrendingUp, BarChart2, ChevronRight } from "lucide-react";
import { EDUCATION_CARDS } from "@/constants";

const iconMap = {
  Shield,
  TrendingUp,
  BarChart2,
};

const colorMap = [
  {
    bg: "bg-amber-50",
    border: "border-amber-100",
    icon: "text-amber-600",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    bg: "bg-green-50",
    border: "border-green-100",
    icon: "text-green-600",
    badge: "bg-green-100 text-green-700",
  },
  {
    bg: "bg-blue-50",
    border: "border-blue-100",
    icon: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
  },
];

export function EducationCards() {
  return (
    <div className="space-y-3">
      <div className="flex items-center">
        <h2 className="text-base font-bold text-gold-900">Why buy gold with PayYou?</h2>
      </div>

      <div className="space-y-2.5">
        {EDUCATION_CARDS.map((card, i) => {
          const Icon = iconMap[card.icon as keyof typeof iconMap];
          const colors = colorMap[i];
          return (
            <button
              key={card.slug}
              className={`w-full text-left rounded-2xl border ${colors.border} ${colors.bg} p-4 flex items-center gap-3 hover:shadow-sm transition-all active:scale-[0.99]`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colors.bg} border ${colors.border}`}
              >
                <Icon size={20} className={colors.icon} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gold-900 text-sm">
                  {card.title}
                </p>
                <p className="text-xs text-gold-600 mt-0.5 line-clamp-2">
                  {card.description}
                </p>
              </div>
              <ChevronRight size={16} className="text-gold-400 shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
