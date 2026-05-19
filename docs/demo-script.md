# 3-Minute Hackathon Demo Script

**Total time: ~3 minutes**

## 1. Problem (20 seconds)

"Web3 makes payments easy, but trust is still fragmented. Freelancers rebuild reputation on every platform. QIE Reputation Pay fixes that with escrow-backed QIEUSD payments and portable wallet reputation on the QIE ecosystem."

## 2. Connect wallet (15 seconds)

- Open the live demo or `http://localhost:3000`
- Click **Launch App** → **Connect Wallet**
- Use QIE Testnet (chain 1983) or Hardhat local (31337)

## 3. Create escrow-backed payment request (30 seconds)

- Go to **Create**
- Title: "Logo design sprint"
- Amount: 100 QIEUSD
- Recipient: second demo wallet address
- Submit → copy payment link

## 4. Pay into escrow (30 seconds)

- Switch to payer wallet (Hardhat account #2 or second browser)
- Open payment link → **Pay into Escrow (QIEUSD)**
- Show escrow badge: funds held in contract, not sent directly

## 5. Release escrow & complete (25 seconds)

- Switch to recipient wallet
- **Release Escrow & Complete**
- Explain: recipient only receives funds after marking work done

## 6. Leave review (20 seconds)

- Switch back to payer
- Submit 5-star review with text
- Note: rating + hash on-chain; full text off-chain

## 7. Trust profile + QIE Pass (30 seconds)

- Open recipient **profile**
- Show reputation score, trust badge, **QIE Pass Verified**
- Click **Verify with QIE Pass** on your own profile (demo)

## 8. QIE ecosystem (20 seconds)

- Open **QIE Ecosystem** page
- Highlight: Wallet (active), Testnet, MockQIEUSD, QIE Pass demo, DEX/Oracle future

## 9. Roadmap (10 seconds)

"Next: real QUSDC, QIE Pass API, DEX auto-convert, Oracle risk scores. Fully tested contracts with CI."

---

**Backup:** If contracts unavailable, demo mode uses mock data — banner explains this to judges.
