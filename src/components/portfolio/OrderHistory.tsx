import { formatSGD, formatGrams, formatDate } from "@/lib/formatters";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import type { Order } from "@/types";

interface OrderHistoryProps {
  orders: Order[];
}

const StatusIcon = {
  completed: <CheckCircle2 size={14} className="text-green-500" />,
  pending:   <Clock        size={14} className="text-yellow-500" />,
  failed:    <XCircle      size={14} className="text-red-500" />,
};

export function OrderHistory({ orders }: OrderHistoryProps) {
  if (!orders.length) {
    return (
      <div className="gold-card text-center py-8">
        <p className="text-gold-400 text-sm">No transactions yet</p>
        <p className="text-xs text-gold-300 mt-1">
          Buy your first gram of gold to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-bold text-gold-900">Transaction history</h2>

      <div className="gold-card !p-0 overflow-hidden divide-y divide-gold-50">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between px-4 py-3.5"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-100">
                <span className="text-base">🥇</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold-900">
                  Bought {formatGrams(order.grams_purchased)}
                </p>
                <p className="text-xs text-gold-400">
                  {formatDate(order.created_at)} ·{" "}
                  {formatSGD(order.gold_price_sgd)}/g
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="text-right">
              <p className="text-sm font-bold text-gold-900">
                {formatSGD(order.sgd_amount)}
              </p>
              <div className="flex items-center justify-end gap-1 mt-0.5">
                {StatusIcon[order.status]}
                <span className="text-xs capitalize text-gold-400">
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
