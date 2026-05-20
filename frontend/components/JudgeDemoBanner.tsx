import { Scale } from "lucide-react";

export function JudgeDemoBanner() {
  return (
    <div className="mb-6 flex items-start gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-900">
      <Scale className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
      <p>
        <span className="font-semibold">Judge Demo Mode</span>
        {" — "}
        works without wallet, Supabase, or deployed contracts.
      </p>
    </div>
  );
}
