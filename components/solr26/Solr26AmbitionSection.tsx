"use client";

import Link from "next/link";

const HEADING = "Ambition is outrunning infrastructure";
const SUBHEADING =
  "66% of credit union leaders want to grow faster than the system average. But the operating foundation hasn't kept pace - and that gap creates real delinquency risk.";

const CARDS = [
  {
    value: "74%",
    description:
      "Automate ≤50% of Loan Workflow — Most processing still relies on people",
  },
  {
    value: "30%",
    description:
      "Automate 25% of Loan Workflow — Minimal automation, largely manual ops",
  },
  {
    value: "$1.72T",
    description:
      "Automate 76–90% of Loan Workflow — Growing portfolio, compounding manual strain",
  },
] as const;

export default function Solr26AmbitionSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center max-w-7xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-[40px] font-bold text-[#1f4f95] leading-tight">
            {HEADING}
          </h2>
          <p className="mt-4 md:mt-5 text-base md:text-xl leading-relaxed text-[#606060]">
            {SUBHEADING}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {CARDS.map((card) => (
            <div
              key={card.value}
              className="group relative overflow-hidden rounded-[20px] bg-[#E8EFF8] p-[24px] text-center shadow-[0_12px_40px_-12px_rgba(100,130,210,0.45),0_4px_24px_-8px_rgba(139,92,246,0.12)] transition-[background-color,box-shadow] duration-300 ease-out group-hover:bg-[#d5e6f4] group-hover:shadow-[0_18px_50px_-12px_rgba(90,130,210,0.55),0_8px_32px_-8px_rgba(120,100,200,0.2)]"
            >
              <div className="flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-white px-6 py-10 md:min-h-[300px] md:px-8 md:py-12">
                <p className="text-4xl font-bold tracking-tight text-[#2A5FAC] transition-colors duration-300 ease-out group-hover:text-[#5a8ece] md:text-[60px]">
                  {card.value}
                </p>
                <p className="mx-auto mt-4 max-w-[16rem] text-sm leading-relaxed text-[#666666] md:text-[16px]">
                  {card.description}
                </p>
              </div>

              {/* Hover: full-bleed over outer card (grey mat + inner); CTA still inset for tap target */}
              <div className="pointer-events-none absolute inset-0 z-[5] flex flex-col justify-end rounded-[20px] bg-gradient-to-b from-transparent via-white/25 to-[#2A5FAC] opacity-0 transition-opacity duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="px-2 pb-6 pt-16 md:px-6 md:pb-8">
                  <Link
                    href="/contact"
                    className="mx-auto block w-full rounded-lg bg-[#1d4e89] py-3 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#163d6e]"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
