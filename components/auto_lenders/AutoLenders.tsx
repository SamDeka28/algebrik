"use client";

import Image from "next/image";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { motion } from "framer-motion";
import Button from "../Buttons";

export default function AutoLenders() {
  const data = {
    cardData: [
      {
        image: "/section_images/auto_lenders/smarter.png",
        title: "Smarter Lending Decisions",
        description:
          "AI-powered insights streamline approvals, reducing friction for your team and borrowers",
      },
      {
        title: "Seamless Borrower Journeys",
        description:
          "Deliver connected experiences across dealership, mobile, and online channels",
        image: "/section_images/auto_lenders/seemless.png",
      },
      {
        title: "Integrated Workflows",
        description:
          "Unify trusted services in one platform to minimize complexity and maximize efficiency",
        image: "/section_images/cost.png",
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 md:py-8 flex font-plus-jakarta flex-col gap-12">
      <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto md:px-44">
        <CustomHeader text="Optimized for Auto Lenders, Tailored for Auto Owners" />
        <CustomSubtitle
          className="text-[20px]"
          text="Algebrik empowers auto lenders with smarter workflows, seamless integrations, and exceptional borrower experiences"
        />
      </div>

      <div
        className="relative flex flex-wrap justify-center gap-6 p-6"
        style={{
          backgroundImage: "url('/background_images/modern_lender.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container relative opacity-[30%] z-[-1]">
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
            className="absolute top-20 md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full md:w-[796.91px] md:h-[280.03px] blur-[100px] -z-10"
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
            className="absolute top-56 bg-[#BE95FF] rounded-full md:w-[1226.24px] md:h-[239.68px] blur-[100px] z-[-1]"
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
        </div>

        {data.cardData.map((card, index) => (
          <motion.div
            key={index}
            className="relative backdrop-brightness-110 bg-white/30 rounded-[32px] shadow-2xl w-[365px] h-[426px] flex flex-col items-center justify-start"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
            }}
            transition={{
              scale: { duration: 0.3 },
              boxShadow: { duration: 0.3 },
            }}
          >
            <div className="mb-4">
              <Image
                src={card.image}
                alt={card.title}
                className="object-contain rounded-md"
                width={433}
                height={355}
                quality={100}
              />
            </div>
            <h3 className="text-[#2A5FAC] text-[24px] font-plus-jakarta text-center font-bold mb-3 px-2">{card.title}</h3>
            <p className="text-[#606060] text-[14px] text-center font-plus-jakarta px-2">
              {card.description}
            </p>
          </motion.div>
        ))}
        <div className="flex gap-[22px] w-[430px] md:mt-[66px]">
          <Button
            text="Get Started"
            isActive={true}
            onClick={() => alert("Please provide the redirection page")}
            customClass="bg-gradient-to-r from-blue-400 to-blue-900 text-white font-bold py-[18px] text-[16px] font-bold hover:bg-blue-500 flex-1"
            activeStyle="bg-white text-[#292929] font-bold"
          />

          <Button
            text="Talk to Sales"
            onClick={() => alert("Please provide the redirection page")}
            customClass="py-[18px] text-[16px] text-[#1A69DC] font-bold border border-[#1C8DEA]"
            activeStyle="text-[#1A69DC] font-bold"
          />
        </div>
      </div>
    </div>
  );
}
