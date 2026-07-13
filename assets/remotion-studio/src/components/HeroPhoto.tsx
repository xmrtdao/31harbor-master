// src/components/HeroPhoto.tsx
import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  src: string;
  /** 0..1 — start zoom, default 1 */
  scaleStart?: number;
  /** 0..1 — end zoom, default 1.1 */
  scaleEnd?: number;
  /** pan from x to x across the duration (px). Negative pans left. */
  panX?: number;
  /** pan from y to y across the duration (px). Negative pans up. */
  panY?: number;
  /** dark overlay opacity 0..1 */
  vignette?: number;
};

export const HeroPhoto: React.FC<Props> = ({
  src,
  scaleStart = 1,
  scaleEnd = 1.08,
  panX = 0,
  panY = -20,
  vignette = 0.35,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  const scale = interpolate(frame, [0, durationInFrames], [scaleStart, scaleEnd], {
    extrapolateRight: "clamp",
  });
  const x = interpolate(frame, [0, durationInFrames], [0, panX], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, durationInFrames], [0, panY], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
          transformOrigin: "center center",
        }}
      />
      {/* Cinematic vignette + darken for legibility */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,${vignette}) 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
