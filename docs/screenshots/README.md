# Screenshots for Hackathon Submission

**Screenshot status:** Pending before final submission

Screenshots are optional for local review, but **recommended for final judging**. The app includes demo routes (`/demo`, `/app/request/demo`, `/app/profile/demo`) that can be captured without wallet or testnet deployment.

After adding PNG files, run from repo root:

```bash
npm run docs:screenshots
```

## Checklist (8 files)

| # | Filename | Capture instructions |
|---|----------|----------------------|
| 1 | `01-landing.png` | `/` — hero, product story, three cards, demo CTA |
| 2 | `02-demo-page.png` | `/demo` — timeline, Judge Demo Mode banner, CTAs |
| 3 | `03-dashboard.png` | `/app/dashboard` — stats, cards, demo banner if shown |
| 4 | `04-create-request.png` | `/app/create` — filled form |
| 5 | `05-request-escrow.png` | `/app/request/demo` or request #2 — escrow state |
| 6 | `06-profile.png` | `/app/profile/demo` — reputation stats |
| 7 | `07-qie-pass-badge.png` | Demo profile — QIE Pass Verified + Sybil note |
| 8 | `08-qie-ecosystem.png` | `/app/about` — QIE integrations |

## How to capture

1. `npm run dev` → http://localhost:3000
2. Viewport ~1280×800
3. Wallet not required for demo routes 1–2, 5–7
