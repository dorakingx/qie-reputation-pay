# QIE Reputation Pay

**Stablecoin payments with identity-based reputation on the QIE ecosystem.**

> QIE Reputation Pay is a trust layer for stablecoin payments. It helps freelancers, creators, and small merchants receive payments while building portable reputation across the QIE ecosystem.

## Problem

Freelancers, creators, and small merchants in Web3 lack portable trust signals. Payments happen on-chain, but reputation is fragmented across platforms.

## Solution

QIE Reputation Pay combines stablecoin payments with an on-chain reputation system. Users connect a QIE-compatible wallet, create payment requests, pay with QIEUSD, complete work, leave reviews, and build a verifiable trust profile.

## Key Features

- Wallet connection (wagmi + RainbowKit)
- Payment request / invoice creation
- Stablecoin payments via MockQIEUSD (QUSDC in production)
- Mark transactions completed
- On-chain reviews and ratings
- Reputation score and trust badges
- Public trust profiles per wallet address
- Rule-based AI trust explanation
- QIE ecosystem integration page
- Demo data for hackathon judging

## QIE Ecosystem Integration

| Component | Status | Role |
|-----------|--------|------|
| QIE Wallet | Active | Login and payment authorization |
| QIE Pass | Planned | Identity verification, Sybil resistance |
| QUSDC / QIEUSD | Demo (MockQIEUSD) | Stable payments |
| QIE DEX | Future | Auto-convert received payments |
| QIE Oracle | Future | Risk scoring and credit limits |

## Smart Contract Architecture

```
MockQIEUSD (ERC20)
    └── approve → ReputationPay
                      ├── createPaymentRequest()
                      ├── payRequest()
                      ├── markCompleted()
                      └── leaveReview()
```

**ReputationPay** tracks:
- Payment requests (id, payer, recipient, amount, status)
- User stats (completed payments, total received, reviews, rating sum)

**Events:** `PaymentRequestCreated`, `PaymentPaid`, `PaymentCompleted`, `ReviewLeft`

## Project Structure

```
/contracts          Solidity contracts
/scripts            Hardhat deploy script
/frontend           Next.js app
/supabase           Database seed SQL
```

## How to Run Locally

### Prerequisites

- Node.js 20.9+ recommended
- MetaMask or QIE Wallet
- (Optional) Supabase project

### 1. Install dependencies

```bash
npm install
```

### 2. Start local blockchain

```bash
npm run node
```

In a new terminal:

```bash
npm run deploy:local
```

This deploys contracts and writes addresses to `frontend/.env.local`.

### 3. Configure Supabase (optional)

1. Create a Supabase project
2. Run `supabase/seed.sql` in the SQL editor
3. Add to `frontend/.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

Without Supabase, the app uses built-in demo data.

### 4. Start frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Add QIE Testnet to wallet (for testnet deploy)

| Field | Value |
|-------|-------|
| Network | QIE Testnet |
| Chain ID | 1983 |
| RPC | https://rpc1testnet.qie.digital/ |
| Explorer | https://testnet.qie.digital/ |
| Faucet | https://www.qie.digital/faucet |

Deploy to testnet:

```bash
# Set PRIVATE_KEY in .env
npm run deploy:testnet
```

## Deploy

- **Frontend:** Deploy `frontend/` to Vercel
- **Contracts:** `npm run deploy:testnet` with funded wallet

Set environment variables in Vercel:
- `NEXT_PUBLIC_REPUTATION_PAY_ADDRESS`
- `NEXT_PUBLIC_MOCK_QIEUSD_ADDRESS`
- `NEXT_PUBLIC_SUPABASE_URL` (optional)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (optional)
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

## Demo Flow

1. **Connect wallet** — Use MetaMask with Hardhat local (chain 31337) or QIE testnet
2. **Create payment request** — `/app/create` with title, amount, recipient
3. **Pay with MockQIEUSD** — Switch to payer account, open request, click Pay
4. **Mark completed** — Switch to recipient account, mark work done
5. **Leave review** — Switch to payer, submit 1–5 star review
6. **See reputation increase** — View profile at `/app/profile/[address]`
7. **View trust profile** — Check score, badge, and AI trust explanation

### Demo Accounts (Hardhat)

After `npm run node`, account #0 is deployer, #1 Alice, #2 Bob, #3 Carol.

Import Hardhat private keys into MetaMask for multi-wallet demo.

### Demo Profiles (mock data)

| User | Address | Trust Level |
|------|---------|-------------|
| Maya Chen (Designer) | `0x7099...79C8` | Highly Trusted |
| Dr. Alex Rivera (Researcher) | `0x3C44...93BC` | Trusted Seller |
| ShopWave Store (Merchant) | `0x90F7...b906` | Verified Starter |

## Reputation Formula

```
reputationScore = min(100, completedPayments * 10 + averageRating * 20 + numberOfReviews * 5)
```

| Score | Trust Level |
|-------|-------------|
| 0–20 | New User |
| 21–50 | Verified Starter |
| 51–80 | Trusted Seller |
| 81–100 | Highly Trusted |

## Future Roadmap

- Replace MockQIEUSD with QUSDC
- QIE Pass identity verification
- QIE DEX auto-conversion on payment receipt
- QIE Oracle risk-based credit limits
- Indexed subgraph for faster queries
- Escrow and dispute resolution

## License

MIT — Hackathon MVP 2026
