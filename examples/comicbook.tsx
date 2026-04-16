import React from "react";

export default function ComicCover() {
  const barcodeBars = [2,1,3,1,2,1,1,3,2,1,3,1,2,2,1,3,1,2,1,3,2,1,1,3,2,1,3,1,2,1,3,2,1,2,1,3,1,2,2,1,3,1,2,1,3];

  const buildings = [
    {x:0,w:60,h:220},{x:60,w:40,h:160},{x:100,w:80,h:310},{x:180,w:50,h:200},
    {x:230,w:90,h:380},{x:320,w:55,h:240},{x:375,w:70,h:300},{x:445,w:45,h:180},
    {x:490,w:100,h:420},{x:590,w:60,h:260},{x:650,w:75,h:340},{x:725,w:50,h:210},
    {x:775,w:85,h:360},{x:860,w:55,h:230},{x:915,w:70,h:300},{x:985,w:45,h:190},
    {x:1030,w:95,h:400},{x:1125,w:55,h:250},
  ];

  return (
    <div
      className="w-[1200px] h-[1800px] relative overflow-hidden"
      style={{
        fontFamily: "'Inter', system-ui",
        background:
          "linear-gradient(180deg, #ff6b1a 0%, #ff3d6b 35%, #a61854 70%, #2a0f3a 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #000 1.2px, transparent 1.4px)",
          backgroundSize: "6px 6px",
        }}
      />

      {/* Top banner */}
      <div
        className="absolute top-0 left-0 right-0 flex items-stretch"
        style={{ height: 110, background: "#ffd300", borderBottom: "5px solid #000" }}
      >
        <div
          className="flex flex-col items-center justify-center text-black"
          style={{ width: 150, background: "#ffd300", borderRight: "5px solid #000" }}
        >
          <div className="font-black leading-none" style={{fontSize:20, letterSpacing: "0.05em"}}>MARVELOUS</div>
          <div className="font-black leading-none mt-1" style={{fontSize:14, letterSpacing:"0.3em"}}>COMICS</div>
          <div className="font-black leading-none mt-1" style={{fontSize:42, fontFamily:"'Source Serif 4', serif", fontStyle:"italic"}}>№042</div>
        </div>

        <div className="flex items-center justify-center" style={{width: 130, borderRight: "5px solid #000", background:"#fff"}}>
          <div className="flex flex-col items-center text-black leading-tight text-center">
            <div className="font-black" style={{fontSize:14}}>APPROVED</div>
            <div className="font-black" style={{fontSize:14}}>BY THE</div>
            <div className="font-black" style={{fontSize:14}}>COMICS</div>
            <div className="font-black" style={{fontSize:14}}>CODE</div>
            <div className="font-black mt-0.5" style={{fontSize:14}}>AUTHORITY</div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center relative">
          <div
            className="text-black font-black leading-none text-center"
            style={{
              fontSize: 96,
              letterSpacing: "-0.04em",
              textShadow: "6px 6px 0 #ff3d6b, 8px 8px 0 #000",
              transform: "skewX(-6deg)",
            }}
          >
            STARGAZER
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-center text-black"
          style={{ width: 110, background: "#ffd300", borderLeft: "5px solid #000" }}
        >
          <div className="font-black" style={{fontSize:14}}>75¢</div>
          <div className="font-black leading-none" style={{fontSize:36}}>US</div>
          <div className="font-black" style={{fontSize:14}}>95¢ CAN</div>
        </div>

        <div
          className="flex flex-col items-center justify-center text-black font-black"
          style={{ width: 90, background: "#fff", borderLeft: "5px solid #000" }}
        >
          <div className="leading-none" style={{fontSize:16}}>042</div>
          <div className="leading-none mt-0.5" style={{fontSize:40, letterSpacing:"0.02em"}}>JAN</div>
          <div className="leading-none mt-0.5" style={{fontSize:15}}>1987</div>
        </div>
      </div>

      {/* Starburst */}
      <div
        className="absolute"
        style={{ top: 145, right: 30, width: 320, height: 320, transform: "rotate(-12deg)" }}
      >
        <svg viewBox="-100 -100 200 200" width="320" height="320">
          <polygon
            points={Array.from({length:32}).map((_,i)=>{
              const a = (i/32)*Math.PI*2;
              const r = i%2===0 ? 95 : 68;
              return `${Math.cos(a)*r},${Math.sin(a)*r}`;
            }).join(" ")}
            fill="#ffd300"
            stroke="#000"
            strokeWidth="3"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-black text-center">
          <div className="font-black leading-none" style={{fontSize:22}}>SPECIAL</div>
          <div className="font-black leading-none mt-1" style={{fontSize:44, fontFamily:"'Source Serif 4', serif", fontStyle:"italic"}}>MYSTERY</div>
          <div className="font-black leading-none mt-1" style={{fontSize:22}}>ISSUE!</div>
          <div className="font-black mt-2" style={{fontSize:14, letterSpacing:"0.2em"}}>48 PAGES</div>
        </div>
      </div>

      {/* Hero SVG */}
      <svg
        className="absolute"
        style={{ top: 180, left: 0, right: 0, margin: "0 auto" }}
        width="1200" height="1180" viewBox="0 0 1200 1180"
      >
        <defs>
          <radialGradient id="moon" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff5cc"/>
            <stop offset="70%" stopColor="#ffd300"/>
            <stop offset="100%" stopColor="#ff8800"/>
          </radialGradient>
        </defs>

        <circle cx="780" cy="430" r="280" fill="url(#moon)"/>
        <circle cx="720" cy="380" r="32" fill="#ffb347" opacity="0.5"/>
        <circle cx="830" cy="500" r="20" fill="#ffb347" opacity="0.5"/>
        <circle cx="870" cy="400" r="14" fill="#ffb347" opacity="0.5"/>

        {Array.from({length:36}).map((_,i)=>{
          const a = (i/36)*Math.PI*2;
          return <line key={i}
            x1={600+Math.cos(a)*180} y1={640+Math.sin(a)*180}
            x2={600+Math.cos(a)*600} y2={640+Math.sin(a)*600}
            stroke="#ffd300" strokeOpacity="0.35" strokeWidth={i%3===0?3:1.5}/>;
        })}

        <g transform="translate(0,760)">
          <rect x="0" y="0" width="1200" height="420" fill="#0a0510"/>
          {buildings.map((b,i)=>(
            <g key={i}>
              <rect x={b.x} y={-b.h} width={b.w} height={b.h} fill="#0a0510"/>
              {Array.from({length:Math.floor(b.h/28)}).map((_,ry)=>
                Array.from({length:Math.floor(b.w/14)}).map((_,rx)=>{
                  const lit = ((i*7+rx*3+ry*5)%7)<2;
                  return lit ? <rect key={`${ry}-${rx}`}
                    x={b.x+4+rx*14} y={-b.h+8+ry*28}
                    width="6" height="10" fill="#ffd300" opacity="0.85"/> : null;
                })
              )}
            </g>
          ))}
          <line x1="280" y1="-380" x2="280" y2="-440" stroke="#0a0510" strokeWidth="4"/>
          <line x1="540" y1="-420" x2="540" y2="-490" stroke="#0a0510" strokeWidth="4"/>
          <line x1="1075" y1="-400" x2="1075" y2="-470" stroke="#0a0510" strokeWidth="4"/>
        </g>

        <g transform="translate(600,620)">
          <path d="M -30,-180 C -180,-160 -240,-40 -260,120 C -200,90 -140,60 -80,20 Z"
                fill="#0a0510" stroke="#ffd300" strokeWidth="3"/>
          <path d="M 30,-180 C 180,-160 240,-40 260,120 C 200,90 140,60 80,20 Z"
                fill="#0a0510" stroke="#ffd300" strokeWidth="3"/>

          <g fill="#0a0510" stroke="#ffd300" strokeWidth="3" strokeLinejoin="round">
            <path d="M -55,-180 L 55,-180 L 70,-40 L 40,90 L -40,90 L -70,-40 Z"/>
            <circle cx="0" cy="-220" r="45"/>
            <path d="M -30,-230 L 30,-230 L 24,-215 L -24,-215 Z" fill="#ffd300" stroke="none"/>
            <path d="M -55,-160 L -160,-260 L -200,-250 L -210,-230 L -180,-220 L -90,-130 Z"/>
            <circle cx="-195" cy="-245" r="22"/>
            <path d="M 55,-150 L 140,-80 L 170,-30 L 155,-15 L 120,-40 L 40,-80 Z"/>
            <circle cx="160" cy="-22" r="18"/>
            <path d="M -40,90 L -90,230 L -70,320 L -30,320 L -15,220 L 0,90 Z"/>
            <path d="M 0,90 L 55,200 L 120,280 L 155,270 L 150,250 L 85,180 L 40,90 Z"/>
          </g>

          <polygon
            points={Array.from({length:10}).map((_,i)=>{
              const a=(i/10)*Math.PI*2 - Math.PI/2;
              const r=i%2===0?28:12;
              return `${Math.cos(a)*r},${Math.sin(a)*r-80}`;
            }).join(" ")}
            fill="#ffd300" stroke="#fff" strokeWidth="2"
          />

          <g stroke="#ffd300" strokeWidth="3" fill="none" opacity="0.85">
            <path d="M -260,-200 L -210,-200"/>
            <path d="M -280,-170 L -220,-170"/>
            <path d="M 240,140 L 290,140"/>
            <path d="M 220,170 L 280,170"/>
          </g>
        </g>

        {Array.from({length:25}).map((_,i)=>{
          const x=100+(i*47)%1000, y=200+(i*83)%300;
          return <g key={i} transform={`translate(${x},${y})`}>
            <polygon
              points={Array.from({length:8}).map((_,k)=>{
                const a=(k/8)*Math.PI*2;
                const r=k%2===0?4:1.5;
                return `${Math.cos(a)*r},${Math.sin(a)*r}`;
              }).join(" ")}
              fill="#fff" opacity="0.9"/>
          </g>;
        })}
      </svg>

      {/* Headline burst */}
      <div
        className="absolute"
        style={{ top: 960, left: 40, width: 660, transform: "rotate(-4deg)" }}
      >
        <svg viewBox="-10 -10 660 240" width="660" height="240">
          <polygon
            points={Array.from({length:44}).map((_,i)=>{
              const a=(i/44)*Math.PI*2;
              const rx=310, ry=95;
              const r = i%2===0 ? 1.0 : 0.78;
              return `${320+Math.cos(a)*rx*r},${110+Math.sin(a)*ry*r}`;
            }).join(" ")}
            fill="#ffd300" stroke="#000" strokeWidth="5"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-black px-14 text-center">
          <div className="font-black leading-none" style={{fontSize:26, letterSpacing:"0.08em"}}>WHO is the</div>
          <div
            className="font-black leading-none mt-1"
            style={{
              fontSize:82,
              fontFamily: "'Source Serif 4', serif",
              fontStyle: "italic",
              letterSpacing: "-0.02em",
              color: "#b10024",
              textShadow: "3px 3px 0 #000",
            }}
          >
            CIPHER
          </div>
          <div className="font-black leading-none mt-2" style={{fontSize:44, letterSpacing:"0.02em"}}>KILLER?!</div>
        </div>
      </div>

      {/* Credits */}
      <div
        className="absolute text-white font-black"
        style={{
          top: 1210, right: 50,
          fontSize: 18, letterSpacing: "0.12em",
          textShadow: "2px 2px 0 #000",
          transform: "rotate(-3deg)", textAlign: "right",
        }}
      >
        <div>STAN LIEBOWITZ · WRITER</div>
        <div>JACK ROMITA JR · ART</div>
        <div style={{color:"#ffd300"}}>A NIGHT OF RECKONING!</div>
      </div>

      {/* Bottom strip */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center"
        style={{ height: 120, background: "#0a0510", borderTop: "5px solid #000" }}
      >
        <div
          className="flex items-end ml-6 p-2"
          style={{ background: "#fff", height: 92, width: 200 }}
        >
          <div className="flex items-end gap-[1px] flex-1" style={{height:"100%"}}>
            {barcodeBars.map((w,i)=>(
              <div key={i} style={{width: w, height: i<3||i>40?"78%":"100%", background:"#000"}}/>
            ))}
          </div>
        </div>
        <div
          className="text-white ml-3 leading-tight"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}
        >
          <div>0 71486 02042 7</div>
          <div style={{color:"#ffd300"}}>VOL. 4 · NO. 42</div>
        </div>

        <div className="flex-1 text-center text-white" style={{fontSize:16, letterSpacing:"0.25em"}}>
          <div className="font-black">MARVELOUS COMICS GROUP</div>
          <div style={{fontSize:14, color:"#ffd300", letterSpacing:"0.15em"}} className="mt-1">
            STILL ONLY 75¢ · COLLECT THEM ALL!
          </div>
        </div>

        <div
          className="mr-6 text-white font-black text-center border-4 border-white p-2"
          style={{ fontSize: 14, letterSpacing: "0.1em", lineHeight: 1.1 }}
        >
          <div>DIRECT</div>
          <div>EDITION</div>
        </div>
      </div>
    </div>
  );
}
