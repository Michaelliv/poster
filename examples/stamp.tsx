export default function Stamp() {
  const perfs = 28;
  const perfsV = 36;
  const dots = [];
  for (let i = 0; i < perfs; i++) {
    const x = (i + 0.5) * (100 / perfs);
    dots.push({ x: `${x}%`, y: "0%" });
    dots.push({ x: `${x}%`, y: "100%" });
  }
  for (let i = 0; i < perfsV; i++) {
    const y = (i + 0.5) * (100 / perfsV);
    dots.push({ x: "0%", y: `${y}%` });
    dots.push({ x: "100%", y: `${y}%` });
  }

  const cream = "#f3e8cf";
  const ink = "#1a2740";
  const red = "#a82828";

  return (
    <div
      className="w-[1200px] p-16"
      style={{
        background: "radial-gradient(1200px 800px at 50% 50%, #d9c9a6, #b8a57e)",
        fontFamily: "'Source Serif 4', serif",
      }}
    >
      <div
        className="relative mx-auto"
        style={{
          width: "1000px",
          height: "1300px",
          background: cream,
          boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5), inset 0 0 120px rgba(120,90,50,0.18)",
        }}
      >
        {dots.map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: d.x,
              top: d.y,
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "#b8a57e",
              transform: "translate(-50%, -50%)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.25)",
            }}
          />
        ))}

        <div
          className="absolute"
          style={{ top: 40, left: 40, right: 40, bottom: 40, border: `3px solid ${ink}`, padding: 14 }}
        >
          <div className="relative w-full h-full" style={{ border: `1px solid ${ink}` }}>
            <div
              className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-3"
              style={{ borderBottom: `2px solid ${ink}`, color: ink }}
            >
              <div className="text-[20px] font-bold tracking-[0.3em]" style={{ fontFamily: "Inter, sans-serif" }}>
                U · S · A
              </div>
              <div className="text-[16px] uppercase" style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.4em" }}>
                Commemorative Issue
              </div>
              <div className="text-[20px] font-bold tracking-[0.3em]" style={{ fontFamily: "Inter, sans-serif" }}>
                C · C · C · P
              </div>
            </div>

            <div
              className="absolute left-0 right-0 flex items-center justify-center overflow-hidden"
              style={{
                top: 62,
                height: 780,
                background: "radial-gradient(600px 400px at 50% 40%, #0b1a3a 0%, #05091c 80%)",
                borderBottom: `2px solid ${ink}`,
              }}
            >
              {Array.from({ length: 80 }).map((_, i) => {
                const x = (i * 113) % 920;
                const y = (i * 271) % 760;
                const s = (i % 3) + 1;
                return (
                  <div
                    key={i}
                    style={{ position: "absolute", left: x, top: y, width: s, height: s, background: "#f3e8cf", opacity: 0.7, borderRadius: "50%" }}
                  />
                );
              })}

              <div
                style={{
                  position: "absolute",
                  left: -180,
                  bottom: -220,
                  width: 700,
                  height: 700,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 75% 35%, #4a7bb8 0%, #1a3560 50%, #07122a 80%)",
                  boxShadow: "inset -30px -30px 80px rgba(0,0,0,0.7)",
                }}
              />

              <svg viewBox="0 0 900 780" width="900" height="780" style={{ position: "relative", zIndex: 2 }}>
                <defs>
                  <linearGradient id="suitL" x1="0" x2="1">
                    <stop offset="0" stopColor="#f3e8cf" />
                    <stop offset="1" stopColor="#b8a57e" />
                  </linearGradient>
                  <linearGradient id="suitR" x1="0" x2="1">
                    <stop offset="0" stopColor="#d9d4c7" />
                    <stop offset="1" stopColor="#8a7a58" />
                  </linearGradient>
                  <radialGradient id="visor" cx="0.35" cy="0.3">
                    <stop offset="0" stopColor="#3a5a88" />
                    <stop offset="0.6" stopColor="#0a1528" />
                    <stop offset="1" stopColor="#000" />
                  </radialGradient>
                </defs>

                <path d="M 120 120 Q 250 200 340 380" stroke="#f3e8cf" strokeWidth="2" fill="none" opacity="0.5" />
                <path d="M 780 120 Q 650 200 560 380" stroke="#f3e8cf" strokeWidth="2" fill="none" opacity="0.5" />

                <g transform="translate(180,180)">
                  <rect x="10" y="140" width="90" height="140" rx="12" fill="#7a6a45" />
                  <path d="M 40 120 Q 20 140 30 280 L 150 280 Q 170 280 175 220 L 220 230 L 240 210 L 195 170 Q 180 130 160 120 Z" fill="url(#suitL)" stroke={ink} strokeWidth="2.5" />
                  <path d="M 175 220 L 260 240 L 300 260" stroke={ink} strokeWidth="2.5" fill="none" />
                  <circle cx="110" cy="85" r="65" fill="url(#suitL)" stroke={ink} strokeWidth="2.5" />
                  <circle cx="110" cy="85" r="48" fill="url(#visor)" />
                  <ellipse cx="95" cy="70" rx="14" ry="8" fill="#f3e8cf" opacity="0.4" />
                  <rect x="50" y="190" width="34" height="22" fill={cream} stroke={ink} />
                  <rect x="50" y="190" width="14" height="10" fill={ink} />
                  {[0,1,2,3,4,5].map(i => (
                    <rect key={i} x="50" y={190 + i*3.6} width="34" height="1.8" fill={red} opacity={i%2} />
                  ))}
                </g>

                <g transform="translate(520,180)">
                  <rect x="100" y="140" width="90" height="140" rx="12" fill="#5a4a2a" />
                  <path d="M 160 120 Q 180 140 170 280 L 50 280 Q 30 280 25 220 L -20 230 L -40 210 L 5 170 Q 20 130 40 120 Z" fill="url(#suitR)" stroke={ink} strokeWidth="2.5" />
                  <path d="M 25 220 L -60 240 L -100 260" stroke={ink} strokeWidth="2.5" fill="none" />
                  <circle cx="90" cy="85" r="65" fill="url(#suitR)" stroke={ink} strokeWidth="2.5" />
                  <circle cx="90" cy="85" r="48" fill="url(#visor)" />
                  <ellipse cx="75" cy="70" rx="14" ry="8" fill="#f3e8cf" opacity="0.4" />
                  <rect x="116" y="190" width="34" height="22" fill={red} stroke={ink} />
                  <text x="133" y="205" textAnchor="middle" fontSize="10" fill={cream} fontFamily="Inter" fontWeight="700">СССР</text>
                </g>

                <g transform="translate(420,420)">
                  <ellipse cx="30" cy="20" rx="70" ry="35" fill="#f3e8cf" opacity="0.15" />
                  <path d="M -40 20 Q -10 -10 30 0 Q 70 10 90 30 Q 70 50 30 45 Q -10 50 -40 20 Z" fill="#d9d4c7" stroke={ink} strokeWidth="2.5" />
                  <path d="M 10 10 Q 30 5 50 15" stroke={ink} strokeWidth="1.5" fill="none" />
                  <path d="M 15 25 Q 35 22 55 30" stroke={ink} strokeWidth="1.5" fill="none" />
                </g>

                <g transform="translate(340,40)" opacity="0.85">
                  <rect x="0" y="20" width="60" height="18" fill="#b8a57e" stroke={ink} strokeWidth="1.5" />
                  <polygon points="60,20 90,29 60,38" fill="#8a7a58" stroke={ink} strokeWidth="1.5" />
                  <rect x="-30" y="24" width="30" height="10" fill="#8a7a58" stroke={ink} strokeWidth="1.5" />
                  <line x1="30" y1="0" x2="30" y2="20" stroke={ink} strokeWidth="1.5" />
                  <rect x="20" y="-8" width="20" height="10" fill="#b8a57e" stroke={ink} strokeWidth="1.5" />
                </g>
              </svg>
            </div>

            <div className="absolute left-0 right-0 px-8" style={{ top: 860, color: ink }}>
              <div className="text-[64px] leading-none text-center" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 700, letterSpacing: "0.02em" }}>
                Apollo–Soyuz
              </div>
              <div className="text-center mt-2 text-[22px] tracking-[0.5em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
                Test Project · 1975
              </div>
              <div className="text-center italic mt-3 text-[24px]" style={{ fontFamily: "'Source Serif 4', serif" }}>
                Fiftieth Anniversary · 1975–2025
              </div>
            </div>

            <div className="absolute left-0 right-0 flex items-end justify-between px-8" style={{ bottom: 14, color: ink }}>
              <div className="text-[14px] tracking-[0.2em] uppercase" style={{ fontFamily: "Inter, sans-serif", opacity: 0.8 }}>
                Engr. A. Holbrook sc.
              </div>
              <div className="text-[72px] leading-none" style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 800, color: red }}>
                $1.50
              </div>
              <div className="text-[14px] tracking-[0.2em] uppercase text-right" style={{ fontFamily: "Inter, sans-serif", opacity: 0.8 }}>
                Series 2025 · Plate 4B
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
