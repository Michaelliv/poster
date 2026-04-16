import React from "react";
import { Eye, MessageSquare, Bot, MapPin, Clock, Calendar, Ticket } from "lucide-react";

export default function Poster() {
  const speakers = [
    { name: "Ava Chen", role: "Principal Researcher, Meridian Labs", track: "Vision" },
    { name: "Sora Okafor", role: "Founder, Polyglot.ai", track: "Language" },
    { name: "Kai Nakamura", role: "Staff Engineer, Driftwood", track: "Agents" },
    { name: "Beatriz Álvaro", role: "Head of ML, Lumen Robotics", track: "Vision" },
    { name: "Dmitri Volkov", role: "Research Lead, Terrace", track: "Language" },
    { name: "Noor El-Amin", role: "CTO, Runway Systems", track: "Agents" },
  ];

  const tracks = [
    { name: "Vision", icon: Eye, tag: "Perception · Multimodal · 3D", color: "#fef3c7", grad: "linear-gradient(135deg,#f59e0b,#ef4444)" },
    { name: "Language", icon: MessageSquare, tag: "LLMs · Retrieval · Reasoning", color: "#fce7f3", grad: "linear-gradient(135deg,#ec4899,#a855f7)" },
    { name: "Agents", icon: Bot, tag: "Tools · Planning · Autonomy", color: "#ddd6fe", grad: "linear-gradient(135deg,#8b5cf6,#6366f1)" },
  ];

  return (
    <div
      className="w-[1200px] p-14 text-white relative overflow-hidden"
      style={{
        fontFamily: "Inter, sans-serif",
        background:
          "radial-gradient(900px 600px at 95% -5%, rgba(236,72,153,0.22), transparent 60%), radial-gradient(700px 500px at -5% 100%, rgba(139,92,246,0.22), transparent 60%), #0a0a10",
      }}
    >
      <div className="flex items-start justify-between mb-10">
        <div>
          <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/50">
            Hackathon · Vol. IV · Lisboa
          </div>
          <div className="mt-4 text-[120px] leading-[0.92] font-black tracking-tight">
            Synth
            <span
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontStyle: "italic",
                fontWeight: 500,
                background: "linear-gradient(180deg,#fef3c7,#f472b6,#a855f7)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              esis
            </span>
          </div>
          <div className="text-[120px] leading-[0.92] font-black tracking-tight text-white/90">2026</div>
        </div>
        <div className="flex flex-col items-end gap-3 pt-4">
          <div
            className="px-4 py-2 rounded-full border border-white/10 text-[14px] font-semibold uppercase tracking-[0.2em]"
            style={{ background: "rgba(244,114,182,0.12)" }}
          >
            ● One Day. Three Tracks.
          </div>
          <div className="text-right tabular-nums">
            <div className="text-[28px] font-bold">Sat 18 Apr 2026</div>
            <div className="text-white/60 text-[16px]">Doors 09:00 · Demos 18:00 · Party 21:00</div>
          </div>
        </div>
      </div>

      <div
        className="flex items-center gap-8 mb-10 px-6 py-5 rounded-2xl border border-white/[0.06]"
        style={{
          background: "rgba(255,255,255,0.03)",
          boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex items-center gap-3">
          <MapPin size={20} className="text-pink-300" />
          <div>
            <div className="text-[18px] font-bold">Tanzhaus Alpha</div>
            <div className="text-[14px] text-white/60">Rua da Boavista 84 · 1200-068 Lisboa</div>
          </div>
        </div>
        <div className="h-10 w-px bg-white/10" />
        <div className="flex items-center gap-3">
          <Clock size={20} className="text-amber-300" />
          <div>
            <div className="text-[18px] font-bold tabular-nums">09:00 – 22:00</div>
            <div className="text-[14px] text-white/60">12 hours to build · 5 min to pitch</div>
          </div>
        </div>
        <div className="h-10 w-px bg-white/10" />
        <div className="flex items-center gap-3">
          <Ticket size={20} className="text-violet-300" />
          <div>
            <div className="text-[18px] font-bold">€25 · 240 seats</div>
            <div className="text-[14px] text-white/60">synthesis2026.pt</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-10">
        {tracks.map((t, i) => {
          const Icon = t.icon;
          return (
            <div
              key={t.name}
              className="rounded-2xl border border-white/[0.06] p-6"
              style={{
                background: "rgba(255,255,255,0.03)",
                boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.04), 0 20px 40px -24px rgba(0,0,0,0.6)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: t.grad }}
              >
                <Icon size={22} color="#0a0a10" />
              </div>
              <div className="text-[14px] font-bold uppercase tracking-[0.25em] text-white/50">Track 0{i+1}</div>
              <div className="text-[36px] font-black leading-none mt-2" style={{ color: t.color }}>
                {t.name}
              </div>
              <div className="text-[15px] text-white/70 mt-3">{t.tag}</div>
            </div>
          );
        })}
      </div>

      <div className="mb-10">
        <div className="flex items-end justify-between mb-5">
          <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/50">Keynotes & Mentors</div>
          <div className="text-[14px] text-white/40 tabular-nums">06 / 06</div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {speakers.map((s) => (
            <div
              key={s.name}
              className="rounded-xl border border-white/[0.06] p-5 flex items-center gap-4"
              style={{ background: "rgba(255,255,255,0.025)" }}
            >
              <div
                className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center text-[18px] font-black text-[#0a0a10]"
                style={{
                  background:
                    s.track === "Vision"
                      ? "linear-gradient(135deg,#f59e0b,#ef4444)"
                      : s.track === "Language"
                      ? "linear-gradient(135deg,#ec4899,#a855f7)"
                      : "linear-gradient(135deg,#8b5cf6,#6366f1)",
                }}
              >
                {s.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="min-w-0">
                <div className="text-[18px] font-bold leading-tight">{s.name}</div>
                <div className="text-[14px] text-white/55 leading-tight mt-1">{s.role}</div>
                <div className="text-[14px] uppercase tracking-[0.2em] text-white/40 mt-1.5">{s.track}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-2xl border border-white/[0.06] p-6"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/50 mb-4">
          Presented with
        </div>
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg" style={{ background: "#f59e0b" }} />
            <div className="text-[18px] font-bold tracking-tight">NOVA.AI</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10" style={{ background: "#ec4899", borderRadius: "50%" }} />
            <div className="text-[18px] font-bold tracking-tight">Hemisphere</div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10"
              style={{ background: "#8b5cf6", clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
            />
            <div className="text-[18px] font-bold tracking-tight">Torchline</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rotate-45" style={{ background: "#10b981" }} />
            <div className="text-[18px] font-bold tracking-tight">Quadra Cloud</div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between text-[14px] text-white/40 uppercase tracking-[0.25em]">
        <div className="flex items-center gap-2">
          <Calendar size={14} /> synthesis2026.pt
        </div>
        <div>#Synthesis26 · Lisboa</div>
      </div>
    </div>
  );
}
