export default function Memphis() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f5f1e8] p-10" style={{ fontFamily: "'Inter', system-ui" }}>
      {/* floating shapes */}
      <div className="absolute top-10 left-[8%] h-24 w-24 rounded-full bg-[#fb7185]" />
      <div className="absolute top-[16%] right-[10%] h-32 w-32 bg-[#22d3ee]" style={{ transform: "rotate(18deg)" }} />
      <svg className="absolute" style={{ top: "8%", left: "45%", width: 120, height: 120 }}>
        <polygon points="60,0 120,120 0,120" fill="#fbbf24" />
      </svg>
      {/* squiggle */}
      <svg className="absolute bottom-[12%] left-[6%]" width="220" height="60" viewBox="0 0 220 60">
        <path d="M 0 30 Q 20 0 40 30 T 80 30 T 120 30 T 160 30 T 200 30" fill="none" stroke="#6d28d9" strokeWidth="6" strokeLinecap="round" />
      </svg>
      {/* dots grid */}
      <svg className="absolute right-[6%] bottom-[8%]" width="160" height="160">
        {Array.from({ length: 64 }).map((_, i) => {
          const x = (i % 8) * 20 + 6;
          const y = Math.floor(i / 8) * 20 + 6;
          return <circle key={i} cx={x} cy={y} r={3} fill="#0f172a" />;
        })}
      </svg>
      {/* stripes block */}
      <div className="absolute top-[52%] left-[2%] h-[110px] w-[180px] rotate-[-8deg]" style={{ background: "repeating-linear-gradient(45deg,#0f172a 0 6px,transparent 6px 14px)" }} />
      {/* confetti */}
      {[["#fb7185", 20, 70], ["#22d3ee", 82, 46], ["#fbbf24", 62, 82], ["#6d28d9", 30, 88], ["#34d399", 92, 22], ["#ec4899", 6, 30]].map(([c, x, y], i) => (
        <div key={i} className="absolute h-4 w-4 rounded-sm" style={{ background: c as string, left: `${x}%`, top: `${y}%`, transform: `rotate(${i * 45}deg)` }} />
      ))}

      {/* content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center">
        <div className="max-w-3xl rounded-[28px] border-4 border-[#0f172a] bg-white p-10 shadow-[12px_12px_0_0_#0f172a]">
          <div className="text-[12px] font-black uppercase tracking-[0.3em] text-[#fb7185]">Hello · 1991 · Energy</div>
          <h1 className="mt-4 text-[96px] font-black leading-[0.88] tracking-tight text-[#0f172a]">
            Make<br/>
            <span className="text-[#6d28d9]">weird</span><br/>
            <span className="underline decoration-[#fbbf24] decoration-8 underline-offset-8">stuff.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-[#0f172a]/70">A poster is a good excuse to put shapes on a page for no reason. The reason is joy. That is the reason.</p>
          <div className="mt-8 flex items-center gap-4">
            <div className="rounded-full bg-[#0f172a] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#fef3c7]">RSVP ↗</div>
            <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0f172a]/60">Sept 14 · 7pm · The Studio</div>
          </div>
        </div>
      </div>
    </div>
  );
}
