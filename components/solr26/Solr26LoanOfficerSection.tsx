"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Solr26Reveal from "@/components/solr26/Solr26Reveal";

const TITLE = "The loan officer is Evolving not disappearing";
const SUBTITLE =
  "73% of leaders see loan officers in advisory and exception roles. 78% cite member experience as the top modernization driver. Zero mentioned compliance - it's table stakes now.";

const HEADING = "#2A5FAC";
const MUTED = "#64748b";
const TRACK = "#E8ECF5";
const CARD_BORDER = "rgba(199, 215, 237, 0.85)";
const MAX_PRIORITY = 48;

/** Monochrome blue ladder + cylindrical highlight (vertical gradient overlay). */
const PRIORITIES = [
  { label: "Member experience", pct: 48, base: "#2A5FAC" },
  { label: "Growing loan volumes", pct: 40, base: "#3267B4" },
  { label: "Automation / STP", pct: 38, base: "#4277C4" },
  { label: "Reducing costs", pct: 20, base: "#4983D9" },
  { label: "Fraud prevention", pct: 18, base: "#6293DC" },
] as const;

type PriorityBase = (typeof PRIORITIES)[number]["base"];

/** Lighter ladder stops — white label needs a slightly stronger halo. */
function priorityLabelTextShadow(base: PriorityBase): string {
  return base === "#4983D9" || base === "#6293DC"
    ? "0 0 3px rgba(15,23,42,0.45), 0 1px 2px rgba(15,23,42,0.35)"
    : "0 1px 2px rgba(0,0,0,0.25)";
}

const AI_READINESS = [
  {
    label: "Have tech modernization plans (24 mo.)",
    pct: 96,
    fill: "#2A5FAC",
  },
  {
    label: "Prefer AI-native platform architecture",
    pct: 42,
    fill: "#29AB98",
  },
  {
    label: "Early-stage or not AI-ready",
    pct: 57,
    fill: "#ea580c",
  },
  {
    label: "Member experience as #1 driver",
    pct: 78,
    fill: "#f97316",
  },
] as const;

function barCylinderStyle(base: string): CSSProperties {
  return {
    background: `${base}`,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
  };
}

export default function Solr26LoanOfficerSection() {
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
      className="py-16 md:py-24"
      style={{ background: "linear-gradient(180deg, #eef3f9 0%, #e8eef6 100%)" }}
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Solr26Reveal>
          <header className="text-center max-w-7xl mx-auto mb-12 md:mb-14">
            <h2 className="text-3xl md:text-[40px] font-bold text-[#1f4f95] leading-tight">
              {TITLE}
            </h2>
            <p className="mt-4 md:mt-5 text-base md:text-xl leading-relaxed text-[#606060]">
              {SUBTITLE}
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div
              className="rounded-2xl bg-white p-6 md:p-8 shadow-sm"
              style={{ border: `1px solid ${CARD_BORDER}` }}
            >
              <h3 className="text-lg md:text-xl font-bold" style={{ color: "#1E4A8A" }}>
                2026 strategic priorities — CU leaders
              </h3>
              <p className="mt-2 text-sm md:text-[15px] leading-tight text-[#5c6570]">
                Member experience and loan growth dominate. Compliance not mentioned once.
              </p>

              <div className="mt-8 space-y-4">
                {PRIORITIES.map((row) => {
                  const w = (row.pct / MAX_PRIORITY) * 100;
                  return (
                    <div
                      key={row.label}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
                    >
                      <span className="text-xs sm:text-sm text-slate-800 font-medium leading-snug sm:w-[158px] sm:shrink-0">
                        {row.label}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="h-8 sm:h-9 rounded-[5px] bg-slate-100/90 overflow-hidden">
                          <div
                            className="h-full rounded-[5px] flex items-center pl-2.5 sm:pl-3 min-w-[2.75rem] transition-[width] duration-500 ease-out"
                            style={{
                              width: animateCharts ? `${w}%` : "2.75rem",
                              ...barCylinderStyle(row.base),
                            }}
                          >
                            <span
                              className="text-[11px] sm:text-xs font-bold text-white tabular-nums"
                              style={{
                                textShadow: priorityLabelTextShadow(row.base),
                              }}
                            >
                              {row.pct}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="rounded-2xl bg-white p-6 md:p-8 shadow-sm"
              style={{ border: `1px solid ${CARD_BORDER}` }}
            >
              <h3 className="text-lg md:text-xl font-bold" style={{ color: "#1E4A8A" }}>
                Agentic AI deployment readiness
              </h3>
              <p className="mt-2 text-sm md:text-[15px] leading-tight text-[#5c6570]">
                55% are moving toward Agentic AI within 12 months. Early movers already
                compounding advantage.
              </p>

              <div className="mt-8 space-y-6">
                {AI_READINESS.map((row) => (
                  <div key={row.label}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-xs sm:text-sm text-slate-800 font-medium leading-snug">
                        {row.label}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 tabular-nums shrink-0">
                        {row.pct}%
                      </span>
                    </div>
                    <div
                      className="h-2.5 w-full rounded-full overflow-hidden"
                      style={{ backgroundColor: TRACK }}
                    >
                      <div
                        className="h-full rounded-full transition-[width] duration-700 ease-out"
                        style={{
                          width: animateCharts ? `${row.pct}%` : "0%",
                          backgroundColor: row.fill,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Solr26Reveal>
      </div>
    </section>
  );
}
