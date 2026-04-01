import { formatSGD, formatGrams, formatDate } from "@/lib/formatters";
import type { Order } from "@/types";

interface OrderHistoryProps {
  orders: Order[];
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Recent orders
        </p>
        <button className="text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors">
          View all
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <p className="text-sm text-gray-400">No orders yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-50">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center gap-3 px-4 py-3.5"
            >
              {/* Amber circle with grams */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 border border-amber-100">
                <span className="text-xs font-bold text-amber-700">
                  {order.grams_purchased.toFixed(1)}g
                </span>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">
                  Buy {formatGrams(order.grams_purchased)} · {formatSGD(order.sgd_amount)}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {formatDate(order.created_at)}
                </p>
              </div>

              {/* Status */}
              <span
                className={`text-xs font-semibold shrink-0 ${
                  order.status === "completed"
                    ? "text-green-600"
                    : order.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-500"
                }`}
              >
                {order.status === "completed" ? "Success" : order.status === "pending" ? "Pending" : "Failed"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
