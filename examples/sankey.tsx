import React from "react";

export default function SankeyPoster() {
  const W = 1600;
  const H = 1220;

  const sources = [
    { name: "Enterprise SaaS", sub: "Annual contracts · 48 accounts", value: 5.4, color: "#a855f7" },
    { name: "SMB Subscriptions", sub: "Self-serve · 3,182 seats", value: 3.0, color: "#c026d3" },
    { name: "Professional Services", sub: "Implementation & training", value: 1.8, color: "#ec4899" },
    { name: "Marketplace Fees", sub: "15% take rate on partner apps", value: 1.2, color: "#f472b6" },
    { name: "API Usage", sub: "Metered · pay-as-you-go", value: 0.6, color: "#fb7185" },
  ];
  const costs = [
    { name: "Engineering Salaries", sub: "42 FTE · fully loaded", value: 4.2, color: "#f97316", kind: "cost" },
    { name: "Sales & Marketing", sub: "Quota + paid acquisition", value: 2.6, color: "#fb923c", kind: "cost" },
    { name: "Cloud Infrastructure", sub: "AWS + Snowflake + CDN", value: 1.1, color: "#fbbf24", kind: "cost" },
    { name: "G&A / Leadership", sub: "Finance · People · Exec", value: 0.9, color: "#facc15", kind: "cost" },
    { name: "Customer Success", sub: "CSMs + Support tier", value: 0.7, color: "#fde047", kind: "cost" },
    { name: "R&D Tooling", sub: "Licenses · AI credits", value: 0.5, color: "#fca5a5", kind: "cost" },
    { name: "Office & Ops", sub: "Lisbon HQ + remote stipends", value: 0.4, color: "#f87171", kind: "cost" },
    { name: "Legal & Compliance", sub: "SOC 2 · GDPR · counsel", value: 0.3, color: "#ef4444", kind: "cost" },
    { name: "Net Income", sub: "Reinvested into runway", value: 1.3, color: "#10b981", kind: "profit" },
  ];

  const total = 12.0;
  const yTop = 210;
  const flowH = 860;
  const gap = 6;

  let y = yTop;
  const srcNodes = sources.map((s) => {
    const h = (s.value / total) * flowH;
    const node = { ...s, yTop: y, yBot: y + h, h };
    y += h + gap;
    return node;
  });

  let yL = yTop;
  const hubLeft = sources.map((s) => {
    const h = (s.value / total) * flowH;
    const seg = { yTop: yL, yBot: yL + h };
    yL += h;
    return seg;
  });
  const hubTop = yTop;
  const hubBot = yL;

  let yR = yTop;
  const hubRight = costs.map((c) => {
    const h = (c.value / total) * flowH;
    const seg = { yTop: yR, yBot: yR + h };
    yR += h;
    return seg;
  });

  let yc = yTop;
  const costNodes = costs.map((c) => {
    const h = (c.value / total) * flowH;
    const node = { ...c, yTop: yc, yBot: yc + h, h };
    yc += h + gap;
    return node;
  });

  const X_SRC_LABEL_R = 340;
  const X_SRC = 356;
  const X_SRC_END = 372;
  const X_HUB = 790;
  const X_HUB_END = 830;
  const X_COST = 1248;
  const X_COST_END = 1264;
  const X_COST_LABEL_L = 1280;

  function ribbon(x1: number, y1t: number, y1b: number, x2: number, y2t: number, y2b: number) {
    const xc = x1 + (x2 - x1) * 0.5;
    return `M ${x1} ${y1t} C ${xc} ${y1t}, ${xc} ${y2t}, ${x2} ${y2t} L ${x2} ${y2b} C ${xc} ${y2b}, ${xc} ${y1b}, ${x1} ${y1b} Z`;
  }

  const fmt = (v: number) => (v >= 1 ? `$${v.toFixed(1)}M` : `$${(v * 1000).toFixed(0)}K`);

  return (
    <div
      className="relative text-white w-[1600px] h-[1220px] overflow-hidden"
      style={{
        background:
          "radial-gradient(900px 600px at 8% -10%, rgba(168,85,247,0.22), transparent 60%), radial-gradient(900px 600px at 92% 110%, rgba(249,115,22,0.18), transparent 60%), #07060d",
        fontFamily: "'Inter', system-ui",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 20% 30%, white 0, white 1px, transparent 1px, transparent 4px)",
        }}
      />

      <header className="flex items-end justify-between px-14 pt-12">
        <div>
          <div className="text-[14px] font-bold uppercase tracking-[0.4em] text-white/50">
            Nebula Labs · FY2025 · Financials
          </div>
          <h1 className="mt-3 text-[64px] font-black tracking-tight leading-[0.95]">
            Where twelve million{" "}
            <em
              className="italic font-normal"
              style={{
                fontFamily: "'Source Serif 4', serif",
                background:
                  "linear-gradient(180deg,#fef3c7 0%,#f472b6 55%,#a855f7 100%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              flowed.
            </em>
          </h1>
          <div className="mt-3 text-[15px] text-white/55 max-w-2xl">
            Every dollar of revenue traced from the line of business that booked
            it, through the general ledger, into the cost center that consumed it —
            with net income carried forward into 2026 runway.
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[14px] text-white/60"
            style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
          >
            audited · 14 Apr 2026
          </div>
          <div className="text-[14px] uppercase tracking-[0.3em] text-white/40">
            Total revenue
          </div>
          <div className="text-5xl font-black tabular-nums">$12.0M</div>
          <div className="text-[14px] text-emerald-400 tabular-nums">
            +38.6% YoY · Net margin 10.8%
          </div>
        </div>
      </header>

      <div className="absolute left-0 right-0 px-14" style={{ top: 182 }}>
        <div className="relative flex justify-between">
          <div className="text-[14px] font-bold uppercase tracking-[0.35em] text-white/45">
            Revenue streams · 5
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 text-[14px] font-bold uppercase tracking-[0.35em] text-white/45">
            Consolidated P&amp;L
          </div>
          <div className="text-[14px] font-bold uppercase tracking-[0.35em] text-white/45">
            Allocations · 8 cost centers + net
          </div>
        </div>
      </div>

      <svg width={W} height={H} className="absolute left-0 top-0 pointer-events-none">
        <defs>
          {srcNodes.map((s, i) => (
            <linearGradient key={`gsrc${i}`} id={`gsrc${i}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={s.color} stopOpacity={0.78} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0.32} />
            </linearGradient>
          ))}
          {costNodes.map((c, i) => (
            <linearGradient key={`gcst${i}`} id={`gcst${i}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={c.color} stopOpacity={0.32} />
              <stop offset="100%" stopColor={c.color} stopOpacity={0.82} />
            </linearGradient>
          ))}
          <linearGradient id="hubGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="55%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>

        {srcNodes.map((s, i) => {
          const hl = hubLeft[i];
          return (
            <path
              key={`rsrc${i}`}
              d={ribbon(X_SRC_END, s.yTop, s.yBot, X_HUB, hl.yTop, hl.yBot)}
              fill={`url(#gsrc${i})`}
            />
          );
        })}

        {costNodes.map((c, i) => {
          const hr = hubRight[i];
          return (
            <path
              key={`rcst${i}`}
              d={ribbon(X_HUB_END, hr.yTop, hr.yBot, X_COST, c.yTop, c.yBot)}
              fill={`url(#gcst${i})`}
            />
          );
        })}

        {srcNodes.map((s, i) => (
          <g key={`nsrc${i}`}>
            <rect
              x={X_SRC}
              y={s.yTop}
              width={X_SRC_END - X_SRC}
              height={s.h}
              fill={s.color}
              style={{ filter: `drop-shadow(0 0 10px ${s.color}66)` }}
            />
            <text x={X_SRC_LABEL_R - 4} y={s.yTop + s.h / 2 - 6} textAnchor="end" fill="white" fontSize="17" fontWeight="700">
              {s.name}
            </text>
            <text x={X_SRC_LABEL_R - 4} y={s.yTop + s.h / 2 + 14} textAnchor="end" fill="rgba(255,255,255,0.55)" fontSize="14">
              {s.sub}
            </text>
            <text
              x={X_SRC_LABEL_R - 4}
              y={s.yTop + s.h / 2 + 34}
              textAnchor="end"
              fill={s.color}
              fontSize="15"
              fontWeight="700"
              style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
            >
              {fmt(s.value)} · {((s.value / total) * 100).toFixed(1)}%
            </text>
          </g>
        ))}

        <rect
          x={X_HUB}
          y={hubTop}
          width={X_HUB_END - X_HUB}
          height={hubBot - hubTop}
          fill="url(#hubGrad)"
          style={{ filter: "drop-shadow(0 0 18px rgba(168,85,247,0.55))" }}
        />
        <text
          x={(X_HUB + X_HUB_END) / 2}
          y={hubTop - 18}
          textAnchor="middle"
          fill="white"
          fontSize="18"
          fontWeight="800"
          style={{ letterSpacing: "0.25em" }}
        >
          GROSS REVENUE
        </text>
        <text
          x={(X_HUB + X_HUB_END) / 2}
          y={hubBot + 30}
          textAnchor="middle"
          fill="white"
          fontSize="20"
          fontWeight="900"
          style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
        >
          $12,000,000
        </text>

        {costNodes.map((c, i) => (
          <g key={`ncst${i}`}>
            <rect
              x={X_COST}
              y={c.yTop}
              width={X_COST_END - X_COST}
              height={c.h}
              fill={c.color}
              style={{ filter: `drop-shadow(0 0 10px ${c.color}66)` }}
            />
            <text x={X_COST_LABEL_L} y={c.yTop + c.h / 2 - 6} fill="white" fontSize="17" fontWeight="700">
              {c.name}
              {c.kind === "profit" ? (
                <tspan fill="#10b981" fontSize="13" fontWeight="800" dx="10" style={{ letterSpacing: "0.2em" }}>
                  NET PROFIT
                </tspan>
              ) : null}
            </text>
            <text x={X_COST_LABEL_L} y={c.yTop + c.h / 2 + 14} fill="rgba(255,255,255,0.55)" fontSize="14">
              {c.sub}
            </text>
            <text
              x={X_COST_LABEL_L}
              y={c.yTop + c.h / 2 + 34}
              fill={c.color}
              fontSize="15"
              fontWeight="700"
              style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
            >
              {fmt(c.value)} · {((c.value / total) * 100).toFixed(1)}%
            </text>
          </g>
        ))}
      </svg>

      <footer
        className="absolute left-14 right-14 flex items-center justify-between border-t border-white/10 pt-4 text-[14px] text-white/45"
        style={{ bottom: 28, fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
      >
        <span>Nebula Labs · Annual Report · FY2025</span>
        <span>Total in $12.00M · OpEx $10.70M · Net $1.30M</span>
        <span>nebula.dev/investors · page 04</span>
      </footer>
    </div>
  );
}
