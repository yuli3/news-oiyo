import { readFile, mkdir, writeFile } from "node:fs/promises";

// Pages' managed Wrangler 3 rejects JSON import attributes even though local Node/Astro accept them.
// Generate a plain ESM module before every build; news.json remains the only editorial source (2026-10-15).
const news = JSON.parse(await readFile(new URL("../src/data/news.json", import.meta.url), "utf8"));
const directory = new URL("../.cache/", import.meta.url);
await mkdir(directory, { recursive: true });
await writeFile(new URL("mailing-list-news.mjs", directory), `export default ${JSON.stringify(news)};\n`);
