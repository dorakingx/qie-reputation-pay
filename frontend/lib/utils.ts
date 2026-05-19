import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateAddress(address: string, chars = 4): string {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-chars)}`;
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function formatAmount(amount: number, symbol = "QIEUSD"): string {
  return `${amount.toLocaleString()} ${symbol}`;
}

export function getExplorerUrl(chainId: number, hash: string, type: "tx" | "address" = "tx"): string {
  const base = chainId === 1983 ? "https://testnet.qie.digital" : "";
  if (!base) return "#";
  return type === "tx" ? `${base}/tx/${hash}` : `${base}/address/${hash}`;
}
