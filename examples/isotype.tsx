import React from "react";

const CREAM = "#f1e7d0";
const RUST = "#b8432a";
const INK = "#1a1410";

// Each bean = 1 million 60kg bags
const data = [
  { country: "Brazil", bags: 69 },
  { country: "Vietnam", bags: 29 },
  { country: "Colombia", bags: 13 },
  { country: "Indonesia", bags: 11 },
  { country: "Ethiopia", bags: 8 },
  { country: "Honduras", bags: 6 },
  { country: "India", bags: 6 },
  { country: "Uganda", bags: 6 },
  { country: "Mexico", bags: 4 },
  { country: "Peru", bags: 4 },
];

// Flat ISOTYPE-style coffee bean pictogram
function Bean({ size = 28, color = INK }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ display: "block" }}>
      <ellipse cx="20" cy="20" rx="13" ry="18" fill={color} transform="rotate(-20 20 20)" />
      <path
        d="M 12 8 Q 20 20 28 32"
        stroke={CREAM}
        strokeWidth="2.2"
        fill="none"
        transform="rotate(-20 20 20)"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Small coffee cup pictogram for header
function Cup({ size = 80, color = INK }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block" }}>
      {/* saucer */}
      <ellipse cx="50" cy="86" rx="38" ry="6" fill={color} />
      {/* cup body */}
      <path d="M 18 40 L 22 80 Q 24 86 32 86 L 60 86 Q 68 86 70 80 L 74 40 Z" fill={color} />
      {/* handle */}
      <path
        d="M 74 48 Q 90 50 90 62 Q 90 74 74 72"
        stroke={color}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* steam */}
      <path
        d="M 34 28 Q 30 20 36 14 M 50 28 Q 46 20 52 14 M 66 28 Q 62 20 68 14"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* coffee surface */}
      <ellipse cx="46" cy="40" rx="28" ry="4" fill={CREAM} />
    </svg>
  );
}

function Row({ country, bags }: { country: string; bags: number }) {
  const beans = [];
  for (let i = 0; i < bags; i++) {
    beans.push(
      <div key={i} style={{ marginRight: 4 }}>
        <Bean size={26} color={i % 5 === 4 ? RUST : INK} />
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderBottom: `2px solid ${INK}`,
        padding: "14px 0",
      }}
    >
      <div
        style={{
          width: 180,
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          fontSize: 18,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: INK,
          paddingLeft: 4,
        }}
      >
        {country}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", flex: 1, alignItems: "center" }}>
        {beans}
      </div>
      <div
        style={{
          width: 70,
          textAlign: "right",
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          fontSize: 22,
          color: RUST,
          fontVariantNumeric: "tabular-nums",
          paddingRight: 6,
        }}
      >
        {bags}
      </div>
    </div>
  );
}

export default function Poster() {
  return (
    <div
      className="w-[1400px]"
      style={{
        background: CREAM,
        padding: "64px 72px",
        fontFamily: "Inter, sans-serif",
        color: INK,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 32, borderBottom: `6px solid ${INK}`, paddingBottom: 28 }}>
        <Cup size={120} color={RUST} />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.32em",
              color: RUST,
              marginBottom: 10,
            }}
          >
            Gesellschaft und Wirtschaft · Tafel No. XIV
          </div>
          <div
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 64,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
            }}
          >
            The World's Coffee
          </div>
          <div
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontStyle: "italic",
              fontSize: 26,
              marginTop: 8,
              color: INK,
            }}
          >
            Production by country — the ten leading growers
          </div>
        </div>
      </div>

      {/* Key */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          padding: "22px 0 10px",
          borderBottom: `2px solid ${INK}`,
          marginBottom: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Bean size={26} color={INK} />
          <span style={{ fontSize: 15, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em" }}>
            each bean = 1 million bags (60 kg)
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Bean size={26} color={RUST} />
          <span style={{ fontSize: 15, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em" }}>
            every fifth bean marks 5 million
          </span>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: RUST }}>
          Crop Year 1935–36
        </div>
      </div>

      {/* Rows */}
      <div>
        {data.map((d) => (
          <Row key={d.country} country={d.country} bags={d.bags} />
        ))}
      </div>

      {/* Footer / totals */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: 36,
          paddingTop: 22,
          borderTop: `6px solid ${INK}`,
        }}
      >
        <div style={{ maxWidth: 620 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.28em",
              color: RUST,
              marginBottom: 8,
            }}
          >
            A Note on the Method
          </div>
          <div
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 16,
              lineHeight: 1.5,
            }}
          >
            The sign is repeated, not enlarged. Greater quantity is shown by more beans —
            never by a bigger bean. A single glance yields the count; a longer look, the
            proportion. So the picture speaks before the number is read.
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", color: INK }}>
            Total of the Ten
          </div>
          <div
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 72,
              fontWeight: 900,
              color: RUST,
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            156
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            million bags
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 28,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: INK,
          opacity: 0.75,
        }}
      >
        <span>Isotype · International System of Typographic Picture Education</span>
        <span>Drawn at the Vienna Method Atelier</span>
      </div>
    </div>
  );
}
