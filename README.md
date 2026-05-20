# QIE Reputation Pay

**Escrow-backed QIEUSD payments + portable reputation for freelancers and merchants.**

> Web3 payments move money, but they do not prove trust. QIE Reputation Pay adds escrow, verified completion, and portable reputation so freelancers and merchants can safely transact with people they have never met.

[![CI](https://github.com/dorakingx/qie-reputation-pay/actions/workflows/ci.yml/badge.svg)](https://github.com/dorakingx/qie-reputation-pay/actions/workflows/ci.yml)

## Final submission

| Field | Value |
|-------|-------|
| **Live demo URL** | Pending before final submission |
| **Demo video URL** | Pending before final submission |
| **GitHub repo URL** | https://github.com/dorakingx/qie-reputation-pay |
| **MockQIEUSD address (QIE testnet)** | Pending before final submission |
| **ReputationPay address (QIE testnet)** | Pending before final submission |
| **QIE explorer links** | Pending before final submission |
| **CI status** | Passing on main |
| **Test status** | 24 passing — `npm test` ([`test/ReputationPay.ts`](test/ReputationPay.ts)) |
| **Screenshot status** | Pending before final submission |

Full checklist: [docs/submission-checklist.md](docs/submission-checklist.md)

> **The project is fully demoable in local/demo mode even before testnet deployment.** Run `npm run dev`, visit [`/demo`](http://localhost:3000/demo), or open [`/app/request/demo`](http://localhost:3000/app/request/demo) and [`/app/profile/demo`](http://localhost:3000/app/profile/demo) without wallet, Supabase, or contract environment variables.

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
| MockQIEUSD | Demo stablecoin — **not** production QUSDC |
| QIE Pass | localStorage mock — **not** real QIE Pass API |
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

QIE Reputation Pay is **not just another payment dApp**. It combines:

- **Escrow-backed QIEUSD payments**
- **Verified completion** before funds release
- **On-chain review hashes**
- **Portable wallet-based reputation**
- **QIE Pass demo identity**
- A realistic path to **QUSDC**, **QIE DEX**, and **QIE Oracle** integration

Plus: 24 contract tests, CI, `/demo` judge walkthrough, and demo routes that work without deployment.

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

## Final deployment steps

### 1. Create root `.env`

```bash
PRIVATE_KEY=
QIE_TESTNET_RPC=https://rpc1testnet.qie.digital/
```

Copy from [`.env.example`](.env.example).

### 2. Deploy contracts

```bash
npm run deploy:testnet
```

Writes `frontend/.env.local` and [docs/deployed-addresses.md](docs/deployed-addresses.md).

### 3. Copy contract addresses

Update this README Final submission table, [docs/submission-checklist.md](docs/submission-checklist.md), and Vercel env (step 5).

### 4. Deploy frontend

```bash
cd frontend
vercel
```

### 5. Add Vercel environment variables

```
NEXT_PUBLIC_CHAIN_ID=1983
NEXT_PUBLIC_REPUTATION_PAY_ADDRESS=
NEXT_PUBLIC_MOCK_QIEUSD_ADDRESS=
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

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

| Resource | Link |
|----------|------|
| In-app walkthrough | [/demo](http://localhost:3000/demo) |
| Escrow example | [/app/request/demo](http://localhost:3000/app/request/demo) |
| QIE Pass profile | [/app/profile/demo](http://localhost:3000/app/profile/demo) |
| Read-aloud script | [docs/demo-script.md](docs/demo-script.md) |
| Judging criteria | [docs/judging.md](docs/judging.md) |

## Screenshots

**Status:** Pending before final submission — [capture guide](docs/screenshots/README.md)

After adding PNGs to `docs/screenshots/`, run:

```bash
npm run docs:screenshots
```

| Screenshot | File |
|------------|------|
| Landing | `docs/screenshots/01-landing.png` |
| Demo page | `docs/screenshots/02-demo-page.png` |
| Dashboard | `docs/screenshots/03-dashboard.png` |
| Create request | `docs/screenshots/04-create-request.png` |
| Request escrow | `docs/screenshots/05-request-escrow.png` |
| Profile | `docs/screenshots/06-profile.png` |
| QIE Pass badge | `docs/screenshots/07-qie-pass-badge.png` |
| QIE ecosystem | `docs/screenshots/08-qie-ecosystem.png` |

<!-- SCREENSHOTS_START -->
_No screenshot files in docs/screenshots/ yet. Run this script after adding PNGs._
<!-- SCREENSHOTS_END -->

## Security notes

- `ReentrancyGuard` on escrow deposit, release, refund
- OpenZeppelin `SafeERC20`
- Custom Solidity errors
- Review text off-chain; `reviewHash` on-chain

## Known limitations

- MockQIEUSD is not production QUSDC
- QIE Pass is demo/mock until real API exists
- QIE testnet addresses are **ready to deploy** — not filled until you run deploy
- Live demo URL is **pending** until Vercel is deployed
- Reputation score computed client-side for demo clarity

## Future roadmap

- QUSDC integration
- Real QIE Pass API
- QIE DEX auto-convert
- QIE Oracle risk scores
- Subgraph indexer

## License

MIT — Hackathon 2026
