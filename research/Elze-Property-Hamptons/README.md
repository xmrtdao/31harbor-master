# Elze Property — Hamptons

Real estate video campaigns for David's listings. AI-agent presenters (programmatically generated) pitch properties to targeted buyer segments.

## Active Listing

**31 Harbor Road, Napeague (Lazy Point), NY**
- Community: Napeague Camping Club (incorporated 1964, roots to 1949 campground)
- Niche: Last authentic working-waterfront community in the Hamptons
- Narrative: "The Hidden Hamptons" — not the hedge-fund mansions

Source notes: see `comms with David.txt`

## Architecture

```
Elze-Property-Hamptons/
  remotion-studio/        # Remotion project (React-based video templates)
    src/
      compositions/       # One .tsx per video template
        HarborRoadPitch.tsx
      components/         # Reusable: LowerThird, AgentPresenter, PhotoCard
      data/               # Property data files (typed, swappable)
      lib/                # Audio, captions, asset loaders
    out/                  # Rendered MP4s (gitignored)
  scripts/                # Node/Python scripts for batch rendering
  assets/                 # Stock footage, music, agent voice samples
  briefs/                 # Per-listing creative briefs + buyer personas
  renders/                # Final deliverables (gitignored, large)
  comms with David.txt    # Raw notes from David
```

## Tech

- **Remotion 4.x** — React-based video framework, programmatic templates
- **TypeScript** — typed property data, IDE autocompletion
- **Node 24** — render via `npx remotion render`
- **ElevenLabs / local TTS** — voice for agent presenters
- **MuAPI** — still used for the base agent avatar video (single generation), then composited in Remotion with text/graphics/photos

## Buyer Personas (to refine)

1. **The Authentic Seeker** — wants coastal heritage, not McMansions. 45-65, NYC finance/creative.
2. **The Legacy Buyer** — multi-generational Hamptons family, looking for a foothold in a community that hasn't been strip-malled.
3. **The Creative Retreat** — artist/writer/filmmaker needing solitude + community.

## Workflow

1. David sends property brief + photos
2. We write a `data/<property>.ts` typed record
3. We pick (or generate) an AI agent avatar via MuAPI
4. Remotion template composes: avatar footage + photos + lower-thirds + voiceover + music
5. Render MP4s at 1080x1920 (Reels/TikTok) and 1920x1080 (YouTube/email)
6. Deploy via email campaign, social, listing page

## Status

- [x] Folder + README scaffold
- [ ] Remotion install + first render
- [ ] Harbor Road pitch template v1
- [ ] Agent avatar pipeline (MuAPI -> composited)
- [ ] Voiceover pipeline
- [ ] Per-persona variant generation
