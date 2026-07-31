import { execSync } from "node:child_process";
import { PDFDocument } from "pdf-lib";
import { readFileSync, writeFileSync } from "node:fs";

const books = [
  ["../../CAD dig prod/DIG PROD/01-one-hour-apartment-reset/Product Content.md", "cad", "The 1-Hour Apartment Reset.pdf", "../../CAD dig prod/Fourthwall/covers/01-one-hour-apartment-reset.png"],
  ["../../CAD dig prod/DIG PROD/02-no-damage-renters-toolkit/Product Content.md", "cad", "The No-Damage Renter's Toolkit.pdf", "../../CAD dig prod/Fourthwall/covers/02-no-damage-renters-toolkit.png"],
  ["../../CAD dig prod/DIG PROD/03-move-in-week-survival-kit/Product Content.md", "cad", "The Move-In Week Survival Kit.pdf", "../../CAD dig prod/Fourthwall/covers/03-move-in-week-survival-kit.png"],
  ["../../CAD dig prod/DIG PROD/04-small-kitchen-storage-fix/Product Content.md", "cad", "The Small Kitchen Storage Fix.pdf", "../../CAD dig prod/Fourthwall/covers/04-small-kitchen-storage-fix.png"],
  ["../../CAD dig prod/DIG PROD/05-closet-wardrobe-reset/Product Content.md", "cad", "The Closet & Wardrobe Reset.pdf", "../../CAD dig prod/Fourthwall/covers/05-closet-wardrobe-reset.png"],
  ["../../UK dig prod/DIG PROD/01-living-room-makeover-plan/Product Content.md", "uk", "The Rented Flat Living Room Makeover Plan.pdf", "../../UK dig prod/DIG PROD/Fourthwall/covers/01-living-room-makeover-plan.png"],
  ["../../UK dig prod/DIG PROD/04-small-kitchen-budget-refresh/Product Content.md", "uk", "The Small Kitchen Budget Refresh.pdf", "../../UK dig prod/DIG PROD/Fourthwall/covers/04-small-kitchen-budget-refresh.png"],
  ["../../UK dig prod/DIG PROD/05-cosy-bedroom-reset/Product Content.md", "uk", "The Cosy Bedroom Reset.pdf", "../../UK dig prod/DIG PROD/Fourthwall/covers/05-cosy-bedroom-reset.png"],
  ["../../UK dig prod/DIG PROD/06-no-damage-renters-toolkit/Product Content.md", "uk", "The No-Damage Renter's Styling Toolkit.pdf", "../../UK dig prod/DIG PROD/Fourthwall/covers/06-no-damage-renters-toolkit.png"],
  ["../../UK dig prod/DIG PROD/07-seasonal-home-refresh-playbook/Product Content.md", "uk", "The Seasonal Home Refresh Playbook.pdf", "../../UK dig prod/DIG PROD/Fourthwall/covers/07-seasonal-home-refresh-playbook.png"],
];

const results = [];

for (const [src, brand, outName, cover] of books) {
  const outPath = `./output/${outName}`;
  execSync(`node build.mjs "${src}" ${brand} "${outPath}" "${cover}"`, { stdio: "inherit" });
  const bytes = readFileSync(outPath);
  const doc = await PDFDocument.load(bytes);
  results.push({ book: outName, pages: doc.getPageCount(), sourcePath: src });
}

console.log("\n=== PAGE COUNT SUMMARY ===");
for (const r of results) {
  console.log(`${r.pages} pages -- ${r.book}`);
}

writeFileSync("./page-counts.json", JSON.stringify(results, null, 2));
