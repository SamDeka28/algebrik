"use client"

import Image from "next/image";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { motion, Transition, useReducedMotion } from "framer-motion";

const ModernLender = () => {
  const prefersReducedMotion = useReducedMotion();
  const transition: Transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.6, ease: "easeOut" };
  return (
    <motion.div
      initial={prefersReducedMotion ? {opacity:1} : { y: 30, opacity: 0 }}
      transition={transition}
      whileInView={prefersReducedMotion ? {opacity:1} : { y: 0, opacity: 1 }}
      viewport={{once: false, amount:0.2}}
      style={{ willChange: "transform, opacity", backgroundImage: "url('/background_images/modern_lender.webp')", backgroundSize: "cover", backgroundPosition: "center 150px" }}
      // viewport={{ once: false }}
      className="relative mx-auto p-2 md:p-8 flex flex-col justify-center items-center gap-4 md:gap-8 mb-28 mt-16"
    >
      <div className="container flex flex-col justify-center items-center text-center gap-5">
        <CustomHeader className="text-[28px] md:text-[48px]" text="Built for the Modern Lender" />
        <CustomSubtitle
          className="px-6 md:px-64 text-[16px] md:text-[20px]"
          text="The platform that empowers lenders of every type with unmatched speed, precision, and scalability."
        />
      </div>

      <div className="container relative w-[100%] flex flex-col gap-0 md:gap-[24.42px] justify-center mt-[42px]">
        <motion.div
          className="container relative -inset-y-[250px] md:inset-0 w-[100%] flex gap-[24.42px] align-super md:justify-center mt-[2px]"
          initial={prefersReducedMotion ? {opacity:1} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative opacity-[30%] z-[-1]">
            <motion.div
              className="absolute top-0 transform md:left-[96px] bg-gradient-to-b sm:bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full w-[100%] h-[500px] sm:w-[100%] sm:h-[500px] md:w-[468.64px] md:h-[542.11px] blur-[50px] sm:blur-[100px]"
              initial={prefersReducedMotion ? false : { x: "-25%" }}
              animate={prefersReducedMotion ? undefined : { x: ["-30%", "30%", "-30%", "0%"] }}
              transition={prefersReducedMotion ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute top-[200px] sm:top-0 transform md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full w-[350px] h-[550px] sm:w-[500px] sm:h-[600px] md:w-[618.35px] md:h-[633.38px] blur-[50px] sm:blur-[100px] -z-10"
              initial={prefersReducedMotion ? false : { x: "10%" }}
              animate={prefersReducedMotion ? undefined : { x: ["10%", "-20%", "10%", "0%"] }}
              transition={prefersReducedMotion ? undefined : { duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute top-[400px] sm:top-0 transform md:-left-96 md:bottom-[10px] bg-[#BE95FF] rounded-full w-[250px] h-[450px] sm:w-[400px] sm:h-[500px] md:w-[451.48px] md:h-[542.11px] blur-[50px] sm:blur-[100px] z-[-1]"
              initial={prefersReducedMotion ? false : { x: "-10%" }}
              animate={prefersReducedMotion ? undefined : { x: ["-30%", "40%", "-40%", "0%"] }}
              transition={prefersReducedMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-[12px] md:gap-[30px]">
          <div className="relative flex gap-[12px] md:gap-[20px]">
            <motion.div 
              initial={prefersReducedMotion ? {opacity:1} : { y: 20, scale: 0.98, opacity: 0 }}
              whileInView={prefersReducedMotion ? {opacity:1} : { y: 0, scale: 1, opacity: 1 }}
              transition={transition}
              viewport={{once: false, amount:0.2}}
              style={{ willChange: "transform, opacity" }}
              className="bg-white px-[24px] py-[32px] md:w-[482px] md:h-[428px] rounded-[20px] flex flex-col 
            gap-[8px] shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
              <h1 className="text-[18px] md:text-[24px] font-plus-jakarta font-bold text-[#2A5FAC] tracking-tight">
                AI-Driven automation
              </h1>
              <p className="text-[14px] md:text-[16px] font-plus-jakarta text-[#606060] leading-[22px] md:leading-[30px]">
                Automate repetitive tasks, reduce errors, and accelerate loan approvals with advanced AI capabilities
              </p>
              <Image src="/section_images/ai_driven.png" width={482} height={428} alt="AI-Driven automation" className="hidden md:block" />
            </motion.div>
            <motion.div 
              initial={prefersReducedMotion ? {opacity:1} : { y: 20, scale: 0.98, opacity: 0 }}
              whileInView={prefersReducedMotion ? {opacity:1} : { y: 0, scale: 1, opacity: 1 }}
              transition={transition}
              viewport={{once: false, amount:0.2}}
              style={{ willChange: "transform, opacity" }}
              className="relative top-8 md:top-24 bg-white px-[24px] py-[32px] md:w-[409px] md:h-[370px] rounded-[20px] flex flex-col-reverse gap-[8px] shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">

              <p className="text-[14px] md:text-[16px] font-plus-jakarta text-[#606060] leading-[22px] md:leading-[30px]">
                Leverage real-time insights and confidence scoring to make faster, more informed lending decisions
              </p>
              <h1 className="text-[18px] md:text-[24px] font-plus-jakarta font-bold text-[#2A5FAC] tracking-tight">Smarter Decisioning</h1>

              <Image src="/section_images/smarter.png" width={482} height={428} alt="Smarter Decisioning" className="hidden md:block" />
            </motion.div>
          </div>
          <div className="flex gap-[12px] md:gap-[22.42px] z-10">
            <motion.div 
             initial={prefersReducedMotion ? {opacity:1} : { y: 20, scale: 0.98, opacity: 0 }}
             whileInView={prefersReducedMotion ? {opacity:1} : { y: 0, scale: 1, opacity: 1 }}
             transition={transition}
             viewport={{once: false, amount:0.2}}
             style={{ willChange: "transform, opacity" }}
              className="bg-white px-[24px] py-[32px] md:w-[444.58px] md:h-[327.46px] rounded-[20px] flex flex-col gap-[8px] shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">

              <h1 className="text-[18px] md:text-[24px] font-plus-jakarta font-bold text-[#2A5FAC] tracking-tight">Omnichannel Experience</h1>
              <p className="text-[14px] md:text-[16px] font-plus-jakarta text-[#606060] leading-[22px] md:leading-[30px]">
                Offer borrowers a seamless, unified experience across mobile, web, and in-branch
              </p>
              <Image src="/section_images/omnichannel_experience.png" width={482} height={428} alt="Omnichannel Experience" className="hidden md:block" />
            </motion.div>
            <motion.div 
              initial={prefersReducedMotion ? {opacity:1} : { y: 20, scale: 0.98, opacity: 0 }}
              whileInView={prefersReducedMotion ? {opacity:1} : { y: 0, scale: 1, opacity: 1 }}
              transition={transition}
              viewport={{once: false, amount:0.2}}
              style={{ willChange: "transform, opacity" }}
              className="relative top-8 bg-white px-[24px] py-[32px] md:w-[445px] md:h-[351px] rounded-[20px] flex flex-col gap-[8px] shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">

              <h1 className="text-[18px] md:text-[24px] font-plus-jakarta font-bold text-[#2A5FAC] tracking-tight">Scalable & Secure</h1>
              <p
                className="text-[14px] md:text-[16px] font-plus-jakarta text-[#606060] leading-[22px] md:leading-[30px]">
                Built on a robust cloud-native architecture to grow with your business and ensure data integrity
              </p>

              <Image src="/section_images/scalable.png" width={482} height={328} alt="Scalable & Secure" className="relative bottom-5 hidden md:block" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModernLender;
