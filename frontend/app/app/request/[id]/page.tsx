"use client";

import { use, useState } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { EscrowBadge } from "@/components/EscrowBadge";
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
  useRefundRequest,
  useEscrowBalance,
} from "@/hooks/useReputationPay";
import { areContractsConfigured } from "@/lib/contracts";
import { truncateAddress, formatAmount, copyToClipboard } from "@/lib/utils";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { ExplorerLink } from "@/components/ExplorerLink";
import type { PaymentRequest } from "@/types";
import { formatUnits } from "viem";

export default function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { address, isConnected } = useAccount();
  const { data: onChainData, refetch } = usePaymentRequestOnChain(id);
  const { balance: escrowBalance } = useEscrowBalance(id);
  const { pay, isPending: isPaying, hash: payHash } = usePayRequest();
  const { markCompleted, isPending: isCompleting, hash: completeHash } =
    useMarkCompleted();
  const { refund, isPending: isRefunding, hash: refundHash } = useRefundRequest();
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
      <div className="py-12 text-center">
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
  const canComplete = request.status === "Escrowed" && isRecipient;
  const canReview = request.status === "Completed" && isPayer;
  const canRefund =
    request.status === "Escrowed" && isPayer && areContractsConfigured();

  const escrowDisplay =
    escrowBalance !== undefined
      ? Number(formatUnits(escrowBalance as bigint, 18))
      : request.escrowAmount ?? request.amount;

  const handlePay = async () => {
    try {
      if (areContractsConfigured()) {
        await pay(id, String(request.amount));
        toast.success("Funds deposited into escrow!");
        refetch();
      } else {
        const updated: PaymentRequest = {
          ...request,
          status: "Escrowed",
          payer: address,
          escrowAmount: request.amount,
        };
        setLocalRequest(updated);
        const idx = demoPaymentRequests.findIndex((r) => r.id === id);
        if (idx >= 0) demoPaymentRequests[idx] = updated;
        toast.success("Payment escrowed (demo mode)");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Escrow deposit failed");
    }
  };

  const handleComplete = async () => {
    try {
      if (areContractsConfigured()) {
        await markCompleted(id);
        toast.success("Escrow released to recipient!");
        refetch();
      } else {
        const updated = { ...request, status: "Completed" as const };
        setLocalRequest(updated);
        const idx = demoPaymentRequests.findIndex((r) => r.id === id);
        if (idx >= 0) demoPaymentRequests[idx] = updated;
        toast.success("Escrow released (demo mode)");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    }
  };

  const handleRefund = async () => {
    try {
      await refund(id);
      toast.success("Escrow refunded to payer");
      refetch();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Refund failed — wait for refund delay on local/testnet"
      );
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
        toast.success("Review hash stored on-chain!");
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
        <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-sm text-slate-500">Request #{request.id}</p>
            <h1 className="text-2xl font-bold">{request.title}</h1>
            <p className="mt-1 text-sm text-slate-500">
              Escrow-backed stablecoin payment
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge status={request.status} />
            <EscrowBadge status={request.status} />
          </div>
        </div>

        <p className="mb-6 text-slate-600">{request.description}</p>

        <div className="mb-6 grid gap-3 rounded-lg bg-slate-50 p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Amount</span>
            <span className="font-semibold">
              {formatAmount(request.amount, request.tokenSymbol)}
            </span>
          </div>
          {request.status === "Escrowed" && (
            <div className="flex justify-between">
              <span className="text-slate-500">In escrow</span>
              <span className="font-semibold text-blue-700">
                {formatAmount(escrowDisplay, request.tokenSymbol)}
              </span>
            </div>
          )}
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
              {isPaying ? "Depositing..." : "Pay into Escrow (QIEUSD)"}
            </button>
          )}
          {canComplete && (
            <button
              onClick={handleComplete}
              disabled={isCompleting}
              className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {isCompleting ? "Releasing..." : "Release Escrow & Complete"}
            </button>
          )}
          {canRefund && (
            <button
              onClick={handleRefund}
              disabled={isRefunding}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
            >
              {isRefunding ? "Refunding..." : "Refund Escrow"}
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
          <ExplorerLink hash={payHash} label="Escrow tx" />
          <ExplorerLink hash={completeHash} label="Release tx" />
          <ExplorerLink hash={refundHash} label="Refund tx" />
          <ExplorerLink hash={reviewHash} label="Review tx" />
        </div>

        {canReview && (
          <div className="mt-8 border-t border-slate-200 pt-6">
            <h2 className="mb-4 font-semibold">Leave a Review</h2>
            <p className="mb-3 text-xs text-slate-500">
              Rating is stored on-chain; full text is hashed for integrity (off-chain in Supabase when configured).
            </p>
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
