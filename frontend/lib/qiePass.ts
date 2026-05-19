import { demoProfiles } from "./demoData";

const STORAGE_PREFIX = "qie-pass-verified-";

export function isQiePassVerified(address: string): boolean {
  if (!address) return false;
  const lower = address.toLowerCase();
  const profile = demoProfiles.find((p) => p.address.toLowerCase() === lower);
  if (profile?.qiePassVerified) return true;
  if (typeof window === "undefined") return false;
  return localStorage.getItem(`${STORAGE_PREFIX}${lower}`) === "true";
}

export function verifyWithQiePass(address: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${STORAGE_PREFIX}${address.toLowerCase()}`, "true");
}
