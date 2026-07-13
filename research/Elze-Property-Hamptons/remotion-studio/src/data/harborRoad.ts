// src/data/property.ts
// Typed property/persona record. Drop in new listings by adding new files.

export type AgentPersona = {
  name: string;            // "Eliza", "Vex", "Ava"
  avatarVideoUrl?: string; // MuAPI-generated talking-head MP4
  voiceoverUrl?: string;   // ElevenLabs / local TTS MP3
  voiceVolume?: number;    // 0-1, default 1
};

export type BuyerPersona = {
  id: string;
  label: string;            // "The Authentic Seeker"
  hook: string;             // opening line tailored to this persona
  bodyCopy: string;         // 1-2 sentences in the agent's voice
  cta: string;              // closing call-to-action
};

export type Property = {
  id: string;
  address: string;
  community: string;
  region: string;
  heroPhotoUrl: string;     // background photo
  galleryPhotos: string[];  // optional cutaways
  headline: string;         // big lower-third text
  subhead?: string;
  price?: string;
  priceFootnote?: string;
  communityFee?: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  yearBuilt?: number;
  musicBedUrl?: string;     // looped background music
  musicVolume?: number;     // 0-1, default 0.15
  agent: AgentPersona;
  personas: BuyerPersona[]; // we'll render one variant per persona
  captionsSrt?: string;     // optional SRT string
};

// ──────────────────────────────────────────────────────────────────
// 31 Harbor Road, Napeague (Lazy Point) — David's listing
// ──────────────────────────────────────────────────────────────────
// Source: "The Napeague Camping Club Dossier" (Working Draft 1.0)
// Prepared by David for XMRT Solutions, Marketing Partners, Buyer Agents,
// Journalists, and Prospective Purchasers.
// See: ../briefs/31 Harbor Road - Napeague Camping Club Dossier.txt
//
// Listing data (current as of 2025-2026, Douglas Elliman):
//   3 bed · 2 bath · 720 sqft · 3.6 acres (community lot)
//   $899,000 list (most recent); reduced to $750K in Apr 2026
//   Year built: 1962 (per dossier) / 2018 (per Homefinder) — discrepancy noted
//   Open year-round · water views · private beach access · clubhouse
//
// Listing photos sourced from photos.zillowstatic.com (Douglas Elliman).
// See: assets/photos/harbor-road/_catalog.json for per-image categories.

import { staticFile } from "remotion";

export const harborRoad: Property = {
  id: "31-harbor-road",
  address: "31 Harbor Road",
  community: "Napeague Camping Club",
  region: "Amagansett, NY 11930 (Lazy Point, Napeague)",
  // 11 = sandy harbor with catamaran, no Zillow watermark burned in.
  // (01.jpg is the labeled aerial, but has the listing-agent text burned in
  // so we keep it as a backup / use it for editorial or social cards.)
  heroPhotoUrl: staticFile("photos/harbor-road/11.jpg"),
  // 01 = aerial w/ arrow (still useful for "where" / map-style moments)
  // 03 = living room, 04 = kitchen, 15 = calm water view, 11 = beach w/ catamaran
  galleryPhotos: [
    staticFile("photos/harbor-road/01.jpg"),
    staticFile("photos/harbor-road/03.jpg"),
    staticFile("photos/harbor-road/04.jpg"),
    staticFile("photos/harbor-road/15.jpg"),
  ],
  headline: "The First Public Offering in Napeague Camping Club History",
  subhead: "31 Harbor Road · Lazy Point, Napeague",
  bedrooms: 3,
  bathrooms: 2,
  sqft: 720,
  yearBuilt: 1962,
  price: "$750,000",
  priceFootnote: "Reduced from $899K",
  communityFee: "$175/mo (condo fee)",
  musicBedUrl: undefined,
  musicVolume: 0.12,
  agent: {
    name: "Eliza",
    avatarVideoUrl: undefined,
    voiceoverUrl: undefined,
    voiceVolume: 1,
  },
  // Four official buyer personas from the dossier, Chapter 5.
  // Each one becomes a rendered video variant in Root.tsx.
  personas: [
    {
      id: "coastal-lifestyle",
      label: "The Coastal Lifestyle Buyer",
      hook: "For the buyer who values experience over square footage.",
      bodyCopy:
        "Cash buyer. Existing homeowner. Age 40 to 70. Seeking a second residence in one of the last places where old Hamptons culture still survives. 31 Harbor Road is a rare chance to put down roots in a community that has intentionally remained different.",
      cta: "Request the property brief.",
    },
    {
      id: "hamptons-access",
      label: "The Hamptons Access Buyer",
      hook: "A presence in the Hamptons, without the $10 million price tag.",
      bodyCopy:
        "You understand that lifestyle and location matter more than headline square footage. You are comfortable with alternative ownership structures. 31 Harbor Road offers a foothold in Amagansett, in a community most Hamptons buyers have never heard of.",
      cta: "Schedule a private walk-through.",
    },
    {
      id: "collector",
      label: "The Collector",
      hook: "A historically significant asset. The first of its kind.",
      bodyCopy:
        "You seek unusual assets. You appreciate scarcity. You understand nontraditional opportunities. This is potentially the first publicly marketed residential offering in the history of Napeague Camping Club. That story cannot be replicated.",
      cta: "Inquire about provenance and history.",
    },
    {
      id: "entrepreneur",
      label: "The Entrepreneur",
      hook: "An overlooked market. A first-mover opportunity.",
      bodyCopy:
        "You are comfortable with complexity. You see value where others do not. The lack of prior public marketing has limited exposure, not demand. This transaction may establish the benchmark for every future Napeague Camping Club sale.",
      cta: "Speak with our acquisitions team.",
    },
  ],
};
