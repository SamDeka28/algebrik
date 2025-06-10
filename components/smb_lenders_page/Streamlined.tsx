"use client";

import Image from "next/image";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { motion } from "framer-motion";
import Button from "../Buttons";
import Contact from "../contacts";
import { useState } from "react";

export default function Streamlined() {
  const [showContactModal, setShowContactModal] = useState(false);
  const data = {
    cardData: [
      {
        image: "/section_images/smb_lenders/simplified.png",
        title: "Simplified Applications",
        description:
          "Manage borrower applications seamlessly with real-time updates and a unified dashboard.",
      },
      {
        title: "Automated Risk Assessment",
        description:
          "Instantly evaluate creditworthiness with AI-driven insights and risk scoring.",
        image: "/section_images/smb_lenders/automated.png",
      },
      {
        title: "Product Recommendations",
        description:
          "Analyze borrower profiles to instantly suggest tailored loan products for every scenario.",
        image: "/section_images/smb_lenders/product.png",
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 py-[48px] md:py-8 flex font-plus-jakarta flex-col gap-12">
      <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto md:px-44">
        <CustomHeader text="Streamlined Lending, Designed for banks"/>
        <CustomSubtitle
          className="text-[14px] md:text-[20px] leading-[24px] md:leading-none px-[24px] md:px-0"
          text="Empower bank journeys with smarter tools to streamline processes, enhance decision-making, and accelerate lending workflows"
        />
      </div>

      <div
        className="relative flex flex-wrap justify-center md:gap-6 md:p-6"
        style={{
          backgroundImage: "url('/background_images/modern_lender.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container overflow-hidden relative opacity-[30%] z-[-1]">
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

<div className="hidden md:flex gap-[32px]">
        {data.cardData.map((card, index) => (
          <motion.div
            key={index}
            className="relative backdrop-brightness-110 bg-white/30 rounded-[32px] shadow-2xl 
            w-[365px] h-[426px] flex flex-col items-center justify-start"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
            }}
            transition={{
              scale: { duration: 0.3 },
              boxShadow: { duration: 0.3 },
            }}
          >
            <div className="mb-4 pt-6">
              <Image
                src={card.image}
                alt={card.title}
                className="object-cover rounded-md"
                width={340}
                height={239}
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


        <div className="block md:hidden relative w-[50%] h-full">
  <motion.div
    className="absolute top-0 left-0 w-[50%] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full h-[350px] sm:w-[400px] sm:h-[450px] md:w-[468.64px] md:h-[542.11px] blur-[125px] opacity-30"
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
    className="absolute top-0 left-0 w-[50%] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full h-[250px] sm:w-[500px] sm:h-[600px] md:w-[618.35px] md:h-[633.38px] blur-[125px] opacity-30 -z-10"
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
    className="absolute top-[300px] sm:top-0 left-0 w-[50%] bg-[#BE95FF] rounded-full h-[200px] sm:w-[400px] sm:h-[500px] md:w-[451.48px] md:h-[542.11px] blur-[105px] opacity-30 z-[-1]"
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
           {/* Mobile Carousel */}
                <div className="flex md:hidden overflow-x-auto pb-4">
                  <div className="flex flex-nowrap gap-[20px]">
                    {data.cardData.map((card, index) => (
                      <div
                        key={index}
                        className="relative p-4 backdrop-brightness-110 bg-white/60 rounded-[32px] shadow-md w-[300px] h-auto flex flex-col items-center justify-start transform transition-transform duration-300 hover:scale-105"
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

         {/* Buttons */}
         <div className="flex flex-row gap-4 w-full md:w-[430px] mt-[28px] md:mt-6">
          <Button
            text="Get Started"
            onClick={() => setShowContactModal(true)}
            customClass="text-center bg-gradient-to-r from-blue-400 to-blue-900 text-white font-bold py-[14px] md:py-[18px] text-[14px] md:text-[16px] font-bold hover:bg-blue-500 flex-1"
            activeStyle="bg-white text-[#292929] font-bold"
          />
          <Button
            text="See Us In Action"
            link="https://app.storylane.io/demo/9gq55pwnefgy?embed=inline"
            customClass="text-center py-[14px] md:py-[18px] text-[14px] md:text-[16px] text-[#1A69DC] font-bold border border-[#1C8DEA]"
            activeStyle="text-[#1A69DC] font-bold"
          />
        </div>
      </div>
      <Contact open={showContactModal} onClose={() => setShowContactModal(false)} />
    </div>
  );
}
