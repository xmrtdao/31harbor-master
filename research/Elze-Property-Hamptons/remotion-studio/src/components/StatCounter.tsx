// src/components/StatCounter.tsx
// Animated counter that ramps from 0 -> target over a duration.
// Demonstrates the data-driven "ticker" look common in dashboards / news.

import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";

type Props = {
  value: number;
  startFrame?: number;
  durationFrames?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  label?: string;
  labelColor?: string;
  labelFontSize?: number;
};

export const StatCounter: React.FC<Props> = ({
  value,
  startFrame = 0,
  durationFrames = 60,
  prefix = "",
  suffix = "",
  decimals = 0,
  color = "#ffffff",
  fontSize = 120,
  fontFamily = "Georgia, serif",
  fontWeight = 700,
  label,
  labelColor = "rgba(255,255,255,0.6)",
  labelFontSize = 22,
}) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - startFrame);
  const t = interpolate(localFrame, [0, durationFrames], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const current = (value * t).toFixed(decimals);
  // Add thousand separators
  const parts = current.split(".");
  parts[0] = Number(parts[0]).toLocaleString();
  const display = parts.join(".");

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          color,
          fontSize,
          fontFamily,
          fontWeight,
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {prefix}
        {display}
        {suffix}
      </div>
      {label && (
        <div
          style={{
            color: labelColor,
            fontSize: labelFontSize,
            fontFamily: "Helvetica, Arial, sans-serif",
            textTransform: "uppercase",
            letterSpacing: 4,
            marginTop: 12,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
