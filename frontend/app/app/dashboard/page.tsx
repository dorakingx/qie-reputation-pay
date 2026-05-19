"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { StatCard } from "@/components/StatCard";
import { PaymentRequestCard } from "@/components/PaymentRequestCard";
import { ReviewCard } from "@/components/ReviewCard";
import {
  demoPaymentRequests,
  demoReviews,
  getRequestsForUser,
  getProfileByAddress,
  demoProfiles,
} from "@/lib/demoData";
import { calculateReputationScore, averageFromSum } from "@/lib/reputation";
import { useUserStatsOnChain } from "@/hooks/useReputationPay";
import { areContractsConfigured } from "@/lib/contracts";
import { FileText, DollarSign, Star, Plus } from "lucide-react";
import { formatUnits } from "viem";

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const { data: onChainStats } = useUserStatsOnChain(address);

  const useOnChain = areContractsConfigured() && onChainStats;

  let completedPayments = 0;
  let avgRating = 0;
  let reviewCount = 0;
  let totalReceived = 0;
  let reputationScore = 0;

  if (useOnChain && onChainStats) {
    completedPayments = Number(onChainStats.completedPayments);
    totalReceived = Number(formatUnits(onChainStats.totalReceived, 18));
    reviewCount = Number(onChainStats.reviewCount);
    avgRating = averageFromSum(Number(onChainStats.ratingSum), reviewCount);
    reputationScore = calculateReputationScore(
      completedPayments,
      avgRating,
      reviewCount
    );
  } else if (address) {
    const profile = getProfileByAddress(address);
    if (profile) {
      completedPayments = profile.completedPayments;
      avgRating = profile.averageRating;
      reviewCount = profile.numberOfReviews;
      totalReceived = profile.totalReceived;
      reputationScore = profile.reputationScore;
    }
  }

  const userRequests = address
    ? getRequestsForUser(address)
    : demoPaymentRequests.slice(0, 3);

  const recentReviews = address
    ? demoReviews.filter((r) => r.reviewee.toLowerCase() === address.toLowerCase()).slice(0, 3)
    : demoReviews.slice(0, 3);

  const invoicesCreated = address
    ? getRequestsForUser(address).filter(
        (r) => r.creator.toLowerCase() === address.toLowerCase()
      ).length
    : demoPaymentRequests.length;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600">
            {isConnected
              ? "Your payment activity and reputation overview"
              : "Connect wallet to see your stats — showing demo data"}
          </p>
        </div>
        <Link
          href="/app/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-700"
        >
          <Plus className="h-4 w-4" />
          Create Payment Request
        </Link>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Invoices Created" value={invoicesCreated} icon={FileText} />
        <StatCard
          label="Payments Received"
          value={completedPayments}
          icon={DollarSign}
        />
        <StatCard label="Reputation Score" value={`${reputationScore}/100`} icon={Star} />
        <StatCard
          label="Total Received"
          value={`${totalReceived.toLocaleString()} QIEUSD`}
          icon={DollarSign}
        />
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 text-lg font-semibold">Recent Payment Requests</h2>
          <div className="space-y-4">
            {userRequests.length > 0 ? (
              userRequests.slice(0, 3).map((req) => (
                <PaymentRequestCard key={req.id} request={req} />
              ))
            ) : (
              <p className="text-sm text-slate-500">No payment requests yet.</p>
            )}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">Recent Reviews</h2>
          <div className="space-y-4">
            {recentReviews.length > 0 ? (
              recentReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <p className="text-sm text-slate-500">No reviews yet.</p>
            )}
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Demo Profiles</h2>
        <p className="mb-4 text-sm text-slate-600">
          Explore trust profiles for hackathon demo users:
        </p>
        <div className="flex flex-wrap gap-3">
          {demoProfiles.map((p) => (
            <Link
              key={p.address}
              href={`/app/profile/${p.address}`}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:border-teal-300 hover:bg-teal-50"
            >
              {p.displayName} · {p.trustLevel}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
