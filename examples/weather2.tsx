
import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Sun, Cloud, CloudRain, CloudSun, Wind, Droplets, Eye, Thermometer, Sunrise, Sunset } from "lucide-react";

const hourly = [
  { t: "6a", temp: 54 }, { t: "8a", temp: 57 }, { t: "10a", temp: 62 },
  { t: "12p", temp: 67 }, { t: "2p", temp: 71 }, { t: "4p", temp: 72 },
  { t: "6p", temp: 69 }, { t: "8p", temp: 64 }, { t: "10p", temp: 59 }, { t: "12a", temp: 55 },
];

const forecast = [
  { day: "Fri", date: "Apr 17", icon: Sun,      hi: 74, lo: 56, cond: "Sunny",         pop: 0  },
  { day: "Sat", date: "Apr 18", icon: CloudSun, hi: 70, lo: 54, cond: "Partly Cloudy", pop: 10 },
  { day: "Sun", date: "Apr 19", icon: CloudRain,hi: 62, lo: 51, cond: "Showers",       pop: 70 },
  { day: "Mon", date: "Apr 20", icon: CloudRain,hi: 58, lo: 49, cond: "Rain",          pop: 85 },
  { day: "Tue", date: "Apr 21", icon: Cloud,    hi: 65, lo: 52, cond: "Cloudy",        pop: 20 },
];

export default function Poster() {
  return (
    <div
      className="w-[1400px] p-10 text-white"
      style={{
        fontFamily: "Inter, sans-serif",
        background:
          "radial-gradient(900px 600px at 85% -5%, rgba(253,186,116,0.22), transparent 60%), radial-gradient(700px 500px at 0% 100%, rgba(244,114,182,0.18), transparent 60%), #0a0a0f",
      }}
    >
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/50">
            The Almanac · Vol. IV · Weather
          </div>
          <div className="mt-2 flex items-baseline gap-4">
            <h1 className="text-[56px] font-semibold tracking-tight leading-none">New York, NY</h1>
            <span
              className="text-[40px] leading-none"
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontStyle: "italic",
                background: "linear-gradient(180deg,#fef3c7,#fdba74,#f472b6)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              today
            </span>
          </div>
          <div className="mt-2 text-white/60 text-[15px]">Thursday, 16 April 2026 · Updated 2:14 PM EDT</div>
        </div>
        <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-[14px] text-emerald-200">
          ● Live · Observations from KLGA
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 mb-5">
        <div
          className="col-span-5 rounded-2xl border border-white/[0.06] p-7 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(253,186,116,0.22), rgba(244,114,182,0.12) 60%, rgba(255,255,255,0.02))",
            boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.06), 0 20px 40px -24px rgba(0,0,0,0.6)",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-white/70 text-[14px] uppercase tracking-wider">Now</div>
              <div className="mt-3 flex items-start gap-2 tabular-nums">
                <span className="text-[140px] leading-none font-light">72</span>
                <span className="text-[36px] text-white/70 mt-3">°F</span>
              </div>
              <div className="text-[22px] mt-2">Partly Sunny</div>
              <div className="text-white/60 text-[15px] mt-1">Feels like 74° · H 74° L 56°</div>
            </div>
            <CloudSun className="w-28 h-28 text-amber-200/90" strokeWidth={1.25} />
          </div>
        </div>

        <div className="col-span-7 grid grid-cols-3 gap-5">
          {[
            { icon: Wind,        label: "Wind",       value: "8 mph", sub: "WSW · Gusts 14" },
            { icon: Droplets,    label: "Humidity",   value: "48%",   sub: "Dew point 52°" },
            { icon: Eye,         label: "Visibility", value: "10 mi", sub: "Clear air" },
            { icon: Sunrise,     label: "Sunrise",    value: "6:18a", sub: "13h 24m daylight" },
            { icon: Sunset,      label: "Sunset",     value: "7:42p", sub: "Civil dusk 8:12p" },
            { icon: Thermometer, label: "UV Index",   value: "6",     sub: "High · SPF 30+" },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5"
              style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.04)" }}
            >
              <div className="flex items-center gap-2 text-white/60 text-[14px] uppercase tracking-wider">
                <Icon className="w-4 h-4" /> {label}
              </div>
              <div className="mt-2 text-[30px] font-semibold tabular-nums">{value}</div>
              <div className="text-white/50 text-[14px] mt-0.5">{sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 mb-5"
        style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.04), 0 20px 40px -24px rgba(0,0,0,0.6)" }}
      >
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-[14px] uppercase tracking-wider text-white/50">Hourly Temperature</div>
            <div className="text-[22px] font-semibold">Next 18 hours</div>
          </div>
          <div className="text-white/50 text-[14px] tabular-nums">
            Peak <span className="text-white">72°</span> at 4 PM · Low <span className="text-white">54°</span> at 6 AM
          </div>
        </div>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <AreaChart data={hourly} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fdba74" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="#f472b6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="t" tickLine={false} axisLine={false} tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 13 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 13 }} unit="°" domain={[50, 75]} />
              <Tooltip contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="temp" stroke="#fdba74" strokeWidth={3} fill="url(#tg)" dot={{ r: 4, fill: "#fdba74", stroke: "#0a0a0f", strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <div className="text-[14px] uppercase tracking-wider text-white/50 mb-3">5-Day Forecast</div>
        <div className="grid grid-cols-5 gap-4">
          {forecast.map(({ day, date, icon: Icon, hi, lo, cond, pop }) => (
            <div
              key={day}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5"
              style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.04), 0 20px 40px -24px rgba(0,0,0,0.6)" }}
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[20px] font-semibold">{day}</span>
                <span className="text-white/50 text-[14px]">{date}</span>
              </div>
              <Icon className="w-14 h-14 my-4 text-amber-200" strokeWidth={1.3} />
              <div className="text-white/70 text-[14px]">{cond}</div>
              <div className="mt-2 flex items-baseline gap-2 tabular-nums">
                <span className="text-[28px] font-semibold">{hi}°</span>
                <span className="text-white/50 text-[18px]">{lo}°</span>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-sky-300 text-[14px]">
                <Droplets className="w-3.5 h-3.5" /> {pop}% precip
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between text-white/40 text-[14px]">
        <span>Source: NOAA · NWS New York/Upton</span>
        <span>Generated 14:14 EDT · next refresh 14:30</span>
      </div>
    </div>
  );
}
