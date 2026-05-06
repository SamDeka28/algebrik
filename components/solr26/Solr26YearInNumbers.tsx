"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Solr26Reveal from "@/components/solr26/Solr26Reveal";

const TITLE = "The year in numbers – 4 quarters, 1 story";
const SUBTITLE =
  "Stronger Balance Sheets Rising Risk. 2025 was the year credit unions turned a financial corner – and immediately hit a new one. Every metric told two stories at once.";

/** Card art lives under `public/assets/` (served as `/assets/...`). */
const STAT_CARDS = [
  {
    value: "$18.8B",
    label: "Full-Year Net Income 2025",
    image: "/assets/fyni.jpg",
    growthAccent: false,
    hoverDetail:
      "+31.5% vs 2024 — sharpest recovery since pre-COVID, on stronger fee income and balance-sheet discipline.",
  },
  {
    value: "4.6%",
    label: "System Loan Growth Q4 YoY",
    image: "/assets/slg.png",
    growthAccent: true,
    hoverDetail:
      "Acceleration from Q1 through year-end; lending demand held even as risk metrics climbed.",
  },
  {
    value: "103 bps",
    label: "Q4 Delinquency Rate",
    image: "/assets/dr.png",
    growthAccent: false,
    hoverDetail:
      "Up from 80 bps in Q1 — an unbroken quarterly climb, not a single-quarter spike.",
  },
  {
    value: "124",
    label: "CUs Remaining",
    image: "/assets/cr.png",
    growthAccent: false,
    hoverDetail:
      "Institutions merged or closed in 2025; consolidation and tech pressure continued across tiers.",
  },
] as const;

const DELINQUENCY_BARS = [
  {
    q: "Q1",
    bps: 80,
    tooltipTagline: "Opening position before the year-long climb.",
  },
  {
    q: "Q2",
    bps: 91,
    tooltipTagline: "Stress building through mid-year.",
  },
  {
    q: "Q3",
    bps: 94,
    tooltipTagline: "Slope steepening into year-end.",
  },
  {
    q: "Q4",
    bps: 103,
    tooltipTagline: "Systematic stress threshold",
  },
] as const;

const MAX_BPS = 103;
const CHART_INNER_PX = 260;

/** Delinquency bars: idle = Figma 3-stop; hover = brighter 4-stop (linear, 180deg). */
const BAR_FILL_IDLE =
  "linear-gradient(180deg, #4D8FE0 0%, #2A5FAC 50%, #1E3F7A 100%)";
const BAR_FILL_HOVER =
  "linear-gradient(180deg, #7ab3ff 0%, #4d8adf 32%, #2A5FAC 68%, #153a6b 100%)";

const BAR_INSET_HIGHLIGHT = "inset 0 2px 0 rgba(255,255,255,0.22)";
const BAR_DROP_SHADOW = "0 6px 16px rgba(0,0,0,0.28)";

/** Primary brand blue — photo tint (see stat card overlay). */
const BRAND_BLUE = "#2A5FAC";

function GrowthChartAccent({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute right-2 top-2 z-[3] transition-opacity duration-300 ease-out sm:right-3 sm:top-3 group-hover:opacity-0 ${className}`}
      aria-hidden
    >
      <svg width="64" height="48" viewBox="0 0 64 48" className="drop-shadow-md">
        <defs>
          <linearGradient id="solr26-yin-mini-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8ec5ff" />
            <stop offset="100%" stopColor="#2A5FAC" />
          </linearGradient>
        </defs>
        <rect x="6" y="26" width="9" height="16" rx="2.5" fill="url(#solr26-yin-mini-bar)" />
        <rect x="20" y="18" width="9" height="24" rx="2.5" fill="url(#solr26-yin-mini-bar)" />
        <rect x="34" y="10" width="9" height="32" rx="2.5" fill="url(#solr26-yin-mini-bar)" />
        <path
          d="M44 6 L58 2 L56 14 Z"
          fill="#ffffff"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="0.75"
        />
      </svg>
    </div>
  );
}

function StatCard({
  value,
  label,
  image,
  growthAccent,
  hoverDetail,
}: {
  value: string;
  label: string;
  image: string;
  growthAccent: boolean;
  hoverDetail: string;
}) {
  return (
    <div className="group relative isolate min-h-[210px] sm:min-h-[240px] lg:min-h-0 lg:h-full overflow-hidden rounded-[20px] shadow-[0_4px_24px_rgba(15,23,42,0.12)] ring-1 ring-black/15">
      {/* Photo + tint — single layer that fades out on hover */}
      <div className="absolute inset-0 overflow-hidden rounded-[inherit] transition-opacity duration-300 ease-out group-hover:opacity-0">
        {/* eslint-disable-next-line @next/next/no-img-element -- static files from /public */}
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.44]"
          style={{ backgroundColor: BRAND_BLUE }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/28 to-black/72" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Light surface — fades in under the same content */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[#E8ECF5] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
        aria-hidden
      />

      {growthAccent ? <GrowthChartAccent /> : null}

      {/* One content stack: shift + color + detail transitions (no duplicate markup) */}
      <div className="absolute inset-0 z-[4] flex flex-col items-center justify-center px-4 py-6 text-center transition-transform duration-300 ease-out motion-reduce:translate-y-0 motion-safe:translate-y-1 motion-safe:group-hover:translate-y-0 sm:px-5 sm:py-8">
        <p className="text-[1.75rem] font-extrabold leading-none tracking-tight text-white tabular-nums transition-colors duration-300 ease-out group-hover:text-[#2A5FAC] sm:text-4xl lg:text-[2.5rem]">
          {value}
        </p>
        <p className="mt-2 max-w-[16rem] text-[13px] font-bold leading-snug text-white/95 transition-colors duration-300 ease-out group-hover:text-[#0f172a] sm:text-[16px]">
          {label}
        </p>
        <p className="mt-0 max-w-[17rem] overflow-hidden text-xs font-normal leading-relaxed text-[#5c6570] opacity-0 transition-all duration-300 ease-out max-h-0 group-hover:mt-3 group-hover:max-h-[10rem] group-hover:opacity-100 sm:text-[13px]">
          {hoverDetail}
        </p>
      </div>
    </div>
  );
}

export default function Solr26YearInNumbers() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.35 });
  const [animateCharts, setAnimateCharts] = useState(false);

  useEffect(() => {
    if (!inView) {
      setAnimateCharts(false);
      return;
    }
    const t = window.setTimeout(() => setAnimateCharts(true), 150);
    return () => window.clearTimeout(t);
  }, [inView]);

  return (
    <section
      id="year-in-numbers"
      className="relative z-0 border-y border-slate-100 bg-white py-16 font-plus-jakarta md:py-24"
      ref={sectionRef}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Solr26Reveal>
          <header className="text-center max-w-4xl mx-auto mb-12 md:mb-14">
            <h2 className="text-3xl md:text-[40px] font-bold text-[#1f4f95] leading-tight">
              {TITLE}
            </h2>
            <p className="mt-4 md:mt-5 text-base md:text-xl text-[#606060] leading-relaxed">
              {SUBTITLE}
            </p>
          </header>

          <div
            className="
            grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6 lg:min-h-[520px] lg:items-stretch
          "
          >
            <div className="grid min-h-0 grid-cols-2 gap-4 sm:gap-5 lg:auto-rows-fr">
              {STAT_CARDS.map((card) => (
                <StatCard key={card.label} {...card} />
              ))}
            </div>

            <div
              className="
              relative flex min-h-[400px] min-w-0 flex-col rounded-[20px]
              p-6 text-white sm:min-h-[420px] md:p-8 lg:min-h-0 lg:p-9
            "
              style={{
                backgroundColor: "#050a14",
                backgroundImage: `
                radial-gradient(ellipse 110% 70% at 50% 0%, rgba(55, 120, 200, 0.45) 0%, transparent 58%),
                linear-gradient(175deg, #122a45 0%, #0a1628 42%, #020408 100%)
              `,
                boxShadow: `
                0 0 0 1px rgba(125, 211, 252, 0.28),
                0 0 36px rgba(56, 130, 246, 0.14),
                0 12px 40px rgba(0, 0, 0, 0.35),
                inset 0 1px 0 rgba(255, 255, 255, 0.07)
              `,
              }}
            >
              <div className="relative z-[1] mb-6 md:mb-8 shrink-0 text-left">
                <h3 className="text-lg md:text-xl font-bold text-white leading-snug tracking-tight">
                  Delinquency kept rising – all year long
                </h3>
                <p className="mt-2.5 text-sm md:text-[15px] text-slate-300 leading-relaxed max-w-xl">
                  Not a Q4 event. An unbroken upward arc across every quarter of
                  2025.
                </p>
              </div>

              <div className="relative z-[1] flex min-h-[220px] flex-1 flex-col justify-end overflow-visible pb-1 pt-2">
                <div
                  className="flex items-end justify-between gap-2 sm:gap-4 md:gap-5 px-0 sm:px-1"
                  style={{ height: CHART_INNER_PX + 48 }}
                >
                  {DELINQUENCY_BARS.map((row) => {
                    const barH = Math.round((row.bps / MAX_BPS) * CHART_INNER_PX);
                    return (
                      <div
                        key={row.q}
                        className="group/bar flex h-full min-h-0 flex-1 flex-col items-center justify-end min-w-0"
                      >
                        <div
                          className="mx-auto flex w-full max-w-[min(100%,5.5rem)] flex-1 flex-col justify-end sm:max-w-[6.5rem] lg:max-w-[min(100%,8.5rem)]"
                          style={{ maxHeight: CHART_INNER_PX + 24 }}
                        >
                          <motion.div
                            className="relative w-full shrink-0 transition-[box-shadow,transform] duration-300 ease-out motion-safe:group-hover/bar:-translate-y-0.5"
                            style={{ minHeight: 52, boxShadow: BAR_DROP_SHADOW }}
                            initial={false}
                            animate={{
                              height: animateCharts ? Math.max(barH, 52) : 52,
                            }}
                            transition={{
                              duration: 0.8,
                              ease: "easeOut",
                              delay: 0.08,
                            }}
                          >
                            {/* Bar face only — overflow hidden so rounded tops clip; tooltip is a sibling below */}
                            <div className="absolute inset-0 flex flex-col items-center justify-end overflow-hidden rounded-t-[16px] pb-2.5 sm:pb-3">
                              <div
                                className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out group-hover/bar:opacity-0"
                                style={{
                                  background: BAR_FILL_IDLE,
                                  boxShadow: BAR_INSET_HIGHLIGHT,
                                }}
                                aria-hidden
                              />
                              <div
                                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover/bar:opacity-100"
                                style={{
                                  background: BAR_FILL_HOVER,
                                  boxShadow: BAR_INSET_HIGHLIGHT,
                                }}
                                aria-hidden
                              />
                              <span className="pointer-events-none relative z-10 px-1 text-center text-[11px] font-bold leading-tight text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] sm:text-sm">
                                {row.bps} bps
                              </span>
                            </div>
                            {/* Sibling of overflow-hidden face — not clipped */}
                            <div
                              className="pointer-events-none w-max absolute bottom-full left-1/2 z-[60] mb-6 -translate-x-1/2 rounded-lg bg-white px-3 py-2.5 text-center opacity-0 shadow-[0_8px_30px_rgba(0,0,0,0.2)] ring-1 ring-black/5 transition-opacity duration-200 ease-out group-hover/bar:opacity-100 sm:px-4"
                              role="tooltip"
                            >
                              <p className="text-[11px] font-medium leading-tight text-[#5c6570] sm:text-xs">
                                {row.q} 2025
                              </p>
                              <p className="mt-1.5 text-lg font-bold leading-none text-black tabular-nums sm:text-xl">
                                {row.bps} bps
                              </p>
                              <p className="mt-1.5 text-[11px] font-medium leading-snug text-[#5c6570] sm:text-xs w-max">
                                {row.tooltipTagline}
                              </p>
                              <div
                                className="absolute left-1/2 top-full -mt-px h-0 w-0 -translate-x-1/2 border-x-[7px] border-x-transparent border-t-[8px] border-t-white"
                                aria-hidden
                              />
                            </div>
                          </motion.div>
                        </div>
                        <span className="mt-3 text-xs sm:text-sm font-semibold text-white">
                          {row.q}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Solr26Reveal>
      </div>
    </section>
  );
}
