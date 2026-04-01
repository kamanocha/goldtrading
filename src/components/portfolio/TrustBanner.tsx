import { ShieldCheck } from "lucide-react";

export function TrustBanner() {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gold-100 px-4 py-3">
      <div className="flex items-center gap-2.5">
        <ShieldCheck size={18} className="shrink-0 text-amber-600" />
        <p className="text-sm text-gold-800">
          Your gold is safe · Stored in a secure vault
        </p>
      </div>
      <button className="shrink-0 text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors ml-3">
        Learn more
      </button>
    </div>
  );
}
