"use client";

import Image from "next/image";
import heroImage from "@/public/section_images/hero_section_home.png";

export default function HeroSection() {
  return (
    <div
      className="w-full h-[670px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/background_images/hero_background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-end pt-16 gap-16 ">
        <div className="flex flex-col gap-6 max-w-[500px] w-full">
          <h1 className="text-white text-[56px] font-normal leading-tight">
            Transform Lending into an{" "}
            <span className="font-semibold">Experience</span>
          </h1>
          <p className="text-white text-[18px] font-light opacity-80 leading-relaxed">
            The World’s first AI and Cloud Native LOS makes lending journeys
            what they should be – Fast, Intuitive, Seamless.
          </p>
          <div className="relative w-full sm:w-[353px] flex items-center gap-4 mt-4">
            <input
              type="email"
              placeholder="Enter your work email"
              className="w-full sm:w-[353px] h-[48px] px-4 py-2 bg-[#C1DAFF] placeholder-white text-white text-[14px] font-medium rounded-[31px] focus:outline-none"
            />
            <button className="absolute right-0 bg-gradient-to-r from-[#1C8DEA] to-[#195BD7] text-white text-[14px] font-medium rounded-[31px] px-6 py-2 border border-[#2F9AFB] hover:opacity-90 transition-all">
              Book a Demo
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center flex-shrink-0 pt-10">
          <Image
            src={heroImage}
            alt="Hero Section Image"
            quality={100}
            priority
            style={{ width: "780px", height: "520px", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
