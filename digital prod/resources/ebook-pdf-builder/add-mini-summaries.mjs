import { readFileSync, writeFileSync } from "node:fs";

const base = "c:\\Users\\bader\\OneDrive\\Desktop\\SPACE WORK\\digital prod\\";

const books = [
  {
    dir: "CAD dig prod/DIG PROD/01-one-hour-apartment-reset",
    summaries: {
      "Chapter 1: The 1-Hour Reset Method": "Four 15-minute zone sprints, one carry-bin, and a timer. No prep, no shopping — just the method.",
      "Chapter 2: The Entryway Reset": "Clear the entryway largest-item-first in 15 minutes, then pick one permanent fix that targets your actual bottleneck.",
      "Chapter 3: The Kitchen Counter & Table Reset": "Clear counters, hide non-daily appliances, and build the 2-minute nightly habit — the kitchen stays reset without daily perfection.",
      "Chapter 4: The Living Room Reset": "Surface clear, cushions fluffed, remotes corralled, one focal point styled. Two moves make it guest-ready even if the sprint didn't happen.",
      "Chapter 5: The Bathroom Reset": "Bin everything off the counter, consolidate shower products, wipe the mirror. One tension-rod or adhesive-basket fix solves the space problem permanently.",
      "Chapter 6: What NOT to Buy": "Do the reset first, then buy only what solves a specific recurring gap. No bin systems, no multi-pack organizers, no decorative baskets.",
    },
  },
  {
    dir: "CAD dig prod/DIG PROD/02-no-damage-renters-toolkit",
    summaries: {
      "Chapter 1: The Renter's Mounting Arsenal": "Halve the advertised weight, clean with rubbing alcohol, and use interlocking strips for frames. Ratchet-lock rods for heavy curtains.",
      "Chapter 2: Hanging Art and Frames": "Interlocking picture strips for frames under 10 lbs. For anything heavier, accept small nail holes — spackle fixes them in minutes.",
      "Chapter 3: Curtains and Window Treatments": "Tension rods inside the frame for light curtains. Heavy curtains need two small drilled holes — easier to patch than most renters think.",
      "Chapter 4: Kitchen and Bathroom Mounting": "Waterproof strips only in bathrooms. Suction cups for tile. Tension rod + adhesive basket solves under-sink storage.",
    },
  },
  {
    dir: "CAD dig prod/DIG PROD/03-move-in-week-survival-kit",
    summaries: {
      "Day 1: Move-In Essentials": "Photograph everything before moving in, check for leaks, and buy the essentials before the truck arrives. First hour sets the tone.",
      "Days 2–3: Unpacking & Settling": "Unpack by zone: bedroom first, then bathroom, then kitchen essentials. Everything else waits. Update your address with Canada Post, health card, and CRA.",
      "Days 4–7: Utilities, Internet, & Admin": "Set up hydro before move-in, schedule internet for day 3-4, get tenant insurance, and introduce yourself to your landlord.",
    },
  },
  {
    dir: "CAD dig prod/DIG PROD/04-small-kitchen-storage-fix",
    summaries: {
      "Chapter 1: The Cabinet Above the Fridge": "Store lightweight, infrequent-use items only. A wire shelf riser doubles the vertical space for under $15.",
      "Chapter 2: Under-Sink Storage": "A tension rod hanging spray bottles and an adhesive basket on the cabinet door use the space around the pipe. Skip the multi-shelf organizers.",
      "Chapter 3: Drawer Organization": "Adjustable bamboo dividers with a three-zone system (daily/weekly/occasional). No pre-cut foam organizers — they never match your actual utensils.",
      "Chapter 4: Pantry and Cabinet Stacking": "Shelf risers for cans, a lazy Susan for deep cabinets, and group food by type. You can't organize what you can't see.",
      "Chapter 5: Counter Space": "Only weekly-use appliances stay out. One landing-zone tray contains the mail and keys. A magnetic knife strip frees drawer space.",
    },
  },
  {
    dir: "CAD dig prod/DIG PROD/05-closet-wardrobe-reset",
    summaries: {
      "Chapter 1: The Full Empty": "Take everything out of the closet and sort into four piles: keep, donate, trash, relocate. The bed-as-sorting-surface forces you to finish before sleep.",
      "Chapter 2: The Sorting System": "Daily wear at eye level, occasional above or below, seasonal in storage. Matching slim velvet hangers cut visual clutter by half.",
      "Chapter 3: Vertical Stacking": "Hang by category then sleeve length. Use the height below the rod for folded items and above the top shelf for off-season bins.",
      "Chapter 4: Shoe & Accessory Storage": "Shoe rack for under 10 pairs, over-the-door organizer for 10-20. Adhesive hooks on the inside wall for belts, scarves, and bags.",
    },
  },
  {
    dir: "UK dig prod/DIG PROD/01-living-room-makeover-plan",
    summaries: {
      "Chapter 1: The Layout First": "Float the sofa 20-30 cm from the wall, create a conversation triangle, and work around radiators and asymmetrical fireplaces. Layout trumps decor.",
      "Chapter 2: Lighting": "Three-layer system: floor lamp, table lamp, accent lamp. Never turn on the ceiling light again — it's the worst possible lighting.",
      "Chapter 3: Textiles & Colour": "Work with magnolia walls, don't fight them. One rug, two cushion types, one throw, one set of floor-length curtains is the formula.",
      "Chapter 4: Wall Decor Without Holes": "Adhesive strips for frames under 5 kg, leaning art for larger pieces, a mirror opposite the window. Everything comes down without a trace.",
    },
  },
  {
    dir: "UK dig prod/DIG PROD/04-small-kitchen-budget-refresh",
    summaries: {
      "Chapter 1: The £100 Budget Breakdown": "Everything you need for under £100 from UK high-street retailers. Work in order of biggest visual impact first.",
      "Chapter 2: Countertop Wrap": "Contact paper transforms dated laminate for £20. Take your time, use a credit card to smooth bubbles, and the result looks like a new countertop.",
      "Chapter 3: Cabinet Refresh": "New adhesive pulls or knobs — no drilling required. The cheapest single upgrade that makes cabinets look intentionally chosen.",
      "Chapter 4: Lighting": "Under-cabinet LED strip lights for £15. Clean, peel, stick, done. This single change has the highest visual return of anything in the budget.",
      "Chapter 5: The Finishing Touches": "A plant, new shelf liner, and coordinated tea towels pull everything together for under £20. The whole refresh reverses in an hour when you move out.",
    },
  },
  {
    dir: "UK dig prod/DIG PROD/05-cosy-bedroom-reset",
    summaries: {
      "Chapter 1: Bedding — The Single Biggest Change": "A duvet cover set in a colour that contrasts with magnolia makes the bed the focal point. The number of pillows determines visual balance.",
      "Chapter 2: Lighting — Kill the Ceiling Light": "Two bedside lamps, one floor lamp, one accent light. Warm bulbs at 2700K max. The ceiling light never goes on after dark.",
      "Chapter 3: Curtains": "Floor-length curtains just touching the floor. Blackout lining if you face streetlights or work shifts. Tension rod or adhesive brackets — both renter-safe.",
      "Chapter 4: Furniture Layout": "Bed facing the door if possible, opposite the window if not. 60 cm clearance on each side of the bed. A smaller bed in a well-proportioned room feels better.",
      "Chapter 5: Wall Decor Without Holes": "Adhesive strips for frames under 5 kg, leaning art for larger pieces, mirror opposite the window. Everything removes without a trace.",
    },
  },
  {
    dir: "UK dig prod/DIG PROD/06-no-damage-renters-toolkit",
    summaries: {
      "Chapter 1: Adhesive Strips — What Actually Works": "Interlocking strips only, clean with rubbing alcohol, wait one hour cure time. Halve the advertised weight limit for textured walls.",
      "Chapter 2: Tension Rods": "Ratchet-lock rods with wide end-caps for curtains and room dividers. Spring rods for under-sink spray bottle storage. Wipe end-caps if they slip.",
      "Chapter 3: Suction Cups": "For tile and glass only — never on textured or painted surfaces. Wet the cup, push out all air, wait 30 minutes before loading.",
      "Chapter 4: Leaning and Propping": "Items must be at least 60 cm tall for leaning to look intentional. Gallery ledge shelves and tension wire systems for swap-able prints.",
      "Chapter 5: When to Accept Small Holes": "For anything over 5 kg, drill and patch later. A tube of polyfilla fixes a dozen holes in under an hour — cheaper than losing your deposit.",
    },
  },
  {
    dir: "UK dig prod/DIG PROD/07-seasonal-home-refresh-playbook",
    summaries: {
      "Chapter 1: Spring (March–April)": "Swap heavy bedding for cotton, lighten cushion colours, clean windows, swap candle scents. One afternoon removes winter's weight.",
      "Chapter 2: Summer (June–August)": "Minimal textiles, sheer curtains, string lights, and a declutter pass. Summer is the season of least time indoors — use it.",
      "Chapter 3: Autumn (September–October)": "Bring back throws and heavier bedding, add one dark accent colour, increase warm-toned lighting. Cosy up before the clocks change.",
      "Chapter 4: Winter (November–February)": "Maximum throws, flannel sheets, every lamp on every evening, candles by the bed. A basket by the door keeps winter essentials from scattering.",
    },
  },
];

for (const book of books) {
  const filePath = base + book.dir + "/Product Content.md";
  let content = readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const newLines = [];
  let currentChapter = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const chMatch = line.match(/^## (Chapter \d+:\s*.+)$/);
    if (chMatch) {
      currentChapter = chMatch[1].trim();
      newLines.push(line);
    } else if (line.match(/^---$/)) {
      if (currentChapter && book.summaries[currentChapter]) {
        newLines.push("");
        newLines.push("**Mini-summary:** " + book.summaries[currentChapter]);
        newLines.push("");
        currentChapter = null;
      }
      newLines.push(line);
    } else {
      newLines.push(line);
    }
  }
  // Handle last chapter if no --- after it
  if (currentChapter && book.summaries[currentChapter]) {
    newLines.push("");
    newLines.push("**Mini-summary:** " + book.summaries[currentChapter]);
  }

  writeFileSync(filePath, newLines.join("\n"));
  console.log("Updated: " + book.dir.split("/").pop());
}