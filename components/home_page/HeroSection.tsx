"use client";

import Image from "next/image";
import heroImage from "@/public/section_images/hero.png";
import mobileHeroImage from "@/public/section_images/home_page/mobile_hero.png";
import BookADemo from "../BookADemo";

export default function HeroSection() {
  return (
    <div
      className="
     

      w-full md:w-full md:h-[670px] flex items-center justify-center overflow-hidden rounded-b-[32px] md:rounded-b-none
    bg-[url('/background_images/hero_background.png')] bg-no-repeat bg-cover bg-[left_top_-9.5rem]
     md:bg-cover md:bg-[left_top_0rem]"

    >
      <div className="container pt-[181px] text-center md:mx-auto md:px-6 flex flex-col md:flex-row items-center md:justify-end md:pt-16 gap-0 md:gap-16 ">
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

        <div className="flex justify-center items-center flex-shrink-0 pt-0 md:pt-10 ">
        <Image
            src={mobileHeroImage}
            alt="Hero Section Image Mobile"
            className="block md:hidden"
            quality={100}
            priority
            style={{ width: "442px", height: "280px",}}
          />
          <Image
            src={heroImage}
            alt="Hero Section Image"
            quality={100}
            priority
            style={{ width: "780px", height: "520px", objectFit: "cover" }}
            className="hidden md:block"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
