import React from "react";

export default function Blueprint() {
  const bg = "#1e3a5f";
  const line = "rgba(255,255,255,0.92)";
  const thin = "rgba(255,255,255,0.55)";
  const ghost = "rgba(255,255,255,0.18)";

  // Isometric projection helpers
  const iso = (x: number, y: number, z: number) => {
    const ix = (x - y) * Math.cos(Math.PI / 6);
    const iy = (x + y) * Math.sin(Math.PI / 6) - z;
    return [ix, iy] as const;
  };
  const p = (x: number, y: number, z: number) => iso(x, y, z).join(",");

  // House footprint: 8m x 6m, height 3m, roof parapet 0.4m
  const W = 8, D = 6, H = 3, P = 0.4;
  const S = 38; // scale px per m
  const cx = 800, cy = 560;

  const P3 = (x: number, y: number, z: number) => {
    const [ix, iy] = iso(x, y, z);
    return `${cx + ix * S},${cy - iy * S}`;
  };

  // Faces
  const floor = [P3(0,0,0), P3(W,0,0), P3(W,D,0), P3(0,D,0)].join(" ");
  const front = [P3(0,0,0), P3(W,0,0), P3(W,0,H), P3(0,0,H)].join(" ");
  const side  = [P3(W,0,0), P3(W,D,0), P3(W,D,H), P3(W,0,H)].join(" ");
  const top   = [P3(0,0,H), P3(W,0,H), P3(W,D,H), P3(0,D,H)].join(" ");
  const parapetFront = [P3(0,0,H), P3(W,0,H), P3(W,0,H+P), P3(0,0,H+P)].join(" ");
  const parapetSide  = [P3(W,0,H), P3(W,D,H), P3(W,D,H+P), P3(W,0,H+P)].join(" ");

  // Openings on front face (y=0): door + two windows
  const door = [P3(1,0,0), P3(2,0,0), P3(2,0,2.1), P3(1,0,2.1)].join(" ");
  const winA = [P3(3,0,1), P3(4.2,0,1), P3(4.2,0,2.2), P3(3,0,2.2)].join(" ");
  const winB = [P3(5.2,0,1), P3(7,0,1), P3(7,0,2.2), P3(5.2,0,2.2)].join(" ");

  // Opening on side face (x=W): long window
  const winC = [P3(W,1.5,1), P3(W,4.5,1), P3(W,4.5,2.2), P3(W,1.5,2.2)].join(" ");

  // Dimension helper
  const DimLine = ({ a, b, label, offset = 0.6, axis = "x" }: any) => {
    const [ax, ay, az] = a;
    const [bx, by, bz] = b;
    let o1: [number, number, number], o2: [number, number, number];
    if (axis === "x") { o1 = [ax, ay - offset, az]; o2 = [bx, by - offset, bz]; }
    else if (axis === "y") { o1 = [ax + offset, ay, az]; o2 = [bx + offset, by, bz]; }
    else { o1 = [ax - offset, ay, az]; o2 = [bx - offset, by, bz]; }
    const [sx, sy] = iso(o1[0], o1[1], o1[2]);
    const [ex, ey] = iso(o2[0], o2[1], o2[2]);
    const mx = (sx + ex) / 2, my = (sy + ey) / 2;
    return (
      <g stroke={thin} fill="none" strokeWidth={0.6}>
        <line x1={cx + iso(ax,ay,az)[0]*S} y1={cy - iso(ax,ay,az)[1]*S} x2={cx + sx*S} y2={cy - sy*S} strokeDasharray="2 2"/>
        <line x1={cx + iso(bx,by,bz)[0]*S} y1={cy - iso(bx,by,bz)[1]*S} x2={cx + ex*S} y2={cy - ey*S} strokeDasharray="2 2"/>
        <line x1={cx + sx*S} y1={cy - sy*S} x2={cx + ex*S} y2={cy - ey*S} />
        <circle cx={cx + sx*S} cy={cy - sy*S} r={2} fill={thin} stroke="none"/>
        <circle cx={cx + ex*S} cy={cy - ey*S} r={2} fill={thin} stroke="none"/>
        <text x={cx + mx*S} y={cy - my*S - 6} fill="rgba(255,255,255,0.85)" fontSize={14}
              textAnchor="middle" fontFamily="'JetBrains Mono', monospace" letterSpacing="2">
          {label}
        </text>
      </g>
    );
  };

  // Grid of faint construction dots on paper
  const dots = [];
  for (let i = 0; i < 60; i++) for (let j = 0; j < 40; j++) {
    dots.push(<circle key={`${i}-${j}`} cx={i*28} cy={j*28} r={0.6} fill="rgba(255,255,255,0.06)"/>);
  }

  return (
    <div className="w-[1600px]" style={{ background: bg, fontFamily: "'JetBrains Mono', monospace" }}>
      <div className="relative" style={{ width: 1600, height: 1100 }}>
        {/* Paper texture */}
        <svg width={1600} height={1100} className="absolute inset-0">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
            </pattern>
            <pattern id="majorgrid" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8"/>
            </pattern>
            <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
              <stop offset="60%" stopColor="rgba(0,0,0,0)"/>
              <stop offset="100%" stopColor="rgba(0,0,0,0.35)"/>
            </radialGradient>
          </defs>
          <rect width="1600" height="1100" fill="url(#grid)"/>
          <rect width="1600" height="1100" fill="url(#majorgrid)"/>
          <rect width="1600" height="1100" fill="url(#vignette)"/>

          {/* Outer border */}
          <rect x="40" y="40" width="1520" height="1020" fill="none" stroke={line} strokeWidth="1.2"/>
          <rect x="52" y="52" width="1496" height="996" fill="none" stroke={thin} strokeWidth="0.5"/>

          {/* Header band */}
          <line x1="40" y1="120" x2="1560" y2="120" stroke={line} strokeWidth="0.8"/>
          <text x="72" y="92" fill="white" fontSize="26" letterSpacing="6">
            CASA PICCOLA · RESIDENTIAL UNIT N°04
          </text>
          <text x="72" y="110" fill="rgba(255,255,255,0.6)" fontSize="12" letterSpacing="4">
            ISOMETRIC · CONCRETE SHELL · NORTH ELEVATION AXO
          </text>
          <text x="1528" y="92" fill="white" fontSize="14" textAnchor="end" letterSpacing="3">
            DWG-A.301
          </text>
          <text x="1528" y="110" fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="end" letterSpacing="3">
            REV. 02 · 16 APR 2026
          </text>

          {/* Compass / north */}
          <g transform="translate(140, 220)">
            <circle r="38" fill="none" stroke={thin} strokeWidth="0.6"/>
            <circle r="30" fill="none" stroke={ghost} strokeWidth="0.4"/>
            <line x1="0" y1="-38" x2="0" y2="38" stroke={thin} strokeWidth="0.4"/>
            <line x1="-38" y1="0" x2="38" y2="0" stroke={thin} strokeWidth="0.4"/>
            <polygon points="0,-34 6,6 0,-4 -6,6" fill="white"/>
            <text y="-46" fill="white" fontSize="12" textAnchor="middle" letterSpacing="3">N</text>
          </g>

          {/* Scale bar */}
          <g transform="translate(80, 990)">
            <text y="-10" fill="rgba(255,255,255,0.75)" fontSize="11" letterSpacing="3">SCALE 1:50</text>
            {[0,1,2,3,4].map(i => (
              <rect key={i} x={i*40} y={0} width={40} height={8} fill={i%2?"white":"none"} stroke="white" strokeWidth="0.6"/>
            ))}
            <text x="0" y="26" fill="rgba(255,255,255,0.6)" fontSize="10">0</text>
            <text x="80" y="26" fill="rgba(255,255,255,0.6)" fontSize="10">2m</text>
            <text x="160" y="26" fill="rgba(255,255,255,0.6)" fontSize="10">4m</text>
          </g>

          {/* Ghost footprint extrusion lines (construction) */}
          <g stroke={ghost} strokeWidth="0.5" strokeDasharray="3 4" fill="none">
            <line x1={cx + iso(0,0,0)[0]*S} y1={cy - iso(0,0,0)[1]*S} x2={cx + iso(0,0,H+P+1)[0]*S} y2={cy - iso(0,0,H+P+1)[1]*S}/>
            <line x1={cx + iso(W,0,0)[0]*S} y1={cy - iso(W,0,0)[1]*S} x2={cx + iso(W,0,H+P+1)[0]*S} y2={cy - iso(W,0,H+P+1)[1]*S}/>
            <line x1={cx + iso(W,D,0)[0]*S} y1={cy - iso(W,D,0)[1]*S} x2={cx + iso(W,D,H+P+1)[0]*S} y2={cy - iso(W,D,H+P+1)[1]*S}/>
            <line x1={cx + iso(0,D,0)[0]*S} y1={cy - iso(0,D,0)[1]*S} x2={cx + iso(0,D,H+P+1)[0]*S} y2={cy - iso(0,D,H+P+1)[1]*S}/>
          </g>

          {/* Ground line hatching */}
          <g stroke={thin} strokeWidth="0.4">
            {Array.from({length: 40}).map((_, i) => {
              const x1 = 200 + i * 30;
              return <line key={i} x1={x1} y1={880} x2={x1 - 14} y2={894}/>;
            })}
            <line x1="200" y1="880" x2="1400" y2="880"/>
          </g>

          {/* Floor */}
          <polygon points={floor} fill="rgba(255,255,255,0.04)" stroke={thin} strokeWidth="0.6" strokeDasharray="2 3"/>

          {/* Main volume */}
          <polygon points={front} fill="rgba(255,255,255,0.05)" stroke={line} strokeWidth="1.2"/>
          <polygon points={side}  fill="rgba(255,255,255,0.08)" stroke={line} strokeWidth="1.2"/>
          <polygon points={top}   fill="rgba(255,255,255,0.03)" stroke={line} strokeWidth="1.2"/>

          {/* Parapet */}
          <polygon points={parapetFront} fill="rgba(255,255,255,0.07)" stroke={line} strokeWidth="1"/>
          <polygon points={parapetSide}  fill="rgba(255,255,255,0.10)" stroke={line} strokeWidth="1"/>

          {/* Openings */}
          <polygon points={door} fill={bg} stroke={line} strokeWidth="1"/>
          <polygon points={winA} fill="rgba(180,210,240,0.12)" stroke={line} strokeWidth="0.9"/>
          <polygon points={winB} fill="rgba(180,210,240,0.12)" stroke={line} strokeWidth="0.9"/>
          <polygon points={winC} fill="rgba(180,210,240,0.16)" stroke={line} strokeWidth="0.9"/>

          {/* Window mullions */}
          <line x1={P3(3.6,0,1).split(",")[0]} y1={P3(3.6,0,1).split(",")[1]}
                x2={P3(3.6,0,2.2).split(",")[0]} y2={P3(3.6,0,2.2).split(",")[1]} stroke={line} strokeWidth="0.5"/>
          <line x1={P3(6.1,0,1).split(",")[0]} y1={P3(6.1,0,1).split(",")[1]}
                x2={P3(6.1,0,2.2).split(",")[0]} y2={P3(6.1,0,2.2).split(",")[1]} stroke={line} strokeWidth="0.5"/>
          <line x1={P3(W,3,1).split(",")[0]}   y1={P3(W,3,1).split(",")[1]}
                x2={P3(W,3,2.2).split(",")[0]} y2={P3(W,3,2.2).split(",")[1]} stroke={line} strokeWidth="0.5"/>

          {/* Roof skylight */}
          <polygon points={[P3(2.5,2,H), P3(4.5,2,H), P3(4.5,4,H), P3(2.5,4,H)].join(" ")}
                   fill="rgba(120,170,220,0.18)" stroke={line} strokeWidth="0.8"/>

          {/* Chimney block */}
          <g stroke={line} strokeWidth="0.9" fill="rgba(255,255,255,0.08)">
            <polygon points={[P3(6,4,H), P3(7,4,H), P3(7,5,H), P3(6,5,H)].join(" ")}/>
            <polygon points={[P3(6,4,H), P3(7,4,H), P3(7,4,H+1.2), P3(6,4,H+1.2)].join(" ")}/>
            <polygon points={[P3(7,4,H), P3(7,5,H), P3(7,5,H+1.2), P3(7,4,H+1.2)].join(" ")}/>
            <polygon points={[P3(6,4,H+1.2), P3(7,4,H+1.2), P3(7,5,H+1.2), P3(6,5,H+1.2)].join(" ")}/>
          </g>

          {/* Dimensions */}
          <DimLine a={[0,0,0]} b={[W,0,0]} label="8000 mm" offset={0.9} axis="x"/>
          <DimLine a={[W,0,0]} b={[W,D,0]} label="6000 mm" offset={0.9} axis="y"/>
          <DimLine a={[W,D,0]} b={[W,D,H]} label="3000 mm" offset={0.9} axis="y"/>
          <DimLine a={[0,0,H]} b={[0,0,H+P]} label="400"  offset={0.9} axis="z"/>
          <DimLine a={[1,0,0]} b={[2,0,0]} label="1000"   offset={0.35} axis="x"/>

          {/* Callouts */}
          <g fill="rgba(255,255,255,0.78)" fontSize={11} fontFamily="'JetBrains Mono', monospace" letterSpacing="1.5">
            {(() => {
              const [x,y] = iso(4, 0, 2.8); const px = cx + x*S, py = cy - y*S;
              return (<>
                <line x1={px} y1={py} x2={px - 180} y2={py - 80} stroke={thin} strokeWidth="0.5"/>
                <circle cx={px} cy={py} r={2.5} fill={line}/>
                <text x={px - 186} y={py - 86}>① FAIR-FACED CONCRETE WALL, 200 mm</text>
                <text x={px - 186} y={py - 72}>   C30/37 · BOARD-MARKED FINISH</text>
              </>);
            })()}
            {(() => {
              const [x,y] = iso(W, 3, 1.6); const px = cx + x*S, py = cy - y*S;
              return (<>
                <line x1={px} y1={py} x2={px + 200} y2={py - 40} stroke={thin} strokeWidth="0.5"/>
                <circle cx={px} cy={py} r={2.5} fill={line}/>
                <text x={px + 206} y={py - 46}>② ALU-FRAME GLAZING, DOUBLE GLAZED</text>
                <text x={px + 206} y={py - 32}>   3000 × 1200 mm · U = 1.1 W/m²K</text>
              </>);
            })()}
            {(() => {
              const [x,y] = iso(3.5, 3, H); const px = cx + x*S, py = cy - y*S;
              return (<>
                <line x1={px} y1={py} x2={px - 140} y2={py - 110} stroke={thin} strokeWidth="0.5"/>
                <circle cx={px} cy={py} r={2.5} fill={line}/>
                <text x={px - 146} y={py - 116}>③ ROOF SKYLIGHT · 2000 × 2000 mm</text>
              </>);
            })()}
            {(() => {
              const [x,y] = iso(6.5, 4.5, H+0.8); const px = cx + x*S, py = cy - y*S;
              return (<>
                <line x1={px} y1={py} x2={px + 170} y2={py - 20} stroke={thin} strokeWidth="0.5"/>
                <circle cx={px} cy={py} r={2.5} fill={line}/>
                <text x={px + 176} y={py - 26}>④ FLUE · STEEL-LINED · 1000 × 1000 mm</text>
              </>);
            })()}
          </g>

          {/* Axis legend top-left of drawing */}
          <g transform="translate(220, 240)" stroke={thin} fill="rgba(255,255,255,0.7)" fontSize={11} letterSpacing="2">
            <line x1="0" y1="0" x2={40*Math.cos(Math.PI/6)} y2={-40*Math.sin(Math.PI/6)} strokeWidth="0.8"/>
            <line x1="0" y1="0" x2={-40*Math.cos(Math.PI/6)} y2={-40*Math.sin(Math.PI/6)} strokeWidth="0.8"/>
            <line x1="0" y1="0" x2="0" y2="-40" strokeWidth="0.8"/>
            <text x={42*Math.cos(Math.PI/6)+2} y={-40*Math.sin(Math.PI/6)}>X</text>
            <text x={-42*Math.cos(Math.PI/6)-10} y={-40*Math.sin(Math.PI/6)}>Y</text>
            <text x="4" y="-42">Z</text>
            <text x="-30" y="24" fontSize="10" fill="rgba(255,255,255,0.5)">ISO 30° / 30°</text>
          </g>

          {/* Notes block top-right */}
          <g transform="translate(1200, 200)" fontFamily="'JetBrains Mono', monospace">
            <text fill="white" fontSize="12" letterSpacing="3">GENERAL NOTES</text>
            <line x1="0" y1="8" x2="320" y2="8" stroke={thin} strokeWidth="0.5"/>
            {[
              "01  ALL DIMENSIONS IN MILLIMETRES.",
              "02  DO NOT SCALE FROM DRAWING.",
              "03  VERIFY ALL LEVELS ON SITE.",
              "04  CONCRETE GRADE C30/37, COVER 30mm.",
              "05  REBAR B500B, SPACING SEE A.502.",
              "06  REFER TO A.201 FOR PLAN AT +0.00.",
              "07  INSULATION 120mm XPS AT PERIMETER.",
            ].map((t, i) => (
              <text key={i} x="0" y={32 + i*18} fill="rgba(255,255,255,0.72)" fontSize="11" letterSpacing="1">{t}</text>
            ))}
          </g>

          {/* Title block bottom-right */}
          <g transform="translate(960, 860)">
            <rect x="0" y="0" width="600" height="200" fill="rgba(0,0,0,0.18)" stroke={line} strokeWidth="1"/>
            {/* Internal divisions */}
            <line x1="0" y1="48" x2="600" y2="48" stroke={line} strokeWidth="0.8"/>
            <line x1="0" y1="130" x2="600" y2="130" stroke={thin} strokeWidth="0.6"/>
            <line x1="360" y1="48" x2="360" y2="130" stroke={thin} strokeWidth="0.6"/>
            <line x1="200" y1="130" x2="200" y2="200" stroke={thin} strokeWidth="0.6"/>
            <line x1="400" y1="130" x2="400" y2="200" stroke={thin} strokeWidth="0.6"/>

            {/* Studio mark */}
            <text x="20" y="30" fill="white" fontSize="18" letterSpacing="6">ATELIER MERIDIAN · ARCH</text>
            <text x="580" y="30" fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="end" letterSpacing="3">
              VIA DEL PORTO 14 · GENOVA · IT
            </text>

            {/* Project */}
            <text x="20" y="72" fill="rgba(255,255,255,0.55)" fontSize="9" letterSpacing="3">PROJECT</text>
            <text x="20" y="96" fill="white" fontSize="20" letterSpacing="2">CASA PICCOLA</text>
            <text x="20" y="116" fill="rgba(255,255,255,0.7)" fontSize="11" letterSpacing="1">
              CONCRETE HOUSE · LIGURIAN COAST
            </text>

            {/* Drawing title */}
            <text x="380" y="72" fill="rgba(255,255,255,0.55)" fontSize="9" letterSpacing="3">DRAWING</text>
            <text x="380" y="94" fill="white" fontSize="14" letterSpacing="2">AXONOMETRIC</text>
            <text x="380" y="112" fill="rgba(255,255,255,0.7)" fontSize="11">ISO 30°/30° · NE VIEW</text>

            {/* Bottom row: scale | drawn by | sheet */}
            <text x="20" y="148" fill="rgba(255,255,255,0.55)" fontSize="9" letterSpacing="3">SCALE</text>
            <text x="20" y="180" fill="white" fontSize="20" letterSpacing="3">1 : 50</text>
            <text x="20" y="194" fill="rgba(255,255,255,0.55)" fontSize="9">A1 · 594 × 841</text>

            <text x="220" y="148" fill="rgba(255,255,255,0.55)" fontSize="9" letterSpacing="3">DRAWN BY</text>
            <text x="220" y="170" fill="white" fontSize="14" letterSpacing="2">A. CHEN</text>
            <text x="220" y="186" fill="rgba(255,255,255,0.55)" fontSize="9">CHK · M. BIANCHI</text>
            <text x="220" y="198" fill="rgba(255,255,255,0.55)" fontSize="9">APPR · L. FONTANA</text>

            <text x="420" y="148" fill="rgba(255,255,255,0.55)" fontSize="9" letterSpacing="3">SHEET</text>
            <text x="420" y="180" fill="white" fontSize="22" letterSpacing="3">A.301</text>
            <text x="420" y="196" fill="rgba(255,255,255,0.55)" fontSize="9">07 / 24 · REV 02</text>
          </g>

          {dots}
        </svg>
      </div>
    </div>
  );
}
