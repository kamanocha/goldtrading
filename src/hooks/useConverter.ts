"use client";

import { useState, useCallback } from "react";
import { sgdToGrams, gramsToSgd } from "@/lib/goldPrice";
import { SLIDER_MAX } from "@/constants";

const DEFAULT_SGD = 1000;

export function useConverter(pricePerGram: number) {
  const [sgdAmount, setSgdAmount] = useState<string>(DEFAULT_SGD.toString());
  const [grams, setGrams] = useState<string>(
    sgdToGrams(DEFAULT_SGD, pricePerGram).toFixed(4)
  );

  // User types in the SGD field → update grams
  const handleSgdChange = useCallback(
    (value: string) => {
      setSgdAmount(value);
      const num = parseFloat(value);
      if (!isNaN(num) && num >= 0) {
        setGrams(sgdToGrams(num, pricePerGram).toFixed(4));
      } else {
        setGrams("");
      }
    },
    [pricePerGram]
  );

  // User types in the grams field → update SGD
  const handleGramsChange = useCallback(
    (value: string) => {
      setGrams(value);
      const num = parseFloat(value);
      if (!isNaN(num) && num >= 0) {
        setSgdAmount(gramsToSgd(num, pricePerGram).toFixed(2));
      } else {
        setSgdAmount("");
      }
    },
    [pricePerGram]
  );

  // Slider drives SGD value, then recalculates grams
  const handleSliderChange = useCallback(
    (value: number) => {
      setSgdAmount(value.toString());
      setGrams(sgdToGrams(value, pricePerGram).toFixed(4));
    },
    [pricePerGram]
  );

  // Quick-select buttons snap both fields
  const handleQuickSelect = useCallback(
    (amount: number) => {
      setSgdAmount(amount.toString());
      setGrams(sgdToGrams(amount, pricePerGram).toFixed(4));
    },
    [pricePerGram]
  );

  const numericSgd = parseFloat(sgdAmount) || 0;
  const numericGrams = parseFloat(grams) || 0;

  return {
    sgdAmount,
    grams,
    numericSgd,
    numericGrams,
    sliderValue: Math.min(numericSgd, SLIDER_MAX),
    sliderMax: SLIDER_MAX,
    handleSgdChange,
    handleGramsChange,
    handleSliderChange,
    handleQuickSelect,
  };
}
