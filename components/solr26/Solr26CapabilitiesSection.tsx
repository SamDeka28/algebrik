"use client";

const INTRO_TITLE = "Built for the Exact Inflection point the data reveals";
const INTRO_SUB =
  "Three capabilities — engineered for the Growth Trap, the Delinquency Build, and the Speed Deficit that 2025 exposed.";

const BADGE_BG = "#2A5FAC";
const BADGE_DOT = "#C7D7ED";
const BADGE_TEXT = "#E8ECF5";
const BODY_MUTED = "rgba(232, 236, 245, 0.82)";
const DIVIDER = "#A6BEE1";

const ROWS = [
  {
    tag: "Credit Decisioning",
    title: "From 72 hours to sub-4-hour loan decisions",
    body: "51% of leaders already expect sub-4-hour approvals on non-mortgage loans. 23% want real-time decisions. Algebrik's Agentic AI handles multi-step verification, risk pricing, and compliance checks in parallel — not sequence.",
    stats: [
      { value: "51%", label: "expect sub-4hr approvals" },
      { value: "<4hr", label: "Algebrik median first decision" },
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    callout: { value: "<4hr", label: "Median first decision time" },
    imageLeft: false,
  },
  {
    tag: "Risk Intelligence",
    title: "Stop the 103 bps trajectory before it compounds",
    body: "Delinquency didn't spike in Q4 — it built all year. Algebrik's real-time risk models flag 30-day early-stage delinquencies before they become charge-offs, recalibrate approval criteria for high-drift segments, and stress-test portfolios as they season.",
    stats: [
      { value: "$16B", label: "delinquent loans at Q4 year-end" },
      { value: "63%", label: "leaders investing in credit AI now" },
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    callout: { value: "23 bps", label: "Delinquency climb across 2025" },
    imageLeft: true,
  },
  {
    tag: "Workflow Automation",
    title: "Close the 74% manual workflow gap",
    body: "74% of credit unions automate 50% or less of their lending workflow. That's not an efficiency problem — it's a growth ceiling. Algebrik's AI-native platform automates the full origination loop: application intake, document processing, identity verification, underwriting, and member communications.",
    stats: [] as { value: string; label: string }[],
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    callout: { value: "10×", label: "Growth potential unlocked" },
    imageLeft: false,
  },
] as const;

function FeatureBadge({ label }: { label: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold"
      style={{ backgroundColor: "#2A5FAC2E", color: "#7AABE8" }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full shrink-0"
        style={{ backgroundColor: "#4AAB85" }}
        aria-hidden
      />
      {label}
    </div>
  );
}

function StatPair({
  stats,
}: {
  stats: readonly { value: string; label: string }[];
}) {
  if (!stats.length) return null;
  return (
    <div
      className={`mt-8 grid gap-6 sm:grid-cols-2 ${
        stats.length === 1 ? "sm:grid-cols-1 max-w-xs" : ""
      }`}
    >
      {stats.map((s) => (
        <div key={s.label} className="flex gap-3">
          <div
            className="w-0.5 shrink-0 rounded-full self-stretch min-h-[3.5rem]"
            style={{ backgroundColor: DIVIDER }}
            aria-hidden
          />
          <div>
            <p className="text-2xl md:text-[1.65rem] font-bold text-white tracking-tight">
              {s.value}
            </p>
            <p className="mt-1 text-sm md:text-[15px] leading-snug" style={{ color: BODY_MUTED }}>
              {s.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FeatureVisual({
  image,
  callout,
}: {
  image: string;
  callout: { value: string; label: string };
}) {
  return (
    <div className="relative w-full aspect-[580/300] min-h-[220px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
      {/* eslint-disable-next-line @next/next/no-img-element -- remote photography */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute bottom-5 left-5 right-5 sm:left-6 sm:right-auto sm:max-w-[280px] rounded-xl bg-white px-4 py-3 shadow-lg">
        <p className="text-xl md:text-2xl font-extrabold text-[#0f172a] leading-none">
          {callout.value}
        </p>
        <p className="mt-1.5 text-xs md:text-sm font-medium text-slate-600 leading-snug">
          {callout.label}
        </p>
      </div>
    </div>
  );
}

export default function Solr26CapabilitiesSection() {
  return (
    <section
      className="py-20 md:py-28 text-white"
      style={{
        background: "linear-gradient(180deg, #050a14 0%, #020617 45%, #020617 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-[2.1rem] font-bold text-white leading-tight tracking-tight">
            {INTRO_TITLE}
          </h2>
          <p
            className="mt-4 md:mt-5 text-base md:text-lg leading-relaxed"
            style={{ color: BODY_MUTED }}
          >
            {INTRO_SUB}
          </p>
        </header>

        <div className="flex flex-col gap-20 md:gap-28 lg:gap-32">
          {ROWS.map((row) => (
            <div
              key={row.tag}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center"
            >
              <div className={row.imageLeft ? "lg:order-2" : ""}>
                <FeatureBadge label={row.tag} />
                <h3 className="mt-5 text-2xl md:text-[1.85rem] lg:text-[2rem] font-bold text-white leading-tight">
                  {row.title}
                </h3>
                <p
                  className="mt-4 text-base md:text-lg leading-relaxed"
                  style={{ color: BODY_MUTED }}
                >
                  {row.body}
                </p>
                <StatPair stats={row.stats} />
              </div>
              <div className={row.imageLeft ? "lg:order-1" : ""}>
                <FeatureVisual image={row.image} callout={row.callout} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
