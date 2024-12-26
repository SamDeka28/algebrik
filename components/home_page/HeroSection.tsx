"use client";

import Image from "next/image";
import heroImage from "@/public/section_images/hero.png";
import BookADemo from "../BookADemo";

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
          <h1 className="text-white text-[56px] font-plus-jakarta font-normal leading-tight">
            Transform Lending into an{" "}
            <span className="font-semibold">Experience</span>
          </h1>
          <p className="text-white text-[18px] font-plus-jakarta font-light opacity-80 leading-relaxed">
            The World’s first AI and Cloud Native LOS makes lending journeys
            what they should be – Fast, Intuitive, Seamless.
          </p>
          <BookADemo />
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
