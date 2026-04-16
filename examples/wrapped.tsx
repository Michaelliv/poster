// Year-in-review poster, Spotify-Wrapped vibe. Story format 1080×1350.

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { HeadphonesIcon, MusicIcon, PlayIcon, SparklesIcon } from "lucide-react";

const topArtists = [
  { name: "Fred again..", plays: 842, color: "#fbbf24" },
  { name: "Jamie xx", plays: 611, color: "#f472b6" },
  { name: "Floating Points", plays: 488, color: "#a78bfa" },
  { name: "Four Tet", plays: 402, color: "#34d399" },
  { name: "Overmono", plays: 361, color: "#22d3ee" },
];

const months = [
  { m: "Jan", h: 24 },
  { m: "Feb", h: 28 },
  { m: "Mar", h: 31 },
  { m: "Apr", h: 40 },
  { m: "May", h: 48 },
  { m: "Jun", h: 62 },
  { m: "Jul", h: 71 },
  { m: "Aug", h: 58 },
  { m: "Sep", h: 44 },
  { m: "Oct", h: 52 },
  { m: "Nov", h: 60 },
  { m: "Dec", h: 68 },
];

export default function Wrapped() {
  const maxPlays = topArtists[0].plays;
  return (
    <div
      className="relative w-[1080px] overflow-hidden px-10 py-12 text-white"
      style={{
        background:
          "radial-gradient(ellipse at top, #7c3aed 0%, #ec4899 40%, #f97316 75%, #fbbf24 100%)",
        fontFamily: "Inter, system-ui",
      }}
    >
      {/* grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 20% 30%, white 0, white 1px, transparent 1px, transparent 4px)",
        }}
      />

      {/* tiny header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[15px] font-bold uppercase tracking-[0.3em]">
          <SparklesIcon className="h-4 w-4" /> Your 2025, Wrapped
        </div>
        <div className="rounded-full bg-black/20 px-3 py-1 text-[14px] font-medium backdrop-blur">
          @you
        </div>
      </div>

      {/* hero numbers */}
      <div className="mt-10">
        <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/80">
          You listened to
        </div>
        <div
          className="mt-2 font-black leading-[0.82] tracking-tighter tabular-nums"
          style={{ fontSize: 220 }}
        >
          586
        </div>
        <div className="mt-1 text-3xl font-bold">hours of music</div>
        <div className="mt-1 text-lg text-white/80">
          That's longer than 83% of listeners in Portugal.
        </div>
      </div>

      {/* top artists */}
      <div className="mt-10">
        <div className="mb-3 flex items-center gap-2 text-[15px] font-bold uppercase tracking-[0.25em] text-white/90">
          <MusicIcon className="h-3.5 w-3.5" /> Top artists
        </div>
        <div className="space-y-2">
          {topArtists.map((a, i) => (
            <div key={a.name} className="flex items-center gap-3">
              <div className="w-6 text-lg font-black tabular-nums text-white/60">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-lg font-bold">{a.name}</span>
                  <span className="text-[15px] font-semibold tabular-nums text-white/70">
                    {a.plays.toLocaleString()} plays
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-black/25">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(a.plays / maxPlays) * 100}%`,
                      background: a.color,
                      boxShadow: `0 0 16px ${a.color}`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* monthly rhythm */}
      <div className="mt-10">
        <div className="mb-2 flex items-center gap-2 text-[15px] font-bold uppercase tracking-[0.25em] text-white/90">
          <HeadphonesIcon className="h-3.5 w-3.5" /> Monthly rhythm
        </div>
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={months} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <YAxis hide />
              <Bar dataKey="h" radius={[6, 6, 0, 0]}>
                {months.map((_, i) => (
                  <Cell key={i} fill="rgba(255,255,255,0.92)" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-1 flex justify-between text-[14px] font-semibold uppercase tracking-wider text-white/70">
          {months.map((m) => (
            <span key={m.m}>{m.m}</span>
          ))}
        </div>
      </div>

      {/* top song */}
      <div className="mt-8 flex items-center gap-4 rounded-3xl bg-black/25 p-5 backdrop-blur">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
          style={{ background: "linear-gradient(135deg,#fbbf24,#f472b6)" }}
        >
          <PlayIcon className="h-7 w-7 fill-white text-white" />
        </div>
        <div className="flex-1">
          <div className="text-[14px] font-bold uppercase tracking-[0.2em] text-white/70">
            Most-played song
          </div>
          <div className="text-xl font-bold">Delilah (pull me out of this)</div>
          <div className="text-sm text-white/70">Fred again.. · 142 plays</div>
        </div>
      </div>

      <div className="mt-10 text-center text-[14px] font-semibold uppercase tracking-[0.35em] text-white/60">
        #wrapped2025
      </div>
    </div>
  );
}
