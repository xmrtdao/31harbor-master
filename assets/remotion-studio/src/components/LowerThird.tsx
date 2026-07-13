// src/components/LowerThird.tsx
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";

type Props = {
  headline: string;
  subhead?: string;
  delay?: number;        // frames to wait before animating in
  accent?: string;       // gold-ish hex, default #d4af37
};

export const LowerThird: React.FC<Props> = ({ headline, subhead, delay = 0, accent = "#d4af37" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delay);

  // Spring-in from below
  const y = spring({ frame: localFrame, fps, config: { damping: 14, mass: 0.8 } });
  const translateY = interpolate(y, [0, 1], [80, 0]);
  const opacity = interpolate(localFrame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", padding: 80 }}>
      <div
        style={{
          background: "linear-gradient(90deg, rgba(8,16,28,0.92) 0%, rgba(8,16,28,0.7) 70%, transparent 100%)",
          padding: "32px 56px",
          transform: `translateY(${translateY}px)`,
          opacity,
          maxWidth: "85%",
        }}
      >
        <div
          style={{
            width: 60,
            height: 3,
            background: accent,
            marginBottom: 16,
          }}
        />
        <h1
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: 700,
            margin: 0,
            fontFamily: "Georgia, serif",
            lineHeight: 1.05,
            letterSpacing: -0.5,
          }}
        >
          {headline}
        </h1>
        {subhead && (
          <p
            style={{
              color: accent,
              fontSize: 30,
              margin: "14px 0 0",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
            }}
          >
            {subhead}
          </p>
        )}
      </div>
    </AbsoluteFill>
  );
};
