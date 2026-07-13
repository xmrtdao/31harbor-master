// src/components/Caption.tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  text: string;
  /** frame to start showing */
  from: number;
  /** frame to hide (optional, defaults to remaining duration) */
  to?: number;
  /** subtitle-safe position */
  position?: "top" | "center" | "bottom";
  /** left padding multiplier to leave room for a side-by-side PIP element */
  leftGutter?: number;
};

export const Caption: React.FC<Props> = ({ text, from, to, position = "bottom", leftGutter = 0 }) => {
  const frame = useCurrentFrame();
  if (frame < from) return null;
  if (to !== undefined && frame >= to) return null;

  const align: Record<NonNullable<Props["position"]>, string> = {
    top: "flex-start",
    center: "center",
    bottom: "flex-end",
  };

  return (
    <AbsoluteFill
      style={{
        justifyContent: align[position],
        alignItems: "center",
        padding: `0 ${80 + leftGutter}px 120px ${80 + leftGutter}px`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.78)",
          color: "white",
          padding: "14px 28px",
          fontSize: 32,
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 500,
          maxWidth: "85%",
          textAlign: "center",
          lineHeight: 1.3,
          borderLeft: "4px solid #d4af37",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
