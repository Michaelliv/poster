import React from 'react';
import { Droplets } from 'lucide-react';

const panels = [
  {
    lang: 'English', code: 'EN', dir: 'ltr',
    headline: (<>Clean water is a <em style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', backgroundImage: 'linear-gradient(180deg,#bae6fd,#38bdf8,#0ea5e9)', WebkitBackgroundClip: 'text', color: 'transparent' }}>human right</em>.</>),
    stat: '2.2B', statLabel: 'people lack safely managed drinking water at home',
    body: 'One in four people on Earth cannot turn a tap and trust what comes out. The cost is counted in hours walked, school days lost, and children who do not reach five.',
    source: 'WHO / UNICEF JMP · 2024',
  },
  {
    lang: 'Français', code: 'FR', dir: 'ltr',
    headline: (<>L'eau potable est un <em style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', backgroundImage: 'linear-gradient(180deg,#bae6fd,#38bdf8,#0ea5e9)', WebkitBackgroundClip: 'text', color: 'transparent' }}>droit humain</em>.</>),
    stat: '3,5 Mds', statLabel: "de personnes sans services d'assainissement sûrs",
    body: "Près d'un habitant sur deux vit sans toilettes raccordées à un traitement fiable. Les maladies hydriques tuent encore plus d'un million de personnes chaque année.",
    source: 'OMS / UNICEF · 2024',
  },
  {
    lang: 'العربية', code: 'AR', dir: 'rtl',
    headline: (<>المياه النظيفة <em style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', backgroundImage: 'linear-gradient(180deg,#bae6fd,#38bdf8,#0ea5e9)', WebkitBackgroundClip: 'text', color: 'transparent' }}>حقٌّ إنساني</em>.</>),
    stat: '٧٠٣ مليون', statLabel: 'إنسان يفتقرون إلى مصدر أساسي لمياه الشرب',
    body: 'لا يزال مئات الملايين يقطعون مسافات طويلة يومياً للحصول على الماء، وغالباً من مصادر غير آمنة. تتحمّل النساء والفتيات العبء الأكبر من هذه الرحلة.',
    source: 'منظمة الصحة العالمية / اليونيسف · ٢٠٢٤',
  },
  {
    lang: '中文', code: 'ZH', dir: 'ltr',
    headline: (<>清洁饮水是一项<em style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', backgroundImage: 'linear-gradient(180deg,#bae6fd,#38bdf8,#0ea5e9)', WebkitBackgroundClip: 'text', color: 'transparent' }}>基本人权</em>。</>),
    stat: '4.2亿', statLabel: '儿童生活在高度或极度缺水的地区',
    body: '气候变化正在加剧水资源危机。到 2030 年,全球对淡水的需求将超过可持续供应量的 40%,首当其冲的是最脆弱的社区。',
    source: '联合国儿童基金会 · 2024',
  },
];

export default function Poster() {
  return (
    <div className="w-[1600px] p-14 text-white relative overflow-hidden"
      style={{ fontFamily: 'Inter, sans-serif',
        background: 'radial-gradient(1000px 600px at 10% 0%, rgba(14,165,233,0.22), transparent 60%), radial-gradient(900px 700px at 95% 100%, rgba(56,189,248,0.14), transparent 60%), #05080f' }}>
      <div className="flex items-end justify-between mb-10 pb-8 border-b border-white/10">
        <div>
          <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-sky-300/70 mb-3 flex items-center gap-3">
            <Droplets size={16} /> United Nations · SDG 6 · Global Advisory
          </div>
          <div className="text-[56px] font-bold leading-none tracking-tight">
            Water for <em style={{ fontFamily: "'Source Serif 4', serif", fontStyle: 'italic', backgroundImage: 'linear-gradient(180deg,#fef3c7,#38bdf8,#a855f7)', WebkitBackgroundClip: 'text', color: 'transparent' }}>everyone</em>, by 2030.
          </div>
        </div>
        <div className="text-right">
          <div className="text-[14px] uppercase tracking-[0.25em] text-white/50">Briefing</div>
          <div className="text-[22px] font-semibold tabular-nums">Vol. VI · № 22</div>
          <div className="text-[14px] text-white/50 mt-1">Geneva · 16 April 2026</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {panels.map((p) => (
          <div key={p.code} dir={p.dir}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 relative"
            style={{ boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.05), 0 24px 48px -28px rgba(0,0,0,0.7)', minHeight: 420 }}>
            <div className={`flex items-center justify-between mb-6 ${p.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-sky-300/70">{p.lang}</div>
              <div className="text-[14px] font-mono text-white/40 px-2 py-1 rounded border border-white/10">{p.code}</div>
            </div>
            <div className="text-[38px] font-bold leading-[1.15] tracking-tight mb-7"
              style={{ textAlign: p.dir === 'rtl' ? 'right' : 'left',
                fontFamily: p.code === 'AR' ? "'Noto Naskh Arabic', 'Amiri', serif" : p.code === 'ZH' ? "'Noto Sans SC', 'PingFang SC', sans-serif" : 'Inter, sans-serif' }}>
              {p.headline}
            </div>
            <div className="flex items-baseline gap-4 mb-5" style={{ flexDirection: p.dir === 'rtl' ? 'row-reverse' : 'row' }}>
              <div className="text-[64px] font-bold leading-none tabular-nums"
                style={{ backgroundImage: 'linear-gradient(180deg,#e0f2fe,#38bdf8)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                {p.stat}
              </div>
              <div className="text-[15px] text-white/70 leading-snug max-w-[260px]" style={{ textAlign: p.dir === 'rtl' ? 'right' : 'left' }}>
                {p.statLabel}
              </div>
            </div>
            <div className="text-[15px] text-white/60 leading-relaxed mb-6" style={{ textAlign: p.dir === 'rtl' ? 'right' : 'left' }}>
              {p.body}
            </div>
            <div className="text-[14px] uppercase tracking-[0.2em] text-white/35 pt-4 border-t border-white/10" style={{ textAlign: p.dir === 'rtl' ? 'right' : 'left' }}>
              {p.source}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-[14px] text-white/45">
        <div className="uppercase tracking-[0.25em]">Sustainable Development Goal 6 · Clean Water & Sanitation</div>
        <div className="font-mono tabular-nums">un.org/sdg6</div>
      </div>
    </div>
  );
}
