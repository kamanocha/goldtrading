"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Users } from "lucide-react";
import { USER_COUNT_DISPLAY } from "@/constants";

function AnimatedNumber({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2500; // ms
    const startTime = Date.now();

    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString("en-US")}
    </span>
  );
}

export function UserCounter() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-gold-600 to-gold-700 p-5 text-white shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gold-200 mb-1">
            Trusted by investors across Vietnam
          </p>
          <p className="text-3xl font-bold tracking-tight">
            <AnimatedNumber target={USER_COUNT_DISPLAY} />
            <span className="text-gold-300 text-lg ml-1">+</span>
          </p>
          <p className="mt-1 text-sm font-medium text-gold-100">
            happy gold investors
          </p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
          <Users size={28} className="text-white" />
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/20 pt-4">
        {[
          { label: "Avg. return / year", value: "+8.4%" },
          { label: "Total gold sold (kg)", value: "8,241" },
          { label: "Uptime", value: "99.9%" },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="text-base font-bold text-white">{value}</p>
            <p className="text-xs text-gold-200">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
