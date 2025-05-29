"use client";

import Image from "next/image";
import mobileHeroImage from "@/public/section_images/home_page/loan.png";
import BookADemo from "../BookADemo";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import heroImage1 from "@/public/section_images/home_page/HiHowMuch.png";
import heroImage2 from "@/public/section_images/home_page/Purpose.png";
import heroImage3 from "@/public/section_images/home_page/Dashboard.png";
import heroImage4 from "@/public/section_images/home_page/Profile.png";
import heroImage5 from "@/public/section_images/home_page/EmailAssist.png";

export default function HeroSection() {
  const [isRearranged, setIsRearranged] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRearranged((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval); 
  }, []);


  const initialPositions = [
    { x: 0, y: 0, scale: 1 },
    { x: -10, y: 310, scale: 0.8 },
    { x: 120, y: 84, scale: 0.8 },
    { x: 430, y: 0, scale: 0.8 },
    { x: 460, y: 360, scale: 0.8 },
  ];

  const rearrangedPositions = [
    { x: 10, y: 60, scale: 1 },
    { x: 90, y: 272, scale: 1 },
    { x: 120, y: 84, scale: 1 },
    { x: 480, y: 140, scale: 1 },
    { x: 360, y: 290, scale: 1 },
  ];

  const images = [
    { src: heroImage1, width: 144, height: 314, zIndex: 10, borderRadius: 20  },
    { src: heroImage2, width: 133, height: 169, zIndex: 10, borderRadius: 20  },
    { src: heroImage3, width: 452, height: 297, zIndex: 0, borderRadius: 20 },
    { src: heroImage4, width: 212, height: 100, zIndex: 10, borderRadius: 20  },
    { src: heroImage5, width: 186, height: 153, zIndex: 0, borderRadius: 20  },
  ];

  return (
    <div
      className="
      w-full md:w-full md:h-[670px] flex items-center justify-center overflow-hidden rounded-b-[32px] md:rounded-b-none
      bg-[url('/background_images/hero_background.png')] bg-no-repeat bg-cover bg-[left_top_-9.5rem]
      md:bg-cover md:bg-[left_top_0rem]"
    >
      <div className="container pt-[181px] text-center md:mx-auto md:px-6 flex flex-col md:flex-row items-center md:justify-end md:pt-16 gap-0 md:gap-16">

        <div className="flex flex-col gap-6 px-16 md:px-0 max-w-[500px] h-72 w-full">
          <h1 className="text-white text-[36px] md:text-[56px] font-plus-jakarta font-normal leading-[45.36px] md:leading-tight">
            Transform Lending into an{" "}
            <span className="font-semibold">Experience</span>
          </h1>
          <p className="text-white text-[16px] font-normal md:text-[18px] font-plus-jakarta md:font-light opacity-80 leading-relaxed">
            The World’s first AI and Cloud Native LOS makes lending journeys
            what they should be – Fast, Intuitive, Seamless.
          </p>
          <div className="relative md:static -bottom-48">
            <BookADemo />
          </div>
        </div>


        <div className="flex justify-center items-center flex-shrink-0 pt-0 md:pt-10">
          <Image
            src={mobileHeroImage}
            alt="Hero Section Image Mobile"
            className="block md:hidden"
            quality={100}
            priority
            style={{ width: "442px", height: "280px" }}
          />
          <div className="relative hidden md:block w-[780px] h-[520px] overflow-hidden">
          {images.map((image, index) => (
        <motion.div
          key={index}
          initial={initialPositions[index]}
          animate={isRearranged ? rearrangedPositions[index] : initialPositions[index]}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute"
          style={{ zIndex: image.zIndex, borderRadius: image.borderRadius }}
        >
          <Image
            src={image.src}
            alt={`Hero Image ${index + 1}`}
            width={image.width}
            height={image.height}
            quality={100}
            priority
            objectFit="cover"
            className="rounded-[12px]"
          />
        </motion.div>
      ))}
          </div>
        </div>
      </div>
    </div>
  );
}
