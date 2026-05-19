import { Shield } from "lucide-react";
import type { PaymentStatus } from "@/types";

export function EscrowBadge({ status }: { status: PaymentStatus }) {
  if (status === "Pending") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
        Awaiting escrow deposit
      </span>
    );
  }
  if (status === "Escrowed") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-800">
        <Shield className="h-3 w-3" />
        Escrow-backed
      </span>
    );
  }
  if (status === "Completed") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
        <Shield className="h-3 w-3" />
        Escrow released
      </span>
    );
  }
  if (status === "Refunded") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
        Escrow refunded
      </span>
    );
  }
  return null;
}
