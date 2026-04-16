
import React from "react";
import { Flame, Mountain, Shield, Sparkles, Circle } from "lucide-react";

export default function MagmothCard() {
  return (
    <div
      className="w-[900px] p-6"
      style={{
        fontFamily: "Inter, sans-serif",
        background:
          "radial-gradient(600px 400px at 20% 10%, rgba(251,191,36,0.25), transparent 60%), radial-gradient(600px 400px at 90% 90%, rgba(120,53,15,0.35), transparent 60%), #1a0a05",
      }}
    >
      <div
        className="relative rounded-[28px] p-4"
        style={{
          background:
            "linear-gradient(145deg, #fde68a 0%, #f59e0b 25%, #b45309 55%, #7c2d12 100%)",
          boxShadow:
            "0 30px 60px -20px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.3)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[28px] opacity-40 mix-blend-screen"
          style={{
            background:
              "linear-gradient(115deg, transparent 0%, transparent 30%, rgba(255,255,255,0.5) 42%, rgba(186,230,253,0.35) 48%, rgba(251,207,232,0.35) 54%, rgba(253,224,71,0.4) 60%, transparent 72%, transparent 100%)",
          }}
        />

        <div
          className="relative rounded-[20px] overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)",
            boxShadow: "inset 0 0 0 2px rgba(120,53,15,0.4)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{
              background:
                "linear-gradient(90deg, rgba(234,88,12,0.15), rgba(180,83,9,0.1))",
              borderBottom: "1px solid rgba(120,53,15,0.25)",
            }}
          >
            <span
              className="text-[14px] font-bold uppercase tracking-[0.18em] px-2 py-1 rounded"
              style={{ background: "rgba(120,53,15,0.15)", color: "#7c2d12" }}
            >
              Stage 2 · Evolves from Emberlope
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[16px] font-bold tabular-nums" style={{ color: "#7c2d12" }}>
                HP
              </span>
              <span
                className="text-[46px] font-black leading-none tabular-nums"
                style={{
                  color: "#b91c1c",
                  textShadow: "2px 2px 0 #fef3c7, 3px 3px 0 rgba(0,0,0,0.2)",
                }}
              >
                180
              </span>
              <div className="ml-1 flex gap-1 items-center rounded-full px-2 py-1" style={{ background: "#7c2d12" }}>
                <Flame size={16} color="#fbbf24" fill="#ef4444" />
                <Mountain size={16} color="#fbbf24" />
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="flex items-end justify-between px-5 pt-4 pb-2">
            <h1
              className="text-[54px] font-black leading-none tracking-tight"
              style={{
                fontFamily: "'Source Serif 4', serif",
                background:
                  "linear-gradient(180deg, #7c2d12 0%, #ea580c 50%, #b91c1c 100%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                textShadow: "0 2px 0 rgba(255,255,255,0.4)",
              }}
            >
              Magmoth
            </h1>
            <div className="text-[14px] font-semibold tabular-nums" style={{ color: "#7c2d12" }}>
              NO. 147 · length 4.2m · weight 890kg
            </div>
          </div>

          {/* Art window */}
          <div className="mx-5 mb-4">
            <div
              className="relative rounded-lg overflow-hidden h-[360px]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 30%, #fbbf24 0%, #ea580c 30%, #7c2d12 70%, #1c0a03 100%)",
                boxShadow:
                  "inset 0 0 0 3px #7c2d12, inset 0 0 0 5px #fbbf24, inset 0 0 40px rgba(0,0,0,0.5)",
              }}
            >
              <Sparkles size={22} color="#fde68a" className="absolute top-6 left-8 opacity-80" />
              <Sparkles size={14} color="#fef3c7" className="absolute top-16 right-16 opacity-70" />
              <Sparkles size={18} color="#fbbf24" className="absolute bottom-20 left-20 opacity-80" />
              <Circle size={6} color="#fef3c7" fill="#fef3c7" className="absolute top-24 left-40 opacity-60" />
              <Circle size={4} color="#fef3c7" fill="#fef3c7" className="absolute bottom-32 right-28 opacity-70" />

              <svg viewBox="0 0 400 340" className="absolute inset-0 w-full h-full">
                <defs>
                  <radialGradient id="body" cx="50%" cy="45%" r="55%">
                    <stop offset="0%" stopColor="#fde047" />
                    <stop offset="30%" stopColor="#ea580c" />
                    <stop offset="70%" stopColor="#7c2d12" />
                    <stop offset="100%" stopColor="#1c0a03" />
                  </radialGradient>
                  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse cx="200" cy="310" rx="180" ry="18" fill="#1c0a03" opacity="0.7" />
                <circle cx="200" cy="160" r="140" fill="url(#glow)" />
                <path
                  d="M 80 230 Q 70 180 100 150 Q 120 120 170 115 Q 210 100 260 115 Q 310 125 330 165 Q 345 200 335 235 Q 330 260 310 265 L 300 300 L 280 300 L 275 270 L 160 270 L 155 300 L 135 300 L 130 265 Q 95 260 80 230 Z"
                  fill="url(#body)"
                  stroke="#1c0a03"
                  strokeWidth="2"
                />
                <path d="M 140 200 Q 120 230 115 260 Q 125 250 145 225 Z" fill="#fef3c7" stroke="#7c2d12" strokeWidth="1.5" />
                <path d="M 180 205 Q 170 240 175 270 Q 185 250 195 225 Z" fill="#fef3c7" stroke="#7c2d12" strokeWidth="1.5" />
                <circle cx="200" cy="155" r="8" fill="#fef3c7" />
                <circle cx="202" cy="157" r="4" fill="#7c2d12" />
                <path d="M 155 200 Q 135 225 145 255 Q 155 245 165 220 Z" fill="#7c2d12" stroke="#1c0a03" strokeWidth="1.5" />
                <path d="M 220 160 Q 240 180 235 210" stroke="#fbbf24" strokeWidth="3" fill="none" opacity="0.9" />
                <path d="M 260 170 Q 280 195 270 225" stroke="#fde047" strokeWidth="2" fill="none" opacity="0.8" />
                <path d="M 170 115 Q 175 90 165 75 Q 185 85 190 110 Z" fill="#ef4444" />
                <path d="M 200 108 Q 210 80 200 60 Q 220 75 225 105 Z" fill="#f59e0b" />
                <path d="M 230 112 Q 245 90 240 72 Q 255 88 255 110 Z" fill="#ef4444" />
              </svg>

              <div
                className="absolute bottom-2 left-3 text-[14px] font-semibold tracking-wide"
                style={{ color: "#fef3c7", textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
              >
                Illus. Sora Okafor
              </div>
            </div>

            <div className="mt-2 text-[14px] italic px-1" style={{ color: "#7c2d12" }}>
              The Ashen Tusk Pokémon. Its molten fur hardens into obsidian
              plates when it charges, leaving rivers of glass in its wake.
            </div>
          </div>

          {/* Attacks */}
          <div className="px-5 pb-4 space-y-3">
            <div
              className="rounded-lg p-3"
              style={{
                background: "rgba(255,255,255,0.4)",
                borderTop: "1.5px solid rgba(120,53,15,0.35)",
                borderBottom: "1.5px solid rgba(120,53,15,0.35)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#b91c1c" }}>
                      <Flame size={16} color="#fde047" fill="#fbbf24" />
                    </span>
                    <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#78350f" }}>
                      <Mountain size={16} color="#fde047" />
                    </span>
                  </div>
                  <span className="text-[22px] font-black" style={{ color: "#7c2d12", fontFamily: "'Source Serif 4', serif" }}>
                    Cinder Stomp
                  </span>
                </div>
                <span className="text-[30px] font-black tabular-nums" style={{ color: "#b91c1c", textShadow: "1px 1px 0 #fef3c7" }}>
                  60
                </span>
              </div>
              <p className="text-[14px] mt-1" style={{ color: "#44200a" }}>
                Flip a coin. If heads, the Defending Pokémon is now Burned.
              </p>
            </div>

            <div
              className="rounded-lg p-3"
              style={{
                background: "rgba(255,255,255,0.4)",
                borderTop: "1.5px solid rgba(120,53,15,0.35)",
                borderBottom: "1.5px solid rgba(120,53,15,0.35)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#b91c1c" }}>
                      <Flame size={16} color="#fde047" fill="#fbbf24" />
                    </span>
                    <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#b91c1c" }}>
                      <Flame size={16} color="#fde047" fill="#fbbf24" />
                    </span>
                    <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#78350f" }}>
                      <Mountain size={16} color="#fde047" />
                    </span>
                    <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#6b7280" }}>
                      <Circle size={12} color="#fde047" fill="#fde047" />
                    </span>
                  </div>
                  <span className="text-[22px] font-black" style={{ color: "#7c2d12", fontFamily: "'Source Serif 4', serif" }}>
                    Magma Eruption
                  </span>
                </div>
                <span className="text-[30px] font-black tabular-nums" style={{ color: "#b91c1c", textShadow: "1px 1px 0 #fef3c7" }}>
                  140
                </span>
              </div>
              <p className="text-[14px] mt-1" style={{ color: "#44200a" }}>
                Discard 2 Fire Energy attached to Magmoth. This attack does 30
                damage to each of your opponent's Benched Pokémon.
              </p>
            </div>
          </div>

          {/* Footer stats */}
          <div
            className="flex items-center justify-between px-5 py-2 text-[14px] font-semibold"
            style={{
              background: "rgba(120,53,15,0.1)",
              borderTop: "1px solid rgba(120,53,15,0.3)",
              color: "#7c2d12",
            }}
          >
            <div className="flex items-center gap-1.5">
              <span>weakness</span>
              <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#1e40af" }}>
                <Circle size={12} color="#bfdbfe" fill="#bfdbfe" />
              </span>
              <span className="tabular-nums">×2</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>resistance</span>
              <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#374151" }}>
                <Shield size={12} color="#e5e7eb" />
              </span>
              <span className="tabular-nums">−30</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>retreat</span>
              <div className="flex gap-0.5">
                <Circle size={16} color="#fde047" fill="#6b7280" />
                <Circle size={16} color="#fde047" fill="#6b7280" />
                <Circle size={16} color="#fde047" fill="#6b7280" />
              </div>
            </div>
          </div>

          <div
            className="flex items-center justify-between px-5 py-2 text-[14px]"
            style={{ background: "#fde68a", color: "#7c2d12" }}
          >
            <span className="font-bold tracking-wide">
              ©2026 Ember Forge · Illus. Sora Okafor
            </span>
            <div className="flex items-center gap-2 font-bold">
              <svg width="20" height="20" viewBox="0 0 20 20">
                <polygon points="10,2 18,8 15,18 5,18 2,8" fill="#7c2d12" stroke="#b45309" strokeWidth="1" />
                <circle cx="10" cy="10" r="3" fill="#fbbf24" />
              </svg>
              <span className="tabular-nums">SCE 042/180 ◆</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
