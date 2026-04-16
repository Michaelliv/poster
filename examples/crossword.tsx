
import React from "react";

const GRID = [
  "....#.....#....",
  "....#.....#....",
  "....#.....#....",
  "............###",
  "###............",
  ".....#....#....",
  "....#....#.....",
  "......###......",
  ".....#....#....",
  "....#....#.....",
  "............###",
  "###............",
  "....#.....#....",
  "....#.....#....",
  "....#.....#....",
];

const N = 15;
const isBlack = (r: number, c: number) =>
  r < 0 || c < 0 || r >= N || c >= N || GRID[r][c] === "#";

// compute numbering
const numbers: (number | null)[][] = Array.from({ length: N }, () =>
  Array(N).fill(null)
);
let counter = 1;
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    if (isBlack(r, c)) continue;
    const startsAcross = isBlack(r, c - 1) && !isBlack(r, c + 1);
    const startsDown = isBlack(r - 1, c) && !isBlack(r + 1, c);
    if (startsAcross || startsDown) {
      numbers[r][c] = counter++;
    }
  }
}

// Build clue labels based on numbering
const acrossNums: number[] = [];
const downNums: number[] = [];
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    const n = numbers[r][c];
    if (n == null) continue;
    if (isBlack(r, c - 1) && !isBlack(r, c + 1)) acrossNums.push(n);
    if (isBlack(r - 1, c) && !isBlack(r + 1, c)) downNums.push(n);
  }
}

const acrossCluePool = [
  "Evasive reply",
  "Kind of code or column",
  "Pompeii's cover story",
  "Whet, as an appetite",
  "Org. behind Curiosity",
  "Prefix with dynamic",
  "Staple of Provençal cuisine",
  "Former Venetian magistrate",
  "Opposite of ecto-",
  "Like two-dollar bills",
  "It may be cast or split",
  "Mountain goat's perch",
  "Salon sound",
  "Vintage autos",
  "Half a score",
  "Bit of campaign ammo",
  "Diner sandwich, for short",
  "Singer DiFranco",
  "Apt anagram of 'stew'",
  "Stretch at the bar?",
  "Swiss canton on a lake",
  "Dodge, as a question",
  "Get one's ducks in ___",
  "Balletic bend",
  "Composer Satie",
  "Pay attention to, in a way",
  "Old Peruvian",
  "Cry of distress",
  "Stadium tier",
  "Caldera contents",
  "Fig. on a pay stub",
  "Kind of beam in a lab",
  "Airport pickup",
  "Neighbor of Yemen",
  "Source of pressure?",
  "Sound at a spa",
  "Piece of pie, maybe",
  "Two, in Toledo",
  "Toast topping",
  "Carry the day",
  "'Let me think ...'",
  "Figure skater's jump",
  "Brief bio",
  "Honshu honorific",
];

const downCluePool = [
  "Longtime 'Today' anchor",
  "Hardly a novice",
  "Goes up against",
  "Yarn unit",
  "Tiny criticism",
  "Sound from a loft",
  "Slalom path",
  "Bit of intrigue",
  "Like some winds",
  "Stage hog",
  "Mouse-spotter's cry",
  "Certain flat cap",
  "Tender spot",
  "A deadly sin",
  "'Whatever works!'",
  "Kind of sauce at a sushi bar",
  "Apportion, with 'out'",
  "Gentle push",
  "Rink surface",
  "Lagoon surrounder",
  "Cabinet dept. since 1977",
  "Beehive State native",
  "Bridge seat",
  "Trembling tree",
  "Bit of wordplay",
  "Colorful eye part",
  "Nautical heading",
  "Deep-dish offering",
  "Fencing blade",
  "Ages and ages",
  "Verdi heroine",
  "Hold dear",
  "Rio runner",
  "Broadway's ___ Rivera",
  "Cushioned seat",
  "Dole (out)",
  "Parisian pronoun",
  "Glossy fabric",
  "Figure in red",
  "Chess ending",
  "Vex persistently",
  "Cause for a blessing",
  "Ultimate degree",
  "Clarinet kin",
];

const acrossClues = acrossNums.map((n, i) => ({
  n,
  clue: acrossCluePool[i % acrossCluePool.length],
}));
const downClues = downNums.map((n, i) => ({
  n,
  clue: downCluePool[i % downCluePool.length],
}));

const CELL = 44;

function Cell({ r, c }: { r: number; c: number }) {
  const black = isBlack(r, c);
  const num = numbers[r][c];
  return (
    <div
      style={{
        position: "absolute",
        left: c * CELL,
        top: r * CELL,
        width: CELL,
        height: CELL,
        background: black ? "#111" : "#fff",
        borderRight: c === N - 1 ? "none" : "1px solid #111",
        borderBottom: r === N - 1 ? "none" : "1px solid #111",
        boxSizing: "border-box",
      }}
    >
      {num != null && !black && (
        <span
          style={{
            position: "absolute",
            top: 2,
            left: 3,
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            fontWeight: 600,
            color: "#111",
            lineHeight: 1,
          }}
        >
          {num}
        </span>
      )}
    </div>
  );
}

export default function Poster() {
  const gridPx = N * CELL;
  return (
    <div
      className="w-[1400px] p-16"
      style={{
        background: "#f5f2ea",
        fontFamily: "'Source Serif 4', Georgia, serif",
        color: "#111",
      }}
    >
      {/* masthead */}
      <div
        style={{
          textAlign: "center",
          borderBottom: "2px solid #111",
          paddingBottom: 16,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontStyle: "italic",
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          The Crossword
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginTop: 6,
            color: "#333",
          }}
        >
          Saturday, 18 April 2026 · by Alex Vogel
        </div>
      </div>

      {/* grid */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
        <div
          style={{
            position: "relative",
            width: gridPx,
            height: gridPx,
            border: "3px solid #111",
            background: "#fff",
          }}
        >
          {Array.from({ length: N }).map((_, r) =>
            Array.from({ length: N }).map((_, c) => (
              <Cell key={`${r}-${c}`} r={r} c={c} />
            ))
          )}
        </div>
      </div>

      {/* clues */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        {[
          { title: "ACROSS", items: acrossClues },
          { title: "DOWN", items: downClues },
        ].map((col) => (
          <div key={col.title}>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: "0.25em",
                borderBottom: "1.5px solid #111",
                paddingBottom: 6,
                marginBottom: 12,
              }}
            >
              {col.title}
            </div>
            <div
              style={{
                columnCount: 2,
                columnGap: 28,
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              {col.items.map((x) => (
                <div
                  key={x.n}
                  style={{
                    breakInside: "avoid",
                    marginBottom: 4,
                    display: "flex",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      minWidth: 22,
                      textAlign: "right",
                    }}
                  >
                    {x.n}
                  </span>
                  <span>{x.clue}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 32,
          borderTop: "1px solid #111",
          paddingTop: 10,
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          display: "flex",
          justifyContent: "space-between",
          color: "#444",
        }}
      >
        <span>No. 1,204</span>
        <span>Edited by Will Shortz</span>
        <span>15 × 15</span>
      </div>
    </div>
  );
}
