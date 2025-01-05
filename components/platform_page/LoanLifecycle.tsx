"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CustomHeader } from "../CustomHeader";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

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
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { ref: sectionViewRef } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  // const handleScroll = (e: WheelEvent) => {
  //   e.preventDefault();
  //   if (e.deltaY > 0) {
  //     if (currentCategoryIndex < data.length - 1) {
  //       setCurrentCategoryIndex((prev) => prev + 1);
  //     }
  //   } else if (e.deltaY < 0) {
  //     if (currentCategoryIndex > 0) {
  //       setCurrentCategoryIndex((prev) => prev - 1);
  //     }
  //   }
  // };

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (sectionRef.current && sectionRef.current.contains(e.target as Node)) {
        e.preventDefault();

        if (e.deltaY > 0 && currentCategoryIndex < data.length - 1) {
          setCurrentCategoryIndex((prev) => prev + 1);
        } else if (e.deltaY < 0 && currentCategoryIndex > 0) {
          setCurrentCategoryIndex((prev) => prev - 1);
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentCategoryIndex]);

  useEffect(() => {
    setSelectedCategory(data[0].title);
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col gap-12 overscroll-contain">
      <div className="flex flex-col justify-center items-center text-center gap-5 mx-auto px-8 md:px-36">
        <CustomHeader text="Reimagining the Loan Lifecycle, End to End" />
      </div>

      <div
        ref={sectionViewRef}
        className="flex justify-center items-center flex-wrap w-full relative"
      >
        <motion.div
          className="container relative md:w-full flex gap-[24.42px] justify-center mt-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative opacity-[30%] z-[-1]">
            <motion.div
              className="absolute top-0 md:left-[96px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full md:w-[468.64px] md:h-[542.11px] blur-[100px]"
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
              className="absolute top-0 md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full md:w-[618.35px] md:h-[633.38px] blur-[100px] -z-10"
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
              className="absolute top-0 md:bottom-[10px] bg-[#BE95FF] rounded-full md:w-[451.48px] md:h-[542.11px] blur-[100px] z-[-1]"
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
        </motion.div>

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

        <motion.div
          ref={sectionRef}
          className="flex justify-center items-center p-6 w-full md:w-[932px] h-[531.96px] rounded-[20px] relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
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
            <p className="text-gray-500 text-xl">
              Select a category to see details
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
