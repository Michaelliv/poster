import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    blurb: "For solo tinkerers shipping side projects.",
    accent: "from-slate-300 to-slate-500",
    featured: false,
    features: [
      "1 workspace, up to 3 projects",
      "Community support on Discord",
      "5 GB shared asset storage",
      "Basic analytics (7-day retention)",
      "Single-user access",
    ],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: "$29",
    cadence: "per month",
    blurb: "For independent builders going full-time.",
    accent: "from-fuchsia-400 to-violet-500",
    featured: true,
    features: [
      "Unlimited projects & workspaces",
      "Priority email support (< 12h)",
      "100 GB storage with CDN delivery",
      "Advanced analytics (12-month retention)",
      "Custom domains & white-label exports",
    ],
    cta: "Upgrade to Pro",
  },
  {
    name: "Team",
    price: "$99",
    cadence: "per month",
    blurb: "For studios and product teams shipping together.",
    accent: "from-cyan-300 to-violet-400",
    featured: false,
    features: [
      "Everything in Pro, for up to 10 seats",
      "SSO (SAML / Google / Okta)",
      "1 TB pooled storage + audit log",
      "Role-based access & approval flows",
      "Dedicated onboarding + SLA",
    ],
    cta: "Start 14-day trial",
  },
];

export default function Poster() {
  return (
    <div
      className="w-[1600px] p-16 text-white"
      style={{
        fontFamily: "Inter, sans-serif",
        background:
          "radial-gradient(900px 560px at 88% 0%, rgba(139,92,246,0.22), transparent 60%), radial-gradient(760px 520px at 6% 100%, rgba(236,72,153,0.18), transparent 60%), #0a0a0f",
      }}
    >
      <div className="flex items-end justify-between mb-14">
        <div>
          <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-white/50 mb-4">
            Prism · Pricing · Spring 2026
          </div>
          <h1 className="text-[88px] leading-[0.95] font-semibold tracking-tight">
            Pick the plan that{" "}
            <span
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontStyle: "italic",
                backgroundImage:
                  "linear-gradient(180deg,#fef3c7,#f472b6,#a855f7)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              refracts
            </span>{" "}
            your workflow.
          </h1>
          <p className="mt-5 text-[18px] text-white/60 max-w-[720px]">
            Transparent tiers, no seat taxes, no "contact us" pricing. Cancel or
            switch plans any time — your data stays yours.
          </p>
        </div>
        <div className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-[14px] font-medium text-white/70 tabular-nums">
          Billed monthly · USD
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {tiers.map((t) => (
          <div
            key={t.name}
            className="rounded-3xl border p-8 flex flex-col"
            style={{
              borderColor: t.featured
                ? "rgba(168,85,247,0.45)"
                : "rgba(255,255,255,0.06)",
              background: t.featured
                ? "linear-gradient(180deg, rgba(168,85,247,0.14), rgba(236,72,153,0.06))"
                : "rgba(255,255,255,0.03)",
              boxShadow: t.featured
                ? "inset 0 1px 0 0 rgba(255,255,255,0.08), 0 30px 60px -28px rgba(168,85,247,0.45)"
                : "inset 0 1px 0 0 rgba(255,255,255,0.04), 0 20px 40px -24px rgba(0,0,0,0.6)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div
                className={`text-[14px] font-bold uppercase tracking-[0.3em] bg-gradient-to-r ${t.accent} bg-clip-text text-transparent`}
              >
                {t.name}
              </div>
              {t.featured && (
                <div className="rounded-full bg-white text-black px-3 py-1 text-[14px] font-semibold">
                  Most popular
                </div>
              )}
            </div>

            <div className="flex items-baseline gap-2 mb-2 tabular-nums">
              <div className="text-[72px] font-semibold leading-none tracking-tight">
                {t.price}
              </div>
              <div className="text-[16px] text-white/50">/ {t.cadence}</div>
            </div>
            <p className="text-[16px] text-white/60 mb-8">{t.blurb}</p>

            <ul className="space-y-4 mb-10">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px]">
                  <div
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: t.featured
                        ? "linear-gradient(135deg,#f472b6,#a855f7)"
                        : "rgba(255,255,255,0.08)",
                    }}
                  >
                    <Check
                      size={14}
                      strokeWidth={3}
                      color={t.featured ? "#0a0a0f" : "#ffffff"}
                    />
                  </div>
                  <span className="text-white/85 leading-snug">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <button
                className="w-full rounded-xl py-4 text-[15px] font-semibold"
                style={{
                  background: t.featured
                    ? "linear-gradient(135deg,#f472b6,#a855f7)"
                    : "rgba(255,255,255,0.06)",
                  color: t.featured ? "#0a0a0f" : "#ffffff",
                  border: t.featured
                    ? "none"
                    : "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {t.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-between text-[14px] text-white/40">
        <div>prism.app · Trusted by 14,200+ teams across 62 countries</div>
        <div className="tabular-nums">
          All plans include 99.95% uptime SLA · SOC 2 Type II · GDPR
        </div>
      </div>
    </div>
  );
}
