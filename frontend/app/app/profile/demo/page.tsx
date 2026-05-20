import Link from "next/link";
import { ArrowLeft, BadgeCheck } from "lucide-react";
import { JudgeDemoBanner } from "@/components/JudgeDemoBanner";
import { DEMO_PROFILE_ADDRESS } from "@/lib/demoData";

export default function DemoProfileLandingPage() {
  const targetHref = `/app/profile/${DEMO_PROFILE_ADDRESS}`;

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
          <BadgeCheck className="h-8 w-8 text-indigo-600" />
          <h1 className="text-xl font-bold text-slate-900">Reputation profile demo</h1>
        </div>
        <p className="mb-6 text-sm text-slate-600">
          <strong>Maya Chen</strong> — freelance designer with QIE Pass Verified (demo), reputation
          score, trust badge, and on-chain-style stats. No wallet required to view.
        </p>
        <Link
          href={targetHref}
          className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Open demo profile (Maya Chen)
        </Link>
      </div>
    </div>
  );
}
