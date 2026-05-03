"use client";

const TITLE = "5 Paired Truths From the Data";
const SUBTITLE =
  "Where NCUA hard numbers and SOLR leader sentiment align — and what that means for 2026 strategy.";

/** Odd-index cards (1st, 3rd, …): soft blue-grey; even: slightly cooler strip for rhythm. */
const CARD_BG_ODD = "#F6FAFF";
const CARD_BG_EVEN = "transparent";

const TRUTHS = [
  {
    n: "01",
    tag: "Delinquency + AI",
    tagBg: "#2A5FAC",
    title: "The risk signal and the response are finally aligned",
    body: "Delinquency rose every quarter in 2025 (80→103 bps). At the same time 63% of leaders are investing, in credit decisioning AI. They're not coincidentally aligned - leaders see the same risk signal the NCUA data shows, and they're responding to it.",
  },
  {
    n: "02",
    tag: "Critical Gap",
    tagBg: "#ea580c",
    title: "Growth without automation compounds delinquency risk",
    body: "66% of leaders want 5%+ loan growth in 2026. System-wide loans grew 4.6% in Q4 - but 74% of leaders automate ≤50% of their workflow. Growth without automation compounds delinquency risk. The two need to scale together.",
  },
  {
    n: "03",
    tag: "Consolidation",
    tagBg: "#f97316",
    title: "The consolidation curve and the technology curve are the same curve",
    body: "124 institutions disappeared in 2025. Every CU tier below $500M is contracting on loans and members. And 57% of survey respondents describe their AI readiness as early-stage or not ready. The consolidation curve and the technology curve are the same curve.",
  },
  {
    n: "04",
    tag: "Agentic AI",
    tagBg: "#29AB98",
    title: "21% are building an advantage that takes years to replicate",
    body: "21% of leaders are already piloting agentic AI. 34% plan to within 12 months. The earliest movers are building institutional advantage in credit decisioning and workflow automation that will take years for others to replicate.",
  },
  {
    n: "05",
    tag: "Locked",
    tagBg: "#475569",
    title: "Only 12% of leaders have excellent AI-ready data",
    body: "But 96% have technology modernisation plans. The platforms that can deploy AI on imperfect data, demonstrate ROI early, and improve data quality over time will win this market - the others will extend the gap",
  },
] as const;

export default function Solr26PairedTruthsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#f4f6fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center max-w-7xl mx-auto mb-10 md:mb-14">
          <h2 className="text-3xl md:text-[40px] font-bold leading-tight text-[#1f4f95]">
            {TITLE}
          </h2>
          <p className="mt-4 text-base md:text-xl leading-relaxed text-[#606060]">
            {SUBTITLE}
          </p>
        </header>

        <div className="flex flex-col gap-4 md:gap-5">
          {TRUTHS.map((item, index) => (
            <article
              key={item.n}
              className={`relative rounded-2xl px-6 py-7 md:px-8 md:py-8  ${index % 2 === 0 ? "bg-[#F6FAFF] shadow-sm border border-slate-200/40" : "bg-transparent"}`}
              style={{
                backgroundColor: index % 2 === 0 ? CARD_BG_ODD : CARD_BG_EVEN,
              }}
            >
              <span
                className="absolute top-5 right-5 md:top-6 md:right-8 text-[3.25rem] sm:text-6xl md:text-6xl font-bold leading-none tabular-nums pointer-events-none select-none text-[#C7D7ED]"
                aria-hidden
              >
                {item.n}
              </span>

              <div className="relative z-[1] max-w-[calc(100%-4.5rem)] sm:max-w-[calc(100%-5.5rem)] md:max-w-[calc(100%-6.5rem)]">
                <span
                  className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white"
                  style={{ backgroundColor: item.tagBg }}
                >
                  {item.tag}
                </span>
                <h3 className="mt-4 text-lg md:text-xl font-bold leading-snug text-[#0f172a]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-[#5c6570]">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
