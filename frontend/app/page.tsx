import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Star,
  Wallet,
  BadgeCheck,
  Lock,
  TrendingUp,
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
        <p className="mb-4 inline-block rounded-full bg-teal-50 px-4 py-1 text-sm font-medium text-teal-700">
          QIE Ecosystem · Hackathon 2026
        </p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Escrow-backed stablecoin payments + portable QIE reputation for freelancers and merchants.
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600">
          Pay safely with QIEUSD held in escrow until work is done. Build verifiable trust that travels with your wallet across the QIE ecosystem.
        </p>
        <Link
          href="/app/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-teal-600/25 hover:bg-teal-700"
        >
          Launch App
          <ArrowRight className="h-5 w-5" />
        </Link>
      </section>

      <section className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          {[
            {
              icon: Lock,
              title: "Pay safely with QIEUSD",
              desc: "Funds stay in smart-contract escrow until the recipient marks work complete.",
            },
            {
              icon: Star,
              title: "Build trust with verified reviews",
              desc: "On-chain ratings and review hashes plus QIE Pass identity reduce Sybil farming.",
            },
            {
              icon: TrendingUp,
              title: "Unlock reputation-based opportunities",
              desc: "Portable trust scores help freelancers and merchants win better clients.",
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
          <h2 className="mb-4 text-2xl font-bold">Why this matters</h2>
          <p className="text-slate-600">
            Web3 payments are easy — but Web3 trust is still fragmented. Freelancers and merchants
            repeat KYC and reputation building on every platform. QIE Reputation Pay combines
            escrow-backed QIEUSD payments with wallet-native reputation so trust is portable,
            verifiable, and composable across the QIE ecosystem.
          </p>
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
                  ["QIE Testnet", "Active", "Chain ID 1983 — live deployment ready"],
                  ["MockQIEUSD / QUSDC", "Active (demo)", "Escrow-backed stable payments"],
                  ["QIE Pass", "Demo verification", "Sybil-resistant identity layer"],
                  ["QIE DEX", "Future", "Auto-convert received payments"],
                  ["QIE Oracle", "Future", "Risk scoring and credit limits"],
                ].map(([name, status, role]) => (
                  <tr key={name}>
                    <td className="px-4 py-3 font-medium">{name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          status.includes("Active")
                            ? "text-emerald-600"
                            : status.includes("Demo")
                              ? "text-blue-600"
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
        QIE Reputation Pay · Hackathon MVP 2026
      </footer>
    </div>
  );
}
