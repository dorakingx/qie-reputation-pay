"use client";

import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { parseUnits, formatUnits, keccak256, toBytes } from "viem";
import {
  reputationPayAbi,
  mockQIEUSDAbi,
  getContractAddresses,
  areContractsConfigured,
} from "@/lib/contracts";
import type { PaymentRequest, PaymentStatus } from "@/types";
import { insertPaymentMetadata, saveReviewText } from "@/lib/supabase";

export function useContractAddresses() {
  const { chainId } = useAccount();
  return getContractAddresses(chainId ?? 31337);
}

export function usePaymentRequestOnChain(requestId: string) {
  const { reputationPay } = useContractAddresses();
  const id = BigInt(requestId);

  const { data, refetch, isLoading } = useReadContract({
    address: reputationPay,
    abi: reputationPayAbi,
    functionName: "getPaymentRequest",
    args: [id],
    query: { enabled: Boolean(reputationPay) && areContractsConfigured() },
  });

  return { data, refetch, isLoading };
}

export function useEscrowBalance(requestId: string) {
  const { reputationPay } = useContractAddresses();
  const { data, refetch } = useReadContract({
    address: reputationPay,
    abi: reputationPayAbi,
    functionName: "getEscrowBalance",
    args: [BigInt(requestId)],
    query: { enabled: Boolean(reputationPay) && areContractsConfigured() },
  });
  return { balance: data, refetch };
}

export function useUserStatsOnChain(address?: string) {
  const { reputationPay } = useContractAddresses();

  const { data, refetch, isLoading } = useReadContract({
    address: reputationPay,
    abi: reputationPayAbi,
    functionName: "getUserStats",
    args: [address as `0x${string}`],
    query: {
      enabled: Boolean(reputationPay && address) && areContractsConfigured(),
    },
  });

  return { data, refetch, isLoading };
}

type OnChainPaymentRequest = {
  id: bigint;
  payer: `0x${string}`;
  recipient: `0x${string}`;
  token: `0x${string}`;
  amount: bigint;
  title: string;
  description: string;
  paid: boolean;
  completed: boolean;
  refunded: boolean;
  createdAt: bigint;
};

export function mapOnChainToPaymentRequest(
  raw: OnChainPaymentRequest,
  metadata?: { dueDate?: string; category?: string; creator?: string }
): PaymentRequest {
  const { payer, recipient, amount, title, description, paid, completed, refunded, createdAt } =
    raw;

  let status: PaymentStatus = "Pending";
  if (refunded) status = "Refunded";
  else if (completed) status = "Completed";
  else if (paid) status = "Escrowed";

  const amountNum = Number(formatUnits(amount, 18));

  return {
    id: raw.id.toString(),
    title,
    description,
    amount: amountNum,
    tokenSymbol: "QIEUSD",
    recipient,
    payer: payer === "0x0000000000000000000000000000000000000000" ? undefined : payer,
    creator: metadata?.creator ?? recipient,
    dueDate: metadata?.dueDate ?? "—",
    category: (metadata?.category as PaymentRequest["category"]) ?? "Other",
    status,
    escrowAmount: paid && !completed && !refunded ? amountNum : undefined,
    createdAt: new Date(Number(createdAt) * 1000).toISOString().split("T")[0],
  };
}

export function useCreatePaymentRequest() {
  const { mockQIEUSD, reputationPay } = useContractAddresses();
  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const create = async (params: {
    recipient: `0x${string}`;
    amount: string;
    title: string;
    description: string;
    dueDate: string;
    category: string;
    creator: string;
  }) => {
    if (!reputationPay || !mockQIEUSD) throw new Error("Contracts not configured");

    const amountWei = parseUnits(params.amount, 18);

    const txHash = await writeContractAsync({
      address: reputationPay,
      abi: reputationPayAbi,
      functionName: "createPaymentRequest",
      args: [
        params.recipient,
        mockQIEUSD,
        amountWei,
        params.title,
        params.description,
      ],
    });

    return txHash;
  };

  const saveMetadata = async (
    requestId: number,
    params: {
      dueDate: string;
      category: string;
      createdBy: string;
    }
  ) => {
    await insertPaymentMetadata({
      requestId,
      dueDate: params.dueDate,
      category: params.category as Parameters<typeof insertPaymentMetadata>[0]["category"],
      createdBy: params.createdBy,
    });
  };

  return { create, saveMetadata, isPending: isPending || isConfirming, hash };
}

export function usePayRequest() {
  const { mockQIEUSD, reputationPay } = useContractAddresses();
  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const pay = async (requestId: string, amount: string) => {
    if (!reputationPay || !mockQIEUSD) throw new Error("Contracts not configured");

    const amountWei = parseUnits(amount, 18);

    await writeContractAsync({
      address: mockQIEUSD,
      abi: mockQIEUSDAbi,
      functionName: "approve",
      args: [reputationPay, amountWei],
    });

    await writeContractAsync({
      address: reputationPay,
      abi: reputationPayAbi,
      functionName: "payRequest",
      args: [BigInt(requestId)],
    });
  };

  return { pay, isPending: isPending || isConfirming, hash };
}

export function useMarkCompleted() {
  const { reputationPay } = useContractAddresses();
  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const markCompleted = async (requestId: string) => {
    if (!reputationPay) throw new Error("Contracts not configured");
    await writeContractAsync({
      address: reputationPay,
      abi: reputationPayAbi,
      functionName: "markCompleted",
      args: [BigInt(requestId)],
    });
  };

  return { markCompleted, isPending: isPending || isConfirming, hash };
}

export function useRefundRequest() {
  const { reputationPay } = useContractAddresses();
  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const refund = async (requestId: string) => {
    if (!reputationPay) throw new Error("Contracts not configured");
    await writeContractAsync({
      address: reputationPay,
      abi: reputationPayAbi,
      functionName: "refundRequest",
      args: [BigInt(requestId)],
    });
  };

  return { refund, isPending: isPending || isConfirming, hash };
}

export function useLeaveReview() {
  const { reputationPay } = useContractAddresses();
  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const leaveReview = async (
    requestId: string,
    rating: number,
    reviewText: string
  ) => {
    if (!reputationPay) throw new Error("Contracts not configured");
    const reviewHash = keccak256(toBytes(reviewText));
    await writeContractAsync({
      address: reputationPay,
      abi: reputationPayAbi,
      functionName: "leaveReview",
      args: [BigInt(requestId), rating, reviewHash],
    });
    await saveReviewText({
      requestId: parseInt(requestId, 10),
      text: reviewText,
      reviewHash,
    });
  };

  return { leaveReview, isPending: isPending || isConfirming, hash };
}
