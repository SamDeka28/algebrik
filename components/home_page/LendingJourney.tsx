"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import Button from "../Buttons";
import Image from "next/image";
import lendingWithoutAlgebrik from "@/public/background_images/lendingWithoutAlgebrik.png";
import { motion } from "framer-motion";

const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

import animationData from "@/public/lottie/With_algebrik_desktop.json";

export default function LendingJourneyDesign() {
  const [isWithAlgebrik, setIsWithAlgebrik] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleButtonClick = (isAlgebrik: boolean) => {
    setIsZoomed(true);
    setTimeout(() => {
      setIsWithAlgebrik(isAlgebrik);
      setIsZoomed(false);
    }, 500);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col gap-8">
      <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto px-36">
        <CustomHeader
          text={
            isWithAlgebrik
              ? "The Difference Algebrik Makes"
              : "Making Lending Journeys Faster, Smarter, and Simpler"
          }
        />
        {!isWithAlgebrik && (
          <CustomSubtitle
            text="Lending journeys are plagued by inefficiencies—disconnected systems, manual workflows, and borrower frustration. Algebrik transforms them with automation, AI, and seamless experiences."
          />
        )}
      </div>

      <div className="relative mx-auto flex w-[416px] h-[52px] bg-[#E1ECFD] border-[#CEE2FF] rounded-[48px] justify-around items-center gap-4 p-[2px]">
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
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {isWithAlgebrik ? (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isZoomed ? 0.95 : 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-[1282px] h-[687px]"
          >
            <Lottie options={lottieOptions} height={687} width={1282} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isZoomed ? 0.95 : 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-[1382px] h-[687px]"
          >
            <Image
              src={lendingWithoutAlgebrik}
              alt="Lending Without Algebrik"
              width={1382}
              height={687}
              className="md:w-[1382px] h-full object-cover"
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}