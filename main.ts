import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here: string = dirname(fileURLToPath(import.meta.url));
const inputPath: string = join(here, "entry.txt");
const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputPath: string = join(outputDir, "entry.txt");

const entryBytes: Buffer = readFileSync(inputPath);
const entryText: string = entryBytes.toString("utf8");

if (entryText.trim().length === 0) {
  console.error("Error: entry.txt must be non-empty.");
  process.exit(1);
}

if (/[\r\n]/.test(entryText)) {
  console.error("Error: entry.txt must be a single line.");
  process.exit(1);
}

const charCount: number = Array.from(entryText).length;
if (charCount > 200) {
  console.error(`Error: entry.txt exceeds 200 characters (got ${charCount}).`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, entryBytes);
