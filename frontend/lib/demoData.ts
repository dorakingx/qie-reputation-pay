import type { PaymentRequest, Review, UserProfile } from "@/types";
import { calculateReputationScore, getTrustLevel } from "./reputation";

// Demo wallet addresses (valid checksum format for display)
export const DEMO_USERS = {
  alice: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  bob: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  carol: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
} as const;

/** Judge-friendly stable URLs (see app/app/request|profile/demo pages) */
export const DEMO_REQUEST_PATH = "/app/request/demo";
export const DEMO_REQUEST_TARGET_ID = "2";
export const DEMO_PROFILE_PATH = "/app/profile/demo";
export const DEMO_PROFILE_ADDRESS = DEMO_USERS.alice;

function buildProfile(
  address: string,
  displayName: string,
  role: string,
  completedPayments: number,
  averageRating: number,
  numberOfReviews: number,
  totalReceived: number,
  qiePassVerified = false
): UserProfile {
  const reputationScore = calculateReputationScore(
    completedPayments,
    averageRating,
    numberOfReviews
  );
  return {
    address,
    displayName,
    role,
    completedPayments,
    averageRating,
    numberOfReviews,
    totalReceived,
    reputationScore,
    trustLevel: getTrustLevel(reputationScore),
    qiePassVerified,
  };
}

export const demoProfiles: UserProfile[] = [
  buildProfile(
    DEMO_USERS.alice,
    "Maya Chen",
    "Freelance Designer",
    8,
    4.8,
    6,
    4200,
    true
  ),
  buildProfile(
    DEMO_USERS.bob,
    "Dr. Alex Rivera",
    "AI Researcher",
    5,
    4.5,
    4,
    2800,
    true
  ),
  buildProfile(
    DEMO_USERS.carol,
    "ShopWave Store",
    "Small Online Merchant",
    2,
    4.0,
    2,
    950,
    false
  ),
];

export const demoPaymentRequests: PaymentRequest[] = [
  {
    id: "1",
    title: "Brand Identity Design",
    description: "Logo and brand guidelines for AI research lab",
    amount: 250,
    tokenSymbol: "QIEUSD",
    recipient: DEMO_USERS.bob,
    payer: DEMO_USERS.alice,
    creator: DEMO_USERS.alice,
    dueDate: "2026-06-01",
    category: "Freelance Work",
    status: "Completed",
    createdAt: "2026-04-10",
  },
  {
    id: "2",
    title: "Research Dataset License",
    description: "Curated dataset for merchant analytics pilot",
    amount: 500,
    tokenSymbol: "QIEUSD",
    recipient: DEMO_USERS.carol,
    payer: DEMO_USERS.bob,
    creator: DEMO_USERS.bob,
    dueDate: "2026-06-15",
    category: "Research Support",
    status: "Escrowed",
    createdAt: "2026-04-12",
  },
  {
    id: "3",
    title: "Product Photography Pack",
    description: "20 edited photos for e-commerce listings",
    amount: 180,
    tokenSymbol: "QIEUSD",
    recipient: DEMO_USERS.alice,
    creator: DEMO_USERS.carol,
    dueDate: "2026-05-28",
    category: "Digital Art",
    status: "Pending",
    createdAt: "2026-04-18",
  },
  {
    id: "4",
    title: "LLM Fine-tuning Consultation",
    description: "2-hour strategy session on domain adaptation",
    amount: 320,
    tokenSymbol: "QIEUSD",
    recipient: DEMO_USERS.bob,
    creator: DEMO_USERS.carol,
    dueDate: "2026-05-20",
    category: "Consulting",
    status: "Pending",
    createdAt: "2026-04-19",
  },
  {
    id: "5",
    title: "Storefront UI Refresh",
    description: "Mobile-first redesign for ShopWave checkout",
    amount: 600,
    tokenSymbol: "QIEUSD",
    recipient: DEMO_USERS.alice,
    payer: DEMO_USERS.carol,
    creator: DEMO_USERS.carol,
    dueDate: "2026-05-10",
    category: "Small Merchant",
    status: "Completed",
    createdAt: "2026-03-28",
  },
];

export const demoReviews: Review[] = [
  {
    id: "r1",
    requestId: "1",
    reviewer: DEMO_USERS.alice,
    reviewee: DEMO_USERS.bob,
    rating: 5,
    text: "Excellent research collaboration. Delivered on time with clear documentation.",
    createdAt: "2026-04-11",
  },
  {
    id: "r2",
    requestId: "5",
    reviewer: DEMO_USERS.carol,
    reviewee: DEMO_USERS.alice,
    rating: 5,
    text: "Beautiful UI work. Our conversion rate improved noticeably.",
    createdAt: "2026-04-02",
  },
  {
    id: "r3",
    requestId: "1",
    reviewer: DEMO_USERS.bob,
    reviewee: DEMO_USERS.alice,
    rating: 5,
    text: "Creative and professional brand design. Highly recommend Maya.",
    createdAt: "2026-04-12",
  },
  {
    id: "r4",
    requestId: "2",
    reviewer: DEMO_USERS.bob,
    reviewee: DEMO_USERS.carol,
    rating: 4,
    text: "Good dataset quality. Minor formatting issues but resolved quickly.",
    createdAt: "2026-04-14",
  },
  {
    id: "r5",
    requestId: "5",
    reviewer: DEMO_USERS.alice,
    reviewee: DEMO_USERS.carol,
    rating: 4,
    text: "Clear brief and fast payment. Would work together again.",
    createdAt: "2026-04-03",
  },
];

export function getProfileByAddress(address: string): UserProfile | undefined {
  return demoProfiles.find(
    (p) => p.address.toLowerCase() === address.toLowerCase()
  );
}

export function getRequestById(id: string): PaymentRequest | undefined {
  const resolvedId = id === "demo" ? DEMO_REQUEST_TARGET_ID : id;
  return demoPaymentRequests.find((r) => r.id === resolvedId);
}

export function getReviewsForUser(address: string): Review[] {
  return demoReviews.filter(
    (r) => r.reviewee.toLowerCase() === address.toLowerCase()
  );
}

export function getRequestsForUser(address: string): PaymentRequest[] {
  const lower = address.toLowerCase();
  return demoPaymentRequests.filter(
    (r) =>
      r.recipient.toLowerCase() === lower ||
      r.creator.toLowerCase() === lower ||
      r.payer?.toLowerCase() === lower
  );
}
