"use client";

import Link from "next/link";
import Marquee from "react-fast-marquee";
import Solr26Navbar from "@/components/solr26/Solr26Navbar";
import styles from "./solr26-hero.module.css";

const ACCENT = "#2A5FAC";

const TICKER_ITEMS = [
  <><strong>74%</strong> Still Manual</>,
  <><strong>66%</strong> Leaders Targeting 5%+ Growth</>,
  <><strong>124</strong> CUs Lost</>,
  <><strong>$16B</strong> In Delinquent Loans</>,
  <><strong>103</strong> BPS Year-End Delinquency</>,
];

export default function Solr26Hero() {
  return (
    <section
      className={`relative z-[100] isolate overflow-hidden ${styles.gridBg}`}
      style={{ paddingTop: "calc(2rem + 106px)" }}
    >
      {/* Figma: linear #1C8DEA → #195BD7, layer blur 228 — soft orb on the left */}
      <div
        className="pointer-events-none absolute left-0 top-[10%] z-0 h-[min(72vw,340px)] w-[min(72vw,340px)] -translate-x-[38%] rounded-full bg-gradient-to-b from-[#1C8DEA] to-[#195BD7] opacity-[0.12] blur-[100px] sm:top-[12%] sm:h-[min(85vw,440px)] sm:w-[min(85vw,440px)] sm:-translate-x-[40%] sm:blur-[160px] md:h-[min(100vw,520px)] md:w-[min(100vw,520px)] md:-translate-x-[42%] md:blur-[228px]"
        aria-hidden
      />

      <Solr26Navbar />

      <div className="relative z-[1] max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[120px] pt-6 pb-0">
        <div className="flex flex-col-reverse items-center gap-10 pb-10 sm:gap-12 sm:pb-12 md:pb-[106px] lg:flex-row lg:items-end lg:justify-between lg:gap-8 xl:gap-[55px]">
          <div className="max-w-xl lg:max-w-none">
            <h1 className="text-[2rem] sm:text-4xl md:text-[56px] lg:text-[56px] font-bold !leading-[120%] tracking-tight text-[#292929]">
              The{" "}
              <span style={{ color: ACCENT }}>Growth trap</span> is here,
              <br />
              <span className="text-[#1a1a1a]">Is Your Credit Union ready?</span>
            </h1>
            <p className="mt-4 md:mt-4 text-base md:text-xl text-[#000000] leading-relaxed max-w-xl">
              Built on 4 quarters of NCUA data, 40+ credit union leaders surveyed.
              The most important data story in lending this year.
            </p>
            <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="#year-in-numbers"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-[#1C8DEA] to-[#195BD7] px-6 py-3 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-95"
              >
                Read Full Report
              </Link>
              <Link
                href="#year-in-numbers"
                className="inline-flex items-center justify-center rounded-full border-2 bg-white px-6 py-3 text-sm font-semibold transition-colors hover:bg-slate-50"
                style={{ borderColor: "#2A5FAC", color: "#2A5FAC" }}
              >
                Key Findings
              </Link>
            </div>
          </div>

          <div className="flex w-full max-w-[min(100%,420px)] justify-center sm:max-w-[413px] lg:max-w-[420px] lg:justify-end">
            <div className={`${styles.scene} ${styles.sceneMobile}`} aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element -- layered animation assets */}
              <img
                src="/assets/bank.png"
                alt=""
                className={styles.bank}
                width={413}
                height={420}
              />
              <img
                src="/assets/Cage.png"
                alt=""
                className={styles.cage}
                width={420}
                height={420}
              />
              <div className={styles.shadow} />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`relative z-[2] w-full py-3 text-sm font-semibold tracking-wide text-white ${styles.tickerStrip}`}
      >
        <Marquee speed={40} gradient={false} pauseOnHover>
          {TICKER_ITEMS.map((label, i) => (
            <span key={i} className="inline-flex items-center mx-4 text-base sm:mx-6 sm:text-xl">
              <span className="opacity-90">{label}</span>
              <span className="mx-6 h-2 w-2 rounded-full bg-white/80 shrink-0" aria-hidden />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
