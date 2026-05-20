# 3-Minute Hackathon Demo Script (read aloud)

**Total time: ~3:00** · In-app guide: `/demo` · Full checklist: [submission-checklist.md](submission-checklist.md)

---

## 0:00–0:20 — Problem

"Web3 payments move money, but they do not prove trust. Freelancers and merchants rebuild reputation on every platform. There is no portable way to know if someone you have never met is reliable."

---

## 0:20–0:40 — Solution

"QIE Reputation Pay adds escrow, verified completion, and portable reputation so freelancers and merchants can safely transact with people they have never met. It is built for the QIE identity and payment ecosystem — wallet login, stablecoin escrow, QIE Pass demo verification, and public trust profiles."

---

## 0:40–1:10 — Create payment request

- Open the app → **Launch App**
- **Connect Wallet** (QIE Testnet 1983 or Hardhat local 31337)
- Go to **Create**
- Example: title "Logo design sprint", 100 QIEUSD, recipient = second demo wallet
- Submit and **copy the payment link**

---

## 1:10–1:40 — Pay into escrow

- Switch to the **payer** wallet
- Open the payment link → **Pay into Escrow (QIEUSD)**
- Point out: funds are **held in the contract**, not sent directly to the recipient
- Show escrow badge: **Escrow-backed**

---

## 1:40–2:00 — Release payment

- Switch to the **recipient** wallet
- Click **Release Escrow & Complete**
- Recipient receives QIEUSD only after marking work done

---

## 2:00–2:20 — Leave review

- Switch back to the **payer**
- Submit a 5-star review with short text
- Note: **rating + reviewHash on-chain**; full text can live off-chain

---

## 2:20–2:40 — Reputation profile + QIE Pass

- Open the recipient **profile**
- Show reputation score, trust badge, completed payments
- Highlight **QIE Pass Verified** on a demo profile
- On your own profile: **Verify with QIE Pass** (demo mock)

---

## 2:40–3:00 — Why QIE and future roadmap

"QIE Reputation Pay is built for the QIE ecosystem. QIE Wallet handles authorization, QIEUSD and QUSDC enable stable payments, QIE Pass reduces Sybil farming, and reputation becomes portable across QIE apps. Next: real QUSDC, QIE Pass API, QIE DEX auto-convert, and QIE Oracle risk scores. Twenty-four contract tests and CI are on GitHub."

---

## Backup demo mode

This app can be demoed without deployed contracts or Supabase using built-in demo data. If contract addresses are not configured, a demo mode banner appears and all pages work with sample requests and profiles.
