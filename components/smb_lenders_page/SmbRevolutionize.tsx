"use client";

import Image from "next/image";
import { CustomHeader } from "../CustomHeader";
import Marquee from "react-fast-marquee";
import { useReducedMotion,motion } from "framer-motion";
import ThreeColMotion from "../animations/ThreeColMotion";

export default function SmbRevolutionize() {
  const data = {
    cardData: [
      {
        image: "/section_images/smb_lenders/loan.png",
        title: "Loans Without Limits",
        description:
          "Scale lending operations effortlessly with cloud-based tools built for growth.",
      },
      {
        title: "Talk More with your Borrowers",
        description:
          "Centralize borrower communication for faster updates and improved engagement.",
        image: "/section_images/smb_lenders/talk.png",
      },
      {
        title: "Setup Loan Products in Minutes",
        description:
          "Configure, customize, and launch loan offerings instantly without technical complexity.",
        image: "/section_images/auto_lenders/faster.webp",
      },
    ],
  };

  const prefersReducedMotion = useReducedMotion();
    return (
      <motion.div
        initial={prefersReducedMotion ? {opacity:1} : {y:30, opacity:0}}
        whileInView={prefersReducedMotion ? {opacity:1} : {y:0, opacity:1}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{once: false, amount:0.2}}
        style={{ willChange: "transform, opacity" }} className="container mx-auto my-[48px] md:my-0 p-4 md:pt-20 flex flex-col gap-12 font-plus-jakarta">
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

      </div>

      <ThreeColMotion className="relative hidden md:flex flex-wrap justify-center gap-6 p-6">
        {data.cardData.map((card, index) => (
          <div
            key={index}
            className="group relative w-[383px] h-[450px] flex flex-col items-center justify-start rounded-[24px]  hover:scale-105 transition-transform duration-300"
          >
            <div
              className="mb-4 rounded-[24px] shadow-[0px_-4px_6px_-1px_rgba(0,0,0,0.1),0px_-2px_4px_-2px_rgba(0,0,0,0.1)]"
              style={{
                filter:
                  "drop-shadow(0px 0px 18px rgba(0, 0, 0, 0.1)), drop-shadow(0px 0px 18px rgba(0, 0, 0, 0.1)), drop-shadow(0px 3.65px 40px rgba(0, 0, 0, 0.08))",
              }}
            >
              <Image
                src={card.image}
                alt={card.title}
                className="object-cover  rounded-[24px] w-full h-[259px]"
                width={315}
                height={259}
                quality={100}
              />
            </div>
            <h3 className="text-[#2A5FAC] text-[24px] font-plus-jakarta text-center font-bold py-3 line-clamp-1">
              {card.title}
            </h3>
            <p className="text-[#606060] text-[14px] text-center font-plus-jakarta px-3">
              {card.description}
            </p>
          </div>
        ))}
      </ThreeColMotion>
      <div
        className="relative  md:hidden flex md:flex-wrap md:items-center md:justify-center gap-6 p-6 overflow-x-scroll md:overflow-visible scrollbar-none"
      >
        <Marquee className="flex">
        {data.cardData.map((card, index) => (
          <div
            key={index}
            style={{marginLeft:"20px"}}
            className="relative h-auto w-[333.33px] md:h-[295px] flex-shrink-0 md:flex-shrink flex flex-col items-center justify-between"
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
                className=" md:object-cover shadow-md h-[255px] md:h[295px] rounded-[24px]"
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
        </Marquee>
      </div>
      
    </motion.div>
  );
}
