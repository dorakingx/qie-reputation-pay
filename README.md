# QIE Reputation Pay

**Escrow-backed QIEUSD payments + portable reputation for freelancers and merchants.**

> Web3 payments move money, but they do not prove trust. QIE Reputation Pay adds escrow, verified completion, and portable reputation so freelancers and merchants can safely transact with people they have never met.

[![CI](https://github.com/dorakingx/qie-reputation-pay/actions/workflows/ci.yml/badge.svg)](https://github.com/dorakingx/qie-reputation-pay/actions/workflows/ci.yml)

## Final submission

| Field | Value |
|-------|-------|
| **Live demo URL** | Pending before final submission |
| **Demo video URL** | Pending before final submission |
| **GitHub repo** | https://github.com/dorakingx/qie-reputation-pay |
| **MockQIEUSD (QIE testnet)** | Pending before final submission |
| **ReputationPay (QIE testnet)** | Pending before final submission |
| **QIE explorer links** | Pending before final submission |
| **Vercel deployment** | Pending before final submission |
| **CI** | Passing on main |
| **Tests** | 24 passing — `npm test` ([`test/ReputationPay.ts`](test/ReputationPay.ts)) |
| **Screenshots** | Pending before final submission |

Full checklist: [docs/submission-checklist.md](docs/submission-checklist.md)

## Feature status (honest overview)

### Active now

| Feature | Notes |
|---------|-------|
| Escrow payments | ReputationPay contract — funds held until release (local Hardhat) |
| Review hashes | Rating on-chain; full text off-chain |
| QIE Wallet | wagmi + RainbowKit login and transactions |
| Demo mode UI | Full app without contracts or Supabase |

### Demo / mock

| Feature | Notes |
|---------|-------|
| MockQIEUSD | Demo stablecoin — not production QUSDC |
| QIE Pass | localStorage mock — not real QIE Pass API |
| Reputation score | Client-side formula for demo clarity |

### Ready to deploy

| Feature | Notes |
|---------|-------|
| QIE Testnet | Chain ID 1983 — `npm run deploy:testnet` |
| Vercel frontend | Env template in [frontend/.env.example](frontend/.env.example) |
| Supabase metadata | Optional — [supabase/seed.sql](supabase/seed.sql) |

### Future

| Feature | Notes |
|---------|-------|
| QUSDC | Production stablecoin on QIE |
| Real QIE Pass API | Sybil-resistant identity |
| QIE DEX | Auto-convert received payments |
| QIE Oracle | Risk scoring and credit limits |

## Why QIE?

QIE Reputation Pay is built for the **QIE identity and payment ecosystem**. QIE Wallet handles payment authorization, QIEUSD/QUSDC enables stable payments, QIE Pass provides Sybil-resistant identity, and the reputation profile becomes a **portable trust layer across QIE apps**.

- **EVM-compatible** — Solidity escrow and reputation contracts deploy directly on QIE
- **Low-fee environment** — practical for small freelance and creator payments
- **QIE Pass** — can reduce fake accounts and reputation farming
- **QIE Wallet** — simple entry point for users
- **QIE DEX (future)** — auto-convert received QIEUSD/QUSDC
- **QIE Oracle (future)** — risk-based credit limits

## Why this can win

1. **Escrow-first** — QIEUSD held in contract until work is verified.
2. **Portable reputation** — On-chain stats + review hashes; trust follows the wallet.
3. **QIE-native** — Wallet, Testnet, MockQIEUSD → QUSDC path, QIE Pass demo.
4. **Judge-ready** — 24 contract tests, CI, demo mode, `/demo` walkthrough.

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
5. [ ] (Optional) Record 3-min demo video — [docs/demo-script.md](docs/demo-script.md)
6. [ ] Add 8 screenshots — [docs/screenshots/README.md](docs/screenshots/README.md)

**Until deployed:** judges can run locally or use **demo mode** (no env required).

## How to run locally

```bash
npm install
cd frontend && npm install --legacy-peer-deps

# Contracts (optional for on-chain demo)
npm run node          # terminal 1
npm run deploy:local  # terminal 2

# Tests (24 cases in test/ReputationPay.ts)
npm test

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

- **In-app walkthrough:** [/demo](http://localhost:3000/demo)
- **Read-aloud script:** [docs/demo-script.md](docs/demo-script.md)
- **Judging criteria:** [docs/judging.md](docs/judging.md)

## Screenshots

**Status:** Pending before final submission — capture guide: [docs/screenshots/README.md](docs/screenshots/README.md)

| Screenshot | File |
|------------|------|
| Landing | `docs/screenshots/01-landing.png` |
| Dashboard | `docs/screenshots/02-dashboard.png` |
| Create request | `docs/screenshots/03-create-request.png` |
| Request escrow | `docs/screenshots/04-request-escrow.png` |
| Profile | `docs/screenshots/05-profile.png` |
| QIE Pass badge | `docs/screenshots/06-qie-pass-badge.png` |
| Demo page | `docs/screenshots/07-demo-page.png` |
| QIE ecosystem | `docs/screenshots/08-qie-ecosystem.png` |

<!-- Uncomment when screenshots are added to docs/screenshots/

![Landing](docs/screenshots/01-landing.png)
![Dashboard](docs/screenshots/02-dashboard.png)
![Create request](docs/screenshots/03-create-request.png)
![Request escrow](docs/screenshots/04-request-escrow.png)
![Profile](docs/screenshots/05-profile.png)
![QIE Pass](docs/screenshots/06-qie-pass-badge.png)
![Demo page](docs/screenshots/07-demo-page.png)
![QIE ecosystem](docs/screenshots/08-qie-ecosystem.png)

-->

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
- Live demo and testnet addresses pending until you deploy

## Future roadmap

- QUSDC integration
- Real QIE Pass API
- QIE DEX auto-convert
- QIE Oracle risk scores
- Subgraph indexer

## License

MIT — Hackathon 2026
