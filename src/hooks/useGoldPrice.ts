"use client";

import { useState, useEffect } from "react";
import { GOLD_PRICE_VND } from "@/constants";

export function useGoldPrice() {
  const [price, setPrice] = useState(GOLD_PRICE_VND);
  const [isLive] = useState(true);

  // Phase 1: simulate a live feed with tiny price jitter every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      const jitter = Math.round((Math.random() - 0.5) * 1_000); // ±₫500
      setPrice((prev) => prev + jitter);
    }, 30_000);

    return () => clearInterval(interval);
  }, []);

  return { price, isLive };
}
