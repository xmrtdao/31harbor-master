// src/compositions/HarborRoadPitch.tsx
//
// A 30-second property pitch for 31 Harbor Road, Napeague.
// Hooks a specific buyer persona in the first 3 seconds, then layers in
// heritage, facts, and a CTA. Designed for vertical (Reels/TikTok) and
// horizontal (YouTube/email) reuse.
//
// Timeline (30s @ 30fps = 900 frames):
//   0-3s    Cold-open: hook text on dramatic photo
//   3-7s    Lower-third: address + headline
//   7-15s   Gallery cutaways + body copy + agent presenter (left side)
//   15-22s  Property facts cards
//   22-30s  CTA card with price

import React from "react";
import { AbsoluteFill, Audio, Sequence, useVideoConfig, interpolate, useCurrentFrame } from "remotion";
import { HeroPhoto } from "../components/HeroPhoto";
import { LowerThird } from "../components/LowerThird";
import { AgentPresenter } from "../components/AgentPresenter";
import { Caption } from "../components/Caption";
import { PropertyFacts } from "../components/PropertyFacts";
import type { Property, BuyerPersona } from "../data/harborRoad";

type Props = {
  property: Property;
  persona: BuyerPersona;
};

export const HarborRoadPitch: React.FC<Props> = ({ property, persona }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Build facts list from property data
  const facts = [
    property.bedrooms !== undefined && { label: "Beds", value: String(property.bedrooms) },
    property.bathrooms !== undefined && { label: "Baths", value: String(property.bathrooms) },
    property.sqft !== undefined && { label: "Sq Ft", value: property.sqft.toLocaleString() },
    property.yearBuilt !== undefined && { label: "Built", value: String(property.yearBuilt) },
  ].filter(Boolean) as { label: string; value: string }[];

  // Heritage fact (always shown)
  const heritageFact = { label: "Est.", value: "1949" };

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1929", fontFamily: "Georgia, serif" }}>
      {/* ==== 0-3s: Cold-open hook on the hero ==== */}
      <Sequence from={0} durationInFrames={fps * 3}>
        <HeroPhoto src={property.heroPhotoUrl} scaleStart={1.05} scaleEnd={1.12} panY={-20} />
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
          <div
            style={{
              color: "white",
              fontSize: 72,
              fontWeight: 700,
              textAlign: "center",
              fontFamily: "Georgia, serif",
              lineHeight: 1.15,
              textShadow: "0 4px 20px rgba(0,0,0,0.8)",
              opacity: interpolate(frame, [0, 20, fps * 3 - 20, fps * 3], [0, 1, 1, 0], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            {persona.hook}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ==== 3-7s: Lower-third with address + headline ==== */}
      <Sequence from={fps * 3} durationInFrames={fps * 4}>
        <HeroPhoto src={property.heroPhotoUrl} scaleStart={1.12} scaleEnd={1.15} panY={-25} />
        <LowerThird headline={property.address} subhead={property.headline} />
      </Sequence>

      {/* ==== 7-15s: Gallery cutaways + body copy + agent ==== */}
      <Sequence from={fps * 7} durationInFrames={fps * 8}>
        {/* Cycle through gallery photos as background */}
        {property.galleryPhotos.map((photo, i) => {
          const sliceFrames = (fps * 8) / Math.max(1, property.galleryPhotos.length);
          return (
            <Sequence key={photo + i} from={i * sliceFrames} durationInFrames={sliceFrames}>
              <HeroPhoto
                src={photo}
                scaleStart={1.05}
                scaleEnd={1.18}
                panY={-30}
                panX={(i % 2 === 0 ? -20 : 20)}
                vignette={0.5}
              />
            </Sequence>
          );
        })}
        {/* Agent on the LEFT so it doesn't fight the centered caption */}
        <AgentPresenter
          videoUrl={property.agent.avatarVideoUrl}
          agentName={property.agent.name}
          appearAt={0.3}
          position="bottom-left"
          width={280}
          height={420}
        />
        <Caption text={persona.bodyCopy} from={fps * 0.3} to={fps * 7.7} position="bottom" leftGutter={220} />
      </Sequence>

      {/* ==== 15-22s: Property facts on top of beach b-roll ==== */}
      <Sequence from={fps * 15} durationInFrames={fps * 7}>
        {/* Use the beach b-roll (last gallery photo) as background */}
        <HeroPhoto
          src={property.galleryPhotos[property.galleryPhotos.length - 1] || property.heroPhotoUrl}
          scaleStart={1.0}
          scaleEnd={1.08}
          panY={-15}
          vignette={0.55}
        />
        <PropertyFacts facts={[...facts, heritageFact]} delay={0.2} />
        <Sequence from={fps * 4} durationInFrames={fps * 3}>
          <LowerThird headline={property.community} subhead={property.region} delay={0} />
        </Sequence>
      </Sequence>

      {/* ==== 22-30s: CTA card with price ==== */}
      <Sequence from={fps * 22} durationInFrames={fps * 8}>
        <HeroPhoto
          src={property.heroPhotoUrl}
          scaleStart={1.1}
          scaleEnd={1.2}
          panY={-30}
          vignette={0.7}
        />
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(8,16,28,0.95), rgba(20,30,50,0.95))",
              border: "2px solid #d4af37",
              padding: "60px 80px",
              borderRadius: 16,
              textAlign: "center",
              maxWidth: "80%",
            }}
          >
            <div
              style={{
                color: "#d4af37",
                fontSize: 18,
                textTransform: "uppercase",
                letterSpacing: 4,
                marginBottom: 20,
                fontFamily: "Helvetica, Arial, sans-serif",
              }}
            >
              Now Available
            </div>
            <div
              style={{
                color: "white",
                fontSize: 56,
                fontWeight: 700,
                marginBottom: 12,
                fontFamily: "Georgia, serif",
              }}
            >
              {property.address}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: 22,
                fontStyle: "italic",
                marginBottom: 24,
                fontFamily: "Georgia, serif",
              }}
            >
              {property.community} &middot; {property.region}
            </div>
            {property.price && (
              <div
                style={{
                  color: "#d4af37",
                  fontSize: 80,
                  fontWeight: 700,
                  marginBottom: 8,
                  fontFamily: "Georgia, serif",
                  lineHeight: 1,
                }}
              >
                {property.price}
              </div>
            )}
            {property.priceFootnote && (
              <div
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 16,
                  fontStyle: "italic",
                  marginBottom: 24,
                  fontFamily: "Helvetica, Arial, sans-serif",
                }}
              >
                {property.priceFootnote}
              </div>
            )}
            <div
              style={{
                background: "#d4af37",
                color: "#0a1929",
                padding: "20px 40px",
                fontSize: 22,
                fontWeight: 700,
                display: "inline-block",
                borderRadius: 4,
                fontFamily: "Helvetica, Arial, sans-serif",
                letterSpacing: 1,
              }}
            >
              {persona.cta}
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Audio layers */}
      {property.agent.voiceoverUrl && (
        <Audio src={property.agent.voiceoverUrl} volume={property.agent.voiceVolume ?? 1} />
      )}
      {property.musicBedUrl && (
        <Audio src={property.musicBedUrl} volume={property.musicVolume ?? 0.15} loop />
      )}
    </AbsoluteFill>
  );
};
