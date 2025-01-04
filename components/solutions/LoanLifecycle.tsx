"use client";

import { useState } from "react";
import Image from "next/image";
import { CustomHeader } from "../CustomHeader";

export default function LoanLifecycle() {
  const cardData = [
    { title: "Verification", image: "/section_images/verification.png" },
    { title: "Decisioning", image: "/section_images/loan.png" },
    { title: "AI-Powered", image: "/section_images/ai_powered.png" },
    { title: "Onboarding", image: "/section_images/onboarding.png" },
    { title: "Origination", image: "/section_images/origination.png" },
    { title: "Closing", image: "/section_images/closing.png" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      id="loan-lifecycle-section"
      className="container pt-[108px] mx-auto flex flex-col items-center justify-between gap-[48px] relative"
    >
      <CustomHeader className="text-center" text="Reimagining the Loan Lifecycle, End to End" />

      <div className="container px-[25px] py-[4px] md:w-[1013px] md:h-[44px] bg-white flex justify-between items-center rounded-[36px] drop-shadow-[0_0_60px_rgba(0,0,0,0.25)]">
        {cardData.map((item, index) => (
          <div
            key={index}
            className="flex flex-row gap-[8px] items-center cursor-pointer"
            onClick={() => handleClick(index)}
            style={{
              opacity: index === activeIndex ? 1 : 0.5,
              transform: index === activeIndex ? "scale(1.1)" : "scale(1)",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <Image src="/icons/check.png" width={16.67} height={16.67} alt="check" />
            <div
              className={`${
                index === activeIndex ? "bg-blue-500 text-white" : "bg-transparent"
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
        <div className="relative">
          <Image
            key={activeIndex} // Trigger re-render on index change
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
