# Screenshots for Hackathon Submission

Add PNG screenshots to this folder before final judging. Suggested filenames:

| # | Filename | What to capture |
|---|----------|-----------------|
| 1 | `01-landing.png` | Landing page hero — escrow + QIE reputation headline, Judge Demo button |
| 2 | `02-dashboard.png` | Dashboard with stats, demo payment requests, demo mode banner if applicable |
| 3 | `03-create-request.png` | Create payment request form filled out |
| 4 | `04-escrow-status.png` | Payment request detail — "In Escrow" badge, pay/release actions |
| 5 | `05-profile.png` | Public reputation profile — score bar, trust badge, stats |
| 6 | `06-qie-pass-badge.png` | Profile showing QIE Pass Verified badge + explanation |
| 7 | `07-qie-ecosystem.png` | `/app/about` — QIE ecosystem integration page |

## How to capture

1. Run locally: `npm run dev` → http://localhost:3000
2. Or use deployed Vercel URL after deployment
3. Use 1280×800 or similar viewport for consistency
4. Connect wallet for escrow screenshots (Hardhat local or QIE testnet)

## Embed in README

After adding files, update the Screenshots section in [README.md](../README.md) with:

```markdown
![Landing](docs/screenshots/01-landing.png)
```
