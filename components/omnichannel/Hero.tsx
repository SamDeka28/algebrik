"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import BookADemo from "../BookADemo";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { motion } from "framer-motion";

export default function HeroSection() {
  const pathname = usePathname();
  const router = useRouter();

  const heroContent = {
    header: (
      <>
        <div className="hidden md:flex flex-col">
          <span>Lending shouldn't be locked</span>
          <span className="font-extrabold">in the branch</span>
        </div>
        <div className="md:hidden flex flex-col px-[36px]">
          <span>Lending </span>
          <span>shouldn't be</span>
          <span>locked in the</span>
          <span>branch</span>
        </div>
      </>
    ),
    subtitle:
      "Algebrik's Omnichannel POS Solutions let you launch seamless, high-converting lending experiences across every touchpoint-mobile, web, branch, dealer, and partner channels.",
    sectionImage: "/icons/opos-main.webp",
    subtitleClass: "text-[16px] md:text-[18px] text-gray-300 font-plus-jakarta font-normal text-center px-[38px] md:px-[193px] mb-[10px] max-w-7xl",
  }

  if (!heroContent) {
    return null;
  }

  return (
    <div className="w-full h-max">
      <div
        // className="w-full h-[758px] flex items-center justify-center overflow-hidden relative"
        // style={{
        //   backgroundImage: "url('/background_images/platform_hero.webp')",
        //   backgroundSize: "100%",
        //   backgroundPosition: "center center",
        //   backgroundRepeat: "no-repeat",
        //   backgroundPositionY: "bottom",
        // }}
        className="w-full h-[758px] flex items-center justify-center overflow-hidden relative 
    md:bg-[url('/background_images/platform_hero.webp')] bg-[url('/background_images/mobile_solutions.webp')] rounded-b-[32px] md:rounded-none bg-no-repeat bg-bottom 
    bg-cover"

      >
        <div className="absolute top-48 mx-auto flex flex-col items-center justify-start gap-[20px]">
          <div className="flex flex-col gap-[20px]">
            <CustomHeader
              text={heroContent.header}
              className="text-[36px] md:text-[56px] text-white font-medium text-center  flex flex-col"
            />
            <CustomSubtitle
              text={heroContent.subtitle}
              className={heroContent.subtitleClass}
            />
          </div>
          <motion.button 
            className="relative bg-gradient-to-tr from-[#1C8DEA] to-[#195BD7] text-white py-[14px] px-6 font-bold rounded-[31px] overflow-hidden group"
            whileHover={{ 
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
            }}
            transition={{ 
              duration: 0.5,
              ease: "easeInOut"
            }}
            onClick={() => {
              router.push("/contact");
            }}
          >
            <span className="relative z-10">See how it works live</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#195BD7] to-[#1C8DEA] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
          </motion.button>
        </div>
      </div>

      <div className="hidden relative h-[458px] md:flex justify-center">
        <div className="">
          <div className="relative -inset-y-40 right-[25px]">
            <Image
              src={heroContent.sectionImage}
              alt="Section Hero"
              width={865}
              height={555}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
