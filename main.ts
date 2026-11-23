// The Dumbest Thing Your Agent Did Today — make.fun bounty entry.
// Reads the single line from entry.txt (next to this script) and writes
// it as UTF-8 text to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// No network, no dependencies, no relative paths: every path is resolved
// from this script's own directory.
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(scriptDir, "entry.txt");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputPath = join(outputDir, "entry.txt");

const line = readFileSync(sourcePath, "utf8").trim();

if (line.length < 1 || line.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${line.length}`);
}
if (/[\r\n]/.test(line)) {
  throw new Error("entry must be exactly one line (no embedded newlines)");
}
if (!/\S/.test(line)) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, line, "utf8");
console.log(`Wrote ${line.length} chars to ${outputPath}`);
