import type { TrustLevel } from "@/types";

export function calculateReputationScore(
  completedPayments: number,
  averageRating: number,
  numberOfReviews: number
): number {
  const raw =
    completedPayments * 10 + averageRating * 20 + numberOfReviews * 5;
  return Math.min(100, Math.round(raw));
}

export function getTrustLevel(score: number): TrustLevel {
  if (score <= 20) return "New User";
  if (score <= 50) return "Verified Starter";
  if (score <= 80) return "Trusted Seller";
  return "Highly Trusted";
}

export function getTrustLevelColor(level: TrustLevel): string {
  switch (level) {
    case "New User":
      return "bg-slate-100 text-slate-700";
    case "Verified Starter":
      return "bg-blue-100 text-blue-700";
    case "Trusted Seller":
      return "bg-teal-100 text-teal-700";
    case "Highly Trusted":
      return "bg-emerald-100 text-emerald-700";
  }
}

export function averageFromSum(ratingSum: number, reviewCount: number): number {
  if (reviewCount === 0) return 0;
  return Math.round((ratingSum / reviewCount) * 10) / 10;
}
