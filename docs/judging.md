# Judging Criteria Mapping

> Web3 payments move money, but they do not prove trust. QIE Reputation Pay adds escrow, verified completion, and portable reputation so freelancers and merchants can safely transact with people they have never met.

Cross-links: [README](../README.md) · [/demo](http://localhost:3000/demo) · [demo-script.md](demo-script.md) · [CI](https://github.com/dorakingx/qie-reputation-pay/actions) · Tests: `test/ReputationPay.ts` (24 cases)

---

## Originality

**Why we are strong**

- Combines **escrow-backed stablecoin payments**, **portable on-chain reputation**, and **QIE Pass identity (demo)** in one QIE-native product — not a generic EVM escrow clone
- Review integrity via on-chain rating + `reviewHash` (full text off-chain)
- Refund path after timeout protects payers on undelivered work
- Payment link + public trust profile model is distinct from one-off transfers

---

## Real-world usefulness

**Why we are strong**

- Targets **freelancers, creators, researchers, and small merchants** who need trust and payment safety
- Escrow reduces payer risk; reputation reduces platform lock-in
- Shareable payment links and public profiles mirror how real freelance invoicing works
- Solves a clear gap: payments are easy, **trust is not portable**

---

## Product quality and UX

**Why we are strong**

- Polished Web3 SaaS UI with clear status badges (Pending, In Escrow, Completed, Refunded)
- **Fallback demo mode** — works without Supabase or deployed contracts; judges are never blocked
- Wrong-network banner, copy payment/profile links, rule-based trust explanation
- **3-minute walkthrough** at `/demo` plus read-aloud [demo-script.md](demo-script.md)
- Landing explains the product in under 10 seconds

---

## QIE ecosystem integration

**Why we are strong**

QIE Reputation Pay is built for the **QIE identity and payment ecosystem**. QIE Wallet handles payment authorization, QIEUSD/QUSDC enables stable payments, QIE Pass provides Sybil-resistant identity, and the reputation profile becomes a **portable trust layer across QIE apps**.

| Component | Status | Role |
|-----------|--------|------|
| QIE Wallet | Active | wagmi + RainbowKit — login and escrow authorization |
| QIE Testnet (1983) | Ready to deploy | Deploy script + README |
| MockQIEUSD / QUSDC path | Demo / mock | Escrow-backed stable payments today |
| QIE Pass | Demo mock | Sybil-resistant identity badge (localStorage) |
| QIE DEX | Future | Auto-convert received QIEUSD/QUSDC |
| QIE Oracle | Future | Risk-based credit limits |

### Why QIE?

- **EVM-compatible** — Solidity escrow and reputation contracts run directly on QIE
- **Low fees** — practical for small freelance and creator payments
- **QIE Pass** — can reduce fake accounts and reputation farming
- **QIE Wallet** — simple onboarding for non-crypto-native users
- **QIE DEX (future)** — auto-convert received stablecoins
- **QIE Oracle (future)** — risk-based credit limits

---

## User adoption potential

**Why we are strong**

- Low friction: wallet login, shareable payment links, public trust profiles
- Composable reputation across future QIE dApps
- Clear path to QUSDC and real QIE Pass API
- Works as a **payment link + trust profile** product, not only a developer tool

---

## Technical completeness

**Why we are strong**

- **24 Hardhat tests** in `test/ReputationPay.ts` — escrow, refunds, reviews, access control, deploy assertions
- `ReentrancyGuard`, custom errors, OpenZeppelin `SafeERC20`
- GitHub Actions CI: compile, test, frontend build
- Full frontend integration: create, pay, release, review, profile, demo mode
- Supabase optional for metadata + review text
