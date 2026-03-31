"use client";

import { useState, useEffect } from "react";
import { GOLD_PRICE_SGD } from "@/constants";

export function useGoldPrice() {
  const [price, setPrice] = useState(GOLD_PRICE_SGD);
  const [isLive] = useState(true);

  // Phase 1: simulate a live feed with tiny price jitter every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      const jitter = (Math.random() - 0.5) * 0.06; // ± ~3 cents
      setPrice((prev) => parseFloat((prev + jitter).toFixed(4)));
    }, 30_000);

    return () => clearInterval(interval);
  }, []);

  return { price, isLive };
}
