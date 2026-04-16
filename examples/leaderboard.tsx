import React from "react";
import { Star, TrendingUp, Flame } from "lucide-react";

const rows = [
  { rank: 1, name: "vercel/next.js", stars: 128420, lang: "TypeScript", delta: 2841, color: "#60a5fa" },
  { rank: 2, name: "sora-labs/sora-ui", stars: 48213, lang: "TypeScript", delta: 2412, color: "#60a5fa" },
  { rank: 3, name: "ollama/ollama", stars: 94112, lang: "Go", delta: 2105, color: "#22d3ee" },
  { rank: 4, name: "astral-sh/uv", stars: 36840, lang: "Rust", delta: 1978, color: "#f97316" },
  { rank: 5, name: "tldraw/tldraw", stars: 39210, lang: "TypeScript", delta: 1644, color: "#60a5fa" },
  { rank: 6, name: "huggingface/transformers", stars: 134520, lang: "Python", delta: 1502, color: "#facc15" },
  { rank: 7, name: "denoland/deno", stars: 97012, lang: "Rust", delta: 1388, color: "#f97316" },
  { rank: 8, name: "pola-rs/polars", stars: 31290, lang: "Rust", delta: 1201, color: "#f97316" },
  { rank: 9, name: "bun-sh/bun", stars: 75410, lang: "Zig", delta: 1147, color: "#fbbf24" },
  { rank: 10, name: "ggerganov/llama.cpp", stars: 68904, lang: "C++", delta: 1033, color: "#a78bfa" },
];

const fmt = (n: number) => n.toLocaleString("en-US");

export default function Poster() {
  const max = rows[0].delta;
  return (
    <div
      className="w-[1400px] p-14"
      style={{
        fontFamily: "Inter, sans-serif",
        background:
          "radial-gradient(900px 600px at 92% -10%, rgba(236,72,153,0.18), transparent 60%), radial-gradient(800px 500px at -5% 110%, rgba(139,92,246,0.22), transparent 60%), #08080c",
        color: "white",
      }}
    >
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/50 mb-4">
            The Pulse · Vol. VII · Open Source
          </div>
          <h1 className="text-[84px] leading-[0.95] font-bold tracking-tight">
            Top 10{" "}
            <span
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontStyle: "italic",
                backgroundImage: "linear-gradient(180deg,#fef3c7,#f472b6,#a855f7)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              rising
            </span>{" "}
            repos
          </h1>
          <div className="mt-4 text-[18px] text-white/60">
            Ranked by stars gained · week of Monday, 13 April 2026
          </div>
        </div>
        <div
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2"
          style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.05), 0 20px 40px -24px rgba(0,0,0,0.6)" }}
        >
          <Flame size={16} className="text-orange-400" />
          <span className="text-[14px] font-semibold tracking-wide">LIVE · updated 04:12 UTC</span>
        </div>
      </div>

      <div
        className="grid items-center px-5 pb-3 text-[14px] font-bold uppercase tracking-[0.22em] text-white/40"
        style={{ gridTemplateColumns: "60px 1.4fr 1fr 160px 180px" }}
      >
        <div>#</div>
        <div>Project</div>
        <div>Stars gained</div>
        <div>Language</div>
        <div className="text-right">Total stars</div>
      </div>

      <div className="flex flex-col gap-2">
        {rows.map((r) => (
          <div
            key={r.rank}
            className="grid items-center rounded-2xl border border-white/[0.06] bg-white/[0.03] px-5 py-4"
            style={{
              gridTemplateColumns: "60px 1.4fr 1fr 160px 180px",
              boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.04), 0 20px 40px -24px rgba(0,0,0,0.6)",
            }}
          >
            <div
              className="text-[32px] font-bold tabular-nums"
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontStyle: "italic",
                color: r.rank <= 3 ? "#fbbf24" : "rgba(255,255,255,0.35)",
              }}
            >
              {String(r.rank).padStart(2, "0")}
            </div>
            <div className="text-[22px] font-semibold tracking-tight" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {r.name}
            </div>
            <div className="flex items-center gap-3 pr-6">
              <div className="flex-1 h-2 rounded-full bg-white/[0.05] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(r.delta / max) * 100}%`,
                    background: "linear-gradient(90deg, #a855f7 0%, #ec4899 60%, #f59e0b 100%)",
                  }}
                />
              </div>
              <div className="flex items-center gap-1 text-[16px] font-semibold tabular-nums text-emerald-300">
                <TrendingUp size={14} />+{fmt(r.delta)}
              </div>
            </div>
            <div className="flex items-center gap-2 text-[15px] text-white/70">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} />
              {r.lang}
            </div>
            <div className="flex items-center justify-end gap-2 text-[18px] font-semibold tabular-nums text-white/90">
              <Star size={15} className="text-amber-300" fill="#fbbf24" />
              {fmt(r.stars)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between text-[14px] text-white/40">
        <div>Source · GitHub public events · sampled hourly, normalized for bot activity</div>
        <div className="tracking-[0.25em] uppercase font-semibold">pulse.dev / weekly</div>
      </div>
    </div>
  );
}
