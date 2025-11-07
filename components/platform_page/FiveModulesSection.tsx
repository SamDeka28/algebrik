"use client";

import { motion, Transition, useReducedMotion, MotionConfig } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import Image from "next/image";

const modules = [
  {
    icon: "/icons/fivemodule/dao.svg", // Digital Account Opening
    title: "Digital Account Opening",
    description: "Members open accounts in under 3 minutes - any device, anywhere.",
    metric: "70% faster onboarding",
  },
  {
    icon: "/icons/fivemodule/los.svg", // Lender's Cockpit
    title: "Lender's Cockpit (LOS)",
    description: "One dashboard to originate, track & fund across all channels.",
    metric: "40% faster decisions",
  },
  {
    icon: "/icons/fivemodule/pos.svg", // Omnichannel POS
    title: "Omnichannel POS",
    description: "Frictionless journeys from web to branch with instant prefill.",
    metric: "35% higher look-to-book",
  },
  {
    icon: "/icons/fivemodule/de.svg", // AI Decision Engine
    title: "AI Decision Engine",
    description: "No-code policies and real-time scoring for every loan type.",
    metric: "90% automated decisions",
  },
  {
    icon: "/icons/fivemodule/pa.svg", // Portfolio Analytics
    title: "Portfolio Analytics",
    description: "Track and analyze portfolio performance, identify trends, and mitigate risk.",
    metric: "25% fewer delinquencies",
  },
];

export default function FiveModulesSection() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const transition: Transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.6, ease: "easeOut" };

  return (
    <div className="w-full flex justify-center items-center">
      <MotionConfig reducedMotion={isMobile ? "always" : "never"}>
        <motion.section
          id="five-modules"
          initial={{ y: 30, opacity: 0 }}
          transition={transition}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          className="w-full max-w-7xl pt-[58px] md:pt-24 rounded-[32px] md:rounded-[48px] relative overflow-hidden"
          style={{
            background: "radial-gradient(circle, #7EB2FF 0%, #043071 100%)",
          }}
        >
          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
          }}></div>

          <div className="max-w-7xl  mx-auto relative z-10 overflow-hidden">
            {/* Header */}
            <div className="text-center px-4 md:px-8 mb-12 md:mb-16">
              <CustomHeader
                text="Five modules. One intelligent ecosystem."
                className="text-[32px] lg:text-[48px] text-white mb-6"
              />
              <CustomSubtitle
                text="Whether you're modernizing consumer lending or indirect auto, Algebrik One connects every member touchpoint - from application to funding - powered by Agentic AI. Each module drives measurable impact while working as part of one continuous flow."
                className="text-[16px] md:text-[20px] text-white/90 max-w-4xl mx-auto"
              />
            </div>

            {/* Module Cards - Mobile stack */}
            <div className="md:hidden space-y-4 px-4 md:px-8">
              {modules.map((module, index) => {
                const metricColor = [
                  "bg-gradient-to-r from-[#1C8DEA] to-[#195BD7] bg-clip-text text-transparent",
                  "bg-gradient-to-r from-[#C41CEA] to-[#A751FD] bg-clip-text text-transparent",
                  "bg-gradient-to-r from-[#3CA46C] to-[#19D7C1] bg-clip-text text-transparent",
                  "bg-gradient-to-r from-[#EA861C] to-[#D79F37] bg-clip-text text-transparent",
                  "bg-gradient-to-r from-[#7974FF] to-[#864AFF] bg-clip-text text-transparent",
                ];
                return <motion.div
                  key={`mobile-${module.title}`}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ ...transition, delay: index * 0.08 }}
                  viewport={{ once: false, amount: 0.2 }}
                  className="bg-[#0F2440]/90 border border-blue-400/30 rounded-[20px] p-6 flex flex-col gap-4 shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    {module.icon ? (
                      <Image
                        src={module.icon}
                        alt={module.title}
                        width={44}
                        height={44}
                        className="w-12 h-12 object-contain filter brightness-0 invert"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-white/10 rounded-lg"></div>
                    )}
                    <div>
                      <h3 className="text-white text-[18px] font-bold">{module.title}</h3>
                      <p className="text-white/80 text-[14px] leading-relaxed">{module.description}</p>
                    </div>
                  </div>
                  <p className="text-[16px] text-center py-[10px] rounded-[16px] px-4 bg-[#051B3A] font-bold">
                    <span className={metricColor[index]}>{module.metric}</span>
                  </p>
                </motion.div>
              })}
            </div>

            {/* Module Cards - Radial Arc Arrangement (Desktop) */}
            <div className="hidden md:block relative w-full max-h-[480px] md:min-h-[460px] mb-8 md:mb-12 px-4 md:px-8">
              <div className="relative w-full flex items-center justify-center" style={{ minHeight: "400px", height: "400px" }}>
                {modules.map((module, index) => {
                  const totalCards = modules.length;
                  const cardWidth = 226;
                  const progress = index / (totalCards - 1);
                  const normalizedPos = (progress - 0.5) * 2;
                  const cardSpacing = 125;
                  const totalWidth = (totalCards - 1) * cardSpacing;
                  const xOffset = index * cardSpacing - totalWidth / 2;
                  const x = 41 + xOffset / 7;
                  const yValues = [15, 3, 0, 3, 15];
                  const y = 10 + yValues[index];
                  const maxRotation = 15;
                  const rotation = normalizedPos * maxRotation;
                  const zIndex = 10 + index;
                  const metricColor = [
                    "bg-gradient-to-r from-[#1C8DEA] to-[#195BD7] bg-clip-text text-transparent",
                    "bg-gradient-to-r from-[#C41CEA] to-[#A751FD] bg-clip-text text-transparent",
                    "bg-gradient-to-r from-[#3CA46C] to-[#19D7C1] bg-clip-text text-transparent",
                    "bg-gradient-to-r from-[#EA861C] to-[#D79F37] bg-clip-text text-transparent",
                    "bg-gradient-to-r from-[#7974FF] to-[#864AFF] bg-clip-text text-transparent",
                  ];

                  return (
                    <motion.div
                      key={`desktop-${module.title}`}
                      initial={{ y: 20, opacity: 0, rotate: rotation }}
                      transition={{ ...transition, delay: index * 0.1 }}
                      whileInView={{ y: 0, opacity: 1, rotate: rotation }}
                      viewport={{ once: false, amount: 0.2 }}
                      className="absolute bg-gradient-to-br pb-16 from-[#1A3A5C] to-[#0F2440] border border-blue-400/30 rounded-[20px] p-4 flex flex-col gap-4 hover:scale-105 hover:border-blue-400/60 transition-all duration-300 shadow-lg justify-center"
                      style={{
                        width: `${cardWidth}px`,
                        maxWidth: "240px",
                        height: "406px",
                        background: "linear-gradient(135deg, rgba(26, 58, 92, 0.95) 0%, rgba(15, 36, 64, 0.95) 100%)",
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                        transformOrigin: "50% 50%",
                        zIndex,
                      }}
                    >
                      <div className="flex items-center justify-center mb-2">
                        {module.icon ? (
                          <Image
                            src={module.icon}
                            alt={module.title}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-contain filter brightness-0 invert"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-white/10 rounded-lg"></div>
                        )}
                      </div>
                      <h3 className="text-white text-[16px] text-center font-plus-jakarta font-bold leading-tight">
                        {module.title}
                      </h3>
                      <p className="text-white/80 text-[13px] text-center font-plus-jakarta leading-relaxed">
                        {module.description}
                      </p>
                      <div className="mt-2">
                        <p className="text-[18px] text-center py-[8px] rounded-[16px] px-4 bg-[#051B3A] font-plus-jakarta font-bold">
                          <span className={metricColor[index]}>{module.metric}</span>
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Footer Text - Positioned below cards, partially obscured by wave */}
            <div
              className="md:block hidden text-center z-40 mt-8 md:mt-12 absolute bottom-0 w-full left-0 right-0 rounded-t-[100%] p-4 bg-[#043071] py-[28px]"
            >
              <p className="text-white text-[16px] md:text-[18px] font-plus-jakarta">
                Only Algebrik One runs all five modules on a single intelligence layer - no data silos, no vendor chaos.
              </p>
            </div>
            <div
              className="md:hidden block text-center z-40 mt-8 md:mt-12  w-full p-4 bg-[#043071] py-[28px]"
            >
              <p className="text-white text-[16px] md:text-[18px] font-plus-jakarta">
                Only Algebrik One runs all five modules on a single intelligence layer - no data silos, no vendor chaos.
              </p>
            </div>
          </div>
        </motion.section>
      </MotionConfig>
    </div>
  );
}

