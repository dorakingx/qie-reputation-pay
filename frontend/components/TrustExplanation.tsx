import { getTrustExplanation } from "@/lib/trustExplanation";
import { Sparkles } from "lucide-react";

export function TrustExplanation({ score }: { score: number }) {
  return (
    <div className="rounded-xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-5 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-teal-700">
        <Sparkles className="h-5 w-5" />
        <h3 className="font-semibold">AI Trust Insight</h3>
        <span className="rounded bg-teal-100 px-2 py-0.5 text-xs text-teal-600">
          Rule-based
        </span>
      </div>
      <p className="text-sm leading-relaxed text-slate-700">
        {getTrustExplanation(score)}
      </p>
    </div>
  );
}
