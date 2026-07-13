// src/compositions/ExecCard.tsx
// 6-second executive card / LinkedIn header.
// Demonstrates: portrait + caption with timed reveal, accent bar, ID-card style.
// Data: 5 XMRT execs. Pass the exec as a prop; renders all 5 sequentially.

import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { staticFile } from "remotion";

export type Exec = {
  name: string;
  role: string;
  photo: string; // path to /public/photos/execs/...
  tagline: string;
};

const ACCENT = "#d4af37";
const BG_DARK = "#0a1929";

// Use the absolute path to "XMRT Executives Personas Pics/" via staticFile.
// Remotion's staticFile resolves files from /public; we can put them anywhere
// relative to that. For simplicity we point at harbor-road/ subfolder
// (since it already exists) and we'll symlink or copy the execs there.
// But to keep this self-contained, we use raw strings that reference
// the public-relative path. We'll create the folder at render-time.
const EXECS: Exec[] = [
  { name: "Akari Tanaka",  role: "Chief Product Officer",  photo: staticFile("photos/execs/yakamoto-cpo.png"), tagline: "Building tools the team actually uses." },
  { name: "Anya Sharma",   role: "Chief Technology Officer", photo: staticFile("photos/execs/sharma-cto.png"),  tagline: "AI you can audit, infra you can read." },
  { name: "Isabella Rodriguez", role: "Chief Marketing Officer", photo: staticFile("photos/execs/bella-cmo.png"),   tagline: "Tells the story the product is living." },
  { name: "Omar Al-Farsi", role: "Chief Financial Officer", photo: staticFile("photos/execs/saudi-farsi-cfo.png"), tagline: "Treasury that runs itself, audits on rails." },
  { name: "Klous",         role: "Chief Operating Officer",  photo: staticFile("photos/execs/klous-coo.png"),    tagline: "Keeps the train on the rails." },
];

const EXEC_DURATION = 90; // 3s per exec at 30fps
const TOTAL = EXEC_DURATION * EXECS.length; // 450 frames = 15s

type Props = {
  execIndex?: number; // 0-4; if set, render only that one
};

export const ExecCard: React.FC<Props> = ({ execIndex }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  if (execIndex !== undefined) {
    return <SingleExec exec={EXECS[execIndex]} index={execIndex} startFrame={0} />;
  }

  // Full sequence: one after the other
  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
      {EXECS.map((exec, i) => (
        <Sequence key={exec.name} from={i * EXEC_DURATION} durationInFrames={EXEC_DURATION}>
          <SingleExec exec={exec} index={i} startFrame={i * EXEC_DURATION} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

const SingleExec: React.FC<{ exec: Exec; index: number; startFrame: number }> = ({ exec, index, startFrame }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  // 0.0-0.3s: photo slides in from right
  const photoX = spring({ frame: localFrame, fps, config: { damping: 16, mass: 0.9 } });
  const photoTranslateX = interpolate(photoX, [0, 1], [120, 0]);
  const photoOpacity = interpolate(localFrame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // 0.2-0.5s: name fades in
  const nameOpacity = interpolate(localFrame, [18, 28], [0, 1], { extrapolateRight: "clamp" });
  const nameX = interpolate(localFrame, [18, 32], [-20, 0], { extrapolateRight: "clamp" });

  // 0.4-0.7s: role + tagline fade in
  const restOpacity = interpolate(localFrame, [36, 48], [0, 1], { extrapolateRight: "clamp" });

  // 0.7-1.0s: accent bar grows
  const barWidth = interpolate(localFrame, [60, 80], [0, 200], { extrapolateRight: "clamp" });

  // 0.8-end: subtle scale-out
  const outScale = interpolate(localFrame, [75, 90], [1, 1.06], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG_DARK,
        transform: `scale(${outScale})`,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 30% 40%, rgba(212,175,55,0.12) 0%, transparent 55%)`,
        }}
      />

      <AbsoluteFill
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 100,
          gap: 100,
        }}
      >
        {/* Photo */}
        <div
          style={{
            width: 460,
            height: 460,
            borderRadius: 24,
            overflow: "hidden",
            border: `2px solid ${ACCENT}`,
            transform: `translateX(${photoTranslateX}px)`,
            opacity: photoOpacity,
            boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.15)`,
            flexShrink: 0,
          }}
        >
          <img
            src={exec.photo}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt={exec.name}
          />
        </div>

        {/* Text */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              color: ACCENT,
              fontSize: 16,
              fontFamily: "Helvetica, Arial, sans-serif",
              textTransform: "uppercase",
              letterSpacing: 4,
              opacity: restOpacity,
            }}
          >
            0{index + 1} / 0{5} &middot; Leadership
          </div>
          <h1
            style={{
              color: "white",
              fontSize: 80,
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              margin: 0,
              letterSpacing: -1,
              lineHeight: 1.05,
              opacity: nameOpacity,
              transform: `translateX(${nameX}px)`,
            }}
          >
            {exec.name}
          </h1>
          <h2
            style={{
              color: ACCENT,
              fontSize: 32,
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              margin: 0,
              opacity: restOpacity,
            }}
          >
            {exec.role}
          </h2>
          <div
            style={{
              width: barWidth,
              height: 3,
              background: ACCENT,
              margin: "12px 0",
            }}
          />
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 26,
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 300,
              lineHeight: 1.4,
              margin: 0,
              maxWidth: 700,
              opacity: restOpacity,
            }}
          >
            &ldquo;{exec.tagline}&rdquo;
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
