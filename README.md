# QIE Reputation Pay

**Escrow-backed QIEUSD payments with portable reputation for freelancers, creators, and merchants.**

> QIE Reputation Pay is a trust layer for stablecoin payments. It helps freelancers, creators, and small merchants receive payments safely while building portable reputation across the QIE ecosystem.

[![CI](https://github.com/dorakingx/qie-reputation-pay/actions/workflows/ci.yml/badge.svg)](https://github.com/dorakingx/qie-reputation-pay/actions/workflows/ci.yml)

## Submission status

| Item | Status |
|------|--------|
| Live demo | Pre-deployment — see [Pre-deployment checklist](#pre-deployment-checklist) |
| Demo video | Optional — add before judging |
| QIE testnet contracts | Not deployed yet — run `npm run deploy:testnet` |
| CI | Passing on main |
| Contract tests | **24 tests** — run `npm test` |

Full checklist: [docs/submission-checklist.md](docs/submission-checklist.md)

## Feature status (honest overview)

| Feature | Status | Notes |
|---------|--------|-------|
| Escrow payments | Active (local) | ReputationPay contract — funds held until release |
| QIE Testnet | Ready to deploy | Chain ID 1983 |
| MockQIEUSD | Active demo | Replace with QUSDC in production |
| Review hashes | Active | Rating on-chain; full text off-chain |
| QIE Pass | Demo mock | localStorage + demo profiles; real API future |
| QIE Wallet | Active | wagmi + RainbowKit |
| Supabase metadata | Optional | Falls back to demo data |
| QIE DEX | Future | Auto-conversion of received payments |
| QIE Oracle | Future | Risk scoring and credit limits |

## Why this can win

1. **Escrow-first** — QIEUSD held in contract until work is verified.
2. **Portable reputation** — On-chain stats + review hashes; trust follows the wallet.
3. **QIE-native** — Testnet-ready deploy, MockQIEUSD → QUSDC path, QIE Pass demo.
4. **Judge-ready engineering** — 24 contract tests, CI, demo mode fallback, 3-minute script.

## Problem

Freelancers and merchants lack portable trust in Web3. Payments are easy; proving reliability across platforms is not.

## Solution

Create escrow-backed payment requests, release funds on completion, leave verifiable reviews, and build a public trust profile with QIE Pass identity (demo).

## Smart contract architecture

```
MockQIEUSD (ERC20)
    └── approve → ReputationPay (escrow)
                      ├── createPaymentRequest()
                      ├── payRequest()        → deposit to escrow
                      ├── markCompleted()     → release to recipient
                      ├── refundRequest()     → return to payer
                      └── leaveReview()       → rating + reviewHash
```

See [docs/architecture.md](docs/architecture.md).

## Pre-deployment checklist

Before judging, complete:

1. [ ] Deploy contracts: `npm run deploy:testnet` (set `PRIVATE_KEY` in `.env`)
2. [ ] Paste addresses into [docs/submission-checklist.md](docs/submission-checklist.md)
3. [ ] Deploy frontend to Vercel; set env vars from [frontend/.env.example](frontend/.env.example)
4. [ ] (Optional) Supabase: run [supabase/seed.sql](supabase/seed.sql)
5. [ ] (Optional) Record 3-min demo video
6. [ ] Add screenshots to [docs/screenshots/](docs/screenshots/) — see [README there](docs/screenshots/README.md)

**Until deployed:** judges can run locally or use **demo mode** (no env required).

## How to run locally

```bash
npm install
cd frontend && npm install --legacy-peer-deps

# Contracts (optional for on-chain demo)
npm run node          # terminal 1
npm run deploy:local  # terminal 2

# Tests
npm test              # 24 passing

# Frontend
npm run dev           # http://localhost:3000
```

### QIE Testnet (when deploying)

| Field | Value |
|-------|-------|
| Chain ID | 1983 |
| RPC | https://rpc1testnet.qie.digital/ |
| Explorer | https://testnet.qie.digital/ |
| Faucet | https://www.qie.digital/faucet |

## 3-minute demo

- **In-app guide:** [/demo](http://localhost:3000/demo) (or `/demo` on live site)
- **Script:** [docs/demo-script.md](docs/demo-script.md)
- **Judging criteria:** [docs/judging.md](docs/judging.md)

## Screenshots

Add before submission — instructions: [docs/screenshots/README.md](docs/screenshots/README.md)

| Screenshot | File (after capture) |
|------------|----------------------|
| Landing | `docs/screenshots/01-landing.png` |
| Dashboard | `docs/screenshots/02-dashboard.png` |
| Create request | `docs/screenshots/03-create-request.png` |
| Escrow status | `docs/screenshots/04-escrow-status.png` |
| Profile | `docs/screenshots/05-profile.png` |
| QIE Pass badge | `docs/screenshots/06-qie-pass-badge.png` |
| QIE ecosystem | `docs/screenshots/07-qie-ecosystem.png` |

## Security notes

- `ReentrancyGuard` on escrow deposit, release, refund
- OpenZeppelin `SafeERC20`
- Custom Solidity errors
- Review text off-chain; `reviewHash` on-chain

## Known limitations

- MockQIEUSD (not QUSDC)
- QIE Pass is demo mock, not real API
- Refund delay: 60s local, 24h testnet
- Reputation score computed client-side for demo clarity
- Testnet addresses TBD until deploy

## Future roadmap

- QUSDC integration
- Real QIE Pass API
- QIE DEX auto-convert
- QIE Oracle risk scores
- Subgraph indexer

## License

MIT — Hackathon 2026
