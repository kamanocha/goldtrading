"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Tag } from "lucide-react";
import { VALID_PROMO_CODES } from "@/constants";

export function PromoCodeInput() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [message, setMessage] = useState("");

  const handleApply = () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;

    if (VALID_PROMO_CODES[trimmed]) {
      setStatus("valid");
      setMessage(VALID_PROMO_CODES[trimmed]);
    } else {
      setStatus("invalid");
      setMessage("Invalid promo code. Try GOLD10.");
    }
  };

  const handleClear = () => {
    setCode("");
    setStatus("idle");
    setMessage("");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 rounded-xl border border-gold-200 bg-white px-3 py-2.5 focus-within:border-gold-400 focus-within:ring-2 focus-within:ring-gold-100 transition-all">
        <Tag size={16} className="shrink-0 text-gold-400" />
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            if (status !== "idle") setStatus("idle");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
          placeholder="Promo code (e.g. GOLD10)"
          className="flex-1 bg-transparent text-sm text-gold-900 placeholder-gold-300 outline-none"
          maxLength={20}
        />
        {code && status !== "valid" && (
          <button
            onClick={handleClear}
            className="text-xs text-gold-400 hover:text-gold-600 transition-colors"
          >
            Clear
          </button>
        )}
        <button
          onClick={handleApply}
          disabled={!code || status === "valid"}
          className="rounded-lg bg-gold-600 px-3 py-1 text-xs font-semibold text-white hover:bg-gold-700 disabled:opacity-40 transition-colors"
        >
          Apply
        </button>
      </div>

      {/* Status message */}
      {status === "valid" && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2">
          <CheckCircle2 size={14} className="text-green-600 shrink-0" />
          <p className="text-xs text-green-700 font-medium">{message}</p>
        </div>
      )}
      {status === "invalid" && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2">
          <XCircle size={14} className="text-red-500 shrink-0" />
          <p className="text-xs text-red-600">{message}</p>
        </div>
      )}
    </div>
  );
}
