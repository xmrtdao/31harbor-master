// src/Root.tsx
import React from "react";
import { Composition } from "remotion";
import { HarborRoadPitch } from "./compositions/HarborRoadPitch";
import { harborRoad } from "./data/harborRoad";
import { BrandIntro } from "./compositions/BrandIntro";
import { ExecCard } from "./compositions/ExecCard";
import { MiningStats } from "./compositions/MiningStats";
import { SocialCTA } from "./compositions/SocialCTA";

const FPS = 30;

// ──────────────────────────────────────────────────────────────
// Harbor Road (existing — don't break the live Elze pipeline)
// ──────────────────────────────────────────────────────────────
const HARBOR_DURATION = 30;
const DURATION_FRAMES = FPS * HARBOR_DURATION;

// ──────────────────────────────────────────────────────────────
// Demo compositions (new) — short, fast renders, exercise
// different Remotion capabilities.
// ──────────────────────────────────────────────────────────────
const DEMO_DURATION = 5; // 5s for brand intro
const DEMO_FRAMES = FPS * DEMO_DURATION;

const STATS_DURATION = 8;
const STATS_FRAMES = FPS * STATS_DURATION;

const CTA_DURATION = 4;
const CTA_FRAMES = FPS * CTA_DURATION;

const EXEC_TOTAL_DURATION = 15; // 3s × 5 execs
const EXEC_TOTAL_FRAMES = FPS * EXEC_TOTAL_DURATION;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* === Existing Harbor Road pipeline (unchanged) === */}
      {harborRoad.personas.map((persona) => (
        <Composition
          key={`${harborRoad.id}-${persona.id}-h`}
          id={`HarborRoad-${persona.id}-1080`}
          component={HarborRoadPitch}
          durationInFrames={DURATION_FRAMES}
          fps={FPS}
          width={1920}
          height={1080}
          defaultProps={{ property: harborRoad, persona }}
        />
      ))}

      {harborRoad.personas.map((persona) => (
        <Composition
          key={`${harborRoad.id}-${persona.id}-v`}
          id={`HarborRoad-${persona.id}-vertical`}
          component={HarborRoadPitch}
          durationInFrames={DURATION_FRAMES}
          fps={FPS}
          width={1080}
          height={1920}
          defaultProps={{ property: harborRoad, persona }}
        />
      ))}

      {/* === Demo 1: Brand intro — 5s square + vertical === */}
      <Composition
        id="Demo-BrandIntro-Square"
        component={BrandIntro}
        durationInFrames={DEMO_FRAMES}
        fps={FPS}
        width={1080}
        height={1080}
      />
      <Composition
        id="Demo-BrandIntro-Vertical"
        component={BrandIntro}
        durationInFrames={DEMO_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Demo-BrandIntro-1080"
        component={BrandIntro}
        durationInFrames={DEMO_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* === Demo 2: Exec cards — 15s sequence + 3s singles === */}
      <Composition
        id="Demo-ExecCard-Sequence-1080"
        component={ExecCard}
        durationInFrames={EXEC_TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Demo-ExecCard-Sequence-Vertical"
        component={ExecCard}
        durationInFrames={EXEC_TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
      {/* Single-exec cards (one per leadership member) */}
      {[0, 1, 2, 3, 4].map((i) => (
        <Composition
          key={`Demo-ExecCard-${i}`}
          id={`Demo-ExecCard-${i}-1080`}
          component={ExecCard}
          durationInFrames={FPS * 3}
          fps={FPS}
          width={1920}
          height={1080}
          defaultProps={{ execIndex: i }}
        />
      ))}

      {/* === Demo 3: Mining stats — 8s dashboard === */}
      <Composition
        id="Demo-MiningStats-1080"
        component={MiningStats}
        durationInFrames={STATS_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Demo-MiningStats-Vertical"
        component={MiningStats}
        durationInFrames={STATS_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />

      {/* === Demo 4: Social CTA — 4s end card === */}
      <Composition
        id="Demo-SocialCTA-Vertical"
        component={SocialCTA}
        durationInFrames={CTA_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Demo-SocialCTA-Square"
        component={SocialCTA}
        durationInFrames={CTA_FRAMES}
        fps={FPS}
        width={1080}
        height={1080}
      />
      <Composition
        id="Demo-SocialCTA-1080"
        component={SocialCTA}
        durationInFrames={CTA_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
