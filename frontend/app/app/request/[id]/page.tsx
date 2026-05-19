"use client";

import { use, useState } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import {
  getRequestById,
  demoPaymentRequests,
} from "@/lib/demoData";
import {
  usePaymentRequestOnChain,
  mapOnChainToPaymentRequest,
  usePayRequest,
  useMarkCompleted,
  useLeaveReview,
} from "@/hooks/useReputationPay";
import { areContractsConfigured } from "@/lib/contracts";
import { truncateAddress, formatAmount, copyToClipboard } from "@/lib/utils";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { ExplorerLink } from "@/components/ExplorerLink";
import type { PaymentRequest } from "@/types";

export default function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { address, isConnected } = useAccount();
  const { data: onChainData, refetch } = usePaymentRequestOnChain(id);
  const { pay, isPending: isPaying, hash: payHash } = usePayRequest();
  const { markCompleted, isPending: isCompleting, hash: completeHash } =
    useMarkCompleted();
  const { leaveReview, isPending: isReviewing, hash: reviewHash } =
    useLeaveReview();

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [localRequest, setLocalRequest] = useState<PaymentRequest | undefined>(
    getRequestById(id)
  );

  let request = localRequest;

  if (areContractsConfigured() && onChainData) {
    request = mapOnChainToPaymentRequest(onChainData);
  }

  if (!request) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Payment request not found.</p>
        <Link href="/app/dashboard" className="mt-4 text-teal-600 hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const isRecipient =
    address?.toLowerCase() === request.recipient.toLowerCase();
  const isPayer =
    address?.toLowerCase() === request.payer?.toLowerCase();
  const canPay = request.status === "Pending" && isConnected && !isRecipient;
  const canComplete = request.status === "Paid" && isRecipient;
  const canReview = request.status === "Completed" && isPayer;

  const handlePay = async () => {
    try {
      if (areContractsConfigured()) {
        await pay(id, String(request.amount));
        toast.success("Payment successful!");
        refetch();
      } else {
        const updated = { ...request, status: "Paid" as const, payer: address };
        setLocalRequest(updated);
        const idx = demoPaymentRequests.findIndex((r) => r.id === id);
        if (idx >= 0) demoPaymentRequests[idx] = updated;
        toast.success("Payment marked as paid (demo mode)");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Payment failed");
    }
  };

  const handleComplete = async () => {
    try {
      if (areContractsConfigured()) {
        await markCompleted(id);
        toast.success("Marked as completed!");
        refetch();
      } else {
        const updated = { ...request, status: "Completed" as const };
        setLocalRequest(updated);
        const idx = demoPaymentRequests.findIndex((r) => r.id === id);
        if (idx >= 0) demoPaymentRequests[idx] = updated;
        toast.success("Work marked complete (demo mode)");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    }
  };

  const handleReview = async () => {
    if (!reviewText.trim()) {
      toast.error("Please enter review text");
      return;
    }
    try {
      if (areContractsConfigured()) {
        await leaveReview(id, rating, reviewText);
        toast.success("Review submitted on-chain!");
        refetch();
      } else {
        toast.success("Review submitted (demo mode)");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Review failed");
    }
  };

  const copyLink = () => {
    copyToClipboard(window.location.href);
    toast.success("Link copied!");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/app/dashboard"
        className="mb-6 inline-block text-sm text-teal-600 hover:underline"
      >
        ← Back to dashboard
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500">Request #{request.id}</p>
            <h1 className="text-2xl font-bold">{request.title}</h1>
          </div>
          <StatusBadge status={request.status} />
        </div>

        <p className="mb-6 text-slate-600">{request.description}</p>

        <div className="mb-6 grid gap-3 rounded-lg bg-slate-50 p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Amount</span>
            <span className="font-semibold">
              {formatAmount(request.amount, request.tokenSymbol)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Recipient</span>
            <span className="font-mono">{truncateAddress(request.recipient)}</span>
          </div>
          {request.payer && (
            <div className="flex justify-between">
              <span className="text-slate-500">Payer</span>
              <span className="font-mono">{truncateAddress(request.payer)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-500">Category</span>
            <span>{request.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Due Date</span>
            <span>{request.dueDate}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {canPay && (
            <button
              onClick={handlePay}
              disabled={isPaying}
              className="rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-50"
            >
              {isPaying ? "Processing..." : "Pay with QIEUSD"}
            </button>
          )}
          {canComplete && (
            <button
              onClick={handleComplete}
              disabled={isCompleting}
              className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {isCompleting ? "Processing..." : "Mark as Completed"}
            </button>
          )}
          <button
            onClick={copyLink}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium hover:bg-slate-50"
          >
            <Copy className="h-4 w-4" />
            Copy Payment Link
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          <ExplorerLink hash={payHash} label="Payment tx" />
          <ExplorerLink hash={completeHash} label="Completion tx" />
          <ExplorerLink hash={reviewHash} label="Review tx" />
        </div>

        {canReview && (
          <div className="mt-8 border-t border-slate-200 pt-6">
            <h2 className="mb-4 font-semibold">Leave a Review</h2>
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">Rating (1-5)</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} stars
                  </option>
                ))}
              </select>
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={3}
              className="mb-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Share your experience..."
            />
            <button
              onClick={handleReview}
              disabled={isReviewing}
              className="rounded-lg bg-teal-600 px-6 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-50"
            >
              {isReviewing ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
