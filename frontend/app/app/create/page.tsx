"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import type { PaymentCategory } from "@/types";
import { useCreatePaymentRequest } from "@/hooks/useReputationPay";
import { areContractsConfigured } from "@/lib/contracts";
import { demoPaymentRequests } from "@/lib/demoData";
import { toast } from "sonner";
import { PaymentRequestCard } from "@/components/PaymentRequestCard";
import type { PaymentRequest } from "@/types";

const CATEGORIES: PaymentCategory[] = [
  "Freelance Work",
  "Digital Art",
  "Research Support",
  "Consulting",
  "Small Merchant",
  "Other",
];

export default function CreatePaymentRequestPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { create, saveMetadata, isPending } = useCreatePaymentRequest();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("QIEUSD");
  const [recipient, setRecipient] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState<PaymentCategory>("Freelance Work");
  const [createdRequest, setCreatedRequest] = useState<PaymentRequest | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!recipient || !amount || !title) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      if (areContractsConfigured()) {
        const hash = await create({
          recipient: recipient as `0x${string}`,
          amount,
          title,
          description,
          dueDate,
          category,
          creator: address,
        });
        toast.success("Payment request created on-chain!", {
          description: `Tx: ${hash.slice(0, 10)}...`,
        });
        // For MVP, redirect to dashboard; request ID from events would be ideal
        router.push("/app/dashboard");
        return;
      }

      // Mock mode: create local request
      const newId = String(demoPaymentRequests.length + 1);
      const newRequest: PaymentRequest = {
        id: newId,
        title,
        description,
        amount: parseFloat(amount),
        tokenSymbol,
        recipient,
        creator: address,
        dueDate: dueDate || new Date().toISOString().split("T")[0],
        category,
        status: "Pending",
        createdAt: new Date().toISOString().split("T")[0],
      };

      demoPaymentRequests.unshift(newRequest);
      setCreatedRequest(newRequest);
      toast.success("Payment request created (demo mode)");

      await saveMetadata(parseInt(newId), {
        dueDate: dueDate || new Date().toISOString(),
        category,
        createdBy: address,
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create request");
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-2xl font-bold">Create Payment Request</h1>
      <p className="mb-8 text-slate-600">
        Send a stablecoin invoice to a client or collaborator.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            placeholder="e.g. Brand Identity Design"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            placeholder="Describe the work or deliverables"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Amount *</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              placeholder="250"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Token</label>
            <input
              type="text"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-slate-50"
              readOnly
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Recipient Wallet *
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            placeholder="0x..."
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as PaymentCategory)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-50"
        >
          {isPending ? "Creating..." : "Create Payment Request"}
        </button>
      </form>

      {createdRequest && (
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold">Payment Request Created</h2>
          <PaymentRequestCard request={createdRequest} />
        </div>
      )}
    </div>
  );
}
