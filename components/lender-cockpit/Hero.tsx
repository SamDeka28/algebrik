"use client";

import Image from "next/image";
import BookADemo from "../BookADemo";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import { motion } from "framer-motion";
import { useState } from "react";
import Contact from "../contacts";

export default function LenderCockpitHero() {
  const [showContactModal, setShowContactModal] = useState(false);
  const heroContent = {
    header: (
      <>
        <div className="hidden md:flex flex-col">
          <span>Command Every Loan. <span className="font-extrabold">In One Place</span></span>
        </div>
        <div className="md:hidden flex flex-col px-[36px]">
          <span>Command</span>
          <span>Every Loan. In</span>
          <span>One Place.</span>
        </div>
      </>
    ),
    subtitle:
      "Algebrik’s Loan Origination System gives loan officers and credit teams a unified workspace to track pipelines, automate decisions, and engage borrowers in real time.",
    sectionImage: "/icons/lc-main.webp",
    subtitleClass:
      "text-[16px] md:text-[18px] text-gray-300 font-plus-jakarta font-normal text-center px-[38px] md:px-[193px] mb-[10px] max-w-7xl",
  };

  return (
    <div className="w-full">
      <div
        className="w-full h-[758px] flex items-center justify-center overflow-hidden relative md:bg-[url('/background_images/platform_hero.webp')] bg-[url('/background_images/mobile_solutions.webp')] rounded-b-[32px] md:rounded-none bg-no-repeat bg-bottom bg-cover"
      >
        <div className="absolute top-64 mx-auto flex flex-col items-center justify-start gap-[20px]">
          <div className="flex flex-col gap-[20px]">
            <CustomHeader
              text={heroContent.header}
              className="text-[36px] md:text-[56px] text-white font-medium text-center flex flex-col"
            />
            <CustomSubtitle
              text={heroContent.subtitle}
              className={heroContent.subtitleClass}
            />
          </div>
          <motion.button
            className="relative bg-gradient-to-tr from-[#1C8DEA] to-[#195BD7] text-white py-[14px] px-6 font-bold rounded-[31px] overflow-hidden group"
            whileHover={{
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
            onClick={() => setShowContactModal(true)}
          >
            <span className="relative z-10">See the Cockpit in Action</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#195BD7] to-[#1C8DEA] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
          </motion.button>
        </div>
      </div>
      <div className="hidden md:block relative -inset-y-56 left-0">
        {/* <div className=""> */}
          {/* <div className="relative -inset-y-40 right-[25px]">
            <Image
              src={heroContent.sectionImage}
              alt="Decisioning Hero"
              width={865}
              height={555}
            />
          </div> */}
          <script async src="https://js.storylane.io/js/v2/storylane.js"></script>
          <div
            className="sl-embed !translate-x-[-50%]"
            style={{
              position: "relative",
              paddingBottom: "555px",
              width: "865px",
              height: "0",
              transform: "scale(1)",
              left: "50%",
              // transform: "translateX(-50%)",
              // top: "50%",
              // transform: "translate(-50%, -50%)",
            }}
          >
            <iframe
              loading="lazy"
              className="sl-demo"
              src="https://algebrik.storylane.io/demo/9gq55pwnefgy?embed=inline"
              name="sl-embed"
              allow="fullscreen"
              allowFullScreen
              style={{
                position: "absolute",
                top: "50px",
                left: "0",
                width: "865px",
                height: "555px",
                border: "10px solid rgba(255, 255, 255, 0.5)",
                borderRadius: "30px",
                boxSizing: "border-box",
                boxShadow: "0px 0px 18px rgba(26, 19, 72, 0.15)",
              }}
            ></iframe>


          {/* </div> */}
        </div>
      </div>
      <Contact open={showContactModal} onClose={() => setShowContactModal(false)} />
    </div>
  );
}


