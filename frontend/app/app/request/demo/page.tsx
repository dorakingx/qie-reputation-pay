import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { JudgeDemoBanner } from "@/components/JudgeDemoBanner";
import { DEMO_REQUEST_TARGET_ID } from "@/lib/demoData";

export default function DemoRequestLandingPage() {
  const targetHref = `/app/request/${DEMO_REQUEST_TARGET_ID}`;

  return (
    <div className="mx-auto max-w-lg py-8">
      <Link
        href="/demo"
        className="mb-6 inline-flex items-center gap-1 text-sm text-teal-600 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to judge demo
      </Link>

      <JudgeDemoBanner />

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Shield className="h-8 w-8 text-teal-600" />
          <h1 className="text-xl font-bold text-slate-900">Escrow payment demo</h1>
        </div>
        <p className="mb-6 text-sm text-slate-600">
          Request #{DEMO_REQUEST_TARGET_ID} shows <strong>Research Dataset License</strong> with
          status <strong>In Escrow</strong> — QIEUSD held in the contract until work is verified.
          No wallet required to view.
        </p>
        <Link
          href={targetHref}
          className="inline-flex w-full items-center justify-center rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-700"
        >
          Open escrow demo (request #{DEMO_REQUEST_TARGET_ID})
        </Link>
      </div>
    </div>
  );
}
