# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint
```

There are no automated tests in this project.

## Architecture

This is a **single-page, client-side-only Next.js app** (`"use client"` on every file). All routing is done via a `activeNav` state string in [app/page.tsx](app/page.tsx) — there are no Next.js file-system routes beyond the root page. The app renders one of four views based on that state:

| `activeNav` | View |
|---|---|
| `/` | Cost Overview (KPIStrip + SpendChart + ServiceTable + OUPanel) |
| `/engineers` | Engineer Activity (AIBanner + EngineerPanel) |
| `/waf` | WAF Review (WAFReview) |
| `/security` | Security Findings (SecurityTable) |

**Authentication** is a demo gate in [app/page.tsx](app/page.tsx) — a boolean `authed` state that shows [components/auth/LoginPage.tsx](components/auth/LoginPage.tsx) when false. There is no real session, token, or backend. Demo credentials are hardcoded in `LoginPage.tsx` (password: `DictPNG2025!`).

### Data layer

All data lives in [lib/demo-data.ts](lib/demo-data.ts) as exported constants. This is the single source of truth for every component. When connecting to real AWS APIs, replace these exports with live fetches from AWS Cost Explorer / CloudTrail / Security Hub. The types (`Month`, `ServiceCost`, `OUCost`, `EngineerActivity`, `WAFPillar`, `SecurityFinding`, etc.) are also defined there and used across components.

Two shared formatters are exported from the same file:
- `fmt(n)` — compact format (`$48.3K`, `$1.2M`)
- `fmtFull(n)` — full dollar format with two decimal places

### UI framework

All UI components come from **AWS Cloudscape Design System** (`@cloudscape-design/components`). Each Cloudscape component is imported individually (e.g. `import Table from "@cloudscape-design/components/table"`). All Cloudscape packages must be listed in `transpilePackages` in [next.config.ts](next.config.ts) — do not remove any entry there.

Dark mode is toggled via `applyMode(Mode.Dark | Mode.Light)` from `@cloudscape-design/global-styles`. The root layout initialises light mode on mount.

Charts use **Recharts** (`recharts`). `SpendChart` uses `ComposedChart` (bars + line). `OUPanel` uses `PieChart`. `WAFReview` uses `RadarChart`.

### Icons

All icons are custom inline SVGs — no image files, no icon libraries. There are two registries:
- [components/icons/AwsServiceIcon.tsx](components/icons/AwsServiceIcon.tsx) — maps AWS service name strings to SVG icons; falls back to initials square if unknown.
- [components/icons/PillarIcon.tsx](components/icons/PillarIcon.tsx) — maps WAF pillar name strings to SVG icons; falls back to initials square if unknown.

To add a new service icon, add a component function and register it in `ICON_MAP` / `PILLAR_MAP`.

### Flash notifications

The `flash` state array in [app/page.tsx](app/page.tsx) drives a `Flashbar` rendered both in a fixed overlay (top-right) and in the `AppLayout` `notifications` slot. `addFlash` auto-dismisses `success`/`info` after 4 s. This is the pattern to follow for any new user-facing feedback.
