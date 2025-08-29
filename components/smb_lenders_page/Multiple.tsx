"use client"
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion,motion, MotionConfig } from "framer-motion";
import Image from "next/image";

export default function Multiple() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile=useIsMobile()

    return (
      <MotionConfig reducedMotion={isMobile ? "always" : "never"}>
      <motion.div
        initial={prefersReducedMotion ? {opacity:1} : {y:30, opacity:0}}
        whileInView={prefersReducedMotion ? {opacity:1} : {y:0, opacity:1}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{once: false, amount:0.2}}
        style={{ willChange: "transform, opacity" }} className="container mx-auto md:p-4 md:mt-[26px] flex items-center justify-center font-plus-jakarta">
      <div className="flex flex-col md:w-[1160px] md:h-[526px] md:flex-row rounded-none md:rounded-[42px] backdrop-blur-sm 
      shadow-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 hover:scale-105 hover:shadow-lg 
      transition-transform duration-300 ease-in-out w-full md:max-w-none">

        <div className="flex flex-col md:flex-col gap-[4px] p-6 w-full md:w-1/2">
          <div className="w-full py-[42px] px-[20px] md:px-[44px]">
            <h3 className="text-white font-plus-jakarta text-[22px] md:text-[28px] font-semibold leading-[30px] pb-[12px]">
            Get over disjointed systems
            </h3>
            <p className="text-gray-300 font-plus-jakarta text-[14px] md:text-[16px] font-thin leading-[24px] md:leading-[26px] mt-2 pr-2 md:pr-10">
            Banks struggle with disjointed systems, causing inefficiencies and borrower dissatisfaction.
            </p>
          </div>
          <div className="w-full flex justify-center items-center">
            <Image
              src="/your-los.webp"
              alt="Plays Well With Others"
              width={332}
              height={231}
              className="md:rounded-lg rounded-none"
            />
          </div>
        </div>

        {/* Horizontal Line for Mobile */}
        <div className="w-full h-[2px] bg-gradient-to-r from-[#6399E700] via-[#99bcee] to-[#6399E700] opacity-50 my-4 md:hidden" />

        {/* Vertical Line for Desktop */}
        <div className="hidden md:block w-[3px] bg-gradient-to-b from-[#6399E700] via-[#99bcee] to-[#6399E700] 
        opacity-50 mx-6 h-full" />

        <div className="flex flex-col md:flex-col p-6 gap-[4px] mb-6 w-full md:w-1/2">
          <div className="w-full py-[42px] px-[20px] md:px-[44px]">
            <h3 className="text-white font-plus-jakarta text-[22px] md:text-[28px] font-semibold leading-[30px] pb-[12px]">
            One Platform. Multiple Integrations!
            </h3>
            <p className="text-gray-300 font-plus-jakarta text-[14px] md:text-[16px] font-thin leading-[24px] md:leading-[26px] mt-2 pr-2 md:pr-10">
            Algebrik unifies tools and automates workflows, simplifying lending for banks effortlessly
            </p>
          </div>
          <div className="w-full flex justify-center items-center">
            <Image
              src="/section_images/auto_lenders/brings.webp"
              alt="And Brings Them Together"
              width={332}
              height={231}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </motion.div>
    </MotionConfig>
  );
}
