"use client";

import Link from "next/link";
import type { PaymentRequest } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { formatAmount, truncateAddress } from "@/lib/utils";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface PaymentRequestCardProps {
  request: PaymentRequest;
  showActions?: boolean;
}

export function PaymentRequestCard({
  request,
  showActions = true,
}: PaymentRequestCardProps) {
  const paymentLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/app/request/${request.id}`
      : `/app/request/${request.id}`;

  const copyLink = () => {
    navigator.clipboard.writeText(paymentLink);
    toast.success("Payment link copied!");
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-slate-400">
            Request #{request.id}
          </p>
          <h3 className="font-semibold text-slate-900">{request.title}</h3>
        </div>
        <StatusBadge status={request.status} />
      </div>
      <p className="mb-4 line-clamp-2 text-sm text-slate-600">
        {request.description}
      </p>
      <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-slate-500">Amount</span>
          <p className="font-medium">
            {formatAmount(request.amount, request.tokenSymbol)}
          </p>
        </div>
        <div>
          <span className="text-slate-500">Recipient</span>
          <p className="font-mono text-xs">
            {truncateAddress(request.recipient)}
          </p>
        </div>
        <div>
          <span className="text-slate-500">Category</span>
          <p className="font-medium">{request.category}</p>
        </div>
        <div>
          <span className="text-slate-500">Due</span>
          <p className="font-medium">{request.dueDate}</p>
        </div>
      </div>
      {showActions && (
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/app/request/${request.id}`}
            className="inline-flex items-center gap-1 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            {request.status === "Pending" ? "Pay into Escrow" : "View"}
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={copyLink}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
}
