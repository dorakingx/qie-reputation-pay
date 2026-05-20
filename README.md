# QIE Reputation Pay

**Escrow-backed QIEUSD payments + portable reputation for freelancers and merchants.**

> Web3 payments move money, but they do not prove trust. QIE Reputation Pay adds escrow, verified completion, and portable reputation so freelancers and merchants can safely transact with people they have never met.

[![CI](https://github.com/dorakingx/qie-reputation-pay/actions/workflows/ci.yml/badge.svg)](https://github.com/dorakingx/qie-reputation-pay/actions/workflows/ci.yml)

## If you only have 3 minutes

1. Open the [live demo](https://qie-reputation-pay.vercel.app) or [`/demo`](https://qie-reputation-pay.vercel.app/demo)
2. View the escrow-backed payment flow
3. Open [`/app/request/demo`](https://qie-reputation-pay.vercel.app/app/request/demo)
4. See QIEUSD held in escrow
5. Open [`/app/profile/demo`](https://qie-reputation-pay.vercel.app/app/profile/demo)
6. See QIE Pass demo verification and portable reputation
7. Check [docs/judging.md](docs/judging.md) for criteria mapping

## Final submission

| Field | Value |
|-------|-------|
| **Live demo URL** | https://qie-reputation-pay.vercel.app |
| **Demo video URL** | Pending before final submission |
| **GitHub repo URL** | https://github.com/dorakingx/qie-reputation-pay |
| **MockQIEUSD address (QIE testnet)** | `0xeD16CBCfb5Fa00A363963A49445e08290Ed8d5B0` |
| **ReputationPay address (QIE testnet)** | `0x1273BF4bda6aD31BBA25eA7ee10013FaAf591Aa1` |
| **MockQIEUSD explorer link** | https://testnet.qie.digital/address/0xeD16CBCfb5Fa00A363963A49445e08290Ed8d5B0 |
| **ReputationPay explorer link** | https://testnet.qie.digital/address/0x1273BF4bda6aD31BBA25eA7ee10013FaAf591Aa1 |
| **CI status** | Passing on main |
| **Test status** | 24 passing — `npm test` ([`test/ReputationPay.ts`](test/ReputationPay.ts)) |
| **Screenshot status** | Pending before final submission |
| **Backup demo mode** | Available — `/demo`, `/app/request/demo`, `/app/profile/demo` |

After deploy, explorer links use: `https://testnet.qie.digital/address/{address}`

Full checklist: [docs/submission-checklist.md](docs/submission-checklist.md) — includes [what you still need to do manually](docs/submission-checklist.md#what-you-still-need-to-do-manually).

> **The project is fully demoable in local/demo mode even before testnet deployment.** Run `npm run dev` and use the backup demo routes above without wallet, Supabase, or contract environment variables.

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

QIE is not just the settlement layer. In this project, **QIE becomes the trust layer**.

QIE Reputation Pay is built for the QIE identity and payment ecosystem:

- **QIE Wallet** signs payments
- **QIEUSD / QUSDC** settles work (MockQIEUSD demo today; QUSDC path in production)
- **QIE Pass** reduces Sybil reputation farming (demo mock until real API)
- **QIE Testnet** verifies escrow and review events when deployed
- **QIE DEX (future)** can convert incoming payments
- **QIE Oracle (future)** can support credit limits

Also: EVM-compatible Solidity contracts, low fees for freelance-sized payments, and portable reputation across QIE apps.

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

### 3. Copy contract addresses and explorer links

Update the Final submission table in this README and [docs/submission-checklist.md](docs/submission-checklist.md), then set Vercel env (step 5).

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

## Final steps before submission

- Deploy contracts to QIE testnet (commands above)
- Paste contract addresses and explorer links into the Final submission table
- Deploy frontend to Vercel and set Live demo URL
- Record a 2–3 minute demo video — [docs/demo-script.md](docs/demo-script.md)
- Capture screenshots and run `npm run docs:screenshots`
- Run `npm test` and `cd frontend && npm run build`
- Confirm [`/demo`](http://localhost:3000/demo), [`/app/request/demo`](http://localhost:3000/app/request/demo), and [`/app/profile/demo`](http://localhost:3000/app/profile/demo) work **without wallet**

See [docs/submission-checklist.md](docs/submission-checklist.md) for the full manual checklist.

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
| In-app walkthrough | [/demo](https://qie-reputation-pay.vercel.app/demo) |
| Escrow example | [/app/request/demo](https://qie-reputation-pay.vercel.app/app/request/demo) |
| QIE Pass profile | [/app/profile/demo](https://qie-reputation-pay.vercel.app/app/profile/demo) |
| Deployed contracts | [docs/deployed-addresses.md](docs/deployed-addresses.md) |
| Read-aloud script | [docs/demo-script.md](docs/demo-script.md) |
| Judging criteria | [docs/judging.md](docs/judging.md) |

## Screenshots

**Screenshot status:** Pending before final submission

Screenshots are optional for local review, but **recommended for final judging**. The app includes demo routes that can be captured without wallet or testnet deployment. Capture guide: [docs/screenshots/README.md](docs/screenshots/README.md)

After adding PNGs to `docs/screenshots/`:

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
_No screenshot files in docs/screenshots/ yet. Run `npm run docs:screenshots` after adding PNGs._
<!-- SCREENSHOTS_END -->

## Security notes

- `ReentrancyGuard` on escrow deposit, release, refund
- OpenZeppelin `SafeERC20`
- Custom Solidity errors
- Review text off-chain; `reviewHash` on-chain

## Known limitations

- MockQIEUSD is not production QUSDC
- QIE Pass is demo/mock until real API exists
- Live demo on Vercel requires **environment variables** on Vercel (see [deployed-addresses.md](docs/deployed-addresses.md)) for full on-chain mode; demo routes work without them
- Demo video is **pending** until recorded
- Reputation score computed client-side for demo clarity

## Future roadmap

- QUSDC integration
- Real QIE Pass API
- QIE DEX auto-convert
- QIE Oracle risk scores
- Subgraph indexer

## License

MIT — Hackathon 2026
