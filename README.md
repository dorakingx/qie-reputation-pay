# QIE Reputation Pay

**Escrow-backed stablecoin payments with portable QIE reputation for freelancers, creators, and merchants.**

> QIE Reputation Pay is a trust layer for stablecoin payments. It helps freelancers, creators, and small merchants receive payments safely while building portable reputation across the QIE ecosystem.

[![CI](https://github.com/dorakingx/qie-reputation-pay/actions/workflows/ci.yml/badge.svg)](https://github.com/dorakingx/qie-reputation-pay/actions/workflows/ci.yml)

## Hackathon Demo

| Resource | Link |
|----------|------|
| **Live demo** | _Add Vercel URL before judging_ |
| **Demo video** | _Add Loom/YouTube URL_ |
| **3-minute script** | [docs/demo-script.md](docs/demo-script.md) |
| **Judging criteria** | [docs/judging.md](docs/judging.md) |

### Deployed contracts (QIE Testnet — chain 1983)

| Contract | Address |
|----------|---------|
| MockQIEUSD | _Deploy with `npm run deploy:testnet` and paste address_ |
| ReputationPay | _Deploy with `npm run deploy:testnet` and paste address_ |

Explorer: [https://testnet.qie.digital/](https://testnet.qie.digital/)

After deploy, addresses are written to `frontend/.env.local` and [docs/deployed-addresses.md](docs/deployed-addresses.md).

### Screenshots

Add screenshots to [docs/screenshots/](docs/screenshots/) and embed here before final submission.

## Why this can win

1. **Escrow-first payments** — QIEUSD held in contract until work is verified, not sent directly to strangers.
2. **Portable reputation** — On-chain stats + review hashes; trust follows the wallet across QIE.
3. **QIE-native story** — Testnet deployment, MockQIEUSD → QUSDC path, QIE Pass demo for Sybil resistance.
4. **Judge-ready engineering** — 19+ tests, CI, demo mode fallback, 3-minute demo script.

## Problem

Freelancers and merchants lack portable trust in Web3. Payments are easy; proving reliability across platforms is not.

## Solution

Create escrow-backed payment requests, release funds on completion, leave verifiable reviews, and build a public trust profile with QIE Pass identity (demo).

## Key features

- Escrow-backed QIEUSD payments (MockQIEUSD demo / QUSDC production path)
- Refund after configurable delay if work not completed
- On-chain reputation: completed payments, ratings, review hashes
- QIE Pass verified badge (demo mock)
- Rule-based AI trust insight
- Demo mode without Supabase or contracts
- Full Hardhat test suite + GitHub Actions CI

## Smart contract architecture

```
MockQIEUSD (ERC20)
    └── approve → ReputationPay (escrow)
                      ├── createPaymentRequest()
                      ├── payRequest()        → funds held in escrow
                      ├── markCompleted()     → release to recipient
                      ├── refundRequest()     → return to payer
                      └── leaveReview()       → rating + reviewHash
```

**Events:** `PaymentRequestCreated`, `PaymentEscrowed`, `PaymentReleased`, `PaymentRefunded`, `ReviewLeft`

See [docs/architecture.md](docs/architecture.md).

## QIE ecosystem integration

| Component | Status |
|-----------|--------|
| QIE Wallet | Active |
| QIE Testnet (1983) | Active |
| MockQIEUSD | Active (demo) |
| QIE Pass | Demo verification |
| QIE DEX | Future |
| QIE Oracle | Future |

## How to run locally

### Prerequisites

- Node.js 20.9+ recommended
- MetaMask or QIE Wallet

### Install

```bash
npm install
cd frontend && npm install --legacy-peer-deps
```

### Contracts

```bash
# Terminal 1
npm run node

# Terminal 2
npm run deploy:local

# Test
npm test
```

### Frontend

```bash
npm run dev
# http://localhost:3000
```

Copy `frontend/.env.example` → `frontend/.env.local` (deploy script auto-fills contract addresses).

### Supabase (optional)

1. Create a Supabase project
2. Run [supabase/seed.sql](supabase/seed.sql)
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### QIE Testnet

| Field | Value |
|-------|-------|
| Chain ID | 1983 |
| RPC | https://rpc1testnet.qie.digital/ |
| Faucet | https://www.qie.digital/faucet |

```bash
# .env at repo root: PRIVATE_KEY=...
npm run deploy:testnet
```

## 3-minute demo flow

1. Connect wallet
2. Create escrow-backed payment request
3. Pay into escrow with MockQIEUSD
4. Recipient releases escrow (mark completed)
5. Payer leaves review (hash on-chain)
6. View trust profile + QIE Pass badge
7. Show QIE ecosystem page

Full script: [docs/demo-script.md](docs/demo-script.md)

## Security notes

- `ReentrancyGuard` on escrow deposit, release, and refund
- OpenZeppelin `SafeERC20`
- Custom errors for clear revert reasons
- Review text off-chain; `reviewHash` on-chain for integrity
- Access control: only recipient releases, only payer refunds/reviews

## Known limitations

- MockQIEUSD instead of production QUSDC
- QIE Pass is mock verification (localStorage + demo data)
- Refund delay: 60s local, 24h testnet (see deploy script)
- Reputation score computed client-side for demo clarity

## Future roadmap

- Replace MockQIEUSD with [QUSDC](https://docs.stable.qie.digital/)
- Real QIE Pass API integration
- QIE DEX auto-conversion on receipt
- QIE Oracle risk-based credit limits
- Subgraph indexer for faster queries
- Dispute resolution module

## License

MIT — Hackathon MVP 2026
