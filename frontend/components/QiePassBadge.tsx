import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function QiePassBadge({ verified }: { verified: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        verified
          ? "bg-indigo-100 text-indigo-800"
          : "bg-slate-100 text-slate-500"
      )}
    >
      <BadgeCheck className="h-3.5 w-3.5" />
      {verified ? "QIE Pass Verified" : "QIE Pass Unverified"}
    </span>
  );
}
