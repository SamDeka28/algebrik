"use client";

import { useState, useEffect, useRef } from "react";
import { CustomHeader } from "../CustomHeader";
import Image from "next/image";

const data = [
  { title: "Verification", image: "/section_images/verification.png" },
  { title: "Decisioning", image: "/section_images/seemless_onboarding.png" },
  { title: "AI-Powered", image: "/section_images/origination.png" },
  { title: "Onboarding", image: "/section_images/onboarding.png" },
  { title: "Origination", image: "/section_images/origination.png" },
  { title: "Closing", image: "/section_images/closing.png" },
];

export default function LoanLifecycle() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [scrollLock, setScrollLock] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const nextSectionRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (e: WheelEvent) => {
    if (scrollLock) {
      e.preventDefault();
      if (e.deltaY > 0 && currentCategoryIndex < data.length - 1) {
        setCurrentCategoryIndex((prev) => prev + 1);
      } else if (e.deltaY < 0 && currentCategoryIndex > 0) {
        setCurrentCategoryIndex((prev) => prev - 1);
      }
    }
  };

  const checkSectionInView = () => {
    if (sectionRef.current) {
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      setScrollLock(sectionTop <= windowHeight && sectionTop >= 0);
    }
  };

  useEffect(() => {
    setSelectedCategory(data[0].title);

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("scroll", checkSectionInView);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("scroll", checkSectionInView);
    };
  }, [scrollLock, currentCategoryIndex]);

  useEffect(() => {
    if (currentCategoryIndex === data.length - 1 && nextSectionRef.current) {
      nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentCategoryIndex]);

  return (
    <div className="container mx-auto p-4 md:p-8 flex font-plus-jakarta flex-col gap-12 overscroll-contain">
      <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto px-8 md:px-36">
        <CustomHeader text="Reimagining the Loan Lifecycle, End to End" />
      </div>

      <div ref={sectionRef} className="flex justify-center items-center flex-wrap w-full">
        
      <div className="container relative md:w-full flex gap-[24.42px] justify-center mt-[42px]">
        <div className="relative opacity-[30%] z-[-1]">
          <div className="absolute top-0 md:left-[96px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full md:w-[468.64px] md:h-[542.11px] blur-[100px] animate-fadeIn" />
          <div className="absolute top-0 md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full md:w-[618.35px] md:h-[633.38px] blur-[100px] -z-10 animate-fadeIn delay-200" />
          <div className="absolute top-0 md:bottom-[10px] bg-[#BE95FF] rounded-full md:w-[451.48px] md:h-[542.11px] blur-[100px] z-[-1] animate-fadeIn delay-400" />
        </div>
        </div>

        <div className="w-[168px] max-h-[500px] rounded-[20px] overflow-y-auto">
          {data.map((item, index) => (
            <button
              key={item.title}
              onClick={() => {
                setSelectedCategory(item.title);
                setCurrentCategoryIndex(index);
              }}
              className={`flex items-center gap-2 py-[16px] pl-[16px] w-full text-left font-bold text-[15.38px] mb-2 ${
                currentCategoryIndex === index
                  ? "text-[#056CC1] border-2 rounded-[26px] border-white"
                  : "text-[#5F5F5F]"
              }`}
            >
              <Image
                src={
                  currentCategoryIndex === index
                    ? "/icons/check.png"
                    : "/icons/uncheck.png"
                }
                width={24}
                height={24}
                alt={currentCategoryIndex === index ? "Checked" : "Unchecked"}
              />
              {item.title}
            </button>
          ))}
        </div>

        <div className="flex justify-center items-center p-6 w-full md:w-[932px] h-[531.96px] rounded-[20px]">
          {selectedCategory ? (
            <Image
              src={data[currentCategoryIndex].image}
              alt={selectedCategory}
              width={932}
              height={532}
              className="rounded-[20px]"
              priority
              quality={100}
            />
          ) : (
            <p className="text-gray-500 text-xl">Select a category to see details</p>
          )}
        </div>
      </div>

    </div>
  );
}
