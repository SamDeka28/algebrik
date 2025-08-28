// import Image from "next/image";
"use client";
import BookADemo from "../BookADemo";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import {motion, Transition} from "framer-motion"
// import hero from "@/public/section_images/platform.webp";

export default function HeroSection() {
  const transition:Transition = {
    duration: 1,
    delay: 0,
    ease: [0, 0.71, 0.2, 1.01],
  }
  return (
    <motion.div 
      initial={{
        opacity:0.5
      }}
      transition={transition}
      whileInView={{
        opacity:1
      }}
      viewport={{once: false,amount:0.5}}
    className=" w-full h-max">
      <div
  className="
    w-full h-[758px] flex items-center justify-center overflow-hidden relative 
    md:bg-[url('/background_images/platform_hero.webp')] bg-[url('/background_images/mobile_solutions.webp')] 
    bg-no-repeat bg-center bg-[bottom_left-30.5rem]
     md:bg-cover bg-cover -md:bg-[left_top_10rem] rounded-b-[32px] md:rounded-none"
>

        <div className="absolute top-40 md:top-48 mx-auto flex flex-col items-center justify-center md:justify-start gap-[40px]">
          <div className="flex flex-col gap-[20px]">
            <CustomHeader
              text="Lending just got easier"
              className="text-[36px] md:text-[56px] text-white text-center px-20 leading-[45px] md:leading-none md:px-0"
            />
            <CustomSubtitle
              text="Experience the future of lending: a fully automated, AI-First platform that simplifies workflows, improves decision accuracy, and creates personalized borrower journeys at scale"
              className="text-[16px] md:text-[18px] text-gray-300 font-plus-jakarta font-normal text-center px-10 md:px-[293px]"
            />
          </div>
          
          <BookADemo />
        </div>
      </div>
      <div className="relative md:mb-[355px] flex justify-center">
      <div className="cursor-pointer">
  <div className="hidden md:block relative -inset-y-56 right-[425px]">
    <div>
      <script async src="https://js.storylane.io/js/v2/storylane.js"></script>
      <div
        className="sl-embed"
        style={{
          position: "relative",
          paddingBottom: "calc(66.44% + 25px)",
          width: "100%",
          height: "0",
          transform: "scale(1)",
        }}
      >
        <iframe
          loading="lazy"
          className="sl-demo"
          src="https://app.storylane.io/demo/9gq55pwnefgy?embed=inline"
          name="sl-embed"
          allow="fullscreen"
          allowFullScreen
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "865px", 
            height: "555px",
            border: "10px solid rgba(255, 255, 255, 0.5)",
            borderRadius: "30px",
            boxSizing: "border-box",
            boxShadow: "0px 0px 18px rgba(26, 19, 72, 0.15)", 
          }}
        ></iframe>

       
      </div>
    </div>
  </div>
</div>

</div>

    </motion.div>
  );
}
