// src/compositions/MiningStats.tsx
// 8-second animated dashboard / "year in numbers" clip.
// Demonstrates: animated counters (data viz), grid layout, gradient bars that fill.

import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { StatCounter } from "../components/StatCounter";
import { ParticleField } from "../components/ParticleField";

const ACCENT = "#d4af37";
const BG_DARK = "#050a14";
const CARD_BG = "rgba(15, 25, 45, 0.85)";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  fontSize?: number;
};

type Bar = {
  label: string;
  value: number;       // 0..1
  color?: string;
};

const STATS: Stat[] = [
  { label: "Active Workers",        value: 412,         fontSize: 110 },
  { label: "Hashrate (kH/s)",       value: 1247,        fontSize: 110 },
  { label: "Blocks Found",          value: 38,          fontSize: 110 },
  { label: "XMRT Distributed",      value: 2841092,     prefix: "",  fontSize: 100 },
  { label: "Pool Donated (USD)",    value: 42180,       prefix: "$", fontSize: 110 },
  { label: "Avg. Payout Latency",   value: 3.4,         suffix: "min", decimals: 1, fontSize: 130 },
];

const BARS: Bar[] = [
  { label: "USA",  value: 0.42 },
  { label: "EU",   value: 0.28, color: "#7fb069" },
  { label: "APAC", value: 0.19, color: "#e07a5f" },
  { label: "LATAM",value: 0.11, color: "#81b29a" },
];

export const MiningStats: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const headlineOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const headlineY = interpolate(frame, [0, 20], [-20, 0], { extrapolateRight: "clamp" });

  // 2x3 grid of stat cards
  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG_DARK,
        fontFamily: "Helvetica, Arial, sans-serif",
        padding: 80,
        flexDirection: "column",
        gap: 50,
      }}
    >
      <ParticleField count={50} seed="stats" color="rgba(212,175,55,0.25)" maxSize={2} speed={0.4} />

      {/* Headline */}
      <div
        style={{
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        <div
          style={{
            color: ACCENT,
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          XMRT DAO &middot; 2026 YTD
        </div>
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            letterSpacing: -1,
          }}
        >
          The Numbers, As They Stand
        </div>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 30,
          flex: 1,
        }}
      >
        {STATS.map((stat, i) => {
          const startFrame = 25 + i * 12;
          const cardSpring = spring({ frame: Math.max(0, frame - startFrame), fps, config: { damping: 18, mass: 0.9 } });
          const cardScale = interpolate(cardSpring, [0, 1], [0.85, 1]);
          const cardOpacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], { extrapolateRight: "clamp" });

          return (
            <div
              key={stat.label}
              style={{
                background: CARD_BG,
                border: `1px solid rgba(212,175,55,0.25)`,
                borderRadius: 18,
                padding: "40px 36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${cardScale})`,
                opacity: cardOpacity,
                boxShadow: `0 20px 50px rgba(0,0,0,0.4)`,
              }}
            >
              <StatCounter
                value={stat.value}
                startFrame={startFrame + 5}
                durationFrames={60}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals || 0}
                color="white"
                fontSize={stat.fontSize}
                fontFamily="Georgia, serif"
                fontWeight={700}
                label={stat.label}
                labelColor="rgba(212,175,55,0.7)"
                labelFontSize={16}
              />
            </div>
          );
        })}
      </div>

      {/* Region bars */}
      <Sequence from={fps * 4.5} durationInFrames={fps * 3.5}>
        <RegionBars />
      </Sequence>
    </AbsoluteFill>
  );
};

const RegionBars: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        background: CARD_BG,
        border: `1px solid rgba(212,175,55,0.25)`,
        borderRadius: 18,
        padding: "30px 40px",
        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
      }}
    >
      <div
        style={{
          color: "rgba(255,255,255,0.5)",
          fontSize: 14,
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 20,
        }}
      >
        Geographic Distribution
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {BARS.map((bar, i) => {
          const localFrame = Math.max(0, frame - 10 - i * 6);
          const w = interpolate(localFrame, [0, 70], [0, bar.value * 1200], {
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          return (
            <div key={bar.label} style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  color: "white",
                  fontSize: 22,
                  fontFamily: "Georgia, serif",
                  width: 90,
                }}
              >
                {bar.label}
              </div>
              <div
                style={{
                  flex: 1,
                  height: 26,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: w,
                    height: "100%",
                    background: bar.color || ACCENT,
                    boxShadow: `0 0 20px ${bar.color || ACCENT}66`,
                  }}
                />
              </div>
              <div
                style={{
                  color: "white",
                  fontSize: 22,
                  fontFamily: "Georgia, serif",
                  width: 70,
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {(bar.value * 100).toFixed(0)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
