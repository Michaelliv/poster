const lorem = "Civic leaders gathered at dawn along the waterfront promenade to mark the reopening of the Harbor Line, a rail corridor shuttered for nearly four decades after the collapse of the original Meridian Terminal. The ceremony, brief but attended by roughly three thousand residents, signaled what Mayor Adaeze Okonkwo called a 'long overdue return of the city to its own coastline.' Trains began running at 5:42 a.m., on time to the minute, with conductors ringing brass bells salvaged from the old depot. Ridership on the first day exceeded projections by nearly forty percent, according to transit authority figures released late Monday evening. ";

const col1 = lorem + "Commuters who had grown accustomed to ninety-minute bus transfers described the shift in almost disbelieving terms. 'I read a book,' said Helena Vargas, 48, a hospital administrator from the Estrela district. 'An actual book. On a Tuesday.' Along the platform at Pier Seventeen, vendors sold commemorative tickets printed on thick cream stock, and a municipal brass ensemble played a medley that drifted out over the water toward the container terminals.";

const col2 = "The project, budgeted at 2.4 billion and delivered eleven months ahead of schedule, relied on a public-private financing structure that city comptrollers had publicly doubted as recently as last autumn. Critics continue to question the long-term maintenance plan, noting that the original Harbor Line was closed not because of political neglect but because salt intrusion had eaten through the viaduct supports in under thirty years. Engineers with the Meridian Transit Authority say the new corridor uses a marine-grade composite cladding expected to outlast the concrete beneath it. 'We built it assuming the ocean wins eventually,' said chief engineer Ravi Subramanian. 'The question is how graciously you lose.' ";

const col3 = "For the neighborhoods north of the channel, the reopening arrives alongside a wave of zoning changes already reshaping the skyline. Three mid-rise developments broke ground last week within walking distance of the new Crescent Station, and the Planning Commission is scheduled to review four more applications before the end of the month. Residents' associations, which have spent the better part of two years in negotiation with developers, say they will hold the city to its commitment that at least a third of new units be offered at regulated rents. A full schedule of Harbor Line service, along with the first revised bus-route map in eleven years, appears on page A14. Coverage of last night's council vote on the waterfront esplanade begins on B1. ";

const weather = [
  { d: "MON", hi: 64, lo: 51, s: "☀" },
  { d: "TUE", hi: 67, lo: 53, s: "⛅" },
  { d: "WED", hi: 61, lo: 49, s: "🌧" },
  { d: "THU", hi: 58, lo: 47, s: "🌧" },
  { d: "FRI", hi: 63, lo: 50, s: "⛅" },
  { d: "SAT", hi: 69, lo: 54, s: "☀" },
  { d: "SUN", hi: 71, lo: 55, s: "☀" },
];

export default function Paper() {
  return (
    <div
      className="w-[1400px] p-12 text-neutral-900"
      style={{ background: "#faf5ed", fontFamily: "'Source Serif 4', serif" }}
    >
      <div className="flex items-end justify-between border-b-4 border-double border-neutral-900 pb-4">
        <div className="text-[14px] uppercase tracking-[0.3em] text-neutral-600" style={{ fontFamily: "'Inter', system-ui" }}>
          Vol. CXLII · No. 28,416
        </div>
        <div className="text-[14px] uppercase tracking-[0.2em] text-neutral-700" style={{ fontFamily: "'Inter', system-ui" }}>
          "Light Where It Is Due"
        </div>
        <div className="text-[14px] uppercase tracking-[0.3em] text-neutral-600" style={{ fontFamily: "'Inter', system-ui" }}>
          $3.50 · City Edition
        </div>
      </div>

      <h1 className="mt-3 text-center font-black tracking-tight leading-none" style={{ fontSize: 120 }}>
        The Meridian Tribune
      </h1>

      <div className="mt-3 flex items-center justify-between border-y border-neutral-900 py-2 text-[14px] uppercase tracking-[0.25em]" style={{ fontFamily: "'Inter', system-ui" }}>
        <span>Tuesday, 14 April 2026</span>
        <span>Est. 1884 · Meridian, Pacific Coast</span>
        <span>meridiantribune.com</span>
      </div>

      <div className="mt-6 grid grid-cols-[1fr_1fr_1fr_320px] gap-6">
        <div className="col-span-3">
          <div className="text-[14px] uppercase tracking-[0.35em] text-red-800 font-bold" style={{ fontFamily: "'Inter', system-ui" }}>
            City · Transit · Page One
          </div>
          <h2 className="mt-2 text-6xl font-black leading-[0.95] tracking-tight">
            Harbor Line Returns After{" "}
            <em className="italic font-normal" style={{ color: "#7c1d1d" }}>
              Thirty-Nine Years,
            </em>{" "}
            Crowds Greet the 5:42
          </h2>
          <div className="mt-3 text-xl italic text-neutral-700 border-l-4 border-neutral-900 pl-4">
            Mayor calls it a 'long overdue return of the city to its own coastline' as ridership on opening day exceeds projections by forty percent.
          </div>
          <div className="mt-2 text-[14px] uppercase tracking-[0.2em] text-neutral-500" style={{ fontFamily: "'Inter', system-ui" }}>
            By Marisol Fenwick · Staff Correspondent
          </div>

          <div className="mt-5 grid grid-cols-3 gap-6 text-[15px] leading-[1.55] text-neutral-800" style={{ textAlign: "justify", hyphens: "auto" }}>
            <div>
              <span className="float-left mr-2 font-black leading-[0.85]" style={{ fontSize: 68 }}>C</span>
              {col1.slice(1)}
            </div>
            <div>{col2}</div>
            <div>{col3}</div>
          </div>
        </div>

        <aside className="border-l border-neutral-400 pl-5">
          <div className="text-[14px] uppercase tracking-[0.35em] font-bold border-b-2 border-neutral-900 pb-2" style={{ fontFamily: "'Inter', system-ui" }}>
            Also Inside
          </div>

          <div className="mt-4">
            <div className="text-[14px] uppercase tracking-[0.25em] text-red-800" style={{ fontFamily: "'Inter', system-ui" }}>Markets</div>
            <h3 className="mt-1 text-xl font-black leading-tight">Copper slips a third day as factory orders soften in the east</h3>
            <p className="mt-2 text-[14px] leading-[1.5] text-neutral-700">Traders in the Bay district described a thin, jumpy session with desks clearing by mid-afternoon. The MER-40 closed down 0.8%.</p>
          </div>

          <div className="mt-5 pt-5 border-t border-neutral-300">
            <div className="text-[14px] uppercase tracking-[0.25em] text-red-800" style={{ fontFamily: "'Inter', system-ui" }}>Arts</div>
            <h3 className="mt-1 text-xl font-black leading-tight">At the Fillmore, a quiet debut becomes the season's loudest surprise</h3>
            <p className="mt-2 text-[14px] leading-[1.5] text-neutral-700">Composer Ines Takahara's chamber piece 'Lanterns for a Narrow Street' drew a standing ovation of nearly seven minutes.</p>
          </div>

          <div className="mt-5 pt-5 border-t border-neutral-300">
            <div className="text-[14px] uppercase tracking-[0.25em] text-red-800" style={{ fontFamily: "'Inter', system-ui" }}>Sports</div>
            <h3 className="mt-1 text-xl font-black leading-tight">Harbormen take two from Oakridge on a tenth-inning squeeze</h3>
            <p className="mt-2 text-[14px] leading-[1.5] text-neutral-700">Rookie catcher Danilo Reyes laid down the bunt of his young career. 'I didn't even see it land,' he said afterward.</p>
          </div>

          <div className="mt-5 pt-5 border-t border-neutral-300">
            <div className="text-[14px] uppercase tracking-[0.25em] text-red-800" style={{ fontFamily: "'Inter', system-ui" }}>Opinion</div>
            <h3 className="mt-1 text-xl font-black leading-tight">The case against another stadium on the waterfront</h3>
            <p className="mt-2 text-[14px] leading-[1.5] italic text-neutral-700">— Editorial Board</p>
          </div>
        </aside>
      </div>

      <div className="mt-8 border-y-4 border-double border-neutral-900 py-4" style={{ fontFamily: "'Inter', system-ui" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[14px] uppercase tracking-[0.35em] text-neutral-500">Weather</div>
            <div className="text-2xl font-black">Sun returns by afternoon · High 64°</div>
            <div className="text-[14px] text-neutral-600 mt-1">Sunrise 6:34 · Sunset 19:48 · Tide high 11:02</div>
          </div>
          <div className="flex gap-5">
            {weather.map((w) => (
              <div key={w.d} className="text-center min-w-[52px]">
                <div className="text-[14px] font-bold tracking-[0.15em]">{w.d}</div>
                <div className="text-2xl my-1">{w.s}</div>
                <div className="text-[14px] font-semibold tabular-nums">{w.hi}° <span className="text-neutral-400">{w.lo}°</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-[14px] uppercase tracking-[0.25em] text-neutral-500" style={{ fontFamily: "'Inter', system-ui" }}>
        <span>Printed 04:15 · City Edition · 64 Pages in Six Sections</span>
        <span>Tribune Plaza · 1 Compass Square · Meridian</span>
        <span>© 2026 The Meridian Tribune Co.</span>
      </div>
    </div>
  );
}
