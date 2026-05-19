# Judging Criteria Mapping

## Originality

- Combines **escrow-backed stablecoin payments** with **portable on-chain reputation** in one QIE-native product
- Review integrity via on-chain rating + `reviewHash` (full text off-chain)
- QIE Pass demo layer for Sybil-resistant identity (not just wallet-as-ID)

## Real-world usefulness

- Targets freelancers, creators, and small merchants who need trust + safe settlement
- Escrow reduces payer risk; reputation reduces platform lock-in
- Refund path after timeout protects payers on undelivered work

## Product quality and UX

- Clean Web3 SaaS UI with clear status badges (Pending, In Escrow, Completed, Refunded)
- Demo mode works without Supabase or deployed contracts
- Wrong-network banner, copy payment/profile links, rule-based trust explanation

## QIE ecosystem integration

| Component | Status in demo |
|-----------|----------------|
| QIE Wallet | Active — wagmi + RainbowKit |
| QIE Testnet (1983) | Active — deploy script + README |
| MockQIEUSD | Active — escrow payments |
| QIE Pass | Demo verification badge + mock flow |
| QIE DEX | Future — documented |
| QIE Oracle | Future — documented |

## User adoption potential

- Low friction: wallet login, shareable payment links, public trust profiles
- Composable reputation across QIE dApps
- Clear path to QUSDC and real QIE Pass

## Technical completeness

- **19+ Hardhat tests** covering escrow, refunds, reviews, access control
- `ReentrancyGuard`, custom errors, OpenZeppelin SafeERC20
- GitHub Actions CI: compile, test, frontend build
- Supabase optional for metadata + review text
