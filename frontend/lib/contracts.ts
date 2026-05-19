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
    inputs: [{ name: "requestId", type: "uint256" }],
    name: "refundRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "requestId", type: "uint256" },
      { name: "rating", type: "uint8" },
      { name: "reviewHash", type: "bytes32" },
    ],
    name: "leaveReview",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "requestId", type: "uint256" }],
    name: "getEscrowBalance",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
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
          { name: "refunded", type: "bool" },
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
    inputs: [],
    name: "refundDelay",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function getExpectedChainId(): number {
  const id = process.env.NEXT_PUBLIC_CHAIN_ID;
  return id ? Number(id) : 1983;
}

export function getContractAddresses(chainId: number) {
  const mock =
    process.env.NEXT_PUBLIC_MOCK_QIEUSD_ADDRESS as `0x${string}` | undefined;
  const rep =
    process.env.NEXT_PUBLIC_REPUTATION_PAY_ADDRESS as `0x${string}` | undefined;

  if (mock && rep) {
    return { mockQIEUSD: mock, reputationPay: rep, isConfigured: true, chainId };
  }

  return {
    mockQIEUSD: undefined,
    reputationPay: undefined,
    isConfigured: false,
    chainId,
  };
}

export function areContractsConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_MOCK_QIEUSD_ADDRESS &&
      process.env.NEXT_PUBLIC_REPUTATION_PAY_ADDRESS
  );
}
