"use client";

import { motion, Transition, useReducedMotion, MotionConfig } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";

const benefits = [
  {
    number: "01",
    category: "SPEED",
    headline: "Approvals in under 5 minutes",
    description: "Instant credit and same-day funding through Agentic AI.",
  },
  {
    number: "02",
    category: "EFFICIENCY",
    headline: "40% less underwriting time",
    description: "Automate manual checks and cut cycle times from days to hours.",
  },
  {
    number: "03",
    category: "GROWTH",
    headline: "35-40% higher look-to-book",
    description: "Omnichannel POS keeps members in-journey until funded.",
  },
  {
    number: "04",
    category: "COMPLIANCE",
    headline: "100% audit-ready decisions",
    description: "Role-based governance and automated rule logs ensure confidence.",
  },
  {
    number: "05",
    category: "MEMBER EXPERIENCE",
    headline: "+25 point Net Promoter Score lift",
    description: "Borrowers feel understood - not processed.",
  },
];

export default function FragmentedToFluidSection() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const transition: Transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.6, ease: "easeOut" };

  return (
    <MotionConfig reducedMotion={isMobile ? "always" : "never"}>
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        transition={transition}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        className="w-full bg-white py-8 md:py-24 px-4 md:px-8 relative overflow-hidden"
      >

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="max-w-5xl mx-auto text-center mb-12 md:mb-16">
            <CustomHeader
              text="From fragmented to fluid - why lenders choose Algebrik One"
              className="text-[32px] md:text-[40px] lg:text-[48px] text-[#2A5FAC] mb-6"
            />
            <CustomSubtitle
              text="Replace patchwork systems with one continuous workflow that accelerates speed, strengthens compliance, and delights members."
              className="text-[16px] md:text-[20px] text-[#606060] max-w-4xl mx-auto"
            />
          </div>

          {/* Benefits Grid - 3-2 layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* First row - 3 cards */}
            {benefits.slice(0, 3).map((benefit, index) => (
              <motion.div
                key={benefit.number}
                initial={{ y: 20, opacity: 0 }}
                transition={{ ...transition, delay: index * 0.1 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                className="bg-white rounded-[20px] p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex flex-row gap-4">
                  {/* Number - Large outlined light blue number */}
                  <div className="text-[32px] md:text-[56px] font-bold leading-none font-dm-sans text-transparent" style={{
                    WebkitTextStroke: '2px #195BD7',
                    WebkitTextFillColor: 'transparent',
                    // opacity: 0.3
                  }}>
                    {benefit.number}
                  </div>
                  <div className="flex flex-col gap-2">
                  {/* Category */}
                  <p className="text-[#2A5FAC] opacity-50 text-[14px] md:text-[14px] font-plus-jakarta font-extrabold uppercase tracking-[2px]">
                    {benefit.category}
                  </p>

                  {/* Headline */}
                  <h3 className="text-[#2A5FAC] text-[18px] md:text-[20px] font-plus-jakarta font-bold leading-tight">
                    {benefit.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-[#292929] text-[14px] md:text-[16px] font-plus-jakarta leading-relaxed">
                    {benefit.description}
                  </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Second row - 2 cards, centered */}
            <div className="md:col-span-3 flex justify-center gap-6 md:gap-8">
              {benefits.slice(3, 5).map((benefit, index) => (
                <motion.div
                  key={benefit.number}
                  initial={{ y: 20, opacity: 0 }}
                  transition={{ ...transition, delay: (index + 3) * 0.1 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  className="bg-white rounded-[20px] p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 w-full md:w-[calc(33.333%-1rem)] max-w-md"
                >
                  <div className="flex flex-row gap-4">
                    {/* Number - Large outlined light blue number */}
                    <div className="text-[32px] md:text-[56px] font-bold leading-none font-dm-sans text-transparent" style={{
                      WebkitTextStroke: '2px #195BD7',
                      WebkitTextFillColor: 'transparent',
                      // opacity: 0.3
                    }}>
                      {benefit.number}
                    </div>
                    <div className="flex flex-col gap-2">
                    {/* Category */}
                    <p className="text-[#2A5FAC] opacity-50 text-[14px] md:text-[14px] font-plus-jakarta font-extrabold uppercase tracking-[2px]">
                      {benefit.category}
                    </p>

                    {/* Headline */}
                    <h3 className="text-[#2A5FAC] text-[18px] md:text-[20px] font-plus-jakarta font-bold leading-tight">
                      {benefit.headline}
                    </h3>

                    {/* Description */}
                    <p className="text-[#292929] text-[14px] md:text-[16px] font-plus-jakarta leading-relaxed">
                      {benefit.description}
                    </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </MotionConfig>
  );
}

