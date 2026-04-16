export default function Calendar() {
  const month = "April";
  const year = 2026;
  // April 2026 starts on Wednesday, has 30 days
  const startDay = 3; // 0=Sun ... 3=Wed
  const days = 30;
  const cells = [...Array(startDay).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  const events: Record<number, { label: string; color: string }> = {
    3: { label: "Studio", color: "#ec4899" },
    8: { label: "Review", color: "#22d3ee" },
    14: { label: "TAX", color: "#ef4444" },
    19: { label: "Trip", color: "#fbbf24" },
    22: { label: "Earth Day", color: "#34d399" },
    27: { label: "Release", color: "#a78bfa" },
  };

  return (
    <div className="w-[1400px] px-14 py-12" style={{ background: "#faf5ed", fontFamily: "'Inter', system-ui" }}>
      {/* header */}
      <div className="flex items-end justify-between border-b-2 border-black pb-6">
        <div>
          <div className="text-[15px] font-bold uppercase tracking-[0.4em] text-neutral-500">Month · 04 of 12</div>
          <h1 className="mt-2 font-serif italic text-[180px] leading-[0.85] font-bold tracking-tighter" style={{ fontFamily: "'Source Serif 4', serif" }}>{month}</h1>
        </div>
        <div className="text-right">
          <div className="text-[15px] font-bold uppercase tracking-[0.4em] text-neutral-500">Year</div>
          <div className="mt-1 text-[80px] font-black leading-none tabular-nums">{year}</div>
        </div>
      </div>

      {/* weekday headers */}
      <div className="mt-8 grid grid-cols-7 border-b border-neutral-300 pb-2">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d, i) => (
          <div key={d} className={`text-[14px] font-bold uppercase tracking-[0.25em] ${i===0||i===6 ? "text-rose-500" : "text-neutral-600"}`}>{d}</div>
        ))}
      </div>

      {/* grid */}
      <div className="mt-2 grid grid-cols-7 gap-px bg-neutral-300">
        {cells.map((c, i) => {
          const col = i % 7;
          const ev = c ? events[c] : null;
          const isWeekend = col === 0 || col === 6;
          return (
            <div key={i} className="min-h-[150px] bg-[#faf5ed] p-3">
              {c && (
                <>
                  <div className={`text-3xl font-light tabular-nums ${isWeekend ? "text-rose-500" : "text-neutral-900"}`}>{c}</div>
                  {ev && (
                    <div className="mt-2">
                      <div className="h-1 w-8 rounded-full" style={{ background: ev.color }} />
                      <div className="mt-1 text-[14px] font-bold uppercase tracking-wider" style={{ color: ev.color }}>{ev.label}</div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* footer quote */}
      <div className="mt-10 border-t border-neutral-300 pt-6 text-center">
        <div className="font-serif italic text-2xl text-neutral-700" style={{ fontFamily: "'Source Serif 4', serif" }}>"The days are long but the decades are short."</div>
        <div className="mt-2 text-[14px] font-bold uppercase tracking-[0.3em] text-neutral-500">— Sam Altman, paraphrased</div>
      </div>
    </div>
  );
}
