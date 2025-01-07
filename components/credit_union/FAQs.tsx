"use client";

import { useState, useEffect } from "react";
import { CustomHeader, CustomSubtitle } from "../CustomHeader";
import Button from "../Buttons";
import { PiMinusCircleBold, PiPlusCircleBold } from "react-icons/pi";
import footerData from "../constant/footerData";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [faqData, setFaqData] = useState<FAQItem[]>([]);

  useEffect(() => {
    const path = window.location.pathname;

    if (path === "/solutions/auto_lenders") {
      setFaqData(footerData.SolutionsForAutoLenders);
    } else if (path === "/solutions/credit_union") {
      setFaqData(footerData.SolutionsForCreditUnions);
    } else if (path === "/solutions/smb_lenders") {
      // setFaqData(footerData.SolutionsForSmbLenders); 
    } else {
   
      setFaqData([]);
    }
  }, [window.location.pathname]);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="px-6 md:px-16 py-12">
      <div className="max-w-6xl mx-auto font-plus-jakarta flex gap-[46px]">
        <div className="flex flex-col gap-[16px] md:w-[328px] md:h-[389px]">
          <CustomHeader text="Frequently Asked Questions" className="text-[40px] pr-10" />
          <CustomSubtitle
            className="text-[18px] font-normal text-[#292929] leading-[30px]"
            text="Everything you need to know about the Auto lenders. Can’t find your questions here? Please ask your questions below."
          />
          <Button
            text="Ask your Questions"
            customClass="px-[1px] md:mt-[20px] text-[14px] md:w-[200px] md:h-[41px] text-[#292929] font-bold leading-[150%] border-2 border-[#1C8DEA]"
          />
        </div>

        <div className="flex-1 space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`border rounded-[16px] bg-white shadow-lg ${
                activeIndex === index ? "" : "border-gray-300"
              }`}
            >
              <div
                className="flex justify-between px-[24px] py-[18px] items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-semibold text-[#292929] text-[18px] font-plus-jakarta leading-[28px]">
                  {item.question}
                </h3>
                <span className="text-xl">
                  {activeIndex === index ? (
                    <PiMinusCircleBold className="text-blue-500" />
                  ) : (
                    <PiPlusCircleBold className="text-gray-500" />
                  )}
                </span>
              </div>
              <hr className="w-full" />
              {activeIndex === index && (
                <p className="mt-2 text-[#838383] px-[24px] py-[14px] font-plus-jakarta leading-[28px] text-[16px]">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
