import { cn } from "@/lib/utils";
import type { PaymentStatus } from "@/types";

const styles: Record<PaymentStatus, string> = {
  Pending: "bg-amber-100 text-amber-800",
  Escrowed: "bg-blue-100 text-blue-800",
  Completed: "bg-emerald-100 text-emerald-800",
  Refunded: "bg-slate-100 text-slate-700",
};

const labels: Record<PaymentStatus, string> = {
  Pending: "Pending",
  Escrowed: "In Escrow",
  Completed: "Completed",
  Refunded: "Refunded",
};

export function StatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles[status]
      )}
    >
      {labels[status]}
    </span>
  );
}
