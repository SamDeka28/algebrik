"use client";

import { useState, useEffect } from "react";
import { CustomHeader } from "../CustomHeader";
import { motion } from "framer-motion";

const data = [
  { percentage: 70, title: "Reduction in Approval Times" },
  { percentage: 30, title: "Reduction in Operational Costs" },
  { percentage: 80, title: "Faster Time to Launch new Products" },
  { percentage: 240, title: "Company growth" },
];

export default function LendersAchieve() {
  const [count, setCount] = useState(Array(data.length).fill(0));

  useEffect(() => {
    data.forEach((item, index) => {
      const end = item.percentage;
      const duration = 2500;
      const increment = Math.ceil(end / (duration / 30));

      const interval = setInterval(() => {
        setCount((prev) => {
          const updated = [...prev];
          if (updated[index] < end) {
            updated[index] += increment;
          } else {
            updated[index] = end;
            clearInterval(interval);
          }
          return updated;
        });
      }, 30);
    });
  }, []);

  return (
    <div
      className="container mx-auto p-4 mt-20 md:mt-[106px] md:mb-12 flex items-center justify-center font-plus-jakarta"
      style={{
        backgroundImage: "url('/section_images/auto_lenders/lender_achive.png')",
        backgroundSize: "cover",
        backgroundPosition: "right",
      }}
    >
      <div className="flex flex-col md:items-center justify-center md:flex-row gap-5 md:gap-[92px] w-full">
        <div className="flex flex-col gap-[8px]">
          <CustomHeader
            className="flex flex-col"
            text={
              <>
                <span>What Lenders</span>
                <span>achieve with</span>
                <span>Algebrik AI</span>
              </>
            }
          />
          <p className="text-[18px] text-black flex flex-col">
            <span>Some numbers to tell the impact of</span>
            <span>using Algebrik AI</span>
          </p>
        </div>

        {/* Cards */}
        <div className="flex w-full md:w-1/2">
          {/* Mobile Slider */}
          <div className="flex gap-4 overflow-x-auto md:hidden flex-nowrap p-2">
            {data.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col min-w-[300px] md:w-[327px] md:h-[290px] items-start justify-center p-6 bg-white bg-opacity-90 rounded-[20px] shadow-xl"
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 * index }}
              >
                <div className="text-[104px] font-bebas-neue font-medium bg-gradient-to-tr from-[#1C8DEA4D] to-[#195BD7] bg-clip-text text-transparent">
                  {count[index]}%
                </div>
                <div className="text-[#2A5FAC] font-bold text-[24px]">{item.title}</div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:flex flex-col md:flex-row gap-[24px] md:gap-[32px] w-full">
            <div className="flex flex-col gap-[24px]">
              {data.slice(0, 2).map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col md:w-[327px] md:h-[290px] items-start justify-center p-6 bg-white bg-opacity-90 rounded-[20px] shadow-xl"
                  initial={{ opacity: 0, x: "-100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.5 * index }}
                >
                  <div className="text-[104px] font-bebas-neue font-medium bg-gradient-to-tr from-[#1C8DEA4D] to-[#195BD7] bg-clip-text text-transparent">
                    {count[index]}%
                  </div>
                  <div className="text-[#2A5FAC] font-bold text-[24px]">{item.title}</div>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col gap-[24px]">
              {data.slice(2, 4).map((item, index) => (
                <motion.div
                  key={index + 2}
                  className="flex flex-col md:w-[327px] md:h-[290px] items-start justify-center p-6 bg-white bg-opacity-90 rounded-[20px] shadow-xl"
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.5 * index }}
                >
                  <div className="text-[104px] font-bebas-neue font-medium bg-gradient-to-tr from-[#1C8DEA4D] to-[#195BD7] bg-clip-text text-transparent">
                    {count[index + 2]}%
                  </div>
                  <div className="text-[#2A5FAC] font-bold text-[24px]">{item.title}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
