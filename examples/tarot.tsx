
export default function Tarot() {
  const gold = "#d4af37";
  const goldLight = "#f4d97a";
  const indigo = "#0d0a2b";
  const indigoDeep = "#070519";

  const Corner = ({ transform }: { transform: string }) => (
    <g transform={transform} stroke={gold} fill="none" strokeWidth="1.2">
      <path d="M0,0 C30,0 40,10 40,40 M0,0 C0,30 10,40 40,40" />
      <path d="M8,8 C24,8 32,16 32,32" strokeWidth="0.8" opacity="0.7" />
      <circle cx="20" cy="20" r="2.5" fill={gold} />
      <path d="M14,46 C22,52 28,52 36,46 C32,54 22,56 14,46 Z" fill={gold} opacity="0.6" stroke="none"/>
      <path d="M46,14 C52,22 52,28 46,36 C54,32 56,22 46,14 Z" fill={gold} opacity="0.6" stroke="none"/>
    </g>
  );

  return (
    <div
      className="w-[900px] p-6"
      style={{
        background: "#1a1530",
        fontFamily: "'Source Serif 4', serif",
      }}
    >
      <div
        className="relative mx-auto"
        style={{
          width: 820,
          height: 1280,
          background: `radial-gradient(ellipse at 50% 35%, #1e1850 0%, ${indigo} 55%, ${indigoDeep} 100%)`,
          borderRadius: 24,
          boxShadow: "0 40px 120px -20px rgba(0,0,0,0.9), inset 0 0 0 2px #2a2250",
          overflow: "hidden",
        }}
      >
        {/* Outer ornate border */}
        <svg viewBox="0 0 820 1280" className="absolute inset-0" width="820" height="1280">
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#b8860b" />
              <stop offset="50%" stopColor={goldLight} />
              <stop offset="100%" stopColor="#8c6a1a" />
            </linearGradient>
            <radialGradient id="halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={goldLight} stopOpacity="0.35" />
              <stop offset="60%" stopColor={gold} stopOpacity="0.08" />
              <stop offset="100%" stopColor={gold} stopOpacity="0" />
            </radialGradient>
            <pattern id="stars" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="8" r="0.6" fill={gold} opacity="0.5" />
              <circle cx="28" cy="22" r="0.4" fill={gold} opacity="0.3" />
              <circle cx="18" cy="34" r="0.5" fill={gold} opacity="0.4" />
            </pattern>
          </defs>

          {/* Starfield */}
          <rect x="40" y="40" width="740" height="1200" fill="url(#stars)" />

          {/* Double frame */}
          <rect x="28" y="28" width="764" height="1224" rx="14" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" />
          <rect x="44" y="44" width="732" height="1192" rx="8" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.6" />
          <rect x="58" y="58" width="704" height="1164" rx="4" fill="none" stroke={gold} strokeWidth="1.4" />

          {/* Art Nouveau corners */}
          <g transform="translate(58,58)"><Corner transform="" /></g>
          <g transform="translate(762,58) scale(-1,1)"><Corner transform="" /></g>
          <g transform="translate(58,1222) scale(1,-1)"><Corner transform="" /></g>
          <g transform="translate(762,1222) scale(-1,-1)"><Corner transform="" /></g>

          {/* Top arch with title */}
          <path d="M 120 180 Q 410 90 700 180" fill="none" stroke={gold} strokeWidth="1.5" />
          <path d="M 140 200 Q 410 120 680 200" fill="none" stroke={gold} strokeWidth="0.6" opacity="0.6" />

          {/* Vine flourishes top */}
          <g stroke={gold} fill="none" strokeWidth="1">
            <path d="M 180 160 C 220 140 260 170 300 150 C 340 130 360 160 400 145" />
            <path d="M 640 160 C 600 140 560 170 520 150 C 480 130 460 160 420 145" />
            <circle cx="300" cy="150" r="3" fill={gold} stroke="none" />
            <circle cx="520" cy="150" r="3" fill={gold} stroke="none" />
            <path d="M 295 148 C 290 142 286 142 282 148 C 286 156 294 156 295 148 Z" fill={gold} opacity="0.7" stroke="none" />
            <path d="M 525 148 C 520 142 516 142 512 148 C 516 156 524 156 525 148 Z" fill={gold} opacity="0.7" stroke="none" />
          </g>

          {/* Astrological ring */}
          <g transform="translate(410,640)">
            <circle r="300" fill="url(#halo)" />
            <circle r="255" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.6" />
            <circle r="270" fill="none" stroke={gold} strokeWidth="0.5" opacity="0.4" strokeDasharray="1 6" />
            <circle r="240" fill="none" stroke={gold} strokeWidth="1.2" />
            {/* 12 zodiac ticks with symbols */}
            {["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"].map((s,i)=>{
              const a = (i/12)*Math.PI*2 - Math.PI/2;
              const x = Math.cos(a)*255, y = Math.sin(a)*255;
              const x2 = Math.cos(a)*240, y2 = Math.sin(a)*240;
              return (
                <g key={i}>
                  <line x1={x} y1={y} x2={x2} y2={y2} stroke={gold} strokeWidth="1" />
                  <text x={Math.cos(a)*275} y={Math.sin(a)*275+6} fill={goldLight} fontSize="18" textAnchor="middle" style={{fontFamily:"serif"}}>{s}</text>
                </g>
              );
            })}

            {/* Sacred geometry: hexagram + square + triangle = The Architect */}
            <g stroke={gold} fill="none">
              <circle r="200" strokeWidth="0.8" opacity="0.5" />
              <circle r="160" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 4" />
              {/* Upward triangle */}
              <polygon points="0,-190 164.5,95 -164.5,95" strokeWidth="1.4" />
              {/* Downward triangle */}
              <polygon points="0,190 164.5,-95 -164.5,-95" strokeWidth="1.4" />
              {/* Inner square rotated */}
              <polygon points="0,-130 130,0 0,130 -130,0" strokeWidth="1.1" opacity="0.9" />
              {/* Inner circle */}
              <circle r="70" strokeWidth="1" />
              {/* Compass + square allegory */}
              <path d="M -60 40 L 0 -70 L 60 40" strokeWidth="1.6" />
              <path d="M -50 40 L 50 40" strokeWidth="1.6" />
              <circle cx="0" cy="-70" r="4" fill={gold} stroke="none" />
              {/* Plumb line */}
              <line x1="0" y1="-70" x2="0" y2="55" strokeWidth="0.8" strokeDasharray="2 3" />
              <polygon points="-6,55 6,55 0,66" fill={gold} stroke="none" />
            </g>

            {/* All-seeing eye at center-top */}
            <g transform="translate(0,-190)">
              <path d="M -22 0 Q 0 -14 22 0 Q 0 14 -22 0 Z" fill={indigoDeep} stroke={gold} strokeWidth="1.2" />
              <circle r="6" fill={gold} />
              <circle r="2.5" fill={indigoDeep} />
              {/* Rays */}
              {Array.from({length:12}).map((_,i)=>{
                const a = (i/12)*Math.PI*2;
                return <line key={i} x1={Math.cos(a)*18} y1={Math.sin(a)*18 - 0} x2={Math.cos(a)*34} y2={Math.sin(a)*34} stroke={gold} strokeWidth="0.7" opacity="0.7" />
              })}
            </g>

            {/* Planetary glyphs at cardinal points */}
            <text y="-215" textAnchor="middle" fill={goldLight} fontSize="22">☉</text>
            <text x="215" y="6" textAnchor="middle" fill={goldLight} fontSize="22">☿</text>
            <text y="225" textAnchor="middle" fill={goldLight} fontSize="22">☽</text>
            <text x="-215" y="6" textAnchor="middle" fill={goldLight} fontSize="22">♄</text>
          </g>

          {/* Bottom cartouche */}
          <g transform="translate(410,1110)">
            <path d="M -280 0 Q 0 -40 280 0 Q 0 40 -280 0 Z" fill={indigoDeep} stroke={gold} strokeWidth="1.4" />
            <path d="M -260 0 Q 0 -28 260 0 Q 0 28 -260 0 Z" fill="none" stroke={gold} strokeWidth="0.5" opacity="0.5" />
            <circle cx="-280" cy="0" r="4" fill={gold} />
            <circle cx="280" cy="0" r="4" fill={gold} />
          </g>

          {/* Lower flourish */}
          <g stroke={gold} fill="none" strokeWidth="1" transform="translate(410,1185)">
            <path d="M -140 0 C -100 -18 -60 12 0 0 C 60 -12 100 18 140 0" />
            <circle r="3" fill={gold} stroke="none" />
            <path d="M -6 -10 C 0 -18 6 -18 6 -10 C 6 -2 0 2 0 2 C 0 2 -6 -2 -6 -10 Z" fill={gold} opacity="0.8" stroke="none" />
          </g>
        </svg>

        {/* Title */}
        <div
          className="absolute left-0 right-0 text-center"
          style={{ top: 150, color: goldLight, fontFamily: "'Source Serif 4', serif", fontStyle: "italic", fontSize: 44, letterSpacing: "0.08em", textShadow: "0 0 18px rgba(244,217,122,0.4)" }}
        >
          The Architect
        </div>

        {/* Roman numeral bottom */}
        <div
          className="absolute left-0 right-0 text-center"
          style={{ top: 1090, color: goldLight, fontSize: 32, letterSpacing: "0.4em", fontFamily: "'Source Serif 4', serif" }}
        >
          · XXI ·
        </div>

        {/* Meaning blurb */}
        <div
          className="absolute left-0 right-0 text-center px-24"
          style={{ top: 1150, color: "#e8d9a3", fontSize: 15, lineHeight: 1.55, fontStyle: "italic", letterSpacing: "0.02em" }}
        >
          Structure revealed beneath the veil — vision rendered in measure and line.
          <br />
          To build is to bind the infinite to form; to see the pattern is to become it.
        </div>
      </div>
    </div>
  );
}
