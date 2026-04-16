
export default function Patch() {
  const cx = 600, cy = 600, R = 560;
  const names = ["CMDR. A. VOSS", "PILOT R. OKAFOR", "SCI. M. TANAKA", "ENG. L. PETROV"];
  const navy = "#0b1a3a";
  const cream = "#f1e6c8";
  const red = "#b1262c";
  const gold = "#d9b36a";
  const stitch = { stroke: cream, strokeWidth: 2.5, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  // path for top arc text (left-to-right across top)
  const topArc = `M ${cx - 430} ${cy} A 430 430 0 0 1 ${cx + 430} ${cy}`;
  const botArc = `M ${cx - 430} ${cy + 20} A 430 430 0 0 0 ${cx + 430} ${cy + 20}`;

  const stars = Array.from({ length: 40 }, (_, i) => {
    const a = (i * 97.13) % 360;
    const r = 360 + ((i * 53) % 130);
    const rad = (a * Math.PI) / 180;
    return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r, s: (i % 3) * 0.6 + 0.8 };
  });

  // Europa surface cracks (linea)
  const cracks = [
    "M 470 560 Q 600 540 740 580",
    "M 440 620 Q 590 640 760 640",
    "M 480 680 Q 610 700 740 690",
    "M 520 520 Q 600 500 700 515",
    "M 460 600 Q 520 610 560 640 Q 600 670 680 660",
    "M 500 730 Q 600 745 720 725",
    "M 540 470 Q 610 465 680 490",
  ];

  return (
    <div className="w-[1200px] h-[1200px] flex items-center justify-center" style={{ background: "#f5efe0" }}>
      <svg viewBox="0 0 1200 1200" width="1200" height="1200">
        <defs>
          <radialGradient id="sky" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#1a3366" />
            <stop offset="70%" stopColor="#0b1a3a" />
            <stop offset="100%" stopColor="#060f24" />
          </radialGradient>
          <radialGradient id="europa" cx="40%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#f7ead0" />
            <stop offset="55%" stopColor="#e9d5a8" />
            <stop offset="90%" stopColor="#8a6a3c" />
            <stop offset="100%" stopColor="#3a2a16" />
          </radialGradient>
          <radialGradient id="jupiter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8b57a" />
            <stop offset="60%" stopColor="#b1262c" />
            <stop offset="100%" stopColor="#5a1216" />
          </radialGradient>
          <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="1.6" />
          </filter>
        </defs>

        {/* Outer red embroidered border ring */}
        <circle cx={cx} cy={cy} r={R} fill={red} />
        <circle cx={cx} cy={cy} r={R - 4} fill="none" stroke={cream} strokeWidth={3} strokeDasharray="2 4" />
        <circle cx={cx} cy={cy} r={R - 30} fill={cream} />
        <circle cx={cx} cy={cy} r={R - 34} fill="none" stroke={navy} strokeWidth={2} />

        {/* Name band (cream) with top/bottom arc text */}
        <path id="topArc" d={topArc} fill="none" />
        <path id="botArc" d={botArc} fill="none" />

        <text fill={navy} style={{ fontFamily: "Inter", fontWeight: 800, letterSpacing: 8 }} fontSize={26}>
          <textPath href="#topArc" startOffset="12%">{names[0]}</textPath>
          <textPath href="#topArc" startOffset="42%">✦</textPath>
          <textPath href="#topArc" startOffset="58%">{names[1]}</textPath>
        </text>
        <text fill={navy} style={{ fontFamily: "Inter", fontWeight: 800, letterSpacing: 8 }} fontSize={26}>
          <textPath href="#botArc" startOffset="12%">{names[2]}</textPath>
          <textPath href="#botArc" startOffset="42%">✦</textPath>
          <textPath href="#botArc" startOffset="58%">{names[3]}</textPath>
        </text>

        {/* Inner sky disc */}
        <circle cx={cx} cy={cy} r={R - 95} fill="url(#sky)" />
        <circle cx={cx} cy={cy} r={R - 95} fill="none" stroke={gold} strokeWidth={3} />
        <circle cx={cx} cy={cy} r={R - 100} fill="none" stroke={cream} strokeWidth={1.2} strokeDasharray="3 5" />

        {/* Stars */}
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.s} fill={cream} />
        ))}
        {/* Signature 4-point stars for crew */}
        {[[260, 340], [940, 340], [260, 860], [940, 860]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path d="M 0 -14 L 3 -3 L 14 0 L 3 3 L 0 14 L -3 3 L -14 0 L -3 -3 Z" fill={cream} stroke={navy} strokeWidth={1} />
          </g>
        ))}

        {/* Jupiter in background */}
        <g>
          <circle cx={940} cy={420} r={90} fill="url(#jupiter)" stroke={cream} strokeWidth={2.5} />
          <path d="M 860 395 Q 940 385 1020 400" stroke="#6a1418" strokeWidth={4} fill="none" opacity={0.7} />
          <path d="M 855 425 Q 940 415 1025 430" stroke="#e8b57a" strokeWidth={3} fill="none" opacity={0.6} />
          <path d="M 860 450 Q 940 465 1020 450" stroke="#6a1418" strokeWidth={3} fill="none" opacity={0.6} />
        </g>

        {/* Europa */}
        <g>
          <circle cx={cx} cy={cy + 20} r={185} fill="url(#europa)" stroke={navy} strokeWidth={3.5} />
          <g stroke={red} strokeWidth={2} fill="none" opacity={0.85} filter="url(#rough)">
            {cracks.map((d, i) => <path key={i} d={d} />)}
          </g>
          <g stroke={navy} strokeWidth={1.2} fill="none" opacity={0.5}>
            {cracks.map((d, i) => <path key={i} d={d} transform="translate(2 2)" />)}
          </g>
          {/* terminator shadow */}
          <path d={`M ${cx + 100} ${cy - 140} A 185 185 0 0 1 ${cx + 100} ${cy + 180}`} fill={navy} opacity={0.35} />
        </g>

        {/* Probe trajectory */}
        <g>
          <path d="M 880 300 Q 720 380 600 560" fill="none" stroke={cream} strokeWidth={3} strokeDasharray="8 6" />
          <path d="M 880 300 Q 720 380 600 560" fill="none" stroke={red} strokeWidth={1.5} />
          {/* probe */}
          <g transform="translate(720 380) rotate(35)">
            <rect x={-14} y={-6} width={28} height={12} fill={cream} stroke={navy} strokeWidth={2} />
            <rect x={-26} y={-3} width={10} height={6} fill={red} stroke={navy} strokeWidth={1.5} />
            <rect x={16} y={-3} width={10} height={6} fill={red} stroke={navy} strokeWidth={1.5} />
            <rect x={-22} y={-14} width={4} height={8} fill={navy} />
            <rect x={18} y={-14} width={4} height={8} fill={navy} />
          </g>
          {/* arrowhead at Europa */}
          <polygon points="600,560 612,548 618,564" fill={red} stroke={navy} strokeWidth={1.5} />
        </g>

        {/* Bottom red banner with mission title */}
        <g>
          <path d="M 240 880 Q 600 960 960 880 L 940 960 Q 600 1020 260 960 Z" fill={red} stroke={navy} strokeWidth={3} />
          <path d="M 260 895 Q 600 965 940 895" fill="none" stroke={cream} strokeWidth={1.5} strokeDasharray="3 4" />
          <text x={cx} y={935} textAnchor="middle" fill={cream} style={{ fontFamily: "Inter", fontWeight: 900, letterSpacing: 14 }} fontSize={56}>
            EUROPA–1
          </text>
          <text x={cx} y={975} textAnchor="middle" fill={cream} style={{ fontFamily: "Inter", fontWeight: 700, letterSpacing: 8 }} fontSize={18}>
            JUPITER SYSTEM · MMXXXII
          </text>
        </g>

        {/* Embroidered stitch highlights on outer ring */}
        <circle cx={cx} cy={cy} r={R - 50} fill="none" {...stitch} strokeDasharray="1 7" />
        <circle cx={cx} cy={cy} r={R - 14} fill="none" stroke={cream} strokeWidth={1} strokeDasharray="1 5" />

        {/* Small marker chevrons at 4 compass points on ring */}
        {[0, 90, 180, 270].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = cx + Math.cos(rad) * (R - 62);
          const y = cy + Math.sin(rad) * (R - 62);
          return (
            <g key={deg} transform={`translate(${x} ${y}) rotate(${deg + 90})`}>
              <polygon points="0,-10 8,8 -8,8" fill={navy} stroke={cream} strokeWidth={1.5} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
