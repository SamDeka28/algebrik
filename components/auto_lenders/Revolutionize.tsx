"use client";

import Image from "next/image";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { motion } from "framer-motion"
import Marquee from "react-fast-marquee";

export default function Revolutionize() {
  const data = {
    cardData: [
      {
        image: "/section_images/auto_lenders/lend.webp",
        title: "Lend Anywhere, Anytime",
        description:
          "Connected experiences across dealerships, mobile apps, and web platforms",
      },
      {
        title: "View work your way",
        description:
          "Easily configure workflows and loan terms with a drag-and-drop interface",
        image: "/section_images/auto_lenders/view.webp",
      },
      {
        title: "Smarter Approvals, Faster Turnarounds",
        description:
          "Configuring Algebrik for different auto lending needs is as easy as flipping a switch.",
        image: "/section_images/auto_lenders/faster.webp",
      },
    ],
  };

  return (
    <div className="container mx-auto my-[48px] md:my-0 p-4 md:py-8 flex flex-col gap-[16px] md:gap-12 font-plus-jakarta">
      <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto md:px-44">
        <CustomHeader
          className="flex flex-col px-6 md:px-0"
          text={
            <>
              <span>Revolutionize Auto Lending with </span>
              <span>Algebrik&lsquo;s Smart Features</span>
            </>
          }
        />
        <CustomSubtitle
          className="text-[14px] md:text-[20px]"
          text="Algebrik empowers auto lenders with smarter workflows, seamless integrations, and exceptional borrower experiences"
        />
      </div>

      <div className="block md:hidden relative w-[20%] h-full">
        <motion.div
          className="absolute top-50 left-0 w-full bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full h-[50px] sm:w-[400px] sm:h-[450px] md:w-[468.64px] md:h-[542.11px] blur-[125px] opacity-30"
          initial={{ x: "0%" }}
          animate={{
            x: ["-10%", "10%", "-10%", "0%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full h-[80px] sm:w-[500px] sm:h-[600px] md:w-[618.35px] md:h-[633.38px] blur-[125px] opacity-30 -z-10"
          initial={{ x: "0%" }}
          animate={{
            x: ["10%", "-10%", "10%", "0%"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-[300px] sm:top-0 left-0 w-full bg-[#BE95FF] rounded-full h-[80px] sm:w-[400px] sm:h-[500px] md:w-[451.48px] md:h-[542.11px] blur-[105px] opacity-30 z-[-1]"
          initial={{ x: "0%" }}
          animate={{
            x: ["-10%", "10%", "-10%", "0%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <Marquee className="flex gap-[30px]">
      <div
        className="md:hidden relative flex md:flex-wrap md:items-center md:justify-center gap-6 md:p-6 overflow-x-scroll md:overflow-visible scrollbar-none"
      >

          {data.cardData.map((card, index) => (
            <div
              key={index}
              className="relative w-[333.33px] h-[405px]  flex-shrink-0 md:flex-shrink flex flex-col items-center justify-between"
            >
              <div
                className="mb-4 rounded-[24px] shadow-[0px_-4px_6px_-1px_rgba(0,0,0,0.1),0px_-2px_4px_-2px_rgba(0,0,0,0.1)]"
                style={{
                  filter:
                    "drop-shadow(0px 0px 18px rgba(0, 0, 0, 0.1)), drop-shadow(0px 0px 18px rgba(0, 0, 0, 0.1)) ,drop-shadow(0px 3.65px 40px rgba(0, 0, 0, 0.08))",
                }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  className="object-cover shadow-md rounded-[24px]"
                  width={333.33}
                  height={295}
                  quality={100}
                />
              </div>
              <h3 className="text-[#2A5FAC] text-[20px] md:text-[24px] font-plus-jakarta text-center font-bold mb-3 px-2">
                {card.title}
              </h3>
              <p className="text-[#606060] text-[14px] text-center font-plus-jakarta px-2">
                {card.description}
              </p>
            </div>
          ))}
       
      </div>
      </Marquee>
      <div
        className="relative hidden md:flex md:flex-wrap md:items-center md:justify-center gap-6 md:p-6 overflow-x-scroll md:overflow-visible scrollbar-none"
      >
        {data.cardData.map((card, index) => (
          <div
            key={index}
            className="relative w-[80%] h-auto md:w-[333.33px] md:h-[295px] flex-shrink-0 md:flex-shrink flex flex-col items-center justify-between"
          >
            <div
              className="mb-4 rounded-[24px] shadow-[0px_-4px_6px_-1px_rgba(0,0,0,0.1),0px_-2px_4px_-2px_rgba(0,0,0,0.1)]"
              style={{
                filter:
                  "drop-shadow(0px 0px 18px rgba(0, 0, 0, 0.1)), drop-shadow(0px 0px 18px rgba(0, 0, 0, 0.1)) ,drop-shadow(0px 3.65px 40px rgba(0, 0, 0, 0.08))",
              }}
            >
              <Image
                src={card.image}
                alt={card.title}
                className="object-cover shadow-md rounded-[24px]"
                width={333.33}
                height={295}
                quality={100}
              />
            </div>
            <h3 className="text-[#2A5FAC] text-[20px] md:text-[24px] font-plus-jakarta text-center font-bold mb-3 px-2">
              {card.title}
            </h3>
            <p className="text-[#606060] text-[14px] text-center font-plus-jakarta px-2">
              {card.description}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}
