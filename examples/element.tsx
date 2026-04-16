
import React from "react";

export default function MercuryCard() {
  const mono = { fontFamily: "'JetBrains Mono', monospace" };
  const serif = { fontFamily: "'Source Serif 4', serif" };

  const Row = ({ k, v, sub }: { k: string; v: string; sub?: string }) => (
    <div className="flex items-baseline justify-between border-b border-white/[0.06] py-2">
      <span className="text-[14px] uppercase tracking-[0.2em] text-white/50" style={mono}>{k}</span>
      <span className="text-right">
        <span className="text-[18px] text-white tabular-nums" style={mono}>{v}</span>
        {sub && <span className="ml-2 text-[14px] text-white/40" style={mono}>{sub}</span>}
      </span>
    </div>
  );

  return (
    <div
      className="w-[1200px] p-10 text-white"
      style={{
        background:
          "radial-gradient(700px 500px at 85% 0%, rgba(192,192,210,0.18), transparent 60%), radial-gradient(600px 500px at 10% 100%, rgba(180,140,120,0.15), transparent 60%), #0a0a0f",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/50" style={mono}>
            Periodic Almanac · Vol. VI · Transition Metals
          </div>
          <div className="mt-2 text-[56px] leading-none" style={serif}>
            <span className="italic" style={{
              backgroundImage: "linear-gradient(180deg,#e5e7eb,#a1a1aa,#71717a)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}>Mercury</span>
            <span className="text-white/70"> — the quick silver.</span>
          </div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[14px]" style={mono}>
          Group 12 · Period 6 · d-block
        </div>
      </div>

      <div className="mt-8 grid grid-cols-12 gap-5">
        <div
          className="col-span-5 relative rounded-2xl border border-white/[0.08] p-6"
          style={{
            background: "linear-gradient(160deg, rgba(220,220,235,0.08), rgba(120,100,110,0.04))",
            boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.08), 0 30px 60px -24px rgba(0,0,0,0.7)",
          }}
        >
          <div className="flex items-start justify-between">
            <div className="text-[22px] tabular-nums text-white/70" style={mono}>80</div>
            <div className="text-right">
              <div className="text-[14px] uppercase tracking-[0.2em] text-white/40" style={mono}>liquid</div>
              <div className="text-[14px] text-white/40" style={mono}>at 298 K</div>
            </div>
          </div>
          <div
            className="mt-4 text-center leading-none"
            style={{
              ...serif,
              fontSize: 240,
              backgroundImage: "linear-gradient(180deg,#f4f4f5 0%,#a1a1aa 55%,#52525b 100%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 80px rgba(200,200,220,0.15)",
            }}
          >
            Hg
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="text-[14px] uppercase tracking-[0.25em] text-white/50" style={mono}>hydrargyrum</div>
            <div className="text-[22px] tabular-nums text-white" style={mono}>200.592</div>
          </div>
          <div className="mt-1 text-right text-[14px] text-white/40" style={mono}>standard atomic weight (u)</div>
        </div>

        <div
          className="col-span-7 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6"
          style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.04), 0 20px 40px -24px rgba(0,0,0,0.6)" }}
        >
          <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/50" style={mono}>
            Physical · Thermodynamic
          </div>
          <div className="mt-3">
            <Row k="Melting point" v="234.3210 K" sub="−38.8290 °C" />
            <Row k="Boiling point" v="629.88 K" sub="356.73 °C" />
            <Row k="Density (liq, 25 °C)" v="13.534 g·cm⁻³" />
            <Row k="Triple point" v="234.3156 K" sub="0.1650 mPa" />
            <Row k="Heat of fusion" v="2.29 kJ·mol⁻¹" />
            <Row k="Heat of vaporization" v="59.11 kJ·mol⁻¹" />
            <Row k="Vapor pressure (20 °C)" v="0.1713 Pa" />
          </div>
        </div>

        <div className="col-span-7 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
          <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/50" style={mono}>
            Electronic Structure
          </div>
          <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/30 p-4" style={mono}>
            <div className="text-[14px] uppercase tracking-[0.2em] text-white/40">ground-state configuration</div>
            <div className="mt-1 text-[20px]">
              <span className="text-amber-200/80">[Xe]</span>{" "}
              <span className="text-white">4f</span><sup className="text-white/70">14</sup>{" "}
              <span className="text-white">5d</span><sup className="text-white/70">10</sup>{" "}
              <span className="text-white">6s</span><sup className="text-white/70">2</sup>
            </div>
            <div className="mt-3 text-[14px] text-white/50">shells · 2, 8, 18, 32, 18, 2</div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-6">
            <Row k="Electronegativity (Pauling)" v="2.00" />
            <Row k="Atomic radius" v="151 pm" />
            <Row k="1st ionization" v="1007.1 kJ·mol⁻¹" />
            <Row k="Covalent radius" v="132 pm" />
            <Row k="2nd ionization" v="1810 kJ·mol⁻¹" />
            <Row k="Oxidation states" v="+1, +2, (−2, +4)" />
          </div>
        </div>

        <div className="col-span-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
          <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/50" style={mono}>
            Stable Isotopes
          </div>
          <div className="mt-3 space-y-1.5" style={mono}>
            {[
              ["¹⁹⁶Hg", "0.15 %"],
              ["¹⁹⁸Hg", "9.97 %"],
              ["¹⁹⁹Hg", "16.87 %"],
              ["²⁰⁰Hg", "23.10 %"],
              ["²⁰¹Hg", "13.18 %"],
              ["²⁰²Hg", "29.86 %"],
              ["²⁰⁴Hg", "6.87 %"],
            ].map(([i, a]) => {
              const pct = parseFloat(a);
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-[70px] text-[14px] text-white/80">{i}</div>
                  <div className="h-2 flex-1 rounded-full bg-white/[0.05] overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${(pct / 30) * 100}%`,
                        background: "linear-gradient(90deg,#e5e7eb,#a1a1aa)",
                      }}
                    />
                  </div>
                  <div className="w-[60px] text-right text-[14px] tabular-nums text-white/70">{a}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 rounded-xl border border-rose-400/20 bg-rose-500/[0.06] p-3">
            <div className="text-[14px] font-bold uppercase tracking-[0.2em] text-rose-200/80" style={mono}>⚠ Toxicity</div>
            <div className="mt-1 text-[14px] text-white/70">
              Vapor and organomercurials (MeHg) are potent neurotoxins. Minamata Convention (2013) restricts use globally.
            </div>
          </div>
        </div>

        <div className="col-span-12 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
          <div className="flex items-baseline justify-between">
            <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/50" style={mono}>
              Historical Notes
            </div>
            <div className="text-[14px] text-white/40" style={mono}>known since ≈ 1500 BCE</div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-5 text-[15px] leading-relaxed text-white/75" style={serif}>
            <div>
              <div className="text-[14px] uppercase tracking-[0.2em] text-amber-200/70" style={mono}>Antiquity</div>
              <p className="mt-1">Found in Egyptian tombs dated to 1500 BCE. Chinese and Hindu texts record its use in vermilion (HgS) as a pigment and elixir.</p>
            </div>
            <div>
              <div className="text-[14px] uppercase tracking-[0.2em] text-amber-200/70" style={mono}>Alchemy</div>
              <p className="mt-1">One of the three primes (tria prima) with salt and sulfur. Named for the swift planet; symbol ☿ shared by metal and god.</p>
            </div>
            <div>
              <div className="text-[14px] uppercase tracking-[0.2em] text-amber-200/70" style={mono}>1643 · Torricelli</div>
              <p className="mt-1">The first barometer — a 760 mm column of mercury in a glass tube — established atmospheric pressure as a measurable quantity.</p>
            </div>
            <div>
              <div className="text-[14px] uppercase tracking-[0.2em] text-amber-200/70" style={mono}>1759 · Braun & Lomonosov</div>
              <p className="mt-1">First to freeze mercury solid in St. Petersburg using a freezing mixture, proving it was a metal like any other.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-[14px] text-white/40" style={mono}>
        <div>CAS 7439-97-6 · Z = 80 · Block d · f-Series</div>
        <div>Card 080 / 118 — Periodic Almanac</div>
      </div>
    </div>
  );
}
