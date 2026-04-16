
export default function HeartPlate() {
  const ink = "#1a1410";
  const paper = "#ece2d0";
  const muted = "#5a4a38";
  const faint = "#8a7a60";

  // Crosshatch pattern for muscle shading
  const Hatch = ({ id, angle = 45, spacing = 3, opacity = 0.55, width = 0.5 }: any) => (
    <pattern id={id} patternUnits="userSpaceOnUse" width={spacing} height={spacing} patternTransform={`rotate(${angle})`}>
      <line x1="0" y1="0" x2="0" y2={spacing} stroke={ink} strokeWidth={width} opacity={opacity} />
    </pattern>
  );

  // Leader line + label
  const Label = ({ x1, y1, x2, y2, tx, ty, anchor = "start", latin, en, note }: any) => (
    <g>
      <circle cx={x1} cy={y1} r={1.8} fill={ink} />
      <path d={`M ${x1} ${y1} L ${x2} ${y2} L ${tx} ${ty}`} stroke={ink} strokeWidth={0.6} fill="none" />
      <text x={tx + (anchor === "end" ? -6 : 6)} y={ty - 2} textAnchor={anchor}
            style={{ fontFamily: "'Source Serif 4', serif", fontSize: 13, fontStyle: "italic", fill: ink, letterSpacing: 0.3 }}>
        {latin}
      </text>
      <text x={tx + (anchor === "end" ? -6 : 6)} y={ty + 13} textAnchor={anchor}
            style={{ fontFamily: "'Source Serif 4', serif", fontSize: 11, fill: muted, letterSpacing: 1.4, textTransform: "uppercase" }}>
        {en}
      </text>
      {note && (
        <text x={tx + (anchor === "end" ? -6 : 6)} y={ty + 26} textAnchor={anchor}
              style={{ fontFamily: "'Source Serif 4', serif", fontSize: 10.5, fill: faint, fontStyle: "italic" }}>
          {note}
        </text>
      )}
    </g>
  );

  return (
    <div
      className="w-[1500px] p-16"
      style={{
        background:
          "radial-gradient(1400px 900px at 50% 40%, #f2e9d7 0%, #e8ddc6 60%, #d8cbb0 100%)",
        color: ink,
        fontFamily: "'Source Serif 4', serif",
      }}
    >
      {/* Grain / foxing overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 23% 37%, #8a6a3a 0, #8a6a3a 0.6px, transparent 0.7px, transparent 3px), repeating-radial-gradient(circle at 71% 64%, #6a4a20 0, #6a4a20 0.4px, transparent 0.5px, transparent 5px)",
        }}
      />

      {/* Masthead */}
      <div className="relative flex items-end justify-between border-b-2 border-[#1a1410] pb-3"
           style={{ borderBottomStyle: "double", borderBottomWidth: 4 }}>
        <div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 13, letterSpacing: "0.45em", textTransform: "uppercase", color: muted }}>
            Anatomia Humana · Liber III · Cor et Vasa
          </div>
          <div className="mt-2" style={{ fontFamily: "'Source Serif 4', serif", fontSize: 42, fontWeight: 700, letterSpacing: "0.02em" }}>
            The Human <em style={{ fontWeight: 400 }}>Heart,</em> in Section
          </div>
          <div className="mt-1" style={{ fontSize: 14, fontStyle: "italic", color: muted }}>
            Cor humanum — vena cava aperta, ventriculi expositi, valvulae ostensae.
          </div>
        </div>
        <div className="text-right">
          <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 28, fontWeight: 700, letterSpacing: "0.15em" }}>
            FIG. XLVII
          </div>
          <div style={{ fontSize: 12, letterSpacing: "0.3em", color: muted, textTransform: "uppercase" }}>
            Plate 47 · Tab. CXII
          </div>
        </div>
      </div>

      {/* Plate body */}
      <div className="relative mt-6 grid grid-cols-[320px_1fr_320px] gap-6">
        {/* LEFT clinical column */}
        <div className="space-y-4 pt-6">
          <ClinicalNote
            title="§ I. De Situ Cordis"
            body="The heart is placed obliquely in the middle mediastinum, two-thirds of its mass lying to the left of the median plane. Its base is directed upward, backward, and to the right; its apex downward, forward, and to the left, striking the fifth intercostal space some three-and-a-half inches from the sternum."
          />
          <ClinicalNote
            title="§ II. De Pericardio"
            body="Enclosed within the fibro-serous pericardium, which descends as a double-walled sac upon the roots of the great vessels. The serous layer secretes the liquor pericardii — a thin film that permits the ceaseless translation of the organ upon itself without friction."
          />
          <ClinicalNote
            title="§ III. Structura Muscularis"
            body="The myocardium consists of three strata of fasciculi: superficial, middle, and deep. These are continued from fibrous rings at the auriculo-ventricular orifices, and spiral toward the apex where they form the vortex cordis — the characteristic whorl first figured by Lower in 1669."
          />
        </div>

        {/* CENTER: the engraving */}
        <div className="relative">
          <svg viewBox="0 0 720 820" width="100%" style={{ display: "block" }}>
            <defs>
              <Hatch id="h1" angle={35} spacing={2.6} opacity={0.35} />
              <Hatch id="h2" angle={-40} spacing={3.2} opacity={0.25} />
              <Hatch id="h3" angle={90} spacing={2.2} opacity={0.45} />
              <Hatch id="hDeep" angle={45} spacing={1.8} opacity={0.7} />
              <Hatch id="hLight" angle={20} spacing={4.5} opacity={0.25} />
              <radialGradient id="flesh" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#e8dcc2" />
                <stop offset="100%" stopColor="#c9b993" />
              </radialGradient>
            </defs>

            {/* Plate border */}
            <rect x="4" y="4" width="712" height="812" fill="none" stroke={ink} strokeWidth="0.8" />
            <rect x="10" y="10" width="700" height="800" fill="none" stroke={ink} strokeWidth="0.4" />

            {/* Great vessels — superior */}
            {/* Aorta arch */}
            <path d="M 360 110 C 360 60, 420 40, 470 60 C 520 80, 540 140, 520 200 L 500 240" 
                  fill="url(#flesh)" stroke={ink} strokeWidth="1.4" />
            <path d="M 360 110 C 360 60, 420 40, 470 60 C 520 80, 540 140, 520 200 L 500 240" 
                  fill="url(#h1)" stroke="none" />
            {/* Aortic branches */}
            <path d="M 400 48 L 400 10 M 435 45 L 435 10 M 478 55 L 482 12" 
                  stroke={ink} strokeWidth="1.2" fill="none" />
            <path d="M 395 48 L 395 10 M 440 45 L 440 10 M 483 55 L 487 12" 
                  stroke={ink} strokeWidth="0.5" fill="none" />

            {/* Superior vena cava */}
            <path d="M 290 40 L 290 200 C 290 215, 298 225, 315 230 L 335 235" 
                  fill="url(#flesh)" stroke={ink} strokeWidth="1.3" />
            <rect x="285" y="40" width="12" height="170" fill="url(#h2)" />
            
            {/* Pulmonary trunk / artery */}
            <path d="M 340 120 C 330 80, 320 60, 300 55 M 340 120 L 355 220" 
                  stroke={ink} strokeWidth="1.2" fill="none" />
            <path d="M 340 115 C 335 90, 330 75, 318 70 L 318 30" 
                  fill="url(#flesh)" stroke={ink} strokeWidth="1.2" />

            {/* Pulmonary veins (right side) */}
            <path d="M 250 200 C 230 195, 215 205, 218 225 L 250 235" 
                  fill="url(#flesh)" stroke={ink} strokeWidth="1" />
            <path d="M 250 240 C 225 240, 212 250, 218 268 L 250 270" 
                  fill="url(#flesh)" stroke={ink} strokeWidth="1" />
            {/* Pulmonary veins (left side) */}
            <path d="M 500 200 C 525 195, 545 205, 540 225 L 505 240" 
                  fill="url(#flesh)" stroke={ink} strokeWidth="1" />
            <path d="M 500 245 C 530 240, 548 250, 540 270 L 505 272" 
                  fill="url(#flesh)" stroke={ink} strokeWidth="1" />

            {/* Inferior vena cava */}
            <path d="M 280 720 L 280 790 L 310 790 L 310 730 Z" 
                  fill="url(#flesh)" stroke={ink} strokeWidth="1.2" />
            <rect x="280" y="720" width="30" height="70" fill="url(#h2)" />

            {/* ===== MAIN HEART BODY ===== */}
            {/* Outer silhouette */}
            <path d="
              M 335 235
              C 240 230, 170 290, 160 400
              C 150 520, 200 640, 290 720
              L 340 740
              C 390 745, 445 735, 500 710
              C 590 660, 620 550, 615 440
              C 610 320, 540 235, 500 240
              Z
            " fill="url(#flesh)" stroke={ink} strokeWidth="1.8" />

            {/* Overall light shading */}
            <path d="
              M 335 235 C 240 230, 170 290, 160 400 C 150 520, 200 640, 290 720 L 340 740
              C 390 745, 445 735, 500 710 C 590 660, 620 550, 615 440 C 610 320, 540 235, 500 240 Z
            " fill="url(#hLight)" />

            {/* === CROSS-SECTION CUT: darker region showing interior === */}
            {/* Interior background (opened chambers) */}
            <path d="
              M 200 310
              C 180 380, 185 480, 220 570
              C 245 640, 290 690, 340 710
              L 340 410
              L 280 400
              L 260 340
              Z
            " fill="#d9c9a8" stroke={ink} strokeWidth="1.2" />
            <path d="
              M 200 310 C 180 380, 185 480, 220 570 C 245 640, 290 690, 340 710
              L 340 410 L 280 400 L 260 340 Z
            " fill="url(#h3)" />

            {/* Right atrium (upper chamber, cut open) */}
            <path d="M 260 340 L 280 400 L 340 410 L 340 280 C 310 275, 278 290, 260 340 Z" 
                  fill="#e2d3b5" stroke={ink} strokeWidth="1" />
            <path d="M 260 340 L 280 400 L 340 410 L 340 280 C 310 275, 278 290, 260 340 Z" 
                  fill="url(#hLight)" />
            {/* Pectinate muscles striations in atrium */}
            {Array.from({ length: 8 }).map((_, i) => (
              <path key={i} d={`M ${275 + i * 8} ${295 + i * 2} Q ${290 + i * 6} ${340}, ${310 + i * 3} ${395 - i * 3}`} 
                    stroke={ink} strokeWidth="0.4" fill="none" opacity="0.5" />
            ))}

            {/* Right ventricle wall (cut, showing trabeculae) */}
            <path d="M 220 570 C 245 640, 290 690, 340 710 L 340 410 L 280 400 Z" 
                  fill="#d4c29e" stroke={ink} strokeWidth="0.9" />
            {/* Trabeculae carneae */}
            {Array.from({ length: 14 }).map((_, i) => {
              const y = 430 + i * 20;
              return <path key={i} d={`M ${285 + Math.sin(i)*10} ${y} Q ${310} ${y + 8}, ${335 + Math.cos(i)*4} ${y + 4}`} 
                           stroke={ink} strokeWidth="0.5" fill="none" opacity="0.7" />;
            })}
            {/* Papillary muscle — anterior */}
            <ellipse cx="290" cy="560" rx="14" ry="32" fill="#c4b088" stroke={ink} strokeWidth="0.9" />
            <ellipse cx="290" cy="560" rx="14" ry="32" fill="url(#hDeep)" />
            {/* Chordae tendineae — thin threads */}
            {[-18, -12, -6, 0, 6, 12, 18].map((dx, i) => (
              <path key={i} d={`M ${290 + dx} 530 L ${310 + dx * 1.2} 450`} 
                    stroke={ink} strokeWidth="0.35" fill="none" />
            ))}

            {/* Interventricular septum */}
            <path d="M 340 280 L 340 740 L 360 738 L 360 285 Z" 
                  fill="#b89f74" stroke={ink} strokeWidth="1.2" />
            <path d="M 340 280 L 340 740 L 360 738 L 360 285 Z" fill="url(#hDeep)" />

            {/* === LEFT side (not cut, outer view) === */}
            {/* Left atrium marker */}
            <path d="M 360 285 C 440 260, 510 270, 530 300 L 520 360 L 430 370 L 360 340 Z"
                  fill="none" stroke={ink} strokeWidth="0.6" strokeDasharray="3 2" />
            {/* Left ventricle outer — coronary vessels */}
            <path d="M 375 400 Q 450 450, 510 500 Q 565 560, 555 650" 
                  stroke={ink} strokeWidth="1.4" fill="none" />
            <path d="M 400 385 Q 470 400, 530 430" 
                  stroke={ink} strokeWidth="0.9" fill="none" />
            {/* Coronary sinus branch */}
            <path d="M 395 395 Q 420 470, 440 560 Q 455 640, 450 700" 
                  stroke={ink} strokeWidth="1" fill="none" />

            {/* Valve leaflets */}
            {/* Tricuspid valve (between RA and RV) */}
            <path d="M 280 400 Q 310 425, 340 410 M 280 400 Q 305 418, 320 410" 
                  stroke={ink} strokeWidth="1.1" fill="none" />
            <path d="M 283 402 L 298 440 L 315 422 Z M 320 410 L 330 450 L 340 425 Z" 
                  fill="#c9b58a" stroke={ink} strokeWidth="0.7" />

            {/* Pulmonary valve (at base of pulmonary trunk) */}
            <g transform="translate(338, 235)">
              <path d="M -14 0 Q -7 -8, 0 0 Q 7 -8, 14 0" stroke={ink} strokeWidth="1" fill="#d9c9a8" />
            </g>
            {/* Aortic valve */}
            <g transform="translate(500, 240)">
              <path d="M -14 0 Q -7 -8, 0 0 Q 7 -8, 14 0" stroke={ink} strokeWidth="1" fill="#d9c9a8" />
            </g>

            {/* Apex label anchor */}
            <circle cx="320" cy="735" r="1.8" fill={ink} />

            {/* Stippled shadow beneath heart */}
            {Array.from({ length: 80 }).map((_, i) => {
              const x = 180 + Math.random() * 460;
              const y = 745 + Math.random() * 18;
              return <circle key={i} cx={x} cy={y} r={Math.random() * 0.8 + 0.2} fill={ink} opacity="0.4" />;
            })}

            {/* ===== LABELS ===== */}
            {/* LEFT labels */}
            <Label x1={290} y1={100} x2={200} y2={100} tx={110} ty={85} anchor="end"
              latin="Vena cava superior" en="Superior vena cava" note="returns blood from head & upper limbs" />
            <Label x1={225} y1={225} x2={120} y2={230} tx={110} ty={215} anchor="end"
              latin="Vv. pulmonales dextrae" en="Right pulmonary veins" note="four in number, valveless" />
            <Label x1={270} y1={360} x2={110} y2={360} tx={100} ty={345} anchor="end"
              latin="Atrium dextrum" en="Right atrium" note="cut open to show fossa ovalis" />
            <Label x1={300} y1={470} x2={100} y2={470} tx={90} ty={455} anchor="end"
              latin="Valva tricuspidalis" en="Tricuspid valve" note="three cusps: anterior, posterior, septal" />
            <Label x1={290} y1={560} x2={110} y2={595} tx={100} ty={580} anchor="end"
              latin="M. papillaris ant." en="Anterior papillary muscle" note="anchors chordae tendineae" />
            <Label x1={310} y1={500} x2={140} y2={530} tx={130} ty={515} anchor="end"
              latin="Chordae tendineae" en="Tendinous cords" note="'heart-strings' — restrain cusps in systole" />
            <Label x1={250} y1={680} x2={110} y2={700} tx={100} ty={685} anchor="end"
              latin="Trabeculae carneae" en="Fleshy trabeculae" note="ridges of the ventricular endocardium" />

            {/* RIGHT labels */}
            <Label x1={470} y1={50} x2={600} y2={60} tx={610} ty={45} anchor="start"
              latin="Arcus aortae" en="Arch of the aorta" note="gives off three great branches" />
            <Label x1={520} y1={200} x2={625} y2={210} tx={635} ty={195} anchor="start"
              latin="Truncus pulmonalis" en="Pulmonary trunk" note="bifurcates at T4 vertebral level" />
            <Label x1={510} y1={270} x2={625} y2={280} tx={635} ty={265} anchor="start"
              latin="Valva aortae" en="Aortic (semilunar) valve" note="three cusps: L, R, posterior" />
            <Label x1={445} y1={320} x2={625} y2={340} tx={635} ty={325} anchor="start"
              latin="Atrium sinistrum" en="Left atrium" note="receives oxygenated blood" />
            <Label x1={450} y1={460} x2={625} y2={440} tx={635} ty={425} anchor="start"
              latin="Ventriculus sinister" en="Left ventricle" note="walls thrice the thickness of the right" />
            <Label x1={440} y1={560} x2={625} y2={545} tx={635} ty={530} anchor="start"
              latin="A. coronaria sinistra" en="Left coronary artery" note="descends in the anterior sulcus" />
            <Label x1={360} y1={500} x2={625} y2={635} tx={635} ty={620} anchor="start"
              latin="Septum interventriculare" en="Interventricular septum" note="membranous above, muscular below" />
            <Label x1={320} y1={735} x2={170} y2={790} tx={160} ty={780} anchor="end"
              latin="Apex cordis" en="Apex of the heart" note="5th intercostal space, mid-clavicular line" />
            <Label x1={295} y1={745} x2={470} y2={790} tx={480} ty={780} anchor="start"
              latin="Vena cava inferior" en="Inferior vena cava" note="traverses diaphragm at T8" />

            {/* scale bar */}
            <g transform="translate(560, 770)">
              <line x1="0" y1="0" x2="120" y2="0" stroke={ink} strokeWidth="1" />
              {[0, 20, 40, 60, 80, 100, 120].map((x) => (
                <line key={x} x1={x} y1="-4" x2={x} y2="4" stroke={ink} strokeWidth="0.8" />
              ))}
              <text x="60" y="18" textAnchor="middle" style={{ fontSize: 10, fontStyle: "italic", fill: ink }}>
                scala — pollices III (≈ 7.6 cm)
              </text>
            </g>
          </svg>

          <div className="mt-2 text-center" style={{ fontSize: 13, fontStyle: "italic", color: muted }}>
            The heart seen from before, the right auricle and ventricle laid open, the septum divided, and the vessels severed above their valves.
          </div>
        </div>

        {/* RIGHT clinical column */}
        <div className="space-y-4 pt-6">
          <ClinicalNote
            title="§ IV. Circulatio Sanguinis"
            body="Venous blood, returning by the vv. cavae, fills the right auricle, whence it is driven through the tricuspid orifice into the right ventricle. Ventricular systole propels it into the pulmonary trunk; the arterial lung returns it, oxygenated, by the pulmonary veins to the left auricle, and thence to the left ventricle and aorta."
          />
          <ClinicalNote
            title="§ V. Valvae Cordis"
            body="Four valves guard the orifices. The atrio-ventricular (tricuspid & mitral) are restrained by chordae tendineae taking origin from the papillary muscles; the semilunar (pulmonary & aortic) consist each of three cusps, between which and the vessel wall lie the sinuses of Valsalva."
          />
          <ClinicalNote
            title="§ VI. Nota Clinica"
            body={<>The apex beat — <em>ictus cordis</em> — is palpable in health at the fifth left interspace, one inch internal to the mammillary line. Displacement downward and outward is the cardinal sign of ventricular dilatation, as taught by Laënnec and confirmed at necropsy by Skoda.</>}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="relative mt-8 flex items-end justify-between border-t-2 pt-3"
           style={{ borderTopColor: ink, borderTopStyle: "double", borderTopWidth: 4 }}>
        <div style={{ fontSize: 12, fontStyle: "italic", color: muted }}>
          Delineavit ex cadavere · M. Liv, sculpsit · Editio altera, emendata
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: muted }}>
          PLATE XLVII · pp. 542–543
        </div>
        <div style={{ fontSize: 12, fontStyle: "italic", color: muted }}>
          Typis academicis · MDCCCLVIII
        </div>
      </div>
    </div>
  );
}

function ClinicalNote({ title, body }: { title: string; body: any }) {
  return (
    <div style={{ borderLeft: "2px solid #1a1410", paddingLeft: 12 }}>
      <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
        {title}
      </div>
      <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: 13.5, lineHeight: 1.55, color: "#2a2018", textAlign: "justify", hyphens: "auto" }}>
        {body}
      </p>
    </div>
  );
}
