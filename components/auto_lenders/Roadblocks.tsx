"use client";

import Image from "next/image";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { useReducedMotion ,motion, MotionConfig} from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const RoadBlocks = () => {
  const cardData = [
    {
      title: "Managing Multiple Integrations",
      description:
        "Juggling relationships with numerous data providers adds complexity and slows operations.",
      hoverDescription:
        "Algebrik unifies trusted services in one platform, minimizing friction and enhancing decision-making.",
      image: "/section_images/auto_lenders/managing.webp",
    },
    {
      title: "Evolving Compliance & Accuracy",
      description:
        "Evolving regulations and inaccurate valuations create compliance risks.",
      hoverDescription:
        "Seamless integrations and real-time updates ensure your operations remain accurate and compliant.",
      image: "/section_images/auto_lenders/evolving.webp",
    },
    {
      title: "Operational Inefficiencies",
      description:
        "Cumbersome manual processes lead to delays and lost opportunities.",
      hoverDescription:
        "Algebrik automates workflows, reducing approval times and enabling faster service.",
      image: "/section_images/auto_lenders/operational.webp",
    },
  ];

  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
    return (
      <MotionConfig reducedMotion={isMobile ? "always" : "never"}>
      <motion.div
        initial={prefersReducedMotion ? {opacity:1} : {y:30, opacity:0}}
        whileInView={prefersReducedMotion ? {opacity:1} : {y:0, opacity:1}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{once: false, amount:0.2}}
        style={{ willChange: "transform, opacity" }}
         className="flex flex-col gap-8 justify-center items-center px-4 md:py-[60px] sm:px-6 md:px-10 z-[10000]">
      <div className="flex flex-col justify-center items-center text-center gap-[24px]">
        <CustomHeader className="text-2xl md:text-3xl lg:text-4xl font-bold" text="Overcoming Roadblocks in Auto Lending" />
        <CustomSubtitle
          className="px-4 sm:px-16 md:px-32 lg:px-48 text-base md:text-lg lg:text-xl mb-10"
          text="Tackle the most pressing roadblocks in auto financing with innovative, integrated solutions"
        />
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center gap-[32px] lg:gap-10 w-full max-w-[1200px]">
        {/* Main Card */}
        <div className="flex flex-col items-center w-full lg:w-1/2 z-20">
          <div className="relative cursor-pointer flex flex-col-reverse justify-between p-6 rounded-[20px] shadow-[0_16px_52px_0px_rgba(10,64,108,0.1)] backdrop-blur-lg bg-white/60 border border-[#CAD3E0] w-full max-w-[518px] h-auto sm:h-[580px] group">
            <div className="hidden md:block absolute w-80 h-44 md:h-96 -top-0 -right-2 bg-gradient-to-tr from-blue-200 to-green-50 -z-10 rounded-[24px] blur-xl"></div>
            <div className="flex flex-col mt-4 z-10">
              <h3 className="text-lg md:text-[24px] font-plus-jakarta text-[#2A5FAC] font-bold leading-6 md:leading-8">
                {cardData[2].title}
              </h3>
              <p className="text-sm md:text-[16px] font-normal font-plus-jakarta text-[#292929] mt-2 leading-5 md:leading-6 relative">
                {cardData[2].description}
                <span className="absolute top-0 left-0 w-full h-full text-[#292929] bg-white/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {cardData[2].hoverDescription}
                </span>
              </p>
            </div>
            <div className="hidden md:block relative w-full h-[200px] sm:h-[370px] rounded-[24px] overflow-hidden 
            mt-4 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              <Image
                src={cardData[2].image}
                alt={cardData[2].title}
                width={700}
                height={600}
                objectFit="cover"
                className="rounded-[24px] w-full h-full"
                style={{
                  filter:
                    "blur(28px) drop-shadow(0px 36px 36px rgba(0, 0, 0, 0.08))",
                  opacity: 0,
                  transition: "opacity 0.5s ease, filter 0.5s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.filter = "none";
                  e.currentTarget.style.opacity = "1";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.filter =
                    "blur(28px) drop-shadow(0px 36px 36px rgba(0, 0, 0, 0.08))";
                  e.currentTarget.style.opacity = "0.5";
                }}
              />
            </div>
          </div>
        </div>

        {/* Other Cards */}
        <div className="flex flex-col gap-6 lg:gap-10 w-full lg:w-1/2 z-20">
          {cardData.slice(0, 2).map((card, index) => (
            <div
              key={index}
              className={`relative cursor-pointer p-6 rounded-[20px] shadow-[0_16px_52px_0px_rgba(10,64,108,0.1)] backdrop-blur-lg bg-white/60 border border-[#CAD3E0] w-full max-w-[610px] ${
                index === 0
                  ? "flex flex-col sm:flex-row-reverse h-auto sm:h-[222px]"
                  : "flex flex-col h-auto sm:h-[326px]"
              } gap-4 group`}
            >
              {/* Gradient Background */}
              <div className="hidden md:block absolute w-52 h-52 -top-0 -right-0 bg-gradient-to-tr from-blue-100 to-green-50 -z-10 rounded-[24px] blur-xl"></div>

              {/* Image Section */}
              <div
                className={`relative md:block hidden ${
                  index === 0
                    ? "w-full sm:w-1/2 h-[150px] sm:h-full"
                    : "w-full h-[150px] sm:h-[200px] overflow-hidden"
                }`}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  width={950}
                  height={515}
                  objectFit="cover"
                  className={`rounded-[24px] ${
                    index === 0 ? "w-full h-full" : "w-full h-full object-cover"
                  }`}
                  style={{
                    filter:
                      "blur(28px) drop-shadow(0px 36px 36px rgba(0, 0, 0, 0.08))",
                    opacity: 0,
                    transition: "opacity 0.5s ease, filter 0.5s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = "none";
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter =
                      "blur(28px) drop-shadow(0px 36px 36px rgba(0, 0, 0, 0.08))";
                    e.currentTarget.style.opacity = "0.5";
                  }}
                />
              </div>

              {/* Text Section */}
              <div className={`flex flex-col justify-center ${index === 0 ? "w-full sm:w-1/2" : "w-full"} z-10`}>
                <h3 className="text-lg md:text-[24px] font-plus-jakarta text-[#2A5FAC] font-bold leading-6 md:leading-8">
                  {card.title}
                </h3>
                <p className="text-sm md:text-[16px] font-normal font-plus-jakarta text-[#292929] mt-2 leading-5 md:leading-6 relative">
                  {card.description}
                  <span className="absolute top-0 left-0 w-full h-full text-[#292929] bg-white/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {card.hoverDescription}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
    </MotionConfig>
  );
};

export default RoadBlocks;
