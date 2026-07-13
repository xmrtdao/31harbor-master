// scripts/fetch-listing-photos.mjs
//
// Pulls listing photos from a Zillow / Out East / Sotheby's URL (or a list
// of direct photo URLs) and downloads them locally.
// Output: assets/photos/harbor-road/<n>.jpg
//
// Usage:
//   node scripts/fetch-listing-photos.mjs <listing-url-or-text-file> <output-dir>
//
// The script accepts:
//   - A URL (listing page): scrapes and extracts photos.zillowstatic.com URLs
//   - A direct photo URL (single file download)
//   - A text file with one photo URL per line (manifest)

import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { resolve, join, basename } from "node:path";

const [, , input, outputDirArg] = process.argv;
if (!input || !outputDirArg) {
  console.error("Usage: node fetch-listing-photos.mjs <input> <output-dir>");
  console.error("  input: URL, .txt file with one URL per line, or a directory of .jpg files to copy");
  process.exit(1);
}

const outputDir = resolve(outputDirArg);
if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

async function fetchText(url) {
  const r = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
    },
  });
  if (!r.ok) throw new Error(`Fetch ${url} -> ${r.status}`);
  return r.text();
}

function extractPhotoUrls(html) {
  const re = /https?:\/\/photos\.zillowstatic\.com\/fp\/[a-f0-9-]+-oe_web_[a-z_]+\.jpg/g;
  const set = new Set();
  for (const m of html.matchAll(re)) set.add(m[0]);
  // Normalize to highest-res "-p_n.jpg" variant (1920x1080).
  // Fallback ladder: -p_n > -p_f > -p_e (thumb)
  return Array.from(set).map((u) => u.replace(/-oe_web_[a-z_]+\.jpg$/, "-p_n.jpg"));
}

async function download(url, dest) {
  const r = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!r.ok) throw new Error(`Download ${url} -> ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  writeFileSync(dest, buf);
}

const isUrl = /^https?:\/\//.test(input);
const isTxt = /\.txt$/i.test(input);
const isImage = /\.(jpg|jpeg|png|webp)(\?|$)/i.test(input);

let urls = [];

if (isImage) {
  urls = [input];
} else if (isTxt && existsSync(input)) {
  // Treat as manifest: one URL per line
  const text = readFileSync(input, "utf8");
  urls = text.split(/\r?\n/).map((s) => s.trim()).filter((s) => s && /^https?:\/\//.test(s));
  console.log(`[manifest] ${urls.length} URLs from ${input}`);
} else if (isUrl) {
  console.log(`[scrape] ${input}`);
  const html = await fetchText(input);
  urls = extractPhotoUrls(html);
  console.log(`[found]   ${urls.length} photo URLs`);
  // Dedupe by hash
  const seen = new Set();
  urls = urls.filter((u) => {
    const m = u.match(/fp\/([a-f0-9-]+)/);
    if (!m || seen.has(m[1])) return false;
    seen.add(m[1]);
    return true;
  });
  console.log(`[unique]  ${urls.length} photos after dedupe`);
} else {
  console.error(`[err] input not recognized: ${input}`);
  process.exit(1);
}

// Write manifest
writeFileSync(join(outputDir, "_manifest.json"), JSON.stringify(urls, null, 2));

let ok = 0, fail = 0;
for (let i = 0; i < urls.length; i++) {
  const url = urls[i];
  const ext = (url.match(/\.(jpg|jpeg|png|webp)/i) || [".jpg"])[0].toLowerCase();
  const dest = join(outputDir, `${String(i + 1).padStart(2, "0")}${ext}`);
  try {
    // Try the requested variant, then fall back down: -p_n (1920x1080) > -p_f (1024x576) > -p_e (596x446 thumb)
    const candidates = [url, url.replace("-p_n.", "-p_f."), url.replace("-p_n.", "-p_e.")];
    let downloaded = false;
    for (const cand of candidates) {
      const r = await fetch(cand, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!r.ok) continue;
      const buf = Buffer.from(await r.arrayBuffer());
      writeFileSync(dest, buf);
      downloaded = true;
      break;
    }
    if (!downloaded) throw new Error("All variants returned non-200");
    ok++;
    console.log(`[${i + 1}/${urls.length}] OK  ${basename(dest)}`);
  } catch (e) {
    fail++;
    console.error(`[${i + 1}/${urls.length}] FAIL ${url}: ${e.message}`);
  }
}

console.log(`\n[done] ${ok} ok, ${fail} fail. Output: ${outputDir}`);
