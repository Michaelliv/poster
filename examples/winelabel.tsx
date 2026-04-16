export default function WineLabel() {
  const gold = "#b8893b";
  const goldLight = "#d8b56a";
  const cream = "#f3ead2";
  const ink = "#2a1d12";

  return (
    <div
      className="w-[900px] h-[1300px] relative overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 30%, #fbf3d9 0%, #f1e3bd 55%, #e2cf9c 100%)",
        fontFamily: "'Source Serif 4', serif",
        color: ink,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 30% 20%, rgba(90,60,20,0.12) 0 1px, transparent 1px 3px), repeating-radial-gradient(circle at 70% 80%, rgba(90,60,20,0.10) 0 1px, transparent 1px 4px)",
        }}
      />
      <div
        className="absolute"
        style={{
          inset: 36,
          border: `2px solid ${gold}`,
          boxShadow: `inset 0 0 0 6px ${cream}, inset 0 0 0 7px ${goldLight}`,
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center px-20 pt-20 pb-14 text-center">
        <div className="text-[15px] tracking-[0.5em] font-bold" style={{ color: gold }}>
          MISE EN BOUTEILLE AU DOMAINE
        </div>
        <div className="mt-3 text-[14px] tracking-[0.45em]" style={{ color: ink, opacity: 0.7 }}>
          ★  VIGNERON DEPUIS 1873  ★
        </div>

        <div className="flex items-center gap-3 mt-7 w-full">
          <div className="flex-1 h-px" style={{ background: gold }} />
          <svg width="22" height="22" viewBox="0 0 22 22">
            <path d="M11 2 L13 9 L20 11 L13 13 L11 20 L9 13 L2 11 L9 9 Z" fill={gold} />
          </svg>
          <div className="flex-1 h-px" style={{ background: gold }} />
        </div>

        <div className="mt-8 text-[26px] tracking-[0.35em]" style={{ color: ink, fontVariant: "small-caps" }}>
          Château
        </div>
        <div
          className="text-[78px] leading-[0.95] italic mt-1"
          style={{
            background: `linear-gradient(180deg, ${goldLight} 0%, ${gold} 55%, #8a6420 100%)`,
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Solène
        </div>

        <svg width="280" height="260" viewBox="0 0 280 260" className="mt-4" style={{ color: ink }}>
          <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
            <path d="M140 240 C 140 200, 138 160, 140 110 C 142 70, 145 40, 140 18" />
            <path d="M140 90 C 120 78, 108 70, 95 55 C 88 47, 86 40, 92 36 C 97 33, 104 38, 105 48" />
            <path d="M140 130 C 162 122, 178 116, 195 100 C 204 91, 206 82, 198 78 C 190 75, 184 82, 184 92" />
            <path d="M140 175 C 118 168, 102 160, 88 145 C 80 136, 80 128, 88 126 C 96 124, 102 132, 100 142" />
            <path d="M105 50 C 80 50, 60 65, 55 90 C 75 92, 95 80, 105 50 Z" />
            <path d="M55 90 C 60 75, 75 65, 95 65" />
            <path d="M70 80 L 90 70 M 65 88 L 95 78 M 70 95 L 100 86" />
            <path d="M100 145 C 75 150, 58 168, 60 195 C 82 192, 100 175, 100 145 Z" />
            <path d="M62 192 C 70 180, 82 168, 96 162" />
            <path d="M75 180 L 92 172 M 72 188 L 95 180" />
            <path d="M184 92 C 210 90, 228 105, 232 130 C 210 132, 192 122, 184 92 Z" />
            <path d="M232 130 C 224 116, 210 105, 192 102" />
            <path d="M210 118 L 222 108 M 208 125 L 226 116 M 200 122 L 220 112" />
            <g>
              {[[140,215],[128,222],[152,222],[134,232],[146,232],[140,240],[122,232],[158,232]].map(([cx,cy],i)=>(
                <circle key={i} cx={cx} cy={cy} r="6" />
              ))}
            </g>
            <path d="M140 18 C 130 10, 124 8, 118 12 M140 18 C 150 10, 156 8, 162 12" />
            <circle cx="140" cy="14" r="2.4" fill="currentColor" />
          </g>
        </svg>

        <div className="mt-2 text-[64px] tracking-[0.18em]" style={{ color: ink }}>
          2019
        </div>

        <div className="mt-4 flex items-center gap-3 w-full">
          <div className="flex-1 h-px" style={{ background: gold }} />
          <div className="text-[22px] tracking-[0.42em] font-semibold" style={{ color: gold }}>
            CÔTE-RÔTIE
          </div>
          <div className="flex-1 h-px" style={{ background: gold }} />
        </div>
        <div className="mt-2 text-[14px] tracking-[0.4em]" style={{ color: ink, opacity: 0.78 }}>
          APPELLATION CÔTE-RÔTIE CONTRÔLÉE
        </div>

        <div className="flex-1" />

        <div className="w-full">
          <div className="flex items-end justify-between px-2">
            <div className="text-left">
              <div className="text-[14px] tracking-[0.32em]" style={{ opacity: 0.7 }}>PRODUIT DE</div>
              <div className="text-[16px] tracking-[0.28em] mt-1" style={{ color: ink, fontVariant: "small-caps" }}>
                France
              </div>
            </div>
            <div
              className="text-[34px] italic"
              style={{
                background: `linear-gradient(180deg, ${goldLight}, ${gold} 70%, #7d5a1c)`,
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              13.5% vol
            </div>
            <div className="text-right">
              <div className="text-[14px] tracking-[0.32em]" style={{ opacity: 0.7 }}>CONTENU</div>
              <div className="text-[16px] tracking-[0.28em] mt-1" style={{ color: ink, fontVariant: "small-caps" }}>
                750 ml e
              </div>
            </div>
          </div>

          <div className="mt-5 mx-auto" style={{ width: 180, height: 1, background: gold, opacity: 0.7 }} />

          <div
            className="mt-4 text-[14px] tracking-[0.16em] leading-[1.6]"
            style={{ color: ink, opacity: 0.72, fontFamily: "Inter, sans-serif" }}
          >
            IMPORTED BY MERIDIAN &amp; PORTER WINE MERCHANTS · 142 GANSEVOORT ST,
            NEW YORK, NY 10014 · CONTAINS SULFITES · GOVERNMENT WARNING:
            ACCORDING TO THE SURGEON GENERAL, WOMEN SHOULD NOT DRINK ALCOHOLIC
            BEVERAGES DURING PREGNANCY.
          </div>
        </div>
      </div>
    </div>
  );
}
