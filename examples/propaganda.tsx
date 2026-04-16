export default function Poster() {
  return (
    <div
      className="w-[1200px] h-[1600px] relative overflow-hidden"
      style={{ backgroundColor: "#f1e7d0", fontFamily: "'Source Serif 4', serif" }}
    >
      {/* Paper grain */}
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(rgba(60,30,20,0.6) 1px, transparent 1px), radial-gradient(rgba(60,30,20,0.4) 1px, transparent 1px)",
          backgroundSize: "3px 3px, 7px 7px",
          backgroundPosition: "0 0, 1px 2px",
        }}
      />

      {/* Big black diagonal slab */}
      <div
        className="absolute"
        style={{
          left: "-200px",
          top: "-150px",
          width: "1700px",
          height: "520px",
          background: "#111",
          transform: "rotate(-18deg)",
          transformOrigin: "left top",
        }}
      />

      {/* Red diagonal wedge */}
      <div
        className="absolute"
        style={{
          left: "-100px",
          top: "300px",
          width: "1500px",
          height: "900px",
          background: "#c8281c",
          clipPath: "polygon(0% 30%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />

      {/* Black triangle counter */}
      <div
        className="absolute"
        style={{
          right: "0",
          bottom: "0",
          width: "780px",
          height: "780px",
          background: "#111",
          clipPath: "polygon(100% 0%, 100% 100%, 0% 100%)",
        }}
      />

      {/* Red circle / sun */}
      <div
        className="absolute rounded-full"
        style={{
          right: "120px",
          top: "120px",
          width: "320px",
          height: "320px",
          background: "#c8281c",
          boxShadow: "0 0 0 14px #111",
        }}
      />

      {/* Concentric rays from circle */}
      <svg
        className="absolute"
        style={{ right: "-40px", top: "-40px" }}
        width="640"
        height="640"
        viewBox="0 0 640 640"
      >
        <g transform="translate(320 320)" stroke="#111" strokeWidth="6" fill="none" opacity="0.55">
          {Array.from({ length: 18 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 18;
            const x = Math.cos(a) * 600;
            const y = Math.sin(a) * 600;
            return <line key={i} x1={0} y1={0} x2={x} y2={y} />;
          })}
        </g>
      </svg>

      {/* Fist + wrench, central, tilted */}
      <div
        className="absolute"
        style={{ left: "240px", top: "560px", transform: "rotate(-12deg)" }}
      >
        <svg width="780" height="780" viewBox="0 0 400 400">
          <defs>
            <filter id="ink" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
              <feDisplacementMap in="SourceGraphic" scale="2.2" />
            </filter>
          </defs>
          <g filter="url(#ink)" stroke="#111" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
            {/* Wrench shaft */}
            <rect x="180" y="20" width="42" height="220" fill="#111" />
            {/* Wrench head (open-end) */}
            <path
              d="M 160 10 L 242 10 L 242 70 L 220 70 L 220 50 L 182 50 L 182 70 L 160 70 Z"
              fill="#111"
            />
            {/* Forearm (sleeve) */}
            <path
              d="M 90 360 L 130 230 Q 200 200 270 230 L 310 360 Z"
              fill="#c8281c"
            />
            {/* Sleeve cuff */}
            <rect x="92" y="335" width="220" height="28" fill="#111" />
            {/* Fist back */}
            <path
              d="M 130 240 Q 130 175 200 170 Q 275 168 275 240 L 270 280 Q 200 295 130 280 Z"
              fill="#e9c79a"
            />
            {/* Thumb wrap */}
            <path
              d="M 268 215 Q 300 210 298 245 Q 295 270 270 268 Z"
              fill="#e9c79a"
            />
            {/* Knuckles */}
            <path d="M 145 200 Q 165 188 188 198" fill="none" />
            <path d="M 188 196 Q 210 184 232 196" fill="none" />
            <path d="M 232 196 Q 252 188 268 200" fill="none" />
            {/* Fingers gripping wrench shaft */}
            <path
              d="M 152 180 Q 170 160 200 158 Q 232 156 250 178 L 250 210 Q 200 222 152 208 Z"
              fill="#e9c79a"
            />
            {/* Shadow on fist */}
            <path
              d="M 130 250 Q 200 270 270 250 L 268 282 Q 200 296 132 282 Z"
              fill="#a8794a"
              opacity="0.55"
              stroke="none"
            />
          </g>
        </svg>
      </div>

      {/* Top kicker bar */}
      <div
        className="absolute"
        style={{
          left: "60px",
          top: "70px",
          padding: "10px 22px",
          background: "#f1e7d0",
          border: "4px solid #111",
          transform: "rotate(-2deg)",
        }}
      >
        <div
          className="text-[22px] font-black tracking-[0.35em]"
          style={{ color: "#111", fontFamily: "'JetBrains Mono', monospace" }}
        >
          ★ BRIGADE NO. VII · MCMXXIX ★
        </div>
      </div>

      {/* HEADLINE */}
      <div
        className="absolute"
        style={{ left: "60px", top: "1080px", width: "1080px" }}
      >
        <div
          className="leading-[0.88]"
          style={{
            fontFamily: "'Source Serif 4', serif",
            fontWeight: 900,
            fontStyle: "normal",
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ fontSize: "150px", color: "#111" }}>BUILD</div>
          <div style={{ fontSize: "150px", color: "#c8281c", marginTop: "-8px" }}>
            THE FUTURE
          </div>
          <div style={{ fontSize: "108px", color: "#111", marginTop: "-4px" }}>
            WITH YOUR <span style={{ color: "#c8281c" }}>HANDS</span>
          </div>
        </div>
      </div>

      {/* Bottom band */}
      <div
        className="absolute left-0 right-0 flex items-center justify-between px-12"
        style={{
          bottom: "0",
          height: "70px",
          background: "#111",
          color: "#f1e7d0",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        <div className="text-[18px] font-bold tracking-[0.4em]">
          ◤ LABOR · STEEL · TOMORROW ◢
        </div>
        <div className="text-[18px] font-bold tracking-[0.4em]">№ 1929 / V</div>
      </div>

      {/* Vertical side type */}
      <div
        className="absolute"
        style={{
          left: "18px",
          top: "560px",
          transform: "rotate(-90deg)",
          transformOrigin: "left top",
          color: "#111",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "20px",
          fontWeight: 800,
          letterSpacing: "0.45em",
        }}
      >
        ALL-UNION COUNCIL OF PRODUCTION
      </div>

      {/* Corner registration marks */}
      <div className="absolute top-3 right-3 text-[14px]" style={{ color: "#111", fontFamily: "'JetBrains Mono', monospace" }}>
        + K + M + Y +
      </div>
    </div>
  );
}
