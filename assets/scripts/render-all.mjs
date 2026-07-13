// scripts/render-all.mjs
//
// Renders all compositions for a property to /renders/<property-id>/.
// One MP4 per (persona, aspect) combination.
//
// Usage:
//   node scripts/render-all.mjs                      # renders everything in harborRoad.ts
//   node scripts/render-all.mjs --persona legacy     # single persona
//   node scripts/render-all.mjs --vertical-only      # 1080x1920 only
//   node scripts/render-all.mjs --horizontal-only    # 1920x1080 only

import { execSync, spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const studioRoot = join(projectRoot, "remotion-studio");
const outDir = join(projectRoot, "renders", "harbor-road");
const propertyId = "harbor-road";

const personas = [
  { id: "authentic-seeker", label: "Authentic Seeker" },
  { id: "legacy-buyer",     label: "Legacy Buyer" },
  { id: "creative-retreat", label: "Creative Retreat" },
];

const aspects = [
  { suffix: "1080",        width: 1920, height: 1080, include: !process.argv.includes("--vertical-only") },
  { suffix: "vertical",    width: 1080, height: 1920, include: !process.argv.includes("--horizontal-only") },
];

const personaFilter = (() => {
  const idx = process.argv.indexOf("--persona");
  return idx > -1 ? process.argv[idx + 1] : null;
})();

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const tasks = [];
for (const persona of personas) {
  if (personaFilter && persona.id !== personaFilter) continue;
  for (const aspect of aspects) {
    if (!aspect.include) continue;
    const compId = `HarborRoad-${persona.id}-${aspect.suffix}`;
    const outFile = join(outDir, `${propertyId}-${persona.id}-${aspect.suffix}.mp4`);
    tasks.push({ compId, outFile, width: aspect.width, height: aspect.height });
  }
}

console.log(`\n[render-all] ${tasks.length} jobs queued\n`);
for (const t of tasks) console.log(`  - ${t.compId} -> ${t.outFile}`);

let done = 0;
let failed = 0;
for (const t of tasks) {
  const start = Date.now();
  process.stdout.write(`\n[${++done}/${tasks.length}] ${t.compId} ... `);
  try {
    execSync(
      `npx remotion render ${t.compId} "${t.outFile}" --width=${t.width} --height=${t.height} --concurrency=2`,
      { cwd: studioRoot, stdio: ["ignore", "pipe", "pipe"] }
    );
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`OK (${elapsed}s)`);
  } catch (err) {
    failed++;
    console.log(`FAILED`);
    console.error(err.message?.split("\n").slice(-10).join("\n"));
  }
}

console.log(`\n[render-all] ${done - failed}/${tasks.length} succeeded. Output: ${outDir}\n`);
process.exit(failed > 0 ? 1 : 0);
