"use client";

import { motion, Transition, useReducedMotion, MotionConfig } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import Image from "next/image";

const beforeAfterData = [
  {
    type: "before",
    title: "Before Algebrik",
    summary: "5 disconnected systems, 10 logins, 60 manual steps.",
    titleClass: "mb-3 bg-[#E4E8ED] rounded-[100px] text-center text-[#292929] text-[18px] md:text-[20px] font-bold px-4 py-2",
    cardClass: "bg-[#F5F5F5] rounded-[32px] shadow-xl p-6 pb-6 flex-1 min-w-[260px] hover:scale-105 transition-all ease-in",
    textClass: "text-[#292929] space-y-2 text-center",
    icon: null,
    items: [
      "Manual KYC & data entry",
      "Paper-based verifications",
      "Delayed credit decisions",
      "No unified borrower view"
    ],
    footer: "Average loan turnaround: 5-7 days"
  },
  {
    type: "after",
    title: "With Algebrik One",
    summary: "1 platform, 1 login, 1 intelligent journey.",
    titleClass: "flex flex-col justify-center items-center mb-3 bg-[#5A94E7] rounded-[100px] text-center text-[#FDFEFE] text-[18px] md:text-[20px] font-bold px-4 py-2",
    cardClass: "bg-gradient-to-br from-[#043071] to-[#7EB2FF] rounded-[32px] shadow-xl p-6 pb-6 flex-1 min-w-[260px] text-white border-[5px] border-[#5A94E7] hover:scale-105 transition-all ease-in",
    textClass: "space-y-2 text-center text-[#C7DAF5]",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0013 18.3334C14.5846 18.3334 18.3346 14.5834 18.3346 10C18.3346 5.41669 14.5846 1.66669 10.0013 1.66669C5.41797 1.66669 1.66797 5.41669 1.66797 10C1.66797 14.5834 5.41797 18.3334 10.0013 18.3334Z" fill="white" />
        <path d="M6.45703 10L8.81536 12.3583L13.5404 7.64166" stroke="#5A94E7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      "AI-driven onboarding & decisioning",
      "Real-time compliance & audit trails",
      "Self-serve flow and strategy control",
      "Instant analytics feedback"
    ],
    footer: "From application → Funding in 5 minutes"
  }
];

export default function BeforeAfterSection() {
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
        className="w-full py-16 md:py-8 px-4 md:px-8 relative"
      >
                <img src="/background_images/ml-single.webp" alt="Fragmented to Fluid" className="absolute -top-[10%] left-0 w-[25%] object-cover" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Animated gradient circles - contained and smaller */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[20%] z-0 pointer-events-none">
            <motion.div
              className="absolute top-0 left-0 bg-gradient-to-br from-[#66B3B0] to-[#149994] rounded-full w-[200px] h-[200px] md:w-[250px] md:h-[250px] blur-[60px]"
              initial={{ x: "-50%", y: "-50%" }}
              animate={(isMobile || prefersReducedMotion) ? undefined : { x: ["-60%", "-40%", "-60%", "-50%"], y: ["-60%", "-40%", "-60%", "-50%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute top-0 left-0 bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full w-[180px] h-[180px] md:w-[220px] md:h-[220px] blur-[60px]"
              initial={{ x: "-50%", y: "-50%" }}
              animate={(isMobile || prefersReducedMotion) ? undefined : { x: ["-40%", "-60%", "-40%", "-50%"], y: ["-40%", "-60%", "-40%", "-50%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />

            <motion.div
              className="absolute top-0 left-0 bg-[#BE95FF] rounded-full w-[150px] h-[150px] md:w-[200px] md:h-[200px] blur-[60px]"
              initial={{ x: "-50%", y: "-50%" }}
              animate={(isMobile || prefersReducedMotion) ? undefined : { x: ["-50%", "-30%", "-50%", "-50%"], y: ["-30%", "-50%", "-30%", "-50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
          </div>
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 relative z-10">
            <CustomHeader
              text="From Fragmented Tools to a Unified Flow"
              className="text-[32px] md:text-[40px] lg:text-[48px] text-[#2A5FAC] mb-6"
            />
            <CustomSubtitle
              text="Lending used to mean juggling vendors, logins, and spreadsheets. Now it means one intelligent platform that handles it all - in minutes."
              className="text-[16px] md:text-[18px] text-[#606060] max-w-4xl mx-auto"
            />
          </div>

          {/* Before/After Cards */}
          <div className="flex flex-col md:flex-row gap-6 w-full justify-center relative z-10">
            {beforeAfterData.map((card, idx) => (
              <motion.div
                key={card.type}
                initial={{ y: 20, opacity: 0 }}
                transition={{ ...transition, delay: idx * 0.1 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                className={card.cardClass}
              >
                <h3 className={card.titleClass}>
                    <div className="flex flex-row items-center justify-center gap-2">
                      {card.icon && <span className="mr-1">{card.icon}</span>}
                      {card.title}
                    </div>
                  <p className={`${card.textClass} text-[14px] md:text-[14px] mb-4 mt-2 font-plus-jakarta !font-normal text-[#666666]`}>
                  {card.summary}
                </p>
                </h3>
                <ul className={card.textClass} style={{ marginTop: "20px" }}>
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 mb-3 text-left">
                      {card.type === "before" ? (
                        <Image src="/icons/info-circle.svg" alt="Info" width={20} height={20} className="mt-0.5 flex-shrink-0" />
                      ) : (
                        <Image src="/icons/tick-circle.svg" alt="Check" width={20} height={20} className="mt-0.5 flex-shrink-0" />
                      )}
                      <span className={card.type === "after" ? " text-base font-plus-jakarta !font-normal text-[#C7DAF5]" : "text-base font-plus-jakarta !font-normal text-[#666666]"}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className={`mt-6 pt-4 border-t ${card.type === "before" ? "border-gray-300" : "border-white/30"}`}>
                  <p className={`${card.textClass} ${card.type === "before" ? "text-[#666666]" : "text-[#ffffff]"} text-[14px] md:text-[16px] font-semibold`}>
                    {card.footer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </MotionConfig>
  );
}

