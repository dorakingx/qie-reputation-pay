# Screenshots for Hackathon Submission

**Status:** Pending before final submission

Add PNG files to this folder, then run from repo root:

```bash
npm run docs:screenshots
```

That embeds existing images into [README.md](../README.md) automatically.

## Checklist (8 files)

| # | Filename | Capture instructions |
|---|----------|----------------------|
| 1 | `01-landing.png` | `/` — hero title, product story, three cards, “View 3-minute demo flow” button |
| 2 | `02-demo-page.png` | `/demo` — full walkthrough, timeline, backup mode, judge CTAs |
| 3 | `03-dashboard.png` | `/app/dashboard` — stats, payment cards, demo mode banner if shown |
| 4 | `04-create-request.png` | `/app/create` — form filled with sample title, amount, recipient |
| 5 | `05-request-escrow.png` | `/app/request/demo` — request #2 with **In Escrow** / Escrow-backed badge |
| 6 | `06-profile.png` | `/app/profile/demo` or Maya Chen — reputation bar, stats, trust badge |
| 7 | `07-qie-pass-badge.png` | Demo profile — QIE Pass Verified badge + Sybil explanation |
| 8 | `08-qie-ecosystem.png` | `/app/about` — QIE ecosystem integration cards |

## How to capture

1. `npm run dev` → http://localhost:3000 (or use live Vercel URL after deploy)
2. Viewport ~1280×800 for consistency
3. Wallet optional for dashboard/create; escrow shot uses `/app/request/demo` without wallet
