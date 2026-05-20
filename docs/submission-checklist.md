# Hackathon Submission Checklist

Use this checklist before final judging. Check items as you complete them.

## Links

- [ ] **Live demo URL** — _TBD (deploy frontend to Vercel)_
- [ ] **Demo video URL** — _Optional but recommended (Loom/YouTube, ~3 min)_
- [x] **GitHub repo** — https://github.com/dorakingx/qie-reputation-pay

## QIE Testnet contracts (chain ID 1983)

Deploy with:

```bash
# Set PRIVATE_KEY in .env at repo root
npm run deploy:testnet
```

Then paste addresses here:

- [ ] **MockQIEUSD:** `0x...`
- [ ] **ReputationPay:** `0x...`
- [ ] **Explorer:** https://testnet.qie.digital/address/`<address>`

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

Capture 7 screenshots per [docs/screenshots/README.md](screenshots/README.md) and add to `docs/screenshots/`.

## 3-minute demo steps

Full script: [docs/demo-script.md](demo-script.md)

In-app guide: `/demo` on the live site (or `http://localhost:3000/demo` locally)

1. Explain problem (20s)
2. Connect wallet
3. Create escrow-backed payment request
4. Pay into escrow with MockQIEUSD
5. Release escrow (mark completed)
6. Leave review (hash on-chain)
7. Show profile + QIE Pass badge
8. QIE ecosystem page
9. Roadmap / tests / CI

## Known limitations

- MockQIEUSD instead of production QUSDC
- QIE Pass is demo mock (localStorage), not real API
- Refund delay: 60s local, 24h testnet
- Reputation score computed client-side for demo clarity
- Testnet contracts not deployed until you run deploy script

## Backup demo mode

If contracts or Supabase are not configured:

1. Open app — **Demo mode** banner appears
2. All pages work with [frontend/lib/demoData.ts](../frontend/lib/demoData.ts)
3. Escrow flow works in UI (mock state transitions)
4. Demo profiles: Maya Chen, Dr. Alex Rivera, ShopWave Store

No wallet required to browse; connect wallet for full flow.

## Verification before submit

```bash
npm install && npm run compile && npm test    # 24 tests pass
cd frontend && npm install --legacy-peer-deps && npm run build
```

CI: https://github.com/dorakingx/qie-reputation-pay/actions
