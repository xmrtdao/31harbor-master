// scripts/catalog-photos.mjs
// Walks assets/photos/<property>/ and generates a JSON catalog with
// dimensions and rough category (interior/exterior/beach/aerial/etc.)
// based on filename heuristics. You refine categories by hand.

import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2] || "assets/photos/harbor-road";
const outFile = process.argv[3] || join(dir, "_catalog.json");

const files = readdirSync(dir)
  .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
  .sort();

const catalog = files.map((file) => {
  const fp = join(dir, file);
  const buf = readFileSync(fp);
  // Quick JPEG dimension parse: scan for SOF0/SOF2 markers
  let w = null, h = null;
  if (file.match(/\.(jpg|jpeg)$/i) && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length - 1) {
      if (buf[i] !== 0xff) break;
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xc3) {
        h = buf.readUInt16BE(i + 5);
        w = buf.readUInt16BE(i + 7);
        break;
      }
      const segLen = buf.readUInt16BE(i + 2);
      i += 2 + segLen;
    }
  }
  return {
    file,
    bytes: buf.length,
    width: w,
    height: h,
    // Categories filled in by hand after viewing photos
    category: null,
    notes: null,
  };
});

writeFileSync(outFile, JSON.stringify(catalog, null, 2));
console.log(`Wrote catalog of ${catalog.length} images to ${outFile}`);
for (const c of catalog.slice(0, 5)) {
  console.log(`  ${c.file}  ${c.width}x${c.height}  ${(c.bytes / 1024).toFixed(1)} KB`);
}
console.log(`  ... +${catalog.length - 5} more`);
