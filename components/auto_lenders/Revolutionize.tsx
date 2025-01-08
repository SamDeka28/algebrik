"use client";

import Image from "next/image";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
// import { motion } from "framer-motion";

export default function Revolutionize() {
  const data = {
    cardData: [
      {
        image: "/section_images/auto_lenders/lend.png",
        title: "Lend Anywhere, Anytime",
        description:
          "Connected experiences across dealerships, mobile apps, and web platforms",
      },
      {
        title: "View work your way",
        description:
          "Easily configure workflows and loan terms with a drag-and-drop interface",
        image: "/section_images/auto_lenders/view.png",
      },
      {
        title: "Smarter Approvals, Faster Turnarounds",
        description:
          "Configuring Algebrik for different auto lending needs is as easy as flipping a switch.",
        image: "/section_images/auto_lenders/faster.png",
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 md:py-8 flex flex-col gap-12 font-plus-jakarta">
      <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto md:px-44">
        <CustomHeader className="flex flex-col" text={
          <>
            <span>Revolutionize Auto Lending with </span>
            <span>Algebrik&lsquo;s Smart Features</span>
          </>
        } />
        <CustomSubtitle
          className="text-[20px]"
          text="Algebrik empowers auto lenders with smarter workflows, seamless integrations, and exceptional borrower experiences"
        />
      </div>

      <div
        className="relative flex flex-wrap justify-center gap-6 p-6"
      >
        {/* <div className="absolute inset-0 z-[-1] opacity-[30%]">
          <motion.div
            className="absolute top-20 md:left-[296px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full md:w-[861.73px] md:h-[239.68px] blur-[100px]"
            animate={{
              y: [50, 30, 50],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-20 md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full md:w-[796.91px] md:h-[280.03px] blur-[100px]"
            animate={{
              y: [50, 30, 60],
            }}
            transition={{
              duration: 2,
              delay: 0.2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-56 bg-[#BE95FF] rounded-full md:w-[1226.24px] md:h-[239.68px] blur-[100px]"
            animate={{
              y: [10, 90, 0],
            }}
            transition={{
              duration: 2,
              delay: 0.4,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </div> */}

        {data.cardData.map((card, index) => (
          <div
            key={index}
            className="relative w-[333.33px] !h-[295px] flex flex-col items-center justify-between"
          >
            <div className="mb-4 rounded-[24px] shadow-[0px_-4px_6px_-1px_rgba(0,0,0,0.1),0px_-2px_4px_-2px_rgba(0,0,0,0.1)]" 
            style={{
              filter: "drop-shadow(0px 0px 18px rgba(0, 0, 0, 0.1)), drop-shadow(0px 0px 18px rgba(0, 0, 0, 0.1)) ,drop-shadow(0px 3.65px 40px rgba(0, 0, 0, 0.08))",
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
            <h3 className="text-[#2A5FAC] text-[24px] font-plus-jakarta text-center font-bold mb-3 px-2">{card.title}</h3>
            <p className="text-[#606060] text-[14px] text-center font-plus-jakarta px-2">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
