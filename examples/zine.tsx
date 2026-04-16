
export default function Zine() {
  const noise = `radial-gradient(circle at 13% 22%, rgba(0,0,0,0.9) 0.5px, transparent 1px),
                  radial-gradient(circle at 47% 71%, rgba(0,0,0,0.7) 0.6px, transparent 1px),
                  radial-gradient(circle at 82% 33%, rgba(0,0,0,0.8) 0.4px, transparent 1px),
                  radial-gradient(circle at 28% 88%, rgba(0,0,0,0.6) 0.5px, transparent 1px),
                  radial-gradient(circle at 66% 12%, rgba(0,0,0,0.85) 0.7px, transparent 1px),
                  radial-gradient(circle at 91% 79%, rgba(0,0,0,0.5) 0.4px, transparent 1px)`;

  const tornStrip = (top: number, rot: number, text: string, bg: string, fg: string, size: number) => (
    <div
      style={{
        position: "absolute",
        top,
        left: -40,
        right: -40,
        transform: `rotate(${rot}deg)`,
        background: bg,
        color: fg,
        padding: "8px 30px",
        fontFamily: "'Source Serif 4', serif",
        fontWeight: 900,
        fontSize: size,
        letterSpacing: "-0.02em",
        textTransform: "uppercase",
        clipPath: "polygon(0 12%, 3% 0, 8% 18%, 15% 4%, 22% 22%, 30% 8%, 38% 24%, 47% 6%, 55% 20%, 64% 4%, 72% 22%, 80% 8%, 88% 24%, 96% 6%, 100% 18%, 100% 86%, 96% 100%, 88% 80%, 80% 96%, 72% 78%, 64% 100%, 55% 82%, 47% 98%, 38% 78%, 30% 96%, 22% 80%, 15% 100%, 8% 82%, 3% 100%, 0 88%)",
        boxShadow: "0 4px 0 rgba(0,0,0,0.9)",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      {text}
    </div>
  );

  return (
    <div
      className="w-[1200px] relative"
      style={{
        background: "#ededea",
        padding: "0",
        fontFamily: "'JetBrains Mono', monospace",
        overflow: "hidden",
      }}
    >
      {/* photocopy noise layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: noise,
          backgroundSize: "40px 40px, 60px 60px, 30px 30px, 50px 50px, 70px 70px, 35px 35px",
          opacity: 0.4,
          mixBlendMode: "multiply",
          pointerEvents: "none",
          zIndex: 50,
        }}
      />
      {/* xerox vertical streaks */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(90deg, transparent 0, transparent 7px, rgba(0,0,0,0.04) 7px, rgba(0,0,0,0.04) 8px), repeating-linear-gradient(90deg, transparent 0, transparent 137px, rgba(0,0,0,0.12) 137px, rgba(0,0,0,0.12) 139px)",
          pointerEvents: "none",
          zIndex: 40,
        }}
      />
      {/* faded edge burn */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
          pointerEvents: "none",
          zIndex: 45,
          mixBlendMode: "multiply",
        }}
      />

      <div className="relative" style={{ padding: "60px 50px 70px", zIndex: 10 }}>
        {/* top masthead row */}
        <div className="flex items-end justify-between" style={{ borderBottom: "4px solid #000", paddingBottom: 12, marginBottom: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.2em" }}>
            №&nbsp;03&nbsp;//&nbsp;SUMMER&nbsp;2026
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.2em" }}>
            $0&nbsp;·&nbsp;STEAL&nbsp;THIS&nbsp;ZINE
          </div>
        </div>

        {/* HUGE TITLE */}
        <div style={{ position: "relative", marginTop: 10 }}>
          <div
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontWeight: 900,
              fontSize: 280,
              lineHeight: 0.82,
              letterSpacing: "-0.05em",
              color: "#000",
              textTransform: "uppercase",
              transform: "rotate(-1.5deg) translateX(-8px)",
              textShadow: "3px 3px 0 #000, -2px 0 0 rgba(0,0,0,0.4)",
              filter: "contrast(1.4)",
            }}
          >
            DE<span style={{ display: "inline-block", transform: "rotate(4deg) translateY(-6px)" }}>S</span>TROY
          </div>

          {/* slash divider */}
          <div
            style={{
              position: "absolute",
              right: -10,
              top: 110,
              fontFamily: "'Source Serif 4', serif",
              fontWeight: 900,
              fontSize: 380,
              lineHeight: 1,
              color: "#000",
              transform: "rotate(8deg)",
              opacity: 0.92,
            }}
          >
            /
          </div>

          <div
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontWeight: 900,
              fontSize: 230,
              lineHeight: 0.82,
              letterSpacing: "-0.05em",
              color: "#fff",
              WebkitTextStroke: "4px #000",
              textTransform: "uppercase",
              transform: "rotate(0.8deg) translateX(40px)",
              marginTop: 14,
            }}
          >
            REBU<span style={{ display: "inline-block", transform: "rotate(-6deg)" }}>I</span>LD
          </div>
        </div>

        {/* black tape strip */}
        {tornStrip(
          560,
          -3.2,
          "★ ANARCHY IN THE FRONT-END ★ EAT THE ALGORITHM ★ NO GODS NO MANAGERS ★",
          "#000",
          "#ededea",
          22
        )}

        {/* white inverse strip */}
        {tornStrip(
          640,
          2.1,
          "ISSUE 03 · SUMMER 2026 · DESTROY/REBUILD",
          "#ededea",
          "#000",
          26
        )}

        {/* ransom note row */}
        <div className="flex flex-wrap items-center" style={{ marginTop: 110, gap: 6 }}>
          {[
            { c: "K", bg: "#000", fg: "#fff", rot: -8, font: "'Source Serif 4', serif" },
            { c: "I", bg: "#fff", fg: "#000", rot: 6, font: "Inter" },
            { c: "L", bg: "#000", fg: "#fff", rot: -3, font: "'Source Serif 4', serif" },
            { c: "L", bg: "#fff", fg: "#000", rot: 9, font: "'JetBrains Mono', monospace" },
            { c: " ", bg: "transparent", fg: "#000", rot: 0, font: "Inter" },
            { c: "Y", bg: "#fff", fg: "#000", rot: -7, font: "'Source Serif 4', serif" },
            { c: "R", bg: "#000", fg: "#fff", rot: 4, font: "Inter" },
            { c: "·", bg: "transparent", fg: "#000", rot: 0, font: "Inter" },
            { c: "T", bg: "#fff", fg: "#000", rot: -5, font: "'JetBrains Mono', monospace" },
            { c: "V", bg: "#000", fg: "#fff", rot: 8, font: "'Source Serif 4', serif" },
          ].map((l, i) => (
            <span
              key={i}
              style={{
                background: l.bg,
                color: l.fg,
                fontFamily: l.font,
                fontWeight: 900,
                fontSize: 64,
                padding: l.bg === "transparent" ? "0 4px" : "4px 12px",
                transform: `rotate(${l.rot}deg)`,
                display: "inline-block",
                border: l.bg === "#fff" ? "2px solid #000" : "none",
                boxShadow: l.bg !== "transparent" ? "3px 3px 0 rgba(0,0,0,0.4)" : "none",
                lineHeight: 1,
              }}
            >
              {l.c}
            </span>
          ))}
        </div>

        {/* bottom split: barcode + manifesto */}
        <div className="flex items-end justify-between" style={{ marginTop: 50 }}>
          <div style={{ maxWidth: 620 }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 16,
                lineHeight: 1.5,
                fontWeight: 700,
                color: "#000",
                textTransform: "uppercase",
              }}
            >
              INSIDE: tearing down the dashboard / 14 reasons your standup is a cult /
              ava chen on quitting figma / sora okafor: i set my laptop on fire /
              kai nakamura's manifesto for slow code / pull-out poster: BURN THE BACKLOG
            </div>
            {/* scribble underline */}
            <svg width="600" height="24" style={{ marginTop: 4 }}>
              <path
                d="M 4 14 Q 60 4, 120 14 T 240 14 T 360 16 T 480 12 T 590 14"
                stroke="#000"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 10 18 Q 80 8, 160 18 T 320 18 T 480 16 T 580 18"
                stroke="#000"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
          </div>

          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                display: "inline-block",
                background: "#fff",
                border: "3px solid #000",
                padding: "10px 12px 6px",
                transform: "rotate(2deg)",
              }}
            >
              <div style={{ display: "flex", gap: 1, alignItems: "flex-end", height: 60 }}>
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i % 3 === 0 ? 4 : i % 4 === 0 ? 1 : 2,
                      height: "100%",
                      background: "#000",
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, marginTop: 4, letterSpacing: "0.2em" }}>
                0 6 6 6 6 · DIY · 2 0 2 6
              </div>
            </div>
            <div style={{ marginTop: 10, fontSize: 13, fontWeight: 800, color: "#000", letterSpacing: "0.15em" }}>
              PHOTOCOPIED IN A BASEMENT
            </div>
          </div>
        </div>

        {/* scribble annotations layer */}
        <svg
          width="1100"
          height="100%"
          style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 30 }}
          viewBox="0 0 1100 1500"
        >
          {/* arrow pointing at title */}
          <path
            d="M 880 200 Q 940 240, 900 320 L 880 300 M 900 320 L 920 300"
            stroke="#000"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <text
            x="900"
            y="180"
            fontFamily="'Source Serif 4', serif"
            fontStyle="italic"
            fontWeight="700"
            fontSize="22"
            fill="#000"
            transform="rotate(-6 900 180)"
          >
            yeah we mean it
          </text>

          {/* circled FREE */}
          <ellipse
            cx="120"
            cy="100"
            rx="52"
            ry="28"
            stroke="#000"
            strokeWidth="3"
            fill="none"
            transform="rotate(-8 120 100)"
          />
          <ellipse
            cx="120"
            cy="100"
            rx="58"
            ry="32"
            stroke="#000"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
            transform="rotate(-12 120 100)"
          />
          <text
            x="120"
            y="108"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="900"
            fontSize="26"
            fill="#000"
            transform="rotate(-8 120 100)"
          >
            FREE!!
          </text>

          {/* scribbled X */}
          <path
            d="M 60 720 L 180 820 M 180 720 L 60 820 M 65 730 L 175 815"
            stroke="#000"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          {/* squiggle margin note */}
          <text
            x="40"
            y="1020"
            fontFamily="'Source Serif 4', serif"
            fontStyle="italic"
            fontSize="20"
            fontWeight="700"
            fill="#000"
            transform="rotate(-90 40 1020)"
          >
            ← rip this off and paste it on something
          </text>

          {/* coffee ring */}
          <ellipse
            cx="980"
            cy="1080"
            rx="55"
            ry="50"
            stroke="rgba(0,0,0,0.55)"
            strokeWidth="6"
            fill="none"
          />
          <ellipse
            cx="985"
            cy="1078"
            rx="48"
            ry="44"
            stroke="rgba(0,0,0,0.25)"
            strokeWidth="3"
            fill="none"
          />

          {/* anarchy A */}
          <g transform="translate(960, 60) rotate(12)">
            <circle cx="30" cy="30" r="32" stroke="#000" strokeWidth="4" fill="none" />
            <text
              x="30"
              y="44"
              textAnchor="middle"
              fontFamily="'Source Serif 4', serif"
              fontWeight="900"
              fontSize="48"
              fill="#000"
            >
              A
            </text>
          </g>
        </svg>
      </div>

      {/* staple marks */}
      <div style={{ position: "absolute", left: 30, top: 30, width: 18, height: 4, background: "#000", transform: "rotate(8deg)", zIndex: 60 }} />
      <div style={{ position: "absolute", left: 30, bottom: 30, width: 18, height: 4, background: "#000", transform: "rotate(-12deg)", zIndex: 60 }} />
    </div>
  );
}
