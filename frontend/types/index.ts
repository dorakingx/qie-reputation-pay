export type PaymentStatus = "Pending" | "Escrowed" | "Completed" | "Refunded";

export type PaymentCategory =
  | "Freelance Work"
  | "Digital Art"
  | "Research Support"
  | "Consulting"
  | "Small Merchant"
  | "Other";

export type TrustLevel =
  | "New User"
  | "Verified Starter"
  | "Trusted Seller"
  | "Highly Trusted";

export interface UserProfile {
  address: string;
  displayName: string;
  role: string;
  completedPayments: number;
  averageRating: number;
  numberOfReviews: number;
  totalReceived: number;
  reputationScore: number;
  trustLevel: TrustLevel;
  qiePassVerified: boolean;
}

export interface PaymentRequest {
  id: string;
  title: string;
  description: string;
  amount: number;
  tokenSymbol: string;
  recipient: string;
  payer?: string;
  creator: string;
  dueDate: string;
  category: PaymentCategory;
  status: PaymentStatus;
  createdAt: string;
  escrowAmount?: number;
}

export interface Review {
  id: string;
  requestId: string;
  reviewer: string;
  reviewee: string;
  rating: number;
  text: string;
  reviewHash?: string;
  createdAt: string;
}
