export function getTrustExplanation(score: number): string {
  if (score > 80) {
    return "This user has a strong transaction history, high ratings, and multiple completed payments. They appear highly reliable.";
  }
  if (score >= 50) {
    return "This user has a growing reputation with several completed transactions. They appear reasonably trustworthy.";
  }
  return "This user is still building their reputation. Consider using escrow or smaller payments first.";
}
