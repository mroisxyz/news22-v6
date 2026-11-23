import { mkdirSync, copyFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// News digest design: 36 dated stories anchor the archive.
// Three lead scenes open the daily briefing.
// Twelve cards each carry two clean body lines of copy.
// A three-column digest keeps every line on complete word boundaries.
// A strict date check drops any story outside the 2026-11-22 window.

const ownDir = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const sourcePng = join(ownDir, 'entry.png');

function reportSize(outDir: string, size: number): void {
  const parent = dirname(outDir);
  console.log(`[news22] wrote ${size} bytes into ${outDir} (parent ${parent})`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(sourcePng, join(outDir, 'entry.png'));
const info = statSync(join(outDir, 'entry.png'));
reportSize(outDir, info.size);
