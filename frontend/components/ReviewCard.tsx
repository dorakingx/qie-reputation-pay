import type { Review } from "@/types";
import { Star } from "lucide-react";
import { truncateAddress } from "@/lib/utils";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-200"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-slate-400">{review.createdAt}</span>
      </div>
      <p className="text-sm text-slate-700">{review.text}</p>
      <p className="mt-2 text-xs text-slate-500">
        From {truncateAddress(review.reviewer)}
      </p>
    </div>
  );
}
