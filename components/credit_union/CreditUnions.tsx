"use client";

import Image from "next/image";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { motion } from "framer-motion";

export default function CreditUnion() {
  const data = {
    cardData: [
      {
        image: "/section_images/accelarated.png",
        title: "Accelerated Lending",
        description:
          "Our AI Loan Officer reduces manual tasks, enabling faster approvals.",
      },
      {
        title: "Omnichannel Experiences",
        description:
          "Borrowers can apply, track, and manage loans across mobile, web, and in-branch seamlessly.",
        image: "/section_images/omnichannel.png",
      },
      {
        title: "Cost-Effective Scaling",
        description:
          "A cloud-native platform that grows with you.",
        image: "/section_images/cost.png",
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 md:p-8 flex font-plus-jakarta flex-col gap-12">
      <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto md:px-44">
        <CustomHeader
        className=""
        text="Built for Credit Unions, Designed for People" />
        <CustomSubtitle
          className="text-[14px] md:text-[20px]"
          text="Deliver seamless, personalised member experiences across every channel, while empowering your team with faster decisions and scalable solutions"
        />
      </div>

      <div className="relative hidden md:flex flex-wrap justify-center gap-6 p-6">
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
      </div>


      <div className="flex md:hidden  overflow-x-auto pb-4">
        <div className="flex flex-nowrap gap-[30px]">
          {data.cardData.map((card, index) => (
            <div
              key={index}
              className="relative p-4 backdrop-brightness-110 bg-white/30 rounded-[32px] shadow-md w-[300px] h-auto flex flex-col items-center justify-start transform transition-transform duration-300 hover:scale-105"
            >
              <div className="mb-4">
                <Image
                  src={card.image}
                  alt={card.title}
                  className="object-contain rounded-md w-full h-[200px]"
                  width={300}
                  height={250}
                  quality={100}
                />
              </div>
              <h3 className="text-[#2A5FAC] text-[18px] font-plus-jakarta text-center font-bold mb-3 px-2">
                {card.title}
              </h3>
              <p className="text-[#606060] text-[12px] text-center font-plus-jakarta px-2">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
