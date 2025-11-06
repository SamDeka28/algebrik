"use client";

import { motion, Transition, useReducedMotion, MotionConfig } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import Image from "next/image";

const modules = [
  {
    icon: "/icons/da.svg", // Digital Account Opening
    title: "Digital Account Opening",
    description: "Members open accounts in under 3 minutes - any device, anywhere.",
    metric: "70% faster onboarding",
  },
  {
    icon: "/icons/los.svg", // Lender's Cockpit
    title: "Lender's Cockpit (LOS)",
    description: "One dashboard to originate, track & fund across all channels.",
    metric: "40% faster decisions",
  },
  {
    icon: "/icons/pos.svg", // Omnichannel POS
    title: "Omnichannel POS",
    description: "Frictionless journeys from web to branch with instant prefill.",
    metric: "35% higher look-to-book",
  },
  {
    icon: "/icons/ai.svg", // AI Decision Engine
    title: "AI Decision Engine",
    description: "No-code policies and real-time scoring for every loan type.",
    metric: "90% automated decisions",
  },
  {
    icon: "/icons/analysis.svg", // Portfolio Analytics
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

          <div className="max-w-7xl px-4 md:px-8 mx-auto relative z-10 overflow-hidden">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              <CustomHeader
                text="Five modules. One intelligent ecosystem."
                className="text-[32px] lg:text-[48px] text-white mb-6"
              />
              <CustomSubtitle
                text="Whether you're modernizing consumer lending or indirect auto, Algebrik One connects every member touchpoint - from application to funding - powered by Agentic AI. Each module drives measurable impact while working as part of one continuous flow."
                className="text-[16px] md:text-[20px] text-white/90 max-w-4xl mx-auto"
              />
            </div>

            {/* Module Cards - Radial Arc Arrangement */}
            <div className="relative w-full max-h-[480px] md:min-h-[460px] mb-8 md:mb-12">
              {/* Cards Container - Centered */}
              <div className="relative w-full flex items-center justify-center" style={{ minHeight: '400px', height: '400px' }}>
                {modules.map((module, index) => {
                  const totalCards = modules.length;
                  const cardWidth = isMobile ? 180 : 226;

                  // Direct positioning for each card to ensure proper overlap and subtle arc
                  const progress = index / (totalCards - 1); // 0 to 1
                  const normalizedPos = (progress - 0.5) * 2; // -1 to 1 (0 = center)

                  // Horizontal: cards overlap - spacing is less than card width
                  // Card width is ~220px, spacing should be ~150-160px for overlap
                  const cardSpacing = isMobile ? 120 : 125; // Pixels between card centers
                  const totalWidth = (totalCards - 1) * cardSpacing;
                  const xOffset = (index * cardSpacing) - (totalWidth / 2);
                  const x = 41 + (xOffset / 7); // Convert pixels to percentage (7px per 1%)

                  // Vertical: calculate Y directly based on index
                  // Y values: larger = lower on screen, smaller = higher on screen
                  // Index 0 (leftmost): highest Y (lowest position)
                  // Index 1: slightly lower Y
                  // Index 2 (center): lowest Y (highest position)
                  // Index 3: slightly higher Y
                  // Index 4 (rightmost): higher Y (lower position)
                  const yValues = isMobile 
                    ? [48, 44, 42, 44, 48] // Mobile Y values for indices 0-4
                    : [15, 3, 0, 3, 15]; // Desktop Y values for indices 0-4
                  
                  const y = 10+yValues[index];

                  // Rotation: proportional to position
                  const maxRotation = 15;
                  const rotation = normalizedPos * maxRotation;

                  // Z-index increases left to right
                  const zIndex = 10 + index;
                  
                  const metricColor = [
                    "bg-gradient-to-r from-[#1C8DEA] to-[#195BD7] bg-clip-text text-transparent",
                    "bg-gradient-to-r from-[#C41CEA] to-[#A751FD] bg-clip-text text-transparent",
                    "bg-gradient-to-r from-[#3CA46C] to-[#19D7C1] bg-clip-text text-transparent",
                    "bg-gradient-to-r from-[#EA861C] to-[#D79F37] bg-clip-text text-transparent",
                    "bg-gradient-to-r from-[#7974FF] to-[#864AFF] bg-clip-text text-transparent",
                  ]

                  return (
                    <motion.div
                      key={module.title}
                      initial={{ y: 20, opacity: 0, rotate: rotation }}
                      transition={{ ...transition, delay: index * 0.1 }}
                      whileInView={{ y: 0, opacity: 1, rotate: rotation }}
                      viewport={{ once: false, amount: 0.2 }}
                      className="absolute bg-gradient-to-br pb-16 from-[#1A3A5C] to-[#0F2440] border border-blue-400/30 rounded-[20px] p-4 flex flex-col gap-3 md:gap-4 hover:scale-105 hover:border-blue-400/60 transition-all duration-300 shadow-lg justify-center"
                      style={{
                        width: `${cardWidth}px`,
                        maxWidth: '240px',
                        height:"406px",
                        background: "linear-gradient(135deg, rgba(26, 58, 92, 0.95) 0%, rgba(15, 36, 64, 0.95) 100%)",
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                        transformOrigin: '50% 50%',
                        zIndex: zIndex,
                      }}
                    >
                      {/* Icon */}
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

                      {/* Title */}
                      <h3 className="text-white text-[16px] text-center font-plus-jakarta font-bold leading-tight">
                        {module.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/80 text-[13px] text-center font-plus-jakarta leading-relaxed ">
                        {module.description}
                      </p>

                      {/* Metric */}
                      <div className="mt-2">
                        <p className="text-[18px] text-center py-[8px] rounded-[16px] px-4 bg-[#051B3A] font-plus-jakarta font-bold ">
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
              className="text-center z-40 mt-8 md:mt-12 absolute bottom-0 w-full left-0 right-0 rounded-t-[100%] p-4 bg-[#043071] py-[28px]"
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

