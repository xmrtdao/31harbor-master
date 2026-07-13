// src/components/AgentPresenter.tsx
import React from "react";
import { AbsoluteFill, Sequence, Video, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";

type Props = {
  videoUrl?: string;       // if omitted, shows placeholder frame
  agentName: string;
  /** seconds into the video when the agent appears */
  appearAt?: number;
  /** width of PIP box in px, default 360 */
  width?: number;
  /** height of PIP box in px, default 540 */
  height?: number;
  /** screen position */
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
};

const positionStyles: Record<NonNullable<Props["position"]>, React.CSSProperties> = {
  "bottom-right": { justifyContent: "flex-end", alignItems: "flex-end", padding: 60 },
  "bottom-left": { justifyContent: "flex-end", alignItems: "flex-start", padding: 60 },
  "top-right": { justifyContent: "flex-start", alignItems: "flex-end", padding: 60 },
  "top-left": { justifyContent: "flex-start", alignItems: "flex-start", padding: 60 },
};

export const AgentPresenter: React.FC<Props> = ({
  videoUrl,
  agentName,
  appearAt = 1,
  width = 360,
  height = 540,
  position = "bottom-right",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appearFrame = appearAt * fps;
  const localFrame = Math.max(0, frame - appearFrame);

  const scale = spring({ frame: localFrame, fps, config: { damping: 16, mass: 0.9 } });
  const opacity = interpolate(localFrame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={positionStyles[position]}>
      <div
        style={{
          width,
          height,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 2px rgba(212,175,55,0.4)",
          opacity,
          transform: `scale(${0.8 + scale * 0.2})`,
        }}
      >
        {videoUrl ? (
          <Video
            src={videoUrl}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            muted
          />
        ) : (
          // Placeholder: dark gradient with agent name. Will be replaced once MuAPI delivers the avatar clip.
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #1a2a3a 0%, #0a1929 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#d4af37",
              fontFamily: "Georgia, serif",
              textAlign: "center",
              padding: 20,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #d4af37, #b8860b)",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
                color: "#0a1929",
                fontWeight: 700,
              }}
            >
              {agentName.charAt(0)}
            </div>
            <div style={{ fontSize: 22, fontWeight: 600 }}>{agentName}</div>
            <div style={{ fontSize: 12, opacity: 0.6, marginTop: 6, fontStyle: "italic" }}>
              AI Agent
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
