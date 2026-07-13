// src/components/ParticleField.tsx
// Subtle moving-dot field — great for backgrounds on intros/outros.
// Pure CSS — no external assets.

import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, random } from "remotion";

type Props = {
  count?: number;
  seed?: number;            // change for different layouts
  color?: string;
  maxSize?: number;
  speed?: number;           // higher = faster
};

export const ParticleField: React.FC<Props> = ({
  count = 60,
  seed = "particles",
  color = "rgba(212,175,55,0.6)",
  maxSize = 4,
  speed = 1,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  // Generate stable positions for `count` particles using seeded randomness
  const particles = React.useMemo(() => {
    return new Array(count).fill(0).map((_, i) => ({
      x: random(`${seed}-x-${i}`) * width,
      y: random(`${seed}-y-${i}`) * height,
      size: 1 + random(`${seed}-s-${i}`) * (maxSize - 1),
      phase: random(`${seed}-p-${i}`) * Math.PI * 2,
      drift: 10 + random(`${seed}-d-${i}`) * 30,
    }));
  }, [count, seed, width, height, maxSize]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {particles.map((p, i) => {
        const progress = (frame / durationInFrames) * speed;
        const y = (p.y - progress * p.drift * 3 + p.phase * 5) % height;
        const opacity = interpolate(
          Math.sin((frame / 30 + p.phase) * 0.5),
          [-1, 1],
          [0.2, 0.9]
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: y < 0 ? y + height : y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: color,
              opacity,
              boxShadow: `0 0 ${p.size * 2}px ${color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
