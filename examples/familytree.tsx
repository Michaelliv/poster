import React from "react";

const vellum =
  "radial-gradient(1200px 800px at 20% 10%, rgba(120,85,40,0.10), transparent 60%)," +
  "radial-gradient(1000px 700px at 85% 90%, rgba(90,60,25,0.12), transparent 60%)," +
  "radial-gradient(600px 400px at 50% 50%, rgba(255,240,210,0.35), transparent 70%)," +
  "#f2e6c8";

const serif = { fontFamily: "'Source Serif 4', serif" } as const;

type P = { x: number; y: number; name: string; dates: string; sub?: string };

// Layout grid (poster is 1400 wide). Centered around x=700.
const G1: P[] = [
  { x: 560, y: 230, name: "João Almeida", dates: "1902 – 1978" },
  { x: 840, y: 230, name: "Isabel Correia", dates: "1908 – 1991" },
];

const G2: P[] = [
  { x: 180, y: 520, name: "Tomás Almeida", dates: "1931 – 2014" },
  { x: 340, y: 520, name: "Luísa Braga", dates: "1934 – 2019" },
  { x: 590, y: 520, name: "Matilde Almeida", dates: "1935 – 2022" },
  { x: 750, y: 520, name: "Rafael Neves", dates: "1932 – 2010" },
  { x: 1020, y: 520, name: "Henrique Almeida", dates: "1940 –" },
  { x: 1200, y: 520, name: "Clara Pinto", dates: "1943 –" },
];

const G3: P[] = [
  { x: 120, y: 820, name: "Beatriz Almeida", dates: "1960 –" },
  { x: 300, y: 820, name: "Leonardo Vasques", dates: "1958 –" },
  { x: 450, y: 820, name: "Duarte Almeida", dates: "1963 –" },
  { x: 640, y: 820, name: "Inês Neves", dates: "1962 –" },
  { x: 810, y: 820, name: "Miguel Neves", dates: "1965 –" },
  { x: 1050, y: 820, name: "Sofia Almeida", dates: "1972 –" },
  { x: 1230, y: 820, name: "Rita Almeida", dates: "1975 –" },
];

const G4: P[] = [
  { x: 140, y: 1100, name: "Afonso Vasques", dates: "1988 –" },
  { x: 300, y: 1100, name: "Violeta Vasques", dates: "1992 –" },
];

const INK = "#3a2a12";
const INK2 = "rgba(58,42,18,0.55)";

function Node({ p, size = "md" }: { p: P; size?: "lg" | "md" | "sm" }) {
  const nameSize = size === "lg" ? 26 : size === "md" ? 19 : 17;
  const dateSize = size === "lg" ? 15 : 14;
  return (
    <g>
      <text
        x={p.x}
        y={p.y}
        textAnchor="middle"
        style={{ ...serif, fontSize: nameSize, fontStyle: "italic", fontWeight: 500, fill: INK, letterSpacing: 0.5 }}
      >
        {p.name}
      </text>
      <text
        x={p.x}
        y={p.y + nameSize + 6}
        textAnchor="middle"
        style={{ fontFamily: "'Source Serif 4', serif", fontSize: dateSize, fill: INK2, letterSpacing: 2 }}
      >
        {p.dates}
      </text>
    </g>
  );
}

// Marriage bracket: horizontal line between two nodes
function Marriage({ a, b, y, dropX, dropTo }: { a: P; b: P; y: number; dropX?: number; dropTo?: number }) {
  const yy = y;
  return (
    <g stroke={INK} strokeWidth={1.1} fill="none">
      <line x1={a.x} y1={yy} x2={b.x} y2={yy} />
      <text
        x={(a.x + b.x) / 2}
        y={yy - 6}
        textAnchor="middle"
        style={{ ...serif, fontSize: 18, fontStyle: "italic", fill: INK, letterSpacing: 2 }}
      >
        ∞
      </text>
      {dropX !== undefined && dropTo !== undefined && (
        <line x1={dropX} y1={yy} x2={dropX} y2={dropTo} />
      )}
    </g>
  );
}

// Descent: parent midpoint → children with a horizontal bar
function Descent({
  fromX,
  fromY,
  barY,
  children,
  toY,
}: {
  fromX: number;
  fromY: number;
  barY: number;
  children: number[];
  toY: number;
}) {
  const xs = children;
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  return (
    <g stroke={INK} strokeWidth={1.1} fill="none">
      <line x1={fromX} y1={fromY} x2={fromX} y2={barY} />
      <line x1={minX} y1={barY} x2={maxX} y2={barY} />
      {xs.map((x, i) => (
        <line key={i} x1={x} y1={barY} x2={x} y2={toY} />
      ))}
    </g>
  );
}

// Ornament — simple copperplate flourish
function Flourish({ x, y, w = 280 }: { x: number; y: number; w?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke={INK} fill="none" strokeWidth={1}>
      <path d={`M${-w / 2} 0 C ${-w / 4} -14, ${-w / 8} 14, 0 0 C ${w / 8} -14, ${w / 4} 14, ${w / 2} 0`} />
      <circle cx={0} cy={0} r={2.5} fill={INK} stroke="none" />
      <circle cx={-w / 2} cy={0} r={1.5} fill={INK} stroke="none" />
      <circle cx={w / 2} cy={0} r={1.5} fill={INK} stroke="none" />
    </g>
  );
}

export default function FamilyTree() {
  // Key coordinates
  const g1MarriageY = 260; // just below names — we'll draw marriage line below date line
  const g1BarY = 380; // horizontal children bar
  const g1MidX = (G1[0].x + G1[1].x) / 2;

  // G2 couples
  const c1 = { a: G2[0], b: G2[1] }; // Tomás & Luísa
  const c2 = { a: G2[2], b: G2[3] }; // Matilde & Rafael
  const c3 = { a: G2[4], b: G2[5] }; // Henrique & Clara

  const g2MarriageY = 550;
  const g2BarY = 680;

  // G3 couple
  const g3Couple = { a: G3[0], b: G3[1] }; // Beatriz & Leonardo
  const g3MarriageY = 850;
  const g3BarY = 980;

  // Children mapping
  const tomasKids = [G3[0].x, G3[2].x]; // Beatriz, Duarte
  const matildeKids = [G3[3].x, G3[4].x]; // Inês, Miguel
  const henriqueKids = [G3[5].x, G3[6].x]; // Sofia, Rita

  const g2Kids_all = [...tomasKids, ...matildeKids, ...henriqueKids];

  const beatrizKids = [G4[0].x, G4[1].x];

  return (
    <div
      className="w-[1400px] p-12"
      style={{
        background: vellum,
        color: INK,
      }}
    >
      {/* Subtle paper texture via overlay gradient lines */}
      <div
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(90,60,20,0.025) 0 1px, transparent 1px 3px)," +
            "repeating-linear-gradient(90deg, rgba(90,60,20,0.02) 0 1px, transparent 1px 4px)",
          padding: 36,
          border: "1px double rgba(58,42,18,0.45)",
          boxShadow:
            "inset 0 0 120px rgba(90,55,15,0.18), inset 0 0 0 6px rgba(242,230,200,0.6), inset 0 0 0 7px rgba(58,42,18,0.35)",
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center" style={{ marginBottom: 6 }}>
          <div
            style={{
              ...serif,
              fontSize: 16,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: INK2,
            }}
          >
            Árvore Genealógica · Casa de Almeida · Porto
          </div>
          <div
            style={{
              ...serif,
              fontSize: 68,
              fontStyle: "italic",
              fontWeight: 500,
              letterSpacing: 2,
              marginTop: 8,
              color: INK,
            }}
          >
            The Almeida Lineage
          </div>
          <div
            style={{
              ...serif,
              fontSize: 18,
              letterSpacing: 6,
              color: INK2,
              marginTop: 4,
            }}
          >
            Four Generations  ·  Anno Domini MCMII – MMXXVI
          </div>
          <svg width={360} height={24} style={{ marginTop: 10 }}>
            <Flourish x={180} y={12} w={320} />
          </svg>
        </div>

        {/* Tree */}
        <svg width={1320} height={1180} style={{ display: "block", margin: "0 auto" }}>
          {/* G1 marriage */}
          <Marriage
            a={G1[0]}
            b={G1[1]}
            y={g1MarriageY + 18}
            dropX={g1MidX}
            dropTo={g1BarY}
          />
          {/* bar across G2 couples midpoints */}
          <g stroke={INK} strokeWidth={1.1} fill="none">
            {/* children of G1 are the three Almeidas: Tomás, Matilde, Henrique */}
            {(() => {
              const kidXs = [G2[0].x, G2[2].x, G2[4].x];
              const minX = Math.min(...kidXs);
              const maxX = Math.max(...kidXs);
              return (
                <g>
                  <line x1={minX} y1={g1BarY} x2={maxX} y2={g1BarY} />
                  {kidXs.map((x, i) => (
                    <line key={i} x1={x} y1={g1BarY} x2={x} y2={g2MarriageY - 60} />
                  ))}
                </g>
              );
            })()}
          </g>

          {/* G1 nodes */}
          <Node p={G1[0]} size="lg" />
          <Node p={G1[1]} size="lg" />

          {/* G2 nodes + marriages */}
          <Node p={c1.a} />
          <Node p={c1.b} />
          <Node p={c2.a} />
          <Node p={c2.b} />
          <Node p={c3.a} />
          <Node p={c3.b} />

          {/* marriage bars for couples (between name pairs) */}
          <Marriage
            a={c1.a}
            b={c1.b}
            y={g2MarriageY}
            dropX={(c1.a.x + c1.b.x) / 2}
            dropTo={g2BarY}
          />
          <Marriage
            a={c2.a}
            b={c2.b}
            y={g2MarriageY}
            dropX={(c2.a.x + c2.b.x) / 2}
            dropTo={g2BarY}
          />
          <Marriage
            a={c3.a}
            b={c3.b}
            y={g2MarriageY}
            dropX={(c3.a.x + c3.b.x) / 2}
            dropTo={g2BarY}
          />

          {/* Descent bars to G3 children */}
          <Descent
            fromX={(c1.a.x + c1.b.x) / 2}
            fromY={g2BarY}
            barY={g2BarY}
            children={tomasKids}
            toY={G3[0].y - 30}
          />
          <Descent
            fromX={(c2.a.x + c2.b.x) / 2}
            fromY={g2BarY}
            barY={g2BarY}
            children={matildeKids}
            toY={G3[0].y - 30}
          />
          <Descent
            fromX={(c3.a.x + c3.b.x) / 2}
            fromY={g2BarY}
            barY={g2BarY}
            children={henriqueKids}
            toY={G3[0].y - 30}
          />

          {/* G3 nodes */}
          {G3.map((p, i) => (
            <Node key={i} p={p} />
          ))}

          {/* G3 marriage: Beatriz & Leonardo */}
          <Marriage
            a={g3Couple.a}
            b={g3Couple.b}
            y={g3MarriageY}
            dropX={(g3Couple.a.x + g3Couple.b.x) / 2}
            dropTo={g3BarY}
          />

          {/* Descent to G4 */}
          <Descent
            fromX={(g3Couple.a.x + g3Couple.b.x) / 2}
            fromY={g3BarY}
            barY={g3BarY}
            children={beatrizKids}
            toY={G4[0].y - 30}
          />

          {/* G4 nodes */}
          {G4.map((p, i) => (
            <Node key={i} p={p} />
          ))}

          {/* Section markers */}
          <g style={{ ...serif }} fill={INK2}>
            <text x={60} y={232} style={{ fontSize: 14, letterSpacing: 4 }}>I.</text>
            <text x={60} y={522} style={{ fontSize: 14, letterSpacing: 4 }}>II.</text>
            <text x={60} y={822} style={{ fontSize: 14, letterSpacing: 4 }}>III.</text>
            <text x={60} y={1102} style={{ fontSize: 14, letterSpacing: 4 }}>IV.</text>
          </g>
        </svg>

        {/* Footer */}
        <div className="flex flex-col items-center" style={{ marginTop: 8 }}>
          <svg width={320} height={22}>
            <Flourish x={160} y={11} w={280} />
          </svg>
          <div
            style={{
              ...serif,
              fontSize: 15,
              fontStyle: "italic",
              color: INK2,
              letterSpacing: 3,
              marginTop: 10,
            }}
          >
            “Memoria maiorum — nomina quae manent.”
          </div>
          <div
            style={{
              ...serif,
              fontSize: 13,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: INK2,
              marginTop: 6,
            }}
          >
            Compiled at Porto · Transcribed on the XVI of April, MMXXVI
          </div>
        </div>
      </div>
    </div>
  );
}
