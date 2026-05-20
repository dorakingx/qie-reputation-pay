import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

const steps = [
  {
    time: "20s",
    title: "Explain the problem",
    body: "Web3 payments are easy, but trust is fragmented. Freelancers rebuild reputation on every platform.",
  },
  {
    time: "15s",
    title: "Connect wallet",
    body: "Launch App → Connect Wallet. Use QIE Testnet (1983) or Hardhat local (31337).",
  },
  {
    time: "30s",
    title: "Create escrow-backed payment request",
    body: "Create → title, amount, recipient → submit. Copy payment link.",
  },
  {
    time: "30s",
    title: "Pay into escrow",
    body: "Switch to payer wallet → open link → Pay into Escrow (QIEUSD). Funds held in contract.",
  },
  {
    time: "25s",
    title: "Release escrow",
    body: "Switch to recipient → Release Escrow & Complete. Recipient receives QIEUSD.",
  },
  {
    time: "20s",
    title: "Leave review",
    body: "Payer submits rating + text. Rating and hash stored on-chain.",
  },
  {
    time: "30s",
    title: "Trust profile + QIE Pass",
    body: "Open profile → reputation score, trust badge, QIE Pass Verified. Verify with QIE Pass (demo) on own profile.",
  },
  {
    time: "20s",
    title: "QIE ecosystem",
    body: "About page → Wallet, Testnet, MockQIEUSD, QIE Pass demo, DEX/Oracle future.",
  },
  {
    time: "10s",
    title: "Engineering proof",
    body: "24 contract tests, CI on GitHub, escrow + refund + review hashes.",
  },
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <Link
            href="/app/dashboard"
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            Launch App
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8 text-center">
          <p className="mb-2 inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700">
            <Clock className="h-4 w-4" />
            ~3 minutes
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Judge Demo Guide</h1>
          <p className="mt-2 text-slate-600">
            Follow these steps to demo QIE Reputation Pay end-to-end.
          </p>
        </div>

        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-xs font-medium text-slate-400">{step.time}</span>
              </div>
              <h2 className="font-semibold text-slate-900">{step.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-semibold text-amber-900">Backup demo mode</h2>
          <p className="mt-2 text-sm text-amber-800">
            If contracts are not deployed, the app shows a demo mode banner and uses built-in
            sample data. All pages work without Supabase or contract addresses.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Full checklist:{" "}
          <a
            href="https://github.com/dorakingx/qie-reputation-pay/blob/main/docs/submission-checklist.md"
            className="text-teal-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            submission-checklist.md
          </a>
        </p>
      </main>
    </div>
  );
}
