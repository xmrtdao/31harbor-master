// src/compositions/SocialCTA.tsx
// 4-second vertical end-card / CTA bumper for Reels/TikTok/Shorts.
// Demonstrates: spring physics, looping background, "swipe up" arrow.

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { ParticleField } from "../components/ParticleField";

const ACCENT = "#d4af37";
const BG_DARK = "#0a1929";

export const SocialCTA: React.FC = () => {
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  // 0-0.5s: card punches in
  const cardSpring = spring({ frame, fps, config: { damping: 14, mass: 1.2, stiffness: 180 } });
  const cardScale = interpolate(cardSpring, [0, 1], [0.3, 1]);

  // 0.8s onward: pulsing arrow (looping)
  const arrowCycle = 30; // frames
  const arrowProgress = (frame % arrowCycle) / arrowCycle;
  const arrowY = interpolate(arrowProgress, [0, 1], [0, 20], {
    easing: Easing.inOut(Easing.quad),
  });
  const arrowOpacity = interpolate(arrowProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Background gradient rotation
  const gradAngle = interpolate(frame, [0, durationInFrames], [160, 200]);

  // Closing zoom
  const closeScale = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 1.08], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG_DARK,
        transform: `scale(${closeScale})`,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 70%, rgba(212,175,55,0.25) 0%, transparent 50%), linear-gradient(${gradAngle}deg, #0a1929 0%, #0f2540 50%, #050a14 100%)`,
        }}
      />

      <ParticleField count={40} seed="cta" color="rgba(212,175,55,0.4)" maxSize={3} speed={0.8} />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            transform: `scale(${cardScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
            textAlign: "center",
            padding: "0 60px",
          }}
        >
          <div
            style={{
              color: ACCENT,
              fontSize: 18,
              letterSpacing: 8,
              textTransform: "uppercase",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            Ready to Start?
          </div>

          <h1
            style={{
              color: "white",
              fontSize: 110,
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              margin: 0,
              letterSpacing: -2,
              lineHeight: 1.0,
              textShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            The Mine
            <br />
            <span style={{ color: ACCENT }}>is Yours.</span>
          </h1>

          <div
            style={{
              background: ACCENT,
              color: BG_DARK,
              padding: "28px 60px",
              fontSize: 32,
              fontWeight: 800,
              fontFamily: "Helvetica, Arial, sans-serif",
              letterSpacing: 4,
              textTransform: "uppercase",
              borderRadius: 6,
              boxShadow: `0 20px 60px rgba(212,175,55,0.4)`,
            }}
          >
            Join the DAO
          </div>

          {/* Pulsing arrow */}
          <div
            style={{
              transform: `translateY(${arrowY}px)`,
              opacity: arrowOpacity,
              color: ACCENT,
              fontSize: 60,
              marginTop: 20,
            }}
          >
            &darr;
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
