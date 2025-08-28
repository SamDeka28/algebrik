"use client";

import Image from "next/image";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { motion, useReducedMotion } from "framer-motion";
import Marquee from "react-fast-marquee";
import ThreeColMotion from "../animations/ThreeColMotion";

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
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={prefersReducedMotion ? {opacity:1} : {y:30, opacity:0}}
      whileInView={prefersReducedMotion ? {opacity:1} : {y:0, opacity:1}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{once: false, amount:0.2}}
      style={{ willChange: "transform, opacity" }} className="container mx-auto py-[48px] p-4 md:py-0 md:p-8 flex font-plus-jakarta flex-col gap-[27px] md:gap-12">
      <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto md:px-44">
        <CustomHeader
          className=""
          text="Built for Credit Unions, Designed for People" />
        <CustomSubtitle
          className="text-[14px] md:text-[20px] px-10 md:px-0"
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
          <ThreeColMotion>
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
        </ThreeColMotion>
      </div>
      <div className="block md:hidden relative w-[80%] h-full">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full h-[350px] sm:w-[400px] sm:h-[450px] md:w-[468.64px] md:h-[542.11px] blur-[125px] opacity-30"
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
          className="absolute top-0 left-0 w-full bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full h-[250px] sm:w-[500px] sm:h-[600px] md:w-[618.35px] md:h-[633.38px] blur-[125px] opacity-30 -z-10"
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
          className="absolute top-[300px] sm:top-0 left-0 w-full bg-[#BE95FF] rounded-full h-[200px] sm:w-[400px] sm:h-[500px] md:w-[451.48px] md:h-[542.11px] blur-[105px] opacity-30 z-[-1]"
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


      <div className="flex md:hidden  overflow-x-auto pb-4">


        <Marquee
        //  className="flex items-center justify-start md:justify-around pb-4 pt-8"


        >
          <div className="flex flex-nowrap gap-[16px] md:gap-[30px]">
            {data.cardData.map((card, index) => (
              <div
                key={index}
                style={index==0 ? {marginLeft:"20px"}:{}}
                className="relative p-4 backdrop-brightness-110 bg-white/80 rounded-[32px] shadow-md w-[300px] h-auto flex flex-col items-center justify-start transform transition-transform duration-300 hover:scale-105"
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
        </Marquee>

      </div>
    </motion.div>
  );
}
