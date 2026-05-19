import { Link2 } from "lucide-react";
import { areContractsConfigured } from "@/lib/contracts";

export function OnChainVerifiedBadge() {
  if (!areContractsConfigured()) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-800">
      <Link2 className="h-3 w-3" />
      On-chain verified
    </span>
  );
}
