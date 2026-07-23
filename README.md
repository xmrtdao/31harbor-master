# 31 Harbor Road — Napeague (Lazy Point), NY

> **31 Harbor Road, Napeague (Lazy Point), NY — Napeague Camping Club**
> Bay View Cottage in the last authentic working-waterfront community in the Hamptons

## Overview

This master folder contains all research, assets, marketing materials, legal documents, financial data, timeline tracking, and communications related to the **31 Harbor Road** property. The property is a bay view home within the Napeague Camping Club — an incorporated community (1964) with roots dating back to a 1949 campground.

**IMPORTANT — July 2026 Course Correction:** Per David Elze's directive, all distribution is HALTED. The property is a **Douglas Elliman exclusive** (MLS #422823, listing agent Julie Gauger, East Hampton office). All copy must be re-baselined against the Elliman listing as the single source of truth. See `31harbor_course_correction_july_2026` in the fleet shared context for full details.

## Folder Structure

```
31Harbor-Master/
├── README.md              ← This file — master overview
├── INDEX.md               ← Complete file inventory
│
├── research/              ← Market research, property analysis, comparables
│   ├── Elze-Property-Hamptons/     ← Original Remotion project (video templates, renders, scripts)
│   ├── David-Hamptons-Home/        ← David's raw property photos, offering docs, dossier
│   ├── sea-hampton-house/          ← Landing page, press release tools, sales strategy
│   ├── 31harbor-agency-dashboard/  ← Agency dashboard web app (Vite/React/TypeScript)
│   ├── Napeague Camping Club Dossier.docx
│   ├── _31harbor_com.html          ← Archived site scrapes
│   ├── _31harbor_full.html
│   ├── _31harbor_site.html
│   └── _sp_New_York_real_estate.html
│
├── assets/               ← All media and creative assets
│   ├── renders/          ← Rendered video deliverables (MP4s)
│   │   └── harbor-road/  ← 8 MP4s (4 personas × 2 formats: 1080p + vertical)
│   ├── scripts/          ← Node.js utility scripts
│   │   ├── catalog-photos.mjs
│   │   ├── extract-docx-text.mjs
│   │   ├── fetch-listing-photos.mjs
│   │   └── render-all.mjs
│   ├── raw/              ← Source media
│   │   ├── photos/
│   │   │   ├── harbor-road/   ← 23 property photos (01.jpg–23.jpg) + catalog/manifest
│   │   │   └── manifests/     ← Photo manifests
│   │   ├── audio/        ← Audio files (empty, ready for use)
│   │   ├── avatars/      ← Agent avatar assets (empty, ready for use)
│   │   ├── music/        ← Music tracks (empty, ready for use)
│   │   └── incoming/     ← Raw incoming files (dossier in .txt, .docx, .pdf)
│   ├── remotion-studio/  ← Remotion 4.x project (React-based video templates)
│   └── re31harborrd.zip  ← Archived render deliverables
│
├── marketing/            ← Campaign plans, buyer personas, media strategy
│   ├── PRESS_RELEASE.md
│   ├── SALES_STRATEGY.md
│   ├── sea-hampton-house-README.md
│   ├── 31harbor-contacts.json
│   ├── 31harbor-press-release-list.json
│   ├── 31harbor-national-scraper.mjs
│   ├── 31harbor-press-release-sender.mjs
│   └── build-31harbor-press-release-list.mjs
│
├── legal/                ← Ownership docs, contracts, disclosures
│   (empty — ready for legal documents)
│
├── financial/            ← Pricing, offers, projections
│   ├── 31 Harbor Road Offering.docx
│   └── 31 Harbor Road Offering.pdf
│
├── timeline/             ← Milestones, deadlines, progress tracking
│   (empty — ready for timeline tracking)
│
└── comms/                ← Email threads, contact info, API keys
    ├── comms with David.txt
    ├── Resend Account API.txt
    ├── Resend and Cloudflare CF Account API Keys.txt
    ├── original email list of local community - send first.txt
    └── Angles.docx
```

## Key Assets

### Rendered Videos (8 MP4s)
Located in `assets/renders/harbor-road/`:
- **harbor-road-coastal-lifestyle** — 1080p + vertical
- **harbor-road-collector** — 1080p + vertical
- **harbor-road-entrepreneur** — 1080p + vertical
- **harbor-road-hamptons-access** — 1080p + vertical

### Property Photos (23 JPGs)
Located in `assets/raw/photos/harbor-road/`:
- 01.jpg–23.jpg — Exterior and interior property photos
- `_catalog.json` — Photo catalog metadata
- `_manifest.json` — Photo manifest

### Remotion Studio
Located in `assets/remotion-studio/`:
- React-based video template project (Remotion 4.x)
- Compositions: HarborRoadPitch, BrandIntro, ExecCard, MiningStats, SocialCTA
- Components: AgentPresenter, Caption, HeroPhoto, KineticText, LowerThird, ParticleField, PropertyFacts, StatCounter
- Data: `src/data/harborRoad.ts` — typed property data

### Research
- **Elze-Property-Hamptons/** — Original project with full Remotion source, renders, scripts
- **David-Hamptons-Home/** — Raw photos from David, offering docs, dossier
- **sea-hampton-house/** — Landing page site, press release tools, sales strategy
- **31harbor-agency-dashboard/** — Agency dashboard web app (Vite/React/TypeScript/Tailwind)

## Buyer Personas

1. **The Authentic Seeker** — Wants coastal heritage, not McMansions. 45-65, NYC finance/creative.
2. **The Legacy Buyer** — Multi-generational Hamptons family, looking for a foothold in a community that hasn't been strip-malled.
3. **The Creative Retreat** — Artist/writer/filmmaker needing solitude + community.

## Tech Stack

- **Remotion 4.x** — React-based video framework for programmatic video generation
- **TypeScript** — Typed property data, IDE autocompletion
- **Node.js** — Scripts for rendering, photo cataloging, press release distribution
- **Vite/React** — Agency dashboard web app
- **ElevenLabs / local TTS** — Voice for agent presenters
- **MuAPI** — Base agent avatar video generation

## Status

- [x] Folder structure created
- [x] All assets copied and organized
- [x] Research materials consolidated
- [x] Marketing materials and press release tools
- [x] Financial documents (offering docs)
- [x] Communications and API keys
- [ ] Legal documents (empty — ready)
- [ ] Timeline tracking (empty — ready)
- [ ] Remotion renders complete (8 MP4s rendered)
- [ ] Press release distribution tools ready
- [ ] **HALTED** — All distribution paused per David's July 2026 directive. Property is a Douglas Elliman exclusive (MLS #422823). Re-baseline pending.

---

*Last updated: July 23, 2026 — Applied course correction per David Elze directive*
