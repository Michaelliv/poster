export default function DataArt() {
  const n = 64;
  const rings = 5;
  return (
    <div className="w-[1200px] p-12 text-white" style={{ background: "#0a0a0a", fontFamily: "'Inter', system-ui" }}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[14px] font-semibold uppercase tracking-[0.3em] text-white/40">Generative · 2026-04-16</div>
          <h1 className="mt-2 text-5xl font-black tracking-tight">Orbits.</h1>
          <p className="mt-1 text-sm text-white/50 max-w-md">Eight months of market volatility, mapped radially.<br/>Each dot = one trading day. Distance = |Δ|, angle = date.</p>
        </div>
        <div className="flex items-center gap-6 text-[14px] font-mono text-white/40">
          <span>n = {n * rings}</span>
          <span>seed 0x7A3F</span>
          <span>v1.4.0</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <svg viewBox="-400 -320 800 640" width="1400" height="760">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="0" cy="0" r="260" fill="url(#glow)" />
          {Array.from({ length: rings }).map((_, r) => (
            <circle key={r} cx="0" cy="0" r={40 + r * 55} fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 4" />
          ))}
          {Array.from({ length: n * rings }).map((_, i) => {
            const ring = Math.floor(i / n);
            const pos = i % n;
            const angle = (pos / n) * Math.PI * 2;
            const radius = 40 + ring * 55 + (Math.sin(i * 0.8) * 14);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const hue = ((ring / rings) * 300 + 180) % 360;
            const size = 1 + Math.abs(Math.sin(i * 0.7)) * 4;
            return <circle key={i} cx={x} cy={y} r={size} fill={`hsl(${hue},80%,62%)`} opacity={0.82} />;
          })}
          {Array.from({ length: n }).map((_, i) => {
            const angle = (i / n) * Math.PI * 2;
            const x1 = Math.cos(angle) * 40;
            const y1 = Math.sin(angle) * 40;
            const x2 = Math.cos(angle) * 260;
            const y2 = Math.sin(angle) * 260;
            if (i % 8 !== 0) return null;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />;
          })}
          {/* center callout */}
          <circle cx="0" cy="0" r="38" fill="#0a0a0a" stroke="rgba(255,255,255,0.15)" />
          <text x="0" y="-3" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" letterSpacing="2">VOL</text>
          <text x="0" y="14" textAnchor="middle" fill="#22d3ee" fontSize="18" fontWeight="900" fontFamily="ui-monospace">0.31σ</text>
        </svg>
      </div>

      <div className="mt-2 grid grid-cols-4 gap-4 border-t border-white/5 pt-4 text-[14px]">
        {[
          ["Mean Δ", "+0.42%", "#34d399"],
          ["σ daily", "1.18%", "#22d3ee"],
          ["Max up", "+6.24%", "#a78bfa"],
          ["Max down", "-4.81%", "#f43f5e"],
        ].map(([l, v, c]) => (
          <div key={l}>
            <div className="font-semibold uppercase tracking-[0.2em] text-white/40">{l}</div>
            <div className="mt-1 text-2xl font-black tabular-nums" style={{ color: c as string }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
