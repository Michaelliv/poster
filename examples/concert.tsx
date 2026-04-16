export default function Concert() {
  return (
    <div className="relative min-h-screen overflow-hidden p-10" style={{ background: "#0b0a0c", fontFamily: "'Inter', sans-serif" }}>
      {/* noise texture */}
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "repeating-radial-gradient(circle at 20% 30%, white 0, white 1px, transparent 1px, transparent 3px)" }} />
      {/* giant stacked typography */}
      <div className="relative h-full">
        <div className="absolute top-0 left-0 right-0 flex items-baseline justify-between">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/40">TRACK LIST 01 → 14</span>
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/40">SIDE A</span>
        </div>

        {/* FAT TITLE */}
        <div className="pt-10 text-white">
          <div className="text-[12px] font-bold uppercase tracking-[0.5em] text-[#f97316]">Live at Tanzhaus · Berlin</div>
          <div className="mt-4 leading-[0.82]">
            <div className="text-[200px] font-black tracking-[-0.06em] text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(180deg,#fef3c7,#f97316 60%,#dc2626)" }}>LOUD</div>
            <div className="text-[200px] font-black tracking-[-0.06em] -mt-8 text-white italic">&amp;</div>
            <div className="text-[200px] font-black tracking-[-0.06em] -mt-8 text-transparent bg-clip-text outline-text" style={{ WebkitTextStroke: "3px #fef3c7", color: "transparent" }}>CLEAR</div>
          </div>
        </div>

        {/* center strip */}
        <div className="mt-6 flex items-center justify-between border-y border-white/15 py-4">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#f97316]" />
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-white">May 03 · 2026</span>
          </div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-white/50">Doors 19:00 · Sold out</div>
        </div>

        {/* artist names column */}
        <div className="mt-6 grid grid-cols-2 gap-8 text-white">
          <div className="space-y-3">
            {[
              ["01", "Kiasmos", "Headline"],
              ["02", "Nala Sinephro", "Support"],
              ["03", "KAITLYN AURELIA SMITH", "Solo set"],
              ["04", "Moin", "Opening"],
            ].map(([n, name, role]) => (
              <div key={n} className="flex items-baseline gap-3 border-b border-white/10 pb-2">
                <span className="w-8 font-mono text-xs text-white/40">{n}</span>
                <span className="flex-1 text-lg font-bold uppercase tracking-tight">{name}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#f97316]">{role}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Venue</div>
              <div className="mt-1 text-xl font-bold">Tanzhaus Alpha</div>
              <div className="text-sm text-white/60">Revaler Str. 99 · 10245 Berlin</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Tickets</div>
              <div className="mt-1 text-xl font-bold">€28 / €36 door</div>
              <div className="text-sm text-white/60">tanzhaus.de/loudandclear</div>
            </div>
            <div className="rounded-2xl border border-[#f97316]/40 bg-[#f97316]/10 p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f97316]">All ages · vinyl · cash only</div>
              <div className="mt-1 text-sm text-white/80">No re-entry after 22:00. Ear plugs at the door.</div>
            </div>
          </div>
        </div>

        {/* bottom tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {["ambient", "drone", "post-techno", "IDM", "modular", "generative", "field-recording"].map((t) => (
            <span key={t} className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-white/70">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
