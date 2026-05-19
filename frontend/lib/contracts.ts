// Contract ABIs - minimal interfaces for wagmi hooks
export const mockQIEUSDAbi = [
  {
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const reputationPayAbi = [
  {
    inputs: [
      { name: "recipient", type: "address" },
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "title", type: "string" },
      { name: "description", type: "string" },
    ],
    name: "createPaymentRequest",
    outputs: [{ name: "requestId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "requestId", type: "uint256" }],
    name: "payRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "requestId", type: "uint256" }],
    name: "markCompleted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "requestId", type: "uint256" },
      { name: "rating", type: "uint8" },
      { name: "reviewText", type: "string" },
    ],
    name: "leaveReview",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "requestId", type: "uint256" }],
    name: "getPaymentRequest",
    outputs: [
      {
        components: [
          { name: "id", type: "uint256" },
          { name: "payer", type: "address" },
          { name: "recipient", type: "address" },
          { name: "token", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "title", type: "string" },
          { name: "description", type: "string" },
          { name: "paid", type: "bool" },
          { name: "completed", type: "bool" },
          { name: "createdAt", type: "uint256" },
        ],
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "user", type: "address" }],
    name: "getUserStats",
    outputs: [
      {
        components: [
          { name: "completedPayments", type: "uint256" },
          { name: "totalReceived", type: "uint256" },
          { name: "reviewCount", type: "uint256" },
          { name: "ratingSum", type: "uint256" },
        ],
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "requestId", type: "uint256" }],
    name: "getReview",
    outputs: [
      {
        components: [
          { name: "requestId", type: "uint256" },
          { name: "reviewer", type: "address" },
          { name: "reviewee", type: "address" },
          { name: "rating", type: "uint8" },
          { name: "reviewText", type: "string" },
          { name: "createdAt", type: "uint256" },
        ],
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextRequestId",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function getContractAddresses(chainId: number) {
  const mock =
    process.env.NEXT_PUBLIC_MOCK_QIEUSD_ADDRESS as `0x${string}` | undefined;
  const rep =
    process.env.NEXT_PUBLIC_REPUTATION_PAY_ADDRESS as `0x${string}` | undefined;

  // Try deployed.ts if env not set
  if (mock && rep) {
    return { mockQIEUSD: mock, reputationPay: rep, isConfigured: true };
  }

  return { mockQIEUSD: undefined, reputationPay: undefined, isConfigured: false };
}

export function areContractsConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_MOCK_QIEUSD_ADDRESS &&
      process.env.NEXT_PUBLIC_REPUTATION_PAY_ADDRESS
  );
}
