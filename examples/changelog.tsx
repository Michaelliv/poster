import React from "react";
import { Zap, Shield, GitBranch, Gauge, Terminal, Package, AlertTriangle, Users, ArrowUpRight, Sparkles } from "lucide-react";

export default function Poster() {
  const features = [
    { icon: Zap, title: "Instant Hot Reload", body: "Sub-20ms rebuilds on 100k-LOC projects via a new persistent module graph.", tag: "core" },
    { icon: Gauge, title: "Query Planner v2", body: "Adaptive cost model lowered p95 latency by 42% across the benchmark suite.", tag: "perf" },
    { icon: Shield, title: "Scoped Capabilities", body: "Per-module permission tokens replace the monolithic runtime trust model.", tag: "security" },
    { icon: Terminal, title: "New lumen repl", body: "Multi-line editing, inline type hints, and an embedded tracer for async stacks.", tag: "dx" },
    { icon: GitBranch, title: "Branch-aware Caching", body: "Build artifacts are now keyed by git branch — switching never reruns codegen.", tag: "build" },
    { icon: Package, title: "Bundler Rewrite", body: "New Rust core ships 3.1× smaller binaries with deterministic chunk hashes.", tag: "bundler" },
  ];

  const breaking = [
    "lumen.config.js → lumen.config.ts (codemod available)",
    "Node 18 dropped — Node 20.11+ required",
    "`useRuntime()` renamed to `useLumen()`",
  ];

  return (
    <div
      className="w-[1400px] p-14 text-white relative overflow-hidden"
      style={{
        fontFamily: "Inter, sans-serif",
        background:
          "radial-gradient(900px 600px at 92% -5%, rgba(139,92,246,0.22), transparent 60%), radial-gradient(700px 500px at -5% 100%, rgba(34,211,238,0.16), transparent 60%), #08080c",
      }}
    >
      <div className="flex items-end justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#a855f7,#22d3ee)" }}>
            <Sparkles className="h-5 w-5 text-black" strokeWidth={2.5} />
          </div>
          <span className="text-[16px] font-bold uppercase tracking-[0.3em] text-white/60">The Lumen Almanac · Vol. IV · Release</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[14px] text-white/60">
          <span>ISSN 4.0.0</span>
          <span className="text-white/30">·</span>
          <span>Thursday, 16 April 2026</span>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-12 gap-10">
        <div className="col-span-8">
          <div className="text-[15px] font-bold uppercase tracking-[0.35em] text-cyan-300/80 mb-4">Stable Release · Codename Tungsten</div>
          <div className="flex items-baseline gap-6">
            <div
              className="text-[220px] font-black leading-none tracking-tight tabular-nums"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                background: "linear-gradient(180deg,#ffffff 0%,#d8b4fe 55%,#22d3ee 100%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              4.0
            </div>
            <div className="pb-4">
              <div className="text-[18px] text-white/50 font-mono">v4.0.0 · sha 9e3a71c</div>
              <div className="text-[18px] text-white/50 font-mono">bundle −38% · cold start 112ms</div>
            </div>
          </div>
          <div
            className="mt-4 text-[44px] leading-[1.05] font-light max-w-[700px]"
            style={{ fontFamily: "'Source Serif 4', serif" }}
          >
            A leaner runtime, a{" "}
            <span
              className="italic font-normal"
              style={{
                background: "linear-gradient(180deg,#fef3c7,#f472b6,#a855f7)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              sharper
            </span>{" "}
            planner, and the end of the monolithic trust model.
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-4">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5" style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-2 text-white/50 text-[14px] uppercase tracking-[0.2em] font-bold mb-3">
              <Users className="h-4 w-4" /> Contributors
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-[72px] font-black leading-none tabular-nums" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                247
              </div>
              <div className="text-[15px] text-emerald-300 font-mono">+61 new</div>
            </div>
            <div className="text-[14px] text-white/50 mt-2">across 1,284 commits, 39 countries</div>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { k: "PRs", v: "418" },
                { k: "Issues", v: "602" },
                { k: "RFCs", v: "14" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="text-[28px] font-bold tabular-nums" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {s.v}
                  </div>
                  <div className="text-[14px] text-white/50 uppercase tracking-wider">{s.k}</div>
                </div>
              ))}
            </div>
          </div>
          <a
            className="rounded-2xl p-5 flex items-center justify-between group"
            style={{ background: "linear-gradient(135deg,#a855f7 0%,#22d3ee 100%)" }}
          >
            <div>
              <div className="text-[14px] font-bold uppercase tracking-[0.2em] text-black/70">Read</div>
              <div className="text-[22px] font-bold text-black leading-tight">View full changelog →</div>
              <div className="text-[14px] text-black/70 font-mono mt-1">lumen.dev/changelog/4.0</div>
            </div>
            <ArrowUpRight className="h-10 w-10 text-black" strokeWidth={2.5} />
          </a>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-end justify-between mb-5">
          <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/50">Inside this release · Six highlights</div>
          <div className="text-[14px] font-mono text-white/40">§ 01 — 06</div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5"
              style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.04), 0 20px 40px -24px rgba(0,0,0,0.6)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="h-11 w-11 rounded-xl flex items-center justify-center border border-white/10" style={{ background: "rgba(139,92,246,0.12)" }}>
                  <f.icon className="h-5 w-5 text-violet-200" strokeWidth={2} />
                </div>
                <div className="text-[14px] font-mono text-white/40 tabular-nums">
                  §{String(i + 1).padStart(2, "0")} · {f.tag}
                </div>
              </div>
              <div className="text-[20px] font-bold leading-snug">{f.title}</div>
              <div className="text-[15px] text-white/60 mt-2 leading-relaxed">{f.body}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-10 rounded-2xl p-6 relative overflow-hidden border"
        style={{
          borderColor: "rgba(251,146,60,0.35)",
          background:
            "repeating-linear-gradient(135deg, rgba(251,146,60,0.08) 0 14px, transparent 14px 28px), rgba(251,146,60,0.06)",
        }}
      >
        <div className="flex items-start gap-5">
          <div className="h-12 w-12 rounded-xl bg-amber-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-6 w-6 text-black" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-3">
              <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-amber-300">Breaking Changes</div>
              <div className="text-[14px] font-mono text-white/40">3 items · migration guide at /migrate/4</div>
            </div>
            <div className="grid grid-cols-3 gap-5 mt-3">
              {breaking.map((b, i) => (
                <div key={i} className="flex gap-3">
                  <div className="text-[14px] font-mono text-amber-300/70 tabular-nums">0{i + 1}</div>
                  <div className="text-[15px] text-white/85 font-mono leading-relaxed">{b}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between text-[14px] font-mono text-white/40 border-t border-white/10 pt-5">
        <div>© 2026 Lumen Labs · MIT · built in Reykjavík, Lagos, Taipei</div>
        <div className="flex gap-5">
          <span>npm i lumen@4</span>
          <span>github.com/lumen/lumen</span>
          <span>#lumen-4 on discord</span>
        </div>
      </div>
    </div>
  );
}
