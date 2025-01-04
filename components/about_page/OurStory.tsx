"use client";
import React, { useState } from "react";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";

const carouselData = [
  {
    id: 1,
    title: "If you're reading this, you probably know how important access to credit is—whether you're an individual chasing dreams or a business fueling growth.",
    description1: "But let's be honest: lending today feels stuck in the past. Applications get lost in a sea of paperwork, processes drag on for weeks, and borrowers are left frustrated.",
    description2: "Have you ever wondered why lending feels so slow and outdated? To answer that question—and to explain why we created Algebrik AI—we need to look back at how lending began.",
    image: "/section_images/place.png",
  },
  {
    id: 2,
    title: "Lending is essential to economic growth.",
    description1: "Yet the systems underpinning this vital process are outdated, often leading to inefficiencies and delays.",
    description2: "With Algebrik AI, we're rethinking lending from the ground up to make it faster, simpler, and more accessible.",
    image: "/section_images/place.png",
  },
];

export default function OurStory() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };

  const currentSlide = carouselData[currentIndex];

  return (
    <div className="container mx-auto p-8 flex flex-col gap-[56px] font-plus-jakarta justify-center items-center">
      <div className="text-center flex flex-col gap-[24px]">
        <CustomHeader text="Our Story" className="text-[40px]" />
        <CustomSubtitle
          text="Every transformative idea begins with a challenge. For us, it was the realization that lending was far too complex—both for lenders and borrowers."
          className="px-80 text-[20px]"
        />
      </div>
      <div>
        <div className="container relative opacity-[30%] z-[-1]">
          <div className="absolute top-0 md:left-[196px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full md:w-[861.73px] md:h-[239.68px] blur-[100px] animate-fadeIn" />
          <div className="absolute top-20 md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full md:w-[796.91px] md:h-[280.03px] blur-[100px] -z-10 animate-fadeIn delay-200" />
          <div className="absolute top-56 bg-[#BE95FF] rounded-full md:w-[1226.24px] md:h-[239.68px] blur-[100px] z-[-1] animate-fadeIn delay-400" />
        </div>

        <motion.div
          className="bg-white md:w-[1160px] md:h-[411px] rounded-[42px] flex justify-between gap-[95px] backdrop-blur-[28.68px] shadow-[0px_20px_36px_0_rgba(10, 64, 108, 0.1)] p-8"
          key={currentSlide.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="md:w-[609px] flex flex-col justify-center">
            <h3 className="text-[20px] text-[#606060] font-bold">
              {currentSlide.title}
            </h3>
            <p className="text-[16px] font-normal text-[#606060] pt-[20px] leading-[30px]">
              {currentSlide.description1}
            </p>
            <p className="text-[16px] font-normal text-[#606060] leading-[30px]">
              {currentSlide.description2}
            </p>
          </div>
          <div className="md:w-[368px] md:h-[315px]">
            <Image
              src={currentSlide.image}
              alt="Illustration of lending process"
              width={368}
              height={315}
              className="md:w-[368px] md:h-[315px]"
            />
          </div>
        </motion.div>

        <div className="flex gap-[8px] justify-center mt-6">
          <button
            onClick={handlePrevious}
            className="rounded-[34px] flex items-center justify-center p-[8px] md:w-[82px] md:h-[36px] bg-gradient-to-b from-[#1C8DEA] to-[#195BD7]">
            <IoIosArrowBack size={20} color="white" />
          </button>
          <button
            onClick={handleNext}
            className="rounded-[34px] flex items-center justify-center p-[8px] md:w-[82px] md:h-[36px] bg-gradient-to-b from-[#1C8DEA] to-[#195BD7]">
            <IoIosArrowForward size={20} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}
