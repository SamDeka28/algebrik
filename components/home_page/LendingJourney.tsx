"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import Button from "../Buttons";
import Image from "next/image";
import lendingWithoutAlgebrik from "@/public/background_images/lendingWithoutAlgebrik.webp";
import lendingWithAlgebrik from "@/public/section_images/with.png"
import { motion } from "framer-motion";

const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

import animationData from "@/public/lottie/With_algebrik_desktop.json";
import animationMobileData from "@/public/lottie/With_algebrik_mobile.json";

export default function LendingJourneyDesign() {
  const [isWithAlgebrik, setIsWithAlgebrik] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: isMobile ? animationMobileData : animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleButtonClick = (isAlgebrik: boolean) => {
    setIsZoomed(true);
    setTimeout(() => {
      setIsWithAlgebrik(isAlgebrik);
      setIsZoomed(false);
    }, 300);
  };

  const containerClass = isMobile
    ? "w-[300px] h-[547px]"
    : "md:w-[1282px] md:h-[687px]";

  return (
    <div className="container mx-0 md:mx-auto px-0 md:p-8 flex flex-col gap-8 mb-[48px] md:mb-0">
      <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto px-[46px] md:px-36">
        <CustomHeader
          text="Making Lending Journeys Faster, Smarter, and Simpler"
          className="px-7"
        />
        <CustomSubtitle
          text="Lending journeys are plagued by inefficiencies—disconnected systems, manual workflows, and borrower frustration. Algebrik transforms them with automation, AI, and seamless experiences."
        />
      </div>

      <div className="relative mx-auto flex w-[370px] md:w-[416px] h-[52px] bg-[#E1ECFD] border-[#CEE2FF] rounded-[48px] justify-around items-center gap-4 p-[2px]">
        <Button
          text="With Algebrik"
          isActive={isWithAlgebrik}
          onClick={() => handleButtonClick(true)}
          customClass="transition-transform transform ease-in-out duration-300"
        />
        <Button
          text="Without Algebrik"
          isActive={!isWithAlgebrik}
          onClick={() => handleButtonClick(false)}
          customClass="transition-transform transform ease-in-out duration-300"
        />
      </div>

      <motion.div
        className="flex justify-center items-center"
        initial={{ scale: 1 }}
        animate={{ scale: isZoomed ? 1.1 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {isWithAlgebrik ? (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isZoomed ? 0.95 : 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`block ${containerClass}`}
          >
            <Lottie options={lottieOptions} />
          </motion.div>
        ) : (
          <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isZoomed ? 0.95 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`block ${containerClass}`}
        >
          {/* Desktop Image */}
          <Image
            src={lendingWithoutAlgebrik}
            alt="Lending Without Algebrik (Desktop)"
            width={1282}
            height={687}
            className="object-cover hidden md:block"
          />
        
          {/* Mobile Image */}
          <Image
            src={lendingWithAlgebrik}
            alt="Lending With Algebrik (Mobile)"
            width={547}
            height={300}
            className="object-cover w-[100%] md:hidden block"
          />
        </motion.div>
        
        )}
      </motion.div>
    </div>
  );
}