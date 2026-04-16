export default function Comic() {
  const panels = [
    {
      kicker: "Panel 1 · The Setup",
      caption: "Two threads approach the same bank account. Balance: $100.",
      bg: "linear-gradient(180deg, #fde68a 0%, #fb923c 100%)",
      scene: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="150" y="120" width="100" height="70" rx="8" fill="#1f2937" stroke="#fbbf24" strokeWidth="3"/>
          <text x="200" y="145" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono">BANK</text>
          <text x="200" y="170" textAnchor="middle" fill="#4ade80" fontSize="18" fontWeight="700" fontFamily="JetBrains Mono">$100</text>
          <circle cx="70" cy="155" r="22" fill="#ef4444"/>
          <text x="70" y="160" textAnchor="middle" fill="white" fontSize="14" fontWeight="800">T1</text>
          <path d="M 95 155 L 145 155" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arr1)"/>
          <circle cx="330" cy="155" r="22" fill="#3b82f6"/>
          <text x="330" y="160" textAnchor="middle" fill="white" fontSize="14" fontWeight="800">T2</text>
          <path d="M 305 155 L 255 155" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arr2)"/>
          <defs>
            <marker id="arr1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#ef4444"/></marker>
            <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#3b82f6"/></marker>
          </defs>
          <text x="200" y="240" textAnchor="middle" fill="#1f2937" fontSize="16" fontWeight="700" fontStyle="italic" fontFamily="'Source Serif 4'">"I'll just withdraw $80..."</text>
          <text x="200" y="262" textAnchor="middle" fill="#1f2937" fontSize="16" fontWeight="700" fontStyle="italic" fontFamily="'Source Serif 4'">"Same! Easy."</text>
        </svg>
      ),
    },
    {
      kicker: "Panel 2 · The Read",
      caption: "Both threads read the balance. Both see $100. Neither knows about the other.",
      bg: "linear-gradient(180deg, #bae6fd 0%, #60a5fa 100%)",
      scene: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="150" y="120" width="100" height="70" rx="8" fill="#1f2937" stroke="#fbbf24" strokeWidth="3"/>
          <text x="200" y="165" textAnchor="middle" fill="#4ade80" fontSize="18" fontWeight="700" fontFamily="JetBrains Mono">$100</text>
          <ellipse cx="70" cy="80" rx="55" ry="28" fill="white" stroke="#ef4444" strokeWidth="2"/>
          <text x="70" y="78" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono">read:</text>
          <text x="70" y="96" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="800" fontFamily="JetBrains Mono">$100 ✓</text>
          <circle cx="70" cy="120" r="4" fill="white" stroke="#ef4444"/>
          <ellipse cx="330" cy="80" rx="55" ry="28" fill="white" stroke="#3b82f6" strokeWidth="2"/>
          <text x="330" y="78" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono">read:</text>
          <text x="330" y="96" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="800" fontFamily="JetBrains Mono">$100 ✓</text>
          <circle cx="330" cy="120" r="4" fill="white" stroke="#3b82f6"/>
          <circle cx="70" cy="180" r="22" fill="#ef4444"/>
          <text x="70" y="185" textAnchor="middle" fill="white" fontSize="14" fontWeight="800">T1</text>
          <circle cx="330" cy="180" r="22" fill="#3b82f6"/>
          <text x="330" y="185" textAnchor="middle" fill="white" fontSize="14" fontWeight="800">T2</text>
          <text x="200" y="255" textAnchor="middle" fill="#1e3a8a" fontSize="15" fontWeight="700" fontFamily="JetBrains Mono">balance := 100</text>
        </svg>
      ),
    },
    {
      kicker: "Panel 3 · The Collision",
      caption: "Both compute balance − 80 = 20. Both write back $20. The second write clobbers the first.",
      bg: "linear-gradient(180deg, #fecaca 0%, #dc2626 100%)",
      scene: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="150" y="120" width="100" height="70" rx="8" fill="#1f2937" stroke="#fbbf24" strokeWidth="3"/>
          <text x="200" y="165" textAnchor="middle" fill="#fbbf24" fontSize="18" fontWeight="700" fontFamily="JetBrains Mono">$20</text>
          <path d="M 200 90 L 190 115 L 200 115 L 192 140 L 215 110 L 205 110 L 215 90 Z" fill="#fbbf24" stroke="#1f2937" strokeWidth="2"/>
          <text x="200" y="215" textAnchor="middle" fill="white" fontSize="22" fontWeight="900" fontFamily="'Source Serif 4'" fontStyle="italic">💥 CLOBBERED!</text>
          <path d="M 95 170 L 145 150" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arr3)"/>
          <path d="M 305 170 L 255 150" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arr4)"/>
          <text x="70" y="200" textAnchor="middle" fill="#7f1d1d" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono">write 20</text>
          <text x="330" y="200" textAnchor="middle" fill="#1e3a8a" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono">write 20</text>
          <circle cx="70" cy="175" r="18" fill="#ef4444"/>
          <text x="70" y="180" textAnchor="middle" fill="white" fontSize="14" fontWeight="800">T1</text>
          <circle cx="330" cy="175" r="18" fill="#3b82f6"/>
          <text x="330" y="180" textAnchor="middle" fill="white" fontSize="14" fontWeight="800">T2</text>
          <defs>
            <marker id="arr3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#ef4444"/></marker>
            <marker id="arr4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#3b82f6"/></marker>
          </defs>
          <text x="200" y="265" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono">$160 withdrawn · $80 lost</text>
        </svg>
      ),
    },
    {
      kicker: "Panel 4 · The Fix",
      caption: "Wrap the read-modify-write in a lock. One thread at a time. Boring, correct, deterministic.",
      bg: "linear-gradient(180deg, #bbf7d0 0%, #10b981 100%)",
      scene: (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <rect x="130" y="100" width="140" height="110" rx="10" fill="#064e3b" stroke="#fbbf24" strokeWidth="3"/>
          <rect x="180" y="130" width="40" height="35" rx="4" fill="#fbbf24"/>
          <path d="M 186 130 L 186 118 Q 186 105 200 105 Q 214 105 214 118 L 214 130" fill="none" stroke="#fbbf24" strokeWidth="4"/>
          <circle cx="200" cy="148" r="4" fill="#064e3b"/>
          <text x="200" y="192" textAnchor="middle" fill="#4ade80" fontSize="16" fontWeight="700" fontFamily="JetBrains Mono">mutex 🔒</text>
          <circle cx="70" cy="160" r="20" fill="#ef4444"/>
          <text x="70" y="165" textAnchor="middle" fill="white" fontSize="14" fontWeight="800">T1</text>
          <text x="70" y="195" textAnchor="middle" fill="#064e3b" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono">holds lock</text>
          <circle cx="330" cy="160" r="20" fill="#3b82f6" opacity="0.5"/>
          <text x="330" y="165" textAnchor="middle" fill="white" fontSize="14" fontWeight="800">T2</text>
          <text x="330" y="195" textAnchor="middle" fill="#064e3b" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono">waits…</text>
          <text x="330" y="130" textAnchor="middle" fontSize="20">😴</text>
          <text x="200" y="255" textAnchor="middle" fill="#064e3b" fontSize="15" fontWeight="800" fontFamily="'Source Serif 4'" fontStyle="italic">"After you."</text>
        </svg>
      ),
    },
  ];

  return (
    <div
      className="w-[1600px] p-12"
      style={{
        background:
          "radial-gradient(900px 500px at 10% 0%, rgba(251,191,36,0.12), transparent 60%), radial-gradient(800px 500px at 90% 100%, rgba(139,92,246,0.15), transparent 60%), #0a0a0f",
        fontFamily: "Inter",
      }}
    >
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/50">
            The Concurrency Almanac · Vol. III · Hazards
          </div>
          <h1 className="text-white text-[64px] leading-[1.05] font-bold mt-3">
            A comic about{" "}
            <span style={{ fontFamily: "'Source Serif 4'", fontStyle: "italic", backgroundImage: "linear-gradient(180deg,#fef3c7,#f472b6,#a855f7)", WebkitBackgroundClip: "text", color: "transparent" }}>
              race conditions
            </span>
          </h1>
          <div className="text-white/60 text-[16px] mt-2 max-w-[900px]">
            Two threads, one shared variable, zero coordination. What could possibly go wrong?
          </div>
        </div>
        <div className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-white/80 text-[14px] font-mono tabular-nums">
          4 panels · ~12s read
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {panels.map((p, i) => (
          <div key={i} className="rounded-2xl border border-white/[0.08] overflow-hidden" style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.06), 0 30px 60px -30px rgba(0,0,0,0.7)" }}>
            <div className="relative h-[360px] border-b border-black/20" style={{ background: p.bg }}>
              <div className="absolute top-3 left-4 text-[14px] font-bold uppercase tracking-[0.25em] text-black/60">
                {p.kicker}
              </div>
              <div className="absolute top-3 right-4 text-[14px] font-mono font-bold text-black/70 tabular-nums">
                #{i + 1}/4
              </div>
              <div className="absolute inset-0 pt-10 px-6 pb-4">{p.scene}</div>
            </div>
            <div className="bg-white px-6 py-5" style={{ fontFamily: "'Source Serif 4'" }}>
              <div className="text-[18px] leading-[1.4] text-neutral-900">
                <span className="font-bold mr-2">{i + 1}.</span>
                {p.caption}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between text-white/40 text-[14px] font-mono tabular-nums">
        <div>mutex.lock() · critical section · mutex.unlock()</div>
        <div>© The Concurrency Almanac · drawn on a single core</div>
      </div>
    </div>
  );
}
