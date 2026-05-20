# Hackathon Submission Checklist

Use this checklist before final judging.

## If you only have 3 minutes

1. Open the live demo https://qie-reputation-pay.vercel.app or `/demo`
2. View the escrow-backed payment flow
3. Open `/app/request/demo`
4. See QIEUSD held in escrow
5. Open `/app/profile/demo`
6. See QIE Pass demo verification and portable reputation
7. Check [docs/judging.md](judging.md) for criteria mapping

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
| **CI status** | Passing on main — [GitHub Actions](https://github.com/dorakingx/qie-reputation-pay/actions) |
| **Test status** | 24 passing — `npm test` ([`test/ReputationPay.ts`](../test/ReputationPay.ts)) |
| **Screenshot status** | Pending before final submission |
| **Backup demo mode** | Available — `/demo`, `/app/request/demo`, `/app/profile/demo` |

After deploy, explorer links use: `https://testnet.qie.digital/address/{address}`

Replace **Pending before final submission** with real values only when complete. Do not add fake URLs or addresses.

> **The project is fully demoable in local/demo mode even before testnet deployment.** Run `npm run dev` and open the backup demo routes above without wallet, Supabase, or contract environment variables.

---

## Final deployment steps

### 1. Create root `.env`

```bash
PRIVATE_KEY=
QIE_TESTNET_RPC=https://rpc1testnet.qie.digital/
```

Copy from [`.env.example`](../.env.example).

### 2. Deploy contracts

```bash
npm run deploy:testnet
```

### 3. Copy addresses and explorer links

Update README Final submission table and this checklist.

### 4. Deploy frontend

```bash
cd frontend
vercel
```

### 5. Vercel environment variables

```
NEXT_PUBLIC_CHAIN_ID=1983
NEXT_PUBLIC_REPUTATION_PAY_ADDRESS=
NEXT_PUBLIC_MOCK_QIEUSD_ADDRESS=
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## Final steps before submission

- [x] Deploy contracts to QIE testnet (see [deployed-addresses.md](deployed-addresses.md))
- [x] Paste contract addresses and explorer links into Final submission table
- [x] Deploy frontend to Vercel — https://qie-reputation-pay.vercel.app
- [x] Add Vercel URL to Live demo URL row
- [ ] Record 2–3 minute demo video ([docs/demo-script.md](demo-script.md))
- [ ] Capture screenshots and run `npm run docs:screenshots`
- [ ] Run `npm test`
- [ ] Run `cd frontend && npm run build`
- [ ] Confirm `/demo`, `/app/request/demo`, `/app/profile/demo` work without wallet

---

## Judge demo URLs (no deploy required)

| Page | URL |
|------|-----|
| Walkthrough | `/demo` |
| Escrow demo landing | `/app/request/demo` → request #2 (Escrowed) |
| Profile demo landing | `/app/profile/demo` → Maya Chen (QIE Pass verified) |
| Dashboard | `/app/dashboard` |

---

## Verification before submit

### Automated

```bash
npm install
npm run compile
npm test
cd frontend
npm install --legacy-peer-deps
npm run build
```

### Manual

- [ ] Landing page loads
- [ ] `/demo` loads
- [ ] `/app/request/demo` loads (landing + link to escrow)
- [ ] `/app/profile/demo` loads (landing + link to profile)
- [ ] `/app/dashboard` loads
- [ ] README links work
- [ ] Screenshots present if available (`npm run docs:screenshots`)
- [ ] Final submission table filled (no Pending where complete)

---

## Screenshots

**Screenshot status:** Pending before final submission

Screenshots are optional for local review, but recommended for final judging. Demo routes can be captured without wallet or testnet deployment. See [docs/screenshots/README.md](screenshots/README.md).

```bash
npm run docs:screenshots
```

---

## What you still need to do manually

1. ~~Deploy to QIE testnet~~ — done ([deployed-addresses.md](deployed-addresses.md))
2. ~~Deploy frontend to Vercel~~ — done (https://qie-reputation-pay.vercel.app)
3. Record demo video (2–3 min, [docs/demo-script.md](demo-script.md))
4. Add screenshots to `docs/screenshots/` and run `npm run docs:screenshots`
5. Fill Final submission table (replace all Pending rows)
