# Hackathon Submission Checklist

Use this checklist before final judging.

## Final submission

| Field | Value |
|-------|-------|
| **Live demo URL** | Pending before final submission |
| **Demo video URL** | Pending before final submission |
| **GitHub repo** | https://github.com/dorakingx/qie-reputation-pay |
| **MockQIEUSD (QIE testnet)** | Pending before final submission |
| **ReputationPay (QIE testnet)** | Pending before final submission |
| **QIE explorer links** | Pending before final submission — template: `https://testnet.qie.digital/address/{address}` |
| **Vercel deployment** | Pending before final submission |
| **CI** | Passing on main — [GitHub Actions](https://github.com/dorakingx/qie-reputation-pay/actions) |
| **Tests** | 24 passing — run `npm test` (`test/ReputationPay.ts`) |
| **Screenshots** | Pending before final submission — 8 files in [docs/screenshots/](screenshots/README.md) |

After deploy, replace **Pending before final submission** with real URLs and addresses. Do not add fake values.

---

## Deploy QIE testnet contracts (chain ID 1983)

```bash
# Set PRIVATE_KEY in .env at repo root
npm run deploy:testnet
```

Then update the Final submission table:

- **MockQIEUSD:** `0x...`
- **ReputationPay:** `0x...`
- **Explorer:** https://testnet.qie.digital/address/`{address}`

## Vercel environment variables

Set in Vercel project → Settings → Environment Variables:

- [ ] `NEXT_PUBLIC_REPUTATION_PAY_ADDRESS`
- [ ] `NEXT_PUBLIC_MOCK_QIEUSD_ADDRESS`
- [ ] `NEXT_PUBLIC_CHAIN_ID=1983`
- [ ] `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` (optional)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` (optional)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` (optional)

See [frontend/.env.example](../frontend/.env.example).

## Supabase (optional)

- [ ] Create Supabase project
- [ ] Run [supabase/seed.sql](../supabase/seed.sql) in SQL editor
- [ ] Add URL + anon key to Vercel env

Without Supabase, the app uses built-in demo data.

## Screenshots

Capture 8 screenshots per [docs/screenshots/README.md](screenshots/README.md) and add PNGs to `docs/screenshots/`.

## 3-minute demo

- **In-app walkthrough:** `/demo` (or `http://localhost:3000/demo`)
- **Read-aloud script:** [docs/demo-script.md](demo-script.md)
- **Judging criteria:** [docs/judging.md](judging.md)

## Known limitations

- MockQIEUSD instead of production QUSDC
- QIE Pass is demo mock (localStorage), not real API
- Refund delay: 60s local, 24h testnet
- Reputation score computed client-side for demo clarity

## Backup demo mode

This app can be demoed without deployed contracts or Supabase using built-in demo data.

1. Open app — **Demo mode** banner appears when env is missing
2. All pages work with [frontend/lib/demoData.ts](../frontend/lib/demoData.ts)
3. Escrow flow works in UI (mock state transitions)
4. Demo profiles: Maya Chen, Dr. Alex Rivera, ShopWave Store

No wallet required to browse; connect wallet for full flow.

## Verification before submit

```bash
npm install && npm run compile && npm test    # 24 tests pass
cd frontend && npm install --legacy-peer-deps && npm run build
```
