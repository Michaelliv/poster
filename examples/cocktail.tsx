
import React from "react";
import { Flame, GlassWater, Clock, Wine } from "lucide-react";

export default function CocktailCard() {
  const ingredients = [
    { name: "London Dry Gin", amount: "30 ml", note: "Tanqueray or Beefeater" },
    { name: "Campari", amount: "30 ml", note: "Bitter aperitivo base" },
    { name: "Sweet Vermouth", amount: "30 ml", note: "Carpano Antica Formula" },
    { name: "Applewood Smoke", amount: "1 cloche", note: "Cold-smoked over ice" },
    { name: "Orange Bitters", amount: "2 dashes", note: "Regans' No. 6" },
  ];

  const steps = [
    "Chill a rocks glass with crushed ice while you prepare the build.",
    "Add gin, Campari, and sweet vermouth to a mixing glass over ice. Stir 30 seconds until properly diluted and silk-cold.",
    "Discard the rocks glass ice. Place a large clear cube in the glass, then trap applewood smoke under a cloche for 45 seconds.",
    "Lift the cloche tableside and strain the Negroni directly over the smoked cube.",
    "Express an orange peel over the surface, wipe the rim, and drop it in.",
  ];

  return (
    <div
      className="w-[1400px] p-14 relative overflow-hidden"
      style={{
        fontFamily: "Inter, sans-serif",
        background:
          "radial-gradient(900px 600px at 85% 10%, rgba(234,88,12,0.22), transparent 60%), radial-gradient(700px 500px at 10% 95%, rgba(180,83,9,0.18), transparent 60%), #140a04",
        color: "#fde7c7",
      }}
    >
      <div className="flex items-end justify-between mb-10">
        <div>
          <div
            className="text-[14px] font-bold uppercase tracking-[0.3em] mb-3"
            style={{ color: "rgba(253,186,116,0.7)" }}
          >
            The Mixology School · Vol. VII · Bitter &amp; Smoke
          </div>
          <h1
            className="text-[84px] leading-[0.95] font-semibold"
            style={{ fontFamily: "'Source Serif 4', serif" }}
          >
            Smoked{" "}
            <span
              style={{
                fontStyle: "italic",
                backgroundImage:
                  "linear-gradient(180deg,#fde68a,#fb923c,#b45309)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Negroni
            </span>
          </h1>
          <div className="mt-4 text-[18px]" style={{ color: "rgba(253,231,199,0.75)" }}>
            Equal-parts classic, transformed by applewood smoke and a single perfect cube.
          </div>
        </div>
        <div
          className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold uppercase tracking-[0.2em]"
          style={{
            background: "rgba(234,88,12,0.14)",
            border: "1px solid rgba(251,146,60,0.35)",
            color: "#fdba74",
          }}
        >
          <Flame size={16} /> Signature Build
        </div>
      </div>

      <div
        className="grid grid-cols-4 gap-4 mb-10 rounded-2xl p-5"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(251,146,60,0.15)",
          boxShadow:
            "inset 0 1px 0 0 rgba(255,255,255,0.05), 0 20px 40px -24px rgba(0,0,0,0.6)",
        }}
      >
        {[
          { k: "Glass", v: "Double Rocks", i: <GlassWater size={20} /> },
          { k: "Method", v: "Stirred · Smoked", i: <Wine size={20} /> },
          { k: "Build Time", v: "3 min 30 s", i: <Clock size={20} /> },
          { k: "ABV", v: "24% · 90 ml pour", i: <Flame size={20} /> },
        ].map((s) => (
          <div key={s.k} className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(251,146,60,0.12)", color: "#fb923c" }}
            >
              {s.i}
            </div>
            <div>
              <div
                className="text-[14px] uppercase tracking-[0.2em] font-semibold"
                style={{ color: "rgba(253,186,116,0.6)" }}
              >
                {s.k}
              </div>
              <div className="text-[18px] font-semibold tabular-nums">{s.v}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1.1fr_1fr] gap-8">
        <div className="space-y-6">
          <div
            className="rounded-2xl p-7"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(251,146,60,0.15)",
            }}
          >
            <div
              className="text-[14px] font-bold uppercase tracking-[0.3em] mb-5"
              style={{ color: "#fb923c" }}
            >
              Ingredients
            </div>
            <div>
              {ingredients.map((ing, i) => (
                <div
                  key={ing.name}
                  className="flex items-baseline justify-between py-3.5"
                  style={{
                    borderTop: i === 0 ? "none" : "1px solid rgba(251,146,60,0.1)",
                  }}
                >
                  <div>
                    <div className="text-[19px] font-semibold">{ing.name}</div>
                    <div
                      className="text-[14px] mt-0.5"
                      style={{ color: "rgba(253,231,199,0.55)" }}
                    >
                      {ing.note}
                    </div>
                  </div>
                  <div
                    className="text-[18px] font-semibold tabular-nums"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "#fdba74",
                    }}
                  >
                    {ing.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl p-7"
            style={{
              background:
                "linear-gradient(135deg, rgba(234,88,12,0.12), rgba(180,83,9,0.06))",
              border: "1px solid rgba(251,146,60,0.2)",
            }}
          >
            <div
              className="text-[14px] font-bold uppercase tracking-[0.3em] mb-3"
              style={{ color: "#fb923c" }}
            >
              Origin
            </div>
            <p
              className="text-[17px] leading-[1.6]"
              style={{
                fontFamily: "'Source Serif 4', serif",
                color: "rgba(253,231,199,0.9)",
              }}
            >
              Florence, 1919. Count Camillo Negroni asked bartender Fosco Scarselli to
              stiffen his Americano with gin in place of soda. A century later,
              speakeasies from Brooklyn to Kyoto rebuilt it under glass — trading a
              splash of water for a curl of applewood smoke that settles on the surface
              like dusk on the Arno.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div
            className="rounded-2xl p-6 flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(251,146,60,0.15)",
              height: 220,
            }}
          >
            <svg width="200" height="180" viewBox="0 0 200 180">
              <defs>
                <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#9a3412" />
                </linearGradient>
                <linearGradient id="smoke" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(253,231,199,0.5)" />
                  <stop offset="100%" stopColor="rgba(253,231,199,0)" />
                </linearGradient>
              </defs>
              <ellipse cx="100" cy="30" rx="55" ry="18" fill="url(#smoke)" />
              <ellipse cx="85" cy="45" rx="35" ry="10" fill="url(#smoke)" opacity="0.6" />
              <path
                d="M55 60 L145 60 L138 155 Q100 165 62 155 Z"
                fill="rgba(251,146,60,0.06)"
                stroke="#fdba74"
                strokeWidth="2"
              />
              <path
                d="M62 90 L138 90 L133 152 Q100 161 67 152 Z"
                fill="url(#liquid)"
                opacity="0.9"
              />
              <rect
                x="82"
                y="95"
                width="36"
                height="36"
                rx="3"
                fill="rgba(253,231,199,0.35)"
                stroke="rgba(253,231,199,0.7)"
                strokeWidth="1.5"
              />
              <path
                d="M108 80 Q130 75 128 95 Q120 92 108 88 Z"
                fill="#fb923c"
                stroke="#9a3412"
                strokeWidth="1"
              />
            </svg>
          </div>

          <div
            className="rounded-2xl p-7"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(251,146,60,0.15)",
            }}
          >
            <div
              className="text-[14px] font-bold uppercase tracking-[0.3em] mb-5"
              style={{ color: "#fb923c" }}
            >
              Build
            </div>
            <ol className="space-y-4">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <div
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-bold tabular-nums"
                    style={{
                      background: "linear-gradient(135deg,#fb923c,#b45309)",
                      color: "#1a0f08",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div
                    className="text-[15px] leading-[1.55] pt-1"
                    style={{ color: "rgba(253,231,199,0.88)" }}
                  >
                    {s}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(234,88,12,0.10)",
              border: "1px solid rgba(251,146,60,0.3)",
            }}
          >
            <div
              className="text-[14px] font-bold uppercase tracking-[0.3em] mb-2"
              style={{ color: "#fdba74" }}
            >
              Garnish
            </div>
            <div className="text-[16px] leading-[1.55]">
              Expressed <span className="font-semibold">orange peel</span>, oils wiped
              along the rim — optional dehydrated blood-orange wheel clipped to the
              glass edge for service.
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-10 pt-6 flex justify-between items-center text-[14px] uppercase tracking-[0.25em]"
        style={{
          borderTop: "1px solid rgba(251,146,60,0.15)",
          color: "rgba(253,186,116,0.5)",
        }}
      >
        <div>Recipe № 047 · Bitter Series</div>
        <div>Serve 18°C · Sip slowly</div>
        <div>Card · Ava Chen, Head Bartender</div>
      </div>
    </div>
  );
}
