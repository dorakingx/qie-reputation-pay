import { getTrustLevelColor } from "@/lib/reputation";
import { cn } from "@/lib/utils";
import type { TrustLevel } from "@/types";

export function TrustBadge({ level }: { level: TrustLevel }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-sm font-semibold",
        getTrustLevelColor(level)
      )}
    >
      {level}
    </span>
  );
}
