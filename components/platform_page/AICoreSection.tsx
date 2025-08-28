"use client";

import ThreeColMotion from "../animations/ThreeColMotion";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { motion, useReducedMotion } from "framer-motion";

const cardData = [
  {
    number: "01",
    title: "Automated Document Verification",
    description: "Validate borrower documents in seconds, reducing manual errors.",
  },
  {
    number: "02",
    title: "KYC and Risk Analysis",
    description: "Streamline compliance with real-time identity checks, risk analysis, and anomaly detection.",
  },
  {
    number: "03",
    title: "Credit Scoring",
    description: "Leverage AI-driven credit scoring and predictive analytics to make smarter, faster loan approvals.",
  },
  {
    number: "04",
    title: "Borrower Assistance",
    description: "Guide borrowers through applications with instant responses and real-time updates.",
  },
  {
    number: "05",
    title: "Adaptive Workflow Automation",
    description: "Provide actionable insights to improve decision-making and borrower targeting.",
  },
  {
    number: "06",
    title: "Agreement Explainer",
    description: "Simplify complex loan agreements into easy-to-understand language for borrowers.",
  },
];



const AICoreSection = () => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={prefersReducedMotion ? {opacity:1} : {y:30, opacity:0}}
      whileInView={prefersReducedMotion ? {opacity:1} : {y:0, opacity:1}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{once:true, amount:0.2}}
      style={{ willChange: "transform, opacity" }}
      className="mx-auto p-4 md:p-8 my-16 md:my-0 flex flex-col justify-center items-center gap-8
      md:bg-[url('/background_images/modern_lender.webp')] bg-cover bg-center bg-[position-y:150px]
      "
    >
      <div className="container flex flex-col justify-center items-center text-center gap-5">
        <CustomHeader className="text-[28px] md:text-[48px]" text="AI at the Core: Driving Precision and Speed" />
        <CustomSubtitle
          className="px-6 md:px-64 text-[14px] md:text-[20px]"
          text="From automation to intelligent insights, Algebrik's AI-powered tools enhance every stage of the loan lifecycle, enabling lenders to deliver faster, smarter, and more accurate outcomes."
        />
      </div>

      <div className="container relative hidden md:flex justify-center opacity-[30%] z-[-1]">
        <motion.div
          className="absolute top-32 left-[446px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full 
          w-[200px] md:w-[794.87px] md:h-[392.59px] blur-3xl"
          initial={prefersReducedMotion ? false : { x: "-25%" }}
          animate={prefersReducedMotion ? undefined : { x: ["0%", "20%", "-10%", "0%"] }}
          transition={prefersReducedMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-36 left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full 
         w-[200px] md:w-[735.08px] h-[458.69px] blur-[228px] -z-10"
          initial={prefersReducedMotion ? false : { x: "10%" }}
          animate={prefersReducedMotion ? undefined : { x: ["0%", "-10%", "10%", "0%"] }}
          transition={prefersReducedMotion ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.div
          className="absolute top-48 bottom-[10px] bg-[#BE95FF] rounded-full 
          w-[200px] md:w-[1131.09px] h-[392.59px] blur-[228px] z-[-1]"
          initial={prefersReducedMotion ? false : { x: "-10%" }}
          animate={prefersReducedMotion ? undefined : { x: ["0%", "10%", "-10%", "0%"] }}
          transition={prefersReducedMotion ? undefined : { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
      </div>

      <div className="w-full h-max md:hidden">
        <div className="relative overflow-x-scroll scrollbar-hide flex">
          <div className="flex space-x-6 pb-5">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="px-6 py-8 rounded-[20px] shadow-[0_0px_16px_0px_rgba(10,64,108,0.1)] md:shadow-[[0_16px_52px_0px_rgba(10,64,108,0.1)]] backdrop-blur-lg
          bg-white/80 md:bg-white/60 border-none md:border border-[#CAD3E0] flex flex-col justify-between 
           w-[274px] h-auto flex-shrink-0"
              // style={{
              //   background:
              //     "linear-gradient(80deg, rgba(255, 255, 255, 0.7), rgba(230, 245, 255, 0.5))",
              // }}
              >
                <div className="drop-shadow-2xl">
                  <div className="flex items-center gap-4 justify-between mb-[16px] md:mb-4">
                    <p
                      className="text-[56px] md:text-[72px] font-bold leading-none font-dm-sans text-[#D3E5FF]"
                      style={{ WebkitTextStroke: "2px rgb(28, 141, 234, 100%)" }}
                    >
                      {card.number}
                    </p>
                  </div>
                  <h2 className="text-[#2A5FAC] text-[20px] md:text-[24px] font-bold font-plus-jakarta leading-[34px] mt-[16px] mb-[8px] hover:text-[#195BD7]">
                    {card.title}
                  </h2>
                  <p className="text-[#292929] text-[14px] md:text-[16px] font-normal font-plus-jakarta leading-6 hover:text-[#195BD7]">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



        <ThreeColMotion  className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10 items-center">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className="relative px-6 py-8 rounded-[20px] shadow-[0_16px_52px_0px_rgba(10,64,108,0.1)] backdrop-blur-lg bg-white/60 border border-[#CAD3E0] flex flex-col justify-between hover:scale-105 transition-all duration-300 ease-in-out"
            style={{
              width: "370px",
              height: "276px",
              background:
                "linear-gradient(80deg, rgba(255, 255, 255, 0.7), rgba(230, 245, 255, 0.5))",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
          >
            <div>
              <div className="flex items-center gap-4 justify-between mb-4">
                <p
                  className="text-[72px] font-bold leading-none font-dm-sans text-[#D3E5FF]"
                  style={{ WebkitTextStroke: "2px rgb(28, 141, 234, 100%)" }}
                >
                  {card.number}
                </p>
              </div>
              <h2 className="text-[#2A5FAC] text-[24px] font-bold font-plus-jakarta leading-[34px] mt-[16px] mb-[8px] hover:text-[#195BD7]">
                {card.title}
              </h2>
              <p className="text-[#292929] text-[16px] font-normal font-plus-jakarta leading-6 hover:text-[#195BD7]">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
        </ThreeColMotion>
    </motion.div>
  );
};

export default AICoreSection;
