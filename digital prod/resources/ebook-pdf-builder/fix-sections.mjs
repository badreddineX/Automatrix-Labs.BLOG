import { readFileSync, writeFileSync } from "node:fs";

const base = "c:\\Users\\bader\\OneDrive\\Desktop\\SPACE WORK\\digital prod\\";

const books = [
  {
    dir: "CAD dig prod/DIG PROD/01-one-hour-apartment-reset",
    conclusion: `## Conclusion

The 1-Hour Reset works because it doesn't ask you to reorganize your entire apartment. It asks for four 15-minute sprints — small enough to start, structured enough to finish. The same method that got you through one reset will get you through the next one, and the one after that.

Ready to actually do this? Turn the page for the printable checklist.`,
    aboutAuthor: true,
    hasTracker: true,
  },
  {
    dir: "CAD dig prod/DIG PROD/02-no-damage-renters-toolkit",
    conclusion: `## Conclusion

The whole point of renter-friendly mounting is leaving exactly what you found when you moved in. Every method in this guide — adhesive strips, tension rods, suction cups, leaning — has a specific use case and a specific weight limit. Match the method to the job, and you'll never lose a deposit over a picture frame.

Ready to actually do this? Turn the page for the printable checklist.`,
    aboutAuthor: true,
    hasTracker: false,
  },
  {
    dir: "CAD dig prod/DIG PROD/03-move-in-week-survival-kit",
    conclusion: `## Conclusion

The first week of a new rental is the most chaotic — and the most important. A day-by-day plan removes the decision fatigue so you can focus on what matters: getting settled, not wondering what to do next. Follow the sequence, take the photos, and give yourself permission to leave boxes unpacked beyond the essentials.

Ready to actually do this? Turn the page for the printable checklist.`,
    aboutAuthor: true,
    hasTracker: false,
  },
  {
    dir: "CAD dig prod/DIG PROD/04-small-kitchen-storage-fix",
    conclusion: `## Conclusion

Small kitchens don't need more organizers — they need better use of the space they already have. Pick one zone from this guide, spend 30 minutes on it, and stop when it works. A kitchen that's 80% functional is better than one you keep putting off because the project feels too big.

Ready to actually do this? Turn the page for the printable checklist.`,
    aboutAuthor: true,
    hasTracker: false,
  },
  {
    dir: "CAD dig prod/DIG PROD/05-closet-wardrobe-reset",
    conclusion: `## Conclusion

A full closet reset takes one afternoon. Once it's done, the weekly 10-minute reset keeps it that way. The goal isn't a magazine-perfect closet — it's a closet where you can find what you need in under 30 seconds and get dressed without frustration.

Ready to actually do this? Turn the page for the printable checklist.`,
    aboutAuthor: true,
    hasTracker: false,
  },
  {
    dir: "UK dig prod/DIG PROD/01-living-room-makeover-plan",
    conclusion: `## Conclusion

The weekend transformation works because it focuses on what you can change — layout, lighting, textiles, and renter-safe wall decor — and ignores what you can't. By Sunday evening you'll have a living room that feels intentionally designed, not merely tolerated.

Ready to actually do this? Turn the page for the printable checklist.`,
    aboutAuthor: true,
    hasTracker: false,
  },
  {
    dir: "UK dig prod/DIG PROD/04-small-kitchen-budget-refresh",
    conclusion: `## Conclusion

A £100 budget and one weekend is all it takes to make a rental kitchen look intentionally designed — not renovated, but refreshed. The contact paper, the adhesive pulls, the LED strip — every change is reversible in an hour when you move out.

Ready to actually do this? Turn the page for the printable checklist.`,
    aboutAuthor: true,
    hasTracker: false,
  },
  {
    dir: "UK dig prod/DIG PROD/05-cosy-bedroom-reset",
    conclusion: `## Conclusion

A cosy bedroom isn't about expensive furniture or permanent renovations. It's about bedding, lighting, curtains, and layout — every one of which you can change in an afternoon without drilling a single hole. Your bedroom should be the most relaxing room in your flat, and now it can be.

Ready to actually do this? Turn the page for the printable checklist.`,
    aboutAuthor: true,
    hasTracker: false,
  },
  {
    dir: "UK dig prod/DIG PROD/06-no-damage-renters-toolkit",
    conclusion: `## Conclusion

Every item in this guide can be installed in minutes and removed in seconds — or fixed with a tube of polyfilla before you move out. The key is matching the method to the job: adhesive for lightweight decor on smooth walls, tension rods for curtains, suction cups for tile, and small drilled holes for anything over 5 kg.

Ready to actually do this? Turn the page for the printable checklist.`,
    aboutAuthor: true,
    hasTracker: false,
  },
  {
    dir: "UK dig prod/DIG PROD/07-seasonal-home-refresh-playbook",
    conclusion: `## Conclusion

A seasonal refresh takes one afternoon and costs nothing if you already own the items. Swap textiles, adjust lighting, rotate decor — that's it. After the first year, you're just rotating what you already have, and your flat feels intentionally seasonal without any permanent changes.

Ready to actually do this? Turn the page for the printable checklist.`,
    aboutAuthor: true,
    hasTracker: false,
  },
];

for (const book of books) {
  const filePath = base + book.dir + "/Product Content.md";
  let content = readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  // === STEP 1: Replace Conclusion section ===
  const conclusionStartIdx = lines.findIndex(l => /^## Conclusion/.test(l));
  if (conclusionStartIdx !== -1) {
    // Find the next ## heading after Conclusion, or end of file
    let conclusionEndIdx = -1;
    for (let i = conclusionStartIdx + 1; i < lines.length; i++) {
      if (/^## /.test(lines[i]) && !/^## Conclusion/.test(lines[i])) {
        conclusionEndIdx = i;
        break;
      }
    }
    if (conclusionEndIdx === -1) conclusionEndIdx = lines.length;

    // Remove the old conclusion lines
    lines.splice(conclusionStartIdx, conclusionEndIdx - conclusionStartIdx);

    // Insert new conclusion at the same position
    const newConclusion = book.conclusion.split("\n");
    lines.splice(conclusionStartIdx, 0, ...newConclusion);
  }

  // === STEP 2: Remove "About the Author" section ===
  if (book.aboutAuthor) {
    const authorStartIdx = lines.findIndex(l => /^## About the Author/.test(l));
    if (authorStartIdx !== -1) {
      let authorEndIdx = -1;
      for (let i = authorStartIdx + 1; i < lines.length; i++) {
        if (/^## /.test(lines[i])) {
          authorEndIdx = i;
          break;
        }
      }
      if (authorEndIdx === -1) authorEndIdx = lines.length;
      lines.splice(authorStartIdx, authorEndIdx - authorStartIdx);
    }
  }

  writeFileSync(filePath, lines.join("\n"));
  console.log("Fixed: " + book.dir.split("/").pop());
}