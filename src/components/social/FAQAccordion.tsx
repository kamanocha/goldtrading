"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_DATA } from "@/constants";

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="space-y-3">
      <h2 className="text-base font-bold text-gold-900">
        Frequently asked questions
      </h2>

      <div className="gold-card divide-y divide-gold-100 !p-0 overflow-hidden">
        {FAQ_DATA.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i}>
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left hover:bg-gold-50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-gold-900 pr-4">
                  {item.q}
                </span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-gold-500 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {/* Animated content panel */}
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: isOpen ? "200px" : "0px" }}
              >
                <p className="px-4 pb-4 text-sm text-gold-700 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
