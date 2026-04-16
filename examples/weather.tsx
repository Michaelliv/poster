// Weather hero — glass card on a painted sky. 1400×900.

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { ComponentType } from "react";
import {
  CloudDrizzleIcon,
  CloudIcon,
  CloudSunIcon,
  DropletIcon,
  type LucideProps,
  MoonIcon,
  SunIcon,
  WindIcon,
} from "lucide-react";

type Icon = ComponentType<LucideProps>;

const hourly = Array.from({ length: 24 }, (_, i) => ({
  h: i,
  t: Math.round(14 + 8 * Math.sin(((i - 6) / 24) * Math.PI * 2) + Math.random() * 1.2),
}));

const week = [
  { d: "Today", hi: 24, lo: 14, icon: SunIcon, pop: 5 },
  { d: "Tue", hi: 22, lo: 13, icon: CloudSunIcon, pop: 10 },
  { d: "Wed", hi: 19, lo: 12, icon: CloudIcon, pop: 30 },
  { d: "Thu", hi: 17, lo: 11, icon: CloudDrizzleIcon, pop: 70 },
  { d: "Fri", hi: 20, lo: 12, icon: CloudSunIcon, pop: 20 },
  { d: "Sat", hi: 23, lo: 13, icon: SunIcon, pop: 5 },
  { d: "Sun", hi: 25, lo: 14, icon: SunIcon, pop: 0 },
];

export default function Weather() {
  return (
    <div
      className="w-[1400px] p-10"
      style={{
        background:
          "linear-gradient(160deg, #f0abfc 0%, #818cf8 35%, #22d3ee 75%, #0ea5e9 100%)",
        fontFamily: "Inter, system-ui",
      }}
    >
      {/* glass card */}
      <div
        className="mx-auto h-full max-w-6xl overflow-hidden rounded-[32px] border border-white/30 p-10 text-white shadow-2xl backdrop-blur-2xl"
        style={{ background: "rgba(255,255,255,0.12)" }}
      >
        {/* header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[15px] font-semibold uppercase tracking-[0.25em] text-white/70">
              Monday · Apr 16
            </div>
            <div className="mt-1 text-3xl font-semibold">Lisbon, Portugal</div>
            <div className="text-sm text-white/70">Estrela · 38.72°N, 9.15°W</div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[15px] font-medium">
            <SunIcon className="h-4 w-4" /> Sunny · Feels like 22°
          </div>
        </div>

        {/* hero temp */}
        <div className="mt-8 flex items-end gap-8">
          <div className="flex items-start gap-2">
            <div className="text-[180px] font-extralight leading-none tabular-nums tracking-tighter">
              24
            </div>
            <div className="mt-6 text-5xl font-light">°</div>
          </div>
          <div className="mb-6 flex gap-6 text-sm">
            <Stat icon={DropletIcon} label="Humidity" value="42%" />
            <Stat icon={WindIcon} label="Wind" value="12 km/h NW" />
            <Stat icon={SunIcon} label="UV" value="6 · High" />
            <Stat icon={MoonIcon} label="Sunset" value="20:34" />
          </div>
        </div>

        {/* hourly temperature curve */}
        <div className="mt-8">
          <div className="mb-2 text-[14px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Next 24 hours
          </div>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourly} margin={{ top: 20, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="w-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fef3c7" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#fef3c7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="h"
                  tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 13 }}
                  tickLine={false}
                  axisLine={false}
                  interval={2}
                  tickFormatter={(v) => `${v}:00`}
                />
                <YAxis hide domain={["dataMin - 2", "dataMax + 4"]} />
                <Area
                  type="monotone"
                  dataKey="t"
                  stroke="#fef3c7"
                  strokeWidth={2.5}
                  fill="url(#w-fill)"
                  label={({ x, y, value, index }) =>
                    index % 3 === 0 ? (
                      <text
                        x={x}
                        y={y - 8}
                        fill="white"
                        fontSize={13}
                        textAnchor="middle"
                      >
                        {value}°
                      </text>
                    ) : <g />
                  }
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* week */}
        <div className="mt-6 grid grid-cols-7 gap-2">
          {week.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.d}
                className="rounded-2xl border border-white/15 bg-white/[0.08] px-3 py-3 text-center"
              >
                <div className="text-[14px] font-semibold uppercase tracking-wider text-white/70">
                  {d.d}
                </div>
                <Icon className="mx-auto my-2 h-7 w-7 text-white" />
                <div className="text-[14px] text-white/60">
                  <DropletIcon className="mr-0.5 inline h-3 w-3" />
                  {d.pop}%
                </div>
                <div className="mt-1 text-sm tabular-nums">
                  <span className="font-semibold">{d.hi}°</span>
                  <span className="text-white/50"> {d.lo}°</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: Icon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-white/70" />
      <div>
        <div className="text-[14px] uppercase tracking-wider text-white/60">
          {label}
        </div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}
