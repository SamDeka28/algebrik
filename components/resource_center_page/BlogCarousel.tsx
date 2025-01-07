"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";


type CarouselItem = {
  header: string;
  cardTitle: string;
  title: string;
  description: string;
  source: string;
  image: string;
};


const carouselData: CarouselItem[] = [
  {
    header: "Blogs",
    cardTitle: "BLOG",
    title: "Algebrik AI Secures $4M in Series A to Disrupt the Global Loan Origination Software Market",
    description:
      "Algebrik AI Inc., a Delaware-incorporated company headquartered in New York City, pioneering the world’s first cloud-native and AI-powered digital era Loan Origination Platform, today announced that it has...",
    source: "BusinessWire",
    image: "/section_images/place.png",
  },
  {
    header: "Case Studies",
    cardTitle: "CASE STUDY",
    title: "Revolutionizing Lending with AI: Case Studies of Success",
    description:
      "Learn how companies are leveraging Algebrik AI's platform to streamline loan origination processes, increase efficiency, and drive results in the financial sector.",
    source: "BusinessWire",
    image: "/section_images/place.png",
  },
  {
    header: "News Center",
    cardTitle: "NEWS CENTER",
    title: "Algebrik AI in the News: Innovations in Loan Origination",
    description:
      "Explore the latest updates and news stories about Algebrik AI and its impact on the global financial technology industry.",
    source: "BusinessWire",
    image: "/section_images/place.png",
  },
  {
    header: "One Pagers",
    cardTitle: "ONE PAGER",
    title: "Key Insights on Algebrik AI: A Quick Overview",
    description:
      "A concise summary of Algebrik AI's innovative platform, highlighting its features, benefits, and market potential.",
    source: "BusinessWire",
    image: "/section_images/place.png",
  },
];

export default function BlogCarousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleHeaderClick = (index: number) => {
    setCurrentIndex(index);
  };

  const currentSlide = carouselData[currentIndex];

  return (
    <div className="container mx-auto p-8 flex flex-col gap-[56px] font-plus-jakarta justify-center items-center">
      <div className="container px-[25px] py-[4px] bg-[#EAEDF3] flex justify-between items-center rounded-[36px] drop-shadow-[0_0_60px_0_rgba(0, 0, 0, 0.08)]  md:w-[700px] md:h-[56px]">
        {carouselData.map((item, index: number) => (
          <button
            key={index}
            onClick={() => handleHeaderClick(index)}
            className={`rounded-md font-plus-jakarta font-medium ${
              currentIndex === index
                ? "bg-gradient-to-r from-[#1C8DEA] to-[#195BD7] drop-shadow-[0_4px_44px_0_rgba(0, 0, 0, 0.08)] md:w-[168px] md:h-[40px] rounded-[96px] text-white"
                : "text-black"
            }`}
          >
            {item.header}
          </button>
        ))}
      </div>
      <div>
        <motion.div
          className="bg-white p-[24px] border border-[#D5D5D5] md:w-[1160px] md:h-[428px] rounded-[20px] flex items-start justify-between gap-[24px] backdrop-blur-[28.68px] shadow-[0px_20px_36px_0_rgba(10, 64, 108, 0.1)]"
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div>
            <Image
              src={currentSlide.image}
              alt={`Image for ${currentSlide.header}`}
              width={551}
              height={380}
              className="md:w-[551px] md:h-[380px]"
            />
          </div>
          <div className="md:w-[507px] pt-2 flex flex-col gap-[16px] justify-center">
            <h3 className="text-[14px] text-black/35 font-plus-jakarta tracking-widest font-bold">
              {currentSlide.cardTitle}
            </h3>
            <h3 className="text-[20px] text-[#606060] font-bold font-plus-jakarta leading-[28.13px]">
              {currentSlide.title}
            </h3>
            <p className="text-[16px] font-normal font-plus-jakarta text-[#606060] leading-[30px]">
              {currentSlide.description}
            </p>
            <p className="text-[30px] font-bold font-plus-jakarta text-black leading-[30px]">
              {currentSlide.source}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
