"use client";

import { useChainId } from "wagmi";
import { getExplorerUrl } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

export function ExplorerLink({
  hash,
  type = "tx",
  label = "View on Explorer",
}: {
  hash?: string;
  type?: "tx" | "address";
  label?: string;
}) {
  const chainId = useChainId();
  if (!hash || hash === "#") return null;

  const url = getExplorerUrl(chainId, hash, type);
  if (url === "#") return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm text-teal-600 hover:underline"
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}
