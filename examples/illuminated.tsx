
import React from "react";

const latin = [
  "uondam in diebus illis cum tenebrae operirent faciem terrae, surrexit miles quidam ex civitate Aurelianensi, cuius nomen erat Godefridus, vir probus et timens Deum, qui multas peregrinationes ad sepulchrum Sancti Iacobi suscepit per montes et flumina.",
  "Erat autem in eadem civitate monasterium antiquissimum, ubi monachi diu noctuque psallebant laudes Domino, et inter illos quidam frater Bernardus, scriptor peritissimus, qui codices auro et purpura decorabat secundum morem patrum.",
  "Anno Domini millesimo ducentesimo quadragesimo septimo, dum frater Bernardus in scriptorio laboraret, ecce draco terribilis ex silva propinqua egressus est, squamis aureis fulgens, oculis sicut carbones ardentes.",
  "Tunc miles Godefridus, accepto gladio benedicto ab episcopo, processit contra bestiam, et post longum certamen, invocato nomine Beatae Virginis Mariae, draconem transfixit, et liberata est tota provincia a malo illo.",
  "Postea vero frater Bernardus historiam hanc in pergameno scripsit, ut memoria facti permaneret in saecula saeculorum, et ut omnes fideles laudarent Deum qui dat virtutem suis servis.",
];

const latin2 = [
  "Notandum est insuper quod in eodem anno tres signa apparuerunt in caelo: stella cum cauda longa per septem noctes, luna sanguinea in festo Sancti Michaelis, et chorus angelorum auditus est super basilicam.",
  "Episcopus autem Aurelianensis, vir sanctissimus, convocavit synodum cleri et populi, et statuit ut singulis annis fieret processio solemnis cum reliquiis sanctorum martyrum per vicos civitatis.",
  "In illa processione portabantur cruces aureae, candelabra argentea, et codex iste quem manus mea humilis composuit ad gloriam Dei Patris omnipotentis et Filii eius Iesu Christi Domini nostri.",
  "Benedicti sint omnes qui legunt haec verba et orant pro anima scriptoris peccatoris. Sit nomen Domini benedictum ex hoc nunc et usque in saeculum, amen, amen, dico vobis amen.",
  "Explicit liber primus de gestis militum et monachorum. Incipit secundus de miraculis Beatae Mariae apud sanctuarium montis aurei quod situm est inter duas valles fertiles.",
];

// Decorative gold knot in margin
const Flourish = ({ className = "", flip = false }: { className?: string; flip?: boolean }) => (
  <svg viewBox="0 0 80 320" className={className} style={{ transform: flip ? "scaleX(-1)" : undefined }}>
    <defs>
      <linearGradient id="goldF" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#8a6a1a" />
        <stop offset="40%" stopColor="#f4d36b" />
        <stop offset="60%" stopColor="#fff3b8" />
        <stop offset="100%" stopColor="#7a5a14" />
      </linearGradient>
    </defs>
    <path
      d="M40 0 C 20 30, 60 60, 40 90 S 20 150, 40 180 S 60 240, 40 270 L40 320"
      stroke="url(#goldF)"
      strokeWidth="3"
      fill="none"
    />
    {[30, 90, 150, 210, 270].map((y, i) => (
      <g key={i} transform={`translate(40 ${y})`}>
        <circle r="6" fill="url(#goldF)" stroke="#5a3f0a" strokeWidth="0.6" />
        <path d="M-18 0 Q 0 -14, 18 0 Q 0 14, -18 0" fill="none" stroke="url(#goldF)" strokeWidth="2" />
        <path d="M0 -14 Q 12 0, 0 14 Q -12 0, 0 -14" fill="none" stroke="#b8862c" strokeWidth="1" />
      </g>
    ))}
    {[0, 60, 120, 180, 240, 300].map((y, i) => (
      <g key={`v${i}`} transform={`translate(40 ${y})`}>
        <path d="M0 0 C -22 6, -28 22, -16 28 C -8 22, -4 14, 0 8" fill="#1a4d2e" stroke="#0d2818" strokeWidth="0.6" />
        <circle cx="-20" cy="20" r="3" fill="#a8202a" stroke="#5a0e14" strokeWidth="0.5" />
      </g>
    ))}
  </svg>
);

// Ornate drop cap Q
const DropCapQ = () => (
  <svg viewBox="0 0 180 180" className="w-[180px] h-[180px] float-left mr-4 mb-1">
    <defs>
      <linearGradient id="goldQ" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7a5814" />
        <stop offset="35%" stopColor="#f3cf5d" />
        <stop offset="55%" stopColor="#fff4b0" />
        <stop offset="100%" stopColor="#6b4a0e" />
      </linearGradient>
      <pattern id="vine" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1.2" fill="#1a4d2e" />
      </pattern>
    </defs>
    {/* Background panel — lapis blue */}
    <rect x="4" y="4" width="172" height="172" fill="#1e3a8a" stroke="url(#goldQ)" strokeWidth="3" />
    <rect x="9" y="9" width="162" height="162" fill="none" stroke="#0a1a4a" strokeWidth="0.8" />
    {/* Inner vine pattern */}
    <g opacity="0.5">
      {[...Array(12)].map((_, i) => (
        <path
          key={i}
          d={`M ${10 + i * 14} 10 Q ${20 + i * 14} ${90}, ${10 + i * 14} 170`}
          stroke="#3a5dc7"
          strokeWidth="0.5"
          fill="none"
        />
      ))}
    </g>
    {/* Red diamond accents */}
    {[[40, 40], [140, 40], [40, 140], [140, 140]].map(([x, y], i) => (
      <g key={i} transform={`translate(${x} ${y}) rotate(45)`}>
        <rect x="-8" y="-8" width="16" height="16" fill="#a8202a" stroke="url(#goldQ)" strokeWidth="1.2" />
        <circle r="3" fill="url(#goldQ)" />
      </g>
    ))}
    {/* The Q itself */}
    <text
      x="90"
      y="135"
      textAnchor="middle"
      style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 900 }}
      fontSize="160"
      fill="url(#goldQ)"
      stroke="#3a2608"
      strokeWidth="1.2"
    >
      Q
    </text>
    {/* Tail flourish on Q */}
    <path
      d="M 110 130 Q 150 150, 170 175"
      stroke="url(#goldQ)"
      strokeWidth="3"
      fill="none"
    />
  </svg>
);

// Marginalia: dragon
const Dragon = () => (
  <svg viewBox="0 0 220 180" className="w-full">
    <defs>
      <linearGradient id="dragGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8a6a1a" />
        <stop offset="50%" stopColor="#f3cf5d" />
        <stop offset="100%" stopColor="#6b4a0e" />
      </linearGradient>
    </defs>
    {/* Body — coiled serpent dragon */}
    <path
      d="M 30 140 Q 20 100, 60 80 Q 110 60, 150 90 Q 180 110, 165 140 Q 140 165, 100 150 Q 70 140, 60 155"
      fill="#2d6a3e"
      stroke="#0d2818"
      strokeWidth="1.6"
    />
    {/* Belly */}
    <path
      d="M 50 130 Q 90 120, 140 130 Q 150 140, 130 148 Q 90 152, 55 145 Z"
      fill="#c9a44a"
      stroke="#5a3f0a"
      strokeWidth="0.8"
    />
    {/* Scales */}
    {[0, 1, 2, 3, 4].map((i) => (
      <path
        key={i}
        d={`M ${60 + i * 20} 90 Q ${70 + i * 20} 85, ${80 + i * 20} 92`}
        fill="none"
        stroke="#0d2818"
        strokeWidth="0.8"
      />
    ))}
    {/* Wing */}
    <path
      d="M 100 80 Q 90 30, 130 25 Q 140 50, 150 75 Q 130 70, 100 80"
      fill="#a8202a"
      stroke="#3a0a10"
      strokeWidth="1.2"
    />
    <path d="M 110 70 L 120 35 M 125 72 L 135 38 M 140 75 L 145 50" stroke="#3a0a10" strokeWidth="0.8" fill="none" />
    {/* Head */}
    <path
      d="M 155 95 Q 195 80, 205 100 Q 200 115, 175 115 Q 160 110, 155 95 Z"
      fill="#2d6a3e"
      stroke="#0d2818"
      strokeWidth="1.4"
    />
    {/* Eye */}
    <circle cx="190" cy="98" r="3.5" fill="#fff3b8" stroke="#0d2818" strokeWidth="0.8" />
    <circle cx="191" cy="99" r="1.5" fill="#0d2818" />
    {/* Fire breath */}
    <path d="M 205 105 Q 218 102, 215 110 Q 212 108, 205 110" fill="#e85a1c" stroke="#7a1a0a" strokeWidth="0.6" />
    <path d="M 210 110 Q 220 113, 215 118 Q 210 116, 208 113" fill="#f3a01c" stroke="#7a1a0a" strokeWidth="0.6" />
    {/* Horns */}
    <path d="M 175 88 L 172 78 M 182 86 L 184 74" stroke="url(#dragGold)" strokeWidth="2" fill="none" />
    {/* Tail tip */}
    <path d="M 60 155 Q 50 165, 40 160 L 48 152 Z" fill="#a8202a" stroke="#3a0a10" strokeWidth="1" />
    {/* Spines */}
    {[80, 100, 120, 140].map((x, i) => (
      <path key={i} d={`M ${x} 78 L ${x + 2} 68 L ${x + 6} 78`} fill="#0d2818" />
    ))}
  </svg>
);

const Para = ({ children, first = false }: { children: React.ReactNode; first?: boolean }) => (
  <p
    className="mb-3 text-justify"
    style={{
      fontFamily: "'Source Serif 4', serif",
      fontSize: "17px",
      lineHeight: "1.55",
      color: "#2a1a08",
      textIndent: first ? 0 : "1.2em",
    }}
  >
    {children}
  </p>
);

export default function Illuminated() {
  // Vellum SVG noise/stains
  const vellumBg = `
    radial-gradient(900px 600px at 15% 10%, rgba(180,140,80,0.18), transparent 60%),
    radial-gradient(700px 500px at 85% 90%, rgba(160,110,60,0.22), transparent 55%),
    radial-gradient(300px 200px at 70% 30%, rgba(120,80,40,0.12), transparent 60%),
    radial-gradient(200px 150px at 30% 75%, rgba(140,90,50,0.14), transparent 60%),
    linear-gradient(180deg, #f4e4c1 0%, #ecd9ad 50%, #e8d39f 100%)
  `;

  return (
    <div
      className="w-[1400px] p-12 relative"
      style={{
        background: vellumBg,
        boxShadow: "inset 0 0 120px rgba(90,50,10,0.35), inset 0 0 30px rgba(120,70,20,0.4)",
      }}
    >
      {/* Vellum stains/spots */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          radial-gradient(circle at 22% 18%, rgba(110,70,30,0.18) 0px, transparent 8px),
          radial-gradient(circle at 78% 22%, rgba(120,80,40,0.14) 0px, transparent 14px),
          radial-gradient(circle at 12% 62%, rgba(100,60,20,0.16) 0px, transparent 10px),
          radial-gradient(circle at 88% 72%, rgba(110,70,30,0.18) 0px, transparent 12px),
          radial-gradient(circle at 50% 95%, rgba(130,80,30,0.12) 0px, transparent 20px)
        `
      }} />

      {/* Outer gold border frame */}
      <div
        className="relative border-[3px] p-8"
        style={{
          borderImage: "linear-gradient(135deg, #7a5814, #f3cf5d, #fff4b0, #7a5814) 1",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        {/* Title rubric */}
        <div className="flex items-center justify-center mb-6 gap-4">
          <div className="flex-1 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #a8202a, transparent)" }} />
          <h1
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontWeight: 900,
              fontSize: "28px",
              color: "#a8202a",
              letterSpacing: "0.15em",
              textShadow: "0 1px 0 rgba(120,30,40,0.3)",
            }}
          >
            ✠ INCIPIT LIBER DE GESTIS GODEFRIDI MILITIS ✠
          </h1>
          <div className="flex-1 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #a8202a, transparent)" }} />
        </div>

        {/* Main layout: margin flourish | text columns | margin flourish + dragon */}
        <div className="flex gap-6">
          {/* Left margin */}
          <div className="w-[60px] flex-shrink-0 flex items-start justify-center pt-4">
            <Flourish className="w-[60px] h-[700px]" />
          </div>

          {/* Two columns of text */}
          <div className="flex-1 grid grid-cols-2 gap-8">
            {/* Column 1 */}
            <div>
              <DropCapQ />
              {latin.map((p, i) => (
                <Para key={i} first={i === 0}>{p}</Para>
              ))}
              {/* small rubricated initial */}
              <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "17px", lineHeight: 1.55, color: "#2a1a08", textIndent: "1.2em" }}>
                <span style={{ color: "#a8202a", fontWeight: 900, fontSize: "22px" }}>D</span>einde vero contigit ut idem miles, dum reverteretur a Terra Sancta, navem conscenderet apud portum Iaffae, et per maria Mediterranea pervenisset ad insulam Cypri, ubi a rege benigne susceptus est.
              </p>
            </div>

            {/* Column 2 */}
            <div>
              {latin2.map((p, i) => (
                <Para key={i} first={i === 0}>{p}</Para>
              ))}
              {/* Marginalia dragon */}
              <div className="mt-4 mb-2 px-2">
                <Dragon />
                <p
                  className="text-center mt-1 italic"
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    fontSize: "13px",
                    color: "#7a3a1a",
                  }}
                >
                  — draco terribilis ex silva —
                </p>
              </div>
              <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "17px", lineHeight: 1.55, color: "#2a1a08", textIndent: "1.2em" }}>
                <span style={{ color: "#1e3a8a", fontWeight: 900, fontSize: "22px" }}>O</span>rate, fratres carissimi, pro me misero peccatore Bernardo scriptore, ut Dominus noster Iesus Christus dignetur peccata mea dimittere et in numero electorum suorum collocare per intercessionem Beatae Mariae semper Virginis.
              </p>
            </div>
          </div>

          {/* Right margin */}
          <div className="w-[60px] flex-shrink-0 flex items-start justify-center pt-4">
            <Flourish className="w-[60px] h-[700px]" flip />
          </div>
        </div>

        {/* Bottom colophon */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span style={{ color: "#b8862c", fontSize: "20px" }}>❦</span>
          <p
            className="text-center"
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontStyle: "italic",
              fontSize: "15px",
              color: "#5a3a18",
            }}
          >
            Scriptum manu fratris Bernardi · Anno Domini MCCXLVII · in monasterio Sancti Aegidii Aurelianensis · folio xxiii recto
          </p>
          <span style={{ color: "#b8862c", fontSize: "20px" }}>❦</span>
        </div>
      </div>
    </div>
  );
}
