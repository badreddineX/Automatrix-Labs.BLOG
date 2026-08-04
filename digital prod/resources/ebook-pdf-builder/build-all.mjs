import { execSync } from "node:child_process";
import { PDFDocument } from "pdf-lib";
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

// Optional explicit slug -> filename map for GUID-named covers (e.g. Fourthwall exports).
// Fill in covers-map.json; the builder never guesses — missing entries build without a cover.
let coversMap = { cad: {}, uk: {} };
try {
  coversMap = JSON.parse(readFileSync("./covers-map.json", "utf8"));
} catch {
  // no map file — rely on slug matching only
}
const brandCoversMap = {
  cad: coversMap.cad || {},
  uk: coversMap.uk || {},
};

// Each book: [source markdown, brand, output pdf name, expected cover slug]
const books = [
  ["../../CAD dig prod/DIG PROD/01-one-hour-apartment-reset/Product Content.md", "cad", "The 1-Hour Apartment Reset.pdf", "01-one-hour-apartment-reset"],
  ["../../CAD dig prod/DIG PROD/02-no-damage-renters-toolkit/Product Content.md", "cad", "The No-Damage Renter's Toolkit.pdf", "02-no-damage-renters-toolkit"],
  ["../../CAD dig prod/DIG PROD/03-move-in-week-survival-kit/Product Content.md", "cad", "The Move-In Week Survival Kit.pdf", "03-move-in-week-survival-kit"],
  ["../../CAD dig prod/DIG PROD/04-small-kitchen-storage-fix/Product Content.md", "cad", "The Small Kitchen Storage Fix.pdf", "04-small-kitchen-storage-fix"],
  ["../../CAD dig prod/DIG PROD/05-closet-wardrobe-reset/Product Content.md", "cad", "The Closet & Wardrobe Reset.pdf", "05-closet-wardrobe-reset"],
  ["../../UK dig prod/DIG PROD/01-living-room-makeover-plan/Product Content.md", "uk", "The Rented Flat Living Room Makeover Plan.pdf", "01-living-room-makeover-plan"],
  ["../../UK dig prod/DIG PROD/04-small-kitchen-budget-refresh/Product Content.md", "uk", "The Small Kitchen Budget Refresh.pdf", "04-small-kitchen-budget-refresh"],
  ["../../UK dig prod/DIG PROD/05-cosy-bedroom-reset/Product Content.md", "uk", "The Cosy Bedroom Reset.pdf", "05-cosy-bedroom-reset"],
  ["../../UK dig prod/DIG PROD/06-no-damage-renters-toolkit/Product Content.md", "uk", "The No-Damage Renter's Styling Toolkit.pdf", "06-no-damage-renters-toolkit"],
  ["../../UK dig prod/DIG PROD/07-seasonal-home-refresh-playbook/Product Content.md", "uk", "The Seasonal Home Refresh Playbook.pdf", "07-seasonal-home-refresh-playbook"],
];

const brandFolders = {
  cad: resolve("../../CAD dig prod/Fourthwall/covers"),
  uk: resolve("../../UK dig prod/DIG PROD/Fourthwall/covers"),
};

// Resolve a cover image for a book.
// 1) explicit mapping from covers-map.json (handles GUID names from Fourthwall)
// 2) exact slug match in the brand covers folder
// 3) any image that starts with the slug (e.g. "01-...-A.png")
// 4) none -> build WITHOUT a cover (never stamp a wrong cover, never crash)
function findCover(brand, slug) {
  const dir = brandFolders[brand];
  if (!existsSync(dir)) return "";
  const files = readdirSync(dir).filter(f => /\.(png|jpe?g|webp)$/i.test(f));
  if (!files.length) return "";

  const mapped = brandCoversMap[brand]?.[slug];
  if (mapped && files.some(f => f.toLowerCase() === mapped.toLowerCase())) {
    return resolve(dir, files.find(f => f.toLowerCase() === mapped.toLowerCase()));
  }

  const exact = files.find(f => f.toLowerCase() === `${slug}.png`.toLowerCase());
  if (exact) return resolve(dir, exact);

  const startsWith = files.find(f => f.toLowerCase().startsWith(slug.toLowerCase()));
  if (startsWith) return resolve(dir, startsWith);

  // Ambiguous — multiple potential covers and no mapping: skip the cover rather than guess.
  return "";
}

const results = [];

for (const [src, brand, outName, slug] of books) {
  const outPath = `./output/${outName}`;
  const cover = findCover(brand, slug);
  const cmd = cover
    ? `node build.mjs "${src}" ${brand} "${outPath}" "${cover}"`
    : `node build.mjs "${src}" ${brand} "${outPath}"`;
  console.log(`\n>>> ${outName}${cover ? ` (cover: ${cover.split(/[\\/]/).pop()})` : " (no cover found — building without)"}`);
  execSync(cmd, { stdio: "inherit" });
  const bytes = readFileSync(outPath);
  const doc = await PDFDocument.load(bytes);
  results.push({ book: outName, pages: doc.getPageCount(), sourcePath: src, cover: cover.split(/[\\/]/).pop() || "" });
}

console.log("\n=== PAGE COUNT SUMMARY ===");
for (const r of results) {
  console.log(`${r.pages} pages -- ${r.book}${r.cover ? `  [cover: ${r.cover}]` : "  [NO COVER]"}`);
}

writeFileSync("./page-counts.json", JSON.stringify(results, null, 2));
