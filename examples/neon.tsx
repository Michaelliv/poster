export default function Neon() {
  const scan = Array.from({ length: 14 }, (_, i) => i);
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "radial-gradient(1000px 600px at 50% 110%, rgba(236,72,153,0.35), transparent 60%), radial-gradient(800px 500px at 10% 10%, rgba(34,211,238,0.2), transparent 60%), #05010f",
        fontFamily: "'Inter', system-ui",
      }}
    >
      <svg className="absolute inset-x-0 bottom-0" viewBox="0 0 1000 300" preserveAspectRatio="none" style={{ height: "55%", width: "100%" }}>
        <defs>
          <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {Array.from({ length: 18 }).map((_, i) => {
          const y = (i / 17) ** 2 * 300;
          return <line key={"h"+i} x1="0" x2="1000" y1={y} y2={y} stroke="url(#gridFade)" strokeWidth={0.6} />;
        })}
        {Array.from({ length: 41 }).map((_, i) => {
          const x = (i - 20) * 60;
          return <line key={"v"+i} x1={500 + x * 0.03} y1={0} x2={500 + x} y2={300} stroke="url(#gridFade)" strokeWidth={0.6} />;
        })}
      </svg>
      <div className="absolute left-1/2 -translate-x-1/2" style={{ top: "22%", width: 320, height: 320, borderRadius: "50%", background: "linear-gradient(180deg,#fde68a 0%,#f59e0b 35%,#ec4899 70%,#6d28d9 100%)", boxShadow: "0 0 120px 30px rgba(236,72,153,0.45), 0 0 240px 60px rgba(109,40,217,0.35)" }} />
      {scan.map((i) => (
        <div key={i} className="absolute left-1/2 -translate-x-1/2 bg-black" style={{ top: `${23 + i * 1.25}%`, width: 320, height: 6 + i * 0.3, opacity: 0.92 }} />
      ))}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between py-12 text-white">
        <div className="text-[11px] font-bold uppercase tracking-[0.5em]" style={{ color: "#f0abfc" }}>Side A · 198X</div>
        <div className="text-center">
          <h1 className="text-[180px] font-black tracking-tighter leading-[0.82]" style={{ background: "linear-gradient(180deg,#fef3c7 0%, #f472b6 55%, #a855f7 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", textShadow: "0 0 40px rgba(236,72,153,0.5)" }}>NEON DREAMS</h1>
          <div className="mt-2 text-xl font-semibold tracking-[0.4em] text-fuchsia-300">▸ MIDNIGHT DRIVE ◂</div>
        </div>
        <div className="flex w-full justify-between px-8 text-[11px] font-mono text-fuchsia-300/70">
          <span>LAT 34.05°N</span><span>BPM 124</span><span>LONG 118.24°W</span>
        </div>
      </div>
    </div>
  );
}
