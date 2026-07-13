// src/components/KineticText.tsx
// Word-by-word or letter-by-letter kinetic type with configurable stagger.
// Used in the brand-intro composition.

import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";

type Mode = "word" | "letter" | "line";

type Props = {
  text: string;
  mode?: Mode;
  startFrame?: number;
  staggerFrames?: number;     // delay between elements
  riseDistance?: number;      // px each element rises from
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  align?: "left" | "center" | "right";
  uppercase?: boolean;
  letterSpacing?: number;
  lineHeight?: number;
};

export const KineticText: React.FC<Props> = ({
  text,
  mode = "word",
  startFrame = 0,
  staggerFrames = 4,
  riseDistance = 40,
  color = "#ffffff",
  fontSize = 80,
  fontFamily = "Helvetica, Arial, sans-serif",
  fontWeight = 800,
  align = "center",
  uppercase = false,
  letterSpacing = -1,
  lineHeight = 1.05,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elements =
    mode === "letter"
      ? text.split("")
      : mode === "line"
        ? text.split("\n")
        : text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent:
          align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
        gap: mode === "letter" ? 0 : `${fontSize * 0.25}px`,
        textAlign: align,
      }}
    >
      {elements.map((el, i) => {
        const localFrame = Math.max(0, frame - startFrame - i * staggerFrames);
        const s = spring({ frame: localFrame, fps, config: { damping: 18, mass: 0.7, stiffness: 110 } });
        const y = interpolate(s, [0, 1], [riseDistance, 0]);
        const opacity = interpolate(localFrame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `translateY(${y}px)`,
              opacity,
              color,
              fontSize,
              fontFamily,
              fontWeight,
              letterSpacing,
              lineHeight,
              textTransform: uppercase ? "uppercase" : "none",
              whiteSpace: "pre",
            }}
          >
            {el}
          </span>
        );
      })}
    </div>
  );
};
