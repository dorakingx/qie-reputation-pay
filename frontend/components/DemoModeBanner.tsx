"use client";

import { areContractsConfigured } from "@/lib/contracts";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Info } from "lucide-react";

export function DemoModeBanner() {
  const contractsOk = areContractsConfigured();
  const supabaseOk = isSupabaseConfigured;

  if (contractsOk && supabaseOk) return null;

  return (
    <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <div>
        <p className="font-medium">Demo mode active</p>
        <p className="text-amber-800">
          {!contractsOk && "Contracts not deployed — using mock data. "}
          {!supabaseOk && "Supabase not configured — using local demo data. "}
          Run <code className="rounded bg-amber-100 px-1">npm run node</code> then{" "}
          <code className="rounded bg-amber-100 px-1">npm run deploy:local</code>{" "}
          for full on-chain demo.
        </p>
      </div>
    </div>
  );
}
