import React from "react";

const innings = [1,2,3,4,5,6,7,8,9];

const larksLine = [0,1,0,2,0,0,1,0,3];
const draysLine = [1,0,0,0,2,0,0,1,0];

const larksLineup = [
  { n: 7,  name: "Ava Chen",        pos: "CF", ab: 5, r: 1, h: 2, rbi: 1, bb: 0, so: 1, avg: ".312" },
  { n: 12, name: "Miles Holloway",  pos: "2B", ab: 4, r: 1, h: 1, rbi: 0, bb: 1, so: 0, avg: ".289" },
  { n: 24, name: "Sora Okafor",     pos: "RF", ab: 5, r: 2, h: 3, rbi: 2, bb: 0, so: 1, avg: ".341" },
  { n: 33, name: "Diego Marchetti",  pos: "1B", ab: 4, r: 0, h: 1, rbi: 1, bb: 1, so: 1, avg: ".276" },
  { n: 9,  name: "Kai Nakamura",    pos: "LF", ab: 4, r: 1, h: 2, rbi: 2, bb: 0, so: 0, avg: ".301" },
  { n: 15, name: "Ruben Alarcón",   pos: "3B", ab: 4, r: 0, h: 0, rbi: 0, bb: 0, so: 2, avg: ".254" },
  { n: 2,  name: "Theo Brannigan",   pos: "SS", ab: 4, r: 1, h: 1, rbi: 1, bb: 0, so: 1, avg: ".267" },
  { n: 27, name: "Jonas Pellikan",   pos: "C",  ab: 3, r: 1, h: 1, rbi: 0, bb: 1, so: 0, avg: ".244" },
  { n: 41, name: "Ezra Vandermeer",  pos: "P",  ab: 3, r: 0, h: 0, rbi: 0, bb: 0, so: 2, avg: ".132" },
];

const draysLineup = [
  { n: 3,  name: "Hiro Tanaka",     pos: "SS", ab: 5, r: 1, h: 2, rbi: 1, bb: 0, so: 0, avg: ".298" },
  { n: 18, name: "Louis Carbonell", pos: "CF", ab: 4, r: 1, h: 1, rbi: 0, bb: 1, so: 1, avg: ".274" },
  { n: 22, name: "Beckett Harrow",  pos: "LF", ab: 4, r: 0, h: 1, rbi: 1, bb: 0, so: 1, avg: ".283" },
  { n: 44, name: "Oskar Lindqvist", pos: "1B", ab: 4, r: 1, h: 2, rbi: 2, bb: 0, so: 0, avg: ".322" },
  { n: 8,  name: "Rafael Duarte",   pos: "RF", ab: 4, r: 0, h: 1, rbi: 0, bb: 0, so: 2, avg: ".261" },
  { n: 11, name: "Sam Oduya",       pos: "3B", ab: 4, r: 0, h: 0, rbi: 0, bb: 0, so: 1, avg: ".248" },
  { n: 5,  name: "Niko Fairweather",pos: "2B", ab: 3, r: 1, h: 1, rbi: 0, bb: 1, so: 0, avg: ".279" },
  { n: 29, name: "Casimir Wen",     pos: "C",  ab: 3, r: 0, h: 0, rbi: 0, bb: 1, so: 1, avg: ".231" },
  { n: 36, name: "Bram Weatherall",  pos: "P",  ab: 3, r: 0, h: 1, rbi: 0, bb: 0, so: 1, avg: ".148" },
];

const larksPitchers = [
  { name: "Vandermeer (W, 2-1)", ip: "7.0", h: 6, r: 3, er: 3, bb: 2, so: 8, hr: 1, era: "2.84" },
  { name: "Oduenyi (H)",          ip: "1.0", h: 1, r: 1, er: 0, bb: 0, so: 1, hr: 0, era: "3.12" },
  { name: "Callahan (S, 4)",      ip: "1.0", h: 0, r: 0, er: 0, bb: 1, so: 2, hr: 0, era: "1.54" },
];

const draysPitchers = [
  { name: "Weatherall (L, 1-2)", ip: "6.1", h: 8, r: 5, er: 5, bb: 2, so: 5, hr: 2, era: "4.21" },
  { name: "Marchetti",             ip: "1.2", h: 2, r: 2, er: 2, bb: 1, so: 1, hr: 0, era: "3.88" },
  { name: "Ito",                   ip: "1.0", h: 1, r: 0, er: 0, bb: 0, so: 2, hr: 0, era: "2.66" },
];

const paper = "#f3ece0";
const ink = "#1a1713";
const faint = "#6b6257";
const red = "#8a1e1e";

const sum = (a:number[]) => a.reduce((x,y)=>x+y,0);
const sumKey = (arr:any[], k:string) => arr.reduce((s,r)=>s+(r[k]||0),0);

function Linescore() {
  const rows = [
    { name: "BROOKLYN LARKS", line: larksLine, h: sumKey(larksLineup,"h"), e: 1 },
    { name: "CHICAGO DRAYS",  line: draysLine, h: sumKey(draysLineup,"h"), e: 2 },
  ];
  return (
    <table className="w-full border-collapse" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16 }}>
      <thead>
        <tr style={{ borderBottom: `2px solid ${ink}` }}>
          <th className="text-left py-2 pr-3" style={{ width: 220 }}>CLUB</th>
          {innings.map(i => (
            <th key={i} className="py-2 text-center" style={{ width: 44, borderLeft: `1px solid ${ink}33` }}>{i}</th>
          ))}
          <th className="text-center py-2 px-2" style={{ borderLeft: `2px solid ${ink}`, color: red }}>R</th>
          <th className="text-center py-2 px-2">H</th>
          <th className="text-center py-2 px-2">E</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r,i)=>(
          <tr key={r.name} style={{ borderBottom: `1px solid ${ink}22` }}>
            <td className="py-3 pr-3 font-bold tracking-wide">{r.name}</td>
            {r.line.map((v,j)=>(
              <td key={j} className="text-center py-3 tabular-nums" style={{ borderLeft: `1px solid ${ink}22`, color: v>0 ? ink : faint, fontWeight: v>0 ? 700 : 400 }}>{v}</td>
            ))}
            <td className="text-center py-3 px-2 tabular-nums font-bold" style={{ borderLeft: `2px solid ${ink}`, color: red, fontSize: 20 }}>{sum(r.line)}</td>
            <td className="text-center py-3 px-2 tabular-nums font-bold" style={{ fontSize: 20 }}>{r.h}</td>
            <td className="text-center py-3 px-2 tabular-nums font-bold" style={{ fontSize: 20 }}>{r.e}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Lineup({ title, rows }: { title: string; rows: typeof larksLineup }) {
  const tot = {
    ab: sumKey(rows,"ab"), r: sumKey(rows,"r"), h: sumKey(rows,"h"),
    rbi: sumKey(rows,"rbi"), bb: sumKey(rows,"bb"), so: sumKey(rows,"so"),
  };
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2" style={{ borderBottom: `2px solid ${ink}`, paddingBottom: 6 }}>
        <div className="font-bold tracking-[0.2em]" style={{ fontSize: 18 }}>{title}</div>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontStyle: "italic", fontSize: 14, color: faint }}>batting order</div>
      </div>
      <table className="w-full border-collapse" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>
        <thead>
          <tr style={{ color: faint, borderBottom: `1px solid ${ink}44` }}>
            <th className="text-left py-1" style={{ width: 28 }}>#</th>
            <th className="text-left py-1" style={{ width: 40 }}>POS</th>
            <th className="text-left py-1">BATTER</th>
            <th className="text-right py-1 px-1">AB</th>
            <th className="text-right py-1 px-1">R</th>
            <th className="text-right py-1 px-1">H</th>
            <th className="text-right py-1 px-1">RBI</th>
            <th className="text-right py-1 px-1">BB</th>
            <th className="text-right py-1 px-1">SO</th>
            <th className="text-right py-1 pl-2">AVG</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((b,i)=>(
            <tr key={i} style={{ borderBottom: `1px dotted ${ink}33` }}>
              <td className="py-1.5 tabular-nums" style={{ color: faint }}>{b.n}</td>
              <td className="py-1.5 font-bold">{b.pos}</td>
              <td className="py-1.5" style={{ fontFamily: "'Source Serif 4', serif", fontSize: 15 }}>{b.name}</td>
              <td className="text-right py-1.5 px-1 tabular-nums">{b.ab}</td>
              <td className="text-right py-1.5 px-1 tabular-nums font-bold">{b.r}</td>
              <td className="text-right py-1.5 px-1 tabular-nums font-bold">{b.h}</td>
              <td className="text-right py-1.5 px-1 tabular-nums">{b.rbi}</td>
              <td className="text-right py-1.5 px-1 tabular-nums">{b.bb}</td>
              <td className="text-right py-1.5 px-1 tabular-nums">{b.so}</td>
              <td className="text-right py-1.5 pl-2 tabular-nums" style={{ color: faint }}>{b.avg}</td>
            </tr>
          ))}
          <tr style={{ borderTop: `2px solid ${ink}` }}>
            <td></td><td></td>
            <td className="py-2 font-bold tracking-wider" style={{ fontSize: 13 }}>TOTALS</td>
            <td className="text-right py-2 px-1 tabular-nums font-bold">{tot.ab}</td>
            <td className="text-right py-2 px-1 tabular-nums font-bold" style={{ color: red }}>{tot.r}</td>
            <td className="text-right py-2 px-1 tabular-nums font-bold">{tot.h}</td>
            <td className="text-right py-2 px-1 tabular-nums font-bold">{tot.rbi}</td>
            <td className="text-right py-2 px-1 tabular-nums font-bold">{tot.bb}</td>
            <td className="text-right py-2 px-1 tabular-nums font-bold">{tot.so}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Pitching({ title, rows }: { title: string; rows: typeof larksPitchers }) {
  return (
    <div>
      <div className="font-bold tracking-[0.2em] mb-2" style={{ fontSize: 14, borderBottom: `1px solid ${ink}`, paddingBottom: 4 }}>{title}</div>
      <table className="w-full border-collapse" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
        <thead>
          <tr style={{ color: faint }}>
            <th className="text-left py-1">PITCHER</th>
            <th className="text-right py-1 px-1">IP</th>
            <th className="text-right py-1 px-1">H</th>
            <th className="text-right py-1 px-1">R</th>
            <th className="text-right py-1 px-1">ER</th>
            <th className="text-right py-1 px-1">BB</th>
            <th className="text-right py-1 px-1">SO</th>
            <th className="text-right py-1 px-1">HR</th>
            <th className="text-right py-1 pl-2">ERA</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p,i)=>(
            <tr key={i} style={{ borderTop: `1px dotted ${ink}33` }}>
              <td className="py-1.5" style={{ fontFamily: "'Source Serif 4', serif", fontSize: 14 }}>{p.name}</td>
              <td className="text-right py-1.5 px-1 tabular-nums">{p.ip}</td>
              <td className="text-right py-1.5 px-1 tabular-nums">{p.h}</td>
              <td className="text-right py-1.5 px-1 tabular-nums">{p.r}</td>
              <td className="text-right py-1.5 px-1 tabular-nums">{p.er}</td>
              <td className="text-right py-1.5 px-1 tabular-nums">{p.bb}</td>
              <td className="text-right py-1.5 px-1 tabular-nums font-bold">{p.so}</td>
              <td className="text-right py-1.5 px-1 tabular-nums">{p.hr}</td>
              <td className="text-right py-1.5 pl-2 tabular-nums" style={{ color: faint }}>{p.era}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Scorecard() {
  return (
    <div
      className="w-[1400px] p-14"
      style={{
        background: `radial-gradient(1200px 800px at 20% 0%, rgba(0,0,0,0.04), transparent 60%), ${paper}`,
        color: ink,
        fontFamily: "'Source Serif 4', serif",
      }}
    >
      {/* Masthead */}
      <div className="flex items-end justify-between" style={{ borderBottom: `4px double ${ink}`, paddingBottom: 14 }}>
        <div>
          <div className="uppercase tracking-[0.35em] font-bold" style={{ fontSize: 13, color: faint, fontFamily: "'JetBrains Mono', monospace" }}>
            The Evening Dispatch · Sporting Page · Vol. XLII
          </div>
          <div className="mt-2" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 900, fontSize: 72, letterSpacing: "-0.02em", lineHeight: 0.95 }}>
            Official <span style={{ fontStyle: "italic" }}>Scorecard</span>
          </div>
        </div>
        <div className="text-right" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: faint, lineHeight: 1.6 }}>
          THU · 9 APR 2026<br/>
          FIRST PITCH 7:05 P.M.<br/>
          ATT. 18,402 · T 3:02<br/>
          WX · 54°F, WIND SSW 8MPH
        </div>
      </div>

      {/* Teams headline */}
      <div className="flex items-center justify-between mt-8 mb-6">
        <div>
          <div className="uppercase tracking-[0.25em]" style={{ fontSize: 14, color: faint, fontFamily: "'JetBrains Mono', monospace" }}>Visitors</div>
          <div style={{ fontWeight: 900, fontSize: 44, letterSpacing: "-0.01em" }}>BROOKLYN LARKS</div>
          <div style={{ fontStyle: "italic", fontSize: 16, color: faint }}>record 7–4 · east division</div>
        </div>
        <div className="text-center px-10" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          <div style={{ fontSize: 12, color: faint, letterSpacing: "0.3em" }}>AT</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>SUNSET FIELD</div>
          <div style={{ fontSize: 12, color: faint, marginTop: 2 }}>CHICAGO, ILL.</div>
        </div>
        <div className="text-right">
          <div className="uppercase tracking-[0.25em]" style={{ fontSize: 14, color: faint, fontFamily: "'JetBrains Mono', monospace" }}>Home</div>
          <div style={{ fontWeight: 900, fontSize: 44, letterSpacing: "-0.01em" }}>CHICAGO DRAYS</div>
          <div style={{ fontStyle: "italic", fontSize: 16, color: faint }}>record 6–5 · central division</div>
        </div>
      </div>

      {/* Linescore */}
      <div className="mb-10 p-6" style={{ border: `2px solid ${ink}`, background: "rgba(0,0,0,0.02)" }}>
        <div className="uppercase tracking-[0.3em] mb-3" style={{ fontSize: 12, color: faint, fontFamily: "'JetBrains Mono', monospace" }}>Line Score</div>
        <Linescore/>
      </div>

      {/* Lineups */}
      <div className="grid grid-cols-2 gap-10 mb-10">
        <Lineup title="BROOKLYN LARKS — BATTING" rows={larksLineup}/>
        <Lineup title="CHICAGO DRAYS — BATTING" rows={draysLineup}/>
      </div>

      {/* Pitching */}
      <div className="grid grid-cols-2 gap-10 mb-10">
        <Pitching title="LARKS PITCHING" rows={larksPitchers}/>
        <Pitching title="DRAYS PITCHING" rows={draysPitchers}/>
      </div>

      {/* Notes */}
      <div className="grid grid-cols-3 gap-8 pt-6" style={{ borderTop: `2px solid ${ink}`, fontSize: 14 }}>
        <div>
          <div className="uppercase tracking-[0.25em] font-bold mb-2" style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>2B</div>
          <div style={{ fontStyle: "italic", lineHeight: 1.5 }}>Okafor (4), Nakamura (2), Tanaka (3), Lindqvist (5)</div>
        </div>
        <div>
          <div className="uppercase tracking-[0.25em] font-bold mb-2" style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>HR</div>
          <div style={{ fontStyle: "italic", lineHeight: 1.5 }}>Nakamura (3), off Weatherall, 7th, 2 on · Lindqvist (4), off Vandermeer, 5th, 1 on</div>
        </div>
        <div>
          <div className="uppercase tracking-[0.25em] font-bold mb-2" style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>E</div>
          <div style={{ fontStyle: "italic", lineHeight: 1.5 }}>Alarcón (2, throwing) · Fairweather (3, fielding), Oduya (1, throwing)</div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-10 pt-4" style={{ borderTop: `1px solid ${ink}55`, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: faint, letterSpacing: "0.2em" }}>
        <div>UMPIRES · HP ROSALES · 1B CHEN · 2B KOWALSKI · 3B ABERNATHY</div>
        <div>WP VANDERMEER · LP WEATHERALL · SV CALLAHAN (4)</div>
        <div>SCORED BY M. DELACROIX</div>
      </div>
    </div>
  );
}
