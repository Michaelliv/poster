import React from "react";

const data = [
  { name: "Helix Robotics", yoy: 312 },
  { name: "Pangea Health", yoy: 214 },
  { name: "Nimbus AI", yoy: 168 },
  { name: "Orbital Freight", yoy: 97 },
  { name: "Cinder Analytics", yoy: 54 },
  { name: "Fernway Studios", yoy: 23 },
  { name: "Lumen Payments", yoy: 8 },
  { name: "Kettle & Co", yoy: -6 },
  { name: "Brackish Media", yoy: -19 },
  { name: "Drayton Leasing", yoy: -34 },
  { name: "Salter Foundry", yoy: -51 },
  { name: "Vellum Books", yoy: -68 },
].sort((a, b) => b.yoy - a.yoy);

const POS_MAX = 312;
const NEG_MAX = 68;
const TOTAL = POS_MAX + NEG_MAX;
const NEG_FRAC = NEG_MAX / TOTAL;
const TRACK_W = 900;
const ZERO_X = TRACK_W * NEG_FRAC;

export default function Poster() {
  const posCount = data.filter((d) => d.yoy > 0).length;
  const negCount = data.filter((d) => d.yoy < 0).length;
  const avg = (data.reduce((s, d) => s + d.yoy, 0) / data.length).toFixed(1);
  const median = (() => {
    const s = [...data.map((d) => d.yoy)].sort((a, b) => a - b);
    return ((s[5] + s[6]) / 2).toFixed(1);
  })();

  return (
    <div
      className="w-[1600px] p-12"
      style={{
        fontFamily: "Inter, sans-serif",
        background:
          "radial-gradient(900px 600px at 92% -5%, rgba(217,70,239,0.16), transparent 60%), radial-gradient(700px 500px at 0% 100%, rgba(139,92,246,0.14), transparent 60%), #0a0a0f",
        color: "white",
      }}
    >
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/50 mb-3">
            Ledger Review · Vol. VII · Portfolio Signals
          </div>
          <div className="text-[64px] leading-[1.05] font-semibold tracking-tight">
            Who grew, who{" "}
            <span
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontStyle: "italic",
                backgroundImage:
                  "linear-gradient(180deg, #fef3c7, #f472b6, #a855f7)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              faltered
            </span>
            .
          </div>
          <div className="text-[18px] text-white/60 mt-3">
            Year-over-year revenue change across twelve seed-to-series-B portfolio companies · FY2025 vs FY2024
          </div>
        </div>
        <div
          className="rounded-full px-4 py-2 text-[14px] font-medium tabular-nums"
          style={{
            background: "rgba(16,185,129,0.12)",
            border: "1px solid rgba(16,185,129,0.3)",
            color: "#6ee7b7",
          }}
        >
          ● Reviewed · 16 Apr 2026
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-10">
        {[
          { k: "Accelerating", v: `${posCount}`, s: "of 12 companies", tone: "#34d399" },
          { k: "Contracting", v: `${negCount}`, s: "of 12 companies", tone: "#f87171" },
          { k: "Portfolio median YoY", v: `${median}%`, s: "weighted equally", tone: "#e5e7eb" },
          { k: "Portfolio mean YoY", v: `${avg}%`, s: "skewed by Helix", tone: "#c4b5fd" },
        ].map((c) => (
          <div
            key={c.k}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5"
            style={{
              boxShadow:
                "inset 0 1px 0 0 rgba(255,255,255,0.04), 0 20px 40px -24px rgba(0,0,0,0.6)",
            }}
          >
            <div className="text-[14px] uppercase tracking-[0.2em] text-white/50 font-semibold">
              {c.k}
            </div>
            <div
              className="text-[44px] font-semibold tabular-nums mt-2"
              style={{ color: c.tone }}
            >
              {c.v}
            </div>
            <div className="text-[14px] text-white/50 mt-1">{c.s}</div>
          </div>
        ))}
      </div>

      <div
        className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8"
        style={{
          boxShadow:
            "inset 0 1px 0 0 rgba(255,255,255,0.04), 0 20px 40px -24px rgba(0,0,0,0.6)",
        }}
      >
        <div className="flex items-center mb-4">
          <div className="w-[220px]" />
          <div className="flex-1 relative h-6 tabular-nums text-[14px] text-white/50">
            {[-68, 0, 75, 150, 225, 312].map((t) => {
              const left = ((t + NEG_MAX) / TOTAL) * 100;
              return (
                <div
                  key={t}
                  className="absolute"
                  style={{
                    left: `${left}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  {t > 0 ? `+${t}%` : `${t}%`}
                </div>
              );
            })}
          </div>
          <div className="w-[100px]" />
        </div>

        <div className="flex flex-col gap-[10px]">
          {data.map((d) => {
            const isPos = d.yoy >= 0;
            const barW = (Math.abs(d.yoy) / TOTAL) * TRACK_W;
            const left = isPos ? ZERO_X : ZERO_X - barW;
            return (
              <div key={d.name} className="flex items-center">
                <div className="w-[220px] text-[15px] text-white/80 pr-4 text-right truncate">
                  {d.name}
                </div>
                <div
                  className="relative"
                  style={{
                    width: TRACK_W,
                    height: 34,
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: 6,
                  }}
                >
                  {[-68, 75, 150, 225, 312].map((t) => {
                    const l = ((t + NEG_MAX) / TOTAL) * TRACK_W;
                    return (
                      <div
                        key={t}
                        className="absolute top-0 bottom-0"
                        style={{
                          left: l,
                          width: 1,
                          background: "rgba(255,255,255,0.04)",
                        }}
                      />
                    );
                  })}
                  <div
                    className="absolute top-[-4px] bottom-[-4px]"
                    style={{
                      left: ZERO_X,
                      width: 2,
                      background: "rgba(255,255,255,0.45)",
                    }}
                  />
                  <div
                    className="absolute top-[4px] bottom-[4px] rounded-[4px]"
                    style={{
                      left,
                      width: Math.max(barW, 2),
                      background: isPos
                        ? "linear-gradient(90deg, #10b981 0%, #34d399 100%)"
                        : "linear-gradient(90deg, #f87171 0%, #ef4444 100%)",
                      boxShadow: isPos
                        ? "0 0 20px -6px rgba(52,211,153,0.5)"
                        : "0 0 20px -6px rgba(248,113,113,0.5)",
                    }}
                  />
                </div>
                <div
                  className="w-[100px] pl-4 text-[15px] font-semibold tabular-nums"
                  style={{ color: isPos ? "#6ee7b7" : "#fca5a5" }}
                >
                  {isPos ? `+${d.yoy}%` : `${d.yoy}%`}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center mt-4">
          <div className="w-[220px]" />
          <div className="relative" style={{ width: TRACK_W, height: 20 }}>
            <div
              className="absolute text-[14px] text-white/60 uppercase tracking-[0.2em] font-semibold"
              style={{ left: ZERO_X, transform: "translateX(-50%)" }}
            >
              0% · flat
            </div>
          </div>
          <div className="w-[100px]" />
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 text-[14px] text-white/40">
        <div>
          Source: portfolio operator filings · unaudited · YoY = (FY2025 net revenue − FY2024) ÷ FY2024
        </div>
        <div className="tabular-nums">Prepared by A. Chen · Analyst Desk</div>
      </div>
    </div>
  );
}
