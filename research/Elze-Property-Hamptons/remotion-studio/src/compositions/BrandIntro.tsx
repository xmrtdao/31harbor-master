// src/compositions/BrandIntro.tsx
// 5-second cold-open brand stinger.
// Demonstrates: kinetic typography, spring physics, particle field, gradient backgrounds.
// Renders at 1080x1080 (square) — great for IG/LinkedIn/X post + reel cover.

import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { KineticText } from "../components/KineticText";
import { ParticleField } from "../components/ParticleField";

const ACCENT = "#d4af37"; // XMRT gold
const BG_DARK = "#0a1929";

export const BrandIntro: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  // Closing zoom: whole canvas scales 1 -> 1.05 across the 5s
  const zoom = spring({
    frame,
    fps,
    config: { damping: 30, mass: 2, stiffness: 40 },
  });
  const scale = interpolate(zoom, [0, 1], [1, 1.05]);

  // Background gradient slowly rotates
  const gradAngle = interpolate(frame, [0, durationInFrames], [120, 180]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG_DARK,
        transform: `scale(${scale})`,
      }}
    >
      {/* Animated gradient backdrop */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 60%, rgba(212,175,55,0.18) 0%, transparent 55%), linear-gradient(${gradAngle}deg, #0a1929 0%, #0f2540 50%, #050a14 100%)`,
        }}
      />

      {/* Particle field */}
      <ParticleField count={80} seed="brand-intro" color="rgba(212,175,55,0.5)" maxSize={3} />

      {/* Logo mark — simple but recognisable */}
      <Sequence from={0} durationInFrames={fps * 5}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 30,
          }}
        >
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              border: `3px solid ${ACCENT}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" }),
              transform: `scale(${interpolate(frame, [0, 20], [0.5, 1], { extrapolateRight: "clamp" })})`,
              boxShadow: `0 0 60px rgba(212,175,55,0.3)`,
            }}
          >
            <div
              style={{
                color: ACCENT,
                fontSize: 56,
                fontWeight: 800,
                fontFamily: "Georgia, serif",
              }}
            >
              X
            </div>
          </div>

          <KineticText
            text="XMRT DAO"
            mode="letter"
            startFrame={20}
            staggerFrames={2}
            riseDistance={30}
            color={ACCENT}
            fontSize={92}
            fontFamily="Georgia, serif"
            fontWeight={700}
            letterSpacing={6}
          />

          <KineticText
            text="Decentralized Monero Mining"
            mode="word"
            startFrame={70}
            staggerFrames={3}
            color="rgba(255,255,255,0.85)"
            fontSize={26}
            fontFamily="Helvetica, Arial, sans-serif"
            fontWeight={400}
            letterSpacing={2}
          />

          <div
            style={{
              marginTop: 30,
              width: interpolate(frame, [110, 140], [0, 200], { extrapolateRight: "clamp" }),
              height: 2,
              background: ACCENT,
            }}
          />

          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 16,
              fontFamily: "Helvetica, Arial, sans-serif",
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: interpolate(frame, [120, 140], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            The Mine is Yours
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
