export default function Menu() {
  const courses = [
    { n: "I", name: "Oyster, Cucumber, Elderflower", desc: "Galway rock oyster poached for a breath in its own liquor, set beneath a cold elderflower consommé and ribbons of shaved cucumber. A whisper of green almond oil.", wine: "Domaine Vacheron", wineSub: "Sancerre Blanc · 2022" },
    { n: "II", name: "Hand-dived Scallop, Brown Butter, Hazelnut", desc: "Scallop from the Mull of Kintyre, barely kissed by the pan, dressed with a beurre noisette of last autumn's hazelnuts and a discreet grating of cured yolk.", wine: "Meursault 'Les Tillets'", wineSub: "Roulot · 2019" },
    { n: "III", name: "Heritage Beetroot, Goat's Curd, Rye", desc: "Twelve varietals of beetroot — roasted in salt, pickled in rosehip, pressed into a tartare — with a ewe's milk curd from the Burren and toasted rye crumb.", wine: "Tissot 'Amphora'", wineSub: "Savagnin Ouillé · 2020" },
    { n: "IV", name: "Turbot, Seaweed Velouté, Oscietra", desc: "A thick cut of Dover turbot grilled over bog oak, bathed in a velouté of dulse and dillisk, finished with a quiet spoonful of Oscietra.", wine: "Chablis 1er Cru 'Montée de Tonnerre'", wineSub: "Raveneau · 2018" },
    { n: "V", name: "Squab, Black Garlic, Cherry", desc: "Breast of Anjou squab roasted on the crown, its leg confit and pressed into a small pithivier. Sauce of aged black garlic, sour cherry, and bone marrow.", wine: "Clos des Papes", wineSub: "Châteauneuf-du-Pape · 2016" },
    { n: "VI", name: "Coolea, Pear, Walnut", desc: "A slender wedge of eighteen-month Coolea with poached Doyenné pear, candied walnut, and a spoonful of honey from the kitchen garden's own hives.", wine: "Quinta do Noval", wineSub: "Colheita Tawny · 2003" },
    { n: "VII", name: "Buttermilk, Gorse, Sorrel", desc: "A cold buttermilk custard scented with gorse flower, under a granita of wood sorrel and a thin crisp of toasted oats. The meal's last small brightness.", wine: "Royal Tokaji", wineSub: "5 Puttonyos Aszú · 2017" },
  ];
  const serif = "'Source Serif 4', serif";
  const sans = "Inter, sans-serif";
  return (
    <div className="w-[1400px] px-24 py-24" style={{ background: "#f6f2ea", color: "#1a1612", fontFamily: serif }}>
      <div className="text-center">
        <div className="text-[14px] uppercase tracking-[0.5em] text-[#6b5d4a]" style={{ fontFamily: sans, fontWeight: 500 }}>
          Restaurant · Est. MMXIV · Dublin
        </div>
        <div className="mt-8 text-[140px] leading-none italic" style={{ fontWeight: 300, letterSpacing: "-0.02em" }}>Solas</div>
        <div className="mt-6 text-[16px] uppercase tracking-[0.4em] text-[#6b5d4a]" style={{ fontFamily: sans, fontWeight: 500 }}>
          Tasting Menu · Seven Courses
        </div>
        <div className="mt-10 flex items-center justify-center gap-6">
          <div className="h-px w-32 bg-[#1a1612]/30" />
          <div className="text-[18px] italic text-[#6b5d4a]">Spring, 2026</div>
          <div className="h-px w-32 bg-[#1a1612]/30" />
        </div>
      </div>

      <div className="mt-20 space-y-14">
        {courses.map((c, i) => (
          <div key={c.n}>
            <div className="grid grid-cols-[80px_1fr_280px] gap-10">
              <div className="text-[28px] italic text-[#8a6d3a] pt-1">{c.n}.</div>
              <div>
                <div className="text-[30px] leading-tight" style={{ letterSpacing: "-0.005em" }}>{c.name}</div>
                <div className="mt-4 text-[17px] leading-[1.7] text-[#3a332a] max-w-[640px]" style={{ fontWeight: 300 }}>{c.desc}</div>
              </div>
              <div className="border-l border-[#1a1612]/15 pl-6 pt-2">
                <div className="text-[14px] uppercase tracking-[0.35em] text-[#8a6d3a]" style={{ fontFamily: sans, fontWeight: 600 }}>Pairing</div>
                <div className="mt-3 text-[18px] italic leading-snug">{c.wine}</div>
                <div className="mt-1 text-[14px] text-[#6b5d4a]" style={{ fontFamily: sans }}>{c.wineSub}</div>
              </div>
            </div>
            {i < courses.length - 1 && (
              <div className="mt-14 flex justify-center"><div className="text-[20px] text-[#8a6d3a]">✦</div></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-24 pt-10 border-t border-[#1a1612]/25">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[14px] uppercase tracking-[0.4em] text-[#6b5d4a]" style={{ fontFamily: sans, fontWeight: 500 }}>Prix Fixe</div>
            <div className="mt-3 text-[64px] leading-none italic" style={{ fontWeight: 300 }}>€185</div>
            <div className="mt-3 text-[14px] text-[#6b5d4a]" style={{ fontFamily: sans }}>Wine pairing, seven glasses · €125 supplement</div>
          </div>
          <div className="text-right">
            <div className="text-[14px] uppercase tracking-[0.4em] text-[#6b5d4a]" style={{ fontFamily: sans, fontWeight: 500 }}>Chef</div>
            <div className="mt-3 text-[22px] italic">Síle Ní Bhraonáin</div>
            <div className="mt-2 text-[14px] text-[#6b5d4a]" style={{ fontFamily: sans }}>17 Merrion Row, Dublin 2</div>
          </div>
        </div>
        <div className="mt-12 text-center text-[14px] uppercase tracking-[0.5em] text-[#8a6d3a]" style={{ fontFamily: sans, fontWeight: 500 }}>
          An optional service charge of 12.5% is added for parties of six or more
        </div>
      </div>
    </div>
  );
}
