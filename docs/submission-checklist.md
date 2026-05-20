# Hackathon Submission Checklist

Use this checklist before final judging.

## Final submission

| Field | Value |
|-------|-------|
| **Live demo URL** | Pending before final submission |
| **Demo video URL** | Pending before final submission |
| **GitHub repo URL** | https://github.com/dorakingx/qie-reputation-pay |
| **MockQIEUSD address (QIE testnet)** | Pending before final submission |
| **ReputationPay address (QIE testnet)** | Pending before final submission |
| **QIE explorer links** | Pending before final submission — template: `https://testnet.qie.digital/address/{address}` |
| **CI status** | Passing on main — [GitHub Actions](https://github.com/dorakingx/qie-reputation-pay/actions) |
| **Test status** | 24 passing — `npm test` ([`test/ReputationPay.ts`](../test/ReputationPay.ts)) |
| **Screenshot status** | Pending before final submission — 8 files in [docs/screenshots/](screenshots/README.md) |

After deploy, replace **Pending before final submission** with real URLs and addresses. Do not add fake values.

> **The project is fully demoable in local/demo mode even before testnet deployment.** Run `npm run dev`, open `/demo`, or visit `/app/request/demo` and `/app/profile/demo` without wallet, Supabase, or contract environment variables.

---

## Final deployment steps

### 1. Create root `.env`

Copy from [`.env.example`](../.env.example):

```bash
PRIVATE_KEY=
QIE_TESTNET_RPC=https://rpc1testnet.qie.digital/
```

### 2. Deploy contracts

```bash
npm run deploy:testnet
```

Writes `frontend/.env.local` and [docs/deployed-addresses.md](deployed-addresses.md).

### 3. Copy contract addresses

Update:

- [README.md](../README.md) — Final submission table
- This file — Final submission table
- Vercel environment variables (step 5)

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

See [frontend/.env.example](../frontend/.env.example).

---

## Judge demo URLs (no deploy required)

| Page | URL |
|------|-----|
| Walkthrough | `/demo` |
| Escrow request (demo) | `/app/request/demo` → request #2 (Escrowed) |
| QIE Pass profile (demo) | `/app/profile/demo` → Maya Chen |
| Dashboard | `/app/dashboard` |

## Screenshots

Capture 8 screenshots per [docs/screenshots/README.md](screenshots/README.md), then run:

```bash
npm run docs:screenshots
```

## 3-minute demo

- **In-app walkthrough:** `/demo`
- **Read-aloud script:** [docs/demo-script.md](demo-script.md)
- **Judging criteria:** [docs/judging.md](judging.md)

## Backup demo mode

This app can be demoed without deployed contracts or Supabase using built-in demo data.

1. Demo mode banner when contract env is missing
2. All pages use [frontend/lib/demoData.ts](../frontend/lib/demoData.ts)
3. Escrow UI works with mock state transitions
4. Demo profiles: Maya Chen, Dr. Alex Rivera, ShopWave Store

## Verification before submit

```bash
npm install && npm run compile && npm test
cd frontend && npm install --legacy-peer-deps && npm run build
```
