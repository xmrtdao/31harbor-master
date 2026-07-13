// scripts/extract-docx-text.mjs
// Pulls all visible text from a .docx into a single .txt file
// Usage: node scripts/extract-docx-text.mjs <input.docx> <output.txt>

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const [, , input, output] = process.argv;
if (!input || !output) {
  console.error("Usage: node extract-docx-text.mjs <input.docx> <output.txt>");
  process.exit(1);
}

// Minimal XML parser: just match <w:t...>TEXT</w:t> in order, then join with newlines per paragraph
const zipBuf = readFileSync(resolve(input));

// Use a quick path: read as zip and pull word/document.xml via a tiny inflate
// Easiest: use Node's built-in zlib + manually walk the central directory.
// But for simplicity, require `adm-zip` would be needed. Let's shell out to PowerShell on Windows.

// Alternative: use the in-built `unzip` command and then read the XML.
import { execSync } from "node:child_process";
import { mkdtempSync, rmSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const tmp = mkdtempSync(join(tmpdir(), "docx-"));
try {
  execSync(`unzip -o "${resolve(input)}" -d "${tmp}"`, { stdio: "ignore" });
  const docXml = readFileSync(join(tmp, "word", "document.xml"), "utf8");

  // Replace paragraph endings with newlines, then strip tags
  const withBreaks = docXml
    .replace(/<\/w:p>/g, "\n")
    .replace(/<w:tab\s*\/>/g, "\t")
    .replace(/<w:br\s*\/>/g, "\n");

  const text = withBreaks
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  writeFileSync(resolve(output), text, "utf8");
  console.log(`Wrote ${text.length} chars to ${output}`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
