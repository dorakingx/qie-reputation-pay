import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Star,
  Wallet,
  Zap,
  Users,
  Store,
  Palette,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
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

      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <p className="mb-4 inline-block rounded-full bg-teal-50 px-4 py-1 text-sm font-medium text-teal-700">
          QIE Ecosystem · Hackathon MVP
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
          QIE Reputation Pay
        </h1>
        <p className="mb-2 text-xl text-teal-600 md:text-2xl">
          Stablecoin payments with identity-based reputation.
        </p>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600">
          Accept payments, build trust, and unlock reputation-based opportunities
          in the QIE ecosystem.
        </p>
        <Link
          href="/app/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-teal-600/25 hover:bg-teal-700"
        >
          Launch App
          <ArrowRight className="h-5 w-5" />
        </Link>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold">How it works</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { step: "1", title: "Connect Wallet", desc: "Use your QIE-compatible wallet as identity", icon: Wallet },
              { step: "2", title: "Create Request", desc: "Send a stablecoin payment invoice", icon: Zap },
              { step: "3", title: "Pay & Complete", desc: "Pay with QIEUSD and mark work done", icon: Shield },
              { step: "4", title: "Build Reputation", desc: "Earn reviews and a portable trust score", icon: Star },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-slate-200 p-6 text-center shadow-sm"
              >
                <item.icon className="mx-auto mb-3 h-8 w-8 text-teal-600" />
                <span className="text-xs font-bold text-teal-600">
                  STEP {item.step}
                </span>
                <h3 className="mt-1 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold">
            Why QIE Reputation Pay
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Portable Trust",
                desc: "Reputation follows your wallet across the QIE ecosystem.",
              },
              {
                title: "Stable Payments",
                desc: "Pay and receive in QIEUSD without volatility risk.",
              },
              {
                title: "On-Chain Proof",
                desc: "Completed work and reviews are verifiable on-chain.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <h3 className="font-semibold text-teal-700">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-10 text-center text-3xl font-bold">Use cases</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Palette, title: "Freelancers", desc: "Designers, developers, and consultants" },
              { icon: Users, title: "Creators", desc: "Artists, researchers, and content creators" },
              { icon: Store, title: "Small Merchants", desc: "Online shops and service providers" },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-xl border border-slate-200 p-6"
              >
                <item.icon className="h-10 w-10 shrink-0 text-teal-600" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QIE ecosystem */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">QIE Ecosystem Integration</h2>
          <p className="mx-auto mb-8 max-w-2xl text-slate-600">
            QIE Reputation Pay is a trust layer for stablecoin payments — helping
            freelancers, creators, and merchants build portable reputation.
          </p>
          <Link
            href="/app/about"
            className="inline-flex items-center gap-2 text-teal-600 font-medium hover:underline"
          >
            Learn more about QIE integration
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        QIE Reputation Pay · Hackathon MVP 2026
      </footer>
    </div>
  );
}
