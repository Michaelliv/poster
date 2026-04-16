// A single-poster showcase — multiple Recharts visualizations at once,
// dark theme with gradients, designed to render at 1600×1000.

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import {
  ActivityIcon,
  BoltIcon,
  GlobeIcon,
  SparklesIcon,
  TrendingUpIcon,
  ZapIcon,
} from "lucide-react";

// ---------- data ----------

const revenue = Array.from({ length: 48 }, (_, i) => {
  const t = i / 47;
  const base = 40 + 60 * Math.sin(t * Math.PI * 1.5) + t * 80;
  return {
    w: `W${i + 1}`,
    revenue: Math.round(base + Math.sin(i * 0.8) * 6),
    forecast: Math.round(base + 12 + Math.cos(i * 0.6) * 4),
  };
});

const radial = [
  { name: "Engagement", value: 92, fill: "url(#g-cyan)" },
  { name: "Retention", value: 78, fill: "url(#g-violet)" },
  { name: "Activation", value: 64, fill: "url(#g-amber)" },
  { name: "Referrals", value: 47, fill: "url(#g-rose)" },
];

const radar = [
  { metric: "Speed", A: 92, B: 78 },
  { metric: "Quality", A: 88, B: 82 },
  { metric: "Cost", A: 64, B: 90 },
  { metric: "Scale", A: 95, B: 70 },
  { metric: "Safety", A: 81, B: 85 },
  { metric: "DX", A: 90, B: 66 },
];

const scatter = Array.from({ length: 42 }, (_, i) => ({
  x: Math.round(20 + Math.random() * 80),
  y: Math.round(10 + Math.random() * 90),
  z: Math.round(60 + Math.random() * 240),
  g: i % 3,
}));

const stacked = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => ({
  day: d,
  api: Math.round(40 + Math.random() * 60),
  web: Math.round(30 + Math.random() * 50),
  mobile: Math.round(20 + Math.random() * 40),
}));

const spark = Array.from({ length: 32 }, (_, i) => ({
  i,
  v: 50 + Math.sin(i * 0.6) * 18 + Math.random() * 6,
}));

// ---------- atoms ----------

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur ${className}`}
      style={{
        boxShadow:
          "inset 0 1px 0 0 rgba(255,255,255,0.04), 0 20px 40px -24px rgba(0,0,0,0.6)",
      }}
    >
      {children}
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  delta,
  tone,
}: {
  icon: typeof BoltIcon;
  label: string;
  value: string;
  delta: string;
  tone: string;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: tone }}
        >
          <Icon className="h-4 w-4 text-white" />
        </div>
        <span className="text-[14px] font-medium text-emerald-400">{delta}</span>
      </div>
      <div className="mt-4 text-[14px] uppercase tracking-wider text-white/40">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold text-white tabular-nums">
        {value}
      </div>
    </Card>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  hint,
}: {
  icon: typeof BoltIcon;
  title: string;
  hint: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-white/60" />
      <div className="text-[14px] font-semibold uppercase tracking-wider text-white/70">
        {title}
      </div>
      <div className="text-[14px] text-white/30">· {hint}</div>
    </div>
  );
}

// ---------- poster ----------

export default function Showcase() {
  return (
    <div
      className="w-[1600px] px-10 py-8 text-white"
      style={{
        background:
          "radial-gradient(1200px 600px at 85% -10%, rgba(139,92,246,0.18), transparent 60%), radial-gradient(900px 500px at -5% 110%, rgba(34,211,238,0.14), transparent 60%), #0a0a0f",
        fontFamily: "Inter, ui-sans-serif, system-ui",
      }}
    >
      {/* shared gradient defs */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="g-cyan" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="g-violet" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="g-amber" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="g-rose" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
          <linearGradient id="fill-rev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.55} />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fill-fc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>

      {/* header */}
      <header className="mb-8 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 text-[14px] font-medium uppercase tracking-[0.2em] text-white/40">
            <SparklesIcon className="h-3 w-3" /> Poster · Showcase
          </div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Nebula <span className="text-white/40">— Q4 pulse</span>
          </h1>
          <p className="mt-1 text-sm text-white/50">
            A single .tsx file. Rendered headless. Exported to PNG.
          </p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[14px] text-white/60">
          Live · generated {new Date().toISOString().slice(0, 10)}
        </div>
      </header>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        <Kpi
          icon={TrendingUpIcon}
          label="ARR"
          value="$14.8M"
          delta="+18.4%"
          tone="linear-gradient(135deg,#22d3ee,#3b82f6)"
        />
        <Kpi
          icon={BoltIcon}
          label="Active users"
          value="284,921"
          delta="+6.1%"
          tone="linear-gradient(135deg,#a78bfa,#7c3aed)"
        />
        <Kpi
          icon={ActivityIcon}
          label="p95 latency"
          value="142 ms"
          delta="-12 ms"
          tone="linear-gradient(135deg,#fbbf24,#f97316)"
        />
        <Kpi
          icon={GlobeIcon}
          label="Regions live"
          value="27"
          delta="+3"
          tone="linear-gradient(135deg,#fb7185,#e11d48)"
        />
      </div>

      {/* main grid */}
      <div className="mt-4 grid grid-cols-6 gap-4">
        {/* revenue area — spans 4 */}
        <Card className="col-span-4">
          <SectionTitle
            icon={TrendingUpIcon}
            title="Revenue vs Forecast"
            hint="48 weeks"
          />
          <div className="h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenue} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="w"
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 13 }}
                  tickLine={false}
                  axisLine={false}
                  interval={5}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 13 }}
                  tickLine={false}
                  axisLine={false}
                  width={40}
                  domain={[0, 160]}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0f0f17",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="forecast"
                  stroke="#a78bfa"
                  strokeDasharray="4 3"
                  strokeWidth={1.5}
                  fill="url(#fill-fc)"
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22d3ee"
                  strokeWidth={2}
                  fill="url(#fill-rev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* radial — spans 2 */}
        <Card className="col-span-2">
          <SectionTitle icon={ZapIcon} title="North-star metrics" hint="targets" />
          <div className="h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                data={radial}
                innerRadius="28%"
                outerRadius="100%"
                startAngle={90}
                endAngle={-270}
                barSize={12}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar
                  dataKey="value"
                  cornerRadius={8}
                  background={{ fill: "rgba(255,255,255,0.04)" }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1 text-[14px]">
            {radial.map((r, i) => (
              <div key={r.name} className="flex items-center gap-2 text-white/60">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: ["#22d3ee", "#a78bfa", "#fbbf24", "#fb7185"][i],
                  }}
                />
                {r.name} <span className="ml-auto tabular-nums text-white/90">{r.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* radar — spans 2 */}
        <Card className="col-span-2">
          <SectionTitle icon={SparklesIcon} title="Capability map" hint="vs peer" />
          <div className="h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radar} outerRadius="78%">
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 13 }}
                />
                <Radar dataKey="B" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.15} />
                <Radar dataKey="A" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* scatter — spans 2 */}
        <Card className="col-span-2">
          <SectionTitle icon={ActivityIcon} title="Cohort spread" hint="retention × revenue" />
          <div className="h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  type="number"
                  dataKey="x"
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 13 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 13 }}
                  tickLine={false}
                  axisLine={false}
                  width={28}
                />
                <ZAxis type="number" dataKey="z" range={[30, 280]} />
                <Scatter data={scatter}>
                  {scatter.map((s, i) => (
                    <Cell
                      key={i}
                      fill={["#22d3ee", "#a78bfa", "#fbbf24"][s.g]}
                      fillOpacity={0.7}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* stacked bars — spans 2 */}
        <Card className="col-span-2">
          <SectionTitle icon={BoltIcon} title="Traffic mix" hint="this week" />
          <div className="h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stacked} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 13 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 13 }}
                  tickLine={false}
                  axisLine={false}
                  width={28}
                />
                <Bar dataKey="api" stackId="a" fill="#22d3ee" radius={[0, 0, 0, 0]} />
                <Bar dataKey="web" stackId="a" fill="#a78bfa" />
                <Bar dataKey="mobile" stackId="a" fill="#fbbf24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-1 flex gap-3 text-[14px] text-white/60">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-cyan-400" /> API
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-violet-400" /> Web
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-400" /> Mobile
            </span>
          </div>
        </Card>

        {/* sparkline strip — full width */}
        <Card className="col-span-6">
          <div className="flex items-center justify-between gap-8">
            <div>
              <SectionTitle icon={TrendingUpIcon} title="Edge latency" hint="last 32 hrs" />
              <div className="mt-1 text-4xl font-semibold tabular-nums">
                58<span className="ml-1 text-lg font-normal text-white/40">ms</span>
              </div>
              <div className="mt-3 flex gap-5 text-[14px] text-white/50">
                <span>p50 <span className="text-white/80 tabular-nums">42ms</span></span>
                <span>p95 <span className="text-white/80 tabular-nums">118ms</span></span>
                <span>p99 <span className="text-white/80 tabular-nums">204ms</span></span>
              </div>
            </div>
            <div className="h-[120px] flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spark} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      {/* footer */}
      <footer className="mt-6 flex items-center justify-between text-[14px] text-white/30">
        <span>poster · tsx → html → png · headless chrome</span>
        <span>nebula.dev/pulse</span>
      </footer>
    </div>
  );
}
