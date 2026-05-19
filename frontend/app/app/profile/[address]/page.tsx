"use client";

import { use } from "react";
import Link from "next/link";
import { TrustBadge } from "@/components/TrustBadge";
import { ReputationBar } from "@/components/ReputationBar";
import { TrustExplanation } from "@/components/TrustExplanation";
import { ReviewCard } from "@/components/ReviewCard";
import {
  getProfileByAddress,
  getReviewsForUser,
  demoProfiles,
} from "@/lib/demoData";
import {
  useUserStatsOnChain,
} from "@/hooks/useReputationPay";
import { areContractsConfigured } from "@/lib/contracts";
import {
  calculateReputationScore,
  getTrustLevel,
  averageFromSum,
} from "@/lib/reputation";
import { truncateAddress, copyToClipboard, formatAmount } from "@/lib/utils";
import { toast } from "sonner";
import { Copy, ArrowLeft } from "lucide-react";
import { formatUnits } from "viem";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const { address } = use(params);
  const { data: onChainStats } = useUserStatsOnChain(address as `0x${string}`);

  const demoProfile = getProfileByAddress(address);
  const reviews = getReviewsForUser(address);

  let displayName = demoProfile?.displayName ?? "Unknown User";
  let role = demoProfile?.role ?? "Web3 User";
  let completedPayments = demoProfile?.completedPayments ?? 0;
  let averageRating = demoProfile?.averageRating ?? 0;
  let numberOfReviews = demoProfile?.numberOfReviews ?? 0;
  let totalReceived = demoProfile?.totalReceived ?? 0;

  if (areContractsConfigured() && onChainStats) {
    completedPayments = Number(onChainStats.completedPayments);
    totalReceived = Number(formatUnits(onChainStats.totalReceived, 18));
    numberOfReviews = Number(onChainStats.reviewCount);
    averageRating = averageFromSum(Number(onChainStats.ratingSum), numberOfReviews);
  }

  const reputationScore = calculateReputationScore(
    completedPayments,
    averageRating,
    numberOfReviews
  );
  const trustLevel = getTrustLevel(reputationScore);

  const copyAddress = () => {
    copyToClipboard(address);
    toast.success("Address copied!");
  };

  return (
    <div>
      <Link
        href="/app/dashboard"
        className="mb-6 inline-flex items-center gap-1 text-sm text-teal-600 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">{displayName}</h1>
            <p className="text-slate-600">{role}</p>
            <button
              onClick={copyAddress}
              className="mt-2 inline-flex items-center gap-1 font-mono text-sm text-slate-500 hover:text-teal-600"
            >
              {truncateAddress(address, 6)}
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
          <TrustBadge level={trustLevel} />
        </div>

        <ReputationBar score={reputationScore} />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Completed Payments</p>
            <p className="text-2xl font-bold">{completedPayments}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Average Rating</p>
            <p className="text-2xl font-bold">
              {averageRating > 0 ? `${averageRating}/5` : "—"}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Reviews</p>
            <p className="text-2xl font-bold">{numberOfReviews}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Total Received</p>
            <p className="text-2xl font-bold">
              {formatAmount(totalReceived)}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <TrustExplanation score={reputationScore} />
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">Recent Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No reviews yet for this user.</p>
        )}
      </section>

      <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="mb-3 font-semibold">Other Demo Profiles</h2>
        <div className="flex flex-wrap gap-2">
          {demoProfiles
            .filter((p) => p.address.toLowerCase() !== address.toLowerCase())
            .map((p) => (
              <Link
                key={p.address}
                href={`/app/profile/${p.address}`}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm hover:border-teal-300"
              >
                {p.displayName}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
