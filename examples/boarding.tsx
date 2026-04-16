import React from "react";
import { Plane } from "lucide-react";

export default function BoardingPass() {
  const mono = { fontFamily: "'JetBrains Mono', monospace" };
  const sans = { fontFamily: "Inter, sans-serif" };
  const band = "linear-gradient(90deg,#1e3a8a 0%,#2563eb 50%,#06b6d4 100%)";

  const Field = ({ label, value, big = false }: { label: string; value: string; big?: boolean }) => (
    <div>
      <div className="text-[14px] uppercase tracking-[0.2em] text-slate-500" style={sans}>{label}</div>
      <div className={`${big ? "text-[28px]" : "text-[20px]"} text-slate-900 mt-1`} style={mono}>{value}</div>
    </div>
  );

  return (
    <div className="w-[1400px] p-12 bg-slate-200" style={{ backgroundImage: "radial-gradient(circle at 20% 10%, #e2e8f0, #cbd5e1)" }}>
      <div className="flex rounded-2xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)] bg-white">
        <div className="flex-1">
          <div className="h-3" style={{ background: band }} />
          <div className="px-10 pt-8 pb-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: band }}>
                  <Plane size={20} />
                </div>
                <div>
                  <div className="text-[22px] font-bold tracking-tight text-slate-900" style={sans}>UNITED AIRLINES</div>
                  <div className="text-[14px] uppercase tracking-[0.3em] text-slate-500" style={sans}>Boarding Pass · Group B</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[14px] uppercase tracking-[0.2em] text-slate-500" style={sans}>Flight</div>
                <div className="text-[26px] text-slate-900" style={mono}>UA 837</div>
              </div>
            </div>

            <div className="mt-10 flex items-end justify-between">
              <div>
                <div className="text-[80px] leading-none text-slate-900" style={mono}>SFO</div>
                <div className="text-[15px] text-slate-500 mt-2" style={sans}>San Francisco Intl</div>
                <div className="text-[16px] text-slate-700 mt-1" style={mono}>23:55 · Tue 16 Apr</div>
              </div>
              <div className="flex-1 px-8 pb-6">
                <div className="relative flex items-center">
                  <div className="flex-1 border-t-2 border-dashed border-slate-300" />
                  <Plane size={22} className="mx-3 text-blue-600" />
                  <div className="flex-1 border-t-2 border-dashed border-slate-300" />
                </div>
                <div className="text-center text-[14px] text-slate-500 mt-2 uppercase tracking-[0.2em]" style={sans}>11h 40m · Nonstop</div>
              </div>
              <div className="text-right">
                <div className="text-[80px] leading-none text-slate-900" style={mono}>NRT</div>
                <div className="text-[15px] text-slate-500 mt-2" style={sans}>Tokyo Narita</div>
                <div className="text-[16px] text-slate-700 mt-1" style={mono}>05:35 · Thu 18 Apr</div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-5 gap-6 pt-6 border-t border-slate-200">
              <Field label="Passenger" value="AVA CHEN" />
              <Field label="Gate" value="F19" big />
              <Field label="Boarding" value="22:45" big />
              <Field label="Seat" value="14A" big />
              <Field label="Class" value="ECONOMY" />
            </div>

            <div className="mt-8 flex items-end justify-between">
              <div className="text-[14px] text-slate-400 uppercase tracking-[0.25em]" style={sans}>
                Please be at gate 20 minutes before boarding
              </div>
              <div className="text-[14px] text-slate-400" style={mono}>PNR · 7KX2QH</div>
            </div>
          </div>
        </div>

        <div className="relative w-0 border-l-2 border-dashed border-slate-300">
          <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-slate-200" />
          <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-slate-200" />
        </div>

        <div className="w-[360px] bg-slate-50 flex flex-col">
          <div className="h-3" style={{ background: band }} />
          <div className="px-8 pt-8 pb-8 flex-1 flex flex-col">
            <div className="text-[14px] uppercase tracking-[0.3em] text-slate-500" style={sans}>Boarding Pass</div>
            <div className="text-[22px] text-slate-900 mt-1" style={mono}>UA 837</div>

            <div className="mt-6 space-y-4">
              <Field label="Name" value="CHEN/AVA" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="From" value="SFO" />
                <Field label="To" value="NRT" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Field label="Gate" value="F19" />
                <Field label="Seat" value="14A" />
                <Field label="Grp" value="B" />
              </div>
              <Field label="Boarding" value="22:45" />
            </div>

            <div className="mt-auto pt-8">
              <div className="flex items-end gap-[2px] h-20">
                {Array.from({ length: 52 }).map((_, i) => {
                  const w = [1, 2, 1, 3, 1, 2, 2, 1, 3, 1, 2, 1][i % 12];
                  return <div key={i} style={{ width: `${w}px`, height: "100%", background: "#0f172a" }} />;
                })}
              </div>
              <div className="text-center text-[14px] text-slate-500 mt-2 tracking-[0.3em]" style={mono}>
                7KX2QH · UA837 · 14A
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
