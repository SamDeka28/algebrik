"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Solr26AmbientOrbsBackground from "./Solr26AmbientOrbsBackground";

const TITLE = "51% Expect decisions in under 4 hours";
const SUB_A =
  "The average loan balance hit $19,397 – up $984 YoY. Members now compare CUs to fintechs, not to each other.";
const SUB_B = "The speed benchmark has already shifted.";

const HEADING_BLUE = "#1D4E89";
const MUTED = "#64748b";

/**
 * Donut segments clockwise from 12 o'clock. Brand palette (exact hex):
 * #2A5FAC, #29AB98, #A6BEE1, #C7D7ED, #E8ECF5
 */
const DONUT = [
  {
    name: "Under 4 hours",
    value: 28,
    legend: "Under 4 hours (28%)",
    color: "#2A5FAC",
    tooltipLine1: "Under",
    tooltipLine2: "4 hours: 28%",
  },
  {
    name: "Instant / <30 min",
    value: 22,
    legend: "Instant / <30 min (22%)",
    color: "#29AB98",
    tooltipLine1: "Instant /",
    tooltipLine2: "<30 min: 22%",
  },
  {
    name: "4-24hrs",
    value: 13,
    legend: "4-24hrs (13%)",
    color: "#A6BEE1",
    tooltipLine1: "4-24hrs",
    tooltipLine2: "13%",
  },
  {
    name: "1-3 business days",
    value: 25,
    legend: "1-3 business days (25%)",
    color: "#C7D7ED",
    tooltipLine1: "1-3 business",
    tooltipLine2: "days: 25%",
  },
  {
    name: "4+ business days",
    value: 12,
    legend: "4+ business days (12%)",
    color: "#E8ECF5",
    tooltipLine1: "4+ business",
    tooltipLine2: "days: 12%",
  },
] as const;

const pieSlices = DONUT.map((d) => ({
  name: d.name,
  value: d.value,
  fill: d.color,
}));

/** Same palette as donut; light fills get a hairline so the bar reads on white. */
const BARS = [
  {
    label: "Under 4 hours (most common)",
    pct: 28,
    color: "#2A5FAC",
    barOutline: false,
  },
  {
    label: "Instant or under 30 minutes",
    pct: 22,
    color: "#29AB98",
    barOutline: false,
  },
  {
    label: "1–3 business days",
    pct: 25,
    color: "#F04438",
    barOutline: true,
  },
  {
    label: "4+ business days",
    pct: 12,
    color: "#F79009",
    barOutline: true,
  },
  {
    label: "4–24 hours",
    pct: 13,
    color: "#2A5FAC",
    barOutline: false,
  },
] as const;

type DonutTooltipProps = {
  active?: boolean;
  payload?: ReadonlyArray<{
    name?: string;
    value?: number;
    payload?: { name: string; value: number; fill: string };
  }>;
};

const TOOLTIP_BG = "#1a1a1a";

function DonutTooltip({ active, payload }: DonutTooltipProps) {
  if (!active || !payload?.length) return null;
  const name = payload[0].name ?? payload[0].payload?.name;
  if (!name) return null;
  const row = DONUT.find((d) => d.name === name);
  if (!row) return null;

  return (
    <div className="flex items-center drop-shadow-lg">
      <div
        className="flex items-center gap-2.5 rounded-lg px-3.5 py-2.5"
        style={{ backgroundColor: TOOLTIP_BG }}
      >
        <span
          className="h-3 w-3 shrink-0 rounded-[2px]"
          style={{ backgroundColor: row.color }}
          aria-hidden
        />
        <div className="text-[13px] font-medium leading-snug text-white">
          <div>{row.tooltipLine1}</div>
          <div>{row.tooltipLine2}</div>
        </div>
      </div>
      <div
        className="h-0 w-0 shrink-0 border-y-[7px] border-y-transparent border-l-[8px]"
        style={{ borderLeftColor: TOOLTIP_BG }}
        aria-hidden
      />
    </div>
  );
}

export default function Solr26SpeedExpectationsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <h2
            className="text-3xl md:text-[40px] font-bold text-[#1f4f95] leading-tight"
            style={{ color: HEADING_BLUE }}
          >
            {TITLE}
          </h2>
          <p className="mt-4 text-base md:text-xl leading-relaxed text-[#606060]">
            {SUB_A}
          </p>
          <p className="mt-2 text-base md:text-xl leading-relaxed text-[#606060]" style={{ color: MUTED }}>
            {SUB_B}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 justify-center">
          <Solr26AmbientOrbsBackground />
          <div className="rounded-[20px] bg-white p-6 md:p-8 shadow-md border border-slate-100/80">
            <h3
              className="text-lg font-bold"
              style={{ color: HEADING_BLUE }}
            >
              Member approval speed expectations
            </h3>
            <p className="mt-1 text-sm md:text-[15px] leading-relaxed" style={{ color: MUTED }}>
              More than half expect a decision before business close the same day.
            </p>

            <div className="h-[240px] w-full max-w-[340px] mx-auto mt-4 [&_.recharts-surface]:drop-shadow-[0_2px_8px_rgba(15,23,42,0.08)]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                  <Pie
                    data={pieSlices}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="52%"
                    outerRadius="78%"
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={0}
                    cornerRadius={0}
                    stroke="none"
                    isAnimationActive={true}
                  >
                    {pieSlices.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip
                    content={DonutTooltip}
                    cursor={{ stroke: "transparent", fill: "transparent" }}
                    wrapperStyle={{ outline: "none", zIndex: 20 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {DONUT.map((d) => (
                <div key={d.name} className="flex items-center gap-2 min-w-0">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0 ring-1 ring-slate-300/80"
                    style={{
                      backgroundColor: d.color,
                      boxShadow:
                        d.color === "#E8ECF5"
                          ? "inset 0 0 0 1px rgba(42, 95, 172, 0.12)"
                          : undefined,
                    }}
                    aria-hidden
                  />
                  <span className="text-slate-700 truncate">{d.legend}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[20px] bg-white p-6 md:p-8 shadow-md border border-slate-100/80">
            <h3
              className="text-lg font-bold"
              style={{ color: HEADING_BLUE }}
            >
              Approval speed breakdown – all segments
            </h3>
            <p className="mt-1 text-sm md:text-[15px] leading-relaxed" style={{ color: MUTED }}>
              Mapped across all leader responses. Sub-4hr expectations dominate.
            </p>

            <div className="mt-8 space-y-5">
              {BARS.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col sm:flex-col sm:items-center gap-2 sm:gap-3"
                >
                  <div className="flex flex-row items-center justify-between gap-2 w-full">
                    <span className="text-sm w-max text-slate-800 font-medium leading-snug">
                      {row.label}
                    </span>
                    <span className="text-sm text-slate-900 font-bold tabular-nums w-10 text-right shrink-0">
                      {row.pct}%
                    </span>
                  </div>
                  <div className="flex flex-1 items-center gap-3 min-w-0 w-full">
                    <div className="h-2 flex-1 rounded-full bg-slate-200/90 overflow-hidden min-w-[80px]">
                      <div
                        className="h-full rounded-full transition-[width] duration-500 ease-out"
                        style={{
                          width: `${row.pct}%`,
                          backgroundColor: row.color,
                          boxShadow: row.barOutline
                            ? "inset 0 0 0 1px rgba(42, 95, 172, 0.18)"
                            : undefined,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
