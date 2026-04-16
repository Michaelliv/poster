export default function Poster() {
  const headliners = ["BJÖRK", "FLOATING POINTS", "CARIBOU"];
  const tier2 = ["Jamie xx", "Kelela", "Ólafur Arnalds", "Yaeji", "Jon Hopkins", "Arca", "Fever Ray"];
  const tier3 = [
    "Sigur Rós DJ Set", "Hildur Guðnadóttir", "GusGus", "Kiasmos",
    "Bonobo", "Four Tet", "Nala Sinephro", "Loraine James",
    "Mura Masa", "Overmono", "Nicolas Jaar", "Daphni",
    "Sofia Kourtesis", "DJ Python"
  ];
  const partners = [
    { name: "ICELANDAIR", color: "#60a5fa" },
    { name: "BLUE LAGOON", color: "#22d3ee" },
    { name: "HARPA", color: "#f472b6" },
    { name: "RVK CITY", color: "#fbbf24" },
    { name: "NORDIC ARTS", color: "#a855f7" },
    { name: "66°NORTH", color: "#34d399" },
  ];

  return (
    <div
      className="w-[1400px] p-16 relative overflow-hidden"
      style={{
        fontFamily: "Inter, sans-serif",
        background:
          "radial-gradient(900px 600px at 15% 0%, rgba(34,211,238,0.25), transparent 60%), radial-gradient(900px 700px at 90% 20%, rgba(168,85,247,0.28), transparent 60%), radial-gradient(700px 500px at 50% 100%, rgba(236,72,153,0.22), transparent 60%), #05060d",
        color: "white",
      }}
    >
      <div
        className="absolute inset-x-0 top-[18%] h-[340px] opacity-60 blur-2xl"
        style={{
          background:
            "linear-gradient(90deg, transparent, #22d3ee 20%, #a855f7 55%, #ec4899 80%, transparent)",
          transform: "skewY(-6deg)",
        }}
      />
      <div
        className="absolute inset-x-0 top-[28%] h-[180px] opacity-40 blur-3xl"
        style={{
          background:
            "linear-gradient(90deg, transparent, #34d399 30%, #60a5fa 70%, transparent)",
          transform: "skewY(-3deg)",
        }}
      />

      <div className="relative flex items-start justify-between mb-10">
        <div>
          <div className="text-[14px] font-bold uppercase tracking-[0.4em] text-white/60">
            The Almanac · Vol. VI · Nordic Nights
          </div>
          <div className="mt-3 text-[18px] tracking-[0.2em] text-white/80 uppercase">
            Reykjavík, Iceland · 19–22 August 2026
          </div>
        </div>
        <div className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-[14px] uppercase tracking-[0.3em] text-white/80">
          Four Nights · Midnight Sun
        </div>
      </div>

      <div className="relative mb-4 leading-none">
        <div
          className="text-[180px] font-black tracking-tight leading-[0.85]"
          style={{
            background:
              "linear-gradient(180deg,#f0f9ff 0%,#67e8f9 35%,#c084fc 70%,#f9a8d4 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          AURORA
        </div>
        <div
          className="text-[180px] font-black italic tracking-tight leading-[0.85] -mt-2"
          style={{
            fontFamily: "'Source Serif 4', serif",
            background:
              "linear-gradient(180deg,#fef3c7 0%,#f472b6 45%,#a855f7 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Sound <span style={{ fontFamily: "Inter, sans-serif", fontStyle: "normal", fontWeight: 900, color: "white" }}>’26</span>
        </div>
      </div>

      <div className="relative mt-12 border-y border-white/15 py-10 space-y-2 text-center">
        {headliners.map((name) => (
          <div
            key={name}
            className="text-[96px] font-black uppercase leading-[0.95] tracking-tight"
            style={{
              background:
                "linear-gradient(180deg,#ffffff 0%,#e0e7ff 50%,#a5f3fc 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            {name}
          </div>
        ))}
      </div>

      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {tier2.map((name, i) => (
          <span
            key={name}
            className="text-[44px] font-bold uppercase tracking-tight text-white/95"
          >
            {name}
            {i < tier2.length - 1 && (
              <span className="ml-10 text-white/30">·</span>
            )}
          </span>
        ))}
      </div>

      <div className="relative mt-8 grid grid-cols-4 gap-x-6 gap-y-3 text-center">
        {tier3.map((name) => (
          <div
            key={name}
            className="text-[22px] font-semibold uppercase tracking-[0.05em] text-white/70"
          >
            {name}
          </div>
        ))}
      </div>

      <div className="relative mt-14 pt-8 border-t border-white/15 flex items-center justify-between">
        <div>
          <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/50">
            Presented with
          </div>
          <div className="mt-4 flex items-center gap-4">
            {partners.map((p, i) => {
              const shapes = ["rounded-full", "rounded-sm rotate-45", "rounded-lg", "rounded-full", "rounded-none", "rounded-2xl"];
              return (
                <div key={p.name} className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 ${shapes[i]}`}
                    style={{ background: p.color, boxShadow: `0 0 20px ${p.color}80` }}
                  />
                  <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-white/80">
                    {p.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/50">
            Passes · aurorasound.is
          </div>
          <div className="mt-2 text-[20px] font-bold uppercase tracking-[0.15em] text-white">
            4-Day · Weekender · Single Night
          </div>
        </div>
      </div>
    </div>
  );
}
