import Link from "next/link";
import { ArrowLeft, Clock, ExternalLink } from "lucide-react";

const steps = [
  {
    time: "0:20–0:40",
    title: "Connect wallet",
    body: "Launch App → Connect Wallet. Use QIE Testnet (chain 1983) or Hardhat local (31337).",
  },
  {
    time: "0:40–1:10",
    title: "Create payment request",
    body: "Create → title, amount, recipient → submit. Copy the payment link to share with the payer.",
  },
  {
    time: "1:10–1:40",
    title: "Pay into escrow",
    body: "Switch to payer wallet → open link → Pay into Escrow (QIEUSD). Funds are held in the contract, not sent directly.",
  },
  {
    time: "1:40–2:00",
    title: "Release funds after completion",
    body: "Switch to recipient → Release Escrow & Complete. Recipient receives QIEUSD only after marking work done.",
  },
  {
    time: "2:00–2:20",
    title: "Leave review",
    body: "Payer submits rating + text. Rating and reviewHash are stored on-chain.",
  },
  {
    time: "2:20–2:40",
    title: "View QIE Pass verified profile",
    body: "Open recipient profile → reputation score, trust badge, QIE Pass Verified. On your own profile: Verify with QIE Pass (demo).",
  },
  {
    time: "2:40–3:00",
    title: "Explain QIE ecosystem expansion",
    body: "About page → QIE Wallet, Testnet, MockQIEUSD, QIE Pass demo, DEX/Oracle future. Mention 24 contract tests and CI on GitHub.",
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
            3-minute demo timeline · ~3:00 total
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Judge Demo Walkthrough</h1>
          <p className="mt-2 text-slate-600">
            Follow these seven steps for a smooth hackathon demo. Problem and solution: see{" "}
            <a
              href="https://github.com/dorakingx/qie-reputation-pay/blob/main/docs/demo-script.md"
              className="text-teal-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              demo-script.md
            </a>
            .
          </p>
        </div>

        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
          <strong className="text-slate-900">0:00–0:20 Problem · 0:20–0:40 Solution</strong>
          <p className="mt-1">
            Web3 payments move money, but they do not prove trust. QIE Reputation Pay adds escrow,
            verified completion, and portable reputation for freelancers and merchants.
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
            This app can be demoed without deployed contracts or Supabase using built-in demo data.
            If contract addresses are not configured, a demo mode banner appears and all pages work
            with sample payment requests and profiles.
          </p>
        </div>

        <p className="mt-6 flex flex-col items-center gap-2 text-center text-sm text-slate-500 sm:flex-row sm:justify-center">
          <a
            href="https://github.com/dorakingx/qie-reputation-pay/blob/main/docs/demo-script.md"
            className="inline-flex items-center gap-1 text-teal-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read-aloud demo script
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <span className="hidden sm:inline">·</span>
          <a
            href="https://github.com/dorakingx/qie-reputation-pay/blob/main/docs/submission-checklist.md"
            className="text-teal-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Submission checklist
          </a>
        </p>
      </main>
    </div>
  );
}
