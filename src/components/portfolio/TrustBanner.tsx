import { Shield, Star } from "lucide-react";

export function TrustBanner() {
  return (
    <div className="rounded-2xl border border-gold-100 bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-100">
            <Shield size={18} className="text-gold-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-gold-900">
              Secured by Brinks Vault
            </p>
            <p className="text-xs text-gold-500">
              Fully insured · Singapore
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-full bg-green-50 border border-green-100 px-2.5 py-1">
          <Star size={10} className="text-green-600 fill-green-600" />
          <span className="text-xs font-semibold text-green-700">
            Verified
          </span>
        </div>
      </div>

      {/* Vault partner logos row */}
      <div className="mt-3 flex items-center gap-3 border-t border-gold-50 pt-3">
        {["Brinks", "Malca-Amit", "MAS Compliant"].map((partner) => (
          <span
            key={partner}
            className="rounded-md bg-gold-50 px-2 py-1 text-xs font-medium text-gold-600"
          >
            {partner}
          </span>
        ))}
      </div>
    </div>
  );
}
