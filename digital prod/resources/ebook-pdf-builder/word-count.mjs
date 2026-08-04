import { readFileSync } from "node:fs";

const base = "c:\\Users\\bader\\OneDrive\\Desktop\\SPACE WORK\\digital prod\\";

const books = [
  "CAD dig prod/DIG PROD/01-one-hour-apartment-reset",
  "CAD dig prod/DIG PROD/02-no-damage-renters-toolkit",
  "CAD dig prod/DIG PROD/03-move-in-week-survival-kit",
  "CAD dig prod/DIG PROD/04-small-kitchen-storage-fix",
  "CAD dig prod/DIG PROD/05-closet-wardrobe-reset",
  "UK dig prod/DIG PROD/01-living-room-makeover-plan",
  "UK dig prod/DIG PROD/04-small-kitchen-budget-refresh",
  "UK dig prod/DIG PROD/05-cosy-bedroom-reset",
  "UK dig prod/DIG PROD/06-no-damage-renters-toolkit",
  "UK dig prod/DIG PROD/07-seasonal-home-refresh-playbook",
];

for (const dir of books) {
  const filePath = base + dir + "/Product Content.md";
  const content = readFileSync(filePath, "utf8").replace(/\r/g, "");
  const lines = content.split("\n");

  // Find all chapter/day headings and their word counts
  const sections = [];
  let currentSection = null;
  let currentLines = [];

  for (const line of lines) {
    const headingMatch = line.match(/^## (Chapter \d+:.*)$/);
    const dayMatch = line.match(/^## (Day \d+[\s\S]*?):/);
    if (headingMatch || dayMatch) {
      if (currentSection) {
        // Count words in accumulated content
        const body = currentLines
          .filter(l => !l.match(/^\*\*Mini-summary:\*\*/)) // exclude mini-summary
          .join(" ")
          .replace(/\*\*|__|[*_#>]/g, "")
          .trim();
        const wordCount = body ? body.split(/\s+/).filter(Boolean).length : 0;
        currentSection.words = wordCount;
        sections.push(currentSection);
      }
      currentSection = { title: line.replace(/^## /, ""), words: 0 };
      currentLines = [];
    } else if (currentSection) {
      currentLines.push(line);
    }
  }
  // Last section
  if (currentSection) {
    const body = currentLines
      .filter(l => !l.match(/^\*\*Mini-summary:\*\*/))
      .join(" ")
      .replace(/\*\*|__|[*_#>]/g, "")
      .trim();
    const wordCount = body ? body.split(/\s+/).filter(Boolean).length : 0;
    currentSection.words = wordCount;
    sections.push(currentSection);
  }

  console.log("\n=== " + dir.split("/").pop() + " ===");
  let totalWords = 0;
  for (const s of sections) {
    console.log("  " + s.title + ": " + s.words + " words");
    totalWords += s.words;
  }
  console.log("  TOTAL: " + sections.length + " chapters, " + totalWords + " words");
}