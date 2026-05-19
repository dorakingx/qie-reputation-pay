import {
  Wallet,
  Shield,
  Coins,
  ArrowLeftRight,
  LineChart,
} from "lucide-react";
import Link from "next/link";

const integrations = [
  {
    icon: Wallet,
    title: "QIE Wallet",
    status: "Active",
    description:
      "Used for login and payment authorization. Your wallet address is your portable identity across the QIE ecosystem.",
  },
  {
    icon: Shield,
    title: "QIE Pass",
    status: "Planned",
    description:
      "Planned integration for identity verification and Sybil resistance. Will strengthen trust scores with verified credentials.",
  },
  {
    icon: Coins,
    title: "QIE Stable Coin (QUSDC)",
    status: "Active (MockQIEUSD for demo)",
    description:
      "Used for stable payments between users. Production will integrate QUSDC — a fully reserved stablecoin on QIE.",
    link: "https://docs.stable.qie.digital/",
  },
  {
    icon: ArrowLeftRight,
    title: "QIE DEX",
    status: "Future",
    description:
      "Future feature for automatic conversion of received payments into other assets after completion.",
  },
  {
    icon: LineChart,
    title: "QIE Oracle",
    status: "Future",
    description:
      "Future feature for risk scoring and market-based credit limits based on on-chain reputation data.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold">QIE Ecosystem Integration</h1>
      <p className="mb-8 text-slate-600">
        QIE Reputation Pay is a trust layer for stablecoin payments. It helps
        freelancers, creators, and small merchants receive payments while building
        portable reputation across the QIE ecosystem.
      </p>

      <div className="mb-8 rounded-xl border border-teal-200 bg-teal-50 p-6">
        <p className="text-sm font-medium text-teal-800">Hackathon Positioning</p>
        <p className="mt-2 text-teal-900">
          &ldquo;QIE Reputation Pay is a trust layer for stablecoin payments. It
          helps freelancers, creators, and small merchants receive payments while
          building portable reputation across the QIE ecosystem.&rdquo;
        </p>
      </div>

      <div className="space-y-4">
        {integrations.map((item) => (
          <div
            key={item.title}
            className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <item.icon className="h-8 w-8 shrink-0 text-teal-600" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">{item.title}</h2>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    item.status === "Active"
                      ? "bg-emerald-100 text-emerald-700"
                      : item.status.includes("Mock")
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-teal-600 hover:underline"
                >
                  Learn more →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-slate-900 p-6 text-white">
        <h2 className="mb-2 font-semibold">Network Details</h2>
        <ul className="space-y-1 text-sm text-slate-300">
          <li>QIE Testnet Chain ID: 1983</li>
          <li>RPC: https://rpc1testnet.qie.digital/</li>
          <li>Explorer: https://testnet.qie.digital/</li>
          <li>Faucet: https://www.qie.digital/faucet</li>
        </ul>
      </div>

      <Link
        href="/app/dashboard"
        className="mt-8 inline-block text-teal-600 hover:underline"
      >
        ← Back to Dashboard
      </Link>
    </div>
  );
}
