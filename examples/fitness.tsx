// Fitness dashboard — activity rings + workout history. 1400×900.

import type { ComponentType } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  type LucideProps,
  ActivityIcon,
  DumbbellIcon,
  FlameIcon,
  FootprintsIcon,
  HeartIcon,
  MoonIcon,
  TimerIcon,
  TrophyIcon,
} from "lucide-react";

type Icon = ComponentType<LucideProps>;

// ---------- rings ----------

const rings = [
  { label: "Move", value: 742, goal: 600, unit: "cal", color: "#fb2d5b", icon: FlameIcon },
  { label: "Exercise", value: 42, goal: 30, unit: "min", color: "#a3e635", icon: ActivityIcon },
  { label: "Stand", value: 11, goal: 12, unit: "hrs", color: "#22d3ee", icon: HeartIcon },
] as const;

function Ring({ ring, size = 200 }: { ring: (typeof rings)[number]; size?: number }) {
  const stroke = 18;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(ring.value / ring.goal, 1.4);
  const Icon = ring.icon;
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={ring.color}
            strokeOpacity={0.15}
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={ring.color}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct)}
            style={{ filter: `drop-shadow(0 0 8px ${ring.color}99)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className="h-6 w-6" style={{ color: ring.color }} />
          <div className="mt-1 text-2xl font-bold tabular-nums text-white">
            {Math.round(pct * 100)}%
          </div>
        </div>
      </div>
      <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
        {ring.label}
      </div>
      <div className="text-[12px] tabular-nums text-white/80">
        {ring.value} / {ring.goal} {ring.unit}
      </div>
    </div>
  );
}

// ---------- data ----------

const hr = Array.from({ length: 96 }, (_, i) => {
  const t = i / 96;
  const base = 62 + 40 * Math.max(0, Math.sin((t - 0.35) * Math.PI * 3));
  return { i, bpm: Math.round(base + Math.random() * 4) };
});

const week = [
  { d: "Mon", m: 38 },
  { d: "Tue", m: 52 },
  { d: "Wed", m: 24 },
  { d: "Thu", m: 61 },
  { d: "Fri", m: 0 },
  { d: "Sat", m: 78 },
  { d: "Sun", m: 42 },
];

// ---------- atoms ----------

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl border border-white/[0.06] bg-white/[0.03] p-5 ${className}`}
      style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.04)" }}
    >
      {children}
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  unit,
  color,
}: {
  icon: Icon;
  label: string;
  value: string;
  unit: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-2xl"
        style={{ background: `${color}22`, color }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-white/50">
          {label}
        </div>
        <div className="text-xl font-semibold tabular-nums">
          {value} <span className="text-sm font-normal text-white/50">{unit}</span>
        </div>
      </div>
    </div>
  );
}

// ---------- poster ----------

export default function Fitness() {
  return (
    <div
      className="min-h-screen px-10 py-8 text-white"
      style={{
        background:
          "radial-gradient(800px 500px at 10% 0%, rgba(251,45,91,0.15), transparent 60%), radial-gradient(700px 400px at 90% 100%, rgba(34,211,238,0.12), transparent 60%), #07080c",
        fontFamily: "Inter, system-ui",
      }}
    >
      {/* header */}
      <header className="mb-6 flex items-end justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50">
            Apr 16 · Tuesday
          </div>
          <h1 className="mt-1 text-3xl font-semibold">Good work, Michael.</h1>
          <p className="text-sm text-white/60">
            You're on a <span className="text-emerald-400">12-day streak</span> —
            longest this year.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px]">
          <TrophyIcon className="h-3.5 w-3.5 text-amber-400" />
          Personal best · 8.4km @ 4:52/km
        </div>
      </header>

      {/* rings + stats */}
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-6">
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Today's rings
          </div>
          <div className="flex items-start justify-around">
            {rings.map((r) => (
              <Ring key={r.label} ring={r} />
            ))}
          </div>
        </Card>

        <Card className="col-span-6 grid grid-cols-2 gap-5">
          <Stat icon={FlameIcon} label="Active energy" value="742" unit="cal" color="#fb2d5b" />
          <Stat icon={FootprintsIcon} label="Steps" value="11,284" unit="steps" color="#a3e635" />
          <Stat icon={TimerIcon} label="Exercise" value="42" unit="min" color="#22d3ee" />
          <Stat icon={HeartIcon} label="Resting HR" value="54" unit="bpm" color="#f472b6" />
          <Stat icon={MoonIcon} label="Sleep" value="7h 42m" unit="" color="#a78bfa" />
          <Stat icon={DumbbellIcon} label="Workouts" value="3" unit="today" color="#fbbf24" />
        </Card>

        {/* heart rate */}
        <Card className="col-span-8">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
              Heart rate · today
            </div>
            <div className="flex gap-4 text-[11px] text-white/50">
              <span>avg <span className="tabular-nums text-white">74 bpm</span></span>
              <span>max <span className="tabular-nums text-white">162 bpm</span></span>
            </div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hr} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="hr-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb2d5b" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#fb2d5b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis
                  dataKey="i"
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${Math.floor((v / 96) * 24)}:00`}
                  interval={11}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  width={32}
                  domain={[40, 180]}
                />
                <Area
                  type="monotone"
                  dataKey="bpm"
                  stroke="#fb2d5b"
                  strokeWidth={1.8}
                  fill="url(#hr-fill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* weekly exercise */}
        <Card className="col-span-4">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
            This week · exercise min
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={week} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="d"
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis hide />
                <Bar dataKey="m" radius={[8, 8, 0, 0]}>
                  {week.map((d, i) => (
                    <Cell key={i} fill={d.m >= 30 ? "#a3e635" : "#a3e63540"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-white/60">
            <span>Goal · 30 min/day</span>
            <span className="text-emerald-400">5 / 7 hit</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
