"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CustomHeader } from "../CustomHeader";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function LoanLifecycle() {
  const cardData = [
    {
      title: "Seamless Onboarding",
      image: "/section_images/seemless_onboarding.png",
    },
    { title: "Deploy in Mins", image: "/section_images/deploy_in_mins.png" },
    { title: "AI-Powered", image: "/section_images/ai_powered.png" },
    { title: "Smart Decisioning", image: "/section_images/smart_decision.png" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollLocked, setScrollLocked] = useState(false);
  const isScrolling = useRef(false);
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      setScrollLocked(true);
      document.body.style.overflow = "hidden";
    } else {
      setScrollLocked(false);
      document.body.style.overflow = "auto";
    }
  }, [inView]);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!scrollLocked || isScrolling.current) return;

      e.preventDefault();
      isScrolling.current = true;

      if (e.deltaY > 0) {
        if (activeIndex < cardData.length - 1) {
          setActiveIndex((prev) => prev + 1);
        }
      } else if (e.deltaY < 0) {
        if (activeIndex > 0) {
          setActiveIndex((prev) => prev - 1);
        }
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      document.body.style.overflow = "auto";
    };
  }, [scrollLocked, activeIndex, cardData.length]);

  return (
    <section
      ref={sectionRef}
      id="loan-lifecycle-section"
      className="container pt-[108px] mx-auto flex flex-col items-center justify-between gap-[48px] relative"
    >
      <CustomHeader
        className="text-center"
        text="Reimagining the Loan Lifecycle, End to End"
      />

      <div className="container px-[25px] py-[4px] md:w-[1013px] md:h-[44px] bg-white flex justify-between items-center rounded-[36px] drop-shadow-[0_0_60px_rgba(0,0,0,0.25)]">

     
        {cardData.map((item, index) => (
          <div
            key={index}
            className="flex flex-row gap-[8px] items-center cursor-pointer"
            onClick={() => setActiveIndex(index)}
            style={{
              opacity: index === activeIndex ? 1 : 0.5,
              transform: index === activeIndex ? "scale(1.1)" : "scale(1)",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <Image
              src={index === activeIndex ? "/icons/check.png" : "/icons/uncheck.png"}
              width={24}
              height={24}
              alt={index === activeIndex ? "Checked" : "Unchecked"}
            />
            <div
              className={`${
                index === activeIndex ? "bg-blue-500 text-white" : "bg-transparent text-[#8C8C8C]"
              } px-2 py-1 rounded-full transition-all duration-300`}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>

      <div
        className="md:w-[1096px] md:h-[526px] rounded-[42px] overflow-hidden"
        style={{ transition: "all 0.5s" }}
      >
              <div className="absolute top-64 md:left-[560px] opacity-[30%] z-[-1]">
            <motion.div
              className="absolute top-0 -left-96 md:left-[96px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full md:w-[468.64px] md:h-[542.11px] blur-[100px]"
              initial={{ x: "-50%" }}
              animate={{
                x: ["-30%", "30%", "-30%", "0%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute top-0 md:left-[20px] -left-96 bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full md:w-[618.35px] md:h-[633.38px] blur-[100px] -z-10"
              initial={{ x: "100%" }}
              animate={{
                x: ["10%", "-20%", "10%", "0%"],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute top-0 -left-96 md:bottom-[10px] bg-[#BE95FF] rounded-full md:w-[451.48px] md:h-[542.11px] blur-[100px] z-[-1]"
              initial={{ x: "-50%" }}
              animate={{
                x: ["-30%", "40%", "-40%", "0%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        <div
          className="relative"
          // style={{
          //   marginLeft: activeIndex === 0 ? "0px" : "0",  
          // }}
        >
          
          <Image
            key={activeIndex}
            src={cardData[activeIndex].image}
            width={1096}
            height={526}
            alt={cardData[activeIndex].title}
            className="rounded-[42px]"
          />
        </div>
      </div>
    </section>
  );
}
