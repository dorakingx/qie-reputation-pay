import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Star,
  Wallet,
  BadgeCheck,
  Lock,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 font-bold text-white">
              Q
            </span>
            <span className="font-semibold">QIE Reputation Pay</span>
          </div>
          <Link
            href="/app/dashboard"
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            Launch App
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center md:py-24">
        <p className="mb-2 inline-block rounded-full bg-teal-50 px-4 py-1 text-sm font-medium text-teal-700">
          QIE Ecosystem · Hackathon 2026
        </p>
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          QIE Reputation Pay
        </h1>
        <h2 className="mx-auto mb-4 max-w-3xl text-xl font-semibold text-slate-800 md:text-2xl">
          Escrow-backed QIEUSD payments + portable reputation for freelancers and merchants.
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600">
          Web3 payments move money. QIE Reputation Pay proves trust — with escrow, verified
          reviews, QIE Pass demo verification, and public reputation profiles.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/app/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-teal-600/25 hover:bg-teal-700"
          >
            Launch App
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-700 hover:bg-slate-50"
          >
            View 3-minute demo flow
          </Link>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          {[
            {
              icon: Lock,
              title: "Escrow-backed stablecoin payments",
              desc: "QIEUSD stays in the smart contract until work is verified and released.",
            },
            {
              icon: BadgeCheck,
              title: "QIE Pass verified trust profiles",
              desc: "Demo QIE Pass links identity to reputation and reduces Sybil farming.",
            },
            {
              icon: Star,
              title: "On-chain reputation from completed work",
              desc: "Ratings, review hashes, and portable trust scores follow your wallet.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-slate-200 p-6 shadow-sm"
            >
              <card.icon className="mb-3 h-8 w-8 text-teal-600" />
              <h3 className="font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">Why QIE?</h2>
          <p className="text-slate-600">
            QIE Reputation Pay is built for the QIE identity and payment ecosystem. QIE Wallet
            handles payment authorization, QIEUSD/QUSDC enables stable payments, QIE Pass provides
            Sybil-resistant identity, and the reputation profile becomes a portable trust layer
            across QIE apps.
          </p>
          <ul className="mt-6 space-y-2 text-left text-sm text-slate-600 md:mx-auto md:max-w-lg">
            <li>• EVM-compatible — Solidity escrow runs directly on QIE</li>
            <li>• Low fees — practical for freelance and creator payments</li>
            <li>• QIE Pass — reduces fake accounts and reputation farming</li>
            <li>• QIE Wallet — simple onboarding</li>
            <li>• QIE DEX (future) — auto-convert received stablecoins</li>
            <li>• QIE Oracle (future) — risk-based credit limits</li>
          </ul>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">Built for QIE</h2>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 font-medium">Integration</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  ["QIE Wallet", "Active", "Login and escrow payment authorization"],
                  ["QIE Testnet", "Ready to deploy", "Chain ID 1983"],
                  ["MockQIEUSD / QUSDC", "Demo / mock", "Escrow-backed stable payments"],
                  ["QIE Pass", "Demo mock", "Sybil-resistant identity layer"],
                  ["QIE DEX", "Future", "Auto-convert received payments"],
                  ["QIE Oracle", "Future", "Risk scoring and credit limits"],
                ].map(([name, status, role]) => (
                  <tr key={name}>
                    <td className="px-4 py-3 font-medium">{name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          status === "Active"
                            ? "text-emerald-600"
                            : status.includes("Demo") || status.includes("mock")
                              ? "text-blue-600"
                              : status.includes("Ready")
                                ? "text-amber-600"
                                : "text-slate-500"
                        }
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">How escrow works</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { step: "1", title: "Connect", desc: "QIE-compatible wallet", icon: Wallet },
              { step: "2", title: "Create", desc: "Payment request invoice", icon: Shield },
              { step: "3", title: "Escrow", desc: "Payer deposits QIEUSD", icon: Lock },
              { step: "4", title: "Reputation", desc: "Release + review on-chain", icon: BadgeCheck },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm"
              >
                <item.icon className="mx-auto mb-2 h-7 w-7 text-teal-600" />
                <span className="text-xs font-bold text-teal-600">STEP {item.step}</span>
                <h3 className="mt-1 font-semibold">{item.title}</h3>
                <p className="mt-1 text-xs text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        QIE Reputation Pay · Hackathon 2026
      </footer>
    </div>
  );
}
