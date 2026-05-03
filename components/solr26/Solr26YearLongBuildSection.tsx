"use client";

import Solr26AmbientOrbsBackground from "@/components/solr26/Solr26AmbientOrbsBackground";

const TITLE = "This wasn't a Q4 surprise – It was a year-long build";
const SUBTITLE =
  "66% of credit union leaders want to grow faster than the system average. But the operating foundation hasn't kept pace – and that gap creates real delinquency risk.";

const CHART_ROWS = [
  { label: "Credit Cards", bps: 215 },
  { label: "Commercial", bps: 98 },
  { label: "Auto Loans", bps: 96 },
  { label: "Non-Comm RE", bps: 88 },
  { label: "Total Average", bps: 103 },
] as const;

const MAX_BPS = 215;

/** Delinquency chart card — Figma radial fill + deep inset vignette. */
const CATEGORY_CHART_CARD: React.CSSProperties = {
  background: "radial-gradient(50% 50% at 50% 50%, #204E91 0%, #1D519D 100%)",
  boxShadow: "inset 0 4px 166.9px rgba(0, 0, 0, 0.25)",
};

const RED_ACCENT = "#EF4444";
const RESPONSE_TITLE_BLUE = "#1D4E89";

export default function Solr26YearLongBuildSection() {
  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Solr26AmbientOrbsBackground />

        <div className="relative z-10">
          <header className="mb-12 text-center md:mb-14">
            <h2 className="text-3xl font-bold leading-tight text-[#1f4f95] md:text-[40px]">
              {TITLE}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#606060] md:mt-5 md:text-xl">
              {SUBTITLE}
            </p>
          </header>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
            <div
              className="rounded-2xl p-8 text-white md:p-10 lg:col-span-8"
              style={CATEGORY_CHART_CARD}
            >
              <h3 className="text-lg font-bold text-white md:text-xl">
                Delinquency by loan category – year-end 2025
              </h3>
              <p className="mt-2 max-w-xl text-sm text-white/75 md:text-base">
                Credit cards lead the risk exposure. Every segment is above
                comfort zone.
              </p>

              <div className="mt-8 space-y-4 md:mt-10 md:space-y-5">
                {CHART_ROWS.map((row) => {
                  const pct = (row.bps / MAX_BPS) * 100;
                  return (
                    <div
                      key={row.label}
                      className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"
                    >
                      <span className="w-full shrink-0 text-sm font-medium text-white sm:w-[118px]">
                        {row.label}
                      </span>
                      <div className="flex min-w-0 flex-1 items-center">
                        <div
                          className="flex h-7 min-w-0 items-center justify-end rounded-br-[4px] rounded-tr-[4px] pr-2 transition-[width] duration-300 sm:h-8 sm:pr-3"
                          style={{
                            width: `max(${pct}%, 3.5rem)`,
                            background:
                              "linear-gradient(90deg, rgba(147, 197, 253, 0.35) 0%, rgba(125, 211, 252, 0.55) 100%)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
                          }}
                        >
                          <span className="whitespace-nowrap text-xs font-semibold tabular-nums text-white sm:text-sm">
                            {row.bps} bps
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-4">
              <div className="flex flex-1 flex-col justify-center rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm md:p-6">
                <h4 className="text-base font-bold" style={{ color: RED_ACCENT }}>
                  The Headline Risk
                </h4>
                <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f172a] md:text-4xl">
                  $16 Billion
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#4B5563] md:text-[15px]">
                  In delinquent loans at year-end 2025. A pipeline filling as
                  manual underwriting scales with volume.
                </p>
              </div>

              <div className="flex flex-1 flex-col justify-center rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm md:p-6">
                <h4
                  className="text-base font-bold"
                  style={{ color: RESPONSE_TITLE_BLUE }}
                >
                  The Leader Response
                </h4>
                <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f172a] md:text-4xl">
                  63% Deploying
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#4B5563] md:text-[15px]">
                  Of CU leaders investing in AI credit decisioning - the #1 use
                  case, aligned precisely to this risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
