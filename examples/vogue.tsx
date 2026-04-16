export default function Vogue() {
  return (
    <div className="relative w-[1200px] overflow-hidden" style={{ fontFamily: "'Source Serif 4', Georgia, serif", background: "#f5e8de" }}>
      {/* Abstract "photo" — radial portrait mock */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 40%, #1a0b05 0%, #2d1810 25%, #8b4513 50%, #d4a574 70%, #f5e8de 90%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, transparent 55%, rgba(0,0,0,0.45) 100%)" }} />
      {/* face suggestion */}
      <div className="absolute left-1/2 top-[36%] h-[180px] w-[140px] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle at 50% 40%, #e8c7a0 0%, #c89874 60%, transparent 90%)", filter: "blur(4px)" }} />
      {/* hair */}
      <div className="absolute left-1/2 top-[30%] h-[220px] w-[200px] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(ellipse at 50% 20%, #0d0705 0%, #1a0f0a 50%, transparent 80%)", filter: "blur(6px)", zIndex: 1 }} />

      <div className="relative z-10 flex min-h-[1600px] flex-col">
        {/* masthead */}
        <div className="text-center pt-12">
          <h1 className="text-[180px] leading-none font-black tracking-[-0.04em] text-white" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>MUSE</h1>
          <div className="mt-2 text-[16px] font-semibold uppercase tracking-[0.5em] text-white/90">April · Portrait Issue · N°74</div>
        </div>

        <div className="flex-1" />

        {/* barcode strip */}
        <div className="absolute top-[14%] right-8 flex gap-[2px]">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} style={{ width: i % 3 === 0 ? 2 : 1, height: 40, background: "white" }} />
          ))}
        </div>
        <div className="absolute top-[20%] right-8 text-[14px] font-mono text-white/80 tracking-wider">5 · 03 2026 · $14</div>

        {/* left cover lines */}
        <div className="absolute left-8 top-[32%] max-w-[220px] space-y-5 text-white">
          <div>
            <div className="text-[14px] font-bold uppercase tracking-[0.3em] opacity-70">Exclusive</div>
            <div className="mt-1 text-2xl font-semibold leading-tight italic">Anaïs, at last.</div>
          </div>
          <div>
            <div className="text-[14px] font-bold uppercase tracking-[0.3em] opacity-70">Essay</div>
            <div className="mt-1 text-lg font-medium leading-snug">On the quiet power of a single sentence.</div>
          </div>
          <div>
            <div className="text-[14px] font-bold uppercase tracking-[0.3em] opacity-70">Portfolio</div>
            <div className="mt-1 text-lg font-medium leading-snug">48 pages of Tokyo at dusk.</div>
          </div>
        </div>

        {/* right cover lines */}
        <div className="absolute right-8 top-[36%] max-w-[200px] space-y-5 text-right text-white">
          <div>
            <div className="text-[14px] font-bold uppercase tracking-[0.3em] opacity-70">Profile</div>
            <div className="mt-1 text-xl font-medium italic leading-snug">"I only photograph what I can't explain."</div>
          </div>
          <div>
            <div className="text-[14px] font-bold uppercase tracking-[0.3em] opacity-70">Travel</div>
            <div className="mt-1 text-lg font-medium leading-snug">Lisbon in the blue hour.</div>
          </div>
        </div>

        {/* bottom title block */}
        <div className="relative z-10 bg-black px-10 py-6 text-white">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[14px] font-bold uppercase tracking-[0.4em] text-white/50">Cover Story</div>
              <div className="mt-2 text-[68px] font-black leading-[0.9] tracking-tight">Anaïs Okafor</div>
              <div className="mt-1 text-xl font-light italic tracking-wide text-white/80">the year of looking slowly.</div>
            </div>
            <div className="text-right">
              <div className="text-[14px] uppercase tracking-wider text-white/50">Photographed by</div>
              <div className="text-sm font-semibold">Lior Mendez</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
