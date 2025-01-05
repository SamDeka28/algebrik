"use client";

import Image from "next/image";
import BookADemo from "../BookADemo";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";

export default function HeroSection() {
  return (
    <div className="w-full h-max">
      <div
        className="w-full h-[758px] flex items-center justify-center overflow-hidden relative"
        style={{
          backgroundImage: "url('/background_images/platform_hero.png')",
          backgroundSize: "100%",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "bottom",
        }}
      >
        <div className="absolute top-48 mx-auto flex flex-col items-center justify-start gap-[20px]">
          <div className="flex flex-col gap-[20px]">
            <CustomHeader
              text={
                <>
                  <span>Simplify Lending.</span>
                  <span>Delight Members. Drive Growth.</span>
                </>
              }
              className="text-[56px] text-white text-center flex flex-col"
            />
            <CustomSubtitle
              text="Empower your credit union to reduce approval times, boost member satisfaction, and lower operational costs—all with Algebrik AI’s cloud-native, AI-powered solutions tailored to your needs."
              className="text-[18px] text-gray-300 font-plus-jakarta font-normal text-center px-[193px] mb-[10px]"
            />
          </div>
          <BookADemo />
        </div>
      </div>


<div className="relative mb-[485] flex justify-center">
  <div className="cursor-pointer">
    <div className="relative -inset-y-40 right-[25px]">
      <div>
        <div
          className="sl-embed"
          style={{
            position: "relative",
   
            width: "100%",
            height: "0",
            transform: "scale(1)",
          }}
        >
          <Image
            src="/section_images/solution_hero.png"
            alt="Solution Hero"
            width={865}
            height={555}
            // style={{
            //   border: "1px solid rgba(63,95,172,0.35)",
            //   boxShadow: "0px 0px 18px rgba(26, 19, 72, 0.15)",
            //   borderRadius: "10px",
            //   boxSizing: "border-box",
            // }}
          />
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}
