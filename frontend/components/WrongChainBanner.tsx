"use client";

import { useAccount } from "wagmi";
import { getExpectedChainId, areContractsConfigured } from "@/lib/contracts";
import { AlertTriangle } from "lucide-react";

const CHAIN_NAMES: Record<number, string> = {
  1983: "QIE Testnet",
  31337: "Hardhat Local",
};

export function WrongChainBanner() {
  const { chainId, isConnected } = useAccount();
  const expected = getExpectedChainId();

  if (!isConnected || !areContractsConfigured()) return null;
  if (chainId === expected) return null;

  const expectedName = CHAIN_NAMES[expected] ?? `Chain ${expected}`;

  return (
    <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <div>
        <p className="font-medium">Wrong network</p>
        <p>
          Switch your wallet to <strong>{expectedName}</strong> (chain ID {expected})
          to use escrow-backed payments.
        </p>
      </div>
    </div>
  );
}
