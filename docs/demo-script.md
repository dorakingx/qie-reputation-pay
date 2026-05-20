# 3-Minute Hackathon Demo Script (read aloud)

**Total: ~3:00** · In-app guide: `/demo` · Judge shortcuts: `/app/request/demo`, `/app/profile/demo`

---

## 0:00–0:20 — Problem

"Web3 payments move money, but they do not prove trust. Freelancers and merchants rebuild reputation on every platform. When you pay someone you have never met, you are taking a risk — and that risk rarely travels with your wallet."

---

## 0:20–0:40 — Solution

"QIE Reputation Pay adds escrow, verified completion, and portable reputation so freelancers and merchants can safely transact with people they have never met. You get payment safety and a public trust profile in one product."

---

## 0:40–1:05 — QIE integration

"QIE Reputation Pay is built for the QIE identity and payment ecosystem. QIE Wallet handles authorization, QIEUSD and the path to QUSDC enable stable payments, QIE Pass demo verification reduces Sybil farming, and reputation becomes portable across QIE apps. This is not a generic escrow dApp — it is designed for QIE."

---

## 1:05–1:30 — Create escrow-backed payment request

- **Launch App** → **Connect Wallet** (QIE Testnet 1983 or local 31337)
- **Create** → title, amount, recipient
- Submit and **copy the payment link**

Or open **`/app/request/demo`** to show a pre-filled escrow example.

---

## 1:30–1:55 — Pay into escrow

- Payer opens the link → **Pay into Escrow (QIEUSD)**
- Funds stay **in the contract** until release — not a direct transfer
- Show **Escrow-backed** badge

---

## 1:55–2:15 — Release payment after completion

- Recipient → **Release Escrow & Complete**
- QIEUSD moves to recipient only after work is marked done

---

## 2:15–2:35 — Leave review and update reputation

- Payer submits rating + review text
- **Rating and reviewHash on-chain**; full text can live off-chain
- Reputation stats update on the recipient profile

---

## 2:35–2:50 — Show QIE Pass verified profile

- Open **`/app/profile/demo`** (Maya Chen) or recipient profile
- Reputation score, trust badge, **QIE Pass Verified**
- Explain Sybil resistance (demo mock today; real API in production)

---

## 2:50–3:00 — Closing: why this matters

"QIE Reputation Pay can win because it combines escrow-backed QIEUSD, verified completion, on-chain review hashes, portable wallet reputation, and QIE Pass demo identity — with a clear path to QUSDC, QIE DEX, and QIE Oracle. Twenty-four contract tests and CI prove the engineering. Judges can try everything in demo mode at `/demo` without deploying to testnet first."

---

## Backup demo mode

This app can be demoed without deployed contracts or Supabase using built-in demo data. If env vars are missing, a demo banner appears and all flows work with sample data.
