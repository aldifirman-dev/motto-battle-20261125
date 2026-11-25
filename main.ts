import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here: string = dirname(fileURLToPath(import.meta.url));
const inputPath: string = join(here, "entry.txt");
const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputPath: string = join(outputDir, "entry.txt");

const entryBytes: Buffer = readFileSync(inputPath);
mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, entryBytes);
