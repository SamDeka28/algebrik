"use client";
import React, { useEffect, useState } from "react";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const carouselData = [
  {
    id: 1,
    title: "If you're reading this, you probably know how important access to credit is—whether you're an individual chasing dreams or a business fueling growth.",
    description1: "But let's be honest: lending today feels stuck in the past. Applications get lost in a sea of paperwork, processes drag on for weeks, and borrowers are left frustrated.",
    description2: "Have you ever wondered why lending feels so slow and outdated? To answer that question—and to explain why we created Algebrik AI—we need to look back at how lending began.",
    image: "/section_images/story/if.png",
  },
  {
    id: 2,
    title: "The Origins of Lending",
    description1: "Thousands of years ago, lending was simple. A handshake, a promise, and trust were all you needed.",
    description2: <div>
      <p>
      But as societies grew, lending became more complex. Banks emerged to manage this trust at scale, and with them came mountains of paperwork and processes
      </p>
      <p>
      Fast forward to the 20th century, and computers entered the scene. They promised speed and efficiency, but…
      </p>
    </div>,

    image: "/section_images/story/ori.png",
  },
  {
    id: 3,
    title: "A Revolution Interrupted",
    description1: "Despite the introduction of technology, lending didn’t change much. Sure, we replaced ledgers with software, but the systems were designed to work like their paper ancestors: rigid, slow, and disconnected.",
    description2: "By the 21st century, lenders were duct-taping together dozens of tools: old-school LOS, spreadsheets, CRM systems, compliance software—just to process a single loan. Borrowers? They were stuck waiting.",
    image: "/section_images/story/revo.png",
  },
  {
    id: 4,
    title: "A New Era in Lending",
    description1: "That’s where Algebrik AI comes in.",
    description2: <div><p>We’re breaking away from these outdated systems and designing lending the way it was meant to be: adaptive, intuitive, and human-centric.</p>
      <p>Inspired by the pioneers of modern computing, we’ve created the world’s first cloud-native, AI-powered Loan Origination System. It’s not just a tool—it’s a revolution in lending. With Algebrik AI, lenders can:</p>
          <p>
        <ul className="list-disc pl-8">
          <li>
          Launch new credit products in 30 minutes flat.
          </li>
          <li>
          Reduce loan processing times by 70%.
          </li>
          <li>
          Cut drop-offs by 80%.
          </li>
        </ul>,
   </p>
    </div>,
    image: "/section_images/story/new.png",
  },
  {
    id: 5,
    title: "As a First Step, We’re Redefining Lending Workflows into an All-in-One Platform.",
    description1: "Want to originate a personal loan? Launch a new credit product? Streamline your application review process?",
    description2: <div>
       <p>With Algebrik AI, it’s all in one place.</p>
        <p>
        We’ve built a platform that unites every step of the lending journey—from application to approval to disbursement—into a seamless, intuitive workflow.
        And the best part? You can customize it to fit your unique lending needs using modular, drag-and-drop tools that feel as simple and flexible as LEGO blocks.        </p>
    </div>,
    image: "/section_images/story/ass.png",
  },
];

export default function OurStory() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile=useIsMobile();

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };

  useEffect(()=>{
    if(isMobile){
      setInterval(()=>{
        handleNext();
      },3000)
    }
  },[isMobile])

  const currentSlide = carouselData[currentIndex];

  return (
    <div className="container mx-auto px-4 md:py-[93px] flex flex-col gap-[56px] font-plus-jakarta justify-center items-center">
      <div className="text-center flex flex-col gap-[16px] md:gap-[24px]">
        <CustomHeader text="Our Story" className="text-[28px] md:text-[40px]" />
        <CustomSubtitle
          text="Every transformative idea begins with a challenge. For us, it was the realization that lending was far too complex—both for lenders and borrowers."
          className="px-4 md:px-80 text-[14px] md:text-[20px]"
        />
      </div>
      <div>
        <div className=" relative opacity-[30%] z-[-1]">
          <div className="absolute top-0 left-0 transform -md:translate-x-1/2 md:left-[196px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full w-[100%] h-[800px] md:w-[861.73px] md:h-[239.68px] blur-[100px] animate-fadeIn" />
          <div className="absolute top-0 left-0 transform -md:translate-x-1/2 md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full w-[100%] md:w-[796.91px] md:h-[280.03px] blur-[100px] -z-10 animate-fadeIn delay-200" />
          <div className="absolute top-0 left-0 transform -md:translate-x-1/2 bg-[#BE95FF] rounded-full w-[100%] md:w-[1226.24px] h-[1000px] md:h-[239.68px] blur-[100px] z-[-1] animate-fadeIn delay-400" />
        </div>

        <motion.div
          className="bg-white w-full md:w-[1160px] md:h-[411px] rounded-[42px] flex flex-col 
          md:flex-row justify-between gap-[95px] backdrop-blur-[28.68px] shadow-[0px_20px_36px_0_rgba(10, 64, 108, 0.1)] p-[12px] md:p-8"
          key={currentSlide.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="py-4 md:py-0 px-4 md:px-0 md:w-[609px] flex flex-col justify-center">
            <h3 className="text-[20px] text-[#606060] font-bold">
              {currentSlide.title}
            </h3>
            <div className="text-[16px] font-normal text-[#606060] pt-[20px] leading-[30px]">
              {currentSlide.description1}
            </div>
            <div className="text-[16px] font-normal text-[#606060] leading-[30px]">
              {currentSlide.description2}
            </div>
          </div>
          <div className="md:w-[368px] md:h-[315px] md:flex md:justify-center md:flex-col">
            <Image
              src={currentSlide.image}
              alt="Illustration of lending process"
              width={368}
              height={315}
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        <div className="flex gap-[8px] justify-center mt-6">
          <button
            onClick={handlePrevious}
            className="rounded-[34px] flex items-center justify-center p-[8px] w-[82px] h-[36px] bg-gradient-to-b from-[#1C8DEA] to-[#195BD7]"
          >
            <IoIosArrowBack size={20} color="white" />
          </button>
          <button
            onClick={handleNext}
            className="rounded-[34px] flex items-center justify-center p-[8px] w-[82px] h-[36px] bg-gradient-to-b from-[#1C8DEA] to-[#195BD7]"
          >
            <IoIosArrowForward size={20} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}
