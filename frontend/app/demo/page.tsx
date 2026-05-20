import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  LayoutDashboard,
  PlusCircle,
  UserCircle,
} from "lucide-react";
import { JudgeDemoBanner } from "@/components/JudgeDemoBanner";

const GITHUB_REPO = "https://github.com/dorakingx/qie-reputation-pay";

const demoSteps = [
  {
    time: "0:40–1:05",
    title: "QIE ecosystem (spoken)",
    body: "QIE Wallet, QIEUSD/QUSDC path, QIE Pass demo, portable reputation across QIE apps. See integration table below.",
  },
  {
    time: "1:05–1:30",
    title: "Create escrow-backed payment request",
    body: "Launch App → Connect Wallet → Create. Fill title, amount, recipient. Copy payment link.",
  },
  {
    time: "1:30–1:55",
    title: "Pay into escrow",
    body: "Payer opens link → Pay into Escrow (QIEUSD). Funds held in contract, not sent directly.",
  },
  {
    time: "1:55–2:15",
    title: "Release payment after completion",
    body: "Recipient → Release Escrow & Complete. Funds move only after work is verified.",
  },
  {
    time: "2:15–2:35",
    title: "Leave review and update reputation",
    body: "Payer submits rating + text. Rating and reviewHash on-chain; reputation stats update.",
  },
  {
    time: "2:35–2:50",
    title: "View QIE Pass verified profile",
    body: "Open demo profile — reputation score, trust badge, QIE Pass Verified (demo mock).",
  },
  {
    time: "2:50–3:00",
    title: "Closing — why this matters",
    body: "Escrow + reputation + QIE identity. 24 tests, CI on GitHub. Path to QUSDC, DEX, Oracle.",
  },
];

const qieIntegrations = [
  ["QIE Wallet", "Active", "Login and escrow authorization"],
  ["QIE Testnet", "Ready to deploy", "Chain ID 1983"],
  ["MockQIEUSD / QUSDC", "Demo / mock", "Escrow-backed stable payments"],
  ["QIE Pass", "Demo mock", "Sybil-resistant identity"],
  ["QIE DEX", "Future", "Auto-convert received payments"],
  ["QIE Oracle", "Future", "Risk-based credit limits"],
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600"
          >
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
        <JudgeDemoBanner />
        <div className="mb-8 text-center">
          <p className="mb-2 inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700">
            <Clock className="h-4 w-4" />
            3-minute demo timeline · ~3:00 total
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Judge Demo Walkthrough</h1>
          <p className="mt-2 text-slate-600">
            Use this page during judging. Spoken script:{" "}
            <a
              href={`${GITHUB_REPO}/blob/main/docs/demo-script.md`}
              className="text-teal-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              demo-script.md
            </a>
          </p>
        </div>

        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
            0:00–0:20 Problem
          </p>
          <p className="mt-2 text-sm text-slate-700">
            Web3 payments move money, but they do not prove trust. Freelancers and merchants
            rebuild reputation on every platform and take risk paying strangers.
          </p>
        </section>

        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
            0:20–0:40 Solution
          </p>
          <p className="mt-2 text-sm text-slate-700">
            QIE Reputation Pay adds escrow, verified completion, and portable reputation so
            freelancers and merchants can safely transact with people they have never met.
          </p>
        </section>

        <h2 className="mb-4 text-lg font-semibold text-slate-900">Demo steps</h2>
        <ol className="mb-8 space-y-4">
          {demoSteps.map((step, i) => (
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
              <h3 className="font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>

        <section className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-semibold text-amber-900">Backup demo mode</h2>
          <p className="mt-2 text-sm text-amber-800">
            This app can be demoed without deployed contracts or Supabase using built-in demo data.
            If contract addresses are not configured, a demo mode banner appears and all pages work
            with sample payment requests and profiles.
          </p>
        </section>

        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            QIE ecosystem integration
          </h2>
          <p className="mb-4 text-sm text-slate-600">
            Built for the QIE identity and payment ecosystem — wallet authorization, stable
            payments, QIE Pass identity, portable trust across apps.
          </p>
          <div className="overflow-hidden rounded-lg border border-slate-200 text-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-2 font-medium">Component</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                  <th className="px-3 py-2 font-medium">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {qieIntegrations.map(([name, status, role]) => (
                  <tr key={name}>
                    <td className="px-3 py-2 font-medium">{name}</td>
                    <td className="px-3 py-2 text-slate-600">{status}</td>
                    <td className="px-3 py-2 text-slate-600">{role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-teal-200 bg-teal-50 p-5">
          <h2 className="mb-4 font-semibold text-teal-900">Try it now</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/app/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700"
            >
              <LayoutDashboard className="h-4 w-4" />
              Open Dashboard
            </Link>
            <Link
              href="/app/create"
              className="inline-flex items-center gap-2 rounded-lg border border-teal-600 bg-white px-4 py-2.5 text-sm font-medium text-teal-700 hover:bg-teal-100"
            >
              <PlusCircle className="h-4 w-4" />
              Create Payment Request
            </Link>
            <Link
              href="/app/profile/demo"
              className="inline-flex items-center gap-2 rounded-lg border border-teal-600 bg-white px-4 py-2.5 text-sm font-medium text-teal-700 hover:bg-teal-100"
            >
              <UserCircle className="h-4 w-4" />
              View Demo Profile
            </Link>
            <a
              href={GITHUB_REPO}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              View GitHub
            </a>
          </div>
          <p className="mt-3 text-xs text-teal-800">
            Escrow example:{" "}
            <Link href="/app/request/demo" className="font-medium underline">
              /app/request/demo
            </Link>
          </p>
        </section>

        <p className="mt-6 text-center text-sm text-slate-500">
          <a
            href={`${GITHUB_REPO}/blob/main/docs/submission-checklist.md`}
            className="text-teal-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Submission checklist
            <ExternalLink className="ml-0.5 inline h-3.5 w-3.5" />
          </a>
        </p>
      </main>
    </div>
  );
}
