import React from "react";

const SIGNS = [
  { name: "Aries", glyph: "♈" },
  { name: "Taurus", glyph: "♉" },
  { name: "Gemini", glyph: "♊" },
  { name: "Cancer", glyph: "♋" },
  { name: "Leo", glyph: "♌" },
  { name: "Virgo", glyph: "♍" },
  { name: "Libra", glyph: "♎" },
  { name: "Scorpio", glyph: "♏" },
  { name: "Sagittarius", glyph: "♐" },
  { name: "Capricorn", glyph: "♑" },
  { name: "Aquarius", glyph: "♒" },
  { name: "Pisces", glyph: "♓" },
];

const PLANETS = [
  { name: "Sun", glyph: "☉", lon: 24 + 0 },
  { name: "Moon", glyph: "☽", lon: 8 + 240 },
  { name: "Mercury", glyph: "☿", lon: 7 + 0 },
  { name: "Venus", glyph: "♀", lon: 20 + 0 },
  { name: "Mars", glyph: "♂", lon: 23 + 90 },
  { name: "Jupiter", glyph: "♃", lon: 7 + 120 },
  { name: "Saturn", glyph: "♄", lon: 5 + 300 },
  { name: "Uranus", glyph: "♅", lon: 14 + 270 },
  { name: "Neptune", glyph: "♆", lon: 17 + 270 },
  { name: "Pluto", glyph: "♇", lon: 21 + 210 },
  { name: "N.Node", glyph: "☊", lon: 12 + 270 },
  { name: "Chiron", glyph: "⚷", lon: 18 + 90 },
];

const ASC = 38;
const HOUSES = Array.from({ length: 12 }, (_, i) => (ASC + i * 30) % 360);

const ASPECTS = [
  { angle: 0, orb: 8, color: "#d4af37", dash: "" },
  { angle: 60, orb: 4, color: "#8ab4c8", dash: "3 3" },
  { angle: 90, orb: 6, color: "#c45a4a", dash: "" },
  { angle: 120, orb: 6, color: "#6fa36b", dash: "" },
  { angle: 180, orb: 8, color: "#c45a4a", dash: "" },
];

const CX = 700, CY = 760;
const R_OUT = 620;
const R_ZODIAC_IN = 540;
const R_HOUSE = 420;
const R_PLANET = 470;
const R_ASPECT = 380;

function lonToXY(lon: number, r: number) {
  const theta = ((180 + (lon - ASC)) * Math.PI) / 180;
  return { x: CX + r * Math.cos(theta), y: CY - r * Math.sin(theta) };
}

function spreadPlanets(planets: typeof PLANETS, minSep = 6) {
  const sorted = [...planets].map((p) => ({ ...p, disp: p.lon }));
  sorted.sort((a, b) => a.lon - b.lon);
  for (let iter = 0; iter < 60; iter++) {
    let moved = false;
    for (let k = 0; k < sorted.length; k++) {
      const a = sorted[k];
      const b = sorted[(k + 1) % sorted.length];
      let d = (b.disp - a.disp + 360) % 360;
      if (d < minSep) {
        const push = (minSep - d) / 2;
        a.disp = (a.disp - push + 360) % 360;
        b.disp = (b.disp + push) % 360;
        moved = true;
      }
    }
    if (!moved) break;
  }
  return sorted;
}

const displayed = spreadPlanets(PLANETS, 6.5);

const aspectLines: { a: typeof PLANETS[number]; b: typeof PLANETS[number]; color: string; dash: string }[] = [];
for (let i = 0; i < PLANETS.length; i++) {
  for (let j = i + 1; j < PLANETS.length; j++) {
    let d = Math.abs(PLANETS[i].lon - PLANETS[j].lon);
    if (d > 180) d = 360 - d;
    for (const a of ASPECTS) {
      if (Math.abs(d - a.angle) <= a.orb) {
        aspectLines.push({ a: PLANETS[i], b: PLANETS[j], color: a.color, dash: a.dash });
        break;
      }
    }
  }
}

export default function Poster() {
  const GOLD = "#d4af37";
  const GOLD_D = "#8a7024";
  const PAPER = "#f2e7c9";
  const NAVY = "#0a1026";

  return (
    <div
      className="w-[1400px] p-0 relative"
      style={{
        background: `radial-gradient(1100px 900px at 50% 45%, #1a2656 0%, #0a1026 55%, #05081a 100%)`,
        fontFamily: "'Source Serif 4', serif",
        color: PAPER,
      }}
    >
      <div className="absolute inset-6 pointer-events-none" style={{ border: `1px solid ${GOLD_D}`, borderRadius: 2 }} />
      <div className="absolute inset-10 pointer-events-none" style={{ border: `0.5px solid ${GOLD}`, opacity: 0.35 }} />

      <div className="pt-16 pb-4 text-center relative">
        <div className="text-[16px] uppercase" style={{ color: GOLD, letterSpacing: "0.55em", fontStyle: "italic" }}>
          ✦ Ephemeris of the Celestial Sphere ✦
        </div>
        <div className="mt-4 text-[64px] leading-none" style={{ color: PAPER, letterSpacing: "0.04em" }}>
          Natal <span style={{ fontStyle: "italic", color: GOLD }}>Chart</span>
        </div>
        <div className="mt-4 text-[16px] uppercase tabular-nums" style={{ color: "#e7d9a8", letterSpacing: "0.45em" }}>
          XIV · April · MCMXCI  ·  Lisboa  ·  38°43′N  9°08′W
        </div>
      </div>

      <svg width="1400" height="1280" viewBox="0 0 1400 1280">
        <defs>
          <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a2656" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#0a1026" stopOpacity="1" />
          </radialGradient>
        </defs>

        <circle cx={CX} cy={CY} r={R_OUT + 20} fill="none" stroke={GOLD_D} strokeWidth="0.6" />
        <circle cx={CX} cy={CY} r={R_OUT + 8} fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.7" />
        <circle cx={CX} cy={CY} r={R_OUT} fill="url(#innerGlow)" stroke={GOLD} strokeWidth="1.2" />
        <circle cx={CX} cy={CY} r={R_ZODIAC_IN} fill="none" stroke={GOLD} strokeWidth="1" opacity="0.9" />
        <circle cx={CX} cy={CY} r={R_HOUSE} fill="none" stroke={GOLD_D} strokeWidth="0.8" />
        <circle cx={CX} cy={CY} r={R_ASPECT} fill="none" stroke={GOLD_D} strokeWidth="0.5" opacity="0.6" />

        {Array.from({ length: 360 }, (_, d) => {
          const inner = d % 10 === 0 ? R_ZODIAC_IN - 14 : d % 5 === 0 ? R_ZODIAC_IN - 8 : R_ZODIAC_IN - 4;
          const p1 = lonToXY(d, R_ZODIAC_IN);
          const p2 = lonToXY(d, inner);
          return (
            <line key={`t${d}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke={GOLD}
              strokeWidth={d % 30 === 0 ? 1.2 : d % 10 === 0 ? 0.6 : 0.3}
              opacity={d % 10 === 0 ? 0.9 : 0.5} />
          );
        })}

        {SIGNS.map((s, i) => {
          const lonStart = i * 30;
          const lonMid = i * 30 + 15;
          const p1 = lonToXY(lonStart, R_OUT);
          const p2 = lonToXY(lonStart, R_ZODIAC_IN);
          const mid = lonToXY(lonMid, (R_OUT + R_ZODIAC_IN) / 2);
          const label = lonToXY(lonMid, (R_OUT + R_ZODIAC_IN) / 2 - 28);
          return (
            <g key={s.name}>
              <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={GOLD} strokeWidth="0.9" opacity="0.8" />
              <text x={mid.x} y={mid.y + 14} textAnchor="middle" fill={GOLD} style={{ fontSize: 40 }}>{s.glyph}</text>
              <text x={label.x} y={label.y} textAnchor="middle" fill="#e7d9a8"
                style={{ fontSize: 11, letterSpacing: "0.35em", fontStyle: "italic" }}>
                {s.name.toUpperCase()}
              </text>
            </g>
          );
        })}

        {HOUSES.map((h, i) => {
          const p1 = lonToXY(h, R_ZODIAC_IN);
          const p2 = lonToXY(h, R_HOUSE);
          const isAngle = i % 3 === 0;
          const midLon = (h + 15) % 360;
          const num = lonToXY(midLon, R_HOUSE - 22);
          return (
            <g key={`h${i}`}>
              <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                stroke={GOLD}
                strokeWidth={isAngle ? 1.3 : 0.5}
                strokeDasharray={isAngle ? "" : "4 3"}
                opacity={isAngle ? 1 : 0.55} />
              <text x={num.x} y={num.y + 5} textAnchor="middle" fill="#c9b977"
                style={{ fontSize: 16, fontStyle: "italic" }}>
                {["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"][i]}
              </text>
            </g>
          );
        })}

        {[
          { lon: HOUSES[0], label: "ASC", dx: -36, dy: 6 },
          { lon: HOUSES[6], label: "DSC", dx: 36, dy: 6 },
          { lon: HOUSES[9], label: "MC", dx: 0, dy: -22 },
          { lon: HOUSES[3], label: "IC", dx: 0, dy: 30 },
        ].map((a) => {
          const p = lonToXY(a.lon, R_OUT + 34);
          return (
            <text key={a.label} x={p.x + a.dx} y={p.y + a.dy} textAnchor="middle" fill={GOLD}
              style={{ fontSize: 18, letterSpacing: "0.3em" }}>{a.label}</text>
          );
        })}

        {aspectLines.map((al, i) => {
          const p1 = lonToXY(al.a.lon, R_ASPECT - 6);
          const p2 = lonToXY(al.b.lon, R_ASPECT - 6);
          return (
            <line key={`a${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke={al.color} strokeWidth="0.9" strokeDasharray={al.dash} opacity="0.75" />
          );
        })}

        {PLANETS.map((p) => {
          const a = lonToXY(p.lon, R_ZODIAC_IN);
          const b = lonToXY(p.lon, R_ZODIAC_IN - 22);
          return (
            <line key={`pt${p.name}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={GOLD} strokeWidth="1.4" />
          );
        })}

        {displayed.map((p) => {
          const pos = lonToXY(p.disp, R_PLANET);
          const tickInner = lonToXY(p.disp, R_PLANET + 24);
          const tickReal = lonToXY(p.lon, R_ZODIAC_IN - 22);
          const deg = Math.floor(p.lon % 30);
          const min = Math.floor(((p.lon % 30) - deg) * 60);
          const signIdx = Math.floor(p.lon / 30);
          return (
            <g key={p.name}>
              <line x1={tickReal.x} y1={tickReal.y} x2={tickInner.x} y2={tickInner.y}
                stroke={GOLD} strokeWidth="0.5" opacity="0.6" />
              <circle cx={pos.x} cy={pos.y} r="18" fill={NAVY} stroke={GOLD} strokeWidth="0.8" />
              <text x={pos.x} y={pos.y + 9} textAnchor="middle" fill={GOLD} style={{ fontSize: 24 }}>{p.glyph}</text>
              <text x={pos.x} y={pos.y + 36} textAnchor="middle" fill="#e7d9a8"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>
                {deg}° {SIGNS[signIdx].glyph} {String(min).padStart(2,"0")}′
              </text>
            </g>
          );
        })}

        <g>
          <circle cx={CX} cy={CY} r="44" fill={NAVY} stroke={GOLD} strokeWidth="1" />
          <circle cx={CX} cy={CY} r="38" fill="none" stroke={GOLD_D} strokeWidth="0.6" />
          <text x={CX} y={CY + 4} textAnchor="middle" fill={GOLD} style={{ fontSize: 30, fontStyle: "italic" }}>✦</text>
          <text x={CX} y={CY + 24} textAnchor="middle" fill="#c9b977" style={{ fontSize: 9, letterSpacing: "0.3em" }}>AS ABOVE</text>
          <text x={CX} y={CY - 18} textAnchor="middle" fill="#c9b977" style={{ fontSize: 9, letterSpacing: "0.3em" }}>SO BELOW</text>
        </g>

        {[[120,120],[1280,120],[120,1220],[1280,1220]].map(([x,y], i) => (
          <text key={i} x={x} y={y} textAnchor="middle" fill={GOLD} style={{ fontSize: 22 }}>✦</text>
        ))}
      </svg>

      <div className="px-20 pb-16 -mt-8 grid grid-cols-3 gap-10">
        <div>
          <div className="text-[14px] uppercase mb-3" style={{ color: GOLD, letterSpacing: "0.4em", fontStyle: "italic" }}>
            Luminaries &amp; Planets
          </div>
          <div className="grid grid-cols-2 gap-y-1 text-[14px]" style={{ color: "#e7d9a8" }}>
            {PLANETS.map((p) => {
              const deg = Math.floor(p.lon % 30);
              const min = Math.floor(((p.lon % 30) - deg) * 60);
              const sign = SIGNS[Math.floor(p.lon / 30)];
              return (
                <div key={p.name} className="flex items-baseline gap-2">
                  <span style={{ color: GOLD, fontSize: 18 }}>{p.glyph}</span>
                  <span className="italic">{p.name}</span>
                  <span className="tabular-nums ml-auto" style={{ color: "#c9b977" }}>
                    {deg}° {sign.glyph} {String(min).padStart(2,"0")}′
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-[14px] uppercase mb-3" style={{ color: GOLD, letterSpacing: "0.4em", fontStyle: "italic" }}>
            Aspect Orbs
          </div>
          <div className="space-y-2 text-[14px]" style={{ color: "#e7d9a8" }}>
            {[
              { n: "Conjunction ☌", c: "#d4af37", d: "", o: "8°" },
              { n: "Sextile ⚹", c: "#8ab4c8", d: "3 3", o: "4°" },
              { n: "Square □", c: "#c45a4a", d: "", o: "6°" },
              { n: "Trine △", c: "#6fa36b", d: "", o: "6°" },
              { n: "Opposition ☍", c: "#c45a4a", d: "", o: "8°" },
            ].map((a) => (
              <div key={a.n} className="flex items-center gap-3">
                <svg width="46" height="10"><line x1="0" y1="5" x2="46" y2="5" stroke={a.c} strokeWidth="1.4" strokeDasharray={a.d} /></svg>
                <span className="italic">{a.n}</span>
                <span className="ml-auto tabular-nums" style={{ color: "#c9b977" }}>{a.o}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[14px] uppercase mb-3" style={{ color: GOLD, letterSpacing: "0.4em", fontStyle: "italic" }}>
            Natal Particulars
          </div>
          <div className="text-[14px] leading-relaxed" style={{ color: "#e7d9a8" }}>
            <div><span style={{ color: GOLD }}>Date</span> — 14 April 1991 (Sunday)</div>
            <div><span style={{ color: GOLD }}>Locale</span> — Lisboa, Portugal</div>
            <div><span style={{ color: GOLD }}>Coordinates</span> — 38°43′N · 9°08′W</div>
            <div><span style={{ color: GOLD }}>House System</span> — Placidus</div>
            <div><span style={{ color: GOLD }}>Ascendant</span> — 8° Taurus ♉</div>
            <div><span style={{ color: GOLD }}>Midheaven</span> — 18° Capricorn ♑</div>
            <div className="mt-3 italic text-[14px]" style={{ color: "#c9b977" }}>
              “Quod est inferius est sicut quod est superius.”
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pb-10 text-[14px] uppercase"
        style={{ color: "#8a7024", letterSpacing: "0.6em", fontStyle: "italic" }}>
        ✦ ✦ ✦  Drawn by the Hand of the Observer  ·  Anno MMXXVI  ✦ ✦ ✦
      </div>
    </div>
  );
}
