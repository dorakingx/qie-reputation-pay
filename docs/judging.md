# Judging Criteria Mapping

> Web3 payments move money, but they do not prove trust. QIE Reputation Pay adds escrow, verified completion, and portable reputation so freelancers and merchants can safely transact with people they have never met.

Cross-links: [README](../README.md) · [/demo](http://localhost:3000/demo) · [demo-script.md](demo-script.md) · [CI](https://github.com/dorakingx/qie-reputation-pay/actions) · Tests: [`test/ReputationPay.ts`](../test/ReputationPay.ts) (24 cases)

---

## Why QIE Reputation Pay can win

QIE Reputation Pay is **not just another payment dApp**. It combines:

- **Escrow-backed QIEUSD payments** — funds held until verified completion
- **Verified completion** — recipient releases escrow when work is done
- **On-chain review hashes** — ratings and integrity on-chain; text off-chain
- **Portable wallet-based reputation** — trust follows the user across QIE apps
- **QIE Pass demo identity** — Sybil-resistant profile layer (mock until real API)
- **Realistic QIE roadmap** — QUSDC, QIE DEX auto-convert, QIE Oracle risk limits

Judges can evaluate immediately via `/demo`, `/app/request/demo`, and `/app/profile/demo` without testnet deployment.

---

## Originality

**Why we are strong**

- Combines escrow, stablecoin payment, QIE Pass identity, and portable reputation in one QIE-native product
- Review integrity via on-chain rating + `reviewHash`
- Refund after timeout protects payers
- Payment link + public trust profile — distinct from one-off transfers

---

## Real-world usefulness

**Why we are strong**

- Freelancers, creators, researchers, and small merchants need **trust and payment safety**
- Escrow reduces payer risk; reputation reduces platform lock-in
- Shareable payment links and public profiles match real freelance workflows
- Addresses: payments are easy, **trust is not portable**

---

## Product quality and UX

**Why we are strong**

- Polished UI with escrow status badges (Pending, In Escrow, Completed, Refunded)
- **Fallback demo mode** — no Supabase or contracts required for judging
- `/demo` page: 3-minute timeline, QIE ecosystem, judge CTAs
- Landing explains the product in under 10 seconds

---

## QIE ecosystem integration

**Why we are strong**

QIE is not just the settlement layer. In this project, **QIE becomes the trust layer**. QIE Wallet signs payments, QIEUSD/QUSDC settles work, QIE Pass reduces Sybil farming, QIE Testnet verifies escrow and reviews when deployed, and reputation profiles compose across QIE apps.

| Component | Status | Role |
|-----------|--------|------|
| QIE Wallet | Active | wagmi + RainbowKit |
| QIE Testnet (1983) | Ready to deploy | `npm run deploy:testnet` |
| MockQIEUSD / QUSDC | Demo / mock | Escrow payments today |
| QIE Pass | Demo mock | Identity badge (localStorage) |
| QIE DEX | Future | Auto-convert received stablecoins |
| QIE Oracle | Future | Risk-based credit limits |

### Why QIE?

- EVM-compatible — Solidity contracts deploy directly
- Low fees — practical for small payments
- QIE Pass — reduces fake accounts and reputation farming
- QIE Wallet — simple onboarding
- QIE DEX (future) — auto-convert QIEUSD/QUSDC
- QIE Oracle (future) — credit limits from risk scores

---

## User adoption potential

**Why we are strong**

- Easy onboarding: wallet login, payment links, public trust profiles
- Composable reputation across QIE dApps
- Works as **payment link + trust profile** for freelancers and small merchants

---

## Technical completeness

**Why we are strong**

- **24 Hardhat tests** in `test/ReputationPay.ts`
- `ReentrancyGuard`, custom errors, OpenZeppelin `SafeERC20`
- GitHub Actions CI: compile, test, frontend build
- Full frontend: create, pay, release, review, profile, demo routes
