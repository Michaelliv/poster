import { Flame, Clock, Users, UtensilsCrossed } from "lucide-react";

const categories = [
  {
    name: "Proteins",
    items: [
      { q: "500 g", n: "Rabbit, bone-in, jointed" },
      { q: "500 g", n: "Free-range chicken thighs" },
      { q: "200 g", n: "Pork ribs, cut small" },
      { q: "150 g", n: "Snails (vaquetes), purged" },
      { q: "12 ea", n: "Gambas rojas de Dénia" },
      { q: "8 ea", n: "Cigalas (langoustines)" },
    ],
  },
  {
    name: "Vegetables & Beans",
    items: [
      { q: "200 g", n: "Ferradura flat green beans" },
      { q: "150 g", n: "Garrofó (butter beans), soaked" },
      { q: "150 g", n: "Tavella white beans" },
      { q: "2 ea", n: "Ramps of tender artichoke" },
      { q: "4 ea", n: "Ripe tomatoes, grated" },
      { q: "6 cloves", n: "Garlic, confited in oil" },
    ],
  },
  {
    name: "Rice, Stock & Fat",
    items: [
      { q: "400 g", n: "Bomba rice, D.O. Calasparra" },
      { q: "1.6 L", n: "Chicken & rabbit stock, hot" },
      { q: "120 ml", n: "Arbequina olive oil" },
      { q: "80 g", n: "Jamón serrano trim" },
      { q: "1 sprig", n: "Rosemary, just before off-heat" },
      { q: "1 bay", n: "Dried laurel leaf" },
    ],
  },
  {
    name: "Spice, Season & Finish",
    items: [
      { q: "1 tsp", n: "Smoked pimentón de la Vera" },
      { q: "0.3 g", n: "Saffron, bloomed in broth" },
      { q: "2 tsp", n: "Sea salt, in layers" },
      { q: "1 tsp", n: "Sweet paprika, dulce" },
      { q: "1 lemon", n: "Cut into six wedges" },
      { q: "to taste", n: "Cracked black pepper" },
    ],
  },
];

const steps = [
  { t: "Build the sofrito base", d: "Warm the olive oil across the full pan. Sear rabbit, chicken and ribs in batches until deeply burnished — the fond is the soul of the dish. Push the meats to the rim." },
  { t: "Sweat beans & vegetables", d: "Add ferradura, garrofó and tavella to the centre. Cook 6 minutes until the green sings. Fold in grated tomato and confit garlic; reduce until it turns a terracotta jam." },
  { t: "Bloom the spice", d: "Off the heat, rain in pimentón and sweet paprika. Stir for 20 seconds — long enough to wake it, short enough not to scorch. Return to a medium flame." },
  { t: "Pour the stock", d: "Add the boiling stock to the line etched on the pan's rivets. Slip in saffron and bay. Taste: the broth should be one shade saltier than soup." },
  { t: "Scatter the rice", d: "Cast the bomba in a cross, then level with the back of a spoon. Do not stir again. Boil hard for 8 minutes — you are setting the grain." },
  { t: "Nest the seafood", d: "Press gambas and cigalas into the surface, shells up. Lower the heat to a whisper. Cook 10 minutes while the rice drinks the broth to the floor." },
  { t: "Coax the socarrat", d: "Raise the flame for 60 seconds. Listen for the crackle — that caramelised crust on the base is the prize. Lay the rosemary across the top." },
  { t: "Rest, then serve", d: "Cover loosely with newspaper for 5 minutes off-heat. Serve straight from the pan with lemon wedges. Eat from your wedge inward, never across." },
];

export default function Poster() {
  return (
    <div
      className="w-[1400px] p-16 text-[#2a1a0f]"
      style={{
        background:
          "radial-gradient(1100px 700px at 0% 0%, rgba(251,191,36,0.22), transparent 60%), radial-gradient(900px 600px at 100% 100%, rgba(225,29,72,0.12), transparent 60%), #faf5ed",
        fontFamily: "'Inter', system-ui",
      }}
    >
      {/* Masthead */}
      <div className="flex items-center justify-between border-b-2 border-[#2a1a0f] pb-4 text-[14px]"
           style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
        <div className="font-bold uppercase tracking-[0.3em]">
          La Mesa · Vol. VII · Arroz
        </div>
        <div className="uppercase tracking-[0.3em] text-[#2a1a0f]/60">
          Recipe N.º 24 — Valencia, Spring
        </div>
      </div>

      {/* Hero */}
      <div className="mt-10 grid grid-cols-[1fr_auto] items-end gap-10">
        <div>
          <div className="text-[15px] font-bold uppercase tracking-[0.4em] text-[#b45309]">
            A Sunday fire in the orchard
          </div>
          <h1 className="mt-3 font-black tracking-tight leading-[0.88]" style={{ fontSize: 112 }}>
            Paella{" "}
            <em
              className="italic font-normal"
              style={{
                fontFamily: "'Source Serif 4', serif",
                background:
                  "linear-gradient(180deg,#fbbf24 0%,#f97316 50%,#b91c1c 100%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Valenciana
            </em>
          </h1>
          <p className="mt-5 max-w-[720px] text-lg leading-relaxed text-[#2a1a0f]/75"
             style={{ fontFamily: "'Source Serif 4', serif" }}>
            The true one — cooked wide and shallow over vine-cutting embers, built on rabbit, chicken and the three holy beans of the <em>huerta</em>. Twenty-four ingredients, a single pan, and the quiet intelligence to leave the rice alone.
          </p>
        </div>
        <div className="flex gap-5 pb-2" style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
          {[
            { Icon: Users, k: "Serves", v: "6" },
            { Icon: Clock, k: "Time", v: "1h 40m" },
            { Icon: Flame, k: "Fire", v: "Medium" },
            { Icon: UtensilsCrossed, k: "Pan", v: "46 cm" },
          ].map(({ Icon, k, v }) => (
            <div key={k} className="rounded-xl border-2 border-[#2a1a0f] bg-white/60 px-4 py-3 text-center w-[104px]">
              <Icon className="mx-auto h-5 w-5 text-[#b45309]" />
              <div className="mt-2 text-[14px] uppercase tracking-[0.2em] text-[#2a1a0f]/60">{k}</div>
              <div className="mt-1 text-xl font-bold">{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mt-12 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#2a1a0f]/30" />
        <div className="text-[14px] font-bold uppercase tracking-[0.4em] text-[#2a1a0f]/70"
             style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
          § I — La Despensa · The Pantry · 24 items
        </div>
        <div className="h-px flex-1 bg-[#2a1a0f]/30" />
      </div>

      {/* Ingredients: 4 categories */}
      <div className="mt-8 grid grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <div key={cat.name} className="rounded-2xl border border-[#2a1a0f]/15 bg-white/70 p-5"
               style={{ boxShadow: "0 20px 40px -28px rgba(42,26,15,0.35)" }}>
            <div className="flex items-baseline justify-between border-b border-[#2a1a0f]/20 pb-3">
              <div className="text-[14px] font-bold uppercase tracking-[0.25em] text-[#b45309]"
                   style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
                N.º 0{i + 1}
              </div>
              <div className="text-[14px] uppercase tracking-[0.2em] text-[#2a1a0f]/50">6 items</div>
            </div>
            <h3 className="mt-3 text-2xl font-bold tracking-tight"
                style={{ fontFamily: "'Source Serif 4', serif" }}>
              {cat.name}
            </h3>
            <ul className="mt-4 space-y-3">
              {cat.items.map((it) => (
                <li key={it.n} className="flex gap-3 text-[14px] leading-snug">
                  <span className="shrink-0 w-[74px] font-bold tabular-nums text-[#b91c1c]"
                        style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
                    {it.q}
                  </span>
                  <span className="text-[#2a1a0f]/85">{it.n}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-14 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#2a1a0f]/30" />
        <div className="text-[14px] font-bold uppercase tracking-[0.4em] text-[#2a1a0f]/70"
             style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
          § II — El Método · The Method · 8 movements
        </div>
        <div className="h-px flex-1 bg-[#2a1a0f]/30" />
      </div>

      {/* Steps 4x2 */}
      <div className="mt-8 grid grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <div key={s.t} className="relative rounded-2xl border border-[#2a1a0f]/15 bg-white/80 p-6 pt-8"
               style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.8), 0 18px 36px -26px rgba(42,26,15,0.35)" }}>
            <div
              className="absolute -top-5 left-5 flex h-10 w-10 items-center justify-center rounded-full text-white text-lg font-black tabular-nums"
              style={{
                background: "linear-gradient(135deg,#f97316,#b91c1c)",
                boxShadow: "0 8px 20px -6px rgba(185,28,28,0.55)",
              }}
            >
              {i + 1}
            </div>
            <h4 className="text-lg font-bold tracking-tight leading-tight"
                style={{ fontFamily: "'Source Serif 4', serif" }}>
              {s.t}
            </h4>
            <p className="mt-3 text-[14px] leading-relaxed text-[#2a1a0f]/75">{s.d}</p>
          </div>
        ))}
      </div>

      {/* Pull quote */}
      <div className="mt-14 grid grid-cols-[auto_1fr] items-center gap-6 border-y-2 border-[#2a1a0f] py-8">
        <div className="text-6xl font-black leading-none text-[#b91c1c]"
             style={{ fontFamily: "'Source Serif 4', serif" }}>“</div>
        <p className="text-2xl leading-snug italic text-[#2a1a0f]/85"
           style={{ fontFamily: "'Source Serif 4', serif" }}>
          A paella that must be stirred is already lost. The fire does the work; the cook only listens — first for the boil, then for the hush, and finally for the crackle of the socarrat beneath.
          <span className="ml-3 not-italic text-base text-[#2a1a0f]/55">— Tía Amparo, Sueca</span>
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-8 flex items-center justify-between text-[14px] uppercase tracking-[0.3em] text-[#2a1a0f]/55"
              style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
        <span>La Mesa · 16 April 2026</span>
        <span>Printed in Valencia · pag. 24</span>
      </footer>
    </div>
  );
}