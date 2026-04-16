import React from "react";

export default function Poster() {
  return (
    <div
      className="w-[1200px] h-[1800px] relative overflow-hidden"
      style={{
        fontFamily: "Inter, sans-serif",
        background:
          "radial-gradient(1100px 700px at 50% 18%, rgba(120,170,220,0.22), transparent 65%), radial-gradient(900px 600px at 50% 95%, rgba(210,140,90,0.18), transparent 70%), linear-gradient(180deg, #05070c 0%, #0a0f18 40%, #151820 75%, #1d1a18 100%)",
      }}
    >
      <svg className="absolute inset-0 w-full h-full opacity-70" aria-hidden>
        {Array.from({ length: 160 }).map((_, i) => {
          const x = (i * 97) % 1200;
          const y = (i * 53) % 900;
          const r = (i % 7 === 0 ? 1.6 : 0.6) + ((i * 13) % 5) / 10;
          const o = 0.2 + ((i * 31) % 70) / 100;
          return <circle key={i} cx={x} cy={y} r={r} fill="#e8eef7" opacity={o} />;
        })}
      </svg>

      <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 260 }}>
        <svg width="720" height="720" viewBox="0 0 720 720">
          <defs>
            <radialGradient id="planet" cx="42%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#f2d7b0" />
              <stop offset="40%" stopColor="#c97b4a" />
              <stop offset="80%" stopColor="#3a1d14" />
              <stop offset="100%" stopColor="#0a0608" />
            </radialGradient>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(240,180,120,0.55)" />
              <stop offset="60%" stopColor="rgba(240,180,120,0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="360" cy="360" r="340" fill="url(#glow)" />
          <circle cx="360" cy="360" r="210" fill="url(#planet)" />
          <ellipse cx="360" cy="360" rx="320" ry="60" fill="none" stroke="rgba(230,200,170,0.18)" strokeWidth="1.2" />
          <ellipse cx="360" cy="360" rx="290" ry="52" fill="none" stroke="rgba(230,200,170,0.12)" strokeWidth="1" />
          <ellipse cx="360" cy="360" rx="260" ry="44" fill="none" stroke="rgba(230,200,170,0.08)" strokeWidth="1" />
        </svg>
      </div>

      <svg
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: 360 }}
        width="340"
        height="520"
        viewBox="0 0 340 520"
      >
        <defs>
          <linearGradient id="fig" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" />
            <stop offset="85%" stopColor="#050607" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>
        <path
          d="M170 40 C 200 40 218 62 218 92 C 218 116 208 132 196 142 L 214 168 C 244 176 260 198 262 232 L 258 340 L 242 340 L 238 470 L 210 470 L 206 360 L 196 360 L 190 510 L 150 510 L 144 360 L 134 360 L 130 470 L 102 470 L 98 340 L 82 340 L 78 232 C 80 198 96 176 126 168 L 144 142 C 132 132 122 116 122 92 C 122 62 140 40 170 40 Z"
          fill="url(#fig)"
        />
      </svg>

      <div
        className="absolute inset-x-0"
        style={{
          bottom: 340,
          height: 180,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(220,150,100,0.15) 40%, rgba(30,20,18,0.8) 100%)",
        }}
      />

      {/* Laurels */}
      <div className="absolute left-0 right-0 flex justify-center gap-12" style={{ top: 60 }}>
        {[
          { top: "OFFICIAL SELECTION", mid: "VENICE", bot: "2026" },
          { top: "WINNER · GRAND JURY", mid: "SUNDANCE", bot: "2026" },
          { top: "OFFICIAL SELECTION", mid: "TORONTO", bot: "2026" },
        ].map((l, i) => (
          <div key={i} className="flex items-center gap-3 text-white/85">
            <svg width="56" height="90" viewBox="0 0 44 72">
              <path d="M38 6 C 20 14 10 30 10 50 C 10 58 12 64 16 68" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              {Array.from({ length: 9 }).map((_, k) => (
                <ellipse key={k} cx={12 + k * 1.2} cy={14 + k * 6} rx="5" ry="2.2" transform={`rotate(${-50 + k * 6} ${12 + k * 1.2} ${14 + k * 6})`} fill="currentColor" opacity="0.85" />
              ))}
            </svg>
            <div className="text-center leading-tight">
              <div className="text-[14px] tracking-[0.25em] uppercase text-white/70">{l.top}</div>
              <div className="text-[18px] font-semibold tracking-[0.2em] uppercase">{l.mid}</div>
              <div className="text-[14px] tracking-[0.3em] text-white/70">{l.bot}</div>
            </div>
            <svg width="56" height="90" viewBox="0 0 44 72">
              <path d="M6 6 C 24 14 34 30 34 50 C 34 58 32 64 28 68" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              {Array.from({ length: 9 }).map((_, k) => (
                <ellipse key={k} cx={32 - k * 1.2} cy={14 + k * 6} rx="5" ry="2.2" transform={`rotate(${50 - k * 6} ${32 - k * 1.2} ${14 + k * 6})`} fill="currentColor" opacity="0.85" />
              ))}
            </svg>
          </div>
        ))}
      </div>

      {/* Pull quotes */}
      <div className="absolute left-0 right-0 flex justify-center gap-14 text-center" style={{ top: 200 }}>
        {[
          { q: "Shattering.", s: "The Guardian" },
          { q: "A quiet masterpiece.", s: "Sight & Sound" },
          { q: "Dazzlingly human.", s: "IndieWire" },
        ].map((p, i) => (
          <div key={i} className="text-white/85">
            <div className="text-[24px]" style={{ fontFamily: "'Source Serif 4', serif", fontStyle: "italic" }}>
              "{p.q}"
            </div>
            <div className="text-[14px] tracking-[0.3em] uppercase text-white/55 mt-1">{p.s}</div>
          </div>
        ))}
      </div>

      {/* Title */}
      <div className="absolute left-0 right-0 text-center" style={{ top: 1130 }}>
        <div className="text-[16px] tracking-[0.55em] uppercase text-white/70 mb-4">
          From the director of <span className="italic">The Long Quiet</span>
        </div>
        <h1
          className="leading-[0.88] text-white"
          style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 148,
            fontWeight: 400,
            letterSpacing: "-0.02em",
            textShadow: "0 4px 40px rgba(0,0,0,0.6)",
          }}
        >
          After{" "}
          <span
            style={{
              fontStyle: "italic",
              background: "linear-gradient(180deg,#fef3c7,#f4b57a,#c97b4a)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            the
          </span>{" "}
          Signal
        </h1>
        <div
          className="mt-6 text-[20px] tracking-[0.45em] uppercase text-white/80"
          style={{ fontFamily: "'Source Serif 4', serif", fontStyle: "italic" }}
        >
          The message arrived. No one came back.
        </div>
      </div>

      {/* Billing block */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-[1040px] px-10 pb-10 pt-6 text-center text-white/85">
          <div className="text-[14px] leading-[1.5] tracking-[0.08em]">
            ORION PICTURES &amp; LANTERN HOUSE PRESENT · IN ASSOCIATION WITH NORTHWIND FILMS
            <br />
            A MARA ELSTEIN PRODUCTION · A FILM BY JULIEN KARRAS
          </div>
          <div className="mt-2 text-[18px] tracking-[0.22em]">
            ADA OKONKWO &nbsp; THEO RYLAND &nbsp; NAOMI KOVÁC &nbsp; SEBASTIAN PIRES &nbsp; and &nbsp; LIV HERRERA
          </div>
          <div className="mt-2 text-[14px] leading-[1.55] tracking-[0.08em]">
            CASTING BY REMI ALDEN, CSA &nbsp;·&nbsp; MUSIC BY HALVOR DAHL &nbsp;·&nbsp; COSTUMES BY IVY SATO
            <br />
            EDITED BY COLM BRENNAN, ACE &nbsp;·&nbsp; PRODUCTION DESIGNER ARJUN MEHRA
            <br />
            DIRECTOR OF PHOTOGRAPHY KIRAN VOSS, BSC &nbsp;·&nbsp; EXECUTIVE PRODUCERS NOA FERRARI &amp; ELI TANAKA
            <br />
            PRODUCED BY MARA ELSTEIN, p.g.a. &nbsp; SIMON DELACROIX, p.g.a.
            <br />
            WRITTEN BY JULIEN KARRAS &amp; HANA LINDQVIST &nbsp;·&nbsp; DIRECTED BY JULIEN KARRAS
          </div>

          <div className="mt-6 flex items-center justify-center gap-8">
            <div className="flex items-center gap-3 border border-white/50 px-3 py-2">
              <div className="border-2 border-white/90 px-2 py-0.5 text-[28px] font-black tracking-tight leading-none">
                PG-13
              </div>
              <div className="text-[14px] leading-tight text-left text-white/75 max-w-[260px]">
                PARENTS STRONGLY CAUTIONED
                <br />
                <span className="text-white/55">Some material may be inappropriate for children under 13.</span>
              </div>
            </div>
            <div className="text-[14px] tracking-[0.25em] text-white/65 leading-relaxed">
              DOLBY ATMOS<br />SHOT IN 65MM
            </div>
            <div className="text-[14px] tracking-[0.3em] text-white/65">afterthesignal.film</div>
          </div>

          <div
            className="mt-5 text-[28px] tracking-[0.4em] uppercase"
            style={{ fontFamily: "'Source Serif 4', serif" }}
          >
            In Theatres · October 23
          </div>
        </div>
      </div>
    </div>
  );
}
