// src/components/PropertyFacts.tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

type Fact = { label: string; value: string };

type Props = {
  facts: Fact[];
  /** seconds to delay before showing */
  delay?: number;
};

export const PropertyFacts: React.FC<Props> = ({ facts, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delay * fps);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 80px" }}>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        {facts.map((fact, i) => {
          const itemFrame = Math.max(0, localFrame - i * 8);
          const y = spring({ frame: itemFrame, fps, config: { damping: 14 } });
          const opacity = interpolate(itemFrame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={fact.label}
              style={{
                background: "rgba(8,16,28,0.85)",
                border: "1px solid rgba(212,175,55,0.4)",
                padding: "20px 32px",
                borderRadius: 8,
                minWidth: 140,
                textAlign: "center",
                opacity,
                transform: `translateY(${(1 - y) * 40}px)`,
              }}
            >
              <div
                style={{
                  color: "#d4af37",
                  fontSize: 36,
                  fontWeight: 700,
                  fontFamily: "Georgia, serif",
                }}
              >
                {fact.value}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 14,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  marginTop: 6,
                  fontFamily: "Helvetica, Arial, sans-serif",
                }}
              >
                {fact.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
